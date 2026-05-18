# AIUNITES SEO Digest — 2026-05-18

## Summary
- Sites with GSC traction (impressions > 0): 14 of 18
- Sites with 0 impressions: 4 (uptownit, cloudsion, bodspas, aiyhwh)
- Files edited this run: 3 (inthisworld, aitsql, erpise)

## Top Opportunities This Week

1. **InThisWorld — `free virtual world` (18 imp, pos 22.1)**
   Highest-impression site still on page 2-3. Title didn't include "virtual world" — query mismatch. Title and meta description rewritten to lead with the exact phrase. Expected lift: pos 22 → 10-15 if Google re-crawls within the week.

2. **ERPise — `education erp consulting` (19 imp, pos 21.4)**
   Highest impressions in the whole network, mid-page-2. Title and desc rewritten to lead with "Education ERP Consulting" verbatim. Expected lift: pos 21 → 10-15.

3. **AITSQL — `ai tools for sql server` (8 imp, pos 75.2)**
   Position 75 means buried — but the topQuery is an exact-match commercial intent. Title rewritten to lead with "AI Tools for SQL Server." Position is so low that a single rewrite likely won't push to page 1; flag for content depth follow-up.

4. **AIByJob — `aiby careers` (11 imp, pos 8.6)** — *no edit*
   topQuery is a brand-typo. Title already includes "Careers". Position 8.6 is page-1 — leave it; one more solid backlink or content tweak should push to top 5.

5. **Redomy — `my redo` (13 imp, pos 4.7)** — *no edit*
   Already top-5. Title leads with "Redo My Home." No copy work needed; this needs CTR experimentation (rich result, schema) instead.

## Changes Made

### inthisworld.com (`inthisworld-site/index.html`)
- **Old title:** `InThisWorld — Free 3D Browser Games & Virtual Rooms`
- **New title:** `Free Virtual World Online — 3D Browser Games | InThisWorld`
- **Old desc:** `InThisWorld — play 3 free 3D browser games and walk through virtual chat rooms. Space Trader, FPS Arena, World Explorer. No download required.`
- **New desc:** `Free virtual world online — explore 3D rooms, race cars, planes and boats, run an FPS arena. Browser-based, no download, no signup. Built with Three.js.`

### aitsql.com (`aitsql-site/index.html`)
- **Old title:** `AITSQL - AI-Powered SQL Server Tools & Consulting`
- **New title:** `AI Tools for SQL Server — DBA Helpers & Consulting | AITSQL`
- **Old desc:** `SQL Server expertise meets AI. Tools, scripts, consulting, and insights for database professionals working with T-SQL and SQL Server.`
- **New desc:** `AI tools for SQL Server — query helpers, audit scripts, T-SQL automation, and consulting. Built by a working DBA for database pros.`

### erpise.com (`erpise-site/index.html`)
- **Old title:** `ERPise — ERP & SIS Consulting for Higher Education`
- **New title:** `Education ERP Consulting — Higher Ed SIS Experts | ERPise`
- **Old desc:** `ERPise — expert ERP and Student Information System consulting for higher education. SQL reporting, IPEDS compliance, and database optimization.`
- **New desc:** `Education ERP consulting for higher ed — Jenzabar, Banner, SIS, SQL reporting, and IPEDS compliance. Trusted by colleges for data modernization.`

`script-runner.ps1` updated to queue `auto-publish.ps1` on the next cycle.

## Flags for Manual Review

- **AITSQL at pos 75:** Title rewrite alone unlikely to push this to page 1. The site has only 2 indexed pages. Needs content depth — a real "AI tools for SQL Server" guide page with examples, scripts, before/after queries.
- **ERPize / ERPise cross-brand confusion:** erpize.com (the magazine) is ranking at position 7 for the topQuery "erpise" — meaning people searching for the consulting brand are finding the magazine first. Worth a manual link audit; the magazine should link to the consulting site for that exact-match query.
- **VideoBate topQuery is garbled (`l'videowates`):** 12 impressions at pos 5.2 from what looks like typo/autocorrect traffic. Not worth optimizing for. The real query the page should target (logical fallacies game) needs separate GSC investigation.
- **CosmosTheOpera topQuery `cosmo opera` (5 imp, pos 5.6):** Strong intent match, already on page 1. A slight wording tweak to include "cosmic opera" as a secondary keyword could pick up misspelling traffic. Manual judgment call.
- **Zero-impression sites (uptownit, cloudsion, bodspas, aiyhwh):** These need indexing/sitemap work, not copy work. Manually submit URLs via GSC URL Inspection.

## Next Week Focus

Build a real "AI Tools for SQL Server" content page on aitsql.com (currently only 2 indexed pages) — it's the network's lowest-hanging exact-match commercial query, but title-only fixes won't move pos 75 onto page 1 without supporting content.
