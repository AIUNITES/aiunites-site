# AIUNITES SEO Digest — September 21, 2026

> **Data warning:** Both source files (`seo-report.json`, `gsc-stats.json`) are dated
> **Sep 7, 2026 07:22** — 14 days stale. The weekly SEO chain has not run since.
> Everything below describes the network as of Sep 7. See Flags #1.

## Summary

- Sites with GSC traction (impressions > 0): **15** of 18
- Sites with 0 impressions: **3** (bodspas.com, aiyhwh.com, bizstry.com)
- Sites with any clicks: **5** (aizines 22, inthisworld 4, voicestry 3, videobate 1, aiunites 1)
- Network totals, Aug 10 – Sep 7: **529 impressions, 31 clicks**
- Files edited this run: **0** — see "Why no copy was changed" below

## Why no copy was changed this week

Category A (impressions > 5, clicks = 0) returned 7 sites. I did not rewrite any of
their titles or descriptions, because the data says copy is not what is holding them back:

| Site | Impr | Avg position | Top query |
|------|-----:|-------------:|-----------|
| erpize.com | 51 | 61.3 | erp magazine |
| erpise.com | 25 | 59.2 | continuing ed erp solutions |
| aitsql.com | 24 | 54.9 | advanced query tool |
| gameatica.com | 22 | 58.3 | 2048 game math playground |
| aibyjob.com | 21 | 40.5 | aiby |
| redomy.com | 11 | 57.1 | reanomy |
| furnishthings.com | 9 | 75.1 | furniest |

Three reasons:

1. **Every one of them sits at average position 40–75.** That is results page 4 through 8.
   Observed CTR at that depth is ~0% regardless of how good the snippet is, because almost
   nobody scrolls there. 24 impressions at position 55 producing 0 clicks is the expected
   outcome, not a snippet failure.

2. **This has already been tried on these exact sites, and it did not work.** From the
   publish queue history in `script-runner.ps1`: aitsql.com's homepage title/meta was
   rewritten on **2026-07-27** and again on **2026-08-10**; erpize.com's on **2026-08-03**.
   Both are in the table above, still at 0 clicks, still at position 55–61, six and seven
   weeks later. A third rewrite is not a new experiment.

3. **Four of the seven top queries are misspellings of the site's own brand** — `aiby`,
   `reanomy` (likely confusion with Reonomy, an unrelated real company), `furniest`,
   and, outside this table, `clousion` and `town it`. Optimizing a title for a typo of
   your own name wins nothing. The current titles already handle the correct spelling.

Category C (position 6–15, one push from page 1) returned **zero sites**. Nothing in the
network is currently close to page 1. The only two sites above position 20 are
cloudsion.com (position 5, on 1 impression for a brand typo) and cosmostheopera.com
(position 18.5, on 2 impressions).

The homepage titles and descriptions across the network are, with the exceptions flagged
below, already well-formed: correct length, brand-relevant, keyword-bearing. They are not
the bottleneck. Indexing depth and content are.

## Top Opportunities This Week

### 1. `seo-fix.ps1` has never once run against aiunites.com — it has been fixing the private database repo for 17 straight weeks

This is the highest-value find in this digest and it is a one-line fix.

`seo-fix.ps1` line 98 resolves a domain to a repo folder by substring match:

```powershell
$repo = (Get-ChildItem $basePath -Directory |
         Where-Object { $_.Name -match ($domain.Split('.')[0]) } |
         Select-Object -First 1)
```

For `aiunites.com` the match set is `AIUNITES-database-sync`, `AIUNITES.github.io`,
`aiunites-pipeline-library`, `aiunites-site`. `Select-Object -First 1` takes the
alphabetically first: **`AIUNITES-database-sync`** — the private SQLite repo.

Confirmed in the log: `AIUNITES-database-sync` appears **17 times**, `aiunites-site`
appears **0 times**.

Consequences:

- **aiunites.com has 101 open issues — the second-worst score in the network** — and the
  auto-fixer has never touched a single one. That includes 3 pages with **no title tag at
  all** (`acp.html`, `acp-builder.html`, `googled9d9a485d256e459.html`), 4 missing
  canonicals, and 8 thin-content pages.
- The fixer is pointed at the **private credentials repo**. It found no matching HTML
  files there so it wrote nothing — but a filename collision would have written generated
  SEO markup into the database repo. Worth closing regardless.

