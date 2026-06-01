# AIUNITES SEO Digest — 2026-06-01

*Audit data: seo-report.json (generated 2026-05-30) · GSC pull: gsc-stats.json (2026-05-03 → 2026-05-31)*

## Summary
- Sites with GSC traction (impressions > 0): **16**
- Sites with 0 impressions (need indexing, not copy): **2** — aiyhwh.com, bodspas.com
- Files edited this run: **0** (see "Why no edits" below)
- Auto-publish queued: **No**

## Why no meta edits were applied this run

I checked the actual `index.html` files, not just the audit. Every site's **homepage** already carries a well-formed, correctly-sized, keyword-targeted `<title>` and meta description — last week's pass plus the 2026-05-23 seo-fix run already handled the truncation/length issues (cosmostheopera, videobate, bizstry, etc.). There is no homepage meta rewrite this week that clears the "confident this is genuinely better than what exists" bar.

The zero-click pattern is **not a copy problem**, it's two other things:
1. **Ranking depth.** Most zero-click sites sit at positions 35–78 (pages 4–8). No title rewrite earns clicks from page 5 — the lever is content/authority/internal links.
2. **Branded / garbled topQueries.** "aiby"/"byjob", "erpise" (on erpize), "my redo", "cosmo opera", "sion cloud", "l'videowates" are navigational or junk queries. Optimizing homepage copy for them won't move clicks.

Per the task guardrail ("only edit if confident the copy is better; otherwise flag for manual review") and the documented seo-fix.ps1 incident, mass-editing homepages with templated copy during an active AdSense review is exactly the move to avoid. No files changed; auto-publish was **not** queued.

## Top Opportunities This Week

1. **inthisworld.com section pages — highest leverage.** Network traffic leader (48 impr, 2 clicks — the most of any site). Homepage is clean, but `/games/index.html` and `/rooms/index.html` have NO_DESC, THIN_CONTENT, NO_CANONICAL, NO_OG_IMAGE, NO_SCHEMA, NO_GA4. Real, fixable, on your top site — but needs content + structural tags, not a one-line meta edit. *Manual content pass recommended.*
2. **erpise.com — your one real commercial keyword.** topQuery "continuing ed erp systems" (23 impr, pos 35.6) is a genuine non-branded buyer query, and the homepage title already matches it well. The blocker is depth/rank: the site is only 3 pages on page 4. A dedicated "Continuing Education ERP" page is the move. *Same flag as last week — still the best growth bet, still needs the content written.*
3. **aiunites.com geo mismatch — needs your call.** topQuery "ai consulting **okc**" (Oklahoma City) but the homepage targets **Tulsa**. If OKC is a market you want, reflect it in title/H1 or add an OKC page. Business decision, low urgency (currently pos 75.5).
4. **Quick-win zone (already page 1, low-volume branded).** erpize.com (pos 7.5), cosmostheopera.com (pos 6.3), aizines.com (pos 6.5, already 2 clicks), uptownit.com (pos 10, 1 click), cloudsion.com (pos 10.7). These convert with more branded impressions; no copy fix needed.
5. **Two dark sites.** aiyhwh.com and bodspas.com have 0 impressions — indexing problem, not copy. bodspas has only 1 of 7 pages indexed; verify sitemap + GSC submission.

## Changes Made
None. No homepage meta copy met the bar for a confident improvement over what is already live.

## Flags for Manual Review
- **inthisworld.com `/games/` and `/rooms/`** — thin section pages on the top-traffic site; need descriptions, canonicals, schema, GA4, and real content. Do NOT template across sites.
- **aiunites.com** — decide OKC vs Tulsa geo targeting (topQuery says OKC, title says Tulsa).
- **Structural, audit-flagged (not meta copy):** furnishthings.com index `LOW_CONTENT`; aibyjob.com & redomy.com index `MULTI_H1`. Mechanical but out of scope for a meta-copy run.
- **bodspas.com / aiyhwh.com** — indexing problem; verify sitemap submission and indexable content.
- **Recurring theme:** most topQueries are branded/garbled. The real unlock is a dedicated session on **non-branded keyword targeting + content depth**, not meta rewrites.

## Next Week Focus
Write the "continuing ed ERP" content page for **erpise.com** (its one matched commercial keyword, one push from page 1) and fix the **inthisworld.com `/games/` + `/rooms/`** section pages — both beat any homepage meta tweak on leverage.
