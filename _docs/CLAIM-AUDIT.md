# Claim audit — public copy vs reality

**Date:** 2026-08-04  
**Scope:** User-visible and SEO-facing claims. Not architecture roast (see [PURPOSE-GRILL.md](./PURPOSE-GRILL.md)). Not strategy definition (see [PRODUCT.md](./PRODUCT.md)).  
**Locales:** Audit table is **English source** (`en/common.json` and hard-coded TSX). Apply the same disposition to `zh-TW` when editing.

### Disposition legend

| Code | Meaning |
| --- | --- |
| **KEEP** | Accurate enough; leave or minor polish only |
| **REWRITE** | Direction OK; wording overclaims or confuses |
| **DELETE** | Remove from UI/i18n or stop shipping |
| **VERIFY** | Plausible but needs external/business confirmation before launch |
| **HIDE** | OK in code for later; must not render in production |

### Reality tags

| Tag | Meaning |
| --- | --- |
| **TRUE** | Matches implemented behavior or stated company facts in-repo |
| **PARTIAL** | Partly true; missing label or overstated |
| **FALSE** | Contradicted by code or empty content |
| **UNKNOWN** | Needs business/legal/ops check |
| **N/A** | Not currently rendered |

---

## 1. Metadata & layout (SEO / default chrome)

| ID | Claim (summary) | Location | Reality | Disposition | Recommended action |
| --- | --- | --- | --- | --- | --- |
| M01 | Site is DIT San Francisco Inc. | `Metadata.*`, layout title | TRUE | KEEP | — |
| M02 | Bay Area logistics, freight, warehousing, tracking, supply chain solutions | `Metadata.home.description` | PARTIAL | REWRITE | Keep categories; avoid implying full software “solutions” stack. Prefer “freight coordination, warehousing support, shipment tracking access, supply chain coordination.” |
| M03 | “logistics management services” | `Metadata.about.description` | PARTIAL | REWRITE | “Freight and logistics coordination services” |
| M04 | Tools: tracking, freight terms, Incoterms, volume calculations | `Metadata.tools.description` | PARTIAL | REWRITE | Tracking is external portal; say “shipment tracking portal link, Incoterms guidance, dictionary, volume calculator.” |
| M05 | “Read updates and logistics news from DIT…” | `Metadata.news.description` | FALSE | DELETE or REWRITE | No real news content. Remove news metadata route from SEO until content exists, or “News coming soon” only if route hidden. |
| M06 | Contact for freight, warehousing, tracking, supply chain support | `Metadata.contact.description` | TRUE | KEEP | — |
| M07 | Dictionary / calculator / Incoterms metadata titles & descriptions | `Metadata.dictionary\|calculator\|incoterms*` | TRUE | KEEP | Calculator correctly says CBM/CFT not “cost.” |
| M08 | “leading logistics management company…” | [`layout.tsx`](../src/app/[locale]/layout.tsx) `COMPANY_DESCRIPTION` | UNKNOWN / weak | REWRITE | Drop “leading.” Align with About one-liner + Fremont OTI. |
| M09 | Keywords: logistics, shipping, supply chain, freight… | `layout.tsx` metadata keywords | PARTIAL | KEEP | Low impact; optional trim later. |
| M10 | Canonical host `ditsanfrancisco.com` | [`seo.ts`](../src/lib/seo.ts) `SITE_URL` | VERIFY | VERIFY | Confirm production domain + `NEXT_PUBLIC_SITE_URL`. |
| M11 | OG siteName “DIT San Francisco Inc.” | `seo.ts` | TRUE | KEEP | — |

---

## 2. Home / hero

| ID | Claim (summary) | Location | Reality | Disposition | Recommended action |
| --- | --- | --- | --- | --- | --- |
| H01 | “International freight forwarding from Fremont, California” | `Home.headline` + `headline_location` | TRUE | KEEP | Strongest honest hero. |
| H02 | Local team; shipment planning; Bay Area and global trade lanes | `Home.description` | PARTIAL | KEEP / light REWRITE | “Global trade lanes” OK if tied to Dolphin network + quote confirm. |
| H03 | Primary CTA “Request a Freight Quote” | `Home.contact` → `#contact` | TRUE | KEEP | Primary CTA per PRODUCT. |
| H04 | “We ensure your packages arrive on time, every time.” | `Home.fast_delivery_desc` | FALSE as guarantee | DELETE | String unused while feature grid commented in `Home.tsx`; delete i18n or never re-enable without SLA proof. |
| H05 | “Quick and reliable shipping solutions…” | `Home.secure_handling_desc` | PARTIAL | DELETE or REWRITE | Same: dead UI path; delete or rewrite without guarantee. |
| H06 | “Worldwide logistics network to serve you anywhere.” | `Home.global_reach_desc` | PARTIAL | DELETE or REWRITE | “Anywhere” is false. Prefer network + “availability varies.” |
| H07 | Decorative alts “Cargo Plane”, “Golden Gate”, “Cargo Ship” | `Home.tsx` Image `alt` | PARTIAL | REWRITE | Prefer meaningful alts or empty alt if pure decoration. |

