# Component Reuse Enforcement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Prevent duplicate Signal CSS components by requiring agents to check the shared UI barrel before creating a component and by failing lint when duplicate component definitions appear.

**Architecture:** Add a dependency-free Node checker with two deterministic modes: repository lint mode detects duplicate component definitions and catalog bypasses, while proposal mode checks a requested component name against the shared UI barrel and returns a blocking exit code when it is missing or already exists. Document the required workflow in AGENTS.md and expose both modes through package scripts.

**Tech Stack:** Node.js ESM scripts, TypeScript/TSX source scanning, npm scripts, Markdown agent instructions.

---

### Task 1: Document the enforcement workflow

**Files:**
- Modify: `AGENTS.md`

**Step 1:** Add a mandatory pre-creation command and explain the exit states:
- existing component: stop and reuse it;
- missing component: stop and ask the user whether to add a new shared primitive;
- explicit user approval is required before creating a new primitive.

**Step 2:** Add the repository lint command to the finishing checklist.

### Task 2: Add deterministic component reuse checker

**Files:**
- Create: `scripts/check-component-reuse.mjs`

**Step 1:** Implement `--name <ComponentName>` lookup against the exports reachable from `app/components/ui/index.ts`, including wildcard exports and aliases.

**Step 2:** Return exit code 1 when the name already exists, exit code 2 when it is missing and must be escalated to the user, and exit code 0 only for an explicit non-blocking inventory/list mode.

**Step 3:** Implement `--lint` to detect duplicate actual component definitions outside the shared primitive sources and detect catalog entries that do not render through `UI.*`.

**Step 4:** Print file and line locations with actionable remediation.

### Task 3: Wire the checker into npm

**Files:**
- Modify: `package.json`

**Step 1:** Add `check:reuse` for proposal checks.

**Step 2:** Add `lint:reuse` for repository lint checks.

**Step 3:** Make `lint` run both the existing Signal CSS contract and reuse lint.

### Task 4: Verify

**Files:**
- None

**Step 1:** Run `npm run check:reuse -- --name Button` and verify it blocks with the existing shared location.

**Step 2:** Run `npm run check:reuse -- --name NewExamplePrimitive` and verify it blocks with the user-approval message.

**Step 3:** Run `npm run lint`.

**Step 4:** Run `npm run build`.

**Step 5:** Run the required forbidden-pattern guard from AGENTS.md.

