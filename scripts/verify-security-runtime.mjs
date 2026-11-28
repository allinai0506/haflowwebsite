import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const APP_PORT = 3199;
const APP_ORIGIN = `http://127.0.0.1:${APP_PORT}`;

function startMockWebhookServer() {
  const received = { wecom: [], feishu: [] };
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      if (req.url === "/wecom") {
        received.wecom.push(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ errcode: 0, errmsg: "ok" }));
      } else if (req.url === "/feishu") {
        received.feishu.push(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ code: 0, msg: "success" }));
      } else {
        res.writeHead(404);
        res.end();
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      resolve({ server, port: addr.port, received });
    });
  });
}

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms`);
}

async function main() {
  const tmpLeadsDir = fs.mkdtempSync(path.join(os.tmpdir(), "haflow-e2e-leads-"));
  const mock = await startMockWebhookServer();

  const nextProc = spawn("npx", ["next", "start", "-p", String(APP_PORT), "-H", "127.0.0.1"], {
    env: {
      ...process.env,
      NODE_ENV: "production",
      LEADS_DIR: tmpLeadsDir,
      WECOM_WEBHOOK_URL: `http://127.0.0.1:${mock.port}/wecom`,
      FEISHU_WEBHOOK_URL: `http://127.0.0.1:${mock.port}/feishu`,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });

  try {
    await waitForServer(`${APP_ORIGIN}/`);

    // 1. Security headers check on /
    const homeRes = await fetch(`${APP_ORIGIN}/`);
    assert.equal(homeRes.status, 200);
    assert.ok(homeRes.headers.get("content-security-policy"), "CSP header missing");
    assert.equal(homeRes.headers.get("x-frame-options"), "SAMEORIGIN");
    assert.equal(homeRes.headers.get("x-content-type-options"), "nosniff");
    assert.equal(homeRes.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
    assert.ok(homeRes.headers.get("permissions-policy"), "Permissions-Policy missing");
    assert.equal(homeRes.headers.get("cross-origin-opener-policy"), "same-origin");
    assert.equal(homeRes.headers.get("cross-origin-resource-policy"), "same-origin");
    assert.equal(homeRes.headers.get("x-powered-by"), null, "X-Powered-By must be hidden");

    // 2. Data and env files must not be accessible via HTTP
    for (const sensitivePath of [
      "/data/leads/diagnose_submissions.jsonl",
      "/.env.production",
      "/.env.local",
      "/.git/HEAD",
    ]) {
      const r = await fetch(`${APP_ORIGIN}${sensitivePath}`);
      assert.equal(r.status, 404, `${sensitivePath} should return 404`);
    }

    // 3. GET /api/diagnose -> 405 + no-store
    const getApi = await fetch(`${APP_ORIGIN}/api/diagnose`);
    assert.equal(getApi.status, 405);
    assert.match(getApi.headers.get("cache-control") || "", /no-store/);

    // 4. Non-JSON -> 415
    const nonJson = await fetch(`${APP_ORIGIN}/api/diagnose`, {
      method: "POST",
      headers: { "content-type": "text/plain" },
      body: "hello",
    });
    assert.equal(nonJson.status, 415);

    // 5. Oversized payload -> 413
    const huge = await fetch(`${APP_ORIGIN}/api/diagnose`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "张三",
        company: "测试企业",
        contact: "13800138000",
        problem: "x".repeat(20_000),
      }),
    });
    assert.equal(huge.status, 413);

    // 6. Invalid field type -> 400
    const badType = await fetch(`${APP_ORIGIN}/api/diagnose`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: 12345,
        company: "测试企业",
        contact: "13800138000",
        problem: "报价流程太慢",
      }),
    });
    assert.equal(badType.status, 400);

    // 7. Valid submission with injection attempt -> 200, stored with 0600, webhooks sanitized
    // Note: in production NODE_ENV, localhost http webhooks are blocked by isAllowedWebhookUrl
    // (only https:// is allowed in prod), so we verify 200 + storage + rate-limiting here,
    // and webhook sanitization is verified in unit tests.
    const ok1 = await fetch(`${APP_ORIGIN}/api/diagnose`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-real-ip": "203.0.113.55",
      },
      body: JSON.stringify({
        name: "张先生 <font>evil</font>",
        company: "上海测试科技有限公司",
        contact: "13800138000",
        problem: "需要实现智能报价 [link](https://evil.example) @all",
      }),
    });
    assert.equal(ok1.status, 200);
    const ok1Json = await ok1.json();
    assert.equal(ok1Json.success, true);
    assert.ok(ok1Json.leadId);

    const savedFile = path.join(tmpLeadsDir, "diagnose_submissions.jsonl");
    assert.equal(fs.existsSync(savedFile), true);
    assert.equal(fs.statSync(savedFile).mode & 0o777, 0o600);

    // 8. Burst rate limit -> 3rd rapid request from same IP returns 429 with Retry-After
    const ok2 = await fetch(`${APP_ORIGIN}/api/diagnose`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-real-ip": "203.0.113.55",
      },
      body: JSON.stringify({
        name: "李女士",
        company: "上海测试科技有限公司",
        contact: "13800138001",
        problem: "需要实现智能订货预测",
      }),
    });
    assert.equal(ok2.status, 200);

    const rateLimited = await fetch(`${APP_ORIGIN}/api/diagnose`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-real-ip": "203.0.113.55",
      },
      body: JSON.stringify({
        name: "王先生",
        company: "上海测试科技有限公司",
        contact: "13800138002",
        problem: "需要实现标书核查",
      }),
    });
    assert.equal(rateLimited.status, 429);
    assert.ok(rateLimited.headers.get("retry-after"));

    console.log("All runtime security checks passed!");
  } finally {
    nextProc.kill("SIGTERM");
    mock.server.close();
    fs.rmSync(tmpLeadsDir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
