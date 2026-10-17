# AIUNITES SEO Digest — October 10, 2026

> Data is fresh: `seo-report.json` and `gsc-stats.json` were both generated Oct 10, 2026 (GSC range Sep 12 – Oct 10).

## Summary

- Sites with GSC traction (impressions > 0): **16** of 18
- Sites with 0 impressions: **2** (cloudsion.com, bizstry.com) — need indexing/links, not copy
- Sites with any clicks: **5** (aizines 25, inthisworld 6, voicestry 3, gameatica 2, videobate 1)
- Network totals (Sep 12 – Oct 10): 398 impressions, 37 clicks
- Files edited this run: **0**

## Top Opportunities This Week

1. **cosmostheopera.com (pos 6.3, 3 impr, 0 clicks)** — closest to page 1 in the network, top query "cosmo opera". Homepage still never uses the phrase "Cosmo Opera". Needs a human call on adding it as a natural alias in body copy (see Flags). Impact: a few clicks/month; sample is only 3 impressions.
2. **aiyhwh.com (pos 7.8, 4 impr)** — top query "yahweh ai". Already within page-1 range; no audit issues. Only lever is content depth; too little data to act on.
3. **aizines.com is the winner: 25 clicks / 144 impressions (2.6% CTR), pos 20.1.** Only 3 pages. Adding 1-2 genuine content pages is the best-ROI content move in the network.
4. **erpize.com (31 impr, pos 62.9) and aitsql.com (19 impr, pos 54.7)** have the most zero-click impressions, but both are on page 6+ and titles/descriptions already contain the top queries ("higher education ERP", "advanced SQL Server query tool"). A dedicated page answering each query is the next lever, not another title tweak.
5. **aiunites.com has 101 open audit issues** (3 pages with no title: `acp.html`, `acp-builder.html`, `googled9d9a485d256e459.html`; 8 thin pages). `seo-fix.ps1` has never fixed `aiunites-site` (its log only touches `AIUNITES-database-sync`).

## Changes Made

**None.** Category A (impr > 5, clicks = 0) returned four sites:

| Site | Impr | Pos | Top query | Why no edit |
|---|--:|--:|---|---|
| erpize.com | 31 | 62.9 | best higher education erp | Pos 63; title/desc already target ERP/higher ed (rewritten Aug 3) |
| aitsql.com | 19 | 54.7 | advanced query tool | Pos 55; desc already says "Advanced SQL Server query tool" (rewritten Jul 27 / Aug 10) |
| erpise.com | 16 | 52.1 | continuing ed erp systems | Pos 52; title already begins "Continuing Ed ERP Systems" |
| aibyjob.com | 14 | 28.4 | aiby | Brand-fragment/typo query; title already carries brand |

At position 50+ CTR is ~0% whatever the snippet says, so rewriting would be churn. `auto-publish.ps1` was **not** queued in `script-runner.ps1` (nothing edited).

Category B: no homepage with traction has WRONG_CANONICAL or NO_DESC. THIN_CONTENT remains on uptownit.com's homepage (4 impr) and many subpages (gameatica 50/52, inthisworld 15/19, cosmostheopera 14/33, redomy 7/15).

Category C (pos 6-15): cosmostheopera.com (6.3) and aiyhwh.com (7.8), both with ≤4 impressions. No seo-fix.log activity since Sep 27 (no changes touched these).

## Flags for Manual Review

1. **cosmostheopera.com** — add "Cosmo Opera" as a natural alias in body copy; candidate title if desired: `Cosmo Opera: COSMOS the OPERA — Cosmic Trance Opera` (~50 chars).
2. **seo-fix.ps1 repo resolution** — still resolves domain→repo by substring; replace with an explicit map so `aiunites-site` (and e.g. bodspas vs bodwave-site) are handled correctly.
3. **aiunites.com positioning** — top query "one ai profile for everything" appears nowhere on the site; title says local AI consulting while H1/og say middleware. Decide on one message. Also build out or noindex `acp.html` / `acp-builder.html` (~4 words each).
4. **Page ideas** — one page each on erpize.com ("higher education ERP"), aitsql.com ("advanced query tool"), erpise.com ("continuing ed ERP"); more pages on aizines.com.
5. **Zero-impression sites** — cloudsion.com and bizstry.com: seek backlinks / internal links from indexed network sites.
6. **Brand-typo queries** — aiby, furnashings, redo a, bodybuilding bodyspace: nothing to optimize.

## Next Week Focus

Fix `seo-fix.ps1`'s repo mapping so aiunites-site's 101 issues get processed, and write one query-targeted page for erpize.com or aitsql.com.
