/**
 * Galerías con LightGallery: thumbnails, zoom y captions (sin fullscreen).
 * Se inicializa en todos los elementos con [data-gallery].
 */
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';

export function initLightbox(): void {
  const groups = document.querySelectorAll<HTMLElement>('[data-gallery]');
  groups.forEach((el) => {
    lightGallery(el, {
      plugins: [lgThumbnail, lgZoom],
      selector: 'a',
      download: false,
      speed: 450,
      thumbWidth: 96,
      thumbHeight: '72px',
      allowMediaOverlap: true,
      toggleThumb: true,
      licenseKey: '0000-0000-000-0000',
    });
  });
}
