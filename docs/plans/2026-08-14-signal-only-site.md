# Signal-Only Framework Site Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the `/` and `/docs` routes use only native HTML and published Signal CSS primitives, with no site-specific stylesheet or coupled visual classes.

**Architecture:** Reuse the existing Signal CSS shell, layout, row, grid, card, card-content, label, help, muted, badge, callout, and main primitives. Remove the local site stylesheet and replace its custom classes with native structure or existing shared Signal classes; update any documentation examples that reference unsupported local classes.

**Tech Stack:** Next.js 16, React 19, TypeScript, native HTML, `signal-css/styles.css`, and `signal-css/animations.css`.

---

### Task 1: Replace custom classes in public route markup

**Files:**
- Modify: `app/site/home-page-content.tsx`
- Modify: `app/site/site-navigation.tsx`
- Modify: `app/docs/layout.tsx`
- Modify: `app/docs/page.tsx`
- Modify: `app/docs/[slug]/page.tsx`

**Steps:**

1. Remove `site-header` and `site-header-inner` in favor of native headers and the shared `.row.spread` primitive.
2. Replace the docs-only `.demo` card with `.card`.
3. Replace `.example-render` with `.card-content`.
4. Keep the existing shared `.main` route shell and native elements.

### Task 2: Remove local styling and unsupported examples

**Files:**
- Delete: `app/site.css`
- Modify: `app/layout.tsx`
- Modify: `app/docs/docs-registry.ts`

**Steps:**

1. Remove the local stylesheet import.
2. Remove the unsupported `motion-fade` example class and use native `<details>`.
3. Confirm all remaining classes resolve to the published Signal CSS package.

### Task 3: Verify the Signal-only boundary

**Steps:**

1. Run the exact forbidden-styling guard from `AGENTS.md`.
2. Run `npm run lint` and `npm run check:boundaries`.
3. Run `npm run build`.
4. Search `/` and `/docs` source for custom stylesheet imports and coupled classes.
