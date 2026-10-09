const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const DIST_ROOT = path.resolve(__dirname, "..", "dist");

function readDist(filePath) {
  return fs.readFileSync(path.join(DIST_ROOT, filePath), "utf8");
}

test("builds a Docsify entry point and generated navigation", () => {
  const index = readDist("index.html");
  const sidebar = readDist("_sidebar.md");
  const navbar = readDist("_navbar.md");

  assert.match(index, /id="app"/);
  assert.match(index, /docsify@4\.13\.1\/lib\/docsify\.min\.js/);
  assert.match(index, /loadSidebar: true/);
  assert.match(sidebar, /\*\*开始使用\*\*/);
  assert.match(sidebar, /Ash 概览/);
  assert.match(navbar, /GitHub/);
  assert.ok(fs.existsSync(path.join(DIST_ROOT, "docs", "getstarted", "overview.md")));
  assert.ok(fs.existsSync(path.join(DIST_ROOT, "favicon.svg")));
});


test("ships a Pages artifact without the legacy hosting handoff", () => {
  assert.ok(fs.existsSync(path.join(DIST_ROOT, ".nojekyll")));
  assert.ok(!fs.existsSync(path.join(DIST_ROOT, ".openai")));
  assert.match(readDist("index.html"), /href="\.\/favicon\.svg"/);
  assert.ok(fs.existsSync(path.join(DIST_ROOT, "docs", "getstarted", "first-task.md")));
});

test("article links retain root paths for Docsify routing from home and nested pages", () => {
  const vm = require("node:vm");
  const script = readDist("index.html").match(/<script>\s*([\s\S]*?)<\/script>/)[1];
  const context = { window: {} };
  vm.runInNewContext(script, context);
  for (const file of ["docs/getstarted/overview.md", "docs/agents/sessions.md"]) {
    let normalize;
    context.window.$docsify.plugins[0]({ beforeEach(fn) { normalize = fn; }, doneEach() {} }, { route: { file } });
    assert.equal(normalize("[开始](/docs/getstarted/first-task.md)"), "[开始](/docs/getstarted/first-task.md)");
    assert.equal(normalize("[步骤](/docs/getstarted/first-task.md#check)"), "[步骤](/docs/getstarted/first-task.md#check)");
  }
});


test("publishes a keyboard-accessible reading shell with reduced motion", () => {
  const html = readDist("index.html");
  const css = readDist("docs-theme.css");
  const js = readDist("docs-shell.js");
  assert.match(html, /<dialog id="docs-search" aria-label="搜索文档">/);
  assert.match(html, /aria-haspopup="dialog"/);
  assert.match(html, /src="\.\/docs-shell\.js\?v=[a-f0-9]{12}"/);
  assert.match(css, /prefers-reduced-motion:reduce/);
  assert.match(css, /data-theme="dark"/);
  assert.match(js, /dialog\.showModal\(\)/);
  assert.match(js, /priorFocus\.focus\(\)/);
});


test("published search content excludes metadata and uses a content-versioned cache", () => {
  assert.doesNotMatch(readDist("docs/getstarted/overview.md"), /^---/);
  assert.doesNotMatch(readDist("docs/getstarted/overview.md"), /MetaDescription:/);
  assert.match(readDist("index.html"), /window\.__ashDocDescriptions =/);
  assert.match(readDist("index.html"), /namespace: "ash-docs-[a-f0-9]{12}"/);
});
