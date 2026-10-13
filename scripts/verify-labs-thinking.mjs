import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const origin = process.env.LABS_TEST_ORIGIN || "http://127.0.0.1:3112";
const source = readFileSync("src/data/enterprise-runtime-thinking.ts", "utf8");
const manuscript = source.match(/THINKING_TEXT = String.raw`([\s\S]*?)`;/)?.[1];
assert.ok(manuscript, "Full manuscript exists");
const response = await fetch(`${origin}/labs/enterprise-runtime`);
assert.equal(response.status, 200);
const html = await response.text();
const article = html.match(/<article id="design-thinking"[\s\S]*?<\/article>/)?.[0];
assert.ok(article, "Article is server-rendered");
const normalize = (text) => text.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, "");
const delivered = normalize(article.replace(/<[^>]+>/g, ""));
let checked = 0;
for (const line of manuscript.split("\n")) {
  if (!line.trim() || /^\[(diagram|timeline|model):/.test(line) || /^\|[\s|:-]+\|$/.test(line)) continue;
  const text = line.replace(/^#{1,3} |^> |^- /, "").replace(/\[([^\]]+)\]\(https:\/\/[^)]+\)/g, "$1");
  const parts = text.startsWith("|") ? text.slice(1, -1).split("|") : [text];
  for (const part of parts) {
    assert.ok(delivered.includes(normalize(part)), `Missing manuscript text: ${part}`);
    checked++;
  }
}
for (const match of source.matchAll(/(?:body|title|year|period|en): "([^"\n]+)"/g)) {
  assert.ok(delivered.includes(normalize(match[1])), `Missing diagram text: ${match[1]}`);
  checked++;
}
const diagramLabels = ["员工申请", "领导审批", "业务执行", "形成记录", "事先授权", "业务直接执行", "自动生成台账", "系统持续检查风险和异常", "正常业务自动放行，超出授权的业务再进入人工决策", "完成 A 客户报价", "客户情况 · 产品信息 · 预算 · 授权 · 业务规则", "查询客户信用", "核算产品成本", "生成报价方案", "校验政策与授权", "Agent 与业务系统按依赖关系协同执行", "自动完成报价", "交给有权负责人", "保留执行过程、决策依据、授权版本和责任人", "全过程证据与责任记录", "贯穿以上所有对象，支持追溯、审计和纠偏"];
for (const label of diagramLabels) assert.ok(delivered.includes(normalize(label)), label);
for (let index = 1; index <= 9; index++) {
  assert.ok(article.includes(`id="thinking-${index}"`));
  assert.ok(article.includes(`href="#thinking-${index}"`));
}
assert.equal((article.match(/<table\b/g) || []).length, 3);
assert.equal((article.match(/<figure\b/g) || []).length, 4);
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.ok(html.indexOf('id="design-thinking"') < html.indexOf('<iframe'));
assert.ok(!article.includes('google.com/s2/favicons'));
assert.ok(!article.includes('[diagram:'));
assert.ok(html.includes('title="HAFlow 下一代企业运行空间交互原型"'));
const prototype = await fetch(`${origin}/labs/enterprise-runtime-v1.html`);
assert.equal(prototype.status, 200);
assert.equal(await prototype.text(), readFileSync("public/labs/enterprise-runtime-v1.html", "utf8"));
console.log(`PASS: ${checked} manuscript/diagram fragments, 9 chapters, 3 tables, 4 diagrams; complete unchanged prototype.`);
