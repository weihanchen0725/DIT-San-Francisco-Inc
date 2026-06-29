# Agent Handoff

Last updated: 2026-06-28 (session 4)

## Workflow Notes

- Follow `CLAUDE.md`: inspect before editing, keep changes surgical, and run only scripts that exist in `package.json`.
- Package manager: npm (`package-lock.json`).
- Router: Next.js App Router under `src/app/[locale]`.
- i18n: `next-intl`, locales `en` and `zh-TW`, route prefix required for internal navigation.
- Styling: Tailwind utilities plus SCSS Modules.

## High-Severity Items Addressed

- Locale-preserving tool navigation:
  - `src/components/Tools/Tools.tsx`
  - `src/components/Incoterms/Incoterms.tsx`
  - `src/components/Incoterms/ReferenceGuide/ReferenceGuide.tsx`
- Contact form validation and submission path:
  - `src/components/Contact/Contact.tsx`
  - `src/components/Contact/ContactForm.tsx`
  - `src/assets/international/en/common.json`
  - `src/assets/international/zh-TW/common.json`
- Incoterms advisor required-answer guard:
  - `src/components/Incoterms/Advisor/Advisor.tsx`
  - `src/components/Incoterms/Advisor/Advisor.module.scss`
  - `src/assets/international/en/common.json`
  - `src/assets/international/zh-TW/common.json`
- Localized route metadata, canonical URLs, and hreflang:
  - `src/lib/seo.ts`
  - all existing `src/app/[locale]/**/page.tsx` route files
  - `src/app/sitemap.ts`
  - `src/app/robots.ts`
  - `src/app/[locale]/layout.tsx`
- Broken verification scripts:
  - `package.json` now uses `eslint .` for lint.
  - `vitest.config.ts` and `src/i18n/messages.test.ts` make `npm run test` executable.
  - `playwright.config.ts` and `tests/e2e/seo-routes.spec.ts` make `npm run test:e2e` executable without requiring a browser launch.

## Session 4 Changes — Responsive / PWA / Hero images

- **`public/site.webmanifest`** — Upgraded to full PWA manifest: added `id`, `scope`, `description`, `orientation`, `prefer_related_applications: false`, `categories`, `display_override`, and `shortcuts` (Contact Us, Incoterms Advisor). Background colour aligned to brand (#fdfcf7).
- **`src/app/[locale]/layout.tsx`** — Added `appleWebApp` metadata (`capable: true`, `title: 'DIT SF'`, `statusBarStyle: 'black-translucent'`) and `mobile-web-app-capable: 'yes'` for Android Chrome. Corrected `msapplication-TileColor` from `#da532c` to `#ffcc00` (brand yellow).
- **`src/components/Home/Home.tsx`** — Imported `cargo_truck_charcoal_yellow.svg` and rendered it inside `HomeParallax` with class `cargoTruckYellow`. The truck SVG and CSS class already existed; this wires them up.
- **`src/components/Home/Home.module.scss`** — Full rewrite with:
  - Responsive image hiding: plane hidden at ≤1023px, ship+truck hidden at ≤640px, entire collage hidden at ≤479px.
  - Mobile hero: `top: -3rem` offset removed at ≤768px; content centre-aligned; CTA button gets `min-height: 44px` (PWA touch target) and `width: 100%` on mobile.
  - Hero collage height uses `clamp()` for smoother scaling.
  - Subtle brand gradient added to `.home` background (light + dark mode variants).
  - Truck CSS classes now have proper positioning and responsive hiding.

## Remaining Known Issues

Full issue list with severities and fix guidance is in `docs/ISSUES.md`.

**Critical (blocks correct operation):**
- ✅ ISSUE-001: Confirmed correct filename is `src/proxy.ts` — Next.js 16 deprecated `middleware.ts` in favour of `proxy.ts`. File is back to its original name.

**High (all resolved):**
- ✅ ISSUE-002/003: `'use client';` added to `Tooltips.tsx` and `SvgPropIconBase.tsx`
- ✅ ISSUE-004: `OpenIndicator` timezone fixed — `getPacificNow()` helper uses `America/Los_Angeles`
- ✅ ISSUE-005: Contact form — `form.reset()` removed; success message was already accurate
- ✅ ISSUE-006: `ReferenceGuide` icons now derived per-row from `responsibilities.seller` fraction; seller steps highlighted, buyer steps dimmed
- ✅ ISSUE-014: Advisor step 3 buttons wired — "Request Quote" → `/contact`, "Compare" → `/tools/incoterms/reference-guide`

**Medium:**
- ISSUE-007: `Footer` uses client hook without `"use client"`
- ISSUE-008/009: Dictionary unsafe raw() casts + `.replace` first-space-only bug
- ISSUE-010: LanguageSwitcher locale swap corrupts URLs
- ISSUE-011: `GetHeader` missing `response.ok` check
- ISSUE-013: OG/Twitter images are SVG (unsupported by social scrapers)
- ISSUE-015/016: Advisor result data and OpenIndicator status strings hardcoded in English

## Verification Checklist For Next Agent

Run in this order:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run test`
4. `npm run test:e2e`
5. `npm run build`

If build hangs at `Creating an optimized production build ...`, check for a stale `.next/lock` or Turbopack issue before changing application code.

Current verification status:

- `npm run typecheck`: passes.
- `npm run lint`: passes with warnings in pre-existing image/type files.
- `npm run test`: passes.
- `npm run test:e2e`: passes.
- `npm run build`: still hangs at `Creating an optimized production build ...` and was stopped with Ctrl-C.
