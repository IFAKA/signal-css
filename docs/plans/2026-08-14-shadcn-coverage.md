# Signal CSS Shadcn Coverage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make Signal CSS feel like a complete, browser-first alternative to the current shadcn/ui component catalog.

**Architecture:** Keep the existing shared `app/components/ui` barrel and native HTML primitives. Add the missing Sonner-style notification primitive, complete compound Item and Field APIs, and replace the `/components` redirect with a browsable catalog landing page that links to every registered playground.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, native HTML, `app/globals.css`.

---

### Task 1: Complete shared primitive APIs

**Files:**
- Modify: `app/components/ui-primitives.tsx`
- Modify: `app/components/ui/index.ts`
- Create: `app/components/ui/sonner.tsx`

Add accessible compound Item exports, Field description/error exports, and a native `Sonner` stack primitive. Keep all styling on reusable Signal CSS classes.

### Task 2: Register and demonstrate the new coverage

**Files:**
- Modify: `app/components/component-registry.tsx`

Register Sonner, add a playground, and expand usage snippets for compound APIs so every showcased primitive has a useful example.

### Task 3: Make the catalog discoverable

**Files:**
- Modify: `app/components/page.tsx`
- Modify: `app/globals.css`

Replace the redirect with a catalog landing page using existing semantic layout classes plus reusable catalog primitives for grouped component links and coverage metadata.

### Task 4: Verify the contract

Run `npm run lint` and `npm run build`, then run the required `rg` guard for forbidden styling patterns.
