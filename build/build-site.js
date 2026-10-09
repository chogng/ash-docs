// Copies the runtime-rendered Docsify site into a deployable dist directory.

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIRECTORY = path.join(ROOT, "dist");

fs.rmSync(OUTPUT_DIRECTORY, { recursive: true, force: true });
fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });

for (const file of ["index.html", "_sidebar.md", "_navbar.md"]) {
  fs.copyFileSync(path.join(ROOT, file), path.join(OUTPUT_DIRECTORY, file));
}

for (const directory of ["docs", "public"]) {
  const source = path.join(ROOT, directory);
  const destination = directory === "public" ? OUTPUT_DIRECTORY : path.join(OUTPUT_DIRECTORY, directory);
  fs.cpSync(source, destination, { recursive: true });
}

// Publish article bodies without frontmatter so search does not index metadata.
// Keep descriptions separately for the page renderer.
const descriptions = {};
const contentHash = crypto.createHash("sha256");
function prepareArticles(directory) {
  for (const entry of fs.readdirSync(directory).sort()) {
    const file = path.join(directory, entry);
    if (fs.statSync(file).isDirectory()) { prepareArticles(file); continue; }
    if (!entry.endsWith(".md")) continue;
    const source = fs.readFileSync(file, "utf8");
    const match = /^---\s*\n([\s\S]*?)\n---\s*\n*/.exec(source);
    const body = match ? source.slice(match[0].length) : source;
    const key = path.relative(OUTPUT_DIRECTORY, file).replaceAll("\\", "/");
    descriptions[key] = match?.[1].match(/^MetaDescription:\s*(.+)$/m)?.[1].trim() ?? "";
    contentHash.update(key).update(body);
    fs.writeFileSync(file, body);
  }
}
prepareArticles(path.join(OUTPUT_DIRECTORY, "docs"));

// Version local UI assets so repeat visitors receive the matching deployed shell.
const entryPath = path.join(OUTPUT_DIRECTORY, "index.html");
let entry = fs.readFileSync(entryPath, "utf8");
for (const asset of ["docs-theme.css", "docs-shell.js"]) {
  const digest = crypto.createHash("sha256").update(fs.readFileSync(path.join(OUTPUT_DIRECTORY, asset))).digest("hex").slice(0, 12);
  entry = entry.replace(`./${asset}"`, `./${asset}?v=${digest}"`);
}
entry = entry.replace("window.$docsify = {", `window.__ashDocDescriptions = ${JSON.stringify(descriptions).replaceAll("<", "\\u003c")};\n      window.$docsify = {`);
entry = entry.replace('namespace: "ash-docs"', `namespace: "ash-docs-${contentHash.digest("hex").slice(0, 12)}"`);
fs.writeFileSync(entryPath, entry);

// GitHub Pages serves the generated static site without Jekyll processing.
fs.writeFileSync(path.join(OUTPUT_DIRECTORY, ".nojekyll"), "");

console.log("Built the Docsify site in dist/.");
