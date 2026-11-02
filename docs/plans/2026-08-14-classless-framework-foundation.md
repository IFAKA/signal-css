# Classless Framework Foundation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make Signal CSS semantic-first by providing scoped native element defaults and replacing redundant modifier classes with data attributes.

**Architecture:** Keep classes for layout and real reusable patterns, while using `data-signal` as the framework opt-in and `data-tone`, `data-variant`, and accessible state attributes for variants. Preserve existing behavior and keep the ecommerce-specific classes separate.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, plain CSS, semantic HTML.

---

### Task 1: Add the scoped framework contract

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

Add `data-signal` to the document body and introduce scoped native defaults for controls, fieldsets, tables, disclosure, and media. Preserve existing layout classes and responsive rules.

### Task 2: Replace redundant modifier classes

**Files:**
- Modify: `app/components/ui-primitives.tsx`
- Modify: `app/components/page.tsx`
- Modify: `app/components/dashboard.tsx`
- Modify: `app/components/showcase.module.css`

Use `data-tone`, `data-variant`, `aria-selected`, `aria-pressed`, and `aria-current` for visual state. Keep pattern classes such as `.badge`, `.callout`, `.tabs`, and `.switch` because they identify reusable visual patterns.

### Task 3: Verify behavior and CSS output

Run `npm run build`, inspect the generated CSS size, and review the diff for accidental changes to the ecommerce-specific styling or interactive state.
