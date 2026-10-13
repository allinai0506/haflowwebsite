import assert from "node:assert/strict";
import fs from "node:fs";
const origin = process.env.SEO_TEST_ORIGIN || "http://127.0.0.1:3115";
const response = await fetch(`${origin}/about`);
assert.equal(response.status, 200);
const html = await response.text();
const normalize = (text) => text.replace(/<!--.*?-->/gs, "").replace(/<[^>]*>/g, "").replace(/\s+/g, "").replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
const ids = ["positioning", "responsibility", "practice", "brands", "story", "principles", "direction", "character"];
const contents = Object.fromEntries(ids.map(id => [id, normalize(html.match(new RegExp(`<section id="${id}"[\\s\\S]*?<\\/section>`))[0])]));
for (const id of ["honesty", "contact"]) {
  const tag = id === "honesty" ? "aside" : "section";
  contents[id] = normalize(html.match(new RegExp(`<${tag} aria-labelledby="${id}-title"[\\s\\S]*?<\\/${tag}>`))[0]);
}
if (process.env.ABOUT_SAVE_BASELINE) {
  fs.writeFileSync(process.env.ABOUT_SAVE_BASELINE, JSON.stringify(contents, null, 2));
  console.log("Saved delivered copy baseline");
}
assert.equal((html.match(/<h1\b/g) || []).length, 1);
const nav = html.match(/<nav[^>]*aria-label="关于我们页内导航"[^>]*>[\s\S]*?<\/nav>/)?.[0];
assert.ok(nav, "Chapter navigation must be present");
assert.ok(nav.includes('data-about-nav="sticky"'), "Chapter navigation must support persistent browsing");
assert.equal((nav.match(/<a\b/g) || []).length, 8);
assert.equal((nav.match(/aria-current="location"/g) || []).length, 1, "Exactly one current chapter");
for (const id of ids) assert.ok(nav.includes(`href="#${id}"`), id);
if (process.env.ABOUT_BASELINE_FILE) assert.deepEqual(contents, JSON.parse(fs.readFileSync(process.env.ABOUT_BASELINE_FILE, "utf8")), "Approved copy must stay unchanged");
const assets = [...new Set([...html.matchAll(/(?:src|href)="([^" ]+\.(?:js|css)(?:\?[^" ]*)?)"/g)].map(m => m[1]))];
for (const asset of assets) assert.equal((await fetch(new URL(asset, origin))).status, 200, asset);
console.log(JSON.stringify({origin,chapters:8,copy:"PASS",navigation:"PASS",assets:assets.length}));
