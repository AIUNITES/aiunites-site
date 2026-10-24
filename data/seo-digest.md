# AIUNITES SEO Digest — October 24, 2026

> Data is fresh: `seo-report.json` (Oct 24 07:01) and `gsc-stats.json` (Oct 24 07:00). `seo-fix.log` last ran Sep 27.

## Summary

- Sites with GSC traction (impressions > 0): **17** of 18
- Sites with 0 impressions: **1** (bizstry.com) — needs indexing/links, not copy
- Sites with clicks: **6** (aizines 37, inthisworld 12, voicestry 5, gameatica 3; aiunites, videobate 0)
- Files edited this run: **1** (`videobate-site/index.html`) + `scripts/script-runner.ps1` queue

## Top Opportunities This Week

1. **videobate.com (18 impr, 0 clicks, pos 55)** — top query "fallacy quiz", but title/desc never said "quiz" in the title. Rewritten this run. Expected: modest CTR lift; real gain needs a dedicated quiz page.
2. **cosmostheopera.com (pos 6.2, 6 impr, 0 clicks)** — best position in the network, query "cosmo opera"; copy never uses that phrase. Needs a human call (see Flags).
3. **inthisworld.com (pos 6.8, 63 impr, 12 clicks)** — page 1 with traction; 15 of 19 pages are thin and several subpages lack schema/GA4. Content depth is the blocker.
4. **aizines.com (37 clicks / 188 impr, pos 18.9)** — network winner with only 3 pages; 1–2 more real content pages is the best-ROI content move.
5. **erpize.com (36 impr, pos 52.5), aitsql.com (22, pos 58.1), erpise.com (18, pos 46.9)** — most zero-click impressions, but titles/descs already contain their queries; next lever is a dedicated page per query.

## Changes Made

**videobate-site/index.html** (query "fallacy quiz", pos 55)

- Title — old: `VideoBate - Spot Logical Fallacies | Free Debate Skills Game`
- Title — new: `Logical Fallacy Quiz — Free Debate Skills Game | VideoBate` (57 chars)
- Desc — old: `Play Fallacy Spotter free — spot 25+ logical fallacies, take the debate quiz, climb the leaderboard. Critical thinking skills that win real arguments.`
- Desc — new: `Take the free logical fallacy quiz: spot 25+ fallacies, test your debate skills and climb the leaderboard. Sharpen your critical thinking in minutes.` (~149 chars)
- og:/twitter tags unchanged. `auto-publish.ps1` queued (uncommented) in `scripts/script-runner.ps1`.

**Category A sites deliberately NOT edited:** erpize (long-tail question query, pos 52), erpise and aitsql (title/desc already match query), aibyjob ("abhijob in" — brand typo), bodspas ("bodybuilding bodyspace" — competitor-brand typo), aiyhwh (rewritten last week, pos 7.3 — let it settle), cosmostheopera (see Flags).

**Category B:** no traction homepage has WRONG_CANONICAL/NO_DESC. THIN_CONTENT persists on uptownit.com homepage (3 impr), gameatica (50/52 pages), inthisworld (15/19), cosmostheopera (14/33). aiunites.com has 1 NO_DESC page.

**Category C (pos 6–15):** inthisworld.com (6.8), aiyhwh.com (7.3), furnishthings.com (7.5, query is a typo "furnithing"), cosmostheopera.com (6.2), cloudsion.com (10, 2 impr, query "sion git" irrelevant). seo-fix.log (Sep 27) touched titles on inthisworld rooms/games and GA4/schema on its homepage; nothing on the others.

## Flags for Manual Review

1. **cosmostheopera.com** — add "Cosmo Opera" as a natural alias in body copy; candidate title: `Cosmo Opera: COSMOS the OPERA — Cosmic Trance Opera`.
2. **seo-fix.ps1 repo resolution** — still doesn't process `aiunites-site` (101 open issues, incl. `acp.html`/`acp-builder.html` with no title, ~4 words content). Use an explicit domain→repo map.
3. **aiunites.com positioning** — top query "ai optimization tulsa" at pos 90; decide local-consulting vs. middleware message. Build out or noindex `acp*.html`.
4. **Page ideas** — one page each: videobate.com (standalone fallacy quiz), erpize.com (mid-size college ERP suites), aitsql.com ("advanced query tool"), erpise.com ("continuing ed ERP"); more pages for aizines.com.
5. **bizstry.com** — 0 impressions; seek backlinks / internal links from indexed network sites.
6. **Brand-typo queries** — abhijob, redo a, furnithing, gametiko, sion git: nothing to optimize.

## Next Week Focus

Fix `seo-fix.ps1`'s repo mapping so aiunites-site's issues get processed, and write one query-targeted page (videobate fallacy quiz or erpize).
