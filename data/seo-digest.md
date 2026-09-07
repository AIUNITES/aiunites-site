# AIUNITES SEO Digest — Sep 7, 2026

*Data window: GSC 2026-08-03 → 2026-08-31 · Audit generated 2026-08-31 07:22*
*Source data is 7 days old and **fresh** — the pipeline unblocked. Last week's queue fix worked: `auto-publish.ps1` ran, the SEO chain regenerated `seo-report.json`, `gsc-stats.json` and `page-rank.json` for the first time since Aug 10.*

## Summary

- Sites with GSC traction (impressions > 0): **15**
- Sites with 0 impressions: **3** (bodspas, aiyhwh, bizstry — see note below, aiyhwh is a reporting artifact)
- Pages ranked in top 10: **22 of 77** · top 50: **58 of 77** · zero pages with no impressions
- Files edited this run: **6** + `scripts/script-runner.ps1`

**Headline: the two homepage canonical defects fixed last week were re-broken by `seo-fix.ps1` eight minutes later, on the same run.** Both are fixed again, and this time the root cause has been defused at the data layer rather than just patched.

---

## Top Opportunities This Week

### 1. `seo-fix.ps1` re-corrupted both homepages it was fixed for last week — FIXED, and the loop is now broken

Timeline from Aug 31, reconstructed from file mtimes and `scripts/seo-fix.log`:

```
07:14  seo-digest.md written — canonicals corrected on inthisworld + aibyjob homepages
07:22  auto-publish.ps1 runs the weekly SEO chain
07:22:30  seo-fix.ps1: "FIXED index.html: GA4, Canonical, OGImage, MetaDesc, Title, Schema"  (inthisworld, twice)
07:22:31  seo-fix.ps1: "FIXED index.html: OGImage, Schema"                                   (redomy)
```

State of the files as found today, before this run:

```html
inthisworld-site/index.html:74  <link rel="canonical" href="https://inthisworld.com/rooms/"></head>
aibyjob-demo/index.html:74      <link rel="canonical" href="https://aibyjob.com/agents/templates/"></head>
```

Identical to the tags removed last week, jammed against `</head>` — the fixer's append signature. The fix survived eight minutes.

**Why it happens.** `seo-fix.ps1` line 118:

```powershell
$found = Get-ChildItem $repoPath -Filter $pg.file -Recurse | Select-Object -First 1
```

`seo-audit.ps1` records `$pg.file` as the bare leaf name. InThisWorld has **three** audited pages whose `file` is literally `index.html` — `/`, `/games/`, `/rooms/` — distinguishable only by their `url` field, which the fixer ignores. The recursive lookup resolves all three to the root `index.html`, so the fixer writes each subpage's canonical, title and description into the homepage in turn. Last one processed wins; `/rooms/` sorts last. That is the whole bug, and it explains the doubled `FIXED index.html` line in the log.

**What was done about it.** Re-fixing the canonical alone would have bought another eight minutes. The fixer only writes a canonical when the audit reports `NO_CANONICAL` for that page, so the durable fix is to give the subpages their own correct canonicals — then the branch never fires and the homepage is never touched by it. Canonical, description, og tags and a real title were added to all three offending subpages (below). On the next audit those pages come back clean of `NO_CANONICAL`, `NO_DESC`, `SHORT_TITLE` and `NO_OG_IMAGE`, and the destructive branches of the fixer have nothing to fire on.

The audit runs *before* the fixer in `auto-publish.ps1` and `seo-report.json` is now 7 days old, so the next cycle will re-audit from the corrected files. The loop should close on its own.

*Residual risk:* the subpages still carry `THIN_CONTENT` / `LOW_CONTENT` / `NO_SCHEMA` / `NO_GA4`, so the fixer will still resolve them onto the root file and append schema and GA4 tags there. Those are site-level constants and `Add-ToHead` is marker-guarded, so the contamination is benign — the same tags the homepage already has. The `THIN_CONTENT` branch that caused the April boilerplate incident is still correctly commented out at line 186. Line 118 remains the real bug and still wants a supervised fix.

*Expected impact:* restores the homepage as the indexable target on the network's highest-impression site (InThisWorld, 1,228 impressions) and its second-best-positioned one (AIByJob, position 30.4).

### 2. `inthisworld.com/rooms/` — 14 impressions at position 20 with no meta description — FIXED

The page the homepage was wrongly pointing at is itself a legitimate opportunity: page two of the SERP, and Google has been synthesising its snippet from the page body because there was no `<meta name="description">` at all. Title was `3D Rooms — InThisWorld` (22 chars, flagged `SHORT_TITLE`).

