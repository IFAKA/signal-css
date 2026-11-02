# Split Signal CSS and Signal Components Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Separate the framework-agnostic Signal CSS package from the optional React Signal Components package, while giving each package its own professional website that consumes both packages and links to the other library.

**Architecture:** Create two sibling repositories: `signal-css` owns the pure CSS framework and its framework website; `signal-components` owns the React component library and its component website. Each website depends on both published packages, but the packages do not depend on each other: `signal-css` remains usable without React, and `signal-components` consumes `signal-css` as its styling foundation.

**Tech Stack:** CSS, native HTML, TypeScript, React, Next.js, npm workspaces during local development, npm packages for distribution, Storybook-style isolated examples only if needed by the component package.

---

## Target repositories

### Repository 1: `signal-css`

Owns:

- `signal-css/styles.css`: reset, design tokens, typography, native element styling, layout primitives, responsive rules, states, accessibility, and reusable semantic classes.
- `signal-css/animations.css`: framework-level motion utilities and reduced-motion behavior.
- Framework documentation site: installation, principles, CSS API, tokens, native HTML recipes, accessibility guidance, browser support, and changelog.
- A small framework site component layer used only to present documentation.

Must not own:

- React UI component implementations.
- Product-specific showcase pages.
- Business-domain examples such as commerce, operations, or portfolio applications.

### Repository 2: `signal-components`

Owns:

- `signal-ui-react`: optional React components and interaction primitives.
- The canonical `UI.*` barrel and component exports.
- Component documentation site: API reference, composition examples, accessibility behavior, controlled/uncontrolled usage, and installation.
- Component-specific tests and isolated component demos.

Must not own:

- The CSS framework source of truth.
- A replacement styling system.
- Product showcase applications that are not needed to explain component composition.

### Website dependency rule

Both sites install:

```text
signal-css-site       -> signal-css + signal-ui-react
signal-components-site -> signal-css + signal-ui-react
```

The package dependency graph remains:

```text
signal-css            -> no UI/runtime dependency
signal-ui-react       -> signal-css
```

The first arrow is a website dependency, not a dependency from the CSS package to React. This preserves the agnostic nature of Signal CSS.

## Current-directory mapping

### Move to `signal-css` package

- `app/globals.css`: split into framework CSS and site-only CSS before publishing.
- `app/animations.css`: retain only framework-level animations.
- Framework-related parts of `README.md`.
- Relevant framework enforcement from `scripts/check-signal-css.mjs`.

### Move to `signal-components`

- `app/components/ui/*.tsx`.
- `app/components/ui-primitives.tsx`.
- `app/components/modal-primitives.tsx`.
- `app/components/ui/index.ts`.
- Component-specific interaction logic, types, and accessibility tests.

Before moving, resolve duplicate or legacy implementations: the individual files and the large primitive aggregators must have one canonical implementation per component.

### Keep in the `signal-css` website initially

- `app/layout.tsx`.
- `app/page.tsx` and `app/components/home-page-content.tsx`.
- `app/docs/**`.
- `app/components/layout.tsx` and `app/components/site-navigation.tsx`.
- Framework documentation navigation and framework-specific examples.

The framework site may render `signal-ui-react` components for navigation, code examples, tabs, alerts, and documentation chrome. Those components are site dependencies, not part of the CSS package.

### Move out of this project’s main site or reduce to links

- `app/showcase/**` and `app/components/showcase-*.tsx`.
- Product-shaped examples under commerce, documentation, marketing, operations, and portfolio.

These should become a separate showcase application later if they remain strategically important. They are not part of either library’s core package.

## Migration tasks

### Task 1: Freeze the current behavior

**Files:**

- Read: `package.json`, `README.md`, `app/globals.css`, `app/animations.css`.
- Read: `app/components/component-registry.tsx`, `app/components/ui/index.ts`, `scripts/*.mjs`.
- Create: `docs/plans/2026-08-14-split-signal-css-and-components.md`.

1. Record the current routes, exported components, CSS selectors, and showcase pages.
2. Run `npm run lint` and `npm run build` and save the baseline results.
3. Run the existing reuse and CSS checks.
4. Do not delete or move files until the inventory is reviewed.

Expected result: a written inventory that distinguishes framework code, React library code, site infrastructure, documentation content, and showcase content.

### Task 2: Create the two-repository workspace

**Files:**

