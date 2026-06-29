---
name: ui-ux
description: >
  Use when creating or restyling UI — components, layouts, pages — or working
  on light/dark theming, responsiveness, or PWA/installability. Keeps a
  professional, formal, modern look consistent across this B2B logistics brand.
  Covers typography, color, spacing, hierarchy, component states, motion,
  light/dark mode, responsive/breakpoint design, and PWA. Trigger on visual
  design, theming, layout/responsiveness, or PWA work.
---

# Professional / formal / modern UI/UX

**Aesthetic target:** enterprise logistics SaaS — credible, restrained, modern. Confidence comes from clarity, hierarchy, and whitespace, not decoration. Not playful or startup-y.

## This project's setup (follow it)
- **Styling is a hybrid:** Tailwind utility classes **and** SCSS Modules (`*.module.scss`) coexist. Match whichever a component already uses; don't convert one to the other.
- **Brand tokens** (use these, don't invent hexes): `brand-navy`, `brand-navy-light`, `brand-yellow`, `brand-yellow-hover`, `brand-gray`. Yellow is the single accent (CTAs/emphasis).
- **Dark surfaces** already in use: `dark:bg-[#111127]` (cards), `dark:bg-[#0a0a1a]` (inputs/base). Reuse these exact values rather than new ones.
- Fonts via `next/font` (Roboto + Geist); icons via `lucide-react` / `@iconify/react`. Reuse, don't add icon sets.
- If a genuinely new token is needed, flag it and add it to the theme config — don't scatter inline hex values.

## Typography
- 1–2 type families; a clear type scale (don't pick arbitrary px values).
- Generous line-height for body, tighter for headings; strong size/weight hierarchy.
- Limit to ~2–3 weights. Avoid ALL-CAPS for long text.

## Color
- Restrained palette: neutral base + one brand accent (yellow) + semantic colors (success/warning/error) for shipment statuses.
- Use the accent sparingly — CTAs and key emphasis only.
- Never rely on color alone to convey status (pair with icon/label — see a11y-perf).

## Light / dark mode (theming)
Dark mode is **class-based** here: a pre-paint inline script reads `localStorage["dit-theme"]` (`light` | `dark` | `system`, default `light`) and toggles `class="light"`/`"dark"` on `<html>`, with `suppressHydrationWarning` and `color-scheme` set. Keep that mechanism intact.

- **Every element must work in both modes.** For any new color, surface, border, or text, supply both the light value and a `dark:` variant — never ship a one-mode-only element. In Tailwind use `dark:` (e.g. `text-brand-navy dark:text-white`, `bg-white dark:bg-[#111127]`, `border-gray-100 dark:border-brand-navy-light`). In SCSS Modules, theme via the `html.dark`/`.dark` ancestor (or CSS custom properties) so both systems stay in sync.
- **Reuse the established pairs** rather than inventing new ones: text `text-brand-navy` ↔ `dark:text-white`; body `text-brand-gray` ↔ `dark:text-gray-300/400`; card `bg-white` ↔ `dark:bg-[#111127]`; input/base `dark:bg-[#0a0a1a]`; border `dark:border-brand-navy-light`.
- **No flash, no hydration mismatch:** never read `window`/`localStorage`/`matchMedia` during render. Keep the pre-paint script and `suppressHydrationWarning` on `<html>`. Don't compute theme in a Client Component effect that paints the wrong mode first.
- **Don't fight the class strategy:** prefer the `.dark` class over CSS `@media (prefers-color-scheme)`, which can desync from the user's stored choice. System preference is handled via the `"system"` setting, not ad-hoc media queries.
- **Keep the toggle accessible:** the `ThemeSwitcher` uses `role="switch"` + `aria-checked` + an `aria-label` that names the target mode. Preserve those if you touch it.
- **Update both `theme-color` metas** (currently light `#ffcc00`, dark `#0a0a1a`) if the brand colors change.
- **Check contrast in both modes** — especially yellow on navy, and gray body text on dark surfaces (don't let it drop below WCAG AA).

## Spacing & layout
- Consistent spacing scale (e.g. 4/8px steps); generous whitespace; aligned grids.
- Cap content width for readability; reserve dense tables for genuinely data-heavy views (tracking dashboards).

## Responsive design
- **Mobile-first:** base styles target small screens; layer up at breakpoints.
- Use the project's existing breakpoints/tokens — don't invent arbitrary pixel widths or fixed-width containers.
- Prefer fluid layouts (flex/grid, `min()`/`max()`/`clamp()` for type and spacing) and container queries where the project supports them.
- Touch targets ≥ 44px; never make an action hover-only (hover doesn't exist on touch).
- Responsive images via `next/image` with correct `sizes` (overlaps a11y-perf).
- Data-heavy views (tracking tables/dashboards): switch to horizontal scroll or stacked cards on small screens — never let tables overflow or shrink text below legibility.
- Don't hide content that's essential on mobile; reflow it instead.
- Check the full range: small phones, tablet, desktop, and large screens (respect the max content width), plus landscape and 200% zoom.

## Components & states
- Consistent radius and elevation; prefer subtle borders/shadows over heavy ones.
- Every interactive element has hover / focus-visible / active / disabled / loading states.
- Visible focus rings (ties to accessibility).

## Motion
- Subtle and purposeful; ~150–250ms; respect `prefers-reduced-motion`.

## Progressive Web App (PWA)
Note: live tracking here is an **external** GoFreight portal (`ditus.gofreight.co`), not part of this app — so PWA value is mainly installability + offline access to the on-site **tools** (calculator, dictionary, Incoterms guide) and marketing content, not shipment data. A `site.webmanifest` already exists; there's no service worker yet. If this section grows, split it into a dedicated `pwa` skill.

- **Detect/dependency first:** check for an existing setup (`next-pwa`, Serwist, custom service worker). Don't add a PWA library without approval (see CLAUDE.md dependency policy); present the tradeoff and recommend Serwist for the App Router if asked to add one.
- **Manifest:** keep/extend the existing `site.webmanifest` — name, short_name, theme/background colors matching the brand tokens (and the `theme-color` metas), `display: standalone`, start_url, and a full icon set (incl. maskable 512×512).
- **Service worker (if added):** precache the app shell; choose caching per route type — stale-while-revalidate for marketing/static pages, cache-first for fonts/icons, network-first for any dynamic data. Don't cache cross-origin GoFreight tracking.
- **Offline:** provide a branded offline fallback; the self-contained tools (calculator/dictionary/Incoterms) are good offline candidates.
- **Install:** support installability but don't nag — a custom, dismissible prompt only.
- **Don't:** register a service worker that breaks Next.js routing/revalidation, cache the external tracking portal, or cache sensitive responses insecurely.

## Don't
- Redesign when a functional fix was requested.
- Change global tokens for a one-off need.
- Introduce a new UI/styling library.
- Ship the generic default look (uniform gradients, centered-everything, inconsistent spacing).

## Verify
- Visual consistency with existing pages, interaction states present, and contrast.
- **Both themes:** toggle light and dark and check every changed element — no unstyled/one-mode-only surfaces, no flash on load, contrast holds in both.
- Responsive: check small/tablet/desktop/large breakpoints plus landscape and 200% zoom; no overflow or layout shift.
- PWA (if touched): manifest valid and installable, service worker registers without breaking routing, offline fallback works.