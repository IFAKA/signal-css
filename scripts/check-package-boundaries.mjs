import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const packagePath = resolve(root, "packages/signal-css/package.json");
const packageJson = JSON.parse(await readFile(packagePath, "utf8"));
const source = `${await readFile(resolve(root, "packages/signal-css/src/styles.css"), "utf8")}\n${await readFile(resolve(root, "packages/signal-css/src/animations.css"), "utf8")}`;
const frameworkSiteSelector = /\.(?:site-|catalog-|docs-|doc-|demo|hero-|showcase-|dashboard-|product-|workspace-)\b/i;
const violations = [];

for (const dependencyGroup of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
  for (const name of Object.keys(packageJson[dependencyGroup] ?? {})) {
    if (name === "react" || name === "react-dom" || name === "next" || name.startsWith("@signal-css/react")) {
      violations.push(`${dependencyGroup} contains ${name}`);
    }
  }
}

for (const pattern of [/from\s+["'].*(?:react|next|app\/|site\/)/i, /@import\s+["'].*(?:react|next)/i]) {
  if (pattern.test(source)) violations.push(`CSS package source matches ${pattern}`);
}

if (violations.length) {
  console.error("Signal CSS package boundary check failed:\n" + violations.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

if (frameworkSiteSelector.test(source)) {
  violations.push("published CSS contains a website-specific selector");
}

const frameworkApp = await readFile(resolve(root, "app/layout.tsx"), "utf8");
if (!/signal-css\/styles\.css/.test(frameworkApp) || !/signal-css\/animations\.css/.test(frameworkApp) || /@signal-css\/react\/styles\.css/.test(frameworkApp)) {
  violations.push("framework website must load Signal CSS layers and must not load a React stylesheet");
}

if (violations.length) {
  console.error("Signal CSS package boundary check failed:\n" + violations.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log("Signal CSS package boundary check passed.");
