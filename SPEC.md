# Maier Metallbau – Project Specification

> Website redesign for **Maier Metallbau GmbH**, Schlosserei Ulm  
> Target domain: **schlosserei-maier-ulm.de** (replaces existing site)

---

## 1. Project Overview

| Aspect | Details |
|--------|---------|
| **Client** | Maier Metallbau GmbH |
| **Current site** | https://schlosserei-maier-ulm.de/ |
| **Goal** | Replace existing site with modern, DSGVO-compliant static website |
| **Tech stack** | Pure HTML/CSS/JS (no backend) |
| **Repository** | https://github.com/schlosserei-maier-ulm/schlosserei-maier-ulm.github.io |
| **Staging** | https://home.thrx.de/maier/ |
| **Production** | https://schlosserei-maier-ulm.github.io (custom domain TBD) |
| **Hosting** | GitHub Pages |

---

## 2. Core Requirements

### 2.1 Responsive Design

- [ ] **Mobile-first** layout optimized for smartphones (320px+)
- [ ] **Tablet** breakpoint (~768px)
- [ ] **Desktop** breakpoint (~1024px+)
- [ ] Touch-friendly navigation with hamburger menu on mobile
- [ ] Readable font sizes (min 16px body text)
- [ ] Tap targets ≥ 44×44 px for buttons/links
- [ ] Images responsive via `srcset` or CSS `max-width: 100%`

### 2.2 DSGVO / Privacy Compliance

| Requirement | Implementation |
|-------------|----------------|
| **No cookies** | Do not set any cookies (session, analytics, or otherwise) |
| **No tracking** | No Google Analytics, Facebook Pixel, Hotjar, etc. |
| **No external requests** | Self-host all fonts and assets; no third-party resources |
| **No cookie banner** | Not required because no cookies/tracking are used |
| **Impressum** | Complete legal notice per § 5 TMG; include source code link |
| **Datenschutzerklärung** | Privacy policy per Art. 13/14 DSGVO; include GitHub hosting info |
| **Contact** | Phone/email only; no contact form (see future improvements) |
| **SSL/TLS** | HTTPS enforced (server config) |

#### Font Handling
Self-host Manrope font files in `assets/fonts/` to comply with DSGVO (no Google Fonts requests).

### 2.3 No Cookie Banner

Since the site:
- Sets no cookies
- Uses no tracking scripts
- Does not store user data in browser storage

…a cookie consent banner is **not required** under DSGVO/ePrivacy regulations.

---

## 3. Editable Front-Page Messages

A static JSON file that JavaScript fetches on page load. Admin edits via GitHub web UI.

### 3.1 Use Cases

| Type | Example |
|------|---------|
| Job postings | "Für Herbst 2026 suchen wir interessierte und engagierte Auszubildende" |
| Opening hours | "Mo. – Do.: 7.00 – 16.00 Uhr / Freitag: geschlossen" |
| Announcements | "Betriebsurlaub 23.12. – 06.01." |

### 3.2 File Structure

```
/data/
└── messages.json      # Editable content

/includes/
├── header.html        # Shared header/nav
└── footer.html        # Shared footer
```

### 3.3 Data Structure (`messages.json`)

```json
{
  "announcement": {
    "enabled": true,
    "title": "Ausbildung",
    "text": "Für Herbst 2026 suchen wir interessierte und engagierte Auszubildende"
  },
  "opening_hours": {
    "lines": [
      "Mo. – Do.: 7.00 – 16.00 Uhr",
      "Freitag: geschlossen"
    ],
    "note": "Termine außerhalb der Zeiten nach Vereinbarung."
  }
}
```

### 3.4 Front-End Integration

```javascript
// assets/js/main.js
const BASE = location.pathname.includes('/pages/') ? '../' : './';

// Load header/footer
fetch(BASE + 'includes/header.html').then(r => r.text()).then(html => {
  document.getElementById('header').innerHTML = html;
});

// Load messages
fetch(BASE + 'data/messages.json').then(r => r.json()).then(data => {
  if (data.announcement?.enabled) {
    // Show banner
  }
});
```

### 3.5 Editing Workflow

1. Go to GitHub repo → `data/messages.json`
2. Click pencil icon to edit
3. Save (commit) → GitHub Pages rebuilds automatically (~1 min)

---

## 4. Site Structure

