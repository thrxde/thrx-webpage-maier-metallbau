# Maier Metallbau – Agent Guide

> See [SPEC.md](../SPEC.md) for full project requirements, DSGVO compliance, and site structure.

## Quick Reference

- **Stack:** Pure static HTML/CSS/JS. No frameworks, no build tools.
- **Fonts:** Self-host Manrope in `assets/fonts/` (DSGVO).
- **Styling:** Single stylesheet `assets/css/style.css` with CSS variables. Dark theme, blue/cyan accents.
- **Layout:** Reuse classes: `shell`, `section`, `two-col`, `card`, `service-grid`, `gallery-grid`, `pill-list`.
- **Images:** Store in `assets/images/`, optimize before commit, use meaningful `alt` text.
- **Paths:** Root pages use `/assets/...`; subpages use `../assets/...`.

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Home page with anchors: `#about`, `#services`, `#gallery`, `#apprenticeship`, `#contact` |
| `assets/css/style.css` | All styles; mobile rules in media query at bottom |
| `assets/js/main.js` | Lightbox for `data-gallery` / `.gallery-grid` images |
| `data/messages.json` | Editable announcements & opening hours (JS fetch) |
| `deploy.sh` | rsync to staging server |

## Rules

- Keep JS minimal; progressive enhancement.
- Preserve header/footer consistency across pages.
- Update footer + sitemap when adding/removing pages.
- No cookies, no tracking, no external requests.
- German language throughout; concise headings.