Same treatment applied to `/games/` (`NO_DESC`, `SHORT_TITLE`, `LOW_CONTENT`, 17 impressions on its top child page).

### 3. `aiyhwh.com/` — position 8.6, 9 impressions, zero clicks, description truncating in the SERP — FIXED

The only page-one result on the network earning no clicks at all. Its meta description was **171 characters** — Google cuts at roughly 155, so the snippet was ending mid-phrase on "deeper meanings in Script…". Trimmed to 148 characters with the value proposition moved to the front and a clear close.

Note the data conflict: `gsc-stats.json` reports aiyhwh.com at **0 impressions**, while `page-rank.json` reports **9 impressions at position 8.6** for the same 2026-08-03 → 2026-08-31 window. See Flags.

### 4. VoiceStry has a page-two cluster worth more than any homepage rewrite — NOT ACTIONED

Six pages, all zero clicks, all within striking distance:

| Page | Impressions | Position |
|------|------------:|---------:|
| `ai-vrn.html` | 23 | 12.7 |
| `vocal-gym.html` | 23 | 16.9 |
| `vrn-method.html` | 23 | 21.7 |
| `5-gears.html` | 23 | 24.2 |
| `voice-lab.html` | 23 | 29.6 |
| `learn.html` | 29 | 31.8 |

That is ~144 impressions sitting at positions 12–32 converting nothing, against a site homepage that pulls 916 impressions at position 56.8 for 9 clicks. The leverage is on the interior pages, not the homepage — and `pitch-trainer.html` (215 impressions, position 17.6, 5 clicks) proves the pages can convert when the copy matches the query.

Not actioned because this task's remit is `index.html` files, and six interior-page rewrites is a content decision that deserves a look at the live SERP snippets first. Flagged below.

### 5. `videobate.com/compare.html` — position 3.6, zero clicks — NOT ACTIONED

The sharpest CTR anomaly on the network: a top-four result with 7 impressions and no clicks. Sample is small enough that this could be noise, but position 3.6 with a 0% CTR normally means the title reads as irrelevant to the query that surfaced it. Worth one manual look at what query is triggering it before touching the copy. `leaderboard.html` (10 impressions, position 13.2, zero clicks) is the same shape.

---

## Changes Made

| File | Change |
|------|--------|
| `inthisworld-site/index.html` | canonical `https://inthisworld.com/rooms/` → `https://inthisworld.com/` |
| `aibyjob-demo/index.html` | canonical `https://aibyjob.com/agents/templates/` → `https://aibyjob.com/` |
| `inthisworld-site/rooms/index.html` | title, meta description, canonical, og:title/description/url/image added |
| `inthisworld-site/games/index.html` | title, meta description, canonical, og:title/description/url/image added |
| `aibyjob-demo/agents/templates/index.html` | title lengthened, canonical + og tags added |
| `aiyhwh-site/index.html` | meta description 171 → 148 chars |
| `scripts/script-runner.ps1` | `auto-publish.ps1` uncommented in the one-shot queue |

**Copy detail:**

`inthisworld.com/rooms/`
- Title: `3D Rooms — InThisWorld` (22) → `3D Chat Rooms Online — Free Virtual Hangouts | InThisWorld` (58)
- Desc: *(none)* → `Explore free 3D chat rooms in your browser — living room, bedroom, gym and a space station lounge. No download, no signup. Just pick a room and walk in.` (152)

`inthisworld.com/games/`
- Title: `Games — InThisWorld` (19) → `Free 3D Browser Games Online — Play Instantly | InThisWorld` (59)
- Desc: *(none)* → `Play free 3D browser games — Space Trader, World Explorer, Arena FPS, Night Circuit and more. Runs instantly in your browser, no download and no signup.` (151)

`aibyjob.com/agents/templates/`
- Title: `Agent Templates | AIByJob` (25) → `AI Agent Templates for Business Automation | AIByJob` (52)
- Desc: unchanged (128 chars, already fine)

`aiyhwh.com/`
- Title: unchanged (`AI YHWH - AI-Powered Biblical Discoveries & Insights`, 52 chars, fine)
- Desc: `Explore the Bible like never before with AI-powered insights. Discover hidden patterns, cross-references, and deeper meanings in Scripture through artificial intelligence.` (171, truncates)
  → `Explore the Bible with AI-powered insights — discover hidden patterns, cross-references, and deeper meaning in Scripture. Free to search, no signup.` (148)

