# Components Reference

> Auto-generated reference — update when files change.

---

## Summary Table

| Component | Boundary | File |
|-----------|----------|------|
| About | Server Component | `src/components/About/About.tsx` |
| Advisor | `"use client"` | `src/components/Incoterms/Advisor/Advisor.tsx` |
| Calculator | `"use client"` | `src/components/Calculator/Calculator.tsx` |
| Clients | Server Component | `src/components/Clients/Clients.tsx` |
| Contact | Server Component (async) | `src/components/Contact/Contact.tsx` |
| CTABar | `"use client"` | `src/components/CTABar/CTABar.tsx` |
| Dictionary | Server Component (async) | `src/components/Dictionary/Dictionary.tsx` |
| Dictionary/NavBar | `"use client"` | `src/components/Dictionary/NavBar/NavBar.tsx` |
| Features | Server Component | `src/components/Features/Features.tsx` |
| Footer | Server Component (⚠️ uses `useTranslations`) | `src/components/Footer/Footer.tsx` |
| Header | Server Component (async) | `src/components/Header/Header.tsx` |
| HeaderClient | `"use client"` | `src/components/Header/HeaderClient.tsx` |
| Home | Server Component (async) | `src/components/Home/Home.tsx` |
| HomeParallax | `"use client"` | `src/components/Home/HomeParallax.tsx` |
| IncoTerms | `"use client"` | `src/components/Incoterms/Incoterms.tsx` |
| Incoterms/Button | Server Component ⚠️ | `src/components/Incoterms/Buttons/Button.tsx` |
| LanguageSwitcher | `"use client"` | `src/components/LanguageSwitcher/LanguageSwitcher.tsx` |
| Map | `"use client"` | `src/components/Map/Map.tsx` |
| MapWrapper | `"use client"` | `src/components/Map/MapWrapper.tsx` |
| NavBar | `"use client"` | `src/components/NavBar/NavBar.tsx` |
| NavBar.v01 | `"use client"` — **DEAD CODE** | `src/components/NavBar/NavBar.v01.tsx` |
| News | Server Component | `src/components/News/News.tsx` |
| OpenIndicator | `"use client"` | `src/components/OpenIndicator/OpenIndicator.tsx` |
| Partners | Server Component | `src/components/Partners/Partners.tsx` |
| ClientProviders | `"use client"` | `src/components/Providers/ClientProviders.tsx` |
| ServerProviders | Server Component (async) | `src/components/Providers/ServerProviders.tsx` |
| ReferenceGuide | `"use client"` | `src/components/Incoterms/ReferenceGuide/ReferenceGuide.tsx` |
| ReferenceGuide.TableData | Data module (not a component) | `src/components/Incoterms/ReferenceGuide/ReferenceGuide.TableData.ts` |
| Services | Server Component | `src/components/Services/Services.tsx` |
| SvgPropIconBase | ⚠️ No `"use client"` | `src/components/Icon/SvgPropIconBase.tsx` |
| ThemeSwitcher | `"use client"` | `src/components/ThemeSwitcher/ThemeSwitcher.tsx` |
| Tools | Server Component | `src/components/Tools/Tools.tsx` |
| Tooltips | ⚠️ No `"use client"` | `src/components/Tooltips/Tooltips.tsx` |

---

## About

- **File:** `src/components/About/About.tsx`
- **Boundary:** Server Component (async)
- **Props:** none (fetches its own translations)
- **Key state:** none
- **Key functions:** none
- **Imports from:** `next-intl/server` (`getTranslations`)
- **Notes:** Section `id="about"`. Renders company background and mission content from `About` i18n namespace.

---

## Advisor

