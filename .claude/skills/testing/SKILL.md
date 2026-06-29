---
name: testing
description: >
  Use when adding or updating tests, or changing behavior that needs coverage.
  Covers detecting the framework and what to test in this project — the tools,
  the contact form, the switchers, and i18n.
---

# Testing

## Detect first
- The framework isn't fixed yet — confirm from the repo: Vitest or Jest + React Testing Library (unit/component), Playwright or Cypress (e2e). Match existing file placement/naming.
- **Do not add a test framework without approval.** If none exists and the task needs tests, recommend Vitest + RTL (+ Playwright for e2e) and wait for approval before installing.

## Approach (goal-driven, per CLAUDE.md)
- Bug fix → write a failing test that reproduces it, then fix.
- New behavior → write tests for the intended contract, then implement.

## What to test (this app's real surfaces)
- **Calculator (`/tools/calculator`):** the CBM/CFT volume math, unit conversions (cm↔inch, kg↔lb), the pieces multiplier, rounding, and reset. Pure logic — prime unit tests; cover edge cases (zero, very large).
- **Incoterms advisor (`/tools/incoterms`):** the 3-question intake plus step-2 responsibilities/insurance → best-fit Incoterm + confidence. Deterministic mapping — table-driven tests across role/scope/goal combinations.
- **Dictionary (`/tools/dictionary`):** search/filter by term and category, and related-term links.
- **OpenIndicator (business hours):** open / closed / "closes soon" is **time-dependent** — mock the clock and the `America/Los_Angeles` timeZone for deterministic tests; cover boundaries (opens 7:00, closes 17:30, weekend closed).
- **Contact form:** required-field validation, error display, and submit success/failure (the `Contact` messages already define these strings).
- **LanguageSwitcher / ThemeSwitcher:** switching updates locale/theme; ThemeSwitcher `aria-checked` reflects state and persists via `dit-theme`.
- **i18n:** render key components under both `en` and `zh-TW`; assert no missing-key fallback.

## Conventions
- Prefer accessible queries (`getByRole`, `getByLabelText`) — they double as an a11y check.
- Mock the network at the boundary (MSW if present). Never hit the external GoFreight tracking portal in tests.

## Don't
- Snapshot everything, test framework internals, add a new test library silently, or leave a behavior change untested when a nearby pattern exists.

## Verify
- Run the project's actual test script (only if it exists in `package.json`); all green, no console errors.