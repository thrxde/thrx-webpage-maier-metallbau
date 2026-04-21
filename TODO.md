# Maier Metallbau – Implementation Todo & Testing Strategy

> For multi-agent orchestration (OpenCode, etc.)

---

## Phase 1: Core Infrastructure ✅

### 1.1 Includes System ✅
| Task | Status | Acceptance Criteria |
|------|--------|---------------------|
| Create `includes/header.html` | ✅ | Header HTML with `{BASE}` placeholders |
| Create `includes/footer.html` | ✅ | Footer HTML with `{BASE}` placeholders |
| Update `main.js` includes loader | ✅ | Loads header/footer, replaces `{BASE}` with detected path |

### 1.2 Fonts (DSGVO) ✅
| Task | Status | Acceptance Criteria |
|------|--------|---------------------|
| Download Manrope woff2 files | ✅ | 4 weights in `assets/fonts/` (400/500/600/700) |
| Create `@font-face` CSS | ✅ | Declarations at top of `style.css` |
| Remove Google Fonts links | ✅ | All 15 HTML files updated |

### 1.3 Messages System ✅
| Task | Status | Acceptance Criteria |
|------|--------|---------------------|
| Create `data/messages.json` | ✅ | Valid JSON with announcement & opening_hours |
| Implement messages loader | ✅ | Banner shows when enabled, hours card populated |

---

## Phase 2: Page Updates ✅

### 2.1 Update Pages for Includes ✅
All 15 pages updated: Google Fonts removed, header/footer replaced with `<div id="site-header/footer"></div>` placeholders.

| Page | Status |
|------|--------|
| index.html | ✅ |
| pages/balkone.html | ✅ |
| pages/treppen.html | ✅ |
| pages/vordaecher.html | ✅ |
| pages/franzoesische-balkone.html | ✅ |
| pages/gartentueren.html | ✅ |
| pages/briefkastenanlagen.html | ✅ |
| pages/sonderkonstruktionen.html | ✅ |
| pages/galerie.html | ✅ |
| pages/ausbildung.html | ✅ |
| pages/anfahrt.html | ✅ |
| pages/oeffnungszeiten.html | ✅ |
| pages/impressum.html | ✅ |
| pages/datenschutz.html | ✅ |
| pages/sitemap.html | ✅ |

### 2.2 Legal Pages Updates ✅
| Task | Page | Status |
|------|------|--------|
| Add Quelltext section with GitHub repo + issues links | impressum.html | ✅ |
| Add GitHub Pages hosting info with repo link | datenschutz.html | ✅ |

---

## Phase 3: Testing Strategy

### 3.1 Unit Tests (Per Component)

```yaml
test_includes:
  - name: Header loads on root page
    url: /index.html
    assert: document.querySelector('#header nav') exists
    
  - name: Header loads on subpage
    url: /pages/balkone.html
    assert: document.querySelector('#header nav') exists
    
  - name: Footer loads correctly
    url: /index.html
    assert: document.querySelector('#footer .site-footer') exists

test_messages:
  - name: Messages JSON is valid
    file: /data/messages.json
    assert: JSON.parse succeeds
    
  - name: Announcement shows when enabled
    setup: messages.json announcement.enabled = true
    url: /index.html
    assert: announcement banner visible
    
  - name: Announcement hidden when disabled
    setup: messages.json announcement.enabled = false
    url: /index.html
    assert: announcement banner not visible

test_fonts:
  - name: No external font requests
    url: /index.html
    assert: No requests to fonts.googleapis.com or fonts.gstatic.com
    
  - name: Manrope loads from local
    url: /index.html
    assert: Font files loaded from /assets/fonts/
```

### 3.2 Integration Tests