### 4.1 Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/index.html` | Hero, services overview, gallery teaser, contact |
| Balkone | `/pages/balkone.html` | Balconies & railings |
| Treppen | `/pages/treppen.html` | Stairs & handrails |
| Vordächer | `/pages/vordaecher.html` | Canopies |
| Franz. Balkone | `/pages/franzoesische-balkone.html` | French balconies |
| Gartentüren | `/pages/gartentueren.html` | Garden gates |
| Briefkastenanlagen | `/pages/briefkastenanlagen.html` | Mailbox systems |
| Sonderkonstruktionen | `/pages/sonderkonstruktionen.html` | Custom metalwork |
| Galerie | `/pages/galerie.html` | Full gallery |
| Ausbildung | `/pages/ausbildung.html` | Apprenticeship info |
| Anfahrt | `/pages/anfahrt.html` | Directions & map |
| Öffnungszeiten | `/pages/oeffnungszeiten.html` | Opening hours |
| Impressum | `/pages/impressum.html` | Legal notice |
| Datenschutz | `/pages/datenschutz.html` | Privacy policy |
| Sitemap | `/pages/sitemap.html` | Site map |

### 4.2 Navigation Structure

```
Header Nav:
├── Über uns (#about)
├── Leistungen (#services)
├── Galerie (#gallery)
├── Ausbildung (#apprenticeship)
└── Kontakt (#contact)

Footer:
├── Column 1: Leistungen (service pages)
├── Column 2: Informationen (Ausbildung, Öffnungszeiten, Anfahrt)
└── Column 3: Rechtliches (Impressum, Datenschutz, Sitemap)
```

---

## 5. Design System

### 5.1 Colors (CSS Variables)

| Variable | Usage |
|----------|-------|
| `--color-bg` | Dark background (gradient) |
| `--color-surface` | Card/section backgrounds |
| `--color-text` | Primary text (light) |
| `--color-accent` | Blue/cyan accent |
| `--color-muted` | Secondary text |

### 5.2 Typography

- **Primary font:** Manrope (self-hosted for DSGVO)
- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Scale:** 16px base, 1.25 ratio

### 5.3 Components

- `.shell` – max-width container
- `.section` – vertical spacing
- `.two-col` – two-column layout
- `.card` – content cards
- `.service-grid` – services overview
- `.gallery-grid` – masonry image grid
- `.pill-list` – tag/badge list
- `.btn` / `.btn--ghost` – buttons

---

## 6. Technical Constraints

### 6.1 Must Have
- Pure HTML/CSS/JS (no build tools, no frameworks)
- **Separation of content and layout:** Text/data in HTML or JSON, styling in CSS only
- **Reusable components:** Header and footer in separate files (`includes/header.html`, `includes/footer.html`), loaded via JavaScript
- Accessible (WCAG 2.1 AA)
- Fast loading (<3s on 3G)

### 6.2 Must NOT Have
- Cookies or local storage
- External tracking/analytics
- Contact forms or external form processors
- Heavy JavaScript frameworks
- CDN dependencies

---

## 7. Deployment

### 7.1 Staging (current)

```bash
# deploy.sh → https://home.thrx.de/maier/
rsync -avz --delete \
  --exclude '.git*' \
  --exclude 'deploy.sh' \
  ./ thr@gateway:/var/www/html/maier
```

### 7.2 Production (GitHub Pages)

- Repository: `schlosserei-maier-ulm/schlosserei-maier-ulm.github.io`
- URL: https://schlosserei-maier-ulm.github.io
- Custom domain: schlosserei-maier-ulm.de (via CNAME)
- Auto-deploy on push to `main`
- Messages edited via GitHub web UI

---

## 8. Checklist

### Pre-Launch
- [ ] All pages responsive (test on real devices)
- [ ] Lighthouse mobile score ≥ 90
- [ ] DSGVO compliance verified (no cookies, no tracking)
- [ ] Impressum complete with correct company data
- [ ] Impressum/Datenschutz include GitHub source & issues link
- [ ] Datenschutz page complete
- [ ] Fonts self-hosted in `assets/fonts/`
- [ ] Messages.json loading works
- [ ] All images optimized (WebP preferred)
- [ ] Alt text on all images

### Post-Launch
- [ ] Old site redirects configured (if URLs change)
- [ ] SSL certificate active
- [ ] Client access documented (GitHub account or SSH/SFTP)

---

## 9. Future Improvements

| Feature | Priority | Notes |
|---------|----------|-------|
| Contact form | Medium | Simple form with server-side handler, minimal data |
| Web-based admin UI | Low | Only needed if not using GitHub Pages |
| Image lazy-loading | Low | Native `loading="lazy"` attribute |

---

## Appendix: DSGVO Status

| Item | Status |
|------|--------|
| No tracking scripts | ✅ |
| No cookies | ✅ |
| No external analytics | ✅ |
| No contact form | ✅ |
| Impressum present | ✅ |
| Datenschutz present | ✅ |
| Fonts self-hosted | ⏳ TODO |
| HTTPS enforced | ⏳ Server config |