**Fix:** replace the substring match with an explicit domain→repo hashtable. The mapping
already exists in this task's own spec and in `$siteConfig`. Any other domain whose name
prefixes a second folder has the same latent bug (`bodspas` → `bodspas-site` vs
`bodwave-site` is the next closest).

*Expected impact: unblocks the largest single pool of unfixed issues in the network, on
the flagship domain.*

### 2. The weekly pipeline has not run since Sep 7, and its last run ended in a swallowed error

`publish-log.txt` ends its Sep 7 run with:

```
[Trends] Appending weekly snapshot...
[SEO] Audit failed: You cannot call a method on a null-valued expression.
[Backup] Scripts folder backed up to GitHub
```

The throw is caught at `auto-publish.ps1:1205` and logged as a yellow warning, so the
pipeline reports success and moves on. The steps lost are the tail of the SEO block,
including `[Visibility] visibility.json updated` — and `visibility.json` is dated
**Apr 20, 2026**, five months stale. The same error appears in every weekly archive:
3× in August, 1× in July, 1× in September. It is not intermittent; that block has been
failing every cycle for months.

Separately, `auto-publish.ps1` only ever appears in the **one-shot** queue in
`script-runner.ps1`, and the runner auto-comments each entry after a successful run. The
Sep 7 entry is commented out, so nothing has re-queued it. The recurring queue holds only
`check-tls-cert-once.ps1` and `Run-SqlQueue.ps1`. That is why today's digest is running
on 14-day-old data.

*Expected impact: restores the data this digest depends on. Until it is fixed, every
weekly digest re-reads the same Sep 7 snapshot.*

### 3. `seo-fix.ps1` is not idempotent — it rewrites the same files every week

Compare the Aug 31 and Sep 7 runs. Identical file lists, identical fix types:

```
2026-08-31  FIXED index.html: GA4, Canonical, OGImage, MetaDesc, Title, Schema   (inthisworld)
2026-09-07  FIXED index.html: GA4, Schema                                        (inthisworld)
2026-08-31  FIXED bedroom.html: Title / garage.html: Title / kitchen.html: Title (redomy)
2026-09-07  FIXED bedroom.html: Title / garage.html: Title / kitchen.html: Title (redomy)
```

I verified the underlying files: `inthisworld-site/index.html` **does** contain the GA4
tag and a JSON-LD block right now, and `redomy-demo/index.html` **does** have og:image and
schema. So the fixes are landing and persisting — the *audit* is re-flagging content that
is already present, and the fixer is dutifully re-applying it. That is a detection bug in
`seo-audit.ps1`, and it means the weekly "N fixes applied" number is noise.

This matters beyond tidiness: the Aug 31 and Sep 7 queue comments both describe fixing
`WRONG_CANONICAL` on the inthisworld and aibyjob homepages, with the Sep 7 note reading
"seo-fix.ps1 re-corrupted them on Aug 31." That is the exact re-injection loop CLAUDE.md
documents for the seo-fix.ps1 incident. **Good news:** both homepage canonicals are
currently correct (`https://inthisworld.com/`, `https://aibyjob.com/`) — the Sep 7 fix
held, because seo-fix has not run since. It will likely break again on the next run.

### 4. Thin content is the actual network-wide blocker — 50 pages on Gameatica alone

Pages flagged `THIN_CONTENT` on sites that already have impressions:

| Site | Thin pages | Impr |
|------|-----------:|-----:|
| gameatica.com | 50 of 52 | 22 |
| inthisworld.com | 15 of 19 | 60 |
| cosmostheopera.com | 14 of 33 | 2 |
| aiunites.com | 8 of 29 | 12 |
| redomy.com | 7 of 15 | 11 |
| aibyjob.com | 4 of 10 | 21 |
| videobate.com | 3 of 7 | 26 |

This is why nothing ranks above position 40. It is also the substance of the AdSense
"Low value content" rejection. **This cannot be automated** — per CLAUDE.md's automation
discipline rules, templated page copy is exactly what produced the seo-fix.ps1 incident,
and re-running that play would make things worse. It needs hand-written content, a few
pages at a time, on the sites that already have impressions to lose.

### 5. aizines.com is the one real success and nobody is looking at it

