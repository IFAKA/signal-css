# Partial Signal CSS Contracts Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete the reusable Signal CSS styling contracts for the components previously classified as Partial, without introducing a second styling system or pretending CSS provides interaction behavior.

**Architecture:** Extend the published `packages/signal-css/src/styles.css` with semantic component roots, native element selectors, and attribute-driven states. Update `app/docs/docs-registry.ts` with examples that demonstrate the contract; interactive behavior remains the responsibility of native browser controls or the companion React component layer.

**Tech Stack:** Next.js 16, React 19, TypeScript, native HTML, published Signal CSS, Node-based lint/build checks.

---

### Task 1: Add the shared styling contracts

**Files:**
- Modify: `packages/signal-css/src/styles.css`

**Steps:**

1. Add semantic roots and states for alerts, buttons, dropdown menus, toggles, inputs, charts, and typography.
2. Extend existing combobox, command, context-menu, carousel, and select rules with ARIA/data-state selectors rather than component-specific implementation names.
3. Preserve native controls, visible focus, responsive behavior, forced-colors compatibility, and reduced-motion behavior.

### Task 2: Document the contracts

**Files:**
- Modify: `app/docs/docs-registry.ts`

**Steps:**

1. Add a dedicated component-contracts documentation page covering the newly completed Partial primitives.
2. Use rendered native examples and selectors that exist in the stylesheet.
3. State clearly which behavior is native and which behavior must be supplied by JavaScript.

### Task 3: Verify the framework contract

**Files:**
- No additional files expected.

**Steps:**

1. Run `npm run lint`.
2. Run the forbidden-styling guard from `AGENTS.md`.
3. Run `npm run build`.
4. Review the diff to ensure no CSS modules, Tailwind utilities, inline styles, or unrelated files were changed.
