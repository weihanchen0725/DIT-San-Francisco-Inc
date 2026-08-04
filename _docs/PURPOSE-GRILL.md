# Purpose grill & roast — DIT San Francisco Inc. site

**Date:** 2026-08-04  
**Scope:** Product *purpose* (why this exists), not SCSS craft or dev-server ops.  
**Method:** Claims grounded in repo files. Labels: **VERIFIED** / **INFERRED** / **UNKNOWN**.  
**Companion docs (non-overlapping):**

| Doc | Job |
| --- | --- |
| [PRODUCT.md](./PRODUCT.md) | Forward definition: ICP, KPI, anti-goals, IA |
| [CLAIM-AUDIT.md](./CLAIM-AUDIT.md) | String-level keep / rewrite / delete table |
| [../DESIGN.md](../DESIGN.md) | Visual system only |

---

## Verdict

As a **company brochure + lead form + a few trade utilities**, this can work.

As a **“logistics platform / management company site that proves DIT moves freight,”** it currently **overclaims and under-delivers**.

The purpose is split three (or four) ways and none fully owns the product.

**Overall purpose grade: C−** — competent shell, undecided mission, credibility leaks.

---

## 1. What the repo says the purpose is

| Claim | Source | Status |
| --- | --- | --- |
| Bay Area freight / warehousing / tracking / supply chain company site | [`src/assets/international/en/common.json`](../src/assets/international/en/common.json) `Metadata.home` | **VERIFIED** copy |
| SF operation of Dolphin Logistics; founded 2021; Fremont team | same file, `About` | **VERIFIED** copy |
| FMC OTI License No. 033692 | `Credibility`, `Footer` | **VERIFIED** as *stated*; **UNKNOWN** if still accurate externally |
| “Leading logistics management company” | [`src/app/[locale]/layout.tsx`](../src/app/[locale]/layout.tsx) | **VERIFIED** in code — weak as purpose |
| “on time, every time” | `Home.fast_delivery_desc` | **VERIFIED** empty superlative (hero feature grid currently commented out in `Home.tsx`, string still ships in i18n) |
| Real-time advanced tracking | `Tools.tracking_*` | **VERIFIED** claim; tracking is **external** GoFreight login |
| Incoterms advisor / dictionary / CBM calculator | App routes under `tools/` | **VERIFIED** real features |
| Contact → Resend email inquiry | [`src/app/api/contact/route.ts`](../src/app/api/contact/route.ts) | **VERIFIED** conversion path (requires env) |
| Design intent: trust-first B2B logistics | [`DESIGN.md`](../DESIGN.md) | **VERIFIED** design purpose |
| Strapi not wired; static JSON content | [`CLAUDE.md`](../CLAUDE.md) | **VERIFIED** architecture state |
| Human product README / `_resources` inventory | [`README.md`](../README.md), [`_resources/`](../_resources/) | **VERIFIED** empty / create-next-app boilerplate at time of grill |

**INFERRED purpose from behavior:**  
Ship a bilingual marketing site that (a) looks legitimate, (b) captures freight quotes, (c) deep-links to GoFreight tracking, (d) offers free educational tools as SEO / trust bait.

That is a coherent B2B site purpose. The failure mode is dressing like a **product** and a **network proof engine** while the guts remain a **static brochure with three calculators**.

---

## 2. Roast — purpose failures

### A. No single job-to-be-done

A visitor on `/en` is asked to believe all of these at once:

1. **Hire us to move cargo** — quote CTA, services, phone, FMC language  
2. **Use our software suite** — Tools (tracking, dictionary, Incoterms, calculator); leftover i18n for pickup / route optimization  
3. **Trust our global network** — map, gateway lists, partners strip  
4. **Read our newsroom** — News with placeholder cards (“News Article 1”)

Freight buyers do not want a “suite.” They want: *Can you move my boxes from A to B, at what price, with what liability?* Everything else is garnish until that is undeniable.

If the real business purpose is **quote generation for a 2021 Fremont OTI**, then Incoterms theater and design-token perfection are **status work**, not purpose work.

