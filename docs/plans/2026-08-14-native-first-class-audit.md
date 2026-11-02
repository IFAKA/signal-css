# Native-First Class Audit Plan

**Goal:** Remove unnecessary class hooks from both official sites while retaining only reusable Signal CSS or React component classes needed for layout, compound patterns, and visual variants.

**Architecture:** Native HTML elements and ARIA/native state attributes carry semantics and state. Signal classes remain only for reusable visual/layout patterns that HTML cannot express. The shared main-region styling moves from `.main` to the native `main` element.

**Verification:** Run both repository test/lint/boundary/build suites and scan both sites for route-specific class names.
