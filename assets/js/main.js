// Detect base path: "../" for pages/, "./" for root
const BASE = location.pathname.includes('/pages/') ? '../' : './';

// Load HTML includes
async function loadIncludes() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');

  if (header) {
    try {
      const res = await fetch(BASE + 'includes/header.html');
      if (res.ok) header.innerHTML = (await res.text()).replaceAll('{BASE}', BASE);
    } catch (e) {
      console.error('Header load failed:', e);
    }
  }

  if (footer) {
    try {
      const res = await fetch(BASE + 'includes/footer.html');
      if (res.ok) footer.innerHTML = (await res.text()).replaceAll('{BASE}', BASE);
    } catch (e) {
      console.error('Footer load failed:', e);
    }
  }
}

// Load messages and update UI
async function loadMessages() {
  try {
    const res = await fetch(BASE + 'data/messages.json');
    if (!res.ok) return;
    const data = await res.json();

    // Announcement banner
    if (data.announcement?.enabled) {
      const banner = document.createElement('div');
      banner.className = 'announcement-banner';
      banner.innerHTML = `
        <strong>${data.announcement.title}:</strong> ${data.announcement.text}
        <button class="announcement-banner__close" aria-label="Schließen">&times;</button>
      `;
      document.body.insertBefore(banner, document.body.firstChild);

      banner.querySelector('.announcement-banner__close').addEventListener('click', () => {
        banner.remove();
      });
    }

    // Opening hours card
    const hoursEl = document.getElementById('opening-hours');
    if (hoursEl && data.opening_hours) {
      const lines = data.opening_hours.lines.map(l => `<p>${l}</p>`).join('');
      const note = data.opening_hours.note ? `<p class="hours-note">${data.opening_hours.note}</p>` : '';
      hoursEl.innerHTML = lines + note;
    }
  } catch (e) {
    console.error('Messages load failed:', e);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Load includes first, then messages
  await loadIncludes();
  await loadMessages();

  // Inject back-to-gallery button on galerie sub-pages (below the gallery grid)
  const galleryMain = document.querySelector('main.shell');
  if (galleryMain && location.pathname.includes('/pages/galerie/') && !location.pathname.endsWith('/index.html')) {
    const backBtn = document.createElement('a');
    backBtn.href = '../../index.html#gallery';
    backBtn.className = 'gallery-close-btn';
    backBtn.innerHTML = '← Zurück zur Übersicht';
    galleryMain.appendChild(backBtn);
  }

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-header .nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !open);
      nav.classList.toggle('is-open', !open);
    });
    // Close menu when a nav link is tapped
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      });
    });
  }

  // Lightbox setup
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = '<button class="lightbox__close" aria-label="Schließen">Schließen</button><img alt="" />';
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('img');
  const lbClose = lightbox.querySelector('.lightbox__close');

  const open = (src, alt) => {
    lbImg.src = src;
    lbImg.alt = alt || '';
    lightbox.classList.add('active');
  };

  const close = () => lightbox.classList.remove('active');

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lbClose) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  document.querySelectorAll('[data-gallery] img, .gallery-grid img').forEach((img) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => open(img.src, img.alt));
  });
});
