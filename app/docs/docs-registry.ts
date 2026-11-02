export type DocsRoute =
  | "getting-started"
  | "tokens"
  | "foundations"
  | "layout"
  | "surfaces"
  | "forms"
  | "navigation"
  | "feedback"
  | "states"
  | "motion"
  | "html-patterns"
  | "component-contracts"
  | "accessibility";

export type DocsCategory = "Framework" | "HTML patterns";

export type DocsCapability = {
  name: string;
  route: DocsRoute;
  category: DocsCategory;
  selectors: string[];
  description: string;
  example: string;
};

export type DocsPage = {
  route: DocsRoute;
  title: string;
  summary: string;
  eyebrow: string;
  category: DocsCategory;
  capabilities: DocsCapability[];
};

const capability = (
  route: DocsRoute,
  category: DocsCategory,
  name: string,
  selectors: string[],
  description: string,
  example: string,
): DocsCapability => ({ route, category, name, selectors, description, example });

export const docsPages: DocsPage[] = [
  {
    route: "getting-started",
    title: "Getting started",
    summary: "Install the stylesheet, mark the document as Signal CSS, and compose a useful page with semantic HTML.",
    eyebrow: "First usage",
    category: "Framework",
    capabilities: [
      capability("getting-started", "Framework", "Install the stylesheet", ["signal-css/styles.css"], "Load the published stylesheet directly in a plain HTML document. No React, JavaScript runtime, or build step is required.", `<link rel="stylesheet" href="/signal-css/styles.css">
<link rel="stylesheet" href="/signal-css/animations.css">`),
      capability("getting-started", "Framework", "Opt into Signal", ["data-signal"], "Signal CSS is a single stylesheet. Add the data attribute to the document root or the section you are styling.", `<body data-signal>\n  <main class="shell">\n    <h1>Hello, Signal</h1>\n  </main>\n</body>`),
      capability("getting-started", "Framework", "Compose native HTML", [".shell", ".card"], "Start with headings, links, lists, forms, and sections. Add a shared layout class only when the composition needs it.", `<main class="shell">\n  <article class="card">\n    <h2>Team status</h2>\n    <p>All systems operational.</p>\n  </article>\n</main>`),
    ],
  },
  {
    route: "foundations",
    title: "Foundations",
    summary: "Keep browser defaults visible while Signal CSS provides tokens, readable type, and a clear focus state.",
    eyebrow: "Framework",
    category: "Framework",
    capabilities: [
      capability("foundations", "Framework", "Browser-first defaults", ["body", "a", "button"], "Native elements remain recognizable. Signal CSS sets shared rhythm and safe defaults without replacing the platform control.", `<article>\n  <h2>Native heading</h2>\n  <p><a href="/docs">A real link</a> and <button type="button">a real button</button>.</p>\n</article>`),
      capability("foundations", "Framework", "Visible focus", [":focus-visible"], "Keyboard users get a high-contrast outline on links, buttons, form controls, and disclosure summaries.", `<button type="button">Tab to this control</button>`),
      capability("foundations", "Framework", "Shared tokens", ["--page-gutter", "--content-width", "--layout-gap", "--surface", "--surface-raised", "--text", "--text-muted", "--border", "--accent", "--success", "--warning", "--danger"], "The small set of custom properties keeps page width, gutters, spacing, and semantic color coherent across routes. The default palette follows the operating system; consumers can override these tokens on :root or a scoped element.", `:root {\n  --accent: #7c3aed;\n  --surface-raised: #f5f3ff;\n}`),
    ],
  },
  {
    route: "tokens",
    title: "Tokens and selectors",
    summary: "Use the small public CSS vocabulary for color, spacing, readable widths, surfaces, and responsive composition.",
    eyebrow: "CSS API",
    category: "Framework",
    capabilities: [
      capability("tokens", "Framework", "Core custom properties", ["--page-gutter", "--content-width", "--layout-gap"], "Signal CSS keeps its token surface intentionally small so a plain HTML project can adopt the rhythm without a build step.", `:root {
  --page-gutter: 1rem;
  --content-width: 72rem;
  --layout-gap: 1rem;
}`),
      capability("tokens", "Framework", "Semantic selectors", [".shell", ".layout", ".card", ".callout"], "Compose with semantic selectors that describe structure or meaning, not implementation details. Keep native elements as the starting point.", `<main class="shell">
  <section class="layout">
    <article class="card">Content</article>
    <aside class="callout callout-info">Context</aside>
  </section>
</main>`),
    ],
  },
  {
    route: "layout",
    title: "Layout",
    summary: "Use a small set of responsive primitives for page shells, columns, grids, and flexible rows.",
    eyebrow: "Framework",
    category: "Framework",
    capabilities: [
      capability("layout", "Framework", "Page shell", [".shell", ".layout"], "The shell constrains reading width. The layout creates a sidebar and content column that collapse on small screens.", `<div class="shell">\n  <div class="layout">\n    <aside>Navigation</aside>\n    <main>Content</main>\n  </div>\n</div>`),
      capability("layout", "Framework", "Responsive grids", [".grid", ".grid.two", ".grid.three", ".auto-grid"], "Grid variants make common compositions readable without breakpoint classes in markup. Use auto-grid when cards should adapt to their available width.", `<section class="auto-grid">\n  <article class="card">One</article>\n  <article class="card">Two</article>\n  <article class="card">Three</article>\n</section>`),
      capability("layout", "Framework", "Flexible rows", [".row"], "Rows wrap naturally and can spread a heading, controls, or actions without measuring the viewport in JavaScript.", `<div class="row spread">\n  <h2>Queue</h2>\n  <button type="button">Refresh</button>\n</div>`),
    ],
  },
  {
    route: "surfaces",
    title: "Surfaces",
    summary: "Give content modest boundaries and semantic status without hiding the browser underneath a heavy visual system.",
    eyebrow: "Framework",
    category: "Framework",
    capabilities: [
      capability("surfaces", "Framework", "Cards and examples", [".card"], "Cards group durable content; examples frame a live pattern. Both preserve ordinary document flow.", `<section class="grid two">\n  <article class="card"><h2>Card</h2><p>Durable content.</p></article>\n  <article class="card"><h2>Example</h2><p>Live pattern.</p></article>\n</section>`),
      capability("surfaces", "Framework", "Callouts", [".callout", ".callout-info", ".callout-warning"], "Use a callout for context that deserves emphasis. Pair tone with words; never make color carry the message alone.", `<aside class="callout callout-info" role="note">\n  <strong>Heads up.</strong>\n  <p>Read the migration note before continuing.</p>\n</aside>`),
      capability("surfaces", "Framework", "Badges", [".badge", ".badge-success", ".badge-warning"], "Badges provide compact status labels. Keep the text meaningful because the dot is only a visual cue.", `<span class="badge badge-success">Operational</span>`),
      capability("surfaces", "Framework", "Responsive media", [".media", ".media-caption"], "Use a semantic figure for framed images or video. Media scales to its container, keeps a controlled aspect ratio, and remains readable without JavaScript.", `<figure class="media">\n  <img src="preview.jpg" alt="Release preview" />\n  <figcaption class="media-caption">Release preview</figcaption>\n</figure>`),
    ],
  },
  {
    route: "forms",
    title: "Forms",
    summary: "Use labels, native controls, validation text, and field grouping to make forms understandable and resilient.",
    eyebrow: "Framework",
    category: "Framework",
    capabilities: [
      capability("forms", "Framework", "Fields", [".field", ".field-description", ".field-error"], "The field pattern keeps a label, hint, control, and error message together. Use data-invalid for the visual error state.", `<div class="field" data-invalid="true">\n  <label for="email">Email</label>\n  <input id="email" type="email" aria-describedby="email-error" />\n  <p id="email-error" class="field-error">Enter a valid email.</p>\n</div>`),
      capability("forms", "Framework", "Native controls", ["input", "select", "textarea", "fieldset"], "Choose the native input type that matches the value. Group related options with fieldset and legend.", `<fieldset>\n  <legend>Notification channel</legend>\n  <label><input type="radio" name="channel" /> Email</label>\n  <label><input type="radio" name="channel" /> SMS</label>\n</fieldset>`),
    ],
  },
  {
    route: "navigation",
    title: "Navigation",
    summary: "Build link-based navigation first, then use the shared patterns for tabs, menus, breadcrumbs, and sidebars.",
    eyebrow: "Framework",
    category: "Framework",
    capabilities: [
      capability("navigation", "Framework", "Tabs", [".tabs"], "Use links for navigable pages and buttons with aria-selected for in-place views. Keep the selected state semantic.", `<nav class="tabs" aria-label="Reports">\n  <a class="is-active" aria-current="page" href="/reports">Overview</a>\n  <a href="/reports/activity">Activity</a>\n</nav>`),
      capability("navigation", "Framework", "Menus and sidebars", [".menu-list", ".sidebar"], "A list of links is the most robust menu. The sidebar is a layout region that moves above content on narrow screens.", `<aside class="sidebar">\n  <nav aria-label="Documentation">\n    <ul class="menu-list"><li><a href="/docs">Overview</a></li></ul>\n  </nav>\n</aside>`),
      capability("navigation", "Framework", "Breadcrumbs", ["nav", "ol"], "Use an ordered list inside a labeled navigation landmark so position and context remain available to assistive technology.", `<nav aria-label="Breadcrumb">\n  <ol><li><a href="/docs">Docs</a></li><li aria-current="page">Navigation</li></ol>\n</nav>`),
    ],
  },
  {
    route: "feedback",
    title: "Feedback",
    summary: "Make status, progress, messages, toasts, and empty states clear in both quiet and dense interfaces.",
    eyebrow: "Framework",
    category: "Framework",
    capabilities: [
      capability("feedback", "Framework", "Messages and callouts", [".message", ".callout"], "Use a message for a durable status in a flow and a callout for contextual guidance. Add an appropriate live role only when content changes.", `<p class="message" role="status">\n  <strong>Saved.</strong>\n  Your changes are up to date.\n</p>`),
      capability("feedback", "Framework", "Toasts", [".toast"], "A toast is transient feedback. It should have a status or alert role and remain readable without relying on animation.", `<div class="toast" role="status">Export ready.</div>`),
      capability("feedback", "Framework", "Progress and empty states", ["progress", "meter", ".empty-state"], "Use progress for task completion, meter for a bounded measurement, and an empty state that explains the next action.", `<div class="empty-state">\n  <p>No reports yet.</p>\n  <button type="button">Create a report</button>\n</div>`),
    ],
  },
  {
    route: "states",
    title: "States",
    summary: "Express loading, success, warning, error, empty, and disabled states with words and native semantics.",
    eyebrow: "CSS API",
    category: "Framework",
    capabilities: [
      capability("states", "Framework", "Status language", [".status", ".message", ".badge"], "Pair visual tone with text so status remains understandable in forced colors, grayscale, and assistive technology.", `<p class="message" role="status">
  <strong>Saved.</strong> Your changes are up to date.
</p>`),
      capability("states", "Framework", "Empty and disabled", [".empty-state", ":disabled"], "An empty state should explain what happened and offer the next action. Let disabled controls remain native and recognizable.", `<section class="empty-state">
  <h2>No projects yet</h2>
  <p>Create a project to see it here.</p>
  <button type="button">Create project</button>
</section>`),
    ],
  },
  {
    route: "motion",
    title: "Motion",
    summary: "Use small, purposeful transitions and preserve a complete experience when reduced motion is enabled.",
    eyebrow: "CSS API",
    category: "Framework",
    capabilities: [
      capability("motion", "Framework", "Purposeful transitions", ["animations.css", "transition"], "Load the optional animation layer only when the interface benefits from spatial feedback. Keep content usable without it.", `<link rel="stylesheet" href="/signal-css/animations.css">
<details>
  <summary>Implementation note</summary>
  <p>Motion explains the change.</p>
</details>`),
      capability("motion", "Framework", "Reduced motion", ["prefers-reduced-motion"], "The framework removes decorative animation and transitions for people who request less motion at the operating-system level.", `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms;
    transition-duration: .01ms;
  }
}`),
    ],
  },
  {
    route: "html-patterns",
    title: "Native HTML",
    summary: "Signal CSS gives semantic HTML room to work: disclosure, dialog, tables, meters, and progress stay native.",
    eyebrow: "HTML patterns",
    category: "HTML patterns",
    capabilities: [
      capability("html-patterns", "HTML patterns", "Disclosure and dialog", ["details", "dialog"], "Use details for optional content and dialog for a modal interaction. Preserve the native controls and focus behavior around them.", `<details open>\n  <summary>Implementation note</summary>\n  <p>Native disclosure needs no custom state machine.</p>\n</details>\n<dialog open aria-label="Preview">Preview content</dialog>`),
      capability("html-patterns", "HTML patterns", "Tables", ["table", ".data-table"], "Tables communicate relationships between values. Add a caption and scope headers; let the surrounding card handle overflow.", `<table class="data-table">\n  <caption>Recent deployments</caption>\n  <thead><tr><th scope="col">Service</th><th scope="col">Status</th></tr></thead>\n  <tbody><tr><td>API</td><td>Ready</td></tr></tbody>\n</table>`),
      capability("html-patterns", "HTML patterns", "Meter and progress", ["meter", "progress"], "Choose the element that describes the value: a measurement in a known range or completion of a task.", `<label for="capacity">API capacity</label>\n<meter id="capacity" min="0" max="100" value="64">64%</meter>\n<progress max="100" value="80">80%</progress>`),
    ],
  },
  {
    route: "component-contracts",
    title: "Component contracts",
    summary: "Use the completed Signal CSS primitives with native HTML and predictable ARIA or data-state hooks for optional behavior.",
    eyebrow: "CSS API",
    category: "Framework",
    capabilities: [
      capability("component-contracts", "Framework", "Alerts and actions", [".alert", "button", "dialog"], "Alerts and buttons are styled by semantic roots and native controls. Alert dialog focus management and confirmation behavior belong to the browser or companion component layer.", `<div class="alert" role="status">
  <strong class="alert-title">Deployment queued</strong>
  <p class="alert-description">The next release is waiting for approval.</p>
</div>
<button type="button">Review release</button>`),
      capability("component-contracts", "Framework", "Menus and selection", [".combobox", ".command", ".menu-popover"], "Menus and selection surfaces use semantic roots plus ARIA state attributes. Signal CSS styles open, active, selected, and disabled states; JavaScript owns keyboard navigation and focus management.", `<div class="combobox">
  <button type="button" aria-expanded="true">Actions</button>
  <div class="menu-popover">
    <button type="button">Duplicate</button>
  </div>
</div>`),
      capability("component-contracts", "Framework", "Inputs and toggles", [".field", "mark", "button"], "Native inputs, selects, toggles, and markers share responsive sizing, invalid states, focus visibility, and readable text without replacing browser semantics.", `<label class="field">
  <span class="label">Project</span>
  <input type="text" value="Signal CSS" />
</label>
<select aria-label="Environment"><option>Production</option></select>
<button type="button" aria-pressed="true">Pinned</button>
<p>Search result: <mark>Signal</mark></p>`),
      capability("component-contracts", "Framework", "Carousel and chart surfaces", [".carousel", ".carousel-status", ".chart", ".chart-legend"], "Carousels expose orientation, slide visibility, scroll snap, and an optional live status. Charts provide a responsive visual surface and legend; data rendering remains application behavior.", `<section class="carousel" data-orientation="horizontal" aria-label="Release notes">
  <div class="carousel-content"><article class="carousel-slide" aria-hidden="false"><h3>Version 1</h3><p>Stable release.</p></article></div>
  <p class="carousel-status" aria-live="polite">Slide 1 of 1</p>
</section>
<figure class="chart"><svg viewBox="0 0 160 60" role="img" aria-label="Stable delivery trend"><polyline points="0,48 40,32 80,36 120,18 160,20" fill="none" stroke="currentColor" /></svg><figcaption class="chart-caption">Delivery trend</figcaption></figure>`),
      capability("component-contracts", "Framework", "Typography and native controls", [".typography", "kbd", "mark"], "Typography keeps readable native headings, lists, quotations, code, keyboard hints, and markers together in a bounded measure. It is a composition class, not a replacement for semantic HTML.", `<article class="typography">
  <h2>Keyboard-first workflows</h2>
  <p>Press <kbd>⌘</kbd><kbd>K</kbd> to open the command surface.</p>
  <blockquote>Keep the browser in the room.</blockquote>
</article>`),
    ],
  },
  {
    route: "accessibility",
    title: "Accessibility",
    summary: "Keyboard access, visible focus, semantic status, skip navigation, and reduced motion are part of the framework contract.",
    eyebrow: "HTML patterns",
    category: "HTML patterns",
    capabilities: [
      capability("accessibility", "HTML patterns", "Keyboard and focus", [":focus-visible", ".skip-link"], "Keep the natural tab order, use native controls, and provide a skip link before repeated navigation.", `<a class="skip-link" href="#main-content">Skip to content</a>\n<main id="main-content">Page content</main>`),
      capability("accessibility", "HTML patterns", "Semantic status", ["aria-current", "aria-live"], "Expose the current page and changing feedback in the accessibility tree. Use ARIA to clarify native semantics, not replace them.", `<nav aria-label="Sections">\n  <a href="/docs" aria-current="page">Overview</a>\n</nav>\n<p role="status" aria-live="polite">Saved.</p>`),
      capability("accessibility", "HTML patterns", "Reduced motion", ["prefers-reduced-motion"], "The reduced-motion media query removes decorative motion while keeping content and interaction complete.", `@media (prefers-reduced-motion: reduce) {\n  * { animation-duration: .01ms; }\n}`),
    ],
  },
];

export const docsByRoute = Object.fromEntries(docsPages.map(page => [page.route, page])) as Record<DocsRoute, DocsPage>;

export const frameworkPages = docsPages.filter(page => page.category === "Framework");
export const htmlPatternPages = docsPages.filter(page => page.category === "HTML patterns");
