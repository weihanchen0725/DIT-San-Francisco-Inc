# PRODUCT.md — DIT San Francisco Inc. website

**Status:** Draft v0.1 (2026-08-04) — product definition, not a roast.  
**Owner:** TBD (engineering + business)  
**Related:** [PURPOSE-GRILL.md](./PURPOSE-GRILL.md) (diagnosis) · [CLAIM-AUDIT.md](./CLAIM-AUDIT.md) (copy actions) · [../DESIGN.md](../DESIGN.md) (visual system)

This file answers: **who is this for, what must it do, what must it never do.**  
It does not re-litigate the grill. Update this file when strategy changes; update CLAIM-AUDIT when copy changes.

---

## 1. One-sentence purpose

> **This site exists to get qualified freight-quote inquiries for DIT San Francisco Inc. (Bay Area OTI office of Dolphin Logistics) from importers and exporters who need ocean/air coordination through the Bay Area and Asia-linked trade lanes — in English and Traditional Chinese.**

Everything else (tools, SEO, brand, tracking link) is either **support** for that sentence or **out of scope**.

---

## 2. Success metric (north star)

| Priority | Metric | Definition | Target (fill in) |
| --- | --- | --- | --- |
| **P0** | Qualified quote inquiries | Contact submissions with enough cargo context to price or triage (origin, destination, mode or commodity, contactable email/phone) | **TBD** / month |
| P1 | Quote → conversation rate | Inquiries that get a human reply within business SLA | **TBD** % |
| P2 | Tool → quote assist | Incoterms / calculator / dictionary sessions that click through to contact | **TBD** % |
| P3 | Tracking portal handoff | Clicks to GoFreight tracking (existing customers) | Informational only |

**Not success metrics:** Lighthouse vanity alone, dark-mode completeness, number of SCSS mixins, “feels like a SaaS.”

**DATA GAP:** Set numeric targets with sales/ops. Until set, ship honesty and conversion clarity over new features.

---

## 3. Identity (who we are on this site)

| Field | Canonical wording |
| --- | --- |
| Legal name | DIT San Francisco Inc. |
| Relationship | San Francisco / Bay Area operation of **Dolphin Logistics** |
| Ops base | Fremont, California (office on site) |
| Market face | Bay Area international freight coordination |
| License (as stated on site) | FMC OTI License No. 033692 — **re-verify before every major launch** |
| Tracking system | **Third-party** GoFreight customer portal (`ditus.gofreight.co`) — not a DIT-built TMS |
| Content system today | Static JSON / i18n — not a live CMS |

**Hierarchy line (use in footer / about):**  
“DIT San Francisco Inc. is the Bay Area OTI office of Dolphin Logistics, operating from Fremont, CA.”

Do not imply DIT is a separate global carrier brand competing with Dolphin, or that San Francisco HQ and Fremont ops are unexplained contradictions.

---

## 4. ICP (ideal customer profile)

### Primary (build for this first)

- **Role:** Import/export ops, procurement, or small-business owner who ships commercial cargo (not consumer parcel).  
- **Geo:** Bay Area–touching lanes and/or Greater China / Asia origins-destinations; comfortable in **en** or **zh-TW**.  
- **Need:** Ocean and/or air freight coordination, documentation handoffs, optional short-term warehousing around the move.  
- **Trigger:** New supplier, first US entry, recurring Asia↔US volume, frustration with opaque forwarders.  
- **Success for them:** Clear next step (quote request), local reachable office, credible license/identity, no fake logos.

### Secondary

- Existing DIT/Dolphin customers who only need **track shipment** (deep-link out; do not rebuild portal).  
- Trade students / ops staff using dictionary & Incoterms (SEO + goodwill; always path back to quote).

### Explicit non-customers (do not optimize homepage for)

- Consumer “ship my Amazon return” users.  
- Enterprise RFP teams needing full TMS/API (out of scope for this site).  
- People hunting free route-optimization SaaS.

---

## 5. Jobs to be done (site)

| Job | Priority | Surface | Done when |
| --- | --- | --- | --- |
| Request a freight quote | **P0** | Hero CTA → Contact | Form submits; ops receives email; user sees honest receipt copy |
| Trust who we are | **P0** | About, credibility, footer, contact facts | Real address, hours, license, parent relationship — no fake partners/news |
| Understand services | P1 | Services | Knows freight / warehouse / coordination / tracking *as coordination*, and what to send for a quote |
| Track existing shipment | P1 | Header/CTA “Track” | Lands on GoFreight login; labeled as customer portal |
| Learn trade terms | P2 | Dictionary, Incoterms, Calculator | Completes task; optional CTA to quote |
| Read company news | P3 | News | **Only if real posts exist**; otherwise section absent |

---

## 6. Primary conversion path

```text
Land (en | zh-TW)
  → understand: local Bay Area OTI + Dolphin network (one sentence)
  → primary CTA: Request a Freight Quote
  → Contact form (cargo fields + consent)
  → POST /api/contact (rate limit + validation + Resend)
  → ops inbox during business hours
  → human follow-up (off-site process)
```

