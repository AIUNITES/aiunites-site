# AIUNITES SEO Digest — November 7, 2026

> Data is fresh: `seo-report.json` and `gsc-stats.json` both generated Nov 7 07:00. `seo-fix.log` last ran Sep 27 (no new fixer changes).

## Summary

- Sites with GSC traction (impressions > 0): **17** of 18
- Sites with 0 impressions: **1** (bizstry.com) — needs indexing/links, not copy
- Sites with clicks: **5** (aizines 50, inthisworld 13, voicestry 7, aiyhwh 1, gameatica 1)
- Files edited this run: **0** (no rewrite was clearly better than what is live; script-runner queue untouched)

## Top Opportunities This Week

1. **aizines.com (50 clicks / 188 impr, pos 29.2)** — clear network winner (+10 clicks vs last week) with only 3 pages. Query "aizine" is brand-ish; 1–2 more real content pages is the best-ROI move.
2. **inthisworld.com (pos 5.7, 105 impr, 13 clicks)** — page 1 and improving. Blocker is content depth: 15 of 19 pages thin, room subpages lack schema/GA4. Expanding the thin room/game pages should lift it further.
3. **voicestry.com (pos 17.9, 102 impr, 7 clicks)** — 102 impressions at pos ~18; one push gets it to page 2 top / page 1. Trim 9 LONG_DESC + 5 LONG_TITLE pages and add depth for "vocal trainer online".
4. **erpize.com (44 impr, 0 clicks, pos 54.6)** — top query is a 20-word long-tail ("best education erp suites for mid-size colleges..."). Homepage copy can't match it; a dedicated article with that question as the H1 is the right fix.
5. **cosmostheopera.com (10 impr, pos 14.6, 0 clicks)** — category C, one push from page 1; query "cosmic opera" already in title. Slipped from pos 5.6 last week; still awaiting the "Cosmo Opera" alias decision plus 14 thin pages.

## Changes Made

None. Category A sites (aibyjob, aitsql, cosmostheopera, erpise, erpize, videobate, furnishthings) either already carry titles/descs containing their top query (aitsql "advanced query tool", erpise "continuing ed erp", videobate "fallacy quiz", cosmostheopera "cosmic opera"), or the query is a brand typo / long-tail that copy cannot fix (abhijob in, furnishings, redo a, gametiko, sion git). Not confident a rewrite beats current copy.

**Category B:** no traction homepage has WRONG_CANONICAL or NO_DESC. THIN_CONTENT persists on uptownit.com homepage, gameatica (50/52), inthisworld (15/19), cosmostheopera (14/33), bodspas (4), aibyjob (4).

**Category C (pos 6–15):** furnishthings (7, generic query "furnishings", 3 impr), cosmostheopera (14.6), cloudsion (10, irrelevant query "sion git"). inthisworld is now page 1 (5.7). aiyhwh is pos 3.3 with 1 click — rewrite from Oct 17 is working.

## Flags for Manual Review

1. **cosmostheopera.com** — add "Cosmo Opera" alias in body copy; candidate title: `Cosmo Opera: COSMOS the OPERA — Cosmic Trance Opera`.
2. **seo-fix.ps1 repo resolution** — still not processing `aiunites-site` (101 open issues; `acp.html`/`acp-builder.html` have no title and ~4 words). Use explicit domain→repo map; build out or noindex `acp*.html`.
3. **aiunites.com positioning** — top query "ai optimization tulsa" at pos 90.5 (2 impr); decide local-consulting vs. middleware message. 8 pages thin, ~9 long titles / 15 long descs.
4. **Page ideas** — erpize.com (long-tail ERP-for-mid-size-colleges article), videobate.com (standalone fallacy quiz), aitsql.com ("advanced query tool"), erpise.com ("continuing ed ERP"), more pages for aizines.com.
5. **bizstry.com** — 0 impressions; seek backlinks / internal links from indexed network sites.
6. **Brand-typo queries** — abhijob, redo a, furnishings, gametiko, sion git: nothing to optimize.

## Next Week Focus

Write one query-targeted content page (erpize long-tail article or an aizines content page) and fix `seo-fix.ps1`'s repo mapping so aiunites-site's issues get processed.
