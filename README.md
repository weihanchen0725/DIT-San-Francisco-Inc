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

## Inquiry flow

1. A visitor selects **Request a Freight Quote**.
2. The contact form collects contact information, optional shipment context, consent, and a message.
3. `POST /api/contact` validates and rate-limits the inquiry.
4. Resend delivers the inquiry to the configured operations inbox.
5. The Fremont team follows up outside this application during business hours.

The contact endpoint requires `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. `CONTACT_TO_EMAIL` is optional; without it, the configured public contact email is used. Missing delivery configuration causes the endpoint to fail closed with HTTP 503.

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
- News and partner sections stay absent until approved, real content exists.
- Incoterms content is general guidance, not legal or insurance advice.
- Content is currently maintained in localized JSON; no live CMS is wired into the frontend.

Product intent and claim decisions are documented in [`_docs/PRODUCT.md`](./_docs/PRODUCT.md) and [`_docs/CLAIM-AUDIT.md`](./_docs/CLAIM-AUDIT.md).
