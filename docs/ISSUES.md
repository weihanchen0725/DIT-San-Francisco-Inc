# Issue & Task List

> Generated: 2026-06-28. Last updated: 2026-06-28.
> Verification run: `typecheck` ✅ `test` ✅ (2/2) `test:e2e` ✅ (2/2) `lint` ⚠️ (6 pre-existing warnings, 0 errors), `build` ⚠️ stopped after hanging at optimized production build.
> Items marked ✅ FIXED below were resolved in this session.

---

## 🔴 Critical

### ✅ ISSUE-001 — Middleware file must be `src/proxy.ts` under Next.js 16
- **File:** `src/proxy.ts`
- **Root cause:** Next.js 16 introduced `proxy.ts` as the new edge-middleware convention, deprecating `middleware.ts`. A previous agent session renamed `proxy.ts` → `middleware.ts` (correct for Next.js ≤15), which would have triggered a deprecation warning on every build under Next.js 16 (`The "middleware" file convention is deprecated. Please use "proxy" instead.`). Both filenames are loaded by Next.js, but only `proxy.ts` is free of the warning.
- **Fixed:** Renamed `src/middleware.ts` → `src/proxy.ts`. File content unchanged — only the filename matters.

---

## 🟠 High

### ✅ ISSUE-002 — `Tooltips.tsx` missing `"use client"` directive
- **File:** `src/components/Tooltips/Tooltips.tsx`
- **Impact:** Uses `useState`, `useRef`, `useLayoutEffect`, `useEffect`, `useId`, `useCallback`, and `createPortal(document.body)`. No `"use client"` at the top. Any future import from a Server Component will throw a runtime error immediately at `createPortal`.
- **Fixed:** `'use client';` added as the first line.

### ✅ ISSUE-003 — `SvgPropIconBase.tsx` missing `"use client"` directive
- **File:** `src/components/Icon/SvgPropIconBase.tsx`
- **Impact:** Renders `<Tooltip>` / `<TooltipTrigger>` / `<TooltipContent>` from `Tooltips.tsx` (which uses hooks and `createPortal`). No `"use client"` declared. Currently works only because all callers happen to be client components. Will fail if any Server Component imports it.
- **Fixed:** `'use client';` added as the first line.

### ✅ ISSUE-004 — `OpenIndicator` timezone bug: status uses visitor's local clock
- **File:** `src/components/OpenIndicator/OpenIndicator.tsx`
- **Impact:** `new Date()` returned the visitor's local time. The business operates on Pacific Time (`America/Los_Angeles`). A visitor in Tokyo or London would see the wrong open/closed status and incorrect "today" highlight.
- **Fixed:** Added `getPacificNow()` helper using `new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))`. All date/time reads in `getOpenStatus()` and the `currentDayIndex` in the render body now call this helper.

### ✅ ISSUE-005 — Contact form shows "success" before the email is sent
- **File:** `src/components/Contact/ContactForm.tsx`
- **Impact:** `window.location.href = mailto:...` only opens the user's email client. The `success_message` translation now accurately reads "Your email draft is ready. Please send it from your email app." `form.reset()` was removed so users don't lose their draft data if the email client fails to open.
- **Fixed:** Removed `form.reset()` call; success message translation was already corrected in a prior session.

### ✅ ISSUE-006 — `ReferenceGuide` responsibility icons are identical for every row
- **File:** `src/components/Incoterms/ReferenceGuide/ReferenceGuide.tsx`, `ReferenceGuide.module.scss`
- **Impact:** All 11 `SvgPropIcon` elements were hardcoded identically for every Incoterm row.
- **Fixed:** Added `STEP_ICONS` array and `getStepOwnership(sellerFraction)` helper in the component that derives a `'seller' | 'buyer'` value for each of the 11 steps from the existing `responsibilities.seller` fraction. Icons render with `icon-seller` (full opacity, primary colour) or `icon-buyer` (20% opacity) CSS classes. No changes to `TableData.ts` required.

---

## 🟡 Medium

### ISSUE-007 — `Footer.tsx` calls `useTranslations` in a Server Component
- **File:** `src/components/Footer/Footer.tsx` lines 1, 7, 14
- **Impact:** Uses the client-side `useTranslations()` hook without `"use client"`. Also calls `new Date().getFullYear()` during render, which can cause a hydration mismatch when a deploy straddles a year boundary (server renders "2025", client renders "2026").
- **Fix:** Either add `'use client';` to the file, or convert to `const t = await getTranslations('Common')` with an `async` function. Replace `new Date().getFullYear()` with a `suppressHydrationWarning` span or a client-only year component.

### ISSUE-008 — `Dictionary.tsx` unchecked `raw()` casts will throw at runtime
- **File:** `src/components/Dictionary/Dictionary.tsx` lines 46, 64
- **Impact:** `translateDictionary.raw(key) as string[]` and `as string` are compile-time-only casts. If any translation key is absent or has the wrong type, these throw `TypeError: Cannot read properties of undefined (reading 'map')`, crashing the entire dictionary page for all users.
- **Fix:**
  ```ts
  // line 64
  const relatedTerms = (translateDictionary.raw(`${key}.relatedTerms`) as string[] | undefined) ?? [];
  // line 46
  const category = (translateDictionary.raw(`${key}.category`) as string | undefined) ?? '';
  ```

