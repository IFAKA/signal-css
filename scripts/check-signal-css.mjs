import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const publicTrees = ["app/page.tsx", "app/docs", "app/site"];
const stylingImportPattern = /(?:from\s+|import\s*\()(['"])([^'"\n]+)\1|import\s+['"]([^'"\n]+)['"]/g;
const coupledClassPattern = /\b(?:dashboard(?:-[a-z0-9_-]+)?|form-grid|component-[a-z0-9_-]+|(?:page|view)-[a-z0-9_-]+)\b/gi;
const coupledSelectorPattern = /\.(?:dashboard(?:-[a-z0-9_-]+)?|form-grid|component-[a-z0-9_-]+|(?:page|view)-[a-z0-9_-]+)\b/gi;
const classAttributePattern = /(?:className|class)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{`([^`]*)`\})/g;
const relativeImportPattern = /(?:from\s+|import\s*\()(['"])(\.\.?\/)[^'"\n]*\1|import\s+['"](\.\.?\/)[^'"\n]*['"]/g;
const violations = [];
const legacyClassPattern = /^(?:signal-button(?:-[A-Za-z0-9_-]+)?|button(?:-[A-Za-z0-9_-]+)?)$/;
const legacyClassMessage = className => `legacy class "${className}" is forbidden; use a native button with data-variant instead.`;

const sourceDirectory = path.join(root, "packages/signal-css/src");
const moduleNames = ["core", "layout", "media", "forms", "navigation", "data", "overlays", "components"];
const moduleSources = Object.fromEntries(await Promise.all(moduleNames.map(async name => [name, await readFile(path.join(sourceDirectory, `${name}.css`), "utf8")] )));
const publicApi = JSON.parse(await readFile(path.join(root, "packages/signal-css/public-api.json"), "utf8"));
const stylesheetPath = path.join(sourceDirectory, "styles.css");
const stylesheet = `${await readFile(stylesheetPath, "utf8")}\n${await readFile(path.join(sourceDirectory, "animations.css"), "utf8")}`;
const allSource = Object.values(moduleSources).join("\n");
const signalClasses = new Set([...allSource.matchAll(/\.([A-Za-z][A-Za-z0-9_-]*)\b/g)].map(match => match[1]));
const legacyPattern = /\.(?:signal-button(?:-[A-Za-z0-9_-]+)?|button(?:-[A-Za-z0-9_-]+)?)\b/g;
const roleRepeatingPattern = /\.signal-(?:button|input|select|textarea|form|card|dialog|table|link|nav|heading|label|checkbox|radio|progress|meter)(?![A-Za-z0-9_-])|\.(?:input|select|textarea|checkbox|radio|dialog|table|form|link)(?![A-Za-z0-9_-])/g;

for (const module of moduleNames) {
  const source = moduleSources[module];
  for (const match of source.matchAll(legacyPattern)) report(path.join(sourceDirectory, `${module}.css`), source, match.index, `legacy selector "${match[0]}" is not part of the classless API.`);
  for (const match of source.matchAll(roleRepeatingPattern)) report(path.join(sourceDirectory, `${module}.css`), source, match.index, `role-repeating selector "${match[0]}" is forbidden; style the native element instead.`);
}
for (const required of ["@layer signal.core", "@import \"./core.css\"", "@import \"./layout.css\"", "@import \"./media.css\"", "@import \"./forms.css\"", "@import \"./navigation.css\"", "@import \"./data.css\"", "@import \"./overlays.css\"", "@import \"./components.css\""]) {
  if (!stylesheet.includes(required)) report(stylesheetPath, stylesheet, 0, `aggregate is missing ${required}.`);
}
for (const required of ["prefers-reduced-motion", "forced-colors", "focus-visible", "min-block-size: 2.75rem"]) {
  if (!allSource.includes(required)) report(stylesheetPath, allSource, 0, `public contract is missing ${required}.`);
}
for (const element of ["a", "button", "input", "select", "textarea", "fieldset", "summary", "dialog", "details", "table", "progress", "meter"]) {
  if (!new RegExp(`(?:^|[,{]\\s*|\\s)${element}(?=[\\s:{,])`, "m").test(allSource)) {
    report(stylesheetPath, allSource, 0, `browser-first contract is missing native ${element} styling.`);
  }
}

for (const module of moduleNames) {
  const source = moduleSources[module];
  const declared = publicApi.modules[`${module}.css`] ?? [];
  const declaredClasses = new Set(declared.filter(selector => selector.startsWith(".")).map(selector => selector.slice(1)));
  const actualClasses = new Set([...source.matchAll(/\.([A-Za-z][A-Za-z0-9_-]*)\b/g)].map(match => match[1]));
  for (const selector of declaredClasses) {
    if (!actualClasses.has(selector)) report(path.join(root, "packages/signal-css/public-api.json"), JSON.stringify(publicApi), 0, `public API lists ".${selector}" under ${module}.css, but the selector is not defined there.`);
  }
  for (const selector of actualClasses) {
    if (!declaredClasses.has(selector)) report(path.join(root, "packages/signal-css/public-api.json"), JSON.stringify(publicApi), 0, `selector ".${selector}" in ${module}.css is missing from the public API inventory.`);
  }
}

async function filesIn(target) {
  const absoluteTarget = path.join(root, target);
  let fileStat;
  try {
    fileStat = await stat(absoluteTarget);
  } catch {
    return [];
  }

  if (fileStat.isFile()) return [absoluteTarget];

  const entries = await readdir(absoluteTarget, { withFileTypes: true });
  const nested = await Promise.all(entries.map(entry => filesIn(path.join(target, entry.name))));
  return nested.flat();
}

function lineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}

function report(file, source, index, message) {
  violations.push(`${path.relative(root, file)}:${lineNumber(source, index)} — ${message}`);
}

for (const target of publicTrees) {
  const files = await filesIn(target);
  for (const file of files.filter(candidate => /\.module\.(?:css|scss|sass|less)$/.test(candidate))) {
    report(file, "", 0, "CSS modules are not allowed in Signal CSS pages; use the Signal CSS package.");
  }
  for (const file of files.filter(candidate => /\.(tsx?|jsx?)$/.test(candidate))) {
    const source = await readFile(file, "utf8");

    for (const match of source.matchAll(relativeImportPattern)) {
      report(file, source, match.index, "relative application imports are not allowed; use the configured @/* absolute alias.");
    }

    for (const match of source.matchAll(stylingImportPattern)) {
      const importedPath = match[2] ?? match[3] ?? "";
      if (/\.module\.(?:css|scss|sass|less)$/.test(importedPath)) {
        report(file, source, match.index, "CSS modules are not allowed; use the Signal CSS package.");
      }
      if (/^(?:styled-components|@emotion(?:\/|$)|@stitches\/)/.test(importedPath)) {
        report(file, source, match.index, `third-party styling import "${importedPath}" is not allowed.`);
      }
    }

    for (const match of source.matchAll(/\bstyle\s*=|\bstyle\s*:/g)) {
      report(file, source, match.index, "inline styles are not allowed; use a reusable Signal CSS class.");
    }

    for (const match of source.matchAll(/(?:className|class)\s*=\s*[{`"'][^\n]*(?:\b(?:sm|md|lg|xl|2xl):|\b(?:flex|grid|block|inline|hidden|relative|absolute|fixed|sticky|items|justify|space|gap|p|px|py|m|mx|my|w|h|text|bg|border|rounded|shadow|font|leading|tracking|col|row)-[a-z0-9])/gi)) {
      report(file, source, match.index, "Tailwind utility classes are not allowed; use Signal CSS classes.");
    }

    for (const match of source.matchAll(/(?:className|class)\s*=\s*(?:"[^"]*"|\{`[^`]*`\})/gi)) {
      const className = match[0].match(coupledClassPattern)?.[0];
      if (className) report(file, source, match.index, `page/view-coupled class "${className}" is not allowed; use a shared Signal CSS primitive.`);
    }

    for (const match of source.matchAll(classAttributePattern)) {
      const classValue = match[1] ?? match[2] ?? match[3] ?? "";
      for (const className of classValue.split(/\s+/).filter(Boolean)) {
        if (/\$\{|\{|\}/.test(className)) continue;
        if (legacyClassPattern.test(className)) report(file, source, match.index, legacyClassMessage(className));
        if (!signalClasses.has(className)) report(file, source, match.index, `class "${className}" is not present in the published Signal CSS contract.`);
      }
    }
  }
}

for (const match of stylesheet.matchAll(coupledSelectorPattern)) {
  report(stylesheetPath, stylesheet, match.index, `page/view-coupled selector ".${match[0]}" is not allowed in the shared stylesheet.`);
}

const docsRegistryPath = path.join(root, "app/docs/docs-registry.ts");
try {
  const docsRegistry = await readFile(docsRegistryPath, "utf8");
  const nativeElements = new Set(["a", "body", "button", "details", "dialog", "fieldset", "input", "kbd", "mark", "meter", "nav", "ol", "progress", "select", "table", "textarea"]);
  const nativeAttributes = new Set(["aria-current", "aria-live", "data-signal"]);
  for (const entry of docsRegistry.matchAll(/selectors:\s*\[([^\]]*)\]/g)) {
    const selectors = [...entry[1].matchAll(/["']([^"']+)["']/g)].map(match => match[1]);
    for (const selector of selectors) {
      const existsInStylesheet = selector.startsWith(".")
        ? new RegExp(`\\${selector}(?:[\\s:{,.)]|$)`).test(stylesheet)
        : selector.startsWith(":") || selector.startsWith("--")
          ? stylesheet.includes(selector)
          : nativeElements.has(selector) || nativeAttributes.has(selector);
      if (!existsInStylesheet) {
        const index = docsRegistry.indexOf(selector, entry.index);
        report(docsRegistryPath, docsRegistry, index < 0 ? entry.index : index, `documentation selector or native element "${selector}" is not present in the Signal CSS contract.`);
      }
    }
  }
} catch {
  // The docs registry is optional for older checkouts; the route contract still runs.
}

if (violations.length > 0) {
  console.error("Signal CSS contract violations found:");
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log("Signal CSS contract passed for / and /docs.");
}