- **File:** `src/components/Incoterms/Advisor/Advisor.tsx`
- **Boundary:** `"use client"`
- **Props:** none
- **Key state:**
  - `step: 1 | 2 | 3` — current wizard step
  - `role: 'seller' | 'buyer' | null`
  - `scope: 'international' | 'domestic' | null`
  - `goal: 'minimize-risk' | 'maximize-control' | 'simple-logistics' | 'lowest-cost' | null`
  - `transportMode: 'sea' | 'air' | 'rail' | 'road' | 'multi'` (default `'sea'`)
  - `exportCustoms: boolean`, `intlFreight: boolean`, `doorToDoor: boolean`
  - `insurance: 'self' | 'seller' | 'none'` (default `'self'`)
  - `result: IncoResult | null`
  - `stepOneError: boolean`
- **Key functions:**
  - `calcResult(role, scope, goal, transportMode, exportCustoms, intlFreight, doorToDoor, insurance): IncoResult` — decision tree returning one of 7 Incoterm recommendations from `INCO_DB`
  - `handleContinue()` — validates step 1, advances to step 2
  - `handleCalculate()` — validates step 1, runs `calcResult`, advances to step 3
- **Imports from:** `@iconify/react`, `next-intl`
- **Notes:**
  - `INCO_DB` is a hardcoded English-only record — not i18n'd.
  - Step 3 "Request Quote" and "Compare" buttons have no `onClick` handlers — they do nothing when clicked.
  - `canContinue` guard is `role !== null && scope !== null && goal !== null`.

---

## Calculator

- **File:** `src/components/Calculator/Calculator.tsx`
- **Boundary:** `"use client"`
- **Props:** none
- **Key state:**
  - `pieces`, `lengthCm`, `lengthInch`, `widthCm`, `widthInch`, `heightCm`, `heightInch`, `weightKg`, `weightLb` — all `string`
  - `results: { cft: number; cbm: number } | null`
- **Key functions:**
  - `handleCalculate(e)` — computes `cbm = (L × W × H × pieces) / 1_000_000`, `cft = cbm × 35.3147`
  - `handleReset()` — resets all fields to `'1'`
  - `cmToInch`, `inchToCm`, `kgToLb`, `lbToKg` — unit converters (module-level)
  - `blockInvalidChars(e)` — prevents `-`, `+`, `e`, `E` in number inputs
- **Imports from:** `next-intl`
- **Notes:** `weightKg`/`weightLb` are captured in state and shown in the form but are **not used in `handleCalculate`** — the result is dimensional weight only. CBM and CFT are the only outputs.

---

## Clients

- **File:** `src/components/Clients/Clients.tsx`
- **Boundary:** Server Component
- **Props:** none
- **Notes:** Empty placeholder stub — no content implemented yet.

---

## Contact

- **File:** `src/components/Contact/Contact.tsx`
- **Boundary:** Server Component (async)
- **Props:** none
- **Key functions:** none (renders sub-components)
- **Imports from:** `next-intl/server`, `MapWrapper`, `OpenIndicator`, `ContactForm`, `ContactData.json`
- **Notes:** Shell component. Renders the contact info cards, `MapWrapper`, `OpenIndicator`, and `ContactForm`.

---

## ContactForm

- **File:** `src/components/Contact/ContactForm.tsx`
- **Boundary:** `"use client"`
- **Props:** none
- **Key state:**
  - `errors: ContactErrors` — per-field validation error messages
  - `submitState: 'idle' | 'success' | 'error'`
- **Key functions:**
  - `validate(formData)` — validates firstName, lastName, email (regex), message; returns error map
  - `handleSubmit(event)` — calls `event.preventDefault()`, validates, then opens `window.location.href = mailto:...` with encoded subject+body
  - `isValidEmail(value)` — `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` regex
- **Imports from:** `next-intl`, `ContactData.json`
- **Notes:**
  - Uses `mailto:` approach — opens user's email client; no server-side submission.
  - ⚠️ `setSubmitState('success')` fires immediately after `window.location.href = mailto:...`. The user hasn't sent the email yet — the success message is premature (see ISSUE-005).
  - Fields: firstName\*, lastName\*, email\*, phone, company, country, state, city, subject, message\* (\* = required).

---

## CTABar

