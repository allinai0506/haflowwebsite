import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import {
  MAX_DIAGNOSE_BODY_BYTES,
  parseAndValidateDiagnoseRequest,
  validateDiagnosePayload,
} from "../src/lib/security/diagnose-validation.ts";
import { DiagnoseRateLimiter, getClientIp } from "../src/lib/security/rate-limit.ts";
import {
  sanitizeTelUri,
  sanitizeWebhookMultiLine,
  sanitizeWebhookSingleLine,
} from "../src/lib/security/webhook-sanitize.ts";
import { LeadStorageQuotaError, persistLeadRecord } from "../src/lib/security/lead-storage.ts";

test("parseAndValidateDiagnoseRequest rejects non-JSON Content-Type with 415", async () => {
  const req = new Request("http://127.0.0.1:3000/api/diagnose", {
    method: "POST",
    headers: { "content-type": "text/plain" },
    body: JSON.stringify({ name: "张三", company: "测试", contact: "13800138000", problem: "报价慢" }),
  });
  const res = await parseAndValidateDiagnoseRequest(req);
  assert.equal(res.ok, false);
  if (!res.ok) assert.equal(res.status, 415);
});

test("parseAndValidateDiagnoseRequest rejects oversized payload (>16KB) with 413", async () => {
  const huge = "a".repeat(MAX_DIAGNOSE_BODY_BYTES + 100);
  const req = new Request("http://127.0.0.1:3000/api/diagnose", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "张三", company: "测试", contact: "13800138000", problem: huge }),
  });
  const res = await parseAndValidateDiagnoseRequest(req);
  assert.equal(res.ok, false);
  if (!res.ok) assert.equal(res.status, 413);
});

test("validateDiagnosePayload rejects non-string types, URLs in contact, and overlong fields", () => {
  const nonString = validateDiagnosePayload({
    name: { bad: 1 },
    company: "测试公司",
    contact: "13800138000",
    problem: "业务问题",
  });
  assert.equal(nonString.ok, false);
  if (!nonString.ok) assert.equal(nonString.status, 400);

  const urlContact = validateDiagnosePayload({
    name: "张三",
    company: "测试公司",
    contact: "https://evil.example/phish",
    problem: "业务问题",
  });
  assert.equal(urlContact.ok, false);

  const tooLongName = validateDiagnosePayload({
    name: "张".repeat(81),
    company: "测试公司",
    contact: "13800138000",
    problem: "业务问题",
  });
  assert.equal(tooLongName.ok, false);
});

test("validateDiagnosePayload handles honeypot and valid payloads", () => {
  const hp = validateDiagnosePayload({
    name: "Bot",
    company: "Spam Co",
    contact: "13800138000",
    problem: "spam",
    website: "http://spam.example",
  });
  assert.deepEqual(hp, { ok: true, honeypot: true });

  const valid = validateDiagnosePayload({
    name: "  李四\u0000 ",
    company: "上海某制造企业",
    contact: "13800138000",
    problem: "报价需要人工核对多份历史表格，耗时 2 天。",
  });
  assert.equal(valid.ok, true);
  if (valid.ok && !valid.honeypot) {
    assert.equal(valid.data.name, "李四");
    assert.equal(valid.data.department, "");
  }
});

test("getClientIp does not blindly trust client-supplied X-Forwarded-For prefix", () => {
  const headersWithRealIp = new Headers({
    "x-forwarded-for": "1.2.3.4, 5.6.7.8",
    "x-real-ip": "203.0.113.9",
  });
  assert.equal(getClientIp(headersWithRealIp), "203.0.113.9");

  const headersWithXffOnly = new Headers({
    "x-forwarded-for": "1.2.3.4, not-an-ip, 198.51.100.42",
  });
  assert.equal(getClientIp(headersWithXffOnly), "198.51.100.42");

  const headersWithSpoofedText = new Headers({
    "x-real-ip": "invalid-ip",
    "x-forwarded-for": "also-invalid",
  });
  assert.equal(getClientIp(headersWithSpoofedText), "unknown");
});

