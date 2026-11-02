# Selective UI Packaging Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Document the project accurately and define a package shape that lets consumers install or import only the UI pieces they need.

**Architecture:** Keep the current Next.js demo application intact, while treating the small native-first primitives as the future library surface. Each primitive should have an independent entry point and style dependency; app-specific screens, ecommerce state, and demo data stay outside the package.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, plain CSS, npm package exports, gzip/Brotli size measurement.

---

### Task 1: Record the current architecture

**Files:**
- Read: `package.json`
- Read: `app/components/ui-primitives.tsx`
- Read: `app/globals.css`

**Step 1:** Identify reusable primitives, app-only components, and shared CSS assumptions.

**Step 2:** Confirm the current project is an application rather than a publishable component package.

### Task 2: Add project documentation

**Files:**
- Create: `README.md`

**Step 1:** Explain that the project is a Next.js/React app with a native-first CSS layer, not currently a standalone CSS framework.

**Step 2:** Document the proposed selective package API and show consumer import examples.

**Step 3:** Add measured raw, gzip, and Brotli sizes for the current reusable module and style layers, clearly labeling them as source measurements rather than final per-component bundle sizes.

**Step 4:** Document the extraction checklist required before publishing independent component bundles.

### Task 3: Verify the documentation claims

**Files:**
- Verify: `README.md`

**Step 1:** Run the project build.

**Step 2:** Recalculate the documented compressed sizes from the exact files and compare them with the README table.

**Step 3:** Review the diff and ensure no app behavior changed.
