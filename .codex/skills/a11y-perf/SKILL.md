---
name: a11y-perf
description: >
  Use when building or reviewing UI for accessibility and performance —
  homepage, the /tools/* pages, the contact form, and the map. Covers semantic
  HTML, keyboard/focus, ARIA, contrast, Core Web Vitals, and this project's
  specific gaps.
---

# Accessibility & performance

Good patterns already exist here — keep them: form `<label htmlFor>`/`id` pairing, `autocomplete` on contact fields, `aria-label` on icon buttons, `role="switch"` + `aria-checked` on the theme toggle, `aria-expanded`/`aria-haspopup` on the hours button, and `maximum-scale=5` (zoom stays enabled — don't disable it).

## Fix in this project
- **Add a skip-to-content link** to `#main-content`. The target exists (`<main id="main-content">`) but no skip link precedes the nav.
- **Hero LCP image is lazy-loaded.** The above-the-fold hero images use `loading="lazy"`; set `priority` on the primary hero image and keep lazy only for below-the-fold media. This directly hurts LCP.
- **Decorative SVGs need `aria-hidden="true"`.** The hand-rolled service/tool/contact card icons aren't hidden from the a11y tree (the lucide icons mostly are). Hide purely decorative ones.
- **Contact form validation wiring:** mark required fields (`required` / `aria-required`) — First/Last/Email/Message; wire `aria-invalid` + `aria-describedby` to the error strings (already in the `Contact` messages), and add an `aria-live="polite"` region so `success_message` / `error_message` are announced on submit.
- **Map (Leaflet) is heavy and below the fold:** dynamically import / lazy-load it so its JS doesn't block the homepage; ensure it's keyboard-escapable. The address shown as text nearby is a good text alternative — keep it.

## Accessibility baseline (WCAG 2.1 AA)
- Semantic HTML first (`button` for actions, `a` for navigation); logical heading order (one `h1`, then `h2` sections, `h3` cards — current order is fine, preserve it).
- Visible `:focus-visible` on every interactive element; logical tab order; no focus traps.
- Don't convey shipment/status by color alone — pair with icon + text (ties to ui-ux).
- Honor `prefers-reduced-motion`.

## Performance (Core Web Vitals)
- Images via `next/image` with correct `sizes`; `priority` on the LCP hero (see above); modern formats.
- Fonts already use `next/font` with preload + `swap` — keep that.
- Server Components by default; `"use client"` only when needed; `dynamic()` for heavy/below-fold pieces (the map). Reserve space to avoid CLS.
- Keep marketing/tool pages static/cached where possible.

## Don't
- Ship custom widgets that aren't keyboard-accessible, regress CWV with unnecessary client components, or disable zoom.

## Verify
- Keyboard-only pass (including the new skip link), axe/Lighthouse, contrast in **both** light and dark, confirm the LCP hero is no longer lazy, and that form errors/success are announced.