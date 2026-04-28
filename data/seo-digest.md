# AIUNITES SEO Digest — 2026-04-28

## Summary
- Sites with GSC traction (impressions > 0): 6
- Sites with 0 impressions: 12
- Files edited this run: 2
- Auto-publish queued: yes

## Top Opportunities This Week

1. **redomy.com — position 1.8, 7 impressions, 0 clicks (highest leverage)**
   Already ranking 1–2 for "redo my" yet zero clicks. The old title led with "Home Renovation Project Tracker" — too generic for the literal "redo my [room]" intent users are typing. Rewritten to lead with the 3D visualizer hook and example rooms (kitchen, bedroom, backyard). Expected impact: 5–15% CTR lift = ~1 click/wk at current volume.

2. **aiunites.com — position 12, 26 impressions, 0 clicks (highest volume)**
   Top query is "ai consulting tulsa" but the title was brand-first ("AIUNITES - AI Consulting & Integration Services | Tulsa, Oklahoma"). Rewrote to lead with the literal query "AI Consulting Tulsa, OK" — matches what searchers type and bolds in the SERP. Position 12 is top-of-page-2; CTR boost may also pull avg position up via dwell signal.

3. **erpise.com — position 21.3, 8 impressions, 0 clicks (ranking-blocked)**
   Brand query "erpise" but ranking on page 2–3 — copy fix won't help until ranking improves. Title and H1 already include the brand. Likely needs more inbound links, a press/about page targeting "erpise", or a Google Search Console "request indexing" pass. Flagged for manual review.

4. **erpize.com — picking up "erpise" typo traffic (2 impressions, position 5.5)**
   Cannibalizing erpise.com for the brand query. Worth a manual look at whether to add a "Did you mean ERPise?" link or canonical strategy. Low priority — only 2 impressions.

5. **cosmostheopera.com — position 5.7, 3 impressions for "cosmo opera"**
   Already on page 1, just needs more impressions. Volume too small to optimize copy yet — revisit when impressions exceed 10.

## Changes Made

### aiunites-site/index.html
- **Title** old: `AIUNITES - AI Consulting & Integration Services | Tulsa, Oklahoma` (66 chars)
- **Title** new: `AI Consulting Tulsa, OK | AI Integration Services | AIUNITES` (60 chars)
- **Desc** old: `Tulsa-based AI consulting, custom development, and integration. We build AI tools, automate workflows, and help Oklahoma businesses harness artificial intelligence.` (165 chars)
- **Desc** new: `Tulsa AI consulting that delivers. We design custom AI tools, automate workflows, and integrate AI into Oklahoma businesses. Book a free consultation today.` (157 chars)

### redomy-demo/index.html
- **Title** old: `Redomy - Redo My Home | Home Renovation Project Tracker` (55 chars)
- **Title** new: `Redomy — Redo My Home in 3D | AI Room Visualizer & Planner` (58 chars)
- **Desc** old: `Plan, track, and complete your home renovation projects. Organize by room, manage budgets, track tasks, and visualize your dream home with Redomy.` (148 chars)
- **Desc** new: `Redo my kitchen, bedroom, or backyard — upload a photo and walk your room in 3D. AI renovation ideas, budgets, and project tracking. Free to try.` (146 chars)

### scripts/script-runner.ps1
- Uncommented `auto-publish.ps1` so the next 10-min cycle pushes the meta updates.

## Flags for Manual Review

- **erpise.com page 2–3 ranking for own brand** — needs link-building or content depth, not copy. Consider a press release / About page that ranks for "erpise".
- **redomy.com room pages have NO_H1 + LOW_CONTENT** (backyard, basement, bedroom, dining-room, frontyard, garage, kitchen, living-room) — all ~200–215 words, missing H1. Each is a single template fix; would unblock 8 indexed pages at once.
- **bodspas.com/log.html** — title is "log - BodSpas" (13 chars). Should be at minimum "Workout Log — Track Muscles & Nerves | BodSpas".
- **cloudsion.com/help.html** — title is "help - Cloudsion" (16 chars). Same template-title bug.
- **redomy.com/rooms/bedroom.html** and **garage.html** — same lowercase-only title issue ("bedroom - Redomy", "garage - Redomy").
- **aiunites.com/my-ai-profile-builder.html** — flagged THIN_CONTENT (~58 words). Either expand or noindex.
- **12 sites still at 0 impressions** (uptownit, voicestry, gameatica, videobate, cloudsion, aibyjob, bodspas, aiyhwh, bizstry, furnishthings, aitsql) — need indexing-first action: submit sitemaps, request indexing in GSC, get one inbound link.

## Next Week Focus

Batch-fix the lowercase-titled pages (bodspas log, cloudsion help, redomy bedroom/garage) — five 30-second edits that each unblock a thin-content page from ranking.
