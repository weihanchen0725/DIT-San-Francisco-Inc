# Routes, Pages & Data Flow Reference

> Auto-generated reference — update when files change.

---

## Route Tree

The entire routable surface lives under the `[locale]` dynamic segment. The
`next-intl` middleware (at `src/middleware.ts`) prefixes every URL with a locale
before the request reaches any page.

```
app/
├── robots.ts                                     →  /robots.txt        (force-static)
├── sitemap.ts                                    →  /sitemap.xml       (force-static)
└── [locale]/                                     →  /{locale}
    ├── layout.tsx                                    Root layout (wraps all routes)
    ├── page.tsx                                  →  /{locale}
    ├── about/
    │   └── page.tsx                              →  /{locale}/about
    ├── contact/
    │   └── page.tsx                              →  /{locale}/contact
    ├── news/
    │   └── page.tsx                              →  /{locale}/news
    ├── services/
    │   └── page.tsx                              →  /{locale}/services
    └── tools/
        ├── page.tsx                              →  /{locale}/tools
        ├── calculator/
        │   └── page.tsx                          →  /{locale}/tools/calculator
        ├── dictionary/
        │   ├── layout.tsx                            Dictionary segment layout
        │   └── page.tsx                          →  /{locale}/tools/dictionary
        └── incoterms/
            ├── page.tsx                          →  /{locale}/tools/incoterms
            ├── advisor/
            │   └── page.tsx                      →  /{locale}/tools/incoterms/advisor
            └── reference-guide/
                └── page.tsx                      →  /{locale}/tools/incoterms/reference-guide
```

Supported `{locale}` values: `en` (default), `zh-TW`.
Unmatched or bare `/` paths are redirected to the default locale by the middleware.

---

## Per-Route Reference

| URL pattern | Page file (under `src/app/`) | Root component(s) rendered | `pageKey` | Rendering |
|---|---|---|---|---|
| `/{locale}` | `[locale]/page.tsx` | `Home`, `About`, `Partners`, `Services`, `Tools`, `News`, `Clients`, `Contact` | `home` | Server Component |
| `/{locale}/about` | `[locale]/about/page.tsx` | `About` (inside `MainLayOut`) | `about` | Server Component |
| `/{locale}/services` | `[locale]/services/page.tsx` | `Services` (inside `MainLayOut`) | `services` | Server Component |
| `/{locale}/news` | `[locale]/news/page.tsx` | `News` (inside `MainLayOut`) | `news` | Server Component |
| `/{locale}/contact` | `[locale]/contact/page.tsx` | `Contact` (inside `MainLayOut`) | `contact` | Server Component |
| `/{locale}/tools` | `[locale]/tools/page.tsx` | `Tools` (inside `MainLayOut`) | `tools` | Server Component |
| `/{locale}/tools/calculator` | `[locale]/tools/calculator/page.tsx` | `Calculator` | `calculator` | Server Component |
| `/{locale}/tools/dictionary` | `[locale]/tools/dictionary/page.tsx` | `Dictionary` | `dictionary` | Server Component |
| `/{locale}/tools/incoterms` | `[locale]/tools/incoterms/page.tsx` | `IncoTerms` | `incoterms` | Server Component |
| `/{locale}/tools/incoterms/advisor` | `[locale]/tools/incoterms/advisor/page.tsx` | `Advisor` | `incotermsAdvisor` | Server Component |
| `/{locale}/tools/incoterms/reference-guide` | `[locale]/tools/incoterms/reference-guide/page.tsx` | `ReferenceGuide` | `incotermsReferenceGuide` | Server Component |

All `pageKey` values correspond to keys in the `Metadata` i18n namespace, used
by `getLocalizedMetadata()` in `src/lib/seo.ts` to produce page `<title>`,
`<meta name="description">`, OpenGraph, and Twitter card tags.

---

## Layout Hierarchy

### 1. Root layout — `src/app/[locale]/layout.tsx`

Wraps every route under `[locale]`. Responsibilities:

- Sets `<html lang={locale} suppressHydrationWarning>`.
- Loads the Roboto variable font via `next/font/google`.
- Exports `metadata` (site-wide defaults) and `viewport` config.
- Injects two JSON-LD `<script>` blocks: `Organization` and `LocalBusiness` Schema.org structured data.
- Wraps the body in:
  - `ServerProviders` — async server component that calls `getMessages()` and renders `NextIntlClientProvider` so client components can access translations.
  - `ClientProviders` — client component rendering `next-themes` `ThemeProvider` (default: `light`, system detection on, key: `dit-theme`).
- Renders `<Header />` (server component) before `<main id="main-content">`, and `<Footer />` after.

### 2. Dictionary segment layout — `src/app/[locale]/tools/dictionary/layout.tsx`

Applies only to the `/tools/dictionary` subtree. Wraps `children` in a
`<section className="dictionary-layout">` for scoped SCSS styling.

### 3. `MainLayOut` component — `src/layouts/MainLayOut.tsx`

Not a Next.js file-based layout; a React component used inline in individual pages.
Adds top padding (`py-20 sm:py-28`) and a full-height flex column with theme-aware
background colour to offset pages below the sticky header.