```yaml
test_navigation:
  - name: All nav links work from home
    url: /index.html
    actions:
      - click: nav a[href="#about"]
      - assert: #about section visible
      - click: nav a[href*="balkone"]
      - assert: url contains /pages/balkone.html

test_responsive:
  viewports:
    - { width: 375, height: 667, name: "iPhone SE" }
    - { width: 768, height: 1024, name: "iPad" }
    - { width: 1440, height: 900, name: "Desktop" }
  tests:
    - name: Header renders correctly
      assert: header visible, no horizontal scroll
    - name: Nav is accessible
      assert: mobile menu works OR desktop nav visible
    - name: Images don't overflow
      assert: all images max-width 100%
```

### 3.3 DSGVO Compliance Tests

```yaml
test_dsgvo:
  - name: No cookies set
    url: /index.html
    assert: document.cookie is empty
    
  - name: No localStorage used
    url: /index.html
    assert: localStorage is empty
    
  - name: No external requests (except none)
    url: /index.html
    assert: All requests to same origin or data: URIs
    
  - name: Impressum exists
    url: /pages/impressum.html
    assert: Contains "§ 5 TMG" or "Angaben gemäß"
    
  - name: Datenschutz exists
    url: /pages/datenschutz.html
    assert: Contains "DSGVO" or "Datenschutz"
```

### 3.4 Performance Tests (Lighthouse)

```yaml
lighthouse_thresholds:
  performance: 90
  accessibility: 90
  best-practices: 90
  seo: 90
  
pages_to_test:
  - /index.html
  - /pages/galerie.html  # Image-heavy
  - /pages/impressum.html
```

---

## Phase 4: Deployment Verification

### 4.1 GitHub Pages Checks
| Check | Command/Action |
|-------|----------------|
| Site loads | `curl -I https://schlosserei-maier-ulm.github.io` returns 200 |
| HTTPS works | Certificate valid |
| All pages accessible | Sitemap URLs return 200 |
| Images load | No 404s in network tab |

### 4.2 Cross-Browser Testing
| Browser | Viewport | Status |
|---------|----------|--------|
| Chrome Desktop | 1440px | ⏳ |
| Chrome Mobile | 375px | ⏳ |
| Firefox Desktop | 1440px | ⏳ |
| Safari Desktop | 1440px | ⏳ |
| Safari iOS | 375px | ⏳ |

---

## Agent Assignment Strategy

For OpenCode or similar multi-agent systems:

```
Agent Pool:
├── Agent-Infra    → Phase 1 (includes, fonts, messages)
├── Agent-Pages-1  → Update pages index.html - galerie.html
├── Agent-Pages-2  → Update pages ausbildung.html - sitemap.html
├── Agent-Test     → Write and run tests
└── Agent-Review   → Final review and fixes

Execution Order:
1. [Parallel] Agent-Infra completes Phase 1
2. [Parallel] Agent-Pages-1 + Agent-Pages-2 update all pages
3. [Sequential] Agent-Test runs all tests
4. [Sequential] Agent-Review fixes issues
5. [Manual] Human reviews and approves
```

---

## Quick Commands

```bash
# Local testing
python -m http.server 8000
# Open http://localhost:8000

# Lighthouse CLI
npx lighthouse http://localhost:8000 --view

# Check for external requests
curl -s http://localhost:8000 | grep -E "(googleapis|gstatic|analytics|facebook)"

# Deploy
git add -A && git commit -m "..." && git push
```

---

## Open Tasks

- [x] **Lightbox navigation & close button** — ✅ Implemented

- [x] **Gallery page back-navigation** — ✅ Implemented

- [x] **Sitemap gallery links broken** — ✅ Fixed

- [x] **Announcement banner unstyled** — ✅ CSS added

- [x] **Opening hours hardcoded** — ✅ Now dynamic via messages.json

- [x] **Compare with original site** — Compared via Chrome DevTools MCP (2026-04-21). See results below.

### Comparison Results: Original (WordPress) vs. Redesign (Static)

#### Section-by-Section Analysis