- Create sibling directory: `/Users/faka/code/projects/web/signal-components`.
- Modify: current root package metadata only after the package boundaries are agreed.
- Create: workspace-level development notes documenting local package linking.

1. Create the `signal-components` repository outside the current directory.
2. Keep the current repository as `signal-css`.
3. Use local workspace links or `npm pack` during migration so both sites can test unpublished packages.
4. Use scoped package names consistently, for example `@signal-css/core` and `@signal-css/react`, unless the existing public naming must be preserved.

Do not publish packages yet. First make local builds and consumer examples work.

### Task 3: Extract the pure CSS package

**Files:**

- Create: `packages/signal-css/src/styles.css` or the equivalent package source.
- Create: `packages/signal-css/src/animations.css`.
- Modify: `app/globals.css` by removing package rules that are being extracted.
- Create: package `package.json`, exports, README, license, and changelog.

1. Classify every rule in `app/globals.css` as framework, component styling, or site/showcase styling.
2. Move framework rules into the CSS package.
3. Keep native HTML selectors and semantic classes as the public contract.
4. Remove route-specific selectors, showcase-only compositions, and documentation layout rules from the published stylesheet.
5. Export a stable CSS entry point and preserve a compatibility entry point if the current `signal-css/styles.css` name is already used.
6. Add a small plain-HTML fixture that loads only the CSS package.

Acceptance criteria:

- The CSS package can be used in a non-React, non-Next project.
- It has no React, Next.js, or component-library dependency.
- The fixture demonstrates tokens, native controls, layout, forms, tables, states, and reduced motion.

### Task 4: Extract the React components package

**Files:**

- Create: `signal-components/packages/signal-ui-react/src/**`.
- Move: `app/components/ui/*.tsx`.
- Move: `app/components/ui-primitives.tsx` and `app/components/modal-primitives.tsx`.
- Rebuild: `app/components/ui/index.ts` as the package barrel.
- Create: component tests and package README.

1. Move one canonical implementation for each exported component.
2. Remove site-only imports, route data, showcase content, and Next-specific assumptions from library components.
3. Make `signal-css` the component package’s styling dependency.
4. Keep behavior and accessibility contracts in the component package; keep visual tokens and reusable CSS primitives in `signal-css`.
5. Export components, types, and documented composition helpers from stable entry points.
6. Add tests for keyboard behavior, accessible names, focus management, controlled state, and server/client boundaries where relevant.

Acceptance criteria:

- A consumer can install `signal-ui-react` and `signal-css` in a separate React app.
- Components do not import files from the old website.
- No duplicate component implementation remains between individual files, aggregators, and route pages.

### Task 5: Rebuild the Signal CSS professional website

**Files:**

- Keep or modify: `app/layout.tsx`, `app/page.tsx`, `app/docs/**`.
- Modify: `app/components/layout.tsx`, `app/components/site-navigation.tsx`, and documentation registries.
- Remove or relocate: showcase-specific route files.
- Add: dependencies on both `signal-css` and `signal-ui-react`.

1. Reposition the site as the official CSS framework website.
2. Add installation and usage pages showing plain HTML and framework-only usage.
3. Add CSS API pages for tokens, selectors, native elements, layout, states, accessibility, and motion.
4. Use `signal-ui-react` for the site shell and documentation chrome where useful.
5. Add a visible “React Components” link to the component library website.
6. Add a visible “Built with Signal CSS” explanation on component examples.
7. Keep all framework examples valid without requiring React.

### Task 6: Build the Signal Components professional website

**Files:**

- Create: `signal-components/site/**` or the selected Next.js site directory.
- Move/adapt: `app/components/component-registry.tsx`.
- Move/adapt: `app/components/[slug]/page.tsx` and component catalog layout files.
- Add: component package documentation and examples.

1. Reposition the site as the official React component library website.
2. Add installation, component catalog, API reference, composition patterns, accessibility, theming, and migration pages.
3. Use the real published/local `signal-ui-react` exports through the public barrel.
4. Load `signal-css` as the site stylesheet and show its CSS relationship in every relevant component page.
5. Add a visible “CSS Framework” link to the Signal CSS website.
6. Add framework-only examples to demonstrate that the component library is optional.
7. Add a component-to-CSS mapping for each component: markup contract, classes/selectors, behavior, and extension points.

### Task 7: Relocate showcase material

**Files:**

