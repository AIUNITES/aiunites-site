# AIUNITES SEO Digest — October 17, 2026

> Data is fresh: `seo-report.json` (Oct 17 07:01) and `gsc-stats.json` (Oct 17 07:00, range Sep 19 – Oct 17).

## Summary

- Sites with GSC traction (impressions > 0): **16** of 18
- Sites with 0 impressions: **2** (cloudsion.com, bizstry.com) — need indexing/links, not copy
- Sites with clicks: **6** (aizines 31, inthisworld 5, voicestry 4, gameatica 2, videobate 1; aiunites 0)
- Files edited this run: **1** (`aiyhwh-site/index.html`)

## Top Opportunities This Week

1. **aiyhwh.com (pos 7.5, 8 impr, 0 clicks)** — top query "yahweh ai". Page-1 range, but the title said only "AI YHWH". Title/meta rewritten this run to lead with "Yahweh AI". Expected: first clicks as position holds/improves.
2. **cosmostheopera.com (pos 5.8, 4 impr)** — best position in the network, query "cosmo opera". Homepage copy never uses "Cosmo Opera"; needs a human call (see Flags).
3. **aizines.com is the winner: 31 clicks / 175 impr (2.2% CTR), pos 24.7.** Only 3 pages — adding 1–2 real content pages is the best-ROI content move.
4. **erpize.com (30 impr, pos 52.3) and aitsql.com (18, pos 52.9), erpise.com (18, pos 45.8)** — most zero-click impressions, but all on page 5+ and titles/descriptions already contain their top queries. Next lever is a dedicated page per query, not another title tweak.
5. **aiunites.com has 101 open audit issues** (3 pages with no title: `acp.html`, `acp-builder.html`, one Google verification file; 8 thin pages). `seo-fix.ps1` still doesn't process `aiunites-site`.

## Changes Made

**aiyhwh-site/index.html** (query "yahweh ai", pos 7.5)

- Title — old: `AI YHWH - AI-Powered Biblical Discoveries & Insights`
- Title — new: `Yahweh AI — Explore the Bible with AI-Powered Insights` (54 chars)
- Desc — old: `Explore the Bible with AI-powered insights — discover hidden patterns, cross-references, and deeper meaning in Scripture. Free to search, no signup.`
- Desc — new: `Yahweh AI helps you explore the Bible: uncover hidden patterns, cross-references and deeper meaning in Scripture. Free to search, no signup needed.` (147 chars)
- og:/twitter: tags left unchanged. `auto-publish.ps1` queued in `scripts/script-runner.ps1`.

**Category A sites deliberately NOT edited** (impr > 5, clicks = 0):

| Site | Impr | Pos | Top query | Why no edit |
|---|--:|--:|---|---|
| erpize.com | 30 | 52.3 | long-tail "best education erp suites for mid-size colleges…" | Pos 52; query is a long-tail question needing a dedicated page |
| erpise.com | 18 | 45.8 | continuing ed erp systems | Title already starts with the query |
| aitsql.com | 18 | 52.9 | advanced query tool | Desc already says "Advanced SQL Server query tool" |
| aibyjob.com | 13 | 25.7 | aiby | Brand-fragment query; title already carries brand |
| bodspas.com | 7 | 69.9 | bodybuilding bodyspace | Typo/competitor-brand query, pos 70 |

Category B: no homepage with traction has WRONG_CANONICAL or NO_DESC. THIN_CONTENT persists on uptownit.com homepage (4 impr) and many subpages (gameatica 50/52, inthisworld 15/19, cosmostheopera 14/33).

Category C (pos 6–15): aiyhwh.com (7.5, edited above). cosmostheopera.com (5.8) is just above the range. `seo-fix.log` last ran Sep 27 and touched neither.

## Flags for Manual Review

1. **cosmostheopera.com** — add "Cosmo Opera" as a natural alias in body copy; candidate title: `Cosmo Opera: COSMOS the OPERA — Cosmic Trance Opera`.
2. **seo-fix.ps1 repo resolution** — replace substring matching with an explicit domain→repo map so `aiunites-site` is processed (its log still points at `AIUNITES-database-sync`).
3. **aiunites.com positioning** — top query "one ai profile for everything" appears nowhere on the site; title says local AI consulting while H1/og say middleware. Pick one message. Build out or noindex `acp.html` / `acp-builder.html`.
4. **Page ideas** — one page each: erpize.com (mid-size college ERP suites), aitsql.com ("advanced query tool"), erpise.com ("continuing ed ERP"); more pages on aizines.com.
5. **Zero-impression sites** — cloudsion.com and bizstry.com: seek backlinks / internal links from indexed network sites.
6. **Brand-typo queries** — aiby, redo a, bodybuilding bodyspace, furnish website: nothing to optimize.

## Next Week Focus

Fix `seo-fix.ps1`'s repo mapping so aiunites-site's 101 issues get processed, and write one query-targeted page for erpize.com or aitsql.com.
