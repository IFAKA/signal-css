# Signal OS Coherent Product Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the repository from a mixed dashboard/ecommerce demo into one coherent Signal OS operations product.

**Architecture:** Keep the workspace shell and browser-first Signal CSS primitives, with routes for Overview, Live systems, Automation, Reports, Settings, Framework, and Components. Remove the unrelated storefront, checkout, product, and order-confirmation routes and their dead supporting components. Use the existing dashboard composition rather than introducing a second visual system.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, existing plain Signal CSS, semantic HTML.

---

### Task 1: Remove unrelated product routes

**Files:**
- Delete: `app/checkout/page.tsx`
- Delete: `app/products/[id]/page.tsx`
- Delete: `app/products/[id]/not-found.tsx`
- Delete: `app/order-confirmation/[orderId]/page.tsx`

Remove ecommerce routes so the public route tree describes only Signal OS and its framework documentation.

### Task 2: Remove dead ecommerce components and data

**Files:**
- Delete: `app/components/cart-provider.tsx`
- Delete: `app/components/catalog.tsx`
- Delete: `app/components/product-actions.tsx`
- Delete: `app/components/site-chrome.tsx`
- Delete: `app/lib/products.ts`

Remove unused storefront state, product data, and presentation components after route deletion.

### Task 3: Make the product narrative coherent

**Files:**
- Modify: `README.md`
- Modify: `app/layout.tsx`
- Modify: `app/components/dashboard.tsx`

Describe Signal OS as one operations platform, use a consistent navigation vocabulary, and ensure all visible product links target the Signal OS route tree.

### Task 4: Verify the coherent route tree

**Files:**
- Verify: `app/`

Run `npm run build`, confirm only Signal OS/framework routes are generated, and audit links for dead product destinations.
