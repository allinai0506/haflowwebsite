/**
 * 百度搜索资源平台 - 主动推送 (实时提交) 脚本
 * 站点：https://www.haflow.cn（与全站 canonical/sitemap 一致；token 必须与该站点条目绑定）
 * 使用方式:
 *   node scripts/baidu-push.mjs                      # 从 .env.production / .env.local 读取 BAIDU_PUSH_TOKEN
 *   node scripts/baidu-push.mjs <YOUR_BAIDU_TOKEN>    # 或直接传 token
 *   BAIDU_PUSH_TOKEN=xxx node scripts/baidu-push.mjs  # 或环境变量
 *   node scripts/baidu-push.mjs --dry-run             # 仅测试解析与待推列表，不实际发起推送
 *
 * URL 来源：线上 sitemap.xml 实时解析（失败时回退到内置表），推送前统一为 www 域名
 * （百度要求推送 URL 与 site 参数站点一致）。
 */

import https from "node:https";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

const SITE = "https://www.haflow.cn";
// 百度 API 的 site 参数用裸域名（文档示例 site=www.example.com，不带协议）
// 必须与全站 canonical 一致（www），否则返回 site/token 不匹配
const SITE_PARAM = "www.haflow.cn";
const SITEMAP_URL = `${SITE}/sitemap.xml`;

// 内置回退表（与 sitemap.ts 保持一致，sitemap 抓取失败时使用；/training 已 308 合并到 /methodology，不再推送）
const FALLBACK_URLS = [
  `${SITE}/`,
  `${SITE}/problems`,
  `${SITE}/solutions`,
  `${SITE}/haflow`,
  `${SITE}/methodology`,
  `${SITE}/cases`,
  `${SITE}/diagnose`,
  `${SITE}/insights`,
  `${SITE}/about`,
  `${SITE}/contact`,
];

// 无 dotenv 依赖：从 .env.production / .env.local 手工解析 BAIDU_PUSH_TOKEN
// 支持基于当前工作目录以及脚本所在项目根目录等多重查找，保证在 cron（cwd=/root）下正常工作
function loadTokenFromEnvFiles() {
  const searchDirs = [PROJECT_ROOT, process.cwd(), "/opt/haflow-website"];
  const envFiles = [".env.production", ".env.local", ".env"];

  for (const dir of searchDirs) {
    for (const file of envFiles) {
      try {
        const text = fs.readFileSync(path.join(dir, file), "utf-8");
        const m = text.match(/^\s*BAIDU_PUSH_TOKEN\s*=\s*(.+?)\s*$/m);
        if (m) {
          const val = m[1].replace(/^["']|["']$/g, "").trim();
          if (val) return val;
        }
      } catch {
        /* 文件不存在则跳过 */
      }
    }
  }
  return "";
}

const isDryRun = process.argv.includes("--dry-run");
const explicitToken = process.argv.find((a) => !a.startsWith("--") && a !== process.argv[0] && a !== process.argv[1]);
const TOKEN = explicitToken || process.env.BAIDU_PUSH_TOKEN || loadTokenFromEnvFiles();

// 分批推送：--limit N 只推 N 个（默认 10，新站每日配额小，超配额会 over quota）
// 已推记忆：/opt/baidu-push-state.json（放在仓库目录外，避免 rsync --delete 误删）
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? Math.max(1, parseInt(limitArg.split("=")[1], 10) || 0) : 10;
const STATE_PATH =
  process.env.BAIDU_PUSH_STATE ||
  (fs.existsSync("/opt") ? "/opt/baidu-push-state.json" : path.join(PROJECT_ROOT, ".baidu-push-state.json"));

function loadPushed() {
  try {
    const data = JSON.parse(fs.readFileSync(STATE_PATH, "utf-8"));
    return new Set(Array.isArray(data.pushed) ? data.pushed : []);
  } catch {
    return new Set();
  }
}

function savePushed(set, meta = {}) {
  try {
    fs.writeFileSync(
      STATE_PATH,
      JSON.stringify(
        {
          pushed: [...set],
          updatedAt: new Date().toISOString(),
          ...meta,
        },
        null,
        2
      )
    );
  } catch (err) {
    console.warn(`已推记忆写入失败（${err.message}），不影响本次推送`);
  }
}

function fetchText(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(url, { timeout: 15000 }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          resolve(fetchText(res.headers.location));
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => resolve(body));
      })
      .on("error", reject);
  });
}

function toWww(u) {
  // 统一为 www canonical：haflow.cn -> www.haflow.cn
  return u.replace(/^https?:\/\/haflow\.cn(?=\/|$)/, "https://www.haflow.cn");
}

async function collectUrls() {
  try {
    const xml = await fetchText(SITEMAP_URL);
    const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => toWww(m[1].trim()));
    const uniq = [...new Set(locs)].filter((u) => u.startsWith(SITE + "/") || u === `${SITE}/`);
    if (uniq.length > 0) {
      console.log(`从 sitemap.xml 解析到 ${uniq.length} 个 URL`);
      return uniq;
    }
  } catch (err) {
    console.warn(`sitemap 抓取失败（${err.message}），使用内置回退表`);
  }
  return FALLBACK_URLS;
}