- Move or archive: `app/showcase/**`.
- Move or simplify: `app/components/showcase-overview.tsx`, `app/components/showcase-archetype.tsx`.
- Create later, if justified: `signal-examples` or `signal-showcase` repository.

1. Keep showcase pages out of both package distributions.
2. Initially preserve them in a separate site folder or archive so no content is lost.
3. Make the showcase consume both packages like a real customer application.
4. Add links from both library sites to the showcase only as “Examples” or “Reference apps.”
5. Do not allow showcase-specific CSS to leak back into the framework package.

### Task 8: Add cross-repository release and documentation checks

**Files:**

- Create: CI workflows in both repositories.
- Create: package release configuration and changeset/changelog policy.
- Modify: both READMEs and website navigation.

1. Build and test `signal-css` independently.
2. Build and test `signal-ui-react` against the released or packed CSS package.
3. Build both websites against packed local packages in CI.
4. Add checks that package code does not import from a site.
5. Add checks that the CSS package has no React/Next dependency.
6. Add checks that component catalog pages use the public component barrel.
7. Version the CSS package before the component package when a CSS contract changes.
8. Document compatibility between CSS and React package versions.

### Task 9: Cut over gradually

**Files:**

- Modify: current application imports and package metadata.
- Modify: deployment configuration in both sites.

1. Switch the current site to consume the extracted CSS package.
2. Switch the current component catalog to consume the extracted React package.
3. Compare routes and visual output against the baseline.
4. Publish preview versions of both packages.
5. Deploy both websites as previews.
6. Only after both previews pass, remove the old in-repository implementations.

## Definition of done

- There are exactly two library repositories: CSS and React components.
- Each library has its own professional website.
- Both websites consume both libraries and link to the other website.
- `signal-css` works without React, Next.js, or JavaScript.

## Completion record — Task 6 (2026-08-14)

- Added the official React Components website under the sibling `signal-components/site` Next App Router application.
- Added homepage, catalog, six component detail routes, and five documentation routes for installation, composition, accessibility, theming, and migration.
- Catalog and examples use the `@signal-css/react` public barrel; no site-local component implementation was introduced.
- Loaded `signal-css/styles.css` and `signal-css/animations.css` as the site stylesheet foundation, with a documented CSS mapping on each component page.
- Added visible cross-links to the Signal CSS framework and framework-only HTML equivalents throughout the site.
- Added local linked package dependencies and Turbopack workspace-root configuration so both sibling packages build together.
- Verification: sibling `npm run lint` PASS, `npm test` PASS (3 tests), `npm run build` PASS (16 prerendered routes).
- `signal-ui-react` is optional and depends on `signal-css`.
- No showcase/product page is accidentally published as library code.
- Each component has one canonical implementation.
- Both sites pass lint, build, accessibility checks, package-consumer checks, and the existing Signal CSS guards.
- README files explain the package boundary, installation, relationship, and links to the other library.

## Recommended order

1. Inventory and baseline.
2. Create the sibling repository.
3. Extract and validate pure CSS.
4. Extract and validate React components.
5. Rebuild the CSS website.
6. Build the components website.
7. Relocate showcase content.
8. Add CI/release checks.
9. Preview, compare, and cut over.

## Completion record — Task 5 (2026-08-14)

- Repositioned the Signal CSS site around the framework and plain-HTML usage.
- Updated global metadata, homepage copy, calls to action, and navigation to make documentation and installation primary.
- Added a visible link to the companion React Components website: `https://components.signalcss.dev`.
- Expanded the documentation registry with installation, tokens/selectors, states, and motion topics while retaining native HTML and accessibility guidance.
- Added framework-only examples that use stylesheet links, native elements, semantic selectors, and reduced-motion CSS without requiring React.
- Added the local `@signal-css/react` workspace dependency for site/package development; the CSS package remains the styling source of truth.
- Kept `/showcase` routes intact as reference applications pending Task 7 relocation, with Showcase no longer presented as a core framework section in the main navigation or homepage.
- Verification: `npm install` PASS, `npm run lint` PASS, `npm run build` PASS (107 routes), styling guard PASS.

---

## Task 1 completion record — 2026-08-14

Task 1 was completed as a read-only inventory and baseline pass. No files were
moved or deleted, no package boundaries were changed, and no new component was
created.

### Current route inventory

The current Next App Router contains 31 page files and 4 layouts:

- Framework/site routes: `/`, `/docs`, `/docs/[slug]`, `/components`, and
  `/components/[slug]`.