- **File:** `src/components/CTABar/CTABar.tsx`
- **Boundary:** `"use client"`
- **Props:**
  - `data: LinkProps[]` — CTA links from the header data
  - `styleMode?: 'row' | 'column'` (default `'row'`)
- **Notes:** Renders CTA action links. Accepts `styleMode` to switch between inline/stacked layout.

---

## Dictionary

- **File:** `src/components/Dictionary/Dictionary.tsx`
- **Boundary:** Server Component (async)
- **Props:** none
- **Key state:** none (all computed at module level)
- **Module-level constants:**
  - `filteredKeys` — term keys starting with a letter (from `dictionary.data.json`)
  - `navLetters` — unique sorted first letters
  - `groupedByLetter` — keys grouped by first letter
  - `CATEGORY_TO_SLUG` — display category name → CSS slug map (derived from both locale JSON files)
- **Key functions:**
  - `toCategorySlug(category)` — looks up CSS class slug for a display category name
- **Imports from:** `next-intl/server`, locale JSON dictionary files
- **Notes:**
  - `translateDictionary.raw(key)` casts are unchecked (`as string[]`, `as string`) — will throw `TypeError` at runtime if a key is missing.
  - `.replace(' ', '_')` on related terms only replaces the first space.

---

## Dictionary/NavBar

- **File:** `src/components/Dictionary/NavBar/NavBar.tsx`
- **Boundary:** `"use client"`
- **Props:**
  - `navLetters: string[]` — alphabet letters to render as anchor links
- **Notes:** Sticky alphabetical jump-nav for the dictionary page. Highlights the currently visible letter section.

---

## Features

- **File:** `src/components/Features/Features.tsx`
- **Boundary:** Server Component
- **Props:** none
- **Notes:** Renders the features/capabilities grid. Uses `aria-disabled={isDisabled ? 'true' : 'false'}` — emits the attribute even on non-disabled cards.

---

## Footer

- **File:** `src/components/Footer/Footer.tsx`
- **Boundary:** Server Component (no `"use client"`)
- **Props:** none
- **Notes:**
  - ⚠️ Calls `useTranslations('Common')` — the client-side hook — without `"use client"`. Works via next-intl RSC integration but is inconsistent with the rest of the codebase (which uses `await getTranslations()` in server components).
  - `new Date().getFullYear()` in server render may cause hydration mismatch across year boundaries.

---

## Header

- **File:** `src/components/Header/Header.tsx`
- **Boundary:** Server Component (async)
- **Props:** none
- **Key functions:**
  - `dataLoader(): Promise<HeaderProps>` — tries `GetHeader()` (CMS); falls back to `localHeaderData` on any error
- **Imports from:** `GetHeader`, `GetBaseURL`, `Header.data.json` (fallback), `fallbackLogo.webp`
- **Notes:** Constructs `logoUrl` from CMS data or fallback static import, then passes to `HeaderClient`. The `?? fallbackLogo` branch on line 29 would pass a `StaticImageData` object where a `string` is expected (unreachable in practice since `fallbackLogo.src` is always non-empty).

---

## HeaderClient

- **File:** `src/components/Header/HeaderClient.tsx`
- **Boundary:** `"use client"`
- **Props:**
  - `headerData: HeaderProps`
  - `logoUrl: string`
- **Key state:**
  - `isMenuOpen: boolean`
  - `collapseTier: 0 | 1 | 2 | 3` — responsive collapse level
- **Key functions:**
  - `getHeaderCollapseTier(width)` — maps pixel width to collapse tier (breakpoints: 640, 896, 1120)
  - `syncPaddingBaseline()` — sets `--header-height` CSS var and `padding-top` on `#main-content`
  - `ResizeObserver` on `headerRef` — updates `collapseTier` on resize
  - `useEffect` for scroll animation — rAF loop writing opacity/backdrop-filter CSS vars
  - Click-outside listener closes hamburger menu
- **Imports from:** `lucide-react`, `next/navigation`, `NavBar`, `CTABar`, `ThemeSwitcher`, `LanguageSwitcher`
- **Notes:** Three collapse breakpoints (640/896/1120 px) control which items move into the hamburger panel. `menuPanelId` (from `useId`) links the toggle button to the panel via `aria-controls`.

