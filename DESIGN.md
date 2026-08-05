# DESIGN.md — DIT San Francisco Inc.

Inferred from the live codebase (impeccable **document**). Source of truth for tokens and shared UI recipes. Prefer tokens/mixins over one-off values.

**Stack:** Next.js App Router · TypeScript · Tailwind CSS v4 (`@theme`) · SCSS modules · `next-intl` (`en`, `zh-TW`) · light/dark via `.dark`

**Brand register:** Trust-first B2B logistics (San Francisco maritime). Navy + brand yellow + warm paper. Not SaaS-purple, not glassmorphism.

**Modes**

| Surface                                   | Mode     | Priority                             |
| ----------------------------------------- | -------- | ------------------------------------ |
| Homepage / marketing sections             | Persuade | Clarity, proof, distinctive hero     |
| Tools (calculator, dictionary, incoterms) | Operate  | Density, form clarity, system chrome |
| News / long copy (future)                 | Read     | Measure, hierarchy                   |

---

## 1. Color tokens

Canonical CSS variables live in [`src/assets/styles/_variables.scss`](src/assets/styles/_variables.scss) (`register_root_variables` / `register_dark_variables`). Tailwind bridges via `register_theme_tokens` (`@theme`).

| Token                    | Light     | Role                                |
| ------------------------ | --------- | ----------------------------------- |
| `--color-primary`        | `#ffcc00` | Brand yellow — CTAs, accents, focus |
| `--color-primary-hover`  | `#e6b800` | CTA hover                           |
| `--color-primary-light`  | `#fff3b3` | Icon washes, soft fills             |
| `--color-primary-dark`   | `#b38f00` | Emphasized yellow text/edges        |
| `--color-text-primary`   | `#000a3c` | Navy body/headings                  |
| `--color-text-secondary` | `#596273` | Supporting copy                     |
| `--color-text-light`     | `#ffffff` | Text on dark/yellow surfaces        |
| `--color-accent-text`    | `#806600` | Inline accent words                 |
| `--color-bg-primary`     | `#ffffff` | Page/panel                          |
| `--color-bg-secondary`   | `#f8f9fa` | Alternate bands                     |
| `--color-bg-warm`        | `#fdfcf7` | Hero/warm sections                  |
| `--color-bg-card`        | `#ffffff` | Card fill                           |
| `--color-border`         | `#e5e7eb` | Strong borders                      |
| `--color-border-light`   | `#f3f4f6` | Card borders                        |

**Tailwind brand aliases** (prefer for utility classes): `--color-brand-yellow`, `--color-brand-navy`, `--color-brand-gray` (+ hover/light variants).

**Dark:** navy-black canvas (`#0a0a1a` / `#111127`), yellow retained, text inverted. Shadows gain a subtle yellow rim on hover (`--shadow-hover`).

**Rules**

- Prefer `--color-*` over legacy `--primary-color` / `$primary-color` aliases (aliases remain for backward-compat).
- One accent family: yellow. Do not introduce a second brand hue without updating this file.
- Body text contrast target WCAG AA (≥4.5:1) on both themes.

---

## 2. Typography

| Token                      | Value                                  | Use                                |
| -------------------------- | -------------------------------------- | ---------------------------------- |
| `--font-primary`           | Roboto (`--font-roboto`) + system sans | All UI                             |
| `--text-xs` … `--text-2xl` | 0.75rem → 1.5rem                       | UI chrome, cards                   |
| `--text-3xl`               | `2.25rem`                              | Section titles (`section-heading`) |
| `--text-4xl`               | `clamp(2rem, 5vw, 4rem)`               | Hero display                       |

**Recipes (mixins in [`_mixin.scss`](src/assets/styles/_mixin.scss))**

| Mixin                 | Role                     |
| --------------------- | ------------------------ |
| `section-heading`     | Page/section H1–H2       |
| `section-description` | Lead under section title |
| `card-title`          | Card H2/H3               |
| `card-description`    | Card body                |

**Rules**

- Section titles go through `SectionHeading` + `section-heading` styles — do not invent a parallel scale.
- Hero may use `--text-4xl` / local clamp; keep weight 700 and navy/yellow split.
- No gradient text. Emphasis = weight, size, or primary color span.

---

## 3. Radius

| Token           | Value     | Use                                |
| --------------- | --------- | ---------------------------------- |
| `--radius-xs`   | `0.25rem` | Dense tool controls                |
| `--radius-sm`   | `0.5rem`  | Buttons, compact chips, fact tiles |
| `--radius-md`   | `1rem`    | **Default cards**                  |
| `--radius-lg`   | `1.5rem`  | Large panels only when needed      |
| `--radius-full` | `9999px`  | Pills, icon circles                |

Do not hardcode non-zero `border-radius` values in components — use tokens. Third-party map chrome is exempt because it follows Leaflet's geometry.

---

## 4. Shadow

| Token            | Use                                           |
| ---------------- | --------------------------------------------- |
| `--shadow-sm`    | Resting low elevation (rare)                  |
| `--shadow-md`    | Compact interactive tiles (e.g. About facts)  |
| `--shadow-lg`    | Large resting elevation                       |
| `--shadow-hover` | **Default card hover** (light + dark recipes) |

Interactive marketing cards use `--shadow-hover` via `card-interactive`. Do not invent per-component `box-shadow` hover stacks.

---

## 5. Spacing & breakpoints

**Section padding:** `page-section` → `clamp(2rem, 5vw, 5rem)` block, `clamp(1rem, 5vw, 2rem)` inline.

**Breakpoints** (`$breakpoints` / `--screen-*`)

| Key | Width |
| --- | ----- |
| xs  | 30rem |
| sm  | 40rem |
| md  | 48rem |
| lg  | 64rem |
| xl  | 80rem |