- Showcase root: `/showcase`.
- Showcase applications: `/showcase/operations`, with `automation`,
  `reports`, `settings`, and `systems` subroutes; `/showcase/documentation`,
  with `guides`, `reference`, and `changelog`; `/showcase/marketing`, with
  `pricing`, `story`, and `contact`; `/showcase/commerce`, with `cart`,
  `checkout`, `collection`, `confirmation`, `journal`, and
  `product/[slug]`; and `/showcase/portfolio`, with `about`, `capabilities`,
  `contact`, `work`, and `work/[slug]`.
- Layout boundaries: `app/layout.tsx`, `app/docs/layout.tsx`,
  `app/components/layout.tsx`, and `app/showcase/layout.tsx`.

The production build currently expands the component catalog into 65 static
component routes and the docs registry into 9 static documentation routes.

### React library inventory

The canonical catalog list in `app/components/component-registry.tsx` has 65
entries:

```text
Accordion, Alert, Alert Dialog, Aspect Ratio, Attachment, Avatar, Badge,
Breadcrumb, Bubble, Button, Button Group, Calendar, Card, Carousel, Chart,
Checkbox, Collapsible, Combobox, Command, Context Menu, Data Table, Date Picker,
Dialog, Direction, Drawer, Dropdown Menu, Empty, Field, Hover Card, Input,
Input Group, Input OTP, Item, Kbd, Label, Marker, Menubar, Message,
Message Scroller, Native Select, Navigation Menu, Pagination, Popover, Progress,
QuestionnaireNew, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet,
Sidebar, Skeleton, Slider, Sonner, Spinner, Switch, Table, Tabs, Textarea,
Toast, Toggle, Toggle Group, Tooltip, Typography
```

The public `UI.*` barrel is `app/components/ui/index.ts`. It currently
re-exports from `app/components/ui-primitives.tsx` and
`app/components/modal-primitives.tsx`; the 65 one-file modules under
`app/components/ui/` are forwarding modules rather than independent
implementations. The catalog renders through `import * as UI from "./ui"`.

React/site-specific inventory:

- Library behavior and interaction logic: `app/components/ui-primitives.tsx`
  and `app/components/modal-primitives.tsx`.
- Catalog registry and playground composition:
  `app/components/component-registry.tsx`.
- Site shell and navigation: `app/components/layout.tsx`,
  `app/components/site-navigation.tsx`, and `app/layout.tsx`.
- Documentation content and capability-to-selector mapping:
  `app/docs/docs-registry.ts` and `app/docs/**`.
- Showcase composition: `app/components/showcase-overview.tsx`,
  `app/components/showcase-archetype.tsx`, and `app/showcase/**`.

### CSS selector inventory

The current public stylesheet is `app/globals.css` (377 lines, exposed as
`signal-css/styles.css` through the root package export). It contains 340
selector lines and 163 unique class tokens. The selector contract is currently
combined and should be classified during Task 3 rather than treated as a pure
package stylesheet today.

Selector families present in `app/globals.css`:

- Browser foundation and accessibility: `:root`, `html`, `body`, native
  controls, `:focus-visible`, `.skip-link`, `[hidden]`, media queries, and
  reduced-motion behavior.
- Framework layout and surfaces: `.shell`, `.layout`, `.sidebar`, `.main`,
  `.grid` (including `.two` and `.three`), `.card`, `.row`, `.actions`,
  `.form-layout`, `.data-table`, `.table-scroll`, `.code-block`, `.muted`,
  `.status`, `.callout`, `.badge`, `.tabs`, and `.demo`.
- Framework/native HTML patterns: `dialog`, `dialog::backdrop`, `details`,
  `table`, `progress`, `meter`, form controls, menu/list structure, and
  responsive selectors.
- React component styling and interaction hooks: `.signal-button*`, `.field*`,
  `.item-*`, `.combobox*`, `.command*`, `.signal-checkbox`, `.signal-radio`,
  `.signal-switch`, `.signal-slider`, `.input-otp`, `.carousel*`,
  `.resizable-*`, `.select-*`, `.popover*`, `.tooltip-*`, `.menu-*`,
  `.navigation-menu*`, `.sidebar-*`, `.toast*`, `.sonner`, `.avatar*`,
  `.modal-*`, `.pagination*`, `.toggle*`, `.switch`, `.spinner`, and
  `.progress-field`.