### ISSUE-009 — `Dictionary.tsx` `.replace(' ', '_')` only replaces the first space
- **File:** `src/components/Dictionary/Dictionary.tsx` line 66
- **Impact:** `term.trim().replace(' ', '_')` produces `"bill_of lading"` for multi-word terms instead of `"bill_of_lading"`.
- **Fix:** `term.trim().replaceAll(' ', '_')` (or `/\s+/g` regex).

### ISSUE-010 — `LanguageSwitcher` locale swap corrupts URLs containing the locale code
- **File:** `src/components/LanguageSwitcher/LanguageSwitcher.tsx` line 33
- **Impact:** `pathName.replace('/${locale}', '/${selectedLocale}')` replaces only the **first** occurrence. If the locale code appears in a URL slug (e.g. `/en/tools/en-glossary`), the first match is `en-glossary`'s `en` prefix, not the route segment, corrupting the path.
- **Fix:** Use `next-intl`'s built-in router: `router.push(pathname, { locale: selectedLocale })` where `pathname` is the un-prefixed path from `usePathname()` after stripping the locale prefix.

### ISSUE-011 — `GetHeader` missing `response.ok` check
- **File:** `src/services/Global/GetHeader/GetHeader.tsx`
- **Impact:** A non-2xx HTTP response from Strapi (500, 404, 429) does not throw — `fetch` only rejects on network failure. The code calls `.json()` unconditionally. A Strapi error body parses silently, `data?.Header` evaluates to `undefined`, and the header falls back to local data with no diagnostic log.
- **Fix:**
  ```ts
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`CMS error: ${response.status} ${response.statusText}`);
  const data = await response.json();
  ```

### ISSUE-012 — `Incoterms/Button.tsx` missing `"use client"` despite accepting event handler
- **File:** `src/components/Incoterms/Buttons/Button.tsx`
- **Impact:** Accepts an `onClick: () => void` prop but has no `"use client"` directive. Works only because current callers are client components. Will throw if ever imported from a Server Component.
- **Fix:** Add `'use client';` as the first line.

### ISSUE-013 — OG/Twitter images are SVG — unsupported by most social scrapers
- **File:** `src/app/[locale]/layout.tsx` lines 84–90, 93–98; `src/lib/seo.ts` line 87
- **Impact:** Facebook, LinkedIn, Twitter/X, and Slack unfurlers do not render SVG for Open Graph previews. All link previews will show no image or a broken image box.
- **Fix:** Add a rasterized `/og-image.png` (1200×630 px) to `public/` and reference it in the OG/Twitter `images` fields instead of `/DITLogo.svg`.

### ✅ ISSUE-014 — Advisor step 3 "Request Quote" and "Compare" buttons have no handler
- **File:** `src/components/Incoterms/Advisor/Advisor.tsx`
- **Impact:** Both action buttons in the result view silently did nothing when clicked.
- **Fixed:** "Request Quote" navigates to `/{locale}/contact`. "Compare" navigates to `/{locale}/tools/incoterms/reference-guide`. Added `useLocale` and `useRouter` imports.

### ISSUE-015 — `INCO_DB` advisor data is hardcoded in English only
- **File:** `src/components/Incoterms/Advisor/Advisor.tsx` lines 44–108
- **Impact:** All `description`, `fullName`, `reasons`, and `riskJourney.label` strings are hardcoded English. They bypass `next-intl` entirely. Switching the UI to `zh-TW` leaves the result card in English.
- **Fix:** Move these strings into the `Incoterms` i18n namespace (e.g. `advisor_result_EXW_description`, `advisor_result_EXW_reason_1`) and call `t()` at render time.

### ISSUE-016 — `OpenIndicator` status strings are hardcoded English
- **File:** `src/components/OpenIndicator/OpenIndicator.tsx` lines 68, 85–86, 93–94, 99–107
- **Impact:** `nextChange` strings (`"Opens Monday 7:00 AM"`, `"Closes 5:30 PM"`, `"Opens tomorrow"`) and `statusText` (`"Closed"`, `"Open"`, `"Closes soon"`) are hardcoded English inside `getOpenStatus()`, which runs before `useTranslations` is available.
- **Fix:** Return structured data from `getOpenStatus()` (e.g. `{ type: 'opens_next', day, time }`) and format the display string inside the component using `useTranslations`.

---

## 🔵 Low

### ISSUE-017 — Ambient global type files pollute namespace and lint as "unused"
- **Files:** `src/types/HeaderProps.tsx`, `ImageProps.tsx`, `LinkProps.tsx`, `LogoProps.tsx`
- **Impact:** No `export` keyword — TypeScript treats them as ambient global scripts. Lint reports them as `defined but never used` (4 warnings). `ImageProps` and `LinkProps` name-collide with identically named exports from `next/image` and `next/link`.
- **Fix:** Add `export` to each `interface` declaration and update the handful of files that rely on the ambient globals to import them explicitly.