---

## Home

- **File:** `src/components/Home/Home.tsx`
- **Boundary:** Server Component (async)
- **Props:** none
- **Imports from:** `next-intl/server`, `HomeParallax`, static SVG images
- **Notes:** Section `id="home"`. Hero section with company name, tagline, and CTA links. Renders `HomeParallax` for the animated background visuals.

---

## HomeParallax

- **File:** `src/components/Home/HomeParallax.tsx`
- **Boundary:** `"use client"`
- **Props:** none
- **Key state:** none (uses refs)
- **Key functions:**
  - `applyOffset()` — scroll handler applying CSS translate to parallax layers
  - `useEffect` computes `sectionDocTop` and `totalRange` on mount
- **Notes:** `sectionDocTop` is captured once at mount; stale after layout shifts (late images, fonts). `ResizeObserver` not used — parallax may freeze/jump on dynamic layout changes.

---

## IncoTerms

- **File:** `src/components/Incoterms/Incoterms.tsx`
- **Boundary:** `"use client"`
- **Props:** none
- **Key functions:**
  - `handleRouting(index)` — navigates to `/[locale]/tools/incoterms/reference-guide` (index 1) or `/advisor` (index 2)
- **Imports from:** `next/navigation`, `next-intl`, `Incoterms.data.json`, `Button`
- **Notes:** Landing/hub page for Incoterms tools. Renders two `Button` cards navigating to Reference Guide and Advisor.

---

## Incoterms/Button

- **File:** `src/components/Incoterms/Buttons/Button.tsx`
- **Boundary:** ⚠️ Server Component (no `"use client"`)
- **Props:**
  - `Title: string`
  - `Description: string`
  - `Button_Text: string`
  - `Button_Icon: React.ReactNode | null`
  - `onClick: () => void` — event handler prop
  - `isLight: boolean`
- **Notes:** Accepts an `onClick` event handler but has no `"use client"` directive. Works today only because callers (`IncoTerms`, `ReferenceGuide`) are themselves client components. Will fail if ever imported from a Server Component.

---

## LanguageSwitcher

- **File:** `src/components/LanguageSwitcher/LanguageSwitcher.tsx`
- **Boundary:** `"use client"`
- **Props:**
  - `styleMode?: 'row' | 'column'` (default `'row'`)
- **Key functions:**
  - `handleChange(e)` — replaces `/${locale}` in current `pathname` with selected locale, calls `router.replace(newPath)`
- **Notes:** ⚠️ `String.replace` replaces only the first occurrence — if the locale code appears elsewhere in the URL slug the path will be corrupted. Should use `router.push(pathname, { locale })` via next-intl.

---

## Map

- **File:** `src/components/Map/Map.tsx`
- **Boundary:** `"use client"`
- **Props:** none
- **Imports from:** `react-leaflet`, `leaflet/dist/leaflet.css`
- **Notes:**
  - Loaded via `dynamic()` (SSR disabled) from `MapWrapper` — never rendered on the server.
  - Inline `style={{ height: '280px' }}` does not match MapWrapper skeleton `h-[400px]` — causes 120 px CLS on load.
  - Leaflet CSS imported in both `Map.tsx` and `MapWrapper.tsx` — duplicate bundle inclusion.

---

## MapWrapper

- **File:** `src/components/Map/MapWrapper.tsx`
- **Boundary:** `"use client"`
- **Props:** none
- **Notes:** Wraps `Map` in a `next/dynamic` call with `ssr: false` and a pulsing `h-[400px]` skeleton placeholder. Height mismatch with `Map` (280 px) causes CLS.

---

## NavBar

- **File:** `src/components/NavBar/NavBar.tsx`
- **Boundary:** `"use client"`
- **Props:**
  - `styleMode?: 'row' | 'column'` (default `'row'`)
