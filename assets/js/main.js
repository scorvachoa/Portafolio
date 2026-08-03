/* SCORVACHOA — main.js */
document.addEventListener('DOMContentLoaded', () => {
  setupMobileNav();
  setupReveal();
  setupLightbox();
});

function setupMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-links]');
  if (!toggle || !menu) return;

  const setState = (open) => {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('click', () => {
    setState(!menu.classList.contains('is-open'));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setState(false));
  });
}

function setupReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (items.length === 0) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const style = getComputedStyle(document.documentElement);
  const dur = parseFloat(style.getPropertyValue('--dur')) * 1000 || 550;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delay = parseFloat(el.dataset.delay || 0) * 1000;
        setTimeout(() => el.classList.add('is-in'), delay);
        io.unobserve(el);
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el) => io.observe(el));
}

function preventRevealFlash() {
  const items = document.querySelectorAll('[data-reveal]');
  for (const el of items) {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('is-in');
    }
  }
}
window.addEventListener('load', () => setTimeout(preventRevealFlash, 50));

function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  const img = lightbox.querySelector('img');
  const close = lightbox.querySelector('[data-lightbox-close]');
  const triggers = document.querySelectorAll('[data-lightbox]');

  const open = (src, alt) => {
    img.src = src;
    img.alt = alt || '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    close.focus();
  };
  const closeBox = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  triggers.forEach((t) => {
    t.setAttribute('tabindex', '0');
    t.addEventListener('click', () => {
      const s = t.querySelector('img');
      const src = (t.dataset.src || (s && s.src)) || '';
      open(src, s && s.alt);
    });
    t.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.click(); }
    });
  });

  close.addEventListener('click', closeBox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeBox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeBox(); });
}