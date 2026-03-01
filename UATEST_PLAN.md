# AIUNITES - UA Test Plan

## Site Information
| Field | Value |
|-------|-------|
| **Site Name** | AIUNITES |
| **Repository** | aiunites-site |
| **Live URL** | https://aiunites.github.io/aiunites-site/ |
| **Local Path** | C:/Users/Tom/Documents/GitHub/aiunites-site |
| **Last Updated** | March 1, 2026 |
| **Version** | 2.0.0 |
| **Type** | Portfolio/Hub Site + Middleware Documentation |

---

## Pages Inventory

| Page | File | Description | Status |
|------|------|-------------|--------|
| Home | index.html | Main scrollable landing page (hero, services, about, portfolio, contact) | ✅ Active |
| Network | network.html | 18 sites, categories, middleware architecture diagram, middleware stack | ✅ Active |
| Identity | identity.html | Cross-site auth, session auth, demo mode, admin panel, DemoTemplate, rollout status | ✅ Active |
| Data | data.html | Three-layer data architecture, portability, JSON backup/restore, cache viewer, tech details | ✅ Active |
| Movement | notation.html | MNN/VRN notation, three domains, prior art, "why no standard existed" | ✅ Active |
| Consulting | consulting.html | Three consulting lanes, proof/portfolio, related brands, tech stack | ✅ Active |
| Legal | legal.html | Terms, privacy | ✅ Active |

---

## Navigation (All Pages)

| Nav Item | Target | Style | Status |
|----------|--------|-------|--------|
| ◆ AIUNITES (logo) | index.html | Logo link | ✅ |
| Network | network.html | Text link | ✅ |
| Identity | identity.html | Text link | ✅ |
| Data | data.html | Text link | ✅ |
| Movement | notation.html | Text link | ✅ |
| Consulting | consulting.html | Text link | ✅ |
| Contact Us | index.html#contact | CTA button | ✅ |
| Current page | # | color:var(--primary) | ✅ |

---

## Features

### 🏠 Home Page (index.html)
| Feature | Status | Notes |
|---------|--------|-------|
| Hero Section | ✅ | AIUNITES brand intro |
| Services Section | ✅ | AI Strategy, Custom Dev, Integration, Data, Governance, Training |
| About Section | ✅ | Company overview |
| Portfolio Section | ✅ | Site cards grid |
| Contact Section | ✅ | Contact form |
| Dark Theme | ✅ | Consistent styling |
| Responsive Design | ✅ | Mobile-friendly |

### 🌐 Network Page (network.html)
| Feature | Status | Notes |
|---------|--------|-------|
| Hero with stats | ✅ | 18 sites, 1 database, 1 identity, 2 protocols |
| Full site table | ✅ | All 18 sites with domain, description, features |
| Site categories | ✅ | 🟢 Full / 🟡 Partial / 🔵 Content / 🔴 Landing |
| Middleware architecture diagram | ✅ | LLC → Auth/CloudDB/Webring → MNN/VRN → Apps |
| Middleware stack features | ✅ | 5 feature rows |
| CTA links | ✅ | Links to Identity, Data, Movement |

### 🔐 Identity Page (identity.html)
| Feature | Status | Notes |
|---------|--------|-------|
| Hero | ✅ | "One Login. Every App." |
| How identity works | ✅ | 5 feature rows (register, session, demo, admin, controls) |
| Admin panel tabs | ✅ | 4 cards (Settings, Users, Stats, Changelog) |
| DemoTemplate pattern | ✅ | Prose explanation |
| Rollout status table | ✅ | Feature deployment status across sites |
| CTA | ✅ | Links to VideoBate, AIByJob, Redomy |

### 💾 Data Page (data.html)
| Feature | Status | Notes |
|---------|--------|-------|
| Hero | ✅ | "Your Data. Portable and Yours." |
| Three-layer architecture | ✅ | localStorage → CloudDB → SQLite |
| Data portability | ✅ | JSON backup, restore, cache viewer cards |
| Data mapping prose | ✅ | Key patterns, notation as data interchange |
| Philosophy prose | ✅ | Local-first, open formats |
| Technical details table | ✅ | 7 components with tech and location |
| Code sample | ✅ | CloudDB sync/backup/restore |

### 📝 Movement Page (notation.html)
| Feature | Status | Notes |
|---------|--------|-------|
| Hero | ✅ | "Write Once. Use Everywhere." + middleware tagline |
| MNN string showcase | ✅ | Color-coded syntax highlighting |
| Core thesis | ✅ | Silo problem — softened, honest framing |
| Three domains | ✅ | Exercise/Rehab, Virtual Worlds, Remote Control cards |
| Why no standard cards | ✅ | 6 cards (Equipment, Software, Clinical, Vocabularies, VW, MNN) |
| Prior art table | ✅ | ISB, C3D, SENIAM, ACSM, Labanotation, MNN |
| CTA | ✅ | MNN Builder, Spec, InThisWorld, VoiceStry |

