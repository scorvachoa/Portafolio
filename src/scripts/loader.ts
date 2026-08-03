/**
 * Loader de entrada: contador 0→100 y cortina que se desliza hacia arriba.
 * Emite el evento "app:ready" para que el Hero anime su contenido.
 */
import { gsap } from 'gsap';

export function initLoader(): void {
  const loader = document.getElementById('loader');
  const counter = document.getElementById('loader-counter');
  const bar = document.getElementById('loader-bar');
  if (!loader) {
    window.dispatchEvent(new Event('app:ready'));
    return;
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const hideLoader = (): void => {
    if (reduced) {
      loader.style.display = 'none';
      window.dispatchEvent(new Event('app:ready'));
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        loader.style.display = 'none';
        window.dispatchEvent(new Event('app:ready'));
        window.scrollTo(0, 0);
      },
    });

    tl.to(loader, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
    });
  };

  const obj = { value: 0 };
  const min = new Promise((resolve) => setTimeout(resolve, 1000));
  const loaded = new Promise<void>((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', () => resolve());
  });

  Promise.all([min, loaded]).then(() => {
    if (reduced) {
      hideLoader();
      return;
    }

    gsap.to(obj, {
      value: 100,
      duration: 1.1,
      ease: 'power2.out',
      onUpdate: () => {
        const val = Math.round(obj.value);
        if (counter) counter.textContent = String(val).padStart(3, '0');
        if (bar) bar.style.transform = `scaleX(${val / 100})`;
      },
      onComplete: hideLoader,
    });
  });
}
