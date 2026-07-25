# AIUNITES SEO Digest — July 20, 2026

*Audit data: Jun 27, 2026 (seo-report.json) · GSC data: Jun 2–30, 2026 (gsc-stats.json)*

> ## 🔴 STILL FROZEN — THIRD CONSECUTIVE DIGEST ON THE SAME DATA
>
> **The input files have not changed since June 30.** `publish-log.txt` last updated **Jun 30 17:53** and `gsc-stats.json` last updated **Jun 30 04:14** — both confirmed by file mtime today (Jul 20). That is the *exact* timestamp the July 13 digest flagged. **The `Auto Publish GitHub` scheduled task has now been dead for 20 days**, and this is the third digest in a row (Jul 6, Jul 13, Jul 20) reporting identical numbers.
>
> **This has escalated from "stale" to "the pipeline is abandoned."** Every SEO/GSC number below is a 3-week-old photograph. Nothing downstream — audits, fixes, measurement — has run since June 30.
>
> **Confirmed this run:**
> - `Auto Publish GitHub` task: **not fired since Jun 30 17:53** (publish-log.txt mtime).
> - GSC fetch: last clean `=== DONE ===` Jun 30 04:14, all 18 domains `msg=ok` — **not an auth failure**, the parent task simply isn't being invoked.
> - `Script Runner`: **healthy** — fired today 07:10, but it only ran `check-tls-cert-once.ps1`. Its `auto-publish.ps1` line remains commented out (correctly). Do not mistake a live Script Runner log for a live pipeline; they are separate Task Scheduler entries.
>
> **Manual step required (Claude cannot touch Task Scheduler / PowerShell):**
> Task Scheduler → **Auto Publish GitHub** → check **Last Run Result** and whether it is **Disabled**. Re-enable or re-import from `scripts\Auto Publish GitHub.xml`. Confirm success when `scripts\publish-log.txt` gets a timestamp newer than Jun 30 within ~10 minutes.
>
> **Until this is fixed, the July 27 digest will report these same numbers a fourth time.**

## Summary
- Sites with GSC traction (impressions > 0): **13**
- Sites with 0 impressions (need indexing, not copy): **5** — cloudsion, bodspas, aiyhwh, bizstry, (aiunites 3 imp is borderline)
- Files edited this run: **0**
- Network audit issues outstanding: **338** (frozen since Jun 27 — no re-audit has run)
- Auto-publish queued: **No**

### What changed since last week
**Nothing measurable — the data is byte-frozen at June 30.** Any "flat" reading below is *unknown*, not *stable*. The last real movement (Jun 30) was: aizines 40→45 imp / 5→6 clicks; inthisworld 98→102 imp; aitsql 38→46 imp; videobate and uptownit each a first click.

### Why zero edits this run
Three independent reasons, any one sufficient:

1. **Editing on 3-week-frozen data is editing blind** — the effect can't be measured until the pipeline is restored, so copy changes should follow the data refresh, not precede it.
2. **The copy is already correct.** Every high-impression / zero-click site with a *legitimate* top query already has a homepage title and description that target that query (verified against current `index.html` files — see below). There is no better rewrite to make.
3. **CLAUDE.md automation discipline.** Meta descriptions are *creative* content that "Never [ships] until a human has reviewed rendered output on the actual site" (the April 2026 seo-fix.ps1 incident that entrenched the AdSense rejection). Auto-applying generated copy and auto-publishing it unattended is exactly that failure mode. Proposals go to manual review, not to disk.

### Copy is already matched (spot-check of current homepage tags)
| Site | Top query | Current homepage title | Verdict |
|---|---|---|---|
| erpise.com | continuing ed erp solutions | *Continuing Ed ERP Systems & SIS Consulting \| ERPise* | Query already in title — no rewrite |
| inthisworld.com | virtual world games online | *Free Virtual World Online — 3D Browser Games* | Query already in title — no rewrite |
| voicestry.com | how to sight read bass clef | *Free Online Pitch Trainer & Voice Coach* | Homepage ≠ query intent — needs a **dedicated page**, not a title swap |
| cosmostheopera.com | cosmo opera | *COSMOS the OPERA — A Cosmic Trance Opera…* | Branded, already page 1 (pos 5.8) — no action |
| aitsql.com | after sql | *AI Tools for SQL Server — DBA Helpers* | Query is a fragment; copy fine, ranking is the issue |

