import assert from "node:assert/strict";
import { test } from "node:test";

const origin = process.env.SEO_TEST_ORIGIN || "http://127.0.0.1:3112";
const site = "https://www.haflow.cn";
async function read(path) {
  const response = await fetch(`${origin}${path}`);
  assert.equal(response.status, 200, path);
  return response.text();
}
const title = (html) => html.match(/<title>(.*?)<\/title>/s)?.[1];
const schemas = (html) => [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));

// These assertions use delivered HTML rather than metadata configuration.
test("homepage title leads with the brand and preserves the product", async () => {
  assert.equal(title(await read("/")), "共事智能官网｜企业 AI 落地与 HAFlow 人机协同平台");
});
test("homepage brand is visible in its heading and product introduction", async () => {
  const html = await read("/");
  const heading = html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1];
  assert.ok(heading?.includes("共事智能"));
  assert.ok(!heading.includes("sr-only"));
  assert.ok(html.includes("HAFlow 是共事智能打造的人机协同任务执行平台"));
});
test("website identity is the brand, separate from the product", async () => {
  const data = schemas(await read("/"));
  const website = data.find((entry) => entry["@type"] === "WebSite");
  const organization = data.find((entry) => entry["@type"] === "Organization");
  assert.equal(website["@id"], `${site}/#website`);
  assert.equal(organization["@id"], `${site}/#organization`);
  assert.equal(website.name, "共事智能");
  assert.ok(!website.alternateName.includes("HAFlow"));
  assert.equal(website.publisher["@id"], organization["@id"]);
  assert.equal(organization.name, "共事智能");
  assert.equal(organization.legalName, "上海共事智能科技有限公司");
});
test("HAFlow product references the same company entity", async () => {
  const data = schemas(await read("/haflow"));
  const software = data.find((entry) => entry["@type"] === "SoftwareApplication");
  const organization = data.find((entry) => entry["@type"] === "Organization");
  assert.equal(software["@id"], `${site}/haflow#software`);
  assert.equal(organization["@id"], `${site}/#organization`);
  assert.equal(software.name, "HAFlow");
  assert.equal(software.url, `${site}/haflow`);
  assert.equal(software.publisher["@id"], organization["@id"]);
  assert.equal(software.brand.name, "共事智能");
});
test("about page uses the approved brand definition", async () => {
  const html = await read("/about");
  assert.ok(html.includes("共事智能是上海共事智能科技有限公司的品牌"));
  assert.ok(!html.includes("共事是公司品牌"));
});
test("shared navigation and footer display the full brand", async () => {
  const html = await read("/haflow");
  for (const tag of ["header", "footer"]) {
    const section = html.match(new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, "s"))?.[1];
    assert.ok(section?.match(/<span[^>]*>\s*共事智能\s*<\/span>/), tag);
  }
});
test("sitemap dates are stable and reflect the global branding update", async () => {
  const first = await read("/sitemap.xml");
  assert.equal(await read("/sitemap.xml"), first);
  const dates = [...first.matchAll(/<lastmod>(.*?)<\/lastmod>/g)].map((match) => match[1]);
  assert.ok(dates.length > 0);
  const entries = new Map([...first.matchAll(/<url>(.*?)<\/url>/gs)].map((match) => [
    match[1].match(/<loc>(.*?)<\/loc>/)?.[1],
    match[1].match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
  ]));
  assert.equal(entries.get(`${site}/`), "2026-10-11T16:00:00.000Z");
  for (const path of ["/about", "/labs", "/labs/enterprise-runtime"]) {
    assert.equal(entries.get(`${site}${path}`), "2026-10-12T16:00:00.000Z", path);
  }
  for (const date of dates) assert.ok(new Date(date) >= new Date("2026-10-12T00:00:00+08:00"), date);
});
test("all sitemap pages have unique branded titles, one H1 and their own canonical", async () => {
  const xml = await read("/sitemap.xml");
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(urls).size, urls.length);
  const titles = new Set();
  for (const url of urls) {
    assert.equal(new URL(url).origin, site);
    const path = new URL(url).pathname;
    const html = await read(path);
    assert.ok(html.includes('property="og:site_name" content="共事智能"'), path);
    const pageTitle = title(html);
    assert.equal((pageTitle?.match(/共事智能/g) || []).length, 1, `${path}: ${pageTitle}`);
    assert.ok(!titles.has(pageTitle), `duplicate title: ${pageTitle}`);
    titles.add(pageTitle);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, path);
    const canonicals = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)];
    assert.equal(canonicals.length, 1, path);
    assert.equal(new URL(canonicals[0][1]).pathname, path, path);
    assert.equal(new URL(canonicals[0][1]).origin, site, path);
  }
  console.log(`Checked ${urls.length} sitemap pages`);
});
