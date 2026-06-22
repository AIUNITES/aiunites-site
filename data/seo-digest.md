# AIUNITES SEO Digest — 2026-06-22

*GSC window: 2026-05-24 → 2026-06-21 · Audit generated: 2026-06-20*

## Summary
- Sites with GSC traction (impressions > 0): **15** of 18
- Sites with 0 impressions (need indexing, not copy): **3** — bodspas.com, aiyhwh.com, bizstry.com
- Files edited this run: **1** — cosmostheopera.com (homepage title + meta description)
- Network impressions this window: **285** · clicks: **11** · network CTR ≈ 3.9%

## Top Opportunities This Week

1. **cosmostheopera.com — ranking page 1, earning zero clicks (FIXED).**
   Position **5.4**, 7 impressions, 0 clicks for query "cosmo opera." This is the only category-A site already on page 1, so the snippet — not ranking — is the lever. The old title ("Personified Cosmic Beings") was abstract and gave a searcher no reason to click. Rewrote the title and meta description to be concrete and action-oriented (see Changes Made). Highest-leverage copy fix of the week because the click is there to be won.

2. **erpise.com — biggest demand signal in the network, but position-locked.**
   **49 impressions** (highest in category A), 0 clicks, position **58.9** for "continuing ed erp solutions." The title already matches the query well ("Continuing Ed ERP Systems & SIS Consulting"). At page-6 ranking, no title tweak earns a click — this is a content-depth / authority problem, not a copy problem. 49 impressions proves real demand; this domain is the best target for a genuine content investment (a substantive Continuing-Ed ERP / SIS resource page), not a meta rewrite. **Flagged, not edited.**

3. **voicestry.com — ranking for an off-brand query.**
   23 impressions, 0 clicks, position 41.1 for "lovetri method." The site targets its own "VRN Method"; "LoVetri Method" is a specific third-party vocal pedagogy. Stuffing a competitor's trademarked method name into the homepage title would be off-brand and low-quality. **Flagged for human judgment** — only worth targeting if VoiceStry genuinely publishes LoVetri / Somatic-Voicework content.

4. **aizines.com — the network's quiet winner; protect it.**
   29 impressions, **4 clicks**, position 10.5 for "aizine" — best CTR-to-position ratio of any site with volume. It's one spot off page 1. No copy change needed; the push here is a few more internal links / a bit more content depth to nudge position 10.5 → top 8. Minor MULTI_H1 issue on the homepage worth cleaning.

5. **uptownit.com — page-1 position wasted by thin content + a spam query.**
   Position **7.4**, 7 impressions, but topQuery is "pacuplay138" (gambling-spam pattern, not real intent) and the homepage carries a **THIN_CONTENT** flag. The good position is meaningless against a junk query and a thin page. **Flagged** — investigate the spam query (possible scraper / spam indexing) and thicken the homepage before any copy work.

## Changes Made

**cosmostheopera.com — `index.html`** (title, meta description, og:title, og:description, twitter:title, twitter:description all updated for consistency)

| Field | Old | New |
|-------|-----|-----|
| Title | `COSMOS the OPERA - Personified Cosmic Beings` (44 chars) | `COSMOS the OPERA — A Cosmic Trance Opera in Space & Sound` (57 chars) |
| Description | `A trance opera with personified cosmic beings — the Sun, Twin, Light, Universe — singing across space and time. Hubble imagery and Vocal Resonance Notation.` | `Experience COSMOS the OPERA — a trance opera where the Sun, Twin, Light and Universe sing across space and time. Watch, listen, and explore the cosmos.` (151 chars) |

Keeps the "COSMOS the OPERA" exact-match for the "cosmo opera" query, adds action verbs (Experience / Watch / listen / explore), and ends on a benefit. Queued for publish via `script-runner.ps1` (auto-publish entry activated for 2026-06-22).

## Flags for Manual Review
- **erpise.com (49 imp, pos 59):** highest-demand domain in the network — invest in a real Continuing-Ed ERP / SIS content page to move position; copy is already fine.
- **voicestry.com (23 imp):** ranks for third-party "lovetri method" — decide whether that's an on-brand target before writing copy for it. Do not auto-target.
- **uptownit.com (pos 7.4):** spam topQuery "pacuplay138" + THIN_CONTENT — check for spam / scraper indexing and thicken the homepage.
- **furnishthings.com (11 imp, pos 75):** topQuery "create a total of 10 furnishings" looks like leaked/AI-prompt text, not real search intent; homepage flagged LOW_CONTENT. Needs content, not copy.
- **gameatica.com (23 imp, pos 62) & aitsql.com (21 imp, pos 66):** strong impression counts but page-6/7 positions; queries reference a competitor brand ("math playground") and an ambiguous term ("after sql"). Titles already match available intent — position is the blocker.
- **erpize.com vs erpise.com:** erpize ranks for "erpise" (sister-brand confusion). Consider clearer brand differentiation across the two sites.
- **Minor MULTI_H1** on aibyjob, aizines, redomy homepages — quick mechanical cleanup for seo-fix.ps1.

## Next Week Focus
Build one substantive content page for **erpise.com** (Continuing-Ed ERP / SIS) — it has the network's strongest proven demand (49 impressions) and is held back only by ranking depth, which copy tweaks can't fix.