Every page name in the new descriptions was taken from the actual `<h3>` headings on those pages. No generated filler, no boilerplate template, nothing reused across sites — per the automation discipline rules in `CLAUDE.md`.

---

## Deliberately Not Done

**No homepage title rewrites this week, for eight sites that a naive read of the brief would have flagged.** Their `topQuery` values are navigational typos of other companies' brands or of their own:

| Site | topQuery | Position | Verdict |
|------|----------|---------:|---------|
| erpize.com | `enerpize` | 49.8 | Enerpize is a real competing ERP vendor |
| redomy.com | `reanomy` | 58.3 | Reonomy is a real company |
| furnishthings.com | `furniest` | 67.2 | typo, no intent |
| cloudsion.com | `clousion` | 47.0 | typo of own brand |
| uptownit.com | `town it` | 81.0 | fragment |
| aitsql.com | `advanced query tool` | 58.6 | "Advanced Query Tool" is a competitor's product name |
| gameatica.com | `2048 game math playground` | 57.8 | Math Playground is another site's brand |
| erpise.com | `continuing ed erp solutions` | 59.5 | genuine query, but already in the title verbatim |

Two reasons to leave these alone. First, positions 47–81 are SERP pages 5–9; at that depth CTR copy has no leverage, because nobody is seeing the snippet. Second, rewriting a title to rank for another company's brand name is keyword squatting — ineffective and reputationally risky for a network already carrying an AdSense "low value content" rejection.

These homepages have also already been rewritten repeatedly by prior digests — aitsql twice (Jul 27, Aug 10), erpize (Aug 3), cosmos (Jun 22), voicestry (Aug 10) — with no position movement. **The homepage copy lever is exhausted.** Further rewrites are churn, not work.

---

## Flags for Manual Review

1. **`seo-fix.ps1` line 118 still needs the supervised patch.** The data-layer defusal above should hold, but the bug is live and will bite the next page that gets flagged `NO_CANONICAL` in a subdirectory. The fix is one line — resolve by URL path rather than by recursive filename search:

   ```powershell
   # current (line 118):
   $found = Get-ChildItem $repoPath -Filter $pg.file -Recurse | Select-Object -First 1

   # correct: derive the relative path from $pg.url, not the leaf filename
   $rel = ([uri]$pg.url).AbsolutePath.TrimStart('/')
   if ($rel -eq '' -or $rel.EndsWith('/')) { $rel += 'index.html' }
   $absPath = Join-Path $repoPath ($rel -replace '/', '\')
   ```

   Needs a dry run against all 18 repos before it goes near the scheduler. Per `CLAUDE.md`, modifying a scheduled script unattended is out of remit for this task.

2. **`gsc-stats.json` and `page-rank.json` disagree, materially.** Same date range, different numbers. gsc-stats has voicestry.com at 170 impressions; page-rank sums voicestry pages to ~1,400. gsc-stats has aiyhwh.com at 0 impressions; page-rank has its homepage at 9 impressions, position 8.6. gsc-stats appears to be capturing a single query row rather than the domain total. Since `gsc-stats.json` is what the dashboard renders and what step 2 of this digest is nominally built on, the site-level view is understating the network by roughly an order of magnitude. Worth checking `fetch-gsc-stats.ps1`'s aggregation before any decision gets made off those numbers. **This digest's analysis is based on `page-rank.json`.**

3. **`[SEO] Audit failed: You cannot call a method on a null-valued expression.`** appears in `publish-log.txt` after a successful audit earlier in the same log. The Aug 31 data did land, so this is not currently blocking, but an unhandled null in `seo-audit.ps1` is how the next silent staleness starts.

4. **VoiceStry interior pages** (opportunity 4) — six pages at positions 12–32 with zero clicks. Highest-value copy work available anywhere on the network. Needs a human to look at live SERP snippets against the actual queries first.

5. **`videobate.com/compare.html`** at position 3.6 with 0% CTR — check which query is surfacing it before rewriting anything.

6. **Gameatica remains the network's worst audit score (202 across 52 pages: 50 × `THIN_CONTENT`, 49 × `LONG_DESC`)** and pulls 207 impressions on `games/simon.html` alone with zero clicks at position 46.8. This is a content-depth problem, not a meta-tag problem, and it is the site the AdSense rejection was about. No automated fix should touch it.

---

## Next Week Focus

Patch `seo-fix.ps1` line 118 in a supervised session with a dry run — until the fixer stops writing subpage metadata into homepages, every digest is spending its budget cleaning up after the automation instead of improving the network.
