# Local Signal Packages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement the plan task-by-task.

**Goal:** Make both sibling websites consume the local `signal-css` and `@signal-css/react` packages through npm file dependencies, while keeping the CSS package itself framework-agnostic.

**Architecture:** The framework website depends on both packages for its site layer. The component website already depends on both packages and will be verified. The package graph remains one-way: `@signal-css/react` consumes `signal-css`; the CSS package source does not depend on React.

**Tech Stack:** npm local `file:` dependencies, Next.js, React, TypeScript, Signal CSS, and `@signal-css/react`.

---

### Task 1: Link the framework website to the local React package

**Files:**
- Modify: `package.json`
- Modify: `next.config.ts`
- Modify: `app/layout.tsx`
- Modify: `app/site/home-page-content.tsx`
- Modify: `app/docs/page.tsx`

**Steps:**

1. Add `@signal-css/react` as a local file dependency.
2. Allow Next.js to transpile both local packages.
3. Load the React package stylesheet once at the framework site root.
4. Render a shared React `Badge` component on the home and docs pages.

### Task 2: Document the two-package local setup

**Files:**
- Modify: `README.md`
- Modify: `docs/local-package-development.md`

**Steps:**

1. Document that both websites consume both packages.
2. Keep the package dependency graph one-way: CSS remains independent, React consumes CSS.
3. Document the local npm installation commands.

### Task 3: Install and verify both repositories

**Files:**
- Modify: `package-lock.json`
- Modify: `/Users/faka/code/projects/web/signal-components/package-lock.json` only if npm normalizes the existing local links.

**Steps:**

1. Run `npm install` in both repositories.
2. Build and test the component package and site.
3. Run the framework lint, boundary check, and build.
