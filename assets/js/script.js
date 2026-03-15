document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupLightbox();
  setupContactForm();
});

function setupMobileMenu() {
  const toggleButton = document.querySelector('[data-menu-toggle]');
  const menu = document.getElementById('main-menu');

  if (!toggleButton || !menu) {
    return;
  }

  toggleButton.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

function setupLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryImages = document.querySelectorAll('[data-lightbox-image]');

  if (!lightbox || !lightboxImg || galleryImages.length === 0) {
    return;
  }

  galleryImages.forEach((img) => {
    img.addEventListener('click', () => {
      lightbox.classList.add('active');
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'Imagen ampliada';
    });

    img.setAttribute('tabindex', '0');
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        img.click();
      }
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      lightbox.classList.remove('active');
    }
  });
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (!form || !status) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get('sent') === '1') {
    status.textContent = '¡Mensaje enviado correctamente! Te responderé pronto.';
  }

  if (window.location.protocol === 'file:') {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.title = 'Abre esta página en un servidor web para habilitar el envío';
    }

    status.textContent = 'El formulario no funciona en archivos locales (file://). Ábrelo desde https://scorvachoa.github.io/Portafolio/contact.html o usa un servidor local (ejemplo: python -m http.server).';
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', (event) => {
    if (form.dataset.submitting === 'true') {
      event.preventDefault();
      return;
    }

    form.dataset.submitting = 'true';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';
    }
    status.textContent = 'Enviando mensaje...';
  });

  // Envío clásico HTML hacia FormSubmit para mayor compatibilidad con su flujo de entrega.
  // No interceptamos con fetch para evitar falsos positivos cuando el proveedor cambia respuestas JSON.
  return;
}
