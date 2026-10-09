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

test("article links use project-safe hash routes from home and nested pages", () => {
  const vm = require("node:vm");
  const script = readDist("index.html").match(/<script>\s*([\s\S]*?)<\/script>/)[1];
  const context = { window: {} };
  vm.runInNewContext(script, context);
  for (const file of ["docs/getstarted/overview.md", "docs/agents/sessions.md"]) {
    let normalize;
    context.window.$docsify.plugins[0]({ beforeEach(fn) { normalize = fn; }, doneEach() {} }, { route: { file } });
    assert.equal(normalize("[开始](/docs/getstarted/first-task.md)"), "[开始](#/docs/getstarted/first-task)");
    assert.equal(normalize("[步骤](/docs/getstarted/first-task.md#check)"), "[步骤](#/docs/getstarted/first-task?id=check)");
  }
});
