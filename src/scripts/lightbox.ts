/**
 * Galerías con LightGallery: thumbnails, zoom, fullscreen y captions.
 * Se inicializa en todos los elementos con [data-gallery].
 */
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-fullscreen.css';

export function initLightbox(): void {
  const groups = document.querySelectorAll<HTMLElement>('[data-gallery]');
  groups.forEach((el) => {
    lightGallery(el, {
      plugins: [lgThumbnail, lgZoom, lgFullscreen],
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