- **Key state:** none (uses `useActiveSection` hook)
- **Key functions:**
  - `getHref(anchor)` — returns bare anchor (`#section`) on home page, `/{locale}#section` on other pages
  - `sectionIds` — stabilised with `useMemo([], [])` to prevent `useActiveSection` thrash
- **Imports from:** `next-intl`, `next/navigation`, `NavBar.data.json`, `useActiveSection`
- **Notes:** Reads links from the static JSON file. Active item is highlighted via `useActiveSection` comparing against `item.Key`. `isActive` flag on each item controls rendering; `isEnabled === false` sets `aria-disabled`.

---

## NavBar.v01

- **File:** `src/components/NavBar/NavBar.v01.tsx`
- **Boundary:** `"use client"`
- **Status:** **DEAD CODE — not imported anywhere in the codebase.**
- **Notes:** Left as a reference. Contains anti-patterns: 6 `useMemo` calls on static string literals, duplicate `key` on inner elements, click-outside `useEffect` guard in the wrong place. Exports a component named `NavBar` which would conflict with the active `NavBar.tsx` if accidentally imported.

---

## News

- **File:** `src/components/News/News.tsx`
- **Boundary:** Server Component
- **Props:** none
- **Notes:** Section `id="news"`. Currently renders 3 hardcoded placeholder articles — not yet wired to CMS or a data source.

---

## OpenIndicator

- **File:** `src/components/OpenIndicator/OpenIndicator.tsx`
- **Boundary:** `"use client"`
- **Props:** none
- **Key state:**
  - `isExpanded: boolean` — dropdown visibility
  - `openStatus: OpenStatus | null` — computed on mount
- **Key functions:**
  - `getOpenStatus(): OpenStatus` — computes open/closed state and status text from `businessHours`
  - `getNextOpenDay(dayIndex)` — finds the next open business day
  - `formatTime(time24)` — converts 24h to 12h AM/PM
  - `timeToMinutes(time)` — converts `HH:MM` to total minutes
- **Notes:**
  - ⚠️ **Timezone bug:** `new Date()` uses the visitor's local clock, not `America/Los_Angeles`. Visitors outside Pacific Time will see incorrect open/closed status. Fix: use `Intl.DateTimeFormat` with `timeZone: 'America/Los_Angeles'`.
  - Business hours: Mon–Fri 07:00–17:30, Sat–Sun closed.

---

## Partners

- **File:** `src/components/Partners/Partners.tsx`
- **Boundary:** Server Component
- **Props:** none
- **Notes:** Empty placeholder stub — no content implemented yet.

---

## ClientProviders

- **File:** `src/components/Providers/ClientProviders.tsx`
- **Boundary:** `"use client"`
- **Props:**
  - `children: React.ReactNode`
- **Notes:** Wraps children in `next-themes` `ThemeProvider` with `attribute="class"`, `defaultTheme="light"`, `enableSystem={true}`, `storageKey="dit-theme"`.

---

## ServerProviders

- **File:** `src/components/Providers/ServerProviders.tsx`
- **Boundary:** Server Component (async)
- **Props:**
  - `children: React.ReactNode`
- **Notes:** Calls `getMessages()` from `next-intl/server` and wraps children in `NextIntlClientProvider`. Must be an ancestor of any component using `useTranslations()`.

---

## ReferenceGuide

- **File:** `src/components/Incoterms/ReferenceGuide/ReferenceGuide.tsx`
- **Boundary:** `"use client"`
- **Props:** none
- **Key state:** none
- **Key functions:**
  - `getModeIcon(mode)` — returns `<Icon>` + `aria-label` span for the transport mode
  - `getModeLabel(mode)` — returns i18n label with English fallback
  - `getResponsibilityPercentages(seller, buyer)` — formats `"X% / Y%"` string
  - `handleRouting(index)` — navigates to reference-guide (1) or advisor (2)