**Used by:** `/about`, `/contact`, `/news`, `/services`, `/tools`.

**Not used by:** home page, `/tools/calculator`, `/tools/dictionary`,
`/tools/incoterms`, `/tools/incoterms/advisor`, `/tools/incoterms/reference-guide`.

---

## Data Flow

### i18n (next-intl)

```
Request
  │
  ▼
Middleware (src/proxy.ts)  ←  routing config (src/i18n/routing.ts)
  Prefixes URL with locale; redirects bare / to /en
  │
  ▼
src/i18n/request.ts  →  getRequestConfig()
  Resolves active locale; falls back to defaultLocale ("en")
  │
  ▼
src/i18n/dictionaries.ts  →  getDictionary(locale)
  Merges: common.json · auth.json · dashboard.json · dictionary.json
  Marked server-only via "server-only" import guard
  │
  ▼
ServerProviders  →  NextIntlClientProvider(messages)
  Passes merged messages into React context for useTranslations() / useLocale()
```

Translation files: `src/assets/international/{en,zh-TW}/{common,auth,dashboard,dictionary}.json`

### Header & CMS data

```
Header (Server Component)
  │
  ├─ GetHeader()  →  GET {API_BASE_URL}/api/global
  │     Populates: Logo.image · Navigations · CTA
  │     cache: "no-store"
  │     ⚠️  Missing response.ok guard
  │
  ├─ On error  →  fallback: src/assets/data/Header.data.json
  │
  └─ Props passed to HeaderClient (Client Component)
       Handles: scroll animation, hamburger menu, NavBar, CTABar,
                ThemeSwitcher, LanguageSwitcher
```

CMS base URL priority: `API_BASE_URL` env var → `NEXT_PUBLIC_STRAPI_URL` env var → `http://localhost:1337`

### Per-page metadata

Every page exports `generateMetadata` calling `getLocalizedMetadata({ locale, path, pageKey })` from `src/lib/seo.ts`:
- Fetches `Metadata.{pageKey}.title` and `.description` from the active locale bundle via `getTranslations`.
- Builds `alternates.languages` hreflang map for both locales plus `x-default` → `en`.
- Returns full `Metadata` including OpenGraph and Twitter card fields.

Canonical URL format: `https://ditsanfrancisco.com/{locale}{path}` (controlled by `NEXT_PUBLIC_SITE_URL` env var).

### Theme

`ClientProviders` → `next-themes` `ThemeProvider`:
- `attribute="class"` — toggling writes a class to `<html>`.
- `defaultTheme="light"`, `enableSystem={true}`.
- Persisted to `localStorage` under key `dit-theme`.
- `ThemeSwitcher` (client component) reads/writes this context.

### Sitemap generation

`src/app/sitemap.ts` (force-static) iterates `localizedRoutes` × all locales.
Each entry includes `alternates.languages` hreflang tags for every locale and an `x-default` → English variant.

---

## Navigation Structure

### Primary navigation (NavBar)

Six items defined in `src/assets/data/NavBar.data.json`:

| id | Key | Anchor target |
|---|---|---|
| 1 | `home` | `#home` |
| 2 | `about` | `#about` |
| 3 | `services` | `#services` |
| 4 | `tools` | `#tools` |
| 5 | `news` | `#news` |
| 6 | `contact` | `#contact` |

All items: `isActive: true`, `isEnabled: true`, `isExternal: false`.

**Link resolution logic** (`src/components/NavBar/NavBar.tsx`):
- Home page (`/{locale}` or `/`): links resolve to bare anchor fragments (`#about`, etc.) — scrolls in-page.
- Any other page: links resolve to `/{locale}#section` — navigates to home page and scrolls.

**Active-section highlighting:** `useActiveSection` hook attaches an `IntersectionObserver` to each section element. A nav item receives the `active` SCSS class when its section occupies the viewport centre (`rootMargin: "-30% 0px -60% 0px"`).

Labels resolved through the `NavBar` i18n translation namespace.

### Header responsive collapse tiers

`HeaderClient` reads its own rendered width via `ResizeObserver` and collapses in three steps:

| Tier | Width | In fixed header bar | Moved into hamburger panel |
|---|---|---|---|
| 0 | > 1120 px | NavBar + CTABar + ThemeSwitcher + LanguageSwitcher | — |
| 1 | 897–1120 px | NavBar | CTABar + ThemeSwitcher + LanguageSwitcher |
| 2 | 641–896 px | — | NavBar + CTABar + ThemeSwitcher + LanguageSwitcher |
| 3 | ≤ 640 px | — (company name hidden) | everything |

Hamburger panel closes on outside click or any `<a>` click inside it.

### Language switching

`LanguageSwitcher` (`src/components/LanguageSwitcher/LanguageSwitcher.tsx`):
- Reads current locale via `useLocale()`.
- On `<select>` change: replaces `/{currentLocale}` prefix in `pathname` with selected locale and calls `router.replace(newPath)`.
- ⚠️ `String.replace` only replaces the first occurrence — if locale code appears in a URL slug it will corrupt the path.
- Supported: `en`, `zh-TW`. Displayed in row or column layout depending on collapse tier.
