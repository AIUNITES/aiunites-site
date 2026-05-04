# AIUNITES SEO Digest — May 4, 2026

## Summary
- Sites with GSC traction (impressions > 0): 8
- Sites with 0 impressions: 10
- Files edited this run: 4
- Sites flagged for manual review: 3

## Top Opportunities This Week

### 1. aiunites.com — 26 impressions, 0 clicks, position 18.8 (HIGHEST IMPACT)
Top query: "ai consulting oklahoma". Site was ranking on page 2 with a title that said "Tulsa, OK" — Oklahomans searching for "AI consulting Oklahoma" saw the result but the meta description ran 236 chars (truncated in SERPs) and led with abstract phrases ("open standards for human movement notation") that don't match buyer intent. **Fixed.** Tightened title to lead with "AI Consulting Oklahoma" and rewrote desc to be benefit-oriented (custom agents, workflow automation, free initial consult). Expected impact: 1-2 position improvement and first organic clicks within 2-4 weeks.

### 2. inthisworld.com — 6 impressions, 0 clicks, position 2.5 (QUICK WIN)
Top query: "inthisworld" (brand name). Already at position #2-3 but title was 77 chars — getting truncated mid-phrase in SERPs ("...Space Trader, FPS Aren..."). **Fixed.** Cut title from 77 to 52 chars and tightened desc from 174 to 145 chars. At position 2.5 a clean title should yield clicks immediately.

### 3. erpise.com — 10 impressions, 0 clicks, position 21.2 (NEEDS CONTENT)
Top query: "erpise" (brand name) but ranking on page 3 for it. Likely losing the brand-name battle to erpize.com (similar domain, same query). **Fixed meta** — trimmed desc from 197 to 146 chars. But the real fix is content depth and disambiguating from erpize.com. Flagged for manual review.

### 4. redomy.com — 11 impressions, 0 clicks, position 2.2 (TITLE REORDERING)
Top query: "redo my". Already at position #2 but no clicks suggests the title's "Redomy —" prefix isn't recognized as relevant when users search "redo my [room]". **Fixed.** Reordered title to lead with "Redo My Home in 3D" so the search query appears verbatim in the result. Brand "Redomy" moved to end. Expected: meaningful CTR jump given pos 2.2.

### 5. aizines.com — 10 impressions, 1 click (10% CTR), position 4.5 (HEALTHY)
Top query: "aizine". Already converting at 10% CTR. MULTI_H1 issue (5 H1 tags) is the only structural concern but is not blocking traffic. Leave alone — don't fix what's working. Flagged for H1 cleanup as low-priority maintenance.

## Changes Made

### aiunites-site/index.html
- **Old title** (60 chars): `AI Consulting Tulsa, OK | AI Integration Services | AIUNITES`
- **New title** (54 chars): `AI Consulting Oklahoma | AIUNITES — Tulsa AI Integration`
- **Old desc** (236 chars, LONG_DESC): `Tulsa AI consulting firm building open standards for human movement notation, middleware-driven web apps, and fitness data ownership. Read our articles on engineering, interoperability, and the AIUNITES network of 18 connected products.`
- **New desc** (141 chars): `AI consulting in Oklahoma — practical AI integration, custom agents, and workflow automation for Tulsa-area businesses. Free initial consult.`

### redomy-demo/index.html
- **Old title** (58 chars): `Redomy — Redo My Home in 3D | AI Room Visualizer & Planner`
- **New title** (52 chars): `Redo My Home in 3D — AI Renovation Planner | Redomy`
- **Old desc** (146 chars): `Redo my kitchen, bedroom, or backyard — upload a photo and walk your room in 3D. AI renovation ideas, budgets, and project tracking. Free to try.`
- **New desc** (147 chars): `Redo my kitchen, bedroom, or backyard — upload a photo, walk your room in 3D, and get AI renovation ideas with budgets and tracking. Free to try.`

### erpise-site/index.html
- **Old title** (60 chars): `ERPise - ERP & SIS Consulting | Higher Education Solutions`
- **New title** (51 chars): `ERPise — ERP & SIS Consulting for Higher Education`
- **Old desc** (197 chars, LONG_DESC): `Expert ERP and Student Information System consulting for higher education. SQL reporting, IPEDS compliance, database optimization, and SIS integration. Transform your institution's data management.`
- **New desc** (144 chars): `ERPise — expert ERP and Student Information System consulting for higher education. SQL reporting, IPEDS compliance, and database optimization.`

### inthisworld-site/index.html
- **Old title** (77 chars, LONG_TITLE): `InThisWorld - Free 3D Browser Games | Space Trader, FPS Arena & Virtual Rooms`
- **New title** (52 chars): `InThisWorld — Free 3D Browser Games & Virtual Rooms`
- **Old desc** (174 chars, LONG_DESC): `Play 3 free 3D browser games built with Three.js — Space Trader, World Explorer, Arena FPS. Walk through furnished 3D chat rooms. No download, play instantly in your browser.`
- **New desc** (143 chars): `InThisWorld — play 3 free 3D browser games and walk through virtual chat rooms. Space Trader, FPS Arena, World Explorer. No download required.`

## Flags for Manual Review

### erpize.com vs erpise.com — Brand cannibalization
Both domains are ranking for the brand query "erpise" (erpise.com at pos 21.2, erpize.com at pos 6.5 with 4 imp). Search Console is treating them as competing pages because of near-identical domain names. Action needed: decide canonical brand and either (a) consolidate erpize.com content into a redirect to erpise.com, or (b) sharpen erpize.com's title/H1 to clearly differentiate ("ERP Magazine" vs "ERP Consulting"). Current erpize title (77 chars) already says "Magazine" but Google is conflating them. Below the >5 impression threshold for auto-fix this week — flagged.

### aizines.com — MULTI_H1 (5 H1 tags)
Site is converting (1 click / 10 imp = 10% CTR — healthy). Don't break it. But the 5 H1 tags should be reduced to one for accessibility and schema-correctness. Low priority.

### aibyjob.com — query "aiby careers" (3 imp, pos 8.2)
Below the impression threshold, but the topQuery "aiby careers" doesn't match the current title ("AI Agents for Your Profession"). Users may be searching for a careers page that doesn't exist. Consider: (a) add a /careers page, or (b) clarify in title that AIByJob is about deploying AI agents (not about jobs at AIByJob). Below threshold — flagged.

### Sites with 0 impressions (need indexing, not copy tweaks)
uptownit.com, voicestry.com, gameatica.com, videobate.com, cloudsion.com, bodspas.com, aiyhwh.com, bizstry.com, furnishthings.com, aitsql.com — these need backlinks, sitemap submission, and content depth before meta tweaks will matter. Consider IndexNow submission or manual GSC URL inspection for the most strategic of these (gameatica.com and bodspas.com look like good candidates).

## Next Week Focus

Resolve the erpize.com vs erpise.com brand cannibalization before SEO investments compound the wrong way — pick one domain as canonical for the "erpise" query and 301-redirect or noindex the other, then publish ~500 words of differentiating content on whichever stays.
