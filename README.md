# Portafolio — Smith Corvacho Alvarez

Sitio web estático del portafolio profesional de Smith Corvacho Alvarez, enfocado en:

- Administración web
- SEO y crecimiento de plataformas digitales
- Automatización con Python
- Producción de contenido multimedia

## 🌐 Sitio publicado

- Producción: https://scorvachoa.github.io/Portafolio/

## 📁 Estructura del proyecto

```text
/
├── index.html
├── about.html
├── projects.html
├── contact.html
├── case-studies/
├── assets/
│   ├── css/style.css
│   ├── js/script.js
│   ├── images/
│   └── cv/
├── robots.txt
├── sitemap.xml
└── .nojekyll
```

## 🚀 Ejecución local

Este proyecto no requiere build ni dependencias de Node.

1. Clona el repositorio.
2. Levanta un servidor local (evita abrir los `.html` con `file://`).

Ejemplo con Python:

```bash
python -m http.server 8000
```

Luego abre:

- http://127.0.0.1:8000/

## 📬 Formulario de contacto

El formulario usa **FormSubmit**.

- Endpoint configurado en `contact.html`
- Flujo estándar por `POST` (sin AJAX)
- Redirección de éxito con `?sent=1`

> Importante: FormSubmit **no funciona** correctamente en páginas abiertas como archivo local (`file://`).
> Usa siempre `http://` o `https://`.

Si es el primer envío, revisa el correo de activación de FormSubmit (incluyendo spam/promociones).

## 🧭 Despliegue en GitHub Pages

El sitio está preparado para GitHub Pages de repositorio (`user.github.io/repo`):

- `.nojekyll` para entrega estática
- `robots.txt` y `sitemap.xml`
- metadatos SEO/Open Graph con URL absoluta de producción

## 🛠️ Tecnologías

- HTML5
- CSS3
- JavaScript (vanilla)

## 📄 Licencia

Uso personal/profesional del autor del portafolio.