test("DiagnoseRateLimiter enforces burst, window, and duplicate submission limits", () => {
  const limiter = new DiagnoseRateLimiter({
    windowMs: 600_000,
    maxRequests: 4,
    burstWindowMs: 60_000,
    burstMax: 2,
    dedupWindowMs: 600_000,
  });

  const t0 = 1_000_000;
  assert.equal(limiter.check("203.0.113.1", "13800000001", "问题A", t0).allowed, true);
  // Duplicate content blocked immediately
  const dup = limiter.check("203.0.113.2", "13800000001", "问题A", t0 + 1000);
  assert.equal(dup.allowed, false);
  assert.equal(dup.reason, "duplicate");

  // Second request within burst window allowed
  assert.equal(limiter.check("203.0.113.1", "13800000002", "问题B", t0 + 2000).allowed, true);
  // Third request within 60s burst window blocked
  const burst = limiter.check("203.0.113.1", "13800000003", "问题C", t0 + 3000);
  assert.equal(burst.allowed, false);
  assert.equal(burst.reason, "burst_limit");

  // After burst window passes, 3rd & 4th succeed, 5th hits window maxRequests
  assert.equal(limiter.check("203.0.113.1", "13800000003", "问题C", t0 + 70_000).allowed, true);
  assert.equal(limiter.check("203.0.113.1", "13800000004", "问题D", t0 + 71_000).allowed, true);
  const windowLimit = limiter.check("203.0.113.1", "13800000005", "问题E", t0 + 150_000);
  assert.equal(windowLimit.allowed, false);
  assert.equal(windowLimit.reason, "rate_limit");
});

test("webhook-sanitize neutralizes markdown, HTML tags, mentions, and non-phone tel URIs", () => {
  const injected = '张三 <font color="warning">hack</font> [点击](https://evil.com) @all @所有人';
  const single = sanitizeWebhookSingleLine(injected);
  assert.equal(single.includes("<font"), false);
  assert.equal(single.includes("[点击](https://evil.com)"), false);
  assert.equal(single.includes("@all"), false);
  assert.equal(single.includes("@所有人"), false);

  const multi = sanitizeWebhookMultiLine("第一行\n> 伪造引用\n<at id=all></at>");
  assert.equal(multi.includes("<at"), false);
  assert.equal(multi.includes("\n> "), false);
  assert.equal(multi.includes("＞ 伪造引用"), true);

  assert.equal(sanitizeTelUri("+86 138-0013-8000"), "+8613800138000");
  assert.equal(sanitizeTelUri("wxid_abc123"), null);
  assert.equal(sanitizeTelUri("user@example.com"), null);
});

test("persistLeadRecord enforces restrictive permissions, rotation, and directory quota", async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "haflow-leads-test-"));
  try {
    const r1 = await persistLeadRecord(
      { id: "lead_1", payload: "a".repeat(120) },
      { leadsDir: tmpDir, maxFileBytes: 180, maxDirBytes: 400 }
    );
    const dirStat = fs.statSync(tmpDir);
    const fileStat = fs.statSync(r1.filePath);
    assert.equal(dirStat.mode & 0o777, 0o700);
    assert.equal(fileStat.mode & 0o777, 0o600);
    assert.equal(r1.rotated, false);

    const r2 = await persistLeadRecord(
      { id: "lead_2", payload: "b".repeat(120) },
      { leadsDir: tmpDir, maxFileBytes: 180, maxDirBytes: 400 }
    );
    assert.equal(r2.rotated, true);

    await assert.rejects(
      () =>
        persistLeadRecord(
          { id: "lead_3", payload: "c".repeat(200) },
          { leadsDir: tmpDir, maxFileBytes: 180, maxDirBytes: 400 }
        ),
      LeadStorageQuotaError
    );

    // Existing files must still be intact
    const files = fs.readdirSync(tmpDir);
    assert.equal(files.length, 2);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
