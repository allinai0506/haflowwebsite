/**
 * 百度搜索资源平台 - 主动推送 (实时提交) 脚本
 * 站点：https://www.haflow.cn（与全站 canonical/sitemap 一致；token 必须与该站点条目绑定）
 * 使用方式:
 *   node scripts/baidu-push.mjs                      # 从 .env.production / .env.local 读取 BAIDU_PUSH_TOKEN
 *   node scripts/baidu-push.mjs <YOUR_BAIDU_TOKEN>    # 或直接传 token
 *   BAIDU_PUSH_TOKEN=xxx node scripts/baidu-push.mjs  # 或环境变量
 *
 * URL 来源：线上 sitemap.xml 实时解析（失败时回退到内置表），推送前统一为 www 域名
 * （百度要求推送 URL 与 site 参数站点一致）。
 */

import https from "node:https";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

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
function loadTokenFromEnvFiles() {
  for (const f of [".env.production", ".env.local"]) {
    try {
      const text = fs.readFileSync(path.join(process.cwd(), f), "utf-8");
      const m = text.match(/^\s*BAIDU_PUSH_TOKEN\s*=\s*(.+?)\s*$/m);
      if (m) return m[1].replace(/^["']|["']$/g, "");
    } catch {
      /* 文件不存在则跳过 */
    }
  }
  return "";
}

const TOKEN =
  process.argv[2] && !process.argv[2].startsWith("--")
    ? process.argv[2]
    : process.env.BAIDU_PUSH_TOKEN || loadTokenFromEnvFiles();

// 分批推送：--limit N 只推 N 个（默认 10，新站每日配额小，超配额会 over quota）
// 已推记忆：/opt/baidu-push-state.json（放在仓库目录外，避免 rsync --delete 误删）
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? Math.max(1, parseInt(limitArg.split("=")[1], 10) || 0) : 10;
const STATE_PATH = process.env.BAIDU_PUSH_STATE || "/opt/baidu-push-state.json";

function loadPushed() {
  try {
    const data = JSON.parse(fs.readFileSync(STATE_PATH, "utf-8"));
    return new Set(Array.isArray(data.pushed) ? data.pushed : []);
  } catch {
    return new Set();
  }
}

function savePushed(set) {
  try {
    fs.writeFileSync(STATE_PATH, JSON.stringify({ pushed: [...set], updatedAt: new Date().toISOString() }, null, 2));
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
  return u.replace(/^https:\/\/haflow\.cn(?=\/|$)/, "https://www.haflow.cn");
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

function push(urls) {
  return new Promise((resolve) => {
    const postData = urls.join("\n");
    const apiUrl = `http://data.zz.baidu.com/urls?site=${SITE_PARAM}&token=${TOKEN}`;
    console.log(`\n正在向百度推送 ${urls.length} 个 URL（site=${SITE}）...`);
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
              console.log(`成功推送链接数: ${json.success}`);
              console.log(`当天剩余可推送链接配额: ${json.remain}`);
              // 百度按顺序处理：只把确认成功的记入已推记忆
              batch.slice(0, json.success).forEach((u) => pushed.add(u));
              savePushed(pushed);
            } else {
              console.error(`推送失败:`, json);
            }
          } catch {
            console.log("响应内容:", body);
          }
          resolve();
        });
      },
    );
    req.on("error", (err) => {
      console.error("网络请求错误:", err.message);
      resolve();
    });
    req.write(postData);
    req.end();
  });
}

const urls = await collectUrls();
const pushed = loadPushed();
const pending = urls.filter((u) => !pushed.has(u));
if (pending.length === 0) {
  console.log(`全部 ${urls.length} 个 URL 均已推送过，无需重复提交。`);
  process.exit(0);
}
const batch = pending.slice(0, LIMIT);
console.log(`待推送 ${pending.length} 个，本次提交 ${batch.length} 个`);
if (!TOKEN) {
  console.log(`
[百度主动推送] 未找到准入密钥。请在百度搜索资源平台
"资源提交 -> 普通收录 -> API提交" 获取 token 后执行：
  node scripts/baidu-push.mjs <准入密钥token>
或写入 .env.production：BAIDU_PUSH_TOKEN=<token>
本次待推送 URL 共 ${urls.length} 个（未实际提交）:
${urls.map((u) => "  - " + u).join("\n")}
`);
  process.exit(0);
}
await push(batch);
