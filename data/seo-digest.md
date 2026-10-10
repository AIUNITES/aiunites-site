# AIUNITES SEO Digest — October 3, 2026

> Data is fresh this week: both `seo-report.json` and `gsc-stats.json` were generated Oct 3, 2026 (GSC range Sep 5 – Oct 3). The weekly chain recovered after the Sep 7–21 gap.

## Summary

- Sites with GSC traction (impressions > 0): **16** of 18
- Sites with 0 impressions: **2** (cloudsion.com, bizstry.com)
- Sites with any clicks: **5** (aizines 23, inthisworld 4, voicestry 3, videobate 2, gameatica 1)
- Network totals (Sep 5 – Oct 3): 380 impressions, 33 clicks
- Files edited this run: **0** (see below)

## Why no copy was changed this week

Category A (impressions > 5, clicks = 0) returned 6 sites:

| Site | Impr | Avg pos | Top query |
|------|-----:|--------:|-----------|
| erpize.com | 29 | 64.5 | enrollment audit services for universities |
| aitsql.com | 21 | 56.8 | advanced query tool |
| erpise.com | 19 | 62.4 | continuing ed erp systems |
| aibyjob.com | 18 | 29.0 | aiby |
| cosmostheopera.com | 7 | 8.4 | cosmo opera |
| aiunites.com | 6 | 27.5 | one ai profile for everything |

Reasoning, same as last digest and still holding:

1. **Four of six sit at position 55-65** (page 6+). CTR there is ~0% whatever the snippet says. Rewrites will not move that.
2. **aitsql.com and erpize.com were already rewritten** (Jul 27 / Aug 10 and Aug 3). They are still at 0 clicks and position 55-65, so a third rewrite is not a new experiment.
3. **aibyjob.com's top query ("aiby") is a brand-name fragment/typo.** Writing a title around it wins nothing. The current title already carries the correct brand.
4. **cosmostheopera.com (pos 8.4) and aiunites.com (pos 27.5)** are the only two where copy might matter. I am not confident enough to edit either. Details under Flags.

Category B (traction + WRONG_CANONICAL / NO_DESC / THIN_CONTENT on the homepage): no homepage has WRONG_CANONICAL or NO_DESC. Homepage canonicals for inthisworld.com and aibyjob.com are correct. THIN_CONTENT remains on uptownit.com's homepage and on most subpages across the network.

Category C (position 6-15 with impressions): **cosmostheopera.com** (8.4, 7 impr) and **aiyhwh.com** (11.0, 1 impr, too small to act on). aizines.com (15.8, 112 impr, 23 clicks) is just outside the band and already performing.

## Top Opportunities This Week

1. **cosmostheopera.com is on the edge of page 1 (position 8.4, 7 impressions, 0 clicks).** This is the nearest-to-page-1 site in the network. Top query is "cosmo opera". The homepage contains **zero** instances of that phrase; the brand is "COSMOS the OPERA". The title was last rewritten Jun 22 for this same keyword. Expected impact: a handful of clicks per month if it holds position. Needs a human call on whether to add "Cosmo Opera" as a natural alias in body copy, not just the title.

2. **seo-fix.ps1 still never touches aiunites-site.** `seo-fix.log` has 18 hits for `AIUNITES-database-sync` and **0** for `aiunites-site`; line 98 of `seo-fix.ps1` still uses the `-match ($domain.Split('.')[0]) | Select -First 1` pattern. aiunites.com has 101 open issues, the worst real backlog in the network, including 3 pages with no title (`acp.html`, `acp-builder.html`, `googled9d9a485d256e459.html`). A one-line hashtable fix unblocks it. Expected impact: clears the largest unfixed pool on the flagship domain.

3. **aizines.com is the one thing working: 23 clicks on 112 impressions (4.6% CTR) at position 15.8**, up from position 42 last digest. It is a 3-page site with 1 issue (MULTI_H1). A second and third content page there is the best-ROI content move in the network.

4. **Thin content is the real blocker network-wide.** gameatica.com has 50 of 52 pages thin (27 impressions, 1 click, position 48), inthisworld.com 15 of 19, cosmostheopera.com 14 of 33, redomy.com 7 of 15. This cannot be safely automated (see the seo-fix.ps1 template-copy incident in CLAUDE.md). It needs hand-written content on a few pages at a time.

5. **aiunites.com query/title mismatch.** The top query "one ai profile for everything" appears nowhere on the site, and the homepage title is "AI Consulting Oklahoma | AIUNITES — Tulsa AI Integration". The site is positioned two different ways (local consulting in the title/meta vs. middleware/notation in the H1 and og:title). Expected impact is low at 6 impressions, but the positioning mismatch is worth resolving.

## Changes Made

**None.** No file was edited this run, so `auto-publish.ps1` was **not** queued in `script-runner.ps1` for this digest. (A separate Oct 3 weekly-publish entry from another task is already present there; I left it alone.)

## Flags for Manual Review

1. **cosmostheopera.com title/copy** — "cosmo opera" ranks 8.4 but the page never says it. Current title: `COSMOS the OPERA — A Cosmic Trance Opera in Space &amp; Sound`. A candidate to test only if you want to chase this query: `Cosmo Opera: COSMOS the OPERA — Cosmic Trance Opera` (~50 chars). I held back because the brand is "COSMOS", the Jun 22 rewrite already targeted this keyword, and 7 impressions is too little to read an effect from.
2. **seo-fix.ps1 repo resolution** — replace the substring match with an explicit domain→repo map. Check `bodspas` vs `bodwave-site` for the same collision.
3. **aiunites.com positioning** — decide whether the homepage title/meta should speak to "AI consulting Tulsa" or to the middleware / one-profile story the H1 tells.
4. **aiunites.com missing titles** — `acp.html` and `acp-builder.html` have no `<title>` and ~4 words of content; either build them out or noindex them.
5. **Brand-typo queries** — aiby, aizine, upto it, furnashings, redo a. Nothing to optimize for; just note that brand searches are being mistyped.
6. **Page ideas** — one page on aitsql.com and one on erpize.com that actually answer their top queries ("advanced query tool", "enrollment audit services for universities"), since homepage copy alone has not moved them.

## Next Week Focus

Fix `seo-fix.ps1`'s repo resolution so aiunites-site gets its 101 issues worked, and add one hand-written content page to aizines.com while it is climbing.
