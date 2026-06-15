# AIUNITES SEO Digest — June 15, 2026

*GSC window: 2026-05-17 → 2026-06-14 · SEO audit: 2026-06-13*

## Summary
- Sites with GSC traction (impressions > 0): 15
- Sites with 0 impressions (need indexing, not copy): 3 — aiyhwh.com, bizstry.com, bodspas.com
- Files edited this run: 1 (gameatica-site/index.html)

This week's key finding: the network's meta copy is already in good shape. A verification pass showed that the sites with the most impressions already have titles and descriptions that match their top queries (e.g. erpise.com's title is an exact match for "continuing ed erp systems"; voicestry.com already has a full 149-char description targeting "pitch trainer"). The real ceiling on these sites is ranking depth and content/authority, not metadata. So only one genuinely confident copy change was made; the rest are flagged for human judgment rather than auto-rewritten.

## Top Opportunities This Week

1. **erpise.com — content/authority push (highest leverage).** 47 impressions, 0 clicks, avg position 50.2 (page 5). Title and description are already an exact match for the top query "continuing ed erp systems," so copy is NOT the blocker. This is the single biggest pool of wasted impressions on the network. Needs depth: real case studies, SIS/Banner/Jenzabar landing content, and backlinks to climb from page 5. Manual.

2. **gameatica.com — title rewrite (DONE this run).** 19 impressions, 0 clicks, position 63.5. Top query "2048 game math playground." Old title was a generic 36-char "Free Online Arcade Games" that buried the game people actually search for. Rewrote to surface "2048" by name (see Changes Made). Position is deep, so expect a relevance bump rather than an overnight jump.

3. **inthisworld.com — fix missing descriptions on sub-pages.** Network's top performer (64 impressions, 5 clicks, CTR 7.2%, position 27.5). The homepage is healthy, but `/games/index.html` and `/rooms/index.html` are flagged NO_DESC (one also THIN_CONTENT). Adding descriptions to those two hub pages is a clean, low-risk win on the site that already converts best. Manual (sub-page edits outside this run's homepage scope).

4. **aizines.com — page-1 nudge.** 22 impressions, 4 clicks, position 10.7 on "aizine." Already converting and sitting right at the page-1 boundary. Copy is good; a small internal-linking / content-freshness push could pull it over the line. Manual.

5. **erpize.com — brand-confusion review.** 7 impressions, 0 clicks, position 8 (page 1) — but the top query is literally "erpise," the sister brand. Searchers want erpise.com and are landing on erpize.com. Do NOT optimize erpize for "erpise" (it would cannibalize the real site). Needs a human decision on cross-linking / disambiguation. Manual.

## Changes Made

**gameatica.com** (`gameatica-site/index.html`) — `<title>` and `<meta name="title">`

- Old: `Gameatica - Free Online Arcade Games` (36 chars)
- New: `Gameatica — Play 2048, Snake, Tetris & Free Online Games` (56 chars)
- Why: top query "2048 game math playground" — the old title omitted "2048" entirely despite it being the #1 search term landing on the site. Description already lists 2048, so it was left unchanged.

No other files were edited. Publish queued: `auto-publish.ps1` uncommented in `scripts/script-runner.ps1` (runs next cycle, then auto-comments).

## Flags for Manual Review

- **erpise.com** — 47 impressions stuck at position 50 with already-optimal copy. Highest-value content/backlink project on the network. Metadata can't fix a page-5 ranking.
- **inthisworld.com** — add meta descriptions to `/games/index.html` and `/rooms/index.html` (NO_DESC); one also flags THIN_CONTENT.
- **uptownit.com** — index.html flags THIN_CONTENT. Note its top query "pacuplay138" (and its 2 clicks) appears to be irrelevant/spam traffic, not real IT-services intent — don't chase that keyword.
- **furnishthings.com** — position 84, LOW_CONTENT, and top query "create a total of 10 furnishings" looks like a non-commercial/AI-prompt fragment, not a shopper query. Needs real product content + indexing before any copy work.
- **erpize.com** — brand confusion with sister site erpise.com (see opportunity #5).
- **aibyjob.com** — MULTI_H1 structural issue on homepage; top query "aiby" is just a partial brand match.
- **aiunites.com** — minor: top query is "ai consulting okc" (Oklahoma City) but copy targets Tulsa. Position 66 means metadata isn't the limiter; consider an OKC mention only as part of a broader local-content effort.
- **0-impression sites** (aiyhwh.com, bizstry.com, bodspas.com) — these need indexing/submission, not copy tweaks. Verify they're submitted in GSC and have inbound links.

## Next Week Focus

Start a real content build-out for **erpise.com** — it has 47 monthly impressions on a perfectly-matched query but sits on page 5; depth and links, not metadata, are what will convert that traffic.
