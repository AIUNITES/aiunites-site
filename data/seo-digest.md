# AIUNITES SEO Digest — November 21, 2026

> Data is fresh: `seo-report.json` (Nov 21 07:01) and `gsc-stats.json` (Nov 21 07:00, range Oct 24 – Nov 21). `seo-fix.log` last ran Sep 27 (no new fixer changes). Today's weekly auto-publish already ran before this digest, so a separate publish has been queued for this run's edits.

## Summary

- Sites with GSC traction (impressions > 0): **16** of 18
- Sites with 0 impressions: **2** (bizstry.com, bodspas.com; aiunites.com is back to 2 impressions)
- Sites with clicks: **4** (aizines 46, inthisworld 26, voicestry 7, aiyhwh 1)
- Files edited this run: **2** (aibyjob-demo/index.html, aitsql-site/index.html); auto-publish queued in script-runner.ps1

## Top Opportunities This Week

1. **aibyjob.com (18 impr, 0 clicks, pos 30.8, query "ai agent templates for business")**: the homepage has a whole Templates section (Sales 12, Marketing 18, Developer 15, HR 10) but the title said "AI Agents for Careers & Professions", so neither "templates" nor "business" appeared. Retitled to match (see below). Expected impact: better CTR on the impressions it already gets, and a relevance boost for the query.
2. **aitsql.com (17 impr, 0 clicks, pos 66.8, query "ai sql optimizer")**: the site ships `query-optimizer.sql` and a Performance Tuning section, but "optimizer" wasn't in the title or description. Retitled. Pos 66.8 means the title alone won't reach page 1; content depth is still the main blocker (only 2 pages).
3. **inthisworld.com (pos 7.8, 213 impr, 26 clicks)**: still the best page-1 candidate but slipping (5.7 → 7.1 → 7.8 over three weeks). 15 of 19 pages are THIN_CONTENT. Expanding the room/game pages is the highest-leverage push to hold page 1.
4. **voicestry.com (128 impr, 7 clicks, pos 35.7)**: top query has shifted to "voice resonance analyzer". Title already says "Pitch Trainer" and the description mentions "6 resonance zones". A dedicated resonance-analyzer page or section would fit this intent better than another homepage rewrite (flagged).
5. **erpize.com (47 impr, pos 51.8, "best higher education erp")**: up from pos 59.5 since last week's compare.html retitle and sitemap fix. Keep going: replace the `#` placeholder sections on compare.html with real comparison content.

## Changes Made

**aibyjob-demo/index.html** (aibyjob.com, query "ai agent templates for business")
- Title, old: `AIByJob — AI Agents for Careers & Professions | AIUNITES` (55)
- Title, new: `AI Agent Templates for Business & Careers | AIByJob` (51)
- Desc, old: `Deploy AI agents built for your career — autonomous tools that work 24/7 to find leads, build your site, and grow your professional brand. Free to try.`
- Desc, new: `Browse AI agent templates for business: sales, marketing, HR and developer agents that find leads and automate work 24/7. Free to try, no setup needed.` (151)

**aitsql-site/index.html** (aitsql.com, query "ai sql optimizer")
- Title, old: `SQL Query Tool & AI DBA for SQL Server | AITSQL` (47)
- Title, new: `AI SQL Optimizer & Query Tool for SQL Server | AITSQL` (53)
- Desc, old: `Advanced SQL Server query tool with AI-assisted helpers, audit scripts, and T-SQL automation built by a working DBA. Speed up tuning — free to try.`
- Desc, new: `AI SQL optimizer for SQL Server: tune slow T-SQL, read execution plans and fix indexes with scripts built by a working DBA. Faster queries, free to try.` (152)

Only `<title>` and `meta description` were changed. og:/twitter: tags were left as they were.

**scripts/script-runner.ps1**: added an active `auto-publish.ps1` entry at the top of the one-shot queue (it auto-comments itself after running).

**Not edited (category A, reviewed):** gameatica ("1028 game" is a typo of 2048, already in the title), videobate ("nirvana fallacy" is a single-fallacy query; the homepage is a quiz, see flags), erpize (fixed last week and position is improving), cosmostheopera ("cosmic opera" is already matched in the title). erpise has 5 impressions (not > 5) and is pos 1.4 on its brand query.

**Category B:** no homepage with traction has WRONG_CANONICAL or NO_DESC (the only NO_DESC is aiunites' Google verification file, which is fine). THIN_CONTENT persists on gameatica (50/52), inthisworld (15/19), cosmostheopera (14/33), aiunites (8, including `acp*.html` at ~4 words), redomy (7), aibyjob (4), bodspas (4), videobate (3), uptownit (homepage).

**Category C (pos 6–15):** inthisworld (7.8), cloudsion (8, "cloudsing", 1 impr), cosmostheopera (13.8), furnishthings (14, "furnishing", 2 impr). Only inthisworld and cosmostheopera have meaningful volume; both are blocked by thin content, not titles.

## Flags for Manual Review

1. **videobate.com, "nirvana fallacy"**: 18 impressions for a single fallacy name. `fallacies.html` covers it inside a list. A dedicated `nirvana-fallacy.html` page (or a set of per-fallacy pages) of 300+ words with examples would match this kind of informational query. That's new content to write, not a title fix.
2. **uptownit.com**: top query is a long "deploy my Claude Code app with a custom domain" question, but the site is positioned as generic managed IT. That's a positioning call (and the homepage is thin), so it's left for you.
3. **voicestry.com**: consider a "Voice Resonance Analyzer" landing page or section. The position has gone 17.9 → 31.5 → 35.7 over two weeks.
4. **aiunites-site `acp.html` / `acp-builder.html`**: still no title and ~4 words. Build them out or noindex them. seo-fix.ps1 still hasn't run since Sep 27.
5. **gameatica.com**: 59 impressions, 0 clicks, 50/52 pages thin. Per-game pages need how-to-play and tips content.
6. **bizstry / bodspas**: 0 impressions. They need internal links from indexed network sites (inthisworld, aizines) and URL inspection requests in Search Console.

## Next Week Focus

Check whether the aibyjob and aitsql retitles convert impressions into clicks, and start writing the thin-content expansion on inthisworld.com before its position slips off page 1.
