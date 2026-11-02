# Signal CSS

Signal CSS is the framework-agnostic styling foundation for semantic HTML. It
provides browser-first defaults, design tokens, native control styling,
responsive layout primitives, reusable states, accessibility affordances, and
reduced-motion behavior.

It has no React, Next.js, JavaScript, or component-library dependency.

## Usage

Install the package and import the stable stylesheet entry point:

```sh
npm install signal-css
```

```css
@import "signal-css/styles.css";
@import "signal-css/animations.css";
```

Focused imports are available when an agent or consumer only needs one layer:

```css
@import "signal-css/core.css";
@import "signal-css/layout.css";
@import "signal-css/media.css";
@import "signal-css/forms.css";
@import "signal-css/navigation.css";
@import "signal-css/data.css";
@import "signal-css/overlays.css";
@import "signal-css/components.css";
```

The same files can be loaded directly by a plain HTML project. See the
[`fixtures/plain-html`](fixtures/plain-html) example for a complete native
HTML fixture covering tokens, controls, layout, forms, tables, states, and
motion.

## Public contract

The package styles semantic elements and reusable classes such as `.shell`,
`.grid`, `.card`, `.field`, `.callout`, `.badge`, `.tabs`, `.message`, and
native `button` and `data-variant` attributes. It does not prescribe a JavaScript component model. React
components, when used, are an optional consumer of this CSS contract.

The default color system follows the operating system via `color-scheme: light
dark` and `Canvas`/`CanvasText`. Override `--surface`, `--surface-raised`,
`--text`, `--text-muted`, `--border`, `--accent`, `--success`, `--warning`, or
`--danger` on `:root` or a scoped element when the consuming application needs
its own palette. Manual light/dark theme selectors remain application-owned.
