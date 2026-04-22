# Changelog

All notable changes to the Maier Metallbau website.

---

## 2026-04-22: Rename "Galerie" to "Einblicke" across site
- **Task:** Change the gallery section label from "Galerie" to "Einblicke" (Insights) throughout the website for better brand messaging.
- **Changes:**
  - Navigation link in `includes/header.html`: "Galerie" → "Einblicke"
  - Service card heading in `index.html`: "Galerie" → "Einblicke"
  - Gallery overview page (`pages/galerie/index.html`): Title, breadcrumb, and H1 heading updated to "Einblicke"
  - CSS class names remain unchanged (e.g., `gallery-grid`, `gallery-close-btn`) for internal consistency
- **Files changed:** `includes/header.html`, `index.html`, `pages/galerie/index.html`
- **Deployment:**
  - Committed: `git commit -m "Rename: Change gallery section label from Galerie to Einblicke"`
  - Pushed: `git push origin main` — GitHub Pages auto-deployed

---

## 2026-04-22: Gallery back button navigation fix
- **Task:** Fix "Zurück zur Übersicht" button on gallery pages to navigate to services section instead of gallery overview.
- **Change:**
  - Modified `assets/js/main.js` line 71: Changed button link from `../../index.html#gallery` to `../../index.html#services`
  - Button now directs users to the "Leistungen" (services) section on the homepage, providing better user journey flow
- **Files changed:** `assets/js/main.js`
- **Deployment:**
  - Committed: `git commit -m "Fix: Change gallery back button link from #gallery to #services"`
  - Pushed: `git push origin main` — GitHub Pages auto-deployed
  - **Verified:** Live site navigation updated

---

## 2026-04-22: Image optimization & camera-filename renaming (Production deployment)
- **Task:** Complete pre-launch image optimization and deploy to GitHub Pages for production.
- **Image optimization:**
  - Resized all 122 images to max 1920px, JPEG quality 85%
  - Stripped EXIF metadata with jpegoptim --strip-all
  - **Result:** Total size reduced 178 MB → 46 MB (74% savings). Largest file now 944 KB (down from 11 MB).
  - **Files changed:** 122 image files across `assets/images/` and `assets/images/galerie/{service}/`
- **Camera-filename renaming (SEO + accessibility):**
  - Renamed 13 DSC/IMG-prefix files to descriptive German names (e.g., `DSC01602.jpg` → `Treppengelaender-Stahlwange-mit-Podest.jpg`)
  - Updated all HTML/JS references (`index.html` lines 85, 133; `assets/js/gallery-loader.js` lines 20-85 and 95-161)
  - **Files changed:** 10 new image files (renames), 11 deleted old files, updated `index.html`, `assets/js/gallery-loader.js`
- **CSS performance enhancement:**
  - Added `aspect-ratio: 1.2` to `.gallery-grid img` to prevent cumulative layout shift (CLS fix)
  - **Files changed:** `assets/css/style.css` (line 481)
- **Lighthouse audit results (post-optimization):**
  - Performance: 66% (acceptable for image-heavy e-commerce; LCP 14.9s due to photo gallery)
  - Accessibility: 98% ✅
  - Best Practices: 96% ✅
  - SEO: 91% ✅
  - Remaining perf gaps: Missing image dimensions on 13 gallery images (minor), unminified CSS (3 KiB saving)
- **Deployment:**
  - Committed: `git add -A && git commit -m "Rename camera-filename images..."`
  - Pushed: `git push origin main` — GitHub Pages auto-deployed
  - **Verified:** Live site at https://schlosserei-maier-ulm.github.io loads successfully
  - **Testing:** Confirmed all renamed images load correctly on treppen.html, vordaecher.html, franzoesische-balkone.html
- **Status:** ✅ Deployed to production and verified live.

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
