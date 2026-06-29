# Services, i18n, Hooks, Types & Layouts Reference

> Auto-generated reference — update when files change.

---

## 1. Middleware / i18n Routing

### `src/proxy.ts` ⚠️ MISNAMED
- Implements `next-intl` `createMiddleware` for locale detection and path prefixing.
- **Bug:** Next.js only executes edge middleware from `src/middleware.ts`. This file is never run, so locale routing (redirects, path prefixing) is completely broken in production.
- **Fix:** Rename to `src/middleware.ts`.

### `src/i18n/config.ts`
- `locales`: `['en', 'zh-TW']`
- `defaultLocale`: `'en'`

### `src/i18n/routing.ts`
- Uses `next-intl` `defineRouting`.
- Strategy: path-prefix. Default locale (`en`) has no prefix; `zh-TW` is served at `/zh-TW/...`.

### `src/i18n/request.ts`
- Server-side `getRequestConfig` — merges the correct message bundle based on the incoming locale.
- Falls back to `en` for unknown/unsupported locales.

### `src/i18n/dictionaries.ts`
- `type Dictionary = Record<string, unknown>` — erases all type structure; downstream casts in components are unchecked.
- Exports async loader functions per locale.

---

## 2. Services

### `src/services/GetBaseURL.tsx`
- **Signature:** `GetBaseURL(strURL: string): string`
- Joins base URL with the given path segment.
- Base priority: `process.env.API_BASE_URL` → `process.env.NEXT_PUBLIC_STRAPI_URL` → `'http://localhost:1337'`
- **Gotcha:** No `import 'server-only'` guard — safe only as long as callers are Server Components.

### `src/services/GetAPIPath.tsx`
- **Signature:** `GetAPIPath(endpoint: string): string`
- Returns `<base>/api/<endpoint>`. Delegates to `GetBaseURL`.

### `src/services/GetHomePage/GetHomePage.tsx`
- **Status: Empty stub.** Function is declared but not implemented. Returns nothing.

### `src/services/Global/GetGlobalPath.tsx`
- **Signature:** `GetGlobalPath(queryString: string): string`
- Returns `<base>/api/global?<queryString>`.

### `src/services/Global/GetHeader/GetHeader.tsx`
- **Signature:** `GetHeader(): Promise<any>`
- Async fetch of Strapi `Global` single type with `Logo`, `Navigations`, and `CTA` populated.
- Uses `cache: 'no-store'` (always fresh).
- **Bugs:**
  - Missing `response.ok` check — non-2xx Strapi errors silently fall through.
  - Return type is `any` — no type safety on the response shape.
  - No `import 'server-only'` guard.

---

## 3. Types

> All type files (except `IconProps`) have **no `export` statement** — they are ambient globals visible to the whole project without importing. This causes name collisions with `next/image` and `next/link` built-in types.

### `src/types/HeaderProps.tsx`
```ts
interface HeaderProps {
  Logo: LogoProps
  Name: string
  Navigations: LinkProps[]
  CTA: LinkProps[]
}
```

### `src/types/ImageProps.tsx`
```ts
interface ImageProps { /* ...fields... */ }
```
⚠️ Name collides with `ImageProps` exported by `next/image`.

### `src/types/LinkProps.tsx`
```ts
interface LinkProps {
  Key: string
  Value: string
  isActive: boolean
  isEnabled: boolean
  isExternal: boolean
}
```
⚠️ Name collides with `LinkProps` exported by `next/link`.

### `src/types/LogoProps.tsx`
```ts
interface LogoProps {
  image: ImageProps
  logoText: string
}
```

### `src/types/IconProps.tsx`
```ts
export default interface IconProps {
  size?: number
  color?: string
  className?: string
}
```
Only type file with `export default` — imported normally by icon components.

---

## 4. Hooks

### `src/hooks/useActiveSection.tsx`
- **Signature:** `useActiveSection(sectionIds: string[]): string`
- Uses `IntersectionObserver` with `rootMargin: '-30% 0px -60% 0px'` to track which page section is currently in view.
- Returns the `id` string of the currently active section.
- **Client-only** (uses browser APIs — callers must be `"use client"` components).
- **Gotchas:**
  - If the caller passes an inline array literal (e.g. `useActiveSection(['hero', 'about'])`), a new array reference is created every render, causing the observer to disconnect/reconnect on every render cycle. Callers must stabilize the array with `useMemo` or a module-level constant.
  - On large viewports where multiple sections intersect, the last-evaluated intersecting entry wins — not necessarily the most visible one.
  - File uses `.tsx` extension but contains no JSX; should be `.ts`.

---

## 5. Layouts & Providers

### `src/layouts/MainLayOut.tsx`
- **Boundary:** Server Component
- Renders a `<section>` shell with `flex flex-col min-h-screen` and `py-20 sm:py-28` top/bottom padding, dark-mode background.
- Accepts `children: React.ReactNode`.
- Note: filename has typo (`LayOut` instead of `Layout`).

### `src/components/Providers/ClientProviders.tsx`
- **Boundary:** `"use client"`
- Wraps children in `next-themes` `ThemeProvider` with:
  - `attribute="class"` (Tailwind dark mode strategy)
  - `defaultTheme="light"`
  - `enableSystem={true}`
  - `storageKey="dit-theme"`

### `src/components/Providers/ServerProviders.tsx`
- **Boundary:** Server Component (async)
- Calls `getMessages()` from `next-intl/server` and bridges them to the client via `NextIntlClientProvider`.
- Wraps children — must be an ancestor of any component using `useTranslations`.

---

## 6. i18n Message Files

### Location
```
src/assets/international/
  en/
    auth.json          # empty placeholder
    common.json        # main UI strings (17 namespaces)
    dashboard.json     # empty placeholder
    dictionary.json    # 150+ logistics term definitions
  zh-TW/
    auth.json          # empty placeholder
    common.json        # translated UI strings
    dashboard.json     # empty placeholder
    dictionary.json    # translated logistics term definitions
```

### `common.json` namespaces (17)
`Metadata` · `Company` · `Home` · `About` · `Services` · `Tools` · `Calculator` · `News` · `Header` · `NavBar` · `CTABar` · `Theme` · `Language` · `Incoterms` · `Contact` · `Common` · `OpenIndicator`

### `dictionary.json` structure
```json
{
  "categories": { "<slug>": "<display label>", ... },  // 26 entries
  "dictionary": {
    "<termKey>": {
      "term": "string",
      "category": "string",
      "status": "string",
      "alternateNames": ["string"],
      "definition": "string",
      "relatedTerms": ["string"]
    }
  }
}
```
Contains 150+ logistics/trade term definitions per locale.

### Other data JSON files
Additional non-i18n JSON data files exist under `src/assets/data/` and within component folders (e.g. NavBar link data).
