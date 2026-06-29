---
name: seo
description: >
  Use when adding or editing pages, route metadata, sitemaps, robots, or
  structured data — the homepage sections and the /tools/* pages. Covers this
  project's Next.js metadata, per-locale canonical/hreflang, and JSON-LD.
---

# SEO

The metadata baseline here is already strong (OG, Twitter, robots, Organization + LocalBusiness JSON-LD, hreflang, manifest). Focus on the gaps below and don't regress what exists.

## This project's setup
- App Router metadata API (`metadata` / `generateMetadata`). Locales `en` + `zh-TW`.
- Use a title template (e.g. `%s | DIT San Francisco Inc.`) so the `/tools/*` pages get unique titles instead of repeating the site name.

## Fix / watch (real gaps in the current output)
- **Canonical vs hreflang mismatch:** `canonical` is the bare root for every page while hreflang alternates point to `/en` and `/zh-TW`. Make each localized page **self-canonical** to its own locale URL, and add an **`x-default`** hreflang. Keep en/zh-TW alternates in sync per route.
- **Per-route metadata:** the `/tools/dictionary`, `/tools/incoterms`, `/tools/calculator` pages need their own unique `title` + `description` (localized for both locales), not the homepage's.
- **Organization JSON-LD `sameAs` is empty** — populate it with the real social profiles (the footer links Facebook + Instagram).
- **LocalBusiness JSON-LD `geo` is empty** — add real lat/long for 46750 Fremont Blvd #200, Fremont, CA 94538. Make the `logo` URL consistent with the actual asset (icons use `/DITLogo.svg`; `logo` points at `/logo.png`).

## Add where it fits
- **Service** schema for the four services (Freight Shipping, Warehousing, Supply Chain Management, Tracking Solutions).
- **BreadcrumbList** on the `/tools/*` pages.
- **DefinedTermSet / DefinedTerm** for the dictionary, and **FAQPage** where a Q&A block exists. Keep structured data in sync with on-page content.

## Sitemap & robots
- Ensure `app/sitemap.ts` and `app/robots.ts` exist and include **both locales** for every indexable route (homepage + tools). Exclude nothing that should be found; don't `noindex` marketing/tool pages.

## Don't
- Duplicate titles/descriptions across pages, invent a canonical domain (read from config), or rely on the `keywords` meta (search engines largely ignore it — harmless to keep).

## Verify
- Build, inspect the rendered `<head>` per locale (canonical is self-referential, hreflang includes x-default), confirm the sitemap lists both locales, and sanity-check JSON-LD validity.