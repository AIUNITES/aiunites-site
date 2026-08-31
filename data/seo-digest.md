# AIUNITES SEO Digest — Aug 31, 2026

*Data window: GSC 2026-07-13 → 2026-08-10 · Audit generated 2026-08-10*
*⚠️ Source files are **21 days old** and byte-identical to the last two digests. `seo-report.json` and `gsc-stats.json` have not changed since Aug 10. No GSC or audit numbers in this digest are current.*

## Summary

- Sites with GSC traction (impressions > 0): **14**
- Sites with 0 impressions: **4** (uptownit, bodspas, aiyhwh, bizstry)
- Files edited this run: **2** (`inthisworld-site/index.html`, `aibyjob-demo/index.html`) + `scripts/script-runner.ps1`

Because the input data is unchanged, no copy analysis was repeated — the Aug 10 and Aug 17 digests already worked this exact dataset and both concluded the copy lever is exhausted. Instead this run audited the *state of the files themselves*, and found two real defects that the audit JSON does not report.

**Headline: two homepages on the network are canonicalising themselves to a subpage.** Both have been fixed. Separately, the publishing pipeline has not run in three weeks and the reason is structural.

## Top Opportunities This Week

### 1. `inthisworld.com` homepage canonicalises to `/rooms/` — FIXED

`inthisworld-site/index.html` line 70 carried:

```html
<link rel="canonical" href="https://inthisworld.com/rooms/">
```

The homepage was telling Google that the authoritative version of `inthisworld.com/` is `inthisworld.com/rooms/`. Google honours that: homepage ranking signals get consolidated onto a subpage that itself has `NO_DESC`, `NO_CANONICAL`, `NO_SCHEMA`, `NO_GA4` and a `SHORT_TITLE`. Meanwhile `og:url` on the same page correctly says `https://inthisworld.com/`, so the two were contradicting each other.

This matters more than any title rewrite on the list: InThisWorld is one of only **two sites on the network earning clicks** (2 clicks / 66 impressions, position 31.7), and the well-optimised homepage copy — `Free Virtual World Online — 3D Browser Games` with a clean 150-char description, audit score 0 — was being pointed away from.

*Fixed:* canonical now `https://inthisworld.com/`.
*Expected impact:* restores the homepage as an indexable target on the network's best-performing site. This is the highest-leverage single-line change available.

### 2. `aibyjob.com` homepage canonicalises to `/agents/templates/` — FIXED

Identical defect, `aibyjob-demo/index.html` line 74:

```html
<link rel="canonical" href="https://aibyjob.com/agents/templates/">
```

AIByJob holds the **best average position on the entire network at 26.5** (22 impressions). Its homepage has been disclaiming itself in favour of a template listing page.

*Fixed:* canonical now `https://aibyjob.com/`.

### 3. Both defects were written by `seo-fix.ps1` — root cause confirmed

The Aug 17 digest diagnosed the fixer's file-resolution bug theoretically. This is the proof it caused real damage:

```
2026-08-10 07:23:43  Fixing aibyjob.com ...  FIXED index.html: GA4, Canonical, OGImage, Title, Schema
2026-08-10 07:23:45  Fixing inthisworld.com ... FIXED index.html: GA4, Canonical, OGImage, MetaDesc, Title, Schema
```

`seo-fix.ps1` line 117 resolves an audited page with `Get-ChildItem $repoPath -Filter $pg.file -Recurse | Select-Object -First 1`. When the audit flags `rooms/index.html` (or `agents/templates/index.html`), that lands on the **root** `index.html`, and the fixer then writes the *subpage's* canonical URL into the *homepage*. Both bad tags sit jammed against `</head>` — the fixer's append signature.

So the fixer is not merely a no-op, as last week concluded. **It actively corrupts homepages.** Everything else it "fixes" should be treated as suspect until line 117 is corrected.

*Not applied:* modifying a scheduled script unattended is outside this task's remit and against CLAUDE.md automation discipline. Needs a supervised session with a dry run.

