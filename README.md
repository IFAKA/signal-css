# Signal CSS

Signal CSS is a browser-first CSS framework for semantic HTML, responsive layouts, accessible states, and reduced-motion interfaces. Standalone customer-style examples now live in the separate [Signal Showcase](https://showcase.signalcss.dev) site.

The visual system is intentionally built with semantic HTML, native controls, focused CSS modules, and optional React state compositions. The framework site consumes both local packages: Signal CSS owns layout, density, responsive behavior, states, focus, and visual language; `@signal-css/react` adds behavior and composition where useful.

The aggregate stylesheet is `packages/signal-css/src/styles.css`, exposed as `signal-css/styles.css`. It preserves the stable import, while `core.css`, `layout.css`, `media.css`, `forms.css`, `navigation.css`, `data.css`, `overlays.css`, and `components.css` are additive independently importable modules. It does not export React components or require a JavaScript runtime.

## What the framework covers

- Responsive layout primitives, cards, tables, filters, and pagination
- Native `details`, `dialog`, `form`, `progress`, `meter`, `select`, and `button` patterns
- Status messaging, tabs, disclosure, and accessible feedback patterns
- Mobile layouts, reduced-motion support, keyboard focus states, and screen-reader labels
- The framework website has two public sections: `/` (landing) and `/docs` (documentation). React components are maintained in the separate Signal Components repository and site.

The `/docs` route is the explicit framework surface: it documents the browser-first contract, capability map, usage model, native HTML patterns, and accessibility guidance.

## Shared site contract

`signal-css` owns the visual and semantic CSS contract: typography, page width,
spacing rhythm, native HTML patterns, cards, states, focus, and responsive
behavior. The framework website also installs the optional React package from
the sibling `signal-components` repository so both official sites exercise the
same local package pair.

All data is simulated and stays local to the browser session. Product-shaped examples are maintained separately in Signal Showcase.

## Run the workspace

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Framework boundary

The React primitive surface is maintained exclusively in the sibling
`signal-components` repository. The stylesheet is exposed as the
`signal-css/styles.css` package entry so plain HTML sites and sibling
applications can consume the browser-first base without importing this Next.js
site.

### Use the stylesheet from a local project

From the consuming project root, install both sibling packages locally with npm:

```bash
npm install ../signal-css/packages/signal-css ../signal-components/packages/signal-ui-react
```

Then import the stylesheet from the application’s root layout:

```tsx
import "signal-css/styles.css";
import "signal-css/animations.css";
import { Button } from "@signal-css/react";
```

Import Signal CSS once from the consuming app's root layout, before any consumer
overrides. Both packages are currently private and intended for local workspace
composition; they are not yet published to npm. The React package remains
optional for plain HTML consumers and does not provide a stylesheet. The showcase application is runnable
independently from `/Users/faka/code/projects/web/signal-showcase`.

For a focused import, use `signal-css/core.css`, `signal-css/layout.css`,
`signal-css/media.css`,
`signal-css/forms.css`, `signal-css/navigation.css`, `signal-css/data.css`,
`signal-css/overlays.css`, or `signal-css/components.css`. See
[`AGENTS.md`](AGENTS.md), [`recipes/README.md`](recipes/README.md), and the
machine-readable [`public-api.json`](packages/signal-css/public-api.json) for
the canonical markup and selector inventory.

Signal CSS follows the operating system's light or dark appearance through
`color-scheme: light dark` and the system `Canvas`/`CanvasText` colors. Consumers
can override the stable semantic tokens (`--surface`, `--surface-raised`,
`--text`, `--text-muted`, `--border`, `--accent`, `--success`, `--warning`,
and `--danger`) on `:root` or a scoped element. Manual theme selectors, if
needed, belong to the consuming application.

## Verification

```bash
npm run lint
npm run build
```

`npm run lint` enforces the Signal CSS contract across `/` and `/docs`: no CSS modules, inline styles, Tailwind utilities, or
third-party styling imports. The production build compiles the framework
documentation and component inventory routes.

## Support

If this project is useful to you, you can support my work:

[![Support me on Ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/zfaka)