| Section | Original | Redesign | Status |
|---------|----------|----------|--------|
| **Header** | Logo image + site title + tagline | Logo text + nav + phone link | OK — improved |
| **Navigation** | Über uns, Unser Aufgabenbereich, Galerie (submenu), Anfahrt, Datenschutz, Impressum | Über uns, Leistungen, Galerie, Ausbildung, Kontakt | OK — cleaner |
| **Sidebar** | Address, opening hours, job offers, search, Ausbildung (WordPress widgets) | Integrated into homepage sections (opening hours card, contact section) | OK — content preserved, layout modernized |
| **Homepage / About** | "Herzlich willkommen" text, customer list, team size, image slider | Same text, same customer list, same team, image stack | OK — content matches |
| **Services** | "Unser Aufgabenbereich" separate page (broken — showed Ausbildung post instead) | Service cards on homepage with images linking to gallery categories | OK — improved |
| **Gallery** | 8 categories: Balkone, Treppen, Vordächer, Franz. Balkone, **Carporte**, Gartentüren, Briefkastenanlagen, Verschiedenes | 7 categories: Balkone, Treppen, Vordächer, Franz. Balkone, Gartentüren, Briefkastenanlagen, Sonderkonstruktionen | DIFF — see below |
| **Ausbildung** | Job posting + link to profession description sub-page | Job posting with profession details integrated into same page | OK — improved |
| **Anfahrt** | Logo, address, email, static map image, Google Maps links | Address, email, static map image, Google Maps link with DSGVO notice | OK — improved |
| **Impressum** | Standard WordPress legal page | Standard legal page + source code links | OK — improved |
| **Datenschutz** | WordPress privacy policy | Custom DSGVO privacy policy + GitHub hosting info | OK — improved |
| **Footer** | "Datenschutzerklärung" link + "Mit Stolz präsentiert von WordPress" | 3-column footer (services, info, legal) | OK — improved |
| **Cookie banner** | "Diese Website verwendet technisch notwendige Cookies" | None (no cookies set = no banner needed) | OK — DSGVO improvement |

#### Findings / Differences

1. **Carporte gallery category missing** (LOW priority)
   - Original has "Carporte" as a gallery category, but its page content says "Wir sind noch mitten im Aufbau der neuen Internetseite. Wir bitten um Geduld!" — it's a placeholder with zero images.
   - **Decision: Skip** — the original never had actual Carporte content. If needed later, add as a Sonderkonstruktionen subcategory.

2. **"Verschiedenes" renamed to "Sonderkonstruktionen"** (OK)
   - The original called it "Verschiedenes" (miscellaneous). The redesign uses "Sonderkonstruktionen" (custom constructions) — a better, more professional label. Content is the same.

3. **"Unser Aufgabenbereich" page removed** (OK)
   - The original had a separate "Unser Aufgabenbereich" (services) page, but it was broken (displayed an Ausbildung blog post instead of services content). The redesign integrates services as cards on the homepage linking to gallery categories. This is an improvement.

4. **Profession description sub-page integrated** (OK)
   - Original had `/ausbildung-zum-metallbauer-beschreibung/` as a separate page with detailed profession info (job tasks, requirements, qualifications). The redesign integrates key points into the Ausbildung page directly. The detailed Bundesagentur-style text about the profession is condensed into practical bullet points. No content loss.

5. **Email address consistent** (OK)
   - Both sites use `Schlosserei-Maier@freenet.de`

6. **Job posting year outdated on original** (INFO)
   - Original says "Herbst 2025", redesign also says "Start Herbst 2025". Both should be updated to "Herbst 2026" before launch.

7. **Google Maps URL** (OK)
   - Both sites link to the same Google Maps location. Redesign adds DSGVO notice about data transfer to Google.

8. **Search functionality removed** (OK)
   - Original had a WordPress search widget in the sidebar. Redesign has no search (not needed for a ~16-page static site).

#### Conclusion

**No missing features or content.** The redesign covers all content from the original WordPress site. The only structural difference is the Carporte gallery category, which was a placeholder with no images on the original site. All text content, contact info, legal pages, and gallery images are present in the redesign.