### ISSUE-018 — `useActiveSection.tsx` uses `.tsx` extension with no JSX
- **File:** `src/hooks/useActiveSection.tsx`
- **Impact:** Minor — misleads tooling and readers into expecting JSX. No runtime impact.
- **Fix:** Rename to `useActiveSection.ts` and update the import in `NavBar.tsx`.

### ISSUE-019 — `Features.tsx` emits `aria-disabled="false"` on all enabled elements
- **File:** `src/components/Features/Features.tsx` lines 24, 33
- **Impact:** `aria-disabled="false"` is emitted as a present DOM attribute on every enabled card/link, which some assistive technologies treat differently from the attribute being absent.
- **Fix:** `aria-disabled={isDisabled || undefined}` — only emits the attribute when `true`.

### ISSUE-020 — `HomeParallax` `sectionDocTop` is stale after layout shifts
- **File:** `src/components/Home/HomeParallax.tsx` line 35
- **Impact:** `sectionDocTop` is computed once at mount. If late-loading images or web fonts shift the layout, the parallax animation freezes or jumps at incorrect scroll positions.
- **Fix:** Re-measure `sectionDocTop` inside the scroll handler, or attach a `ResizeObserver` that updates it on layout changes.

### ISSUE-021 — `HeaderClient` and `Button` use `<img>` instead of `next/image`
- **Files:** `src/components/Header/HeaderClient.tsx:250`, `src/components/Incoterms/Buttons/Button.tsx:31`
- **Impact:** Lint warnings (`@next/next/no-img-element`). Raw `<img>` skips Next.js image optimisation — larger payload, no automatic WebP/AVIF conversion, no `loading="lazy"` by default.
- **Fix:** Replace with `<Image>` from `next/image`, or suppress the warning with `eslint-disable` if the image is truly dynamic and `next/image` is not applicable.

### ISSUE-022 — `sitemap.ts` uses `new Date()` — always marks every page as "just modified"
- **File:** `src/app/sitemap.ts` line 10
- **Impact:** Every build regenerates the sitemap with the current timestamp for all pages. This tells search crawlers all pages changed on every deploy, wasting crawl budget.
- **Fix:** Use a static date per entry, or derive the date from the file's git last-modified date at build time.

### ISSUE-023 — `NavBar.v01.tsx` is dead code
- **File:** `src/components/NavBar/NavBar.v01.tsx`
- **Impact:** Not imported anywhere. Exports a component named `NavBar` — same name as the active component — which could cause confusion or accidental import.
- **Fix:** Delete the file, or move it to `_archive/` if it must be preserved for reference.

### ISSUE-024 — `Header.tsx` fallback expression passes `StaticImageData` as `string`
- **File:** `src/components/Header/Header.tsx` line 29
- **Impact:** `fallbackLogo.src ?? fallbackLogo` — the `?? fallbackLogo` branch evaluates if `fallbackLogo.src` is falsy. Because `fallbackLogo.src` on a Next.js static import is always a non-empty string, this branch is unreachable. However, if it were ever reached, it would pass a `StaticImageData` object where `logoUrl: string` is expected, producing `<img src="[object Object]">`.
- **Fix:** Simplify to `fallbackLogo.src` — remove the `?? fallbackLogo` branch.

### ISSUE-025 — Service files lack `import 'server-only'` guard
- **Files:** `src/services/GetBaseURL.tsx`, `src/services/Global/GetHeader/GetHeader.tsx`
- **Impact:** These functions use server-only environment variables (`API_BASE_URL`) and fetch. If accidentally imported in a Client Component, `API_BASE_URL` is always `undefined` (not `NEXT_PUBLIC_`-prefixed) and falls through silently.
- **Fix:** Add `import 'server-only';` at the top of each file to produce a clear build error if imported client-side.

### ISSUE-026 — `GetHomePage` service is an empty stub
- **File:** `src/services/GetHomePage/GetHomePage.tsx`
- **Impact:** Function is declared but returns nothing. Any caller would receive `undefined`.
- **Fix:** Implement the service (following the pattern of `GetHeader`) or delete it until it is needed.

### ISSUE-027 — `layout.tsx` redundant Google Fonts preconnect hints
- **File:** `src/app/[locale]/layout.tsx` lines 189–191
- **Impact:** `next/font/google` already injects `preconnect` links for `fonts.googleapis.com` and `fonts.gstatic.com` automatically. The manual `<link rel="preconnect">` tags in `<head>` are duplicate and add noise to the rendered HTML.
- **Fix:** Remove the two manual `<link>` tags.

---

## Verification Status

| Command | Status |
|---|---|
| `npm run typecheck` | ✅ passes |
| `npm run lint` | ⚠️ 6 warnings (0 errors) — see ISSUE-017, ISSUE-021 |
| `npm run test` | ✅ passes (2/2) |
| `npm run test:e2e` | ✅ passes (2/2) |
| `npm run build` | ⚠️ stopped after ~150s at `Creating an optimized production build ...`; also warns that `middleware` is deprecated in favor of `proxy` |
