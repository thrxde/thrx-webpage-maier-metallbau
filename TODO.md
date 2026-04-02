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

- [ ] **Compare with original site** — Visit https://schlosserei-maier-ulm.de and compare against
      https://schlosserei-maier-ulm.github.io/ to identify any features, content, or pages we missed.
      Use Chrome DevTools MCP to snapshot both sites and diff them section by section:
      header, hero, about, services, gallery, apprenticeship, contact, footer, subpages.

---

## Changelog

### 2026-04-02: Mobile header fix
- **Problem:** Header consumed ~50% of mobile viewport — logo too large, nav links horizontal and cut off, phone button on separate row.
- **Fix:** Added hamburger menu (`nav-toggle` button in header.html), collapsible nav on mobile (≤720px), smaller logo (100×44px), phone link inside nav dropdown. Desktop unchanged.
- **Files changed:** `includes/header.html`, `assets/css/style.css`, `assets/js/main.js`
- **Status:** Tested locally on 375×812 viewport — header now one compact row with hamburger icon. Needs commit, push, and deployment verification.
