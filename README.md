# DIT San Francisco Inc. website

Bilingual (`en` and `zh-TW`) marketing and freight-quote website for DIT San Francisco Inc., the Bay Area OTI office of Dolphin Logistics operating from Fremont, California.

The primary job of the site is to help commercial importers and exporters understand DIT’s coordination services and submit enough shipment context for the Fremont team to respond. Existing customers can also open the third-party GoFreight tracking portal, while the dictionary, Incoterms guide, and CBM/CFT calculator provide supporting logistics references.

## Local development

Requirements: Node.js, npm, and the dependencies recorded in `package-lock.json`.

```bash
npm install
npm run dev
```

Open `http://localhost:3000/en` or `http://localhost:3000/zh-TW`.

## Optional backend features

Contact email delivery is hidden by default while its backend is unfinished. Enable it only when the backend is ready:

```bash
NEXT_PUBLIC_ENABLE_CONTACT_EMAIL=true
```

News is always on. The server fetches `GET https://dit-san-francisco-inc-backend.onrender.com/api/public/v1/posts?size=<n>` with `Accept: */*` and reads `items` from the returned `PageResponse`. The [API contract](https://dit-san-francisco-inc-backend.onrender.com/v3/api-docs) returns live posts only, newest first. The homepage requests four posts and hides the section when the API returns none or fails. `/{locale}/news` requests up to 100 posts, the API maximum, or shows an empty state. Each card links to `/{locale}/news/{slug}`, which fetches `GET /api/public/v1/posts/{slug}` and returns a 404 page when no live post has that slug. News requests revalidate every five minutes.

When contact email is enabled, the endpoint also requires `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. `CONTACT_TO_EMAIL` is optional; without it, the configured public contact email is used. Missing delivery configuration causes the endpoint to fail closed with HTTP 503.

## Verification

```bash
npm run typecheck
npm run lint
npm run test
npm run test:e2e
npm run build
```

## Product boundaries

- This repository is not a TMS, WMS, booking platform, or customer dashboard.
- Shipment tracking is provided by an external GoFreight customer portal.
- Partner sections stay absent until approved, real content exists. News appears only when the posts API returns posts.
- Incoterms content is general guidance, not legal or insurance advice.
- Marketing copy is maintained in localized JSON; the optional news feed reads from the posts API above.

Product intent and claim decisions are documented in [`_docs/PRODUCT.md`](./_docs/PRODUCT.md) and [`_docs/CLAIM-AUDIT.md`](./_docs/CLAIM-AUDIT.md).
