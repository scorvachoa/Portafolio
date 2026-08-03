/**
 * Navegación: estado de scroll (glass), menú móvil y accesibilidad.
 */
export function initNav(): void {
  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const body = document.body;

  const onScroll = (): void => {
    nav?.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const closeMenu = (): void => {
    menu?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
    document.documentElement.style.overflow = '';
  };

  const openMenu = (): void => {
    menu?.classList.add('is-open');
    toggle?.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');
    document.documentElement.style.overflow = 'hidden';
  };

  toggle?.addEventListener('click', () => {
    if (menu?.classList.contains('is-open')) closeMenu();
    else openMenu();
  });

  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}