**Action items before launch:**
- [ ] Update "Herbst 2025" → "Herbst 2026" in `pages/ausbildung.html` and `data/messages.json`
- [ ] Run pre-launch checklist (responsive testing, Lighthouse, image optimization, alt text audit)

---

## Changelog

### 2026-04-21: Site comparison with original WordPress site
- **Task:** Compare redesigned static site against live original at `schlosserei-maier-ulm.de`.
- **Method:** Chrome DevTools MCP snapshots of both sites, section-by-section diff.
- **Result:** No missing features or content. All text, contact info, legal pages, gallery images present. Carporte gallery skipped (original had empty placeholder). "Verschiedenes" renamed to "Sonderkonstruktionen". Broken "Unser Aufgabenbereich" page replaced by homepage service cards.
- **Status:** ✅ Documented in TODO.md Open Tasks section.

### 2026-04-21: Mobile/tablet responsive fixes
- **Problem:** Navigation overflowed on iPad (768px) — desktop nav + phone button didn't fit, causing 169px horizontal scroll. Footer links and announcement close button had touch targets below 44px minimum.
- **Fix:** Raised CSS breakpoint from `720px` to `860px` so tablets get the hamburger menu. Set close button to `min-width/min-height: 44px`. Added `padding: 8px 0` to footer links.
- **Files changed:** `assets/css/style.css`
- **Tested:** iPhone SE (375px), iPad (768px), Desktop (1440px) — all pass, zero horizontal overflow.
- **Status:** ✅ Committed, pushed, deployed.

### 2026-04-21: DSGVO compliance audit
- **Task:** Exhaustive source-code scan of all HTML, JS, CSS, JSON files for privacy violations.
- **Result:** Site is fully DSGVO-compliant — zero external resources, zero cookies, zero tracking, zero forms, zero iframes. All external links use `rel="noreferrer"`. Google Maps link documented with privacy notice.
- **Finding:** Legacy WordPress admin page (`assets/images/logo-versuch-I.html`, 1064 lines) exposing personal username, Gravatar references, and expired session tokens.
- **Fix:** Deleted `logo-versuch-I.html`. Updated "Herbst 2025" → "Herbst 2026" in `index.html` and `pages/ausbildung.html`. Updated SPEC.md checklist (marked responsive testing and fonts as done, corrected fonts DSGVO status).
- **Files changed:** `assets/images/logo-versuch-I.html` (deleted), `index.html`, `pages/ausbildung.html`, `SPEC.md`
- **Status:** ✅ Committed, pushed, deployed.

### 2026-04-02: Gallery reorganization with auto-loading
- **Problem:** Gallery images scattered in flat folder, manual HTML updates needed for each new image.
- **Solution:** Reorganized gallery pages into `pages/galerie/` subfolder, images into `assets/images/galerie/{service}/` subfolders.
- **Features:** Created `gallery-loader.js` to auto-populate galleries from image folders. Any image added to a subfolder appears automatically (no HTML edits needed).
- **Files changed:**
  - Moved pages: `pages/galerie/{balkone,treppen,vordaecher,franzoesische-balkone,gartentueren,briefkastenanlagen,sonderkonstruktionen}.html`
  - Moved `pages/galerie.html` → `pages/galerie/index.html`
  - Categorized images to `assets/images/galerie/{service}/`
  - Created `assets/js/gallery-loader.js`
  - Updated links in `index.html`, `includes/footer.html`
  - Updated `SPEC.md` with new structure and auto-loading docs
- **Status:** ✅ Deployed and verified — all tests pass, galleries load automatically.

### 2026-04-02: Mobile header fix
- **Problem:** Header consumed ~50% of mobile viewport — logo too large, nav links horizontal and cut off, phone button on separate row.
- **Fix:** Added hamburger menu (`nav-toggle` button in header.html), collapsible nav on mobile (≤720px), smaller logo (100×44px), phone link inside nav dropdown. Desktop unchanged.
- **Files changed:** `includes/header.html`, `assets/css/style.css`, `assets/js/main.js`
- **Status:** ✅ Committed, pushed, deployed and verified.
