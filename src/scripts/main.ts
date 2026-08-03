/**
 * Orquestador principal: inicializa todos los módulos cuando el DOM está listo.
 * Swiper y LightGallery se cargan de forma diferida para optimizar el bundle inicial.
 */
import { initSmoothScroll } from './smooth-scroll';
import { initLoader } from './loader';
import { initCursor } from './cursor';
import { initAnimations } from './animations';
import { initScrollChrome } from './scroll-chrome';
import { initNav } from './nav';
import { initVideoModal } from './video-modal';

function ready(fn: () => void): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}

ready(() => {
  initCursor();
  initSmoothScroll();
  initNav();
  initScrollChrome();
  initLoader();
  initAnimations();
  initVideoModal();

  // Módulos pesados, cargados de forma diferida
  void import('./swiper').then((m) => m.initSwiper());
  void import('./lightbox').then((m) => m.initLightbox());
});
