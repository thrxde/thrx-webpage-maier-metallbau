# Maier Metallbau GmbH – Website

Statische Website für die **Maier Metallbau GmbH**, Schlosserei in Ulm.

Modernes, DSGVO-konformes Design – ohne Cookies, ohne Tracking, ohne externe Requests.

**Tech-Stack:** Reines HTML / CSS / JS – kein Framework, kein Build-Tool.

## Live

👉 **https://schlosserei-maier-ulm.github.io/**

## Struktur

| Verzeichnis | Inhalt |
|-------------|--------|
| `index.html` | Startseite |
| `pages/` | Unterseiten (Einblicke, Ausbildung, Impressum, …) |
| `includes/` | Header & Footer (per JS geladen) |
| `assets/` | CSS, JS, Fonts, Bilder |
| `data/` | Nachrichten & Öffnungszeiten (JSON) |
| `tests/` | Automatisierte Tests |

## Lokal testen

```bash
# Einfacher HTTP-Server (Python)
python3 -m http.server 8000
```

## Tests

```bash
bash tests/run-tests.sh
```
