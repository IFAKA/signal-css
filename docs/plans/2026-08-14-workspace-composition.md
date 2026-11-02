# Workspace Composition Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the full Signal CSS Workspace into a connected multi-route operations product by composing the existing component patterns throughout every Workspace route without changing the browser-first visual system.

**Architecture:** Keep the current `Dashboard` route shell and native HTML CSS primitives. Extract small shared Workspace render helpers where repetition is useful, then expand Overview, Live systems, Automation, Reports, and Settings with the existing dashboard, component-demo, form, table, feedback, disclosure, and navigation patterns. Preserve the Components route as the complete component inventory.

**Tech Stack:** Next.js 16 App Router, React 19 client components, TypeScript, native HTML controls, existing `app/globals.css` classes.

---

### Task 1: Create shared Workspace composition helpers

**Files:**
- Modify: `app/components/dashboard.tsx`

Add small local reusable helpers for section headings, status badges, and compact operational rows. Keep them class-only and native-element based so no new CSS or visual language is introduced.

### Task 2: Expand the Overview route

**Files:**
- Modify: `app/components/dashboard.tsx`

Compose the existing metrics and revenue panels with status badges, callouts, tabs, queues, menus, avatars, message scrollers, pagination, checklists, and disclosure panels. Keep existing interactions working and add no new custom styling.

### Task 3: Expand Live systems and Automation

**Files:**
- Modify: `app/components/dashboard.tsx`

Add capacity, incident, service-detail, workflow timeline, trigger configuration, and run-history panels using existing tables, meters, progress, alerts, forms, and native disclosure controls. Keep restart/create interactions functional.

### Task 4: Expand Reports and Settings

**Files:**
- Modify: `app/components/dashboard.tsx`

Add report filters, summary cards, export states, table pagination, profile/settings field groups, notification controls, and audit/history content using existing form and feedback patterns.

### Task 5: Verify the complete Workspace

**Files:**
- Test: all Workspace routes through the production build

Run `npm run build` and inspect route generation. Confirm no CSS additions were made and all existing routes compile.