### B. Trust theater with known fakes

Shipped or staged:

- Partners labeled *“Fictional development preview — not actual partners or clients”* (`Showcase`, [`src/lib/showcase.ts`](../src/lib/showcase.ts))  
- News cards: **“News Article 1 / Summary of the first news article.”** ([`News.tsx`](../src/components/News/News.tsx))  
- Empty `auth.json` / `dashboard.json` still in the i18n namespace list ([`dictionaries.ts`](../src/i18n/dictionaries.ts)) — ghost of a product that does not exist  

For a trust-first freight brand, fictional partners + lorem news is not “MVP polish pending.” It is **anti-purpose**. Fake social proof is worse than no social proof.

### C. Copy promises a platform; architecture is a pamphlet

| Promise | Reality |
| --- | --- |
| “Advanced tracking… real-time” | External `https://ditus.gofreight.co/tracking/login` ([`CTABar.data.json`](../src/assets/data/CTABar.data.json)) |
| “Tracking Solutions… through our tracking portal” | Same third-party portal |
| Schedule pickup / route optimization strings | Not first-class tools routes under `tools/` |
| CMS / content ops | Static JSON; Strapi unwired |
| “Leading…” | Unsubstantiated adjective in default metadata |

Renting GoFreight for the only operational verb that matters (**track**) is fine if honest. Marketing “our” advanced portal like a built TMS is not.

### D. Purpose is engineer-shaped, not buyer-shaped

Git history and surface area emphasize design tokens, dark mode, scroll reveal, OG scripts, e2e, CSP, mixin lock-in — more than case studies, lane rates, response SLA, real partners, real news, quote conversion metrics, warehouse photos, team, insurance, or claims process.

**De facto purpose:** *make an impressive Next.js logistics website for DIT.*  
**Stated purpose:** *win Bay Area freight customers.*  
Those only overlap if a polished site is the revenue bottleneck. For a young OTI, the bottleneck is usually **trust + speed-to-quote + proof of execution**.

### E. Identity muddle

| Signal | Value |
| --- | --- |
| Legal / brand | DIT San Francisco Inc. |
| Parent / network | Dolphin Logistics |
| Header location | San Francisco |
| Hero ops base | Fremont, California |
| Canonical site | `ditsanfrancisco.com` ([`seo.ts`](../src/lib/seo.ts)) |

All can be true. Without a one-sentence hierarchy (“DIT SFO is Dolphin’s Bay Area OTI office in Fremont”), the site reads like three LinkedIn pages stitched together. Buyers hate unclear who-is-liable entities.

### F. Purpose docs were a void (until this folder)

- README = create-next-app boilerplate  
- `_resources/` = effectively empty inventory  
- No PRODUCT / ICP / conversion goal in-repo before `_docs/`  

If the team cannot open one file that says *“Success = N qualified freight inquiries / month from importers doing X,”* every feature is cosplay. DESIGN.md before PRODUCT purpose is backwards for a commercial site.

### G. Bilingual is purpose-aligned; half the product is not

`en` + `zh-TW` is strategically correct for Bay Area ↔ Asia freight.

Then News is English placeholder junk, partners can be fake in dev, and tools SEO may outrank the commercial story. Ranking for “Incoterms advisor” while the money page still carries DHL-parody superlatives is a purpose failure.

---

## 3. What is defensibly on-purpose

These match a real freight-forwarder site job:

- **Quote path exists** — contact form + rate limit + Resend (commercial spine)  
- **Real office facts** — [`ContactData.json`](../src/components/Contact/ContactData.json) (address, phone, hours, LinkedIn)  
- **Services framed as coordination + what to send for a quote** — better than pure fluff  
- **Incoterms engine + dictionary + CBM** — education / SEO / sales enablement  
- **External tracking deep-link** — correct integration pattern if labeled honestly  
- **Credibility block** — founded, Dolphin relationship, FMC number, ImportKey (right *category* of proof)  
- **DESIGN.md brand register** — aesthetic purpose clearer than business purpose  

