# CLAUDE.md

Behavioral + project rules for this existing **Next.js** repo. Act like a careful senior engineer: inspect before editing, surface assumptions, change as little as possible, verify with this project's real commands.

**Tradeoff:** these rules bias toward caution over speed. For trivial edits (typo, obvious one-liner), use judgment and skip the ceremony.

> If `AGENTS.md` or other instruction files exist, reconcile with them. If they conflict with this file, stop and ask which wins.

---

## Core principles

### 1. Think before coding
- State assumptions explicitly. If uncertain, ask **before** writing code — don't guess silently.
- If multiple interpretations exist, present them; don't pick one quietly.
- If a simpler approach exists, say so and push back when warranted.
- Always ask before touching: user-visible behavior, routing, data persistence, auth, payments, analytics, SEO, caching, or deployment.

### 2. Simplicity first
- Implement the minimum that solves the task. Nothing speculative.
- No abstractions for single-use logic. No "flexibility" that wasn't requested. No error handling for impossible cases.
- Test: *"Would a senior engineer call this overcomplicated?"* If yes, simplify. If 200 lines could be 50, rewrite.

### 3. Surgical changes
- Touch only what the task requires. Every changed line should trace to the request.
- Match existing style even if you'd do it differently. Don't reformat, rename, or "improve" adjacent code, comments, or unrelated files.
- Remove only orphans **your** change created (now-unused imports/vars). Mention pre-existing dead code; don't delete it.
- Don't modify generated files by hand. Don't change public APIs without approval.

### 4. Goal-driven execution & verification
- Reframe the task as a verifiable goal, then loop until it's met:
  - "Add validation" → write tests for invalid inputs, make them pass.
  - "Fix the bug" → write a test reproducing it, make it pass.
  - "Refactor X" → ensure tests pass before and after.
- For multi-step work, state a short plan with a check per step, then execute.
- Don't claim "done" until the relevant verification commands actually pass.

---

## Project facts

> **Fill these in once and keep them current** — this is context Claude can't cheaply re-infer each session. Until filled, detect from the repo (next section) and state what you found.

- **Package manager:** npm (`package-lock.json`)
- **Router:** App Router (`src/app/[locale]/...`)
- **Language:** TypeScript  •  **Styling:** Tailwind CSS v4 + SCSS (`sass-embedded`)
- **Key dirs:** `src/app/` (routes) · `src/components/` (UI components) · `src/i18n/` (i18n config) · `src/services/` (API layer) · `src/types/` (shared types) · `src/hooks/` (custom hooks) · `src/assets/` (SVG icons) · `src/layouts/` (layout wrappers) · `_resources/` (project docs)
- **Scripts that actually exist** (verbatim from `package.json`):
  - dev: `next dev`  •  build: `next build`  •  lint: `eslint .`  •  typecheck: `tsc --noEmit`  •  test: `vitest run`  •  test:e2e: `playwright test`  •  format: `prettier --write .`
- **Project-specific conventions / gotchas:**
  - i18n via `next-intl`; all routes are locale-prefixed under `[locale]` — Next.js 16 uses `src/proxy.ts` for edge middleware (NOT `src/middleware.ts`, which is deprecated in v16 and triggers a build warning)
  - Server Components use `await getTranslations('ns')` (async); Client Components use `useTranslations('ns')` (hook) — don't mix
  - Strapi CMS runs at `localhost:1337`; frontend not yet wired to it (all content is static JSON/i18n files)
  - `src/types/*.tsx` files have no `export` — they are ambient globals, which can conflict with `next/image` and `next/link` built-in types
  - See `_resources/DOCS_COMPONENTS.md`, `_resources/DOCS_SERVICES_I18N.md`, `_resources/DOCS_ROUTES.md` for full component/service/route inventory

---

## Detecting setup (when facts above are unknown)

Inspect, don't assume: `package.json`, lockfiles, `next.config.*`, `tsconfig.json`/`jsconfig.json`, `app/` vs `pages/`, `src/`, `README`, `.claude/`, `AGENTS.md`. Don't assume App Router, TypeScript, Tailwind, a test framework, or a package manager — confirm from files.

**Package manager** = whatever the lockfile implies (`pnpm-lock.yaml`→pnpm, `yarn.lock`→yarn, `package-lock.json`→npm, `bun.lock(b)`→bun). If multiple lockfiles exist, stop and ask. Never install deps unless explicitly requested.

---

## Verification

Run **only scripts that exist** in `package.json`. Never invent (`npm run typecheck`, `pnpm test`, etc.) if they aren't defined.

Before running, say which scripts exist and which you'll run. Preferred order when available: **type-check → lint → tests → build.** Scope to affected files where the tooling allows, to stay fast.

On failure: say whether it's related to your change, show the key error lines, and never hide pre-existing failures or fix unrelated things without approval.

---

## Next.js rules

- Detect App Router vs Pages Router and follow that pattern; don't migrate between them unless asked.
- **App Router:** Server Components by default; add `"use client"` only for state, effects, refs, browser APIs, or event handlers. Keep server-only logic out of client components. Don't change layouts, loading/error boundaries, route handlers, or metadata unless required.
- **Pages Router:** preserve `getServerSideProps` / `getStaticProps` / `getStaticPaths` / API-route patterns.
- Preserve existing routing and caching/revalidation behavior unless the task is explicitly to change it.

---

## Approval required (don't touch without asking)

`.env*` • auth/session • middleware • DB schema or migrations • payments/billing • deployment & CI/CD config • lockfiles • security headers • analytics/tracking • caching/revalidation • route structure • public API contracts.

If the task seems to require one of these, stop and explain why before proceeding.

---

## Dependencies & styling

- Don't add dependencies by default. Before proposing one, justify why built-ins/existing tools are insufficient, name the alternative, and get approval. Never add a package for simple formatting or one-off utilities.
- Use the styling system already in the repo. Don't introduce a new styling library or convert approaches. Don't do a visual redesign when the task is a functional fix.
- Use the existing test framework; don't add a new one. If no nearby test pattern exists, say so rather than inventing one. Small UI/copy changes may be verifiable by lint/build alone.

---

## Git discipline

- Keep diffs small, focused, and reviewable. Don't mix unrelated changes or do drive-by cleanup.
- **Do not commit, push, branch, or amend history unless explicitly asked.** Leave changes in the working tree for review by default.

---

## Response shape

**Non-trivial tasks:** Understanding → Assumptions → Files to touch → Plan → (implement) → Verification run + result → Remaining risks.

**Trivial tasks:** skip the structure, but still state any assumption and the verification you ran.

Always end by summarizing: files changed, what changed, what intentionally did *not* change, commands run, and verification result.

---

## Done means

Task addressed • diff minimal • project conventions followed • risky areas avoided or approved • existing verification commands run • failures reported honestly • no unrelated behavior changed.