## Top Opportunities This Week

1. **Restore the `Auto Publish GitHub` scheduled task — blocks everything else.** 20 days dead. Nothing on this list can be measured or iterated while data is frozen. Highest-leverage action on the network by a wide margin, and a ~5-minute manual fix. Every item below is downstream of it.

2. **inthisworld.com — build ranking, not copy (network traffic leader).** 102 impressions, 3 clicks, position 28.6. Title already targets *"virtual world games online"* exactly; it's sitting ~page 3 on a high-volume term. The blocker is 15 THIN_CONTENT subpages (car-race, boat-race, space-race, arena-fps, world-explorer, gym, bedroom, living-room, space-station, etc.). *The stale index.html NO_DESC/NO_CANONICAL flag is already resolved* — seo-fix patched it 4 seconds after the Jun 27 audit ran. Add real depth to the room/race pages; biggest organic upside on the network.

3. **voicestry.com — wrong page for the query (genuine content gap).** 26 impressions, position 45.4, top query *"how to sight read bass clef"*. The homepage is a pitch trainer, not a sight-reading tutorial. Fix is a **hand-written sight-reading page**, not a homepage title change (which would dilute brand relevance and still not answer the query).

4. **erpise.com — high commercial intent, needs an authority page.** 45 impressions, 0 clicks, position 64.9 for *"continuing ed erp solutions"* (valuable B2B niche). Title is already matched; page-6 ranking is the constraint. A dedicated in-depth continuing-ed-ERP page is the play.

5. **aizines.com — best real performer; clear the MULTI_H1.** 45 impressions, **6 clicks** (most on the network), CTR 2.6%, position 34.3 for *"aizine"* (brand). Only blemish is one MULTI_H1 (+ one LONG_DESC) — safe *mechanical* fixes for the next seo-fix pass. Most likely site to reward attention.

## Changes Made
None. No `index.html` was edited; `script-runner.ps1` was **not** modified (auto-publish stays commented out — Step 5 is conditional on edits, and there were none).

## Flags for Manual Review

- **🔴 `Auto Publish GitHub` task dead 20 days (since Jun 30 17:53).** See banner. Root cause is the task not firing — not GSC auth. Requires a human at Task Scheduler.
- **⚠️ Restarting auto-publish also restarts `seo-fix.ps1`** — the script behind the April 2026 boilerplate incident. Run `scripts\audit-seo-boilerplate.ps1` (read-only) after the first successful publish cycle to confirm no templated content was re-injected network-wide.
- **erpise.com vs erpize.com brand collision.** erpize.com ranks position 6.2 for the query *"erpise"* (the sibling brand). Do **not** rewrite erpize's title to capture it — that cannibalizes two of your own brands. Human call on disambiguation.
- **Junk / non-target topQueries — do NOT chase these in titles:** `pacuplay138` (uptownit — offshore gambling spam, unrelated to the IT-services site), `create a total of 10 furnishings` (furnishthings — reads like in-app quest text, not search intent), `1028 game` (gameatica — likely a 2048/1024 typo), `after sql` (aitsql — fragment), `nanites ai` (aiunites — brand misspelling), `my redo` (redomy — fragment). Indexing noise, not commercial intent.
- **Content-depth backlog (creative — needs human, do NOT auto-fill):** inthisworld thin subpages (15), gameatica thin pages (50 — the incident site), cosmostheopera thin pages (14), redomy thin/low pages (11). These are the real ranking blockers; templated auto-fill is what caused the AdSense rejection.
- **uptownit.com — THIN_CONTENT on an indexed homepage.** Real structural issue; write real content, don't auto-generate filler.
- **Minor mechanical items for the next seo-fix run:** MULTI_H1 on aizines, aibyjob, redomy; LONG_DESC on aiyhwh, erpize.
- **5 sites at 0 impressions** (cloudsion, bodspas, aiyhwh, bizstry): need indexing / sitemap / links — not copy tweaks. Out of scope per Step 3.

## Next Week Focus
**Restore `Auto Publish GitHub`.** Three straight digests have now read the same June 30 photograph. Until that task fires again, every downstream item — starting with the hand-written voicestry sight-reading page and inthisworld content depth — is unmeasurable, and the July 27 digest will repeat these numbers a fourth time.
