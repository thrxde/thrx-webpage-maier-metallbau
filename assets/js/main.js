document.addEventListener('DOMContentLoaded', () => {
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
