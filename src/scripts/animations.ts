/**
 * Animaciones GSAP globales:
 * - Reveal al hacer scroll (fade + translate)
 * - Parallax sutil
 * - Contadores animados
 * - Hero: entrada de contenido línea por línea tras el loader
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Hero: animación de entrada después de que el loader termina. */
function initHeroReveal(): void {
  const root = document.getElementById('hero');
  if (!root) return;

  const lines = root.querySelectorAll<HTMLElement>('[data-hero-line]');
  const items = root.querySelectorAll<HTMLElement>('[data-hero-item]');

  if (reduced) {
    lines.forEach((el) => el.classList.add('is-visible'));
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const onReady = (): void => {
    gsap
      .timeline({ delay: 0.1, defaults: { ease: 'power4.out' } })
      .to('[data-hero-eyebrow]', { y: 0, opacity: 1, duration: 0.8 }, 0)
      .to(lines, { y: 0, opacity: 1, duration: 1.1, stagger: 0.12 }, 0.15)
      .to('[data-hero-actions]', { y: 0, opacity: 1, duration: 0.8 }, 0.8)
      .to('[data-hero-meta]', { y: 0, opacity: 1, duration: 0.8 }, 1);

    const overlay = root.querySelector('[data-hero-overlay]');
    if (overlay) {
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' });
    }
  };

  if (document.readyState === 'complete') onReady();
  else window.addEventListener('app:ready', onReady, { once: true });
}

/** Reveal genérico para elementos con [data-reveal]. */
function initReveals(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!items.length) return;

  if (reduced) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  items.forEach((el) => {
    const delay = Number(el.dataset.delay ?? 0);
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      }
    );
  });
}

/** Parallax sutil para elementos con [data-parallax] (velocidad en data-speed). */
function initParallax(): void {
  if (reduced) return;

  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = Number(el.dataset.speed ?? 0.15);
    gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

/** Contadores animados con [data-counter], [data-suffix] y [data-decimals]. */
function initCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (!counters.length) return;

  counters.forEach((el) => {
    const target = Number(el.dataset.counter ?? 0);
    const decimals = Number(el.dataset.decimals ?? 0);
    const suffix = el.dataset.suffix ?? '';

    const render = (value: number): void => {
      const formatted = value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
      el.textContent = `${formatted}${suffix}`;
    };

    if (reduced) {
      render(target);
      return;
    }

    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => render(obj.value),
    });
  });
}

/** Animar barras de progreso con [data-progress]. */
function initProgressBars(): void {
  document.querySelectorAll<HTMLElement>('[data-progress]').forEach((bar) => {
    const width = Number(bar.dataset.progress ?? 0);
    if (reduced) {
      bar.style.width = `${width}%`;
      return;
    }
    gsap.fromTo(
      bar,
      { width: '0%' },
      {
        width: `${width}%`,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: bar, start: 'top 90%', once: true },
      }
    );
  });
}

export function initAnimations(): void {
  initHeroReveal();
  initReveals();
  initParallax();
  initCounters();
  initProgressBars();

  window.addEventListener('load', () => ScrollTrigger.refresh());
}