**Secondary paths:**

- Track → external GoFreight (no account creation on this site).  
- Tools → education → “Get a quote” / contact.

**Required env for conversion (ops):** `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, optional `CONTACT_TO_EMAIL`. Without these, form correctly fails closed (503) — treat as launch blocker.

---

## 7. Information architecture (purpose-aligned)

### Keep / emphasize

| Area | Role |
| --- | --- |
| Home hero | One promise + one CTA (quote) |
| About + credibility | Identity, license, founded, parent |
| Services | Four coordination offers + “for a quote, share…” |
| Contact | Form + phone/email/address/hours |
| Tools hub | Dictionary, Incoterms, Calculator only as listed |
| Global service | Network **only** with honest “availability varies / confirm with quote” |

### Demote or remove until real

| Area | Rule |
| --- | --- |
| News | Hide route/section until ≥1 real article per locale (or en with intentional zh plan) |
| Partner logos / marquee | Production: real approved partners only, or omit section |
| Auth / dashboard i18n shells | Remove from product story until a real product exists |
| Schedule pickup / route optimization copy | Do not surface as tools unless built |

### Homepage section order (recommended)

1. Hero (quote)  
2. About + credibility  
3. Services  
4. Tools (compact)  
5. Global service (optional, honest)  
6. Contact  
7. *Partners / News only if real*

Industries may stay if copy stays non-guaranteeing (current disclaimer is good).

---

## 8. Tools policy

| Tool | Product role | Must include |
| --- | --- | --- |
| CBM/CFT Calculator | Utility + SEO | Link/CTA to quote with dimensions context |
| Logistics Dictionary | Education + SEO | No fake “AI platform” framing |
| Incoterms advisor + reference | Education + sales assist | Disclaimer: guidance not legal advice; CTA to quote |
| Tracking | **Handoff** | “Customer tracking portal (GoFreight)” — never “our advanced real-time TMS” unless true |

Tools are **lead-gen and trust**, not the product company. Do not expand tool surface area until P0 quote path and honesty bar are green.

---

## 9. Voice & claim rules (product)

- Prefer **coordination / support / through Dolphin network** over **we operate a worldwide carrier**.  
- Prefer **request a quote** over **guaranteed transit**.  
- Prefer **customer portal** over **our advanced tracking system**.  
- Prefer **Fremont office reviews during business hours** over instant enterprise SLA fantasy.  
- Superlatives (“leading”, “every time”, “anywhere”) require **evidence or deletion**.  
- Full string list: [CLAIM-AUDIT.md](./CLAIM-AUDIT.md).

---

## 10. Locales

| Locale | Role |
| --- | --- |
| `en` | Default commercial |
| `zh-TW` | First-class parity for ICP — not an afterthought |

Parity means: same honest claims, same CTAs, no English-only placeholder news in zh-TW production.

---

## 11. Anti-goals (explicit non-goals)

1. Build a full TMS, WMS, or customer dashboard on this repo.  
2. Fake social proof (partners, logos, testimonials, news).  
3. Compete with Flexport/project44 on product narrative.  
4. CMS/Strapi integration before there is a content owner and real content calendar.  
5. Design-system perfection as a substitute for conversion and honesty.  
6. Consumer parcel positioning.  
7. Claiming real-time tracking features that only exist inside GoFreight.

---

## 12. Launch / “purpose green” checklist

- [ ] PRODUCT one-sentence purpose agreed by business owner  
- [ ] P0 inquiry target number set  
- [ ] Resend env live in production; test inquiry received  
- [ ] No placeholder News in production UI  
- [ ] No fictional partners in production UI  
- [ ] Tracking labeled as external customer portal  
- [ ] “Leading” / “on time, every time” / “advanced real-time” resolved per CLAIM-AUDIT  
- [ ] FMC license number re-verified  
- [ ] zh-TW critical paths (home, services, contact, tools entry) reviewed by a human reader  
- [ ] README describes product purpose + lead flow (not only create-next-app)

---

## 13. Open decisions (fill with business)

| # | Decision | Options | Owner | Due |
| --- | --- | --- | --- | --- |
| 1 | Primary KPI number | inquiries/mo | | |
| 2 | ICP vertical focus | electronics / general / other | | |
| 3 | Real partner list | publish / omit | | |
| 4 | News ownership | hire / ops / none | | |
| 5 | Dolphin network claim language | legal-approved blurb | | |
| 6 | SLA for inquiry reply | e.g. 1 business day | | |

---

## 14. Stack context (constraints, not purpose)

- Next.js App Router, `next-intl` (`en`, `zh-TW`), static content JSON  
- Contact API + Resend; rate limiting in-app  
- Tracking: external URL in CTA/header data  
- Design tokens: see DESIGN.md  

Purpose does not require more stack. Purpose requires **fewer lies and a clearer ask**.
