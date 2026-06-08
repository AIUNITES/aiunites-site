# AIUNITES SEO Digest — June 8, 2026

_GSC window: 2026-05-11 to 2026-06-08 · SEO audit generated: Jun 6, 2026_

## Summary
- Sites with GSC traction (impressions > 0): 15
- Sites with 0 impressions: 3 (bodspas.com, aiyhwh.com, bizstry.com)
- Files edited this run: 2 (voicestry-site, erpise-site)
- Total network clicks this window: 11 · Total impressions: 198

## Top Opportunities This Week

1. **inthisworld.com — protect the network's biggest impression source (50 imp, 3 clk, pos 28.7).** The root homepage is clean, but its `<link rel="canonical">` points to `/rooms/` instead of itself, and the `/games/` and `/rooms/` sub-index pages are missing meta descriptions, canonicals, and have thin content. This is the highest-traffic property — fixing the sub-page meta and confirming the homepage self-canonicalizes is the single highest-leverage move. _Flagged for manual review (canonical change is structural)._

2. **erpise.com — title now matches the top query (37 imp, 0 clk, pos 48.3). [EDITED]** Highest impression count of any zero-click site. Top query "continuing ed erp systems" was absent from the title (which said "Higher Ed"). Rewrote title and meta to lead with "Continuing Ed ERP Systems." Expected impact: improved relevance for the query already driving the most impressions; may also lift position off page 5.

3. **voicestry.com — title now names the feature people search for (10 imp, 0 clk, pos 42.7). [EDITED]** Top query "pitch trainer" appeared only in the meta description, never the title. Rewrote title to "Free Online Pitch Trainer & Voice Coach." The pitch-trainer feature genuinely exists, so this is an accurate relevance gain.

4. **cosmostheopera.com — page-1 ranking, zero clicks (7 imp, 0 clk, pos 6.3).** Best-positioned zero-click site in the network. Title and meta already match the "cosmo opera" query, so this is a CTR problem, not a relevance one. Worth an A/B-style title test (more benefit-driven hook) rather than an automated edit. _Flagged._

5. **erpize.com — page-1 ranking on a sister-brand query (8 imp, 0 clk, pos 8.0).** Ranks well, but its top query is "erpise" — the sister site's brand name. Capturing those clicks would mean hijacking erpise.com's brand traffic, so this needs a human call on positioning, not a copy tweak. _Flagged._

## Changes Made

**voicestry.com** (`voicestry-site/index.html`)
- Title: `VoiceStry — Train Your Voice Like You Train Your Body` → `VoiceStry — Free Online Pitch Trainer & Voice Coach`
- Desc: `Your voice has 5 gears and 6 resonance zones — and you've never trained any of them. Free lessons, pitch trainer, and the VRN Method. No signup required.` → `Train your voice with VoiceStry's free online pitch trainer — 5 vocal gears, 6 resonance zones, and the VRN Method. No signup, start improving today.`

**erpise.com** (`erpise-site/index.html`)
- Title: `Education ERP Consulting — Higher Ed SIS Experts | ERPise` → `Continuing Ed ERP Systems & SIS Consulting | ERPise`
- Desc: `Education ERP consulting for higher ed — Jenzabar, Banner, SIS, SQL reporting, and IPEDS compliance. Trusted by colleges for data modernization.` → `ERP consulting for continuing education and higher ed — Banner, Jenzabar, SIS, SQL reporting, and IPEDS compliance. Modernize your student data systems.`

Publish queued: uncommented `auto-publish.ps1` in `scripts/script-runner.ps1` (one-shot queue; auto-comments after the next ~10-min cycle).

## Flags for Manual Review

- **aiunites.com (8 imp, 0 clk, pos 75.5, query "ai consulting okc"):** The homepage targets "Tulsa," but the top query is for Oklahoma City (OKC). Retargeting geo is a business decision, not a copy tweak — left unchanged. Decide whether the business serves OKC before editing.
- **inthisworld.com canonical:** Homepage canonical points to `/rooms/`. If `/` should rank in its own right, this should self-canonicalize. Sub-index pages (`/games/`, `/rooms/`) need meta descriptions + canonicals.
- **gameatica.com (14 imp, 0 clk, pos 62.6, query "2048 game math playground"):** Query is game-specific; the homepage won't satisfy it. The 2048 game page itself needs the title/content work, not the homepage. ~49 game pages still flagged THIN_CONTENT.
- **furnishthings.com (8 imp, 0 clk, pos 72.7):** Homepage flagged LOW_CONTENT (~254 words) and ranks deep. Needs content depth before copy tweaks will matter.
- **cosmostheopera.com & erpize.com:** See opportunities #4 and #5 — CTR test and brand-positioning call respectively.
- **Thin content remains widespread** (gameatica, inthisworld, redomy, cosmostheopera sub-pages). Mechanical title fixes won't resolve it; these need real content or `noindex` on utility pages.

## Next Week Focus
Fix inthisworld.com's homepage canonical and the missing meta/canonical on its `/games/` and `/rooms/` sub-pages — it carries 50 impressions, far more than any other property, and is being held back by structural issues rather than copy.