---

## 3. About & credibility

| ID | Claim (summary) | Location | Reality | Disposition | Recommended action |
| --- | --- | --- | --- | --- | --- |
| A01 | Founded 2021; SF operation of Dolphin Logistics; Fremont team; coordinate freight, warehousing, tracking, supply chain | `About.description` | TRUE (as company story) | KEEP | Best identity paragraph on the site. |
| A02 | Section “Verified company information” | `Credibility.title` | PARTIAL | REWRITE | “Company information” unless third-party verification is linked per field. |
| A03 | Founded 2021 | `Credibility.founded_value` | VERIFY | VERIFY | Confirm with registration docs. |
| A04 | “Dolphin Logistics is DIT” | `Credibility.identity_value` | PARTIAL | REWRITE | Clearer: “DIT San Francisco Inc. is the Bay Area operation of Dolphin Logistics.” |
| A05 | FMC OTI License No. 033692 | `Credibility.license_value`, Footer | VERIFY | VERIFY | Re-check FMC listing before launch; keep if valid. |
| A06 | “View attributed ImportKey company data” | `Credibility.trade_*` | VERIFY | VERIFY | Confirm link target still live and attributed correctly in component. |

---

## 4. Partners / showcase

| ID | Claim (summary) | Location | Reality | Disposition | Recommended action |
| --- | --- | --- | --- | --- | --- |
| P01 | “Partner network preview” | `Showcase.partners_title` | PARTIAL | HIDE / REWRITE | Production: real names or omit section. |
| P02 | “Fictional development preview — not actual partners or clients” | `Showcase.development_notice` | TRUE (dev honesty) | HIDE in prod | [`showcase.ts`](../src/lib/showcase.ts) already returns `[]` when not `development`. Ensure UI section does not look empty-broken; prefer not mounting section when empty. |
| P03 | Fictional names (Pacific Bridge Cargo, etc.) | `showcase.ts` | FALSE as partners | HIDE | Never ship to production audience. |

---

## 5. Industries

| ID | Claim (summary) | Location | Reality | Disposition | Recommended action |
| --- | --- | --- | --- | --- | --- |
| I01 | Industries we support + four categories | `Industries.*` | PARTIAL | KEEP | Generic but non-guaranteeing. |
| I02 | “Service availability depends on cargo details…” | `Industries.disclaimer` | TRUE | KEEP | Model disclaimer for other sections. |

---

## 6. Global service / map

| ID | Claim (summary) | Location | Reality | Disposition | Recommended action |
| --- | --- | --- | --- | --- | --- |
| G01 | “Worldwide coordination” | `GlobalService.eyebrow` | PARTIAL | REWRITE | “Network coordination” or “International coordination.” |
| G02 | Coordinate via DIT San Francisco and Dolphin Logistics network | `GlobalService.description` | PARTIAL | KEEP | Good framing if network lists are approved. |
| G03 | Direct consolidation gateways list (TYO, OSA, …) | `GlobalService.direct_routes` | VERIFY | VERIFY | Business must approve codes as marketable. |
| G04 | Global service network city list | `GlobalService.network_cities` | VERIFY | VERIFY | Same. |
| G05 | “Routes and service availability vary… Request a freight quote…” | `GlobalService.note` | TRUE | KEEP | Required companion to any map/list. |

---

## 7. Services

| ID | Claim (summary) | Location | Reality | Disposition | Recommended action |
| --- | --- | --- | --- | --- | --- |
| S01 | Freight coordination for Bay Area + international lanes | `Services.description` | TRUE | KEEP | — |
| S02 | Ocean/air via Dolphin Logistics network | `Services.freight_shipping_desc` | PARTIAL | KEEP | Honest “coordination… through … network.” |
| S03 | Warehousing near Bay Area ports/airports | `Services.warehousing_desc` | VERIFY | VERIFY | Confirm actual warehouse relationships before strong geo claims. |
| S04 | Supply chain = planning across carriers, docs, milestones | `Services.supply_chain_management_desc` | PARTIAL | KEEP / light REWRITE | Avoid sounding like enterprise SCM software. |
| S05 | “Shipment status visibility through **our tracking portal**” | `Services.tracking_solutions_desc` | PARTIAL | REWRITE | “Customer tracking portal (GoFreight) for cargo under DIT coordination.” |
| S06 | Ideal for / for a quote share fields | `Services.*_for`, `*_provide` | TRUE | KEEP | Excellent purpose-aligned copy. |
| S07 | Footer service labels match | `Footer.services_*` | TRUE | KEEP | Align tracking label with S05 rewrite. |

