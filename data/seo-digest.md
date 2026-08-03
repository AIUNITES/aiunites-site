# AIUNITES SEO Digest — 2026-08-03

Data sources: `seo-report.json` (audit generated Jul 25, 2026) · `gsc-stats.json` (GSC pull Jul 27, 2026, 28-day window Jun 29–Jul 27).

## Summary
- Sites with GSC traction (impressions > 0): **14 of 18**
- Sites with 0 impressions: **4** (uptownit.com, bodspas.com, aiyhwh.com, bizstry.com)
- Files edited this run: **1** (erpize.com homepage meta)

## Top Opportunities This Week

1. **erpize.com — reframe homepage around "erp vs sis" (EDITED).** 22 impressions, 0 clicks, avg position 46.6. The top query is a comparison intent ("erp vs sis") but the old title/desc only said "The ERP Magazine for Enterprise Systems" — no match. Rewrote title + meta to lead with "ERP vs SIS." Expected impact: better CTR and relevance on the query already generating impressions; homepage should also start ranking for the comparison term rather than just brand-adjacent hits.

2. **aitsql.com — already optimized, needs authority not copy.** 66 impressions (highest zero-click on the network), 0 clicks, position 59.2. Top query "ai dba for sql server." The live homepage already carries the exact title "AI DBA for SQL Server — Tools & Consulting | AITSQL" (the Jul 25 audit snapshot was stale). Copy is fine; position 59 = page 6, so the blocker is depth/backlinks, not the tag. No edit made. Highest-impression term on the network — worth a dedicated content/link push.

3. **inthisworld.com — fix NO_DESC on section landing pages.** The network traffic leader (155 impressions, 5 clicks, position 31.3). Root index.html is clean, but `/games/` and `/rooms/` section index pages have NO_DESC (plus NO_CANONICAL, NO_SCHEMA on /games/). These are real landing pages with traction upstream. Mechanical meta-desc + canonical fix — safe to schedule, but not attempted this run (see flags).

4. **voicestry.com — title already matches, needs ranking push.** 31 impressions, 0 clicks, position 49.8, top query "free online voice coach." Title already reads "VoiceStry — Free Online Pitch Trainer & Voice Coach" and the desc contains the phrase. No copy change warranted; the gap is position (page 5), not relevance.

5. **erpise.com — brand query only, monitor.** 47 impressions, 1 click, position 56.9, top query "erpise" (navigational/brand). Title/desc already relevant. Deep position is the constraint; no copy action.

## Changes Made

**erpize.com** (`erpize-site/index.html`) — title, meta description, og:title/description, twitter:title/description all updated:

- **Old title:** `ERPize — The ERP Magazine for Enterprise Systems`
- **New title:** `ERP vs SIS Explained — ERP Magazine for Higher Ed | ERPize` (58 chars)
- **Old desc:** `ERPize is the magazine for ERP pros — news, tutorials, and insights on Student Information Systems, higher-ed ERP, and enterprise platforms.`
- **New desc:** `ERP vs SIS: understand the real difference for higher ed. ERPize covers Student Information Systems, campus ERP and reporting so you pick right.` (144 chars)

Publish queued: uncommented `auto-publish.ps1` in `scripts/script-runner.ps1` (one-shot queue).

## Flags for Manual Review

- **inthisworld.com `/games/` and `/rooms/` NO_DESC** — highest-traffic site on the network. Add a proper meta description + canonical to both section index pages. Mechanical and safe; queued for next run rather than auto-generated here to keep the description human-quality.
- **Zero-click brand/typo queries — do NOT rewrite copy.** gameatica.com ("1028 game" — likely typo for 1024/2048), aibyjob.com ("aiby"), furnishthings.com ("furniest"), redomy.com ("aroomy"). These are navigational/misspelled queries; targeting them in title copy would hurt clarity for no gain. Left untouched by design.
- **Network-wide THIN_CONTENT on app/game pages** — Gameatica (50 pages), COSMOS (14), InThisWorld (16), Redomy (7), etc. These are interactive app pages that are inherently thin. Per the automation-discipline note (seo-fix.ps1 incident), do NOT auto-generate filler copy for these. If AdSense value is the concern, address with genuine editorial/help content per section, reviewed by hand.
- **4 sites with 0 impressions** (uptownit, bodspas, aiyhwh, bizstry) need indexing, not copy tweaks. uptownit.com also has THIN_CONTENT on its homepage — real content is the fix.
- **No Category C quick wins this week.** No site sits in the position 6–15 band with meaningful impressions. The near-page-1 sites (cosmostheopera 5.5, cloudsion 3.0, videobate 2.2) each have ≤4 impressions except videobate (24, already page 1 on brand).

## Next Week Focus

Give aitsql.com a real authority push (a substantive "AI DBA for SQL Server" article + internal links) — it owns the network's highest-impression non-brand query (66 impressions) but sits on page 6, so copy is done and only depth/links will move it.