Not a worthless repo. A **half-honest brochure with overbuilt chrome**.

---

## 4. Interrogation (unanswered = purpose stays confused)

1. **Primary KPI:** (a) qualified quotes, (b) tracking logins, (c) brand for Dolphin, or (d) portfolio / engineering showcase?  
2. **ICP:** Who exactly? Taiwanese electronics importers? SF e-comm 3PL shoppers? Existing Dolphin customers needing a local face?  
3. **Why not one-page + phone + GoFreight?** What does this stack do that Webflow does not for year-1 revenue?  
4. **What must never be fake in prod?** Partners, news, licenses, “leading,” on-time claims — kill or prove.  
5. **Are tools lead-gen or product?** If lead-gen, every tool ends in quote. If product, stop calling this only a company site.  
6. **Who updates content weekly?** If nobody / “Strapi someday,” delete News and stop pretending CMS.  
7. **Parent brand rules:** May DIT claim Dolphin network lanes as “ours,” with what approval?

**UNKNOWN without operators:** actual sales process, Resend live in prod, real partner list, traffic sources, conversion rate, whether FMC 033692 is current.

---

## 5. Purpose scorecard

| Dimension | Score | Note |
| --- | --- | --- |
| Clarity of one primary purpose | 3/10 | Brochure vs tools vs network vs newsroom |
| Honesty of claims vs capabilities | 4/10 | Some careful service copy; still “leading,” “every time,” “our portal,” fake news |
| Conversion spine | 6/10 | Quote form is real; homepage dilutes it |
| Trust assets | 5/10 | Address / FMC / ImportKey good; partners / news bad |
| Strategic fit (Bay Area ↔ Asia) | 7/10 | zh-TW + Incoterms + Fremont story fit |
| Ops product depth | 2/10 | Tracking outsourced; no booking / pickup |
| Documented purpose (pre-`_docs`) | 1/10 | No product README; design doc > purpose doc |
| Engineering craft relative to purpose | 8/10 | Overbuilt for the business job |

---

## 6. Minimum viable honesty (priority order)

1. One sentence success definition (see [PRODUCT.md](./PRODUCT.md)).  
2. Delete or hide News until real posts exist.  
3. No fictional partners anywhere customers can see — empty > fake.  
4. Rewrite hero / metadata superlatives — kill “on time, every time” and “leading” unless proven.  
5. Label tracking as GoFreight customer portal, not “our advanced real-time system.”  
6. Quote as only primary CTA above the fold; tools secondary.  
7. Ship 2–3 real proof blocks (lanes, response time, license/bond language, team/warehouse) or drop global-network flex.  
8. Replace README boilerplate with who it’s for, how to run, how a lead flows, out of scope.

---

## Bottom line

Not failing at Next.js. Failing at **choosing**.

- **True purpose today (inferred):** build an impressive bilingual logistics website.  
- **Required purpose:** make the next importer trust DIT enough to send cargo details today.

Until those are the same document, every design-system win is rearranging medals on a ship that has not picked a port.

---

## Evidence index (primary files)

- [`src/assets/international/en/common.json`](../src/assets/international/en/common.json)  
- [`src/app/[locale]/layout.tsx`](../src/app/[locale]/layout.tsx)  
- [`src/app/[locale]/page.tsx`](../src/app/[locale]/page.tsx)  
- [`src/components/News/News.tsx`](../src/components/News/News.tsx)  
- [`src/components/Tools/Tools.tsx`](../src/components/Tools/Tools.tsx)  
- [`src/lib/showcase.ts`](../src/lib/showcase.ts)  
- [`src/assets/data/CTABar.data.json`](../src/assets/data/CTABar.data.json)  
- [`src/app/api/contact/route.ts`](../src/app/api/contact/route.ts)  
- [`src/lib/seo.ts`](../src/lib/seo.ts)  
- [`DESIGN.md`](../DESIGN.md)  
- [`CLAUDE.md`](../CLAUDE.md)  