- Catalog/demo-only compositions: `.example-render`, `.card-illustration`,
  `.carousel-art`, `.carousel-copy`, `.carousel-controls`, `.skeleton-stack`,
  `.questionnaire`, `.button-variants`, `.pagination-example`, `.toast-demo`,
  `.sonner-demo`, `.sidebar-preview`, `.direction-demo`, `.status-chip*`,
  `.bubble-thread`, and `.mini-chart`.

The complete machine-readable selector source of truth remains the stylesheet
itself; the current selector line count and class-token count above provide a
stable extraction check before rules are split. `app/animations.css` is a
separate 163-line file containing the `signal-spin` keyframes, animation helper
classes, and the `prefers-reduced-motion` override. Its framework-versus-demo
classification is also deferred to Task 3.

### Enforcement and baseline results

The enforcement scripts read during inventory are:

- `scripts/check-signal-css.mjs`: scans `/`, `/docs`, `/components`, and
  `/showcase` for CSS modules, inline styles, third-party styling imports,
  Tailwind utilities, coupled selectors, catalog barrel bypasses, and docs
  selectors missing from the stylesheet contract.
- `scripts/check-component-reuse.mjs`: verifies the shared UI barrel and
  duplicate component definitions; `--lint` is the non-interactive reuse
  baseline.
- `scripts/audit-components.mjs`: runtime catalog audit that requires a live
  server at `http://localhost:3000`.

Baseline commands and results:

| Command | Result |
| --- | --- |
| `npm run lint` | PASS — CSS contract and component reuse lint passed. |
| `node scripts/check-signal-css.mjs` | PASS. |
| `npm run lint:reuse` | PASS — one implementation per shared primitive and `UI.*` catalog usage. |
| `npm run build` | PASS — Next.js 16.3.0 generated 104 pages/routes successfully. |
| `node scripts/audit-components.mjs` | NOT COMPLETED — dev server could not stay healthy because the environment hit `EMFILE` (too many open files) in Next Watchpack; the audit first failed with connection refused and then with connection reset. |
| `rg -n 'module\\.css|style=|tailwind|styled-components|@emotion' app --glob '*.tsx' --glob '*.ts'` | PASS — no matches. |

The failed audit is an environment limitation, not an observed catalog
violation. The successful production build and static checks are the usable
baseline for reviewing the next migration task.

## Task 2 completion record — 2026-08-14

Created the sibling repository at `/Users/faka/code/projects/web/signal-components`
and initialized it as an independent Git repository. The scaffold contains:

- npm workspace metadata for future `packages/*` and `site` workspaces;
- the reserved `@signal-css/react` package directory and package metadata;
- repository documentation describing local `file:` dependencies and packed
  package verification; and
- a matching local-development note in this repository.

The package boundary is recorded as `signal-css` for the framework and
`@signal-css/react` for the optional React package. The current application’s
dependencies and component files were not changed; extraction remains deferred
to Tasks 3–6.

## Task 3 completion record — 2026-08-14

Created the standalone `packages/signal-css` package with:

- framework CSS at `packages/signal-css/src/styles.css`;
- motion utilities and reduced-motion behavior at
  `packages/signal-css/src/animations.css`;
- stable `signal-css`, `signal-css/styles.css`, and
  `signal-css/animations.css` exports;
- package README, MIT license, changelog, and no runtime dependencies; and
- a plain HTML fixture covering tokens, native controls, layout, forms, tables,
  states, and reduced motion.

`app/globals.css` now imports the package stylesheet and retains only the
Next.js site shell, documentation/example layout, and showcase presentation
rules. Showcase-only illustration, preview, and demo selectors were removed
from the package source. The root compatibility exports now point to the
extracted package files.

Verification:

| Check | Result |
| --- | --- |
| `npm run lint` | PASS — Signal CSS and component reuse contracts passed. |
| `npm run build` | PASS — 104 routes generated with Next.js 16.3.0. |
| Package metadata parse | PASS. |
| Package dependency scan | PASS — no React, Next.js, or third-party styling dependency. |
| Required styling guard | PASS — no forbidden app imports or inline styling matches. |

## Task 4 completion record — 2026-08-14

Extracted the React component package into the sibling repository at
`/Users/faka/code/projects/web/signal-components/packages/signal-ui-react`.
The package now contains:

- the canonical `ui-primitives.tsx` and `modal-primitives.tsx` implementations;
- the existing per-component forwarding modules and rebuilt public `src/index.ts`
  barrel;
