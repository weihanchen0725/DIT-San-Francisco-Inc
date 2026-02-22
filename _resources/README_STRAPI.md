# Strapi API Setup & Usage Guide (This Project)

This document explains how Strapi is set up in this monorepo and how the Next.js app should call it.

---

## 1) Monorepo Architecture

- `server/` = Strapi CMS (API + Admin)
- `client/` = Next.js frontend
- `resources/` / `_resources/` = docs and project assets

Today, Strapi is scaffolded and has content types configured, but the frontend currently does **not** call Strapi yet.

---

## 2) Where Strapi Is Configured

### Core server config

- `server/config/server.ts`
	- Host from `HOST` (default `0.0.0.0`)
	- Port from `PORT` (default `1337`)
- `server/config/database.ts`
	- Database client from `DATABASE_CLIENT` (default `sqlite`)
	- SQLite DB path defaults to `.tmp/data.db`
	- Also supports `mysql` and `postgres`
- `server/config/middlewares.ts`
	- Includes `strapi::cors`, `strapi::security`, `strapi::body`, etc.
- `server/config/api.ts`
	- REST defaults: `defaultLimit: 25`, `maxLimit: 100`, `withCount: true`
- `server/config/admin.ts`
	- Admin auth + API token salts/secrets are env-driven

### Environment variables

From `server/.env.example`:

```dotenv
HOST=0.0.0.0
PORT=1337
APP_KEYS="toBeModified1,toBeModified2"
API_TOKEN_SALT=tobemodified
ADMIN_JWT_SECRET=tobemodified
TRANSFER_TOKEN_SALT=tobemodified
JWT_SECRET=tobemodified
ENCRYPTION_KEY=tobemodified
```

Create `server/.env` from this example for local dev.

---

## 3) Content Types Already Defined

## `global` (single type)

- Schema: `server/src/api/global/content-types/global/schema.json`
- Kind: `singleType`
- Draft/publish: enabled
- Attributes:
	- `Header` (component: `layout.header`)

## `home-page` (single type)

- Schema: `server/src/api/home-page/content-types/home-page/schema.json`
- Kind: `singleType`
- Draft/publish: enabled
- I18n: enabled
- Attributes:
	- `title` (localized string)
	- `description` (localized text)

### Related components

- `server/src/components/layout/header.json`
	- `Logo` (component: `elements.logo`)
	- `Name` (string)
	- `Navigations` (repeatable component: `elements.link`)
	- `CTA` (repeatable component: `elements.link`)
- `server/src/components/elements/logo.json`
	- `image` (media)
	- `logoText` (string)
- `server/src/components/elements/link.json`
	- `Key`, `Value`, `isActive`, `isEnabled`, `isExternal`

---

## 4) API Layer Wiring (Routes/Controllers/Services)

Each content type has Strapi core wiring:

- `server/src/api/*/routes/*.ts`
	- Uses `factories.createCoreRouter(...)`
- `server/src/api/*/controllers/*.ts`
	- Uses `factories.createCoreController(...)`
- `server/src/api/*/services/*.ts`
	- Uses `factories.createCoreService(...)`

This means your current API behavior is standard Strapi REST behavior (no custom controller logic yet).

---

## 5) Run Strapi Locally

From repo root:

```bash
cd server
npm install
cp .env.example .env
npm run develop
```

Expected URLs:

- Admin panel: `http://localhost:1337/admin`
- API base: `http://localhost:1337/api`

---

## 6) Available Endpoints (Current Content Types)

Because both are single types, typical REST endpoints are:

- `GET /api/global`
- `GET /api/home-page`

Useful query params:

- `populate=*` (expand component/media relations)
- `locale=<code>` for localized content (`home-page` supports i18n)

Examples:

```bash
curl "http://localhost:1337/api/global?populate=*"
curl "http://localhost:1337/api/home-page?locale=en&populate=*"
```

If requests return `403`, grant read permissions in Strapi admin:

1. Admin panel → Settings → Users & Permissions Plugin → Roles
2. Open `Public` role
3. Enable `find`/`findOne` for the target content types

---

## 7) How the Client Currently Uses Data

Current state in `client/`:

- No Strapi fetch/axios calls detected in `client/src`
- UI content appears to be static/local (e.g., JSON files and i18n message files)

So right now, frontend content is not yet sourced from the Strapi API.

---

## 8) Recommended Integration Pattern for `client/`

Use server-side fetch in Next.js App Router (best for SEO and security).

### Step A — Add env variable in `client/.env.local`

```dotenv
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### Step B — Create a Strapi helper (example)

Create `client/src/lib/strapi.ts`:

```ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function getGlobal(locale = 'en') {
	const url = `${STRAPI_URL}/api/global?populate=*&locale=${locale}`;
	const res = await fetch(url, { next: { revalidate: 60 } });
	if (!res.ok) throw new Error(`Failed to fetch global: ${res.status}`);
	return res.json();
}

export async function getHomePage(locale = 'en') {
	const url = `${STRAPI_URL}/api/home-page?populate=*&locale=${locale}`;
	const res = await fetch(url, { next: { revalidate: 60 } });
	if (!res.ok) throw new Error(`Failed to fetch home page: ${res.status}`);
	return res.json();
}
```

### Step C — Call it in route/page components

Example in `client/src/app/[locale]/page.tsx`:

```ts
import { getHomePage } from '@/lib/strapi';

export default async function Page({ params }: { params: { locale: string } }) {
	const data = await getHomePage(params.locale);
	return <main>{/* render from data */}</main>;
}
```

### Step D — Map Strapi response safely

- Treat API response as nullable during draft/missing content phases
- Add fallback UI for missing fields
- Keep data-mapping in one place (helper/transformer function)

---

## 9) Production Notes

- Host Strapi (`server`) separately from Vercel frontend (`client`) or on Strapi Cloud.
- Set `NEXT_PUBLIC_STRAPI_URL` to production API URL in frontend env.
- Configure CORS in Strapi if frontend and CMS are on different domains.
- Keep admin/auth secrets only in server environment variables.

---

## 10) Quick Troubleshooting

- `403 Forbidden`: permissions not enabled for role
- Empty data: entry not published (draft/publish enabled)
- Locale mismatch: query with `?locale=en` / `?locale=zh-TW`
- Media/components missing: forgot `populate=*`
- CORS errors in browser: verify Strapi CORS + frontend origin

---

## Summary

This repo already has Strapi configured with two single types (`global`, `home-page`) and reusable components. The API is live once Strapi is running, but frontend consumption has not been implemented yet. The integration steps above are the cleanest path to connect `client` to your existing `server` CMS.
