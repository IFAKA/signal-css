# Signal OS Browser-First Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor the workspace into Signal OS while visibly using the existing browser-first Signal CSS styling and native browser controls.

**Architecture:** Keep the existing Next.js App Router and local React state, but use semantic HTML plus the current `.dashboard`, `.dashboard-grid`, `.dashboard-card`, `.component-demo`, `.badge`, `.callout`, `.tabs`, `.message`, and form patterns. Do not replace the existing visual system or add a custom dashboard skin; content and information architecture change while the CSS contract stays stable.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, existing plain Signal CSS, semantic HTML.

---

### Task 1: Lock the framework rule in repository instructions

**Files:**
- Modify: `AGENTS.md`

Add a permanent project rule that all UI work must use the existing browser-first Signal CSS styling, preserve native browser controls, and avoid introducing a separate custom visual system without explicit approval.

### Task 2: Refactor workspace content into Signal OS

**Files:**
- Modify: `app/components/dashboard.tsx`

Rename the workspace language to Signal OS, keep the existing native layout classes, and compose operations metrics, systems, automations, reports, queues, and settings from existing framework patterns. Do not add new CSS classes unless they already exist in `app/globals.css`.

### Task 3: Keep framework routes discoverable

**Files:**
- Modify: `app/components/page.tsx`
- Verify: `app/framework/page.tsx`

Ensure the component inventory and framework explanation have working links from the workspace and from each other, using the existing unstyled/native link treatment.

### Task 4: Verify the browser-first contract

**Files:**
- Verify: `app/globals.css`
- Verify: all App Router routes

Confirm no new custom dashboard skin was added, run `npm run build`, and verify the framework and workspace routes are generated.
