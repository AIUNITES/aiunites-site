# AIUNITES SEO Digest — June 29, 2026

*Audit data: Jun 27, 2026 (seo-report.json) · GSC data: May 31–Jun 28, 2026 (gsc-stats.json)*

## Summary
- Sites with GSC traction (impressions > 0): **14**
- Sites with 0 impressions (need indexing, not copy): **4** — cloudsion, bodspas, aiyhwh, bizstry
- Files edited this run: **0** (rationale below)
- Network audit issues outstanding: 338 (mostly thin-content/missing-title on deep/secondary pages, not homepages)

### Why zero edits this run
`seo-fix.ps1` ran Jun 27 and freshly patched homepage titles, meta descriptions, canonicals, OG images and schema across the network — most homepages now score **0** (no issues). Cross-referencing those clean homepages against GSC, **no site clears the bar for a confident copy edit**:

- The high-impression sites all rank at **position 28–76** (page 3+). At those positions, zero clicks is expected and a title/meta rewrite will *not* generate clicks — the lever is ranking (content depth / relevance / links), not CTR copy.
- The only two sites ranking on **page 1** (cosmostheopera at 5.5, erpize at 6.3) have either a tiny sample (8 impressions) or a sibling-brand-confusion query — neither a safe auto-edit.
- Several `topQuery` values are noise or in-app text, not real targets (see Flags). Chasing them in titles would actively damage those pages — exactly the failure mode documented in the seo-fix.ps1 incident.

Per CLAUDE.md automation discipline (creative copy doesn't ship unattended without human review) and the task's own "only edit if confident" clause, changes are **proposed for manual review** below rather than auto-applied. Auto-publish was **not** queued.

## Top Opportunities This Week

1. **inthisworld.com — build ranking, not copy (highest leverage).** 98 impressions (by far the most in the network), 3 clicks, position 28.7 for *"virtual world games online"*. Title already targets the exact query. It sits on page ~3 for a high-volume term — pushing it toward page 1–2 with deeper, more relevant content and internal linking is the single biggest opportunity on the network.

2. **erpise.com — niche B2B intent, needs an authority page.** 48 impressions, 0 clicks, position 64.3 for *"continuing ed erp solutions"*. Strong commercial-intent niche query; title is already well-matched. Held back by ranking (page 6+). Recommend a dedicated, in-depth page targeting "continuing education ERP solutions" to climb.

3. **aitsql.com — verify the real queries.** 38 impressions, 0 clicks, position 65.8. Reported topQuery *"after sql"* is ambiguous/low-value; the 38 impressions almost certainly span other queries. Pull the full query list in GSC before acting. Position too low for copy to matter yet.

4. **aizines.com — best performer, fix the MULTI_H1.** 40 impressions, **5 clicks** (the most clicks of any traction site), position 41.4 for *"aizine"* (brand). Only technical blemish is MULTI_H1 — a safe mechanical fix to add to the next seo-fix pass.

5. **cosmostheopera.com — page-1 watch item.** Position 5.5 for *"cosmo opera"*, 8 impressions, 0 clicks. Only true page-1 ranking with no clicks, but 8 impressions is too small to read a CTR signal. Title is already on-brand. Watch; revisit a punchier title once impressions grow.

## Changes Made
None. No homepage cleared the confidence bar this week (see "Why zero edits" above).

## Flags for Manual Review

- **erpise.com vs erpize.com brand collision.** erpize.com ranks position 6.3 for the query *"erpise"* — the sibling site's brand. Do **not** rewrite erpize's title to capture it; that cannibalizes/confuses two of your own brands. Needs a human call on disambiguation (distinct titles, cross-links, or a canonical strategy).
- **Junk / non-target topQueries — do not chase in titles:** `pacuplay138` (uptownit, looks like slot/gambling spam), `1028 game` (gameatica, likely a 2048/1024 typo), `after sql` (aitsql, fragment), `nanites ai` (aiunites, brand misspelling), `my redo` (redomy, fragment), `create a total of 10 furnishings` (furnishthings, reads like in-app quest text). These are indexing noise, not commercial intent.
- **furnishthings.com homepage is "Phase 3: First Home".** The homepage title/desc read like an internal game-phase page, not a landing page (position 76.4). Worth a human review of whether index.html should present a proper site-level landing title.
- **MULTI_H1 (minor, mechanical):** aizines.com, aibyjob.com, redomy.com. Safe to fold into the next mechanical seo-fix run.
- **4 sites with 0 impressions** (cloudsion, bodspas, aiyhwh, bizstry): need indexing/sitemap submission and links — not copy tweaks. Per task scope, left untouched.

## Next Week Focus
Deepen content and internal linking on **inthisworld.com** to push *"virtual world games online"* (98 impressions, position 28.7) from page 3 toward page 1 — the highest-volume, highest-leverage term in the network.
