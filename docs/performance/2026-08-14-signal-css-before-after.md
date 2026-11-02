# Signal CSS payload benchmark — 2026-08-14

This is a clearly marked local production-build report. The baseline is the
checkpoint commit `6517c68` (`checkpoint: signal css framework baseline`).

## Changes measured

- Consolidated duplicate table declarations in `app/globals.css`.
- Removed the unreachable `.tooltip-trigger:focus-visible` descendant state
  from `app/animations.css`; `:focus-within` covers the keyboard interaction.
- Preserved every existing public Signal class and route-level stylesheet split.

## CSS files

| File | Source before | Source after | Minified before | Minified after | Gzip before | Gzip after | Brotli before | Brotli after |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| `globals.css` | 11,445 B | 11,377 B | 9,616 B | 9,555 B | 2,714 B | 2,708 B | 2,312 B | 2,307 B |
| `animations.css` | 3,503 B | 3,454 B | 2,919 B | 2,871 B | 848 B | 843 B | 696 B | 695 B |
| `showcase.module.css` | 4,337 B | 4,337 B | 3,370 B | 3,370 B | 1,196 B | 1,196 B | 998 B | 998 B |

Source line counts after the change are 164, 163, and 44 respectively.

## Route delivery

These values are the sum of the production CSS chunks linked by each route.
Compressed values sum the individually compressed chunks, matching the
cacheable request boundaries.

| Route | Requests before → after | Raw before → after | Gzip before → after | Brotli before → after |
|---|---:|---:|---:|---:|
| `/` | 1 → 1 | 9,616 → 9,555 B | 2,714 → 2,708 B | 2,312 → 2,307 B |
| `/docs` | 1 → 1 | 9,616 → 9,555 B | 2,714 → 2,708 B | 2,312 → 2,307 B |
| `/components` | 3 → 3 | 15,905 → 15,796 B | 4,758 → 4,747 B | 4,006 → 4,000 B |
| `/demo` | 2 → 2 | 12,535 → 12,426 B | 3,562 → 3,551 B | 3,008 → 3,002 B |
| `/demo/*` | 2 → 2 | 12,535 → 12,426 B | 3,562 → 3,551 B | 3,008 → 3,002 B |

## Coverage and browser timing

Chrome CSS Coverage, screenshots, FCP, LCP, CLS, and TBT were not captured in
this environment: Python Playwright is not installed and no Chromium executable
is available on PATH. The production route check did verify all eight public
routes return successfully and expose the expected stylesheet links.

The small byte reduction is deliberate. Static dead-rule removal could not be
proven safely for the remaining rules because the catalog and demo exercise
interactive states such as dialogs, menus, tooltips, toasts, and reduced motion.
The next measurement pass should run the supplied Playwright benchmark in CI or
an environment with Chromium to collect Coverage and mobile Web Vitals.
