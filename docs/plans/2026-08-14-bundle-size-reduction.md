# Signal CSS Bundle Size Reduction Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reduce the amount of JavaScript shipped and hydrated by keeping static catalog/layout markup on the server and splitting the demo into route-specific client islands while preserving the current browser-first UI and interactions.

**Architecture:** Keep each route page as a Server Component by default. The component catalog is server-rendered with native controls, while the demo has a shared server layout and one small client module per route. Keep the existing Signal CSS classes and shared primitives intact.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript, existing Signal CSS framework.

---

### Task 1: Capture the current bundle baseline

**Files:**
- Read: `app/components/page.tsx`
- Read: `app/components/dashboard.tsx`
- Read: `.next/static/chunks/*.js`

**Step 1:** Record current source sizes and existing production chunk sizes without changing source files.

**Step 2:** Use the baseline only for comparison; do not rely on stale `.next` output as the final result.

### Task 2: Extract the component catalog's client boundary

**Files:**
- Create: `app/components/components-interactions.tsx`
- Modify: `app/components/page.tsx`

**Step 1:** Move only hooks, refs, state, event handlers, and the interactive component examples into a client component.

**Step 2:** Keep the route shell, navigation, headings, static examples, and footer in the server page.

**Step 3:** Preserve all existing IDs, labels, native controls, Signal CSS classes, and interaction behavior.

### Task 3: Verify the production build and route output

**Files:**
- Read: `.next/diagnostics/analyze/*` if generated

**Step 1:** Run `npm run build`.

**Step 2:** Compare generated JavaScript chunks with the baseline and confirm the build completes.

**Step 3:** Run the available lint command if compatible with Next 16; report any pre-existing command incompatibility separately.

### Task 4: Check the changed route behavior

**Files:**
- Read: `app/components/page.tsx`
- Read: `app/components/components-interactions.tsx`

**Step 1:** Confirm the static route remains server-renderable and the interactive examples retain their client boundary.

**Step 2:** Confirm no Signal CSS framework classes or native control semantics were replaced.

### Task 5: Split the demo client graph by route

**Files:**
- Create: `app/components/demo-layout.tsx`
- Create: `app/components/demo-notice.tsx`
- Create: `app/components/demo-overview.tsx`
- Create: `app/components/demo-systems.tsx`
- Create: `app/components/demo-automation.tsx`
- Create: `app/components/demo-reports.tsx`
- Create: `app/components/demo-settings.tsx`
- Modify: `app/demo/page.tsx`
- Modify: `app/demo/systems/page.tsx`
- Modify: `app/demo/automation/page.tsx`
- Modify: `app/demo/reports/page.tsx`
- Modify: `app/demo/settings/page.tsx`
- Delete: `app/components/dashboard.tsx`

**Step 1:** Move shared navigation and server-renderable dashboard structure into `demo-layout.tsx`.

**Step 2:** Move each dashboard surface into its own client module so each route imports only its own interactive state and markup.

**Step 3:** Keep notification behavior shared through the small `demo-notice.tsx` client helper.

**Step 4:** Run `npm run build`, confirm all five demo routes are statically prerendered, and inspect the clean generated route chunks.
