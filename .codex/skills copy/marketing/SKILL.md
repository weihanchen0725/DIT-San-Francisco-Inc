---
name: marketing-pages
description: >
  Use when building or editing customer-facing marketing content — the homepage
  sections (hero, about, partners, services, tools, news, clients, contact) and
  the /tools/* pages. Covers this project's section/component patterns, CTAs,
  and conversion structure for a B2B logistics audience.
---

# Marketing pages

**Audience:** B2B shippers, logistics/supply-chain managers, importers/exporters. Tone: professional, credible, benefit-led, concrete. Avoid hype.

## This project's structure (follow it)
- It's a **single-scroll homepage** with anchored sections — `#home #about #partners #services #tools #news #clients #contact` — plus dedicated **`/tools/*`** pages (dictionary, Incoterms, calculator). Add content into these sections/pages; don't spin up new top-level routes without reason.
- **Reuse the existing components.** The `Features` wrapper renders both the Services cards and the Tools cards; new card content should reuse it rather than introduce a new pattern. Use existing brand tokens/variants (see ui-ux), not ad-hoc styles.
- **All copy goes through next-intl messages** (`Home`, `About`, `Services`, `Tools`, `News`, `Contact` namespaces) in **both `en` and `zh-TW`** — never hardcode user-facing strings (see i18n).

## CTAs (keep consistent with what's there)
- Primary action is **"Get in Touch" / "Join Us" → `#contact`**; the contact form is the lead path (there's no on-site quote form). The header also exposes **"Tracking" → the external GoFreight portal**. Keep these consistent; don't introduce competing CTAs.

## Finish the stubs (don't add new sections instead)
- `#partners` ("Partner List"), `#clients` ("Client List"), and `#news` ("News Article 1/2/3" with placeholder summaries) are unfinished. Replace these placeholders with real content rather than building parallel sections.

## Conversion rules
- Lead with the customer outcome; quantify where possible (transit reliability, coverage, real-time tracking); cut jargon walls. Every section earns its place.

## Don't
- Redesign/restyle when the task is a content change; add new colors/components ad hoc; hardcode copy; or use inconsistent CTAs.

## Verify
- Mobile-first responsive check, both light/dark render, links/anchors resolve, the CTA reaches `#contact`, copy exists in both locales, and build passes.