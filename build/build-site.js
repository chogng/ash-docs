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

// Version local UI assets so repeat visitors receive the matching deployed shell.
const entryPath = path.join(OUTPUT_DIRECTORY, "index.html");
let entry = fs.readFileSync(entryPath, "utf8");
for (const asset of ["docs-theme.css", "docs-shell.js"]) {
  const digest = crypto.createHash("sha256").update(fs.readFileSync(path.join(OUTPUT_DIRECTORY, asset))).digest("hex").slice(0, 12);
  entry = entry.replace(`./${asset}"`, `./${asset}?v=${digest}"`);
}
fs.writeFileSync(entryPath, entry);

// GitHub Pages serves the generated static site without Jekyll processing.
fs.writeFileSync(path.join(OUTPUT_DIRECTORY, ".nojekyll"), "");

console.log("Built the Docsify site in dist/.");
