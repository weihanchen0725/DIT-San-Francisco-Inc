---
name: i18n
description: >
  Use when adding or editing translatable content, locale routing, the locale
  switcher, or formatting of dates/numbers/units. Covers this project's
  next-intl setup, message structure, ICU formatting, and what NOT to translate
  in logistics.
---

# Internationalization (i18n)

## This project's setup (locked — follow it)
- **Library:** `next-intl` with App Router. Do not add or swap i18n libraries.
- **Routing:** `/[locale]/` path segment. Locales: **`en` (default)** and **`zh-TW`**. Preserve existing routes.
- **Provider:** `NextIntlClientProvider`; server reads via `getTranslations`, client via `useTranslations`.
- **timeZone:** `America/Los_Angeles` (used for date/time formatting — e.g. business hours).
- **Messages:** namespaced per feature — `Company, Home, About, Services, Tools, Calculator, News, Header, NavBar, CTABar, Theme, Language, Incoterms, Contact, Common, OpenIndicator, categories, dictionary`. Keep namespaces parallel across both locales.
- **Switcher:** a native `<select>` (EN / ZH-TW) with `aria-label`. Extend that pattern; keep it keyboard-accessible.

## Rules
- **No hardcoded user-facing strings.** Every label, heading, button, placeholder, and error pulls from messages. When you add UI, add the key to **both** `en` and `zh-TW` — a missing key triggers a next-intl warning and falls back to the key/default.
- **ICU message format** with placeholders and plurals. Never concatenate translated fragments — grammar differs across languages.
- **Formatting:** use next-intl's formatters (or `Intl`) with the configured `timeZone` for dates/times; format numbers and units (the Calculator's cm/inch, kg/lb, CBM/CFT) locale-aware rather than hand-building strings.

## Logistics terms: what (not) to translate
- **Keep codes as-is:** Incoterm codes (EXW, FOB, CIF…), HS codes, UN/LOCODE ports, container types, and abbreviations (FCL/LCL, ETA/ETD).
- **Translate the surrounding text:** the dictionary/Incoterms `name`, `definition`, `category`, and use-case fields — matching the existing `dictionary` and `Incoterms` namespaces, which already localize labels while leaving codes intact.

## Don't
- Hardcode strings, break the `/[locale]/` routes, add a new i18n library, or let `zh-TW` silently fall back to `en` for new content.

## Verify
- Both locales render with no missing-key warnings, the `<select>` switcher keeps you on the same page, dates/numbers format correctly under `America/Los_Angeles`, and build passes.