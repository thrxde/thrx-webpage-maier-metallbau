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
| **Staging** | https://home.thrx.de/maier/ |
| **Production** | schlosserei-maier-ulm.de (TBD) |
| **Hosting options** | GitHub Pages or static server |

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
| **Impressum** | Complete legal notice per § 5 TMG |
| **Datenschutzerklärung** | Privacy policy per Art. 13/14 DSGVO |
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

A simple static JSON file that JavaScript fetches on page load. Admin edits the file via SSH/SFTP or a future admin tool.

### 3.1 Use Cases

| Type | Example |
|------|---------|
| Job postings | "Für Herbst 2025 suchen wir interessierte und engagierte Auszubildende" |
| Opening hours | "Mo. – Do.: 7.00 – 16.00 Uhr / Freitag: geschlossen" |
| Announcements | "Betriebsurlaub 23.12. – 06.01." |

### 3.2 File Structure

```
/data/
└── messages.json      # Editable content
```

### 3.3 Data Structure (`messages.json`)

```json
{
  "announcement": {
    "enabled": true,
    "title": "Ausbildung",
    "text": "Für Herbst 2025 suchen wir interessierte und engagierte Auszubildende"
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
// assets/js/messages.js
fetch('/data/messages.json')
  .then(r => r.json())
  .then(data => {
    if (data.announcement?.enabled) {
      // Show banner
    }
    // Update opening hours card
  });
```

### 3.5 Editing Workflow

**Option A: GitHub Pages (recommended)**
1. Go to GitHub repo → `data/messages.json`
2. Click pencil icon to edit
3. Save (commit) → GitHub Pages rebuilds automatically (~1 min)

**Option B: Static server (SSH/SFTP)**
1. Connect via SSH/SFTP
2. Edit `/data/messages.json`
3. Save → changes live immediately

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
- Works without JavaScript (progressive enhancement for messages)
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

### 7.2 Production Options

**Option A: GitHub Pages**
- Free HTTPS, auto-deploy on push
- Custom domain via CNAME
- Messages edited via GitHub web UI

**Option B: Static server**
- Apache/Nginx
- Let's Encrypt certificate
- Messages edited via SSH/SFTP

---

## 8. Checklist

### Pre-Launch
- [ ] All pages responsive (test on real devices)
- [ ] Lighthouse mobile score ≥ 90
- [ ] DSGVO compliance verified (no cookies, no tracking)
- [ ] Impressum complete with correct company data
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
