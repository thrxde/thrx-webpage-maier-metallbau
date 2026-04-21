# Changelog

All notable changes to the Maier Metallbau website.

---

## 2026-04-21: Site comparison with original WordPress site
- **Task:** Compare redesigned static site against live original at `schlosserei-maier-ulm.de`.
- **Method:** Chrome DevTools MCP snapshots of both sites, section-by-section diff.
- **Result:** No missing features or content. All text, contact info, legal pages, gallery images present. Carporte gallery skipped (original had empty placeholder). "Verschiedenes" renamed to "Sonderkonstruktionen". Broken "Unser Aufgabenbereich" page replaced by homepage service cards.
- **Status:** ✅ Documented in TODO.md Open Tasks section.

## 2026-04-21: Mobile/tablet responsive fixes
- **Problem:** Navigation overflowed on iPad (768px) — desktop nav + phone button didn't fit, causing 169px horizontal scroll. Footer links and announcement close button had touch targets below 44px minimum.
- **Fix:** Raised CSS breakpoint from `720px` to `860px` so tablets get the hamburger menu. Set close button to `min-width/min-height: 44px`. Added `padding: 8px 0` to footer links.
- **Files changed:** `assets/css/style.css`
- **Tested:** iPhone SE (375px), iPad (768px), Desktop (1440px) — all pass, zero horizontal overflow.
- **Status:** ✅ Committed, pushed, deployed.

## 2026-04-21: DSGVO compliance audit
- **Task:** Exhaustive source-code scan of all HTML, JS, CSS, JSON files for privacy violations.
- **Result:** Site is fully DSGVO-compliant — zero external resources, zero cookies, zero tracking, zero forms, zero iframes. All external links use `rel="noreferrer"`. Google Maps link documented with privacy notice.
- **Finding:** Legacy WordPress admin page (`assets/images/logo-versuch-I.html`, 1064 lines) exposing personal username, Gravatar references, and expired session tokens.
- **Fix:** Deleted `logo-versuch-I.html`. Updated "Herbst 2025" → "Herbst 2026" in `index.html` and `pages/ausbildung.html`. Updated SPEC.md checklist (marked responsive testing and fonts as done, corrected fonts DSGVO status).
- **Files changed:** `assets/images/logo-versuch-I.html` (deleted), `index.html`, `pages/ausbildung.html`, `SPEC.md`
- **Status:** ✅ Committed, pushed, deployed.

## 2026-04-02: Gallery reorganization with auto-loading
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

## 2026-04-02: Mobile header fix
- **Problem:** Header consumed ~50% of mobile viewport — logo too large, nav links horizontal and cut off, phone button on separate row.
- **Fix:** Added hamburger menu (`nav-toggle` button in header.html), collapsible nav on mobile (≤720px), smaller logo (100×44px), phone link inside nav dropdown. Desktop unchanged.
- **Files changed:** `includes/header.html`, `assets/css/style.css`, `assets/js/main.js`
- **Status:** ✅ Committed, pushed, deployed and verified.
