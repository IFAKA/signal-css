# Shadcn Structure with Signal CSS Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make every component in the Signal CSS catalog structurally and behaviorally compatible with the corresponding shadcn/ui component while retaining Signal CSS as the only visual system.

**Architecture:** Preserve the existing `app/components/ui` barrel and single implementation rule, but upgrade thin aliases into generic, composable primitives where shadcn uses compound structures. Keep native HTML where it provides the same contract; use small client-side state machines only for interactions browsers do not provide. Add no Tailwind, CSS modules, CSS-in-JS, Radix, Base UI, Embla, or other styling systems.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, native HTML controls, `app/globals.css`, existing Signal motion rules, Playwright route/interaction checks.

---

## Completion contract

Each catalog entry is complete only when:

1. Its public structure matches the corresponding shadcn composition closely enough for generic usage.
2. Its keyboard, focus, open/close, selection, disabled, and responsive behavior is implemented where applicable.
3. Its example is a realistic use case with representative content, not a placeholder-only demo.
4. Its styles use existing Signal primitives or a documented reusable rule in `app/globals.css`.
5. Its route, keyboard flow, and narrow viewport behavior are verified.
6. The tracking table in `docs/component-coverage.md` is updated from `partial` to `ready`.

## Shared foundation tasks

### Task 1: Establish the coverage tracker

**Files:**
- Create: `docs/component-coverage.md`
- Modify: `app/components/component-registry.tsx`

Record all 65 registered components, their shadcn reference composition, Signal implementation strategy, current status, and verification notes. Keep the registry as the source of catalog membership; the coverage document is the human-readable audit.

### Task 2: Add generic composition utilities

**Files:**
- Modify: `app/components/ui-primitives.tsx`
- Modify: `app/components/modal-primitives.tsx`
- Modify: `app/components/ui/index.ts`
- Modify: `app/globals.css`

Add only utilities needed by multiple primitives: stable IDs, focus restoration, keyboard roving, outside-press handling, controlled/uncontrolled state, and shared Signal overlay/layout rules. Run the reuse gate before introducing any new exported primitive name.

### Task 3: Add verification harness

**Files:**
- Create: `scripts/audit-components.mjs`
- Modify: `package.json`

Create a deterministic route and DOM contract audit for all catalog slugs. It must verify HTTP 200, no runtime errors, visible playground content, accessible names for controls, and required structural roles for interactive components.

## Component batches

### Task 4: Foundation and data display

Components: `Button`, `Button Group`, `Card`, `Badge`, `Avatar`, `Separator`, `Typography`, `Kbd`, `Table`, `Data Table`, `Item`, `Empty`, `Message`, `Message Scroller`, `Bubble`, `Marker`, `Chart`.

Match shadcn composition and variants, add realistic data examples, preserve native table semantics, and document that `Chart` uses a generic SVG/data contract rather than Recharts unless a chart dependency is explicitly approved.

### Task 5: Native forms

Components: `Input`, `Textarea`, `Label`, `Field`, `Input Group`, `Native Select`, `Select`, `Checkbox`, `Radio Group`, `Switch`, `Slider`, `Progress`, `Calendar`, `Date Picker`, `Attachment`, `Input OTP`, `QuestionnaireNew`.

Provide generic props, descriptions/errors, controlled and uncontrolled usage, valid labels, disabled/invalid states, and keyboard behavior. Keep native date, file, range, checkbox, and radio controls recognizable.

### Task 6: Disclosure and navigation

Components: `Accordion`, `Collapsible`, `Breadcrumb`, `Navigation Menu`, `Pagination`, `Tabs`, `Menubar`, `Sidebar`, `Direction`.

Implement compound content relationships, roving focus where required, arrow/Home/End/Escape behavior, responsive layouts, and URL-safe navigation. Native disclosure remains the implementation for Accordion/Collapsible where it already satisfies the contract.

### Task 7: Overlays and menus

Components: `Dialog`, `Alert Dialog`, `Drawer`, `Sheet`, `Popover`, `Dropdown Menu`, `Context Menu`, `Hover Card`, `Tooltip`, `Toast`, `Sonner`.

Use native `<dialog>` for modal semantics, add shared focus return and backdrop behavior, implement positioned non-modal overlays, outside/Escape closing, keyboard navigation, dismissible notification behavior, and realistic destructive/confirmation examples.

### Task 8: Advanced composition

Components: `Aspect Ratio`, `Carousel`, `Combobox`, `Command`, `Resizable`, `Scroll Area`, `Skeleton`, `Spinner`, `Toggle`, `Toggle Group`.

Implement the same user-facing composition and state contracts as shadcn, but use CSS/native behavior where possible. Carousel must remain dependency-free unless the user approves Embla; Combobox/Command must have a generic item model and accessible listbox behavior.

### Task 9: Upgrade all playgrounds

**Files:**
- Modify: `app/components/component-registry.tsx`
- Modify: `app/components/[slug]/page.tsx`

Replace placeholder examples with realistic forms, settings, dashboards, data views, confirmation flows, and media content. Usage snippets must show the actual generic API exposed by Signal CSS.

### Task 10: Verify and report

Run:

```bash
npm run check:reuse -- --name <NewPrimitiveName>
npm run lint
npm run build
npm run audit:components
rg -n 'module\\.css|style=|tailwind|styled-components|@emotion' app --glob '*.tsx' --glob '*.ts'
```

Update `docs/component-coverage.md` with final status, known deliberate deviations, and any dependency that was intentionally not added.
