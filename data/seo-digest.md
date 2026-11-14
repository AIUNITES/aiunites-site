# AIUNITES SEO Digest — November 14, 2026

> Data is fresh: `seo-report.json` (Nov 14 07:01) and `gsc-stats.json` (Nov 14 07:00, range Oct 17 – Nov 14). `seo-fix.log` last ran Sep 27 (no new fixer changes). Today's weekly auto-publish already ran before this digest.

## Summary

- Sites with GSC traction (impressions > 0): **15** of 18
- Sites with 0 impressions: **3** (bizstry.com, bodspas.com, aiunites.com — aiunites dropped from 2 impressions last week)
- Sites with clicks: **4** (aizines 49, inthisworld 23, voicestry 5, aiyhwh 1)
- Files edited this run: **2** (erpize-site/compare.html, erpize-site/sitemap.xml) — auto-publish queued in script-runner.ps1

## Top Opportunities This Week

1. **erpize.com (50 impr, 0 clicks, pos 59.5, query "best higher education erp")** — the query is a comparison intent that the homepage ("ERP vs SIS Explained") doesn't match, but `compare.html` does — and `compare.html` was **missing from sitemap.xml**. Fixed both (see below). Expected impact: Google can now discover/rank the page that actually answers the query; next step is content depth so it can climb from pos ~60.
2. **inthisworld.com (pos 7.1, 190 impr, 23 clicks, CTR 46%)** — best performer, but slipped from pos 5.7 last week. Homepage still flags MULTI_H1, LOW_CONTENT, THIN_CONTENT, no schema/GA4 on 2 pages; 15 of 19 pages thin. Expanding thin room/game pages + fixing the homepage H1 is the highest-leverage push to firm up page 1.
3. **aizines.com (190 impr, 49 clicks, pos 27.4)** — steady network leader with just 3 pages. Brand query "aizine" — more indexable content pages is the growth lever; only issue is one MULTI_H1 on index.
4. **voicestry.com (110 impr, 5 clicks, pos 31.5)** — dropped from pos 17.9 last week. Query "vocal trainer online" isn't in the homepage title. 9 LONG_DESC + 5 LONG_TITLE pages. Consider a title test targeting "vocal trainer online" (flagged, not edited — a working title shouldn't be swapped on one week of slippage).
5. **cosmostheopera.com (12 impr, pos 14.3, query "cosmic opera")** — category C, one push from page 1; "Cosmic … Opera" already in title. Blocker is depth: 14 of 33 pages thin, 12 missing H1.

## Changes Made

**erpize-site/compare.html** (the page matching "best higher education erp"; already canonical, linked from index)
- Title — old: `Best ERP & SIS Platform Comparisons 2026 | ERPize` (49)
- Title — new: `Best Higher Education ERP & SIS Compared 2026 | ERPize` (54)
- Desc — old: `Expert ERP and Student Information System comparisons for higher education. Jenzabar vs Banner vs PeopleSoft — side-by-side breakdowns, top picks, and honest verdicts.` (169, too long)
- Desc — new: `Compare the best higher education ERP and SIS platforms: Jenzabar vs Banner vs PeopleSoft vs Workday, side by side, so your college picks the right fit.` (152)

**erpize-site/sitemap.xml** — added `https://erpize.com/compare.html` (was absent; sitemap only listed 3 URLs).

Note: edited compare.html rather than index.html because the query is comparison intent and the homepage is a magazine landing page; rewriting the homepage would mean abandoning its working "ERP vs SIS" angle.

**Not edited (category A, reviewed):** gameatica ("1028 game" — typo of 2048, already in title), videobate ("fallacy quiz" — already in title/desc since Oct 24), aitsql ("ai for sql server dba" — title already "SQL Query Tool & AI DBA for SQL Server", pos 62 is a depth problem), erpise ("continuing ed erp systems" — title already exact match), cosmostheopera ("cosmic opera" — already matched), aibyjob ("abhijob in" — brand typo).

**Category B:** no homepage with traction has WRONG_CANONICAL or NO_DESC. THIN_CONTENT persists on inthisworld (homepage + 14 subpages), gameatica (50/52), cosmostheopera (14/33), uptownit (homepage), bodspas (4), aibyjob (4), videobate (3).

**Category C (pos 6–15):** inthisworld (7.1), furnishthings (7, generic "furnishings", 2 impr), cloudsion (10, irrelevant "sion git", 1 impr), cosmostheopera (14.3). aiyhwh is pos 2 (7 impr, 1 click) — Oct 17 rewrite is holding.

## Flags for Manual Review

1. **erpize.com/compare.html content** — the SQL/IPEDS/integration sections link to `#` placeholders ("Coming Up"). Building out real comparison content (Banner, PeopleSoft, Anthology, Workday profiles) is what will move it from pos ~60.
2. **voicestry.com** — position fell 17.9 → 31.5. Candidate title: `Vocal Trainer Online — Free Voice Training | VoiceStry`. Check whether a recent publish changed the homepage before rewriting.
3. **seo-fix.ps1 repo resolution** — still not processing `aiunites-site` (101 issue score; `acp.html`/`acp-builder.html` have no title and ~4 words). Use the explicit domain→repo map; build out or noindex `acp*.html`.
4. **Sitemap audit across the network** — erpize was missing a key page; worth checking every repo's sitemap.xml against its HTML files.
5. **gameatica.com** — 50 impressions, 0 clicks, 50/52 pages thin and 49 LONG_DESC. Per-game pages need 300+ words (how-to-play, tips) to earn clicks.
6. **bizstry / bodspas / aiunites** — 0 impressions; need backlinks/internal links from indexed network sites (inthisworld, aizines) and Search Console URL inspection requests.

## Next Week Focus

Flesh out erpize.com/compare.html into a genuine "best higher education ERP" comparison (replace the `#` placeholder sections) now that it's in the sitemap, and watch whether voicestry's ranking drop continues.
