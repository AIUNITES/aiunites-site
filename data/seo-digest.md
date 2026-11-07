# AIUNITES SEO Digest — October 31, 2026

> Data is fresh: `seo-report.json` (Oct 31 07:01) and `gsc-stats.json` (Oct 31 07:00). `seo-fix.log` last ran Sep 27.

## Summary

- Sites with GSC traction (impressions > 0): **17** of 18
- Sites with 0 impressions: **1** (bizstry.com) — needs indexing/links, not copy
- Sites with clicks: **4** (aizines 40, inthisworld 13, voicestry 7, gameatica 1)
- Files edited this run: **0** (no copy change was clearly better than what is live; script-runner queue untouched)

## Top Opportunities This Week

1. **aizines.com (40 clicks / 189 impr, CTR 2.5%, pos 28.6)** — network winner with only 3 pages. Query "aizine" is brand-ish; 1–2 more real content pages is the best-ROI move.
2. **inthisworld.com (pos 7.5, 86 impr, 13 clicks, CTR 57.7%)** — page 1, strongest CTR. Blocker is content depth: 15 of 19 pages thin; room subpages lack schema/GA4 (fixer log Sep 27 only patched titles).
3. **aiyhwh.com (pos 5.2, 10 impr, 0 clicks) and cosmostheopera.com (pos 5.6, 7 impr, 0 clicks)** — both on page 1 with zero clicks. aiyhwh copy was rewritten Oct 17 for "yahweh ai" — let it settle. cosmostheopera still needs the human call from last week (use "Cosmo Opera" alias).
4. **videobate.com (13 impr, pos 51.4)** — title/desc rewritten Oct 24 for "fallacy quiz"; wait for recrawl. A standalone quiz page is the next lever.
5. **erpise.com (16 impr), aitsql.com (18 impr)** — most zero-click impressions, but titles/descs already contain their queries ("continuing ed erp", "advanced query tool"). A dedicated page per query is the next lever, not more copy tweaks.

## Changes Made

None. All category A sites (aibyjob, aitsql, aiyhwh, cosmostheopera, erpise, videobate) already carry titles/descs targeting their top query, or the query is a brand typo ("abhijob in") where copy can't help. Not confident a rewrite beats current copy.

**Category B:** no traction homepage has WRONG_CANONICAL or NO_DESC. THIN_CONTENT persists on uptownit.com homepage (2 impr), gameatica (50/52 pages), inthisworld (15/19), cosmostheopera (14/33), bodspas (4). Only NO_DESC in network: `aiunites.com/googled9d9a485d256e459.html` (verification file — ignore).

**Category C (pos 6–15):** inthisworld (7.5), furnishthings (7.5, query is typo "furnithing"), cloudsion (10, 2 impr, irrelevant query "sion git"). aiyhwh/cosmostheopera are now better than pos 6. No fixer changes since Sep 27 beyond titles/GA4/schema on inthisworld, aibyjob, redomy.

## Flags for Manual Review

1. **cosmostheopera.com** — add "Cosmo Opera" alias in body copy; candidate title: `Cosmo Opera: COSMOS the OPERA — Cosmic Trance Opera`.
2. **seo-fix.ps1 repo resolution** — still not processing `aiunites-site` (101 open issues; `acp.html`/`acp-builder.html` have no title, ~4 words). Use explicit domain→repo map; build out or noindex `acp*.html`.
3. **aiunites.com positioning** — top query "ai optimization tulsa" at pos 90.5; decide local-consulting vs. middleware message. 8 pages thin.
4. **Page ideas** — videobate.com (standalone fallacy quiz), aitsql.com ("advanced query tool"), erpise.com ("continuing ed ERP"); more pages for aizines.com.
5. **bizstry.com** — 0 impressions; seek backlinks / internal links from indexed network sites.
6. **Brand-typo queries** — abhijob, redo a, furnithing, gametiko, sion git: nothing to optimize.
7. **aiunites.com long article titles/descs** — ~7 articles exceed 65/165 chars (LONG_TITLE/LONG_DESC); low priority but easy trim.

## Next Week Focus

Fix `seo-fix.ps1`'s repo mapping so aiunites-site's issues get processed, and write one query-targeted page (videobate fallacy quiz or aizines).