- **Imports from:** `next-intl`, `next/navigation`, `REFERENCE_GUIDE_TABLE_DATA`, 11 SVG icon components, `SvgPropIcon`
- **Notes:**
  - ⚠️ All 11 `SvgPropIcon` responsibility icons are rendered identically for every row — no per-row data drives which icons are seller vs buyer. The responsibilities column is currently meaningless.
  - "Download PDF" button has no `onClick` — does nothing when clicked.
  - `tableHeaders` array is redefined on every render (should be outside the component).

---

## ReferenceGuide.TableData

- **File:** `src/components/Incoterms/ReferenceGuide/ReferenceGuide.TableData.ts`
- **Type:** Data module (not a React component)
- **Exports:** `REFERENCE_GUIDE_TABLE_DATA: TableData[]`
- **TableData shape:**
  ```ts
  interface TableData {
    id: number;
    title: string;      // lowercase incoterm code (e.g. 'exw')
    code: string;       // lowercase incoterm code
    mode?: 'any' | 'sea' | 'air' | 'land';
    responsibilities?: { buyer: number; seller: number };  // fractions of 1 (e.g. 1/11)
  }
  ```
- **Notes:** Contains 11 rows (EXW through DDP). Responsibilities are fractional values representing proportion of the 11 logistics steps.

---

## Services

- **File:** `src/components/Services/Services.tsx`
- **Boundary:** Server Component (async)
- **Props:** none
- **Notes:** Section `id="services"`. Renders the services offerings grid from i18n translations + local service icon components.

---

## SvgPropIconBase

- **File:** `src/components/Icon/SvgPropIconBase.tsx`
- **Boundary:** ⚠️ No `"use client"` directive
- **Props (`SvgPropIconProps`):**
  - `icon: React.ComponentType<SVGProps>` — the SVG component to render
  - `size?: number | string` (default `24`)
  - `decorative?: boolean` (default `true`)
  - `aria-label?: string`
  - `tooltip?: string`
  - ...rest of `SVGProps`
- **Exports:**
  - `SvgPropIconBase` — `forwardRef` + `memo` wrapped base component
  - `SvgPropIcon` — convenience alias; renders with or without `Tooltip` wrapper based on `tooltip` prop
- **Notes:** ⚠️ Renders `Tooltip`/`TooltipTrigger`/`TooltipContent` from `Tooltips.tsx` which uses hooks and `createPortal`. No `"use client"` on either file — works only because all current callers (`ReferenceGuide`) are already client components.

---

## ThemeSwitcher

- **File:** `src/components/ThemeSwitcher/ThemeSwitcher.tsx`
- **Boundary:** `"use client"`
- **Props:** none
- **Notes:** Reads and writes the `next-themes` context. Renders a toggle button cycling between `light` and `dark` themes.

---

## Tools

- **File:** `src/components/Tools/Tools.tsx`
- **Boundary:** Server Component (async)
- **Props:** none
- **Notes:** Section `id="tools"`. Renders tool cards (Calculator, Dictionary, Incoterms) with links to the respective tool routes.

---

## Tooltips

- **File:** `src/components/Tooltips/Tooltips.tsx`
- **Boundary:** ⚠️ No `"use client"` directive
- **Exports:**
  - `Tooltip` — context provider + state manager
  - `TooltipTrigger` — attaches hover/focus handlers and `aria-describedby`
  - `TooltipContent` — portaled tooltip bubble, positioned via `useLayoutEffect`
- **Key state (inside `Tooltip`):**
  - `isOpen: boolean`
- **Key functions:**
  - `openTooltip()`, `closeTooltip()`
  - `useLayoutEffect` in `TooltipContent` — positions the bubble relative to the trigger via `getBoundingClientRect()`
  - `createPortal(content, document.body)` — renders tooltip outside the DOM tree
- **Notes:**
  - ⚠️ Uses `useState`, `useRef`, `useLayoutEffect`, `useEffect`, `useId`, `useCallback`, and `createPortal`. **Must have `"use client"` added.** Importing from a Server Component will throw immediately at `createPortal(document.body)`.
  - Supports `placement: 'top' | 'bottom' | 'left' | 'right'` with `'top'` as default.
