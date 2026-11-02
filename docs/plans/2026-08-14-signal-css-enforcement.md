# Signal CSS Enforcement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the public Signal CSS pages and component catalog fail lint when they use styling outside the shared Signal CSS contract.

**Architecture:** Add a dependency-free Node checker that scans only the four public page trees and checks source-level violations such as CSS modules, inline styles, Tailwind utilities, and third-party styling imports. Add a runtime assertion in the component registry so every catalog entry is backed by the shared `UI` barrel, while keeping the existing browser-first route shell and global Signal CSS classes.

**Tech Stack:** Next.js 16 App Router, TypeScript/TSX, Node.js built-ins, `app/globals.css`, shared exports from `app/components/ui`.

---

### Task 1: Add the Signal CSS contract checker

**Files:**
- Create: `scripts/check-signal-css.mjs`

**Step 1: Implement the checker**

Scan `app/page.tsx`, `app/docs`, `app/components`, and `app/demo` recursively for `.tsx` and `.ts` files. Report file and line for these errors:

- CSS module imports or module stylesheet files.
- JSX `style` props.
- Tailwind utility markers/classes.
- `styled-components`, `@emotion`, or other third-party styling imports.
- Component catalog files importing UI primitives outside `app/components/ui`.

Exit with status 1 when any violation exists and status 0 with a concise success message otherwise.

### Task 2: Wire the checker into npm scripts

**Files:**
- Modify: `package.json`

**Step 1: Replace the obsolete lint command**

Set `lint` to run `node scripts/check-signal-css.mjs`. Keep `build` unchanged so the required production build remains an independent verification step.

### Task 3: Guard component registry completeness

**Files:**
- Modify: `app/components/component-registry.tsx`

**Step 1: Add a shared-barrel assertion**

After the catalog names are defined, verify every catalog name maps to an exported primitive in the `UI` namespace using the same space-stripping convention already used for usage snippets. Throw an actionable error naming missing exports. Keep playground rendering sourced from `UI.*` and preserve native children for content.

### Task 4: Verify the contract and application

**Files:**
- Modify: none

**Step 1: Run the focused guard**

Run `npm run lint`. Expected: success with no Signal CSS contract violations.

**Step 2: Run the required source guard**

Run `rg -n 'module\\.css|style=|tailwind|styled-components|@emotion' app --glob '*.tsx' --glob '*.ts'`. Expected: no output.

**Step 3: Run the production build**

Run `npm run build`. Expected: successful Next.js production build.