22 clicks on 107 impressions at position 42.2 — a **20.6% CTR**, and 71% of the network's
total clicks, from a 3-page site with 2 open issues. Every other site combined produced
9 clicks. Whatever aizines is doing, it is the only thing in the network that is working,
and it has had no attention in any recent digest.

*Expected impact: highest ROI target on the network. Worth understanding before spending
another week on sites at position 60.*

## Changes Made

**None.** No file was edited this run.

Per Step 4's instruction to edit only where the new copy is clearly better and otherwise
flag for manual review: I could not justify a single rewrite. The category A sites are
ranking too deep for snippet copy to matter, two of them have already been rewritten for
this exact reason in the last eight weeks with no measurable change, and the majority of
their top queries are brand typos. Rewriting them would have produced a digest that looked
productive while changing nothing — which, given the history in CLAUDE.md, is the failure
mode to avoid.

Consequently Step 5 was also skipped: `auto-publish.ps1` was **not** added to the script
runner queue, since there is nothing to publish. Note that this also means the stale-data
problem in Opportunity #2 persists — if you want the pipeline re-run purely to refresh the
data, queue it manually.

## Flags for Manual Review

1. **Stale data / broken pipeline** — Opportunity #2. Everything in this digest is a
   Sep 7 snapshot. Decide whether `auto-publish.ps1` belongs in the *recurring* queue
   rather than being hand-queued each week.

2. **`seo-fix.ps1` repo resolution** — Opportunity #1. Needs a code change, not a content
   change. Check the other domains for the same prefix-collision.

3. **`seo-audit.ps1` false positives** — Opportunity #3. The GA4/Schema/Canonical
   detectors are re-flagging markup that is present in the file. Until that is fixed the
   audit scores are inflated and the weekly fix counts are meaningless.

4. **furnishthings.com makes a commercial promise it cannot keep.** Homepage meta
   description currently reads: *"Sofas, beds, dining sets, and home décor at competitive
   prices. Free delivery on orders over $500."* FurnishThings is a template/demo site with
   1 indexed page and a `shoptemplate.html`. A snippet advertising free delivery and
   pricing on a site that cannot take an order is a trust and possibly a compliance
   problem, and it is the sort of thing an AdSense reviewer notices. **I did not rewrite
   it because the right copy depends on what you intend the site to be** — a real store, a
   template demo, or a parked domain. Your call, then I can write it.

5. **uptownit.com and cloudsion.com carry the same generic-template smell** — "Professional
   IT services for businesses. Managed IT, cybersecurity, cloud solutions, and 24/7
   support" is boilerplate that could describe ten thousand sites, and uptownit's homepage
   is flagged thin. Same question as #4: are these real properties or placeholders? The
   answer changes whether they are worth any SEO spend at all.

6. **Three sites have zero impressions** — bodspas.com (2 indexed), aiyhwh.com (1),
   bizstry.com (1). These need indexing and content, not copy. Correctly excluded from
   rewrites per Step 3.

7. **The `ctr` field in `gsc-stats.json` does not match clicks÷impressions on any site.**
   Found while verifying the aizines number. Examples: aizines records `ctr: 2.5` where
   22/107 = **20.6%**; voicestry records `10.2` where 3/156 = **1.9%**; videobate records
   `0.8` where 1/26 = **3.8%**; inthisworld records `16.5` where 4/60 = **6.7%**. The
   errors run in both directions, so it is not a scale factor — `fetch-gsc-stats.ps1` is
   probably storing the CTR of the top *query* row instead of the site aggregate. Every
   CTR figure in this digest is computed from clicks and impressions directly, not read
   from that field. Worth correcting, since the field is what the core-site dashboard
   displays.

8. **gameatica.com's top query is `2048 game math playground`** — people searching for
   Math Playground's 2048, a well-established destination. Not a winnable query. Gameatica's
   22 impressions are mostly this. Do not tune for it.

## Next Week Focus

Fix the `seo-fix.ps1` repo mapping so aiunites.com's 101 issues finally enter the pipeline,
and get the weekly chain running again — until the data refreshes and the fixer points at
the right folder, no amount of snippet rewriting will change these numbers.

---
*Generated 2026-09-21 from seo-report.json and gsc-stats.json (both Sep 7, 2026).*
*Sources: `scripts/seo-fix.log`, `scripts/publish-log.txt`, `scripts/script-runner.ps1`, `scripts/seo-fix.ps1`, `scripts/auto-publish.ps1`.*