Use `@include respond(md)` or matching `min-width` media with the same rem values. Prefer the shared map over magic px when adding layout.

---

## 6. Component recipes (required)

Shared SCSS: [`src/assets/styles/_mixin.scss`](src/assets/styles/_mixin.scss)

### Section shell

```scss
.section {
  @include page-section;
}

.sectionTitle {
  @include section-heading;
}

.sectionDescription {
  @include section-description;
}
```

### Marketing / tool card

```scss
.card {
  @include card-surface; // static chrome
  @include card-interactive; // lift + border + shadow-hover
  // child selector is the composed local class name (no leading &)
  @include icon-interactive-on-parent-hover('.iconWrapper');
}

.iconWrapper {
  @include icon-circle;
  // local margin only
}

.cardTitle {
  @include card-title;
}

.cardDescription {
  @include card-description;
}
```

| Mixin                                                                               | Includes                                              |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `card-surface($padding, $radius)`                                                   | padding, radius, bg-card, border-light — **no hover** |
| `card-interactive($translate-y, $shadow)`                                           | hover/focus lift, primary border, shadow              |
| `icon-circle($size, $bg, $color)`                                                   | circular icon well                                    |
| `icon-interactive` / `icon-interactive-active` / `icon-interactive-on-parent-hover` | shared icon hover                                     |

**Do not** re-declare card hover (`translateY`, yellow border, custom shadow) in feature modules.

### Contact / static info cards

Use `card-surface` + `card-interactive` (same system). Icon wells: `icon-circle` with local size overrides (e.g. `3.5rem`).

### Exceptions (intentional, not marketing cards)

Document before copying these patterns elsewhere:

| Surface                              | Why different                                                                             |
| ------------------------------------ | ----------------------------------------------------------------------------------------- |
| Header / NavBar / CTABar             | App chrome, sticky, brand bar                                                             |
| Home hero CTA                        | Primary button, not a card                                                                |
| Map markers / GlobalService pins     | Geographic UI                                                                             |
| Incoterms advisor / calculator forms | Operate-mode controls, denser radius-sm controls                                          |
| Dictionary category chips            | Multi-hue taxonomy (content color, not brand system)                                      |
| Industries icon tile                 | Filled primary square badge (not `icon-circle`) — OK until a second badge pattern appears |
| Theme / language switchers           | Compact controls                                                                          |

---

## 7. Motion

| Token / value                                       | Use                                                              |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| `$motion-duration` (`0.3s`)                         | Card/icon transitions                                            |
| `$motion-ease-out` (`cubic-bezier(0.4, 0, 0.2, 1)`) | Interactive ease                                                 |
| Scroll reveal                                       | `[data-scroll-reveal]` in `globals.scss` — one entrance language |
| `prefers-reduced-motion`                            | Honored globally for scroll reveal                               |

Rules:

- Card hover = transform + border + shadow only (via mixins).
- No bounce springs. No decorative blur/glass by default.
- Parallax (Home) is a single authored moment — do not clone per section.

---

## 8. Focus & a11y floor

- Global `:focus-visible` outline: `2px solid var(--color-primary)` (`globals.scss`).
- Interactive cards repeat the same outline inside `card-interactive`.
- Touch targets for primary CTAs ≥ 44px where applicable.
- Semantic headings via `SectionHeading` (`h1`–`h3` by `level`).
- No user-facing hardcoded strings in components when i18n keys exist.

---

## 9. Theming

- Class strategy: `.dark` on an ancestor (`next-themes`).
- SCSS modules: `:global(.dark) & { … }` only when a token cannot express the difference.
- Prefer token swaps in `register_dark_variables` over per-component dark forks.

---

## 10. File map

| Concern              | Path                                   |
| -------------------- | -------------------------------------- |
| Tokens               | `src/assets/styles/_variables.scss`    |
| Mixins / recipes     | `src/assets/styles/_mixin.scss`        |
| Global base + reveal | `src/app/[locale]/globals.scss`        |
| Reset                | `src/assets/styles/modern_reset.scss`  |
| Section UI           | `src/components/*/*.module.scss`       |
| Heading primitive    | `src/components/ui/SectionHeading.tsx` |

---

## 11. Naming conventions

- CSS Module classes use semantic lower camelCase: `.cardTitle`, `.iconWrapper`, `.isSelected`.
- Prefer concise local names (`.root`, `.title`, `.description`) because CSS Modules already provide component scope. Prefix only when it adds meaning.
- State classes start with `is` or `has`; behavior and layout state should prefer `data-*` attributes.
- Sass variables and mixins use kebab-case. CSS custom properties use kebab-case with a domain prefix (`--color-*`, `--shadow-*`).
- Third-party selectors remain inside `:global(...)` and keep the provider's naming.
- Tailwind utility names remain unchanged.
- Run `npm run lint:styles` after editing module styles. The normal `npm run lint` command includes this check.

---

## 12. Contribution checklist

Before adding UI:

1. Can an existing token express color/type/radius/shadow?
2. Can `page-section` / `card-surface` + `card-interactive` / `icon-circle` express the layout?
3. If not, extend the **token or mixin** first, then consume it — do not fork a one-off hover recipe.
4. Keep SCSS nesting shallow and use semantic lower camelCase CSS Module classes.
5. Light + dark both checked for contrast and border visibility.
6. No new design dependencies without approval.

---

## 13. Out of scope (later tracks)

- Homepage CRO / layout variety (Track B)
- SEO structured data / GEO (Track C)
- Marketing copy / psychology (Track D)
- Visual redesign or alternate aesthetic packs

_Last inferred from repo styles: 2026-08-04 (Track A lock-in)._