- `signal-css` as its styling dependency with React and React DOM as peer
  dependencies;
- TypeScript declaration and JavaScript build output configuration;
- package README guidance for installation, stylesheet loading, and the
  server/client boundary; and
- contract tests covering barrel surface, keyboard/focus/accessibility hooks,
  and absence of old-site imports.

Site-only catalog framing was not included in the package, and extracted
components no longer depend on `app/components`, Next.js, showcase content, or
site-only demo classes. The current application remains on its compatibility
implementations until the gradual cutover task.

## Task 7 completion record — 2026-08-14

- Created the separate `/Users/faka/code/projects/web/signal-showcase`
  application with its own Next.js site metadata, root route, package links,
  and build configuration.
- Relocated the documentation, marketing, commerce, portfolio, and operations
  reference applications into the showcase repository and flattened their
  routes to customer-style paths such as `/commerce` and `/operations`.
- Kept showcase-only composition CSS in the showcase site; the framework
  package remains the styling source of truth and receives no product selectors.
- Added links from the CSS and React component sites to the showcase as
  Examples/Reference apps, while the showcase links back to both library sites.
- Removed `app/showcase/**`, `app/components/showcase-overview.tsx`, and
  `app/components/showcase-archetype.tsx` from the Signal CSS website.
- Verification: showcase `npm install`, `npm run lint`, and `npm run build`
  pass with 27 routes; the Signal CSS app no longer contains showcase routes.

Verification:

| Check | Result |
| --- | --- |
| `npm run build` in `signal-components` | PASS — TypeScript package build completed. |

## Task 8 completion record — 2026-08-14

Added cross-repository release and documentation checks:

- Added package boundary checks to both repositories. The CSS check rejects
  React/Next/runtime dependencies, while the React check rejects site imports
  and styling-system escapes.
- Added CI workflows in both repositories. Each workflow checks out the sibling
  repository, installs the local workspace, runs boundary checks, tests, lint,
  and builds, then performs an npm pack dry run for its package.
- Added local development and release compatibility notes to the component
  repository and the CSS repository.
- Preserved the release ordering rule: publish `signal-css` before
  `@signal-css/react` when the CSS contract changes.

Verification:

| Check | Result |
| --- | --- |
| `npm run check:boundaries` in `signal-css` | PASS. |
| `npm run lint` in `signal-css` | PASS. |
| `npm run build` in `signal-css` | PASS — 82 routes generated. |
| `npm run check:boundaries` in `signal-components` | PASS. |
| `npm run test` in `signal-components` | PASS — 3 contract tests. |
| `npm run build` in `signal-components` | PASS — package and site build completed. |
| npm pack dry runs | PASS for both packages. |

## Task 9 completion record — 2026-08-14

Completed the local gradual cutover while keeping the old implementations
available for rollback:

- The Signal CSS website now imports `signal-css/styles.css` and
  `signal-css/animations.css` through the package exports. Site-only rules
  remain in `app/globals.css`.
- The framework component catalog now consumes `@signal-css/react` through its
  public barrel. The legacy in-repository primitives remain present until a
  separately approved cleanup follows preview validation.
- Added the Next.js Turbopack workspace root configuration required to resolve
  the sibling linked React package during local builds.
- Updated the CSS contract and reuse checks to recognize the public component
  barrel and the post-showcase route set.
- Generated local preview package archives in `/tmp/signal-css-preview` for
  `signal-css` and `@signal-css/react`.

Verification:

| Check | Result |
| --- | --- |
| Signal CSS lint and styling guard | PASS. |
| Signal CSS production build | PASS — 82 routes generated. |
| Signal Components boundary checks and tests | PASS — 3 contract tests. |
| Signal Components production build | PASS — 16 routes generated. |
| Local preview package archives | PASS for both packages. |

External npm publication and Vercel preview deployment remain intentionally
unperformed because they require release credentials and explicit external
deployment approval.
| `npm run test` in `signal-components` | PASS — 3 contract tests passed. |
| Package boundary scan | PASS — no old-site, Next.js, showcase, CSS module, or inline-style imports. |
| `npm run lint` in `signal-css` | PASS. |
| `npm run build` in `signal-css` | PASS — 104 routes generated with Next.js 16.3.0. |
| Required styling guard | PASS — no forbidden app imports or inline styling matches. |
