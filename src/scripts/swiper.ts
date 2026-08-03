/**
 * Swiper: timeline horizontal del proceso y carrusel de testimonios.
 */
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function initSwiper(): void {
  const process = document.getElementById('process-swiper');
  if (process) {
    new Swiper(process, {
      modules: [Navigation],
      slidesPerView: 1.2,
      spaceBetween: 20,
      speed: 700,
      grabCursor: true,
      breakpoints: {
        640: { slidesPerView: 2.4, spaceBetween: 24 },
        1024: { slidesPerView: 3.8, spaceBetween: 28 },
      },
      navigation: {
        nextEl: '#process-next',
        prevEl: '#process-prev',
      },
    });
  }

  const testimonials = document.getElementById('testimonials-swiper');
  if (testimonials) {
    new Swiper(testimonials, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 700,
      loop: true,
      autoplay: { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: {
        el: '#testimonials-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '#testimonials-next',
        prevEl: '#testimonials-prev',
      },
      breakpoints: {
        768: { slidesPerView: 1.25 },
        1024: { slidesPerView: 2 },
      },
    });
  }
}