### 💼 Consulting Page (consulting.html)
| Feature | Status | Notes |
|---------|--------|-------|
| Hero | ✅ | "We Built the Network. We Can Build Yours." |
| Three lanes | ✅ | Middleware, Web Dev, AI Integration cards |
| Proof section | ✅ | "The Proof Is the Network" prose |
| What we've built | ✅ | 6 feature rows (auth, CloudDB, protocols, template, AI, testing) |
| Related services | ✅ | ERPise, AITSQL, ERPize cards with links |
| Tech stack table | ✅ | 8 rows: Frontend through Professional |
| CTA | ✅ | Contact, Network, MNN links |

### 🔗 Webring Hub
| Feature | Status | Notes |
|---------|--------|-------|
| Links to All Sites | ✅ | 17 sites in webring bar |
| Consistent Branding | ✅ | AIUNITES style |
| Current page highlight | ✅ | .current class |
| Local dev URL rewrite | ✅ | file:// / localhost detection |

### 👤 User System (NOT PRESENT)
| Feature | Status | Notes |
|---------|--------|-------|
| User Authentication | ❌ | N/A - Hub/docs site |
| Settings Modal | ❌ | N/A |
| Admin Panel | ❌ | N/A |

### ☁️ Cloud Integration
| Feature | Status | Notes |
|---------|--------|-------|
| CloudDB Module | ✅ | js/cloud-database.js |

---

## CSS Files

| File | Purpose | Status |
|------|---------|--------|
| css/style.css | Main site styles, variables, nav, responsive | ✅ |
| css/middleware.css | Shared styles for Network/Identity/Data/Consulting pages | ✅ |

## JavaScript Files

| File | Purpose | Status |
|------|---------|--------|
| js/main.js | Site functionality, nav toggle | ✅ |
| js/cloud-database.js | Cloud sync module | ✅ |

---

## Test Scenarios

### Navigation Tests
- [ ] All nav links work from every page
- [ ] Current page highlighted in nav on each page
- [ ] Contact Us links to index.html#contact from all pages
- [ ] Webring bar present on all pages
- [ ] Logo links to index.html from all pages
- [ ] Footer links work on all pages

### Home Page Tests
- [ ] Hero section displays
- [ ] Services section scrolls to
- [ ] About section scrolls to
- [ ] Portfolio cards visible and linked
- [ ] Contact form accessible
- [ ] Responsive on mobile

### Network Page Tests
- [ ] Stats row displays (18, 1, 1, 2)
- [ ] Full site table renders with all 18 sites
- [ ] Category cards display (4 categories)
- [ ] Architecture diagram renders (4 tiers)
- [ ] App links in diagram work (BodSpas, InThisWorld, VoiceStry)
- [ ] Middleware stack feature rows display
- [ ] Responsive on mobile (grid collapses)

### Identity Page Tests
- [ ] Feature rows display (5 items)
- [ ] Admin panel cards display (4 tabs)
- [ ] DemoTemplate prose renders
- [ ] Rollout status table renders
- [ ] CTA links to external sites work

### Data Page Tests
- [ ] Three-layer feature rows display
- [ ] Portability cards display (3)
- [ ] Technical details table renders
- [ ] Code sample displays with syntax colors
- [ ] Responsive on mobile

### Movement Page Tests
- [ ] MNN string showcase with color coding
- [ ] Three domain cards display
- [ ] "Why no standard" cards display (6)
- [ ] Prior art table renders
- [ ] InThisWorld links to inthisworld.com
- [ ] Responsive on mobile

### Consulting Page Tests
- [ ] Three lane cards display
- [ ] Code blocks in cards render
- [ ] Feature rows display (6)
- [ ] Related services cards link to external sites
- [ ] Tech stack table renders
- [ ] Responsive on mobile

---

## Known Issues / TODO

| Issue | Priority | Status |
|-------|----------|--------|
| notation.html has inline styles (not using middleware.css) | Low | ⬜ Cosmetic debt |
| index.html Services/About/Portfolio sections could be refreshed to match middleware framing | Medium | 📲 TODO |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | Jan 2026 | Portfolio with all sites |
| 1.0.1 | Feb 22, 2026 | Webring highlight fix, AITSQL added (17 sites) |
| 2.0.0 | Mar 1, 2026 | Major expansion: Added 5 new pages (network, identity, data, movement/notation, consulting). New nav structure (Network · Identity · Data · Movement · Consulting · Contact). Shared middleware.css. Architecture diagram moved from notation to network page. Middleware company framing. AIUNITES LLC entity. InThisWorld → inthisworld.com. Thesis copy softened for honesty. |

---

## Status Legend
- ✅ Implemented and tested
- ⬜ Not implemented
- 📲 TODO
- ⚠️ Partial/Issues
- ❌ Removed/Deprecated

---

*Last tested: March 1, 2026*
*Note: This is a hub/docs site - no user authentication*
