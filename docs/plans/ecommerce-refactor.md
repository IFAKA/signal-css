# Morrow Supply Ecommerce Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the terminal-themed prototype with a focused, responsive ecommerce experience using simulated data and a checkout flow that is prefilled for immediate testing.

**Architecture:** Keep the App Router entry point at `app/page.tsx` as a client component because cart, filtering, product navigation, and checkout state are interactive. Keep products as local typed data, use native form controls and a modal cart, and use CSS for the visual system without adding unnecessary dependencies.

**Tech Stack:** Next.js 16.3 App Router, React 19, TypeScript, CSS.

---

### Task 1: Refactor the storefront shell and commerce screens

**Files:** `app/page.tsx`, `app/layout.tsx`

- Replace terminal copy and labels with storefront navigation, collection hero, product cards, cart modal, product detail, checkout, and confirmation views.
- Preserve simulated product data and all cart interactions.
- Prefill checkout fields with realistic demo customer, email, address, city, region, postal code, and country values.
- Add shipping method selection, order subtotal/shipping/total, and an explicit mock-payment notice.

### Task 2: Replace terminal CSS with responsive ecommerce styling

**Files:** `app/globals.css`

- Create a mobile-first visual system with warm neutral surfaces, strong typography, product color blocks, responsive grid, sticky desktop summary, and accessible focus states.
- Remove terminal-only styles and keep only selectors used by the new page.

### Task 3: Verify the refactor

- Run `npm run build`.
- Confirm TypeScript compiles and the static App Router route is generated.