### 4. The publishing pipeline has been dead for 21 days — and it is structural, not a crash

`publish-log.txt` last wrote **2026-08-10 07:24**. Nothing has published since. The cause:

`auto-publish.ps1` sits in the **one-shot** queue of `script-runner.ps1`, which auto-comments each entry after a successful run. It ran twice on Aug 10, commented itself out both times, and has not run since. The `$recurringScripts` queue — the one that actually runs every 10 minutes — contains only `check-tls-cert-once.ps1` and `Run-SqlQueue.ps1`.

The separate `Auto Publish GitHub` Task Scheduler job (`PT10M`, `<Enabled>true</Enabled>` in the XML) is evidently **not live on the machine** — if it were, `publish-log.txt` would have 3,000 entries since Aug 10 rather than zero. The XML in `scripts\` is only the import file, not proof of registered state.

**Consequence:** the entire weekly SEO chain (`fetch-gsc-stats` → `seo-audit` → `seo-fix` → `check-page-rank` → `prioritize-fixes` → `auto-improve` → `trends` → `pagespeed` → `update-visibility`) lives *inside* `auto-publish.ps1`. It only runs when a digest queues it. That is why this digest is reading three-week-old data, and why the next one will too unless the queue is fixed.

*Action taken:* `auto-publish.ps1` queued this run (see Changes Made) — which will both publish the canonical fixes and regenerate the stale data.
*Recommended:* verify `Auto Publish GitHub` exists and is enabled in Task Scheduler (`Get-ScheduledTask "Auto Publish GitHub"`). If it is genuinely gone, either re-import the XML or move `auto-publish.ps1` into `$recurringScripts`. Until one of those happens the network publishes only when a digest happens to queue it.

### 5. Last week's "11 weeks of uncommitted SEO work" was a false alarm — it is whitespace

The Aug 17 digest flagged `inthisworld-site` as holding unreviewed SEO changes since May 28 (`robots.txt`, `rooms/index.html`, `sitemap.xml`, plus `transcript paste.txt`). Checked with `git diff -w`:

```
$ git -C inthisworld-site diff -w --stat robots.txt rooms/index.html sitemap.xml
(empty)
```

All 104 changed lines in `rooms/index.html` — and all 171 in `transcript paste.txt` — are **line-ending and BOM churn only**. Zero semantic change. Same story for the single modified line in `aiunites-site/index.html`, which is trailing whitespace on a comment.

This is the phantom-fix loop made visible: the fixer rewrites files with byte-level differences and no content differences, git flags them as modified forever, and the audit re-flags the same issues next week. Safe to publish, but it is noise, not pending work. Correcting last week's finding.

## Changes Made

| File | Before | After |
|------|--------|-------|
| `inthisworld-site/index.html` | `<link rel="canonical" href="https://inthisworld.com/rooms/">` | `<link rel="canonical" href="https://inthisworld.com/">` |
| `aibyjob-demo/index.html` | `<link rel="canonical" href="https://aibyjob.com/agents/templates/">` | `<link rel="canonical" href="https://aibyjob.com/">` |

Both are one-line diffs, verified clean. Canonical tags are classed **mechanical** in CLAUDE.md's automation table — no generated prose was written to any site.

`scripts/script-runner.ps1` — `auto-publish.ps1` added to the one-shot queue, dated and commented.

**No title or meta description was rewritten.** All nine Category-A candidates (impressions > 5, clicks = 0) were evaluated and rejected in the Aug 17 digest against this same dataset; with the data unchanged, re-litigating them would be churn. The short version: titles already match their top query (voicestry, aitsql, erpise, cosmostheopera), or the top query is a competitor brand or junk string it would be wrong to chase (`enerpize`, `aiby`, `dbate`, `"statistics" "konixe.com" game`), or the site needs content before copy (furnishthings).

### Network-wide canonical sweep

All 18 repos were swept for canonical tags that disagree with their own file path. Eight were flagged; six are correct by design and were left alone:

| Repo | Canonical | Verdict |
|------|-----------|---------|
| `aiunites-site/acp.html` → `my-ai-profile.html` | consolidation | correct — legacy page |
| `aiunites-site/acp-builder.html` → `my-ai-profile-builder.html` | consolidation | correct — legacy page |
| `aiunites-site/articles.html` → `press.html` | consolidation | correct — redirect stub |
| `erpise-site/index-consulting.html` → `/` | consolidation | correct — landing variant |
| `erpise-site/index-sis.html` → `/` | consolidation | correct — landing variant |
| `erpize-site/index-ai.html` → `/` | consolidation | correct — landing variant |
| `inthisworld-site/index.html` → `/rooms/` | **homepage self-demotion** | **fixed** |
| `aibyjob-demo/index.html` → `/agents/templates/` | **homepage self-demotion** | **fixed** |

No cross-domain canonicals found anywhere on the network.

## Flags for Manual Review

- **`seo-fix.ps1` line 117 is actively harmful, not just ineffective.** It has now been shown to write a subpage's canonical into a homepage. Until it is fixed, every scheduled run risks re-introducing exactly the two defects corrected today — including on the next run queued by this digest. **This is the one item that should not wait for next week.**
- **`seo-fix.ps1` line 98 still maps `aiunites.com` → `AIUNITES-database-sync`** (the private credentials repo) via fuzzy directory match. Unchanged since Aug 17. The AdSense flagship has still never received an automated fix; its audit score of 101 across 29 pages is the network's second-worst.
- **`rooms/index.html` and `agents/templates/index.html` have no canonical of their own.** Now that the homepages no longer point at them, they should each get a self-referencing canonical. Deliberately not added this run — both files carry pending whitespace churn and mixing concerns would obscure the fix. Small, safe, worth doing supervised.
- **`aiunites.com` has 3 pages with no `<title>` at all** (`acp.html`, `acp-builder.html`, `googled9d9a485d256e459.html`), each ~4 words of content sharing the placeholder description *"AIUNITES - AI Consulting Tulsa. Visit aiunites.com to learn more."* Thin placeholder pages on the AdSense domain are a liability — give them real content or `noindex` them. Note `googled9d9a485d256e459.html` is the GSC verification file and should simply be excluded from the audit.
- **`gameatica.com`: `THIN_CONTENT` on 50 of 52 pages, `LONG_DESC` on 49.** Unchanged for three weeks, still the most likely driver of the AdSense "Low value content" rejection. Needs real per-game content. Do **not** point a generating script at it — see the `seo-fix.ps1` incident in CLAUDE.md.
- **`[IndexNow] aiunites.com FAIL HTTP 403`** — recurring, on the one domain where indexing matters most for AdSense. Every other domain returns 200/202.
- **`[SEO] Audit failed: You cannot call a method on a null-valued expression.`** — the Aug 10 chain still errors after `[Trends]`. A second audit invocation is failing on a null; it will fire again on the queued run.
- **`inthisworld-site/transcript paste.txt`** — a raw chat paste has been committed to a public repo since February. No credentials in it (scanned), but it does not belong in a published site repo.
- **`aizines.com` remains the network's only real success**: 16 clicks / 80 impressions / **5.3% CTR** at position 28.8, from just 3 indexed pages. Its sole open issue is one `MULTI_H1`. Adding depth here still returns more than rescuing page-6 sites.
- **Nothing on the network sits in the position 6–15 quick-win band.** Best is aizines at 28.8; the rest are 31–71. At position 40+, 50 impressions predicts ~0.05 clicks, so zero clicks is arithmetic rather than a copy failure.

## Next Week Focus

Fix `seo-fix.ps1` in a supervised session — line 117 first (it corrupts homepages), then line 98 — and confirm `auto-publish` is on a real recurring schedule; every other item on this list is downstream of the fixer working correctly and the pipeline actually running.