---

## 8. Tools hub & CTAs

| ID | Claim (summary) | Location | Reality | Disposition | Recommended action |
| --- | --- | --- | --- | --- | --- |
| T01 | “suite of logistics tools designed to enhance your shipping experience” | `Tools.description` | PARTIAL | REWRITE | “Free logistics utilities” / “reference tools” — not a suite/product. |
| T02 | “Advanced tracking system… real-time” | `Tools.tracking_title/desc` | PARTIAL / FALSE tone | REWRITE | Title: “Track a shipment.” Desc: “Open the customer tracking portal to check status.” |
| T03 | Tracking card href → GoFreight login | [`Tools.tsx`](../src/components/Tools/Tools.tsx) + [`CTABar.data.json`](../src/assets/data/CTABar.data.json) | TRUE | KEEP behavior | Keep external link; fix copy (T02). |
| T04 | Dictionary / Incoterms / Calculator titles & hrefs | Tools + routes | TRUE | KEEP | — |
| T05 | “comprehensive reference guide…” | `Tools.incoterms_desc`, Incoterms reference strings | PARTIAL | KEEP / light REWRITE | “Reference” is enough; “comprehensive” optional trim. |
| T06 | “Calculate shipment volume in CBM and CFT…” | `Tools.cost_calculator_desc` | TRUE | KEEP | Note: key name `cost_calculator_*` is legacy; UI says Calculator — optional rename later. |
| T07 | “Conveniently schedule pickups… online.” | `Tools.schedule_pickup_desc` | FALSE (no tool) | DELETE | Orphan i18n; remove. |
| T08 | “Route Optimization” / optimize delivery routes | `Tools.route_optimization_*` | FALSE (no tool; icon reused for Incoterms) | DELETE | Orphan i18n; remove. |
| T09 | CTA “Track a Shipment” | `CTABar.tracking`, header data | TRUE | KEEP | Pair with honest portal labeling. |
| T10 | CTA “Request a Freight Quote” | `CTABar.join_us` → `#contact` | TRUE | KEEP | Key name `join_us` is misleading; optional rename to `quote`. |

---

## 9. Incoterms marketing

| ID | Claim (summary) | Location | Reality | Disposition | Recommended action |
| --- | --- | --- | --- | --- | --- |
| N01 | “Determine the right Incoterm… in seconds” | `Incoterms.hero_title` | PARTIAL | REWRITE | “in seconds” is salesy; advisor is multi-step. “Find a suitable Incoterm for your scenario.” |
| N02 | “smart guide advisor” / “personalized recommendation” | `Incoterms.hero_description` | PARTIAL | REWRITE | Rule-based engine, not ML “smart.” “Guided advisor.” |
| N03 | “Global compliance standard” / “Updated for ICC 2020 rules” | hero buttons | VERIFY | VERIFY | Confirm legal comfort claiming ICC 2020 alignment; add “not legal advice.” |
| N04 | Advisor result “Your Best-Fit Incoterm” / “Optimal Selection” / “Confidence Match” | `Incoterms.advisor_r_*` | PARTIAL | REWRITE | Soften: “Suggested Incoterm,” “Match score (heuristic),” disclaimer. |
| N05 | “Get a Priority Quote” | `advisor_r_quote_btn` | PARTIAL | REWRITE | “Request a freight quote” — “Priority” implies SLA unless true. |
| N06 | Incoterm definitions / risk lines (EXW, FOB, …) | `Incoterms.exw_*` etc. | VERIFY | VERIFY | Trade content accuracy review by ops/legal; not engineering. |
| N07 | Download PDF / Print Summary buttons | `btn_download_pdf`, `btn_print_summary` | VERIFY | VERIFY | Confirm buttons work; if not, DELETE labels. |

---

## 10. News

| ID | Claim (summary) | Location | Reality | Disposition | Recommended action |
| --- | --- | --- | --- | --- | --- |
| W01 | “Latest News” / stay updated with DIT news | `News.title/description` | FALSE | HIDE / DELETE | No CMS posts. |
| W02 | “News Article 1/2/3” + “Summary of the … article.” | [`News.tsx`](../src/components/News/News.tsx) hard-coded | FALSE | DELETE | Remove placeholders; do not ship. |
| W03 | News routes / nav “News” | Nav + app routes | PARTIAL | HIDE | Hide nav + homepage section until content exists. |

