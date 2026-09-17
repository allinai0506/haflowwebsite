/**
 * 百度搜索资源平台 - 主动推送 (实时提交) 脚本
 * 使用方式:
 *   node scripts/baidu-push.mjs <YOUR_BAIDU_TOKEN>
 * 例如:
 *   node scripts/baidu-push.mjs z5Qxxxxxx
 */

import https from "node:https";
import http from "node:http";

const DOMAIN = "https://haflow.cn";
const TOKEN = process.argv[2] || process.env.BAIDU_PUSH_TOKEN;

// 站点当前全部 32 个核心静态 URL 索引表
const URLS = [
  `${DOMAIN}/`,
  `${DOMAIN}/haflow`,
  `${DOMAIN}/problems`,
  `${DOMAIN}/problems/quote`,
  `${DOMAIN}/problems/order-forecast`,
  `${DOMAIN}/problems/bid-audit`,
  `${DOMAIN}/problems/voucher-link`,
  `${DOMAIN}/problems/knowledge-reuse`,
  `${DOMAIN}/cases`,
  `${DOMAIN}/cases/automotive-crm`,
  `${DOMAIN}/cases/bid-compliance`,
  `${DOMAIN}/cases/enterprise-plm`,
  `${DOMAIN}/cases/store-inventory`,
  `${DOMAIN}/cases/voucher-matching`,
  `${DOMAIN}/cases/enterprise-archive`,
  `${DOMAIN}/cases/staffai-agent-os`,
  `${DOMAIN}/cases/liujie-rnd`,
  `${DOMAIN}/cases/burger-king-contracts`,
  `${DOMAIN}/cases/engineering-hub`,
  `${DOMAIN}/cases/boran-software`,
  `${DOMAIN}/cases/freight-quotation`,
  `${DOMAIN}/cases/marketing-insights`,
  `${DOMAIN}/cases/autoresume-ai`,
  `${DOMAIN}/training`,
  `${DOMAIN}/diagnose`,
  `${DOMAIN}/insights`,
  `${DOMAIN}/insights/why-not-rebuild-monoliths`,
  `${DOMAIN}/insights/where-rules-cannot-be-hardcoded`,
  `${DOMAIN}/insights/human-agent-division-of-labor`,
  `${DOMAIN}/insights/two-week-mvp-methodology`,
  `${DOMAIN}/about`,
  `${DOMAIN}/contact`,
];

if (!TOKEN) {
  console.log(`
=====================================================
[百度主动推送工具] 提示：
请前往百度搜索资源平台 (https://ziyuan.baidu.com/)
在 "资源提交 -> 普通收录 -> API 提交" 中获取准入密钥 (token)。

执行命令示例:
  node scripts/baidu-push.mjs <准入密钥token>
或者配置环境变量:
  export BAIDU_PUSH_TOKEN="xxxxxx"
  node scripts/baidu-push.mjs
=====================================================
本次待推送的 URL 列表共 ${URLS.length} 个:
${URLS.map((u) => "  - " + u).join("\n")}
`);
  process.exit(0);
}

const postData = URLS.join("\n");
const apiUrl = `http://data.zz.baidu.com/urls?site=${encodeURIComponent(DOMAIN)}&token=${TOKEN}`;

console.log(`\n正在向百度推送 ${URLS.length} 个 URL 到: ${DOMAIN} ...`);

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
      console.log(`\n百度服务器响应 HTTP 状态码: ${res.statusCode}`);
      try {
        const json = JSON.parse(body);
        if (json.success) {
          console.log(`✅ 成功推送链接数: ${json.success}`);
          console.log(`当天剩余可推送链接配额: ${json.remain}`);
        } else {
          console.error(`❌ 推送失败:`, json);
        }
      } catch {
        console.log("响应内容:", body);
      }
    });
  }
);

req.on("error", (err) => {
  console.error("网络请求错误:", err.message);
});

req.write(postData);
req.end();
