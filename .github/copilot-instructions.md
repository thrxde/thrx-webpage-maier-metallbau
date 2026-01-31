# Maier Metallbau static site – agent guide

- **Stack**: Pure static HTML/CSS/JS; no bundler or build pipeline. Keep output vanilla and compatible with modern browsers. Fonts loaded from Google (Manrope).
- **Layout pattern**: Reusable header/nav/footer shared across all pages. Home uses root-relative asset paths; subpages use `../` prefixes. Mirror the existing structure when adding pages to avoid broken links.
- **Navigation**: Header links point to home anchors (`#about`, `#services`, `#gallery`, `#apprenticeship`, `#contact`). Keep these ids stable when editing [index.html](../index.html). Subpages link back to these anchors; preserve the copy/paste header block for consistency.
- **Footer links**: Three-column footer repeated on every page; update both the footer and sitemap if you add or remove a page. Footer uses page-relative links (e.g., `galerie.html`, not absolute paths).
- **Styling**: Single stylesheet in [assets/css/style.css](../assets/css/style.css). Uses CSS variables for colors/spacing and a dark gradient background. Reuse existing utility classes (`shell`, `section`, `two-col`, `service-grid`, `gallery-grid`, `card`, `pill-list`) instead of introducing new ones unless necessary.
- **Responsive rules**: Mobile tweaks live in the media query at the bottom of [style.css](../assets/css/style.css). Prefer extending those instead of adding inline styles.
- **Hero/services/gallery**: Home sections are hand-crafted; if adding similar blocks, follow the grid patterns in [index.html](../index.html) to maintain spacing and card styles.
- **Lightbox behavior**: [assets/js/main.js](../assets/js/main.js) registers a simple lightbox. Any `img` inside elements with `data-gallery` or class `gallery-grid` becomes clickable (opens the overlay). Preserve `data-gallery` on masonry sections and keep meaningful `alt` text for accessibility.
- **Images**: Stored in [assets/images](../assets/images). Use web-friendly sizes and consistent naming; keep relative paths correct for root vs. subpages. Avoid adding very large originals; optimize before committing.
- **Page metadata**: Each page sets `lang="de"`, UTF-8 meta, viewport, and Manrope preload; copy existing head structure when creating new pages.
- **Scripting constraints**: No frameworks. Keep JS minimal and DOM-ready; prefer progressive enhancement. If expanding lightbox behavior, avoid breaking existing click bindings and Escape-to-close handling.
- **Deployment**: [deploy.sh](../deploy.sh) rsyncs the working directory to `thr@gateway:/var/www/html/maier` with `--delete` (removes remote files not present locally) and excludes `.git*` and `deploy.sh`. Run from repo root when you intentionally want to push to that host; avoid accidental runs if you lack access.
- **Testing/preview**: Open `index.html` directly in a browser or via a simple static file server (e.g., `python -m http.server`) to verify relative links, gallery lightbox, and responsive layout.
- **Content style**: German language throughout. Keep headings concise, avoid boilerplate marketing fluff, and supply descriptive `alt` text for accessibility and lightbox captions.
- **When adding sections/pages**: Update navigation anchors on home, footer link lists on all pages, and ensure new anchors use matching ids for intra-page links. Use the `two-col` and `card` patterns for text + image/layout consistency.
- **Do not introduce**: Build tooling, heavy JS, or unrelated fonts unless explicitly requested; stay within the existing aesthetic (dark theme with blue/cyan accents).