---

## 11. Contact & conversion

| ID | Claim (summary) | Location | Reality | Disposition | Recommended action |
| --- | --- | --- | --- | --- | --- |
| C01 | Quote or question; Fremont office reviews during business hours | `Contact.description` | TRUE | KEEP | Gold-standard honest CTA copy. |
| C02 | Success: receipt ≠ acceptance or engagement | `Contact.success_message` | TRUE | KEEP | Keep this legal-safe tone. |
| C03 | Consent required | `Contact.consent_*` | TRUE | KEEP | — |
| C04 | Address 46750 Fremont Blvd #200, Fremont CA 94538 | [`ContactData.json`](../src/components/Contact/ContactData.json) | VERIFY | VERIFY | Confirm still correct. |
| C05 | Phone +1 (510)-771-9968 | ContactData | VERIFY | VERIFY | — |
| C06 | Email contact@ditsanfrancisco.com | ContactData | VERIFY | VERIFY | — |
| C07 | Hours Mon–Fri 7:00 AM – 5:30 PM | ContactData | VERIFY | VERIFY | Timezone implicit PT — state if needed. |
| C08 | LinkedIn company URL | ContactData | VERIFY | VERIFY | — |
| C09 | API emails via Resend when env set | [`contact/route.ts`](../src/app/api/contact/route.ts) | TRUE | KEEP | Launch blocker if env missing. |
| C10 | Placeholders “John”, “Doe”, etc. | Contact form placeholders | N/A | KEEP | UX only. |

---

## 12. Header / nav / footer identity

| ID | Claim (summary) | Location | Reality | Disposition | Recommended action |
| --- | --- | --- | --- | --- | --- |
| F01 | Header location “San Francisco” | `Header.location` | PARTIAL | REWRITE | “Bay Area” or “Fremont, CA” to match hero/ops, or “San Francisco Bay Area.” |
| F02 | Footer: SF operation of Dolphin + FMC line | `Footer.company_line_*` | TRUE / VERIFY license | KEEP + VERIFY | Align with A04/A05. |
| F03 | Nav includes News | `NavBar.news` | PARTIAL | HIDE | Until W01–W03 fixed. |
| F04 | Empty `auth.json` / `dashboard.json` namespaces | i18n loader | N/A | DELETE | Remove from product surface; cleanup namespaces when convenient. |

---

## 13. Priority fix queue (execution order)

Do these before new features:

1. **W02 / W01 / W03** — Kill placeholder news in production UI.  
2. **T02 / S05 / T03** — Honest tracking labeling (behavior stays external).  
3. **M08 / H04–H06** — Kill “leading” and guarantee superlatives.  
4. **P01–P03** — No empty/fake partner theater for customers.  
5. **T07 / T08** — Delete orphan pickup/route-optimization strings.  
6. **N01–N05** — Soften Incoterms advisor marketing + disclaimers.  
7. **VERIFY block** — FMC, address, phone, hours, ImportKey, gateway lists, warehouse claim.  
8. **F01** — Resolve SF vs Fremont location chrome.  
9. **zh-TW parity** — Mirror every REWRITE/DELETE in Traditional Chinese.

---

## 14. How to maintain this file

- Any new marketing string → add a row before merge.  
- Disposition changes only with evidence (code or business sign-off).  
- After bulk copy edits, run locale parity check (`en` vs `zh-TW` keys) and smoke the quote + track paths.

---

## 15. Source file index

| File | Role |
| --- | --- |
| [`src/assets/international/en/common.json`](../src/assets/international/en/common.json) | Primary EN copy |
| [`src/assets/international/zh-TW/common.json`](../src/assets/international/zh-TW/common.json) | ZH parity target |
| [`src/app/[locale]/layout.tsx`](../src/app/[locale]/layout.tsx) | Default meta description |
| [`src/components/News/News.tsx`](../src/components/News/News.tsx) | Placeholder articles |
| [`src/components/Tools/Tools.tsx`](../src/components/Tools/Tools.tsx) | Tool cards + tracking href |
| [`src/assets/data/CTABar.data.json`](../src/assets/data/CTABar.data.json) | Track + quote targets |
| [`src/lib/showcase.ts`](../src/lib/showcase.ts) | Fictional partners |
| [`src/components/Contact/ContactData.json`](../src/components/Contact/ContactData.json) | Office facts |
| [`src/app/api/contact/route.ts`](../src/app/api/contact/route.ts) | Inquiry pipeline |
| [`src/lib/seo.ts`](../src/lib/seo.ts) | Canonical URLs / OG |