// 百度偶发返回 505 "please retry later"（服务端繁忙/限流）。原实现直接放弃，
// 结果当天配额被浪费、URL 也未记入已推记忆。这里改为带退避的重试。
const MAX_ATTEMPTS = 3;
// 退避可用 BAIDU_PUSH_RETRY_BACKOFF_MS 覆盖（测试或想更快重试时）
const RETRY_BACKOFF_MS = process.env.BAIDU_PUSH_RETRY_BACKOFF_MS
  ? Math.max(0, parseInt(process.env.BAIDU_PUSH_RETRY_BACKOFF_MS, 10) || 0)
  : 30_000;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// 单次推送，返回结构化结果供上层重试逻辑判断
function pushOnce(urls) {
  return new Promise((resolve) => {
    const postData = urls.join("\n");
    const apiUrl = `http://data.zz.baidu.com/urls?site=${SITE_PARAM}&token=${TOKEN}`;
    console.log(`\n正在向百度推送 ${urls.length} 个 URL（site=${SITE_PARAM}）...`);
    urls.forEach((u) => console.log(`  > ${u}`));
    const req = http.request(
      apiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          console.log(`百度服务器响应 HTTP 状态码: ${res.statusCode}`);
          try {
            const json = JSON.parse(body);
            if (typeof json.success === "number") {
              console.log(`✅ 成功推送链接数: ${json.success}`);
              console.log(`当天剩余可推送链接配额: ${json.remain}`);
              resolve({ ok: true, success: json.success });
            } else {
              console.error(`❌ 推送失败:`, json);
              const msg = json.message || JSON.stringify(json);
              resolve({
                ok: false,
                success: 0,
                message: `error ${json.error ?? res.statusCode}: ${msg}`,
              });
            }
          } catch {
            console.log("响应内容:", body);
            resolve({ ok: false, success: 0, message: `非 JSON 响应 (HTTP ${res.statusCode})` });
          }
        });
      },
    );
    req.on("error", (err) => {
      console.error("网络请求错误:", err.message);
      resolve({ ok: false, success: 0, message: err.message });
    });
    req.write(postData);
    req.end();
  });
}

// 带重试的推送：只有百度确认受理的 URL 才记入已推记忆，其余留待下次定时任务重试
async function pushWithRetry(batch, pushedSet) {
  let remaining = [...batch];
  let totalAccepted = 0;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS && remaining.length > 0; attempt++) {
    const result = await pushOnce(remaining);
    if (!result.ok) {
      if (attempt < MAX_ATTEMPTS) {
        const waitMs = RETRY_BACKOFF_MS * attempt;
        console.log(`[重试] 第 ${attempt}/${MAX_ATTEMPTS - 1} 次失败（${result.message}），${waitMs / 1000}s 后重试...`);
        await sleep(waitMs);
      } else {
        console.error(`❌ ${MAX_ATTEMPTS} 次尝试均失败（${result.message}），${remaining.length} 个 URL 未记入已推记忆`);
      }
      continue;
    }
    // 百度按顺序处理：只把确认成功的记入已推记忆
    remaining.slice(0, result.success).forEach((u) => pushedSet.add(u));
    totalAccepted += result.success;
    savePushed(pushedSet, { lastAccepted: result.success });
    remaining = remaining.slice(result.success);
    if (remaining.length > 0 && attempt < MAX_ATTEMPTS) {
      console.log(`[部分接受] 百度仅受理 ${result.success} 个，${RETRY_BACKOFF_MS / 1000}s 后重试剩余 ${remaining.length} 个...`);
      await sleep(RETRY_BACKOFF_MS);
    }
  }

  if (remaining.length > 0) {
    console.log(`[未完成] ${remaining.length} 个 URL 本次未推送成功，下次定时任务将自动重试`);
  }
  return totalAccepted;
}

const startTime = new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
console.log(`\n==================================================`);
console.log(`[${startTime}] 百度 URL 主动推送定时任务开始`);
console.log(`==================================================`);

const urls = await collectUrls();
let pushed = loadPushed();
let pending = urls.filter((u) => !pushed.has(u));

// 轮转机制：当全部 URL 均已完成一轮推送后，自动重置已推集合，开始新一轮推送，保证每日定时任务持续生效并促使蜘蛛重新抓取更新
if (pending.length === 0) {
  console.log(`[轮转提示] 全部 ${urls.length} 个 URL 均已推送过，开启新一轮轮转推送（促进百度蜘蛛重新抓取与快照更新）...`);
  pushed = new Set();
  pending = [...urls];
  savePushed(pushed, { note: "轮转周期重置" });
}

const batch = pending.slice(0, LIMIT);
console.log(`待推送总量: ${pending.length} 个，本次准备提交: ${batch.length} 个（LIMIT=${LIMIT}）`);

if (!TOKEN) {
  console.error(`
[百度主动推送] 错误：未找到准入密钥 BAIDU_PUSH_TOKEN。
请在百度搜索资源平台 "资源提交 -> 普通收录 -> API提交" 获取 token 后执行：
  node scripts/baidu-push.mjs <准入密钥token>
或写入 .env.production：BAIDU_PUSH_TOKEN=<token>
本次待推送 URL 共 ${urls.length} 个（未实际提交）:
${urls.map((u) => "  - " + u).join("\n")}
`);
  process.exit(1);
}

if (isDryRun) {
  console.log(`\n[DRY-RUN] 模拟执行模式，以下为待提交的 ${batch.length} 个链接:`);
  batch.forEach((u) => console.log(`  * ${u}`));
  console.log(`[DRY-RUN] 模拟执行结束，未实际发送请求。`);
  process.exit(0);
}

await pushWithRetry(batch, pushed);

const endTime = new Date().toLocaleString("zh-CN", { timeZone: "Asia/Shanghai" });
console.log(`[${endTime}] 百度 URL 主动推送定时任务结束\n`);
