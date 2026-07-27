# AIUNITES SEO Digest — July 27, 2026

*Audit data: seo-report.json (generated Jul 25, 2026 · 340 issues) · GSC data: Jun 27 – Jul 25, 2026 (gsc-stats.json, fetched Jul 25)*

> ## 🟢 PIPELINE RESTORED — DATA IS FRESH AGAIN
>
> The last three digests (Jul 6 / 13 / 20) reported the input files byte-frozen at **June 30** and the `Auto Publish GitHub` task dead for 20 days. **That is now resolved.** Both inputs regenerated on **Jul 25, 2026 18:25** (seo-report.json, gsc-stats.json, seo-fix.log all share that timestamp), and the numbers have clearly moved: inthisworld 102→**155** imp, aitsql 46→**73** imp, aizines 45→**78** imp / 6→**16** clicks. This is the first digest on live data in four weeks — comparisons below are meaningful again, not a repeated photograph.

## Summary
- Sites with GSC traction (impressions > 0): **12** of 18
- Sites with 0 impressions: **6** — uptownit, bodspas, aiyhwh, bizstry, plus cloudsion (1 imp)
- Files edited this run: **1** — aitsql-site/index.html
- Auto-publish queued: **Yes** (one-shot entry added to script-runner.ps1)

## Top Opportunities This Week

1. **aitsql.com — retitle to match "ai dba for sql server" (DONE this run).** 73 impressions, 0 clicks, position 59.1 — the highest-impression zero-click site on the network. Note the top query shifted from the old fragment *"after sql"* (last digest) to a real commercial query, *"ai dba for sql server"* — which the title did **not** contain verbatim (it led with "AI Tools for SQL Server"). Rewrote title + meta to lead with the exact phrase. *Expected impact: stronger query-title relevance should help CTR and position; position 59 caps near-term gains until depth/links improve.*

2. **inthisworld.com — fix the `/games/` and `/rooms/` subfolder index pages (FLAG).** Network traffic leader: 155 imp, 5 clicks, position 30. The **homepage is clean (score 0)** — its old NO_DESC/NO_CANONICAL flags are resolved. The remaining problem is the subfolder landing pages `/games/` and `/rooms/`, which have NO_DESC, NO_CANONICAL, SHORT_TITLE and thin content. These sit directly under the brand's traffic. Confirm seo-fix.ps1 patches subfolder index.html, not just roots.

3. **voicestry.com — copy already matches; ranking is the blocker (FLAG).** 25 imp, 0 clicks, position 54. Top query is now *"free online voice coach"* — and the title already reads *"VoiceStry — Free Online Pitch Trainer & Voice Coach."* No better rewrite exists; the constraint is page-5 ranking, which needs depth/links, not a title swap.

4. **erpize.com — "erp vs sis" is a content gap, not a copy fix (FLAG).** 22 imp, 0 clicks, position 47. Ranking for a comparison query the magazine homepage doesn't answer. A dedicated hand-written "ERP vs SIS" explainer would capture the intent far better than any homepage retitle.

5. **aizines.com — best performer on the network; protect it (FLAG, minor).** 78 imp, **16 clicks**, 5.6% CTR — the only site converting impressions to clicks at a real rate. Sole issue is one MULTI_H1 (severity 1), a safe mechanical fix for the next seo-fix pass.

## Changes Made

**aitsql.com — `aitsql-site/index.html`** (single, hand-written edit — not templated)

- **Title**
  - Old: `AI Tools for SQL Server — DBA Helpers & Consulting | AITSQL`
  - New: `AI DBA for SQL Server — Tools & Consulting | AITSQL` (51 chars)
- **Meta description**
  - Old: `AI tools for SQL Server — query helpers, audit scripts, T-SQL automation, and consulting. Built by a working DBA for database pros.`
  - New: `AI DBA for SQL Server — get query helpers, audit scripts, and T-SQL automation built by a working DBA. Speed up tuning and reporting, free to try.` (~144 chars)
- Also aligned og:title / og:description / twitter:title / twitter:description to the new phrasing and added "ai dba for sql server" to the keywords meta.

Rationale: the current top query (73 imp, 0 clicks) was absent from the title verbatim. Leading with the exact phrase is a low-risk relevance win. seo-fix.ps1 only fills missing/blank titles, so it will not overwrite this. Queued for publish via a one-shot `auto-publish.ps1` entry in `script-runner.ps1`.

## Flags for Manual Review

- **Category-A sites deliberately NOT edited** (imp > 5, clicks = 0) — a copy rewrite would not help:
  - **gameatica.com** (44 imp, pos 40): top query *"1028 game"* is a 2048/1024 typo. Do not put a typo in the title; the current 2048-targeted title is correct.
  - **aibyjob.com** (25 imp, pos 22): top query *"aiby"* is a navigational brand fragment; copy can't move it. Also has MULTI_H1 to clean.
  - **furnishthings.com** (18 imp, pos 55): top query *"furniest"* is an odd typo; page has LOW_CONTENT. Needs content depth, not a retitle.
  - **voicestry.com** (25 imp, pos 54): title already matches the query (see item 3).
- **inthisworld `/games/` and `/rooms/` index pages**: NO_DESC + NO_CANONICAL + thin content on the highest-traffic property — confirm seo-fix covers subfolder index files.
- **Network thin-content backlog (creative — do NOT auto-fill):** gameatica game pages (50 — the incident site), inthisworld room/race pages, cosmostheopera sheet-music pages, redomy room pages. Per CLAUDE.md and the April 2026 seo-fix.ps1 incident, do not ship templated filler prose; any content must be page-specific and human-reviewed.
- **⚠️ Now that auto-publish is running again, seo-fix.ps1 runs with it.** After the next successful publish cycle, run `scripts\audit-seo-boilerplate.ps1` (read-only) to confirm no templated content was re-injected network-wide.
- **6 sites at 0 impressions** (uptownit, bodspas, aiyhwh, bizstry, cloudsion at 1): need indexing / sitemap / links first — no copy edits made, per Step 3.

## Next Week Focus

Verify the aitsql retitle deployed and re-check its CTR and position on live data, then take the highest-traffic structural fix: give inthisworld's `/games/` and `/rooms/` index pages proper titles, meta descriptions, and canonicals.
