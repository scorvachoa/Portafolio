/**
 * Barra de progreso de scroll + botón volver arriba.
 */
export function initScrollChrome(): void {
  const progress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  if (!progress) return;

  const update = (): void => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = height > 0 ? scrollTop / height : 0;
    progress.style.transform = `scaleX(${percent})`;

    if (backToTop) {
      const show = scrollTop > window.innerHeight * 0.6;
      backToTop.classList.toggle('is-visible', show);
    }
  };

  window.addEventListener('scroll', update, { passive: true });
  update();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
