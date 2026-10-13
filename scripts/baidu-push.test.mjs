import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

function run(args, state) {
  return spawnSync(process.execPath, ["scripts/baidu-push.mjs", "--dry-run", ...args], {
    encoding: "utf8", timeout: 20000,
    env: { ...process.env, BAIDU_PUSH_TOKEN: "", BAIDU_PUSH_STATE: state },
  });
}
test("dry-run can resubmit an already submitted page without changing state", () => {
  const dir = mkdtempSync(join(tmpdir(), "haflow-baidu-"));
  try {
    const file = join(dir, "state.json");
    const before = JSON.stringify({ pushed: ["https://www.haflow.cn/", "https://www.haflow.cn/about"], updatedAt: "2026-09-01" });
    writeFileSync(file, before);
    const result = run(["--url=/", "--url=/about", "--limit=1"], file);
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /\* https:\/\/www\.haflow\.cn\/\s/);
    assert.doesNotMatch(result.stdout, /\* https:\/\/www\.haflow\.cn\/about/);
    assert.equal(readFileSync(file, "utf8"), before);
  } finally { rmSync(dir, { recursive: true }); }
});
test("explicit URLs are canonicalized and deduplicated", () => {
  const result = run(["--url=https://haflow.cn/about", "--url=/about"], join(tmpdir(), "haflow-unused-state.json"));
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /待推送总量: 1 个/);
  assert.equal((result.stdout.match(/\* https:\/\/www\.haflow\.cn\/about/g) || []).length, 1);
});
test("off-site and noncanonical URLs are rejected before submission", () => {
  for (const url of ["https://example.com/", "//example.com/", "/about?x=1", "/about#team", "/about?", "/about#", "https://user@www.haflow.cn/", "https://www.haflow.cn:444/", ""]) {
    const result = run([`--url=${url}`], join(tmpdir(), "haflow-unused-state.json"));
    assert.equal(result.status, 2, `${url}: ${result.stdout} ${result.stderr}`);
  }
});
