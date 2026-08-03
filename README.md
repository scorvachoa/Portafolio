# Portafolio — Content Creator & Productor Audiovisual

Portafolio profesional premium construido con **Astro 5**, **TailwindCSS 4**, **TypeScript**, **GSAP**, **Lenis**, **SwiperJS** y **LightGallery**. Diseñado para conseguir clientes y empleo mostrando resultados reales, con estética de agencia creativa.

> Todo el contenido se carga desde archivos JSON en `src/data/`. Puedes editar textos, métricas, proyectos y videos **sin tocar un solo componente**.

---

## ✨ Stack

| Tecnología   | Uso                                        |
| ------------ | ------------------------------------------ |
| Astro 5      | Generador de sitio estático (0 JS por defecto en contenido) |
| TailwindCSS 4 | Estilos con tema configurado por CSS       |
| TypeScript   | Tipado de datos y scripts                  |
| GSAP         | Animaciones (reveal, parallax, contadores, hero) |
| Lenis        | Scroll suave integrado con ScrollTrigger   |
| SwiperJS     | Timeline del proceso + carrusel de testimonios |
| LightGallery | Galería masonry con zoom, thumbnails y fullscreen |
| Lucide       | Iconos inline (sin dependencia externa)    |

## 📁 Estructura

```
.
├── .github/workflows/deploy.yml   # Deploy automático a GitHub Pages
├── public/                        # Archivos estáticos
│   └── assets/                    # Imágenes, CV, video, placeholders
└── src/
    ├── components/                # Componentes reutilizables (Button, Icon, Reveal…)
    ├── layouts/                   # BaseLayout (SEO + estructura global)
    ├── sections/                  # Una sección por archivo (Hero, Servicios…)
    ├── styles/                    # global.css (tema Tailwind 4)
    ├── scripts/                   # Módulos JS/TS (gsap, lenis, cursor…)
    ├── data/                      # ⭐ TODO el contenido editable (JSON)
    ├── pages/                     # index.astro
    └── utils/                     # Helpers (asset path, tipos)
```

---

## 🚀 Instalación

Requisitos: **Node.js 20+** (recomendado 22).

```bash
# 1. Clona o copia el proyecto
git clone <tu-repo> && cd portafolio-creator

# 2. Instala dependencias
npm install

# 3. Servidor de desarrollo (http://localhost:4321)
npm run dev

# 4. Build de producción
npm run build

# 5. Previsualizar el build
npm run preview
```

---

## ✏️ Cómo editar el contenido

Toda la información vive en `src/data/`:

| Archivo              | Qué edita                                                      |
| -------------------- | -------------------------------------------------------------- |
| `site.json`          | Nombre, roles, tagline, contacto, redes, CV, SEO               |
| `metrics.json`       | Contadores animados de la sección Métricas                     |
| `services.json`      | Tarjetas de servicios                                          |
| `process.json`       | Pasos del timeline horizontal                                  |
| `projects.json`      | ⭐ Casos de éxito (objetivo, problema, solución, resultados)   |
| `videos.json`        | Grid de videos (usa el ID de YouTube)                          |
| `gallery.json`       | Galería masonry                                                |
| `tools.json`         | Herramientas y monogramas                                      |
| `experience.json`    | Timeline de experiencia                                        |
| `testimonials.json`  | Testimonios (estructura lista)                                 |
| `navigation.json`    | Menú de navegación                                             |

### Ejemplos rápidos

**Cambiar datos de contacto** → edita `site.json`:

```json
{
  "name": "TU NOMBRE",
  "email": "hola@tudominio.com",
  "whatsapp": "51XXXXXXXXX",
  "social": { "linkedin": "https://..." }
}
```

**Añadir un video de YouTube** → en `videos.json`, sustituye `id` por el ID del video (la parte `...v=XXXX` de la URL de YouTube):

```json
{
  "id": "TU_VIDEO_ID",
  "title": "Mi mejor campaña",
  "thumbnail": "/assets/video-1.jpg",
  "views": "120K",
  "platform": "youtube"
}
```

**Añadir un caso de éxito** → duplica un objeto en `projects.json` e incluye: `hero`, `objective`, `problem`, `solution`, `myRole`, `tools`, `results[]` y `gallery[]`.

### Imágenes y video

- Coloca tus imágenes reales en `public/assets/` (JPG/WebP recomendado para SEO).
- Cambia las rutas en los JSON correspondientes.
- El video de fondo del Hero se coloca en `public/assets/` y se referencia en `site.json → hero.video` (formato MP4).
- **Miniatura OG** (para compartir en redes): reemplaza `public/assets/og-placeholder.svg` por una imagen de **1200×630**.

---

## 🎨 Personalización visual

Colores, tipografías y utilidades están en `src/styles/global.css`:

- **Colores** → variables `--color-*` dentro de `@theme` (bloques `@theme`).
- **Acento** → `--color-brand: #0ea5e9`.
- **Tipografías** → `--font-sans` (Inter) y `--font-display` (Space Grotesk).

Para cambiar una fuente: instala `@fontsource-variable/<fuente>` e importa en `BaseLayout.astro`, luego actualiza las variables en `@theme`.

---

## 🚢 Deploy automático a GitHub Pages

El repositorio incluye un flujo de trabajo (`.github/workflows/deploy.yml`) que construye y publica el sitio en cada `push` a la rama `main`.

### Configuración de GitHub Pages

1. Sube este proyecto a un repositorio de GitHub.
2. Ve a **Settings → Pages**.
3. En **Build and deployment → Source**, selecciona **GitHub Actions**.
4. Cada `git push` a `main` (o ejecución manual desde la pestaña **Actions**) publicará automáticamente el sitio.

El flujo:
- Detecta el nombre del repositorio y ajusta el **base path** automáticamente (soporta sitios de proyecto `usuario.github.io/repo` y de usuario `usuario.github.io`).
- Inyecta la URL del sitio en `SITE` para generar el `sitemap` y las etiquetas OG correctas.

> Nota: para un sitio de usuario (`usuario.github.io`), renombra el repositorio a `usuario.github.io` — el flujo lo maneja solo. Si tu sitio es de usuario, puedes fijar `BASE_PATH` a `/` en el workflow si lo prefieres.

---

## 🔍 SEO y rendimiento

Incluido por defecto:

- Meta tags, **OpenGraph** y **Twitter Cards** completos.
- **JSON-LD** (schema `Person` y `WebSite`) para resultados enriquecidos.
- **Canonical**, `sitemap.xml` y `robots.txt`.
- Fuentes **auto-hospedadas** (sin peticiones a Google).
- Imágenes con `loading="lazy"` y `width/height` (evita CLS).
- **Code splitting**: GSAP/Lenis en el bundle inicial; Swiper y LightGallery se cargan de forma diferida.
- Minificación de HTML, CSS, JS y SVG con `astro-compress`.

---

## 🛠️ Comandos útiles

| Comando                | Descripción                                 |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo                      |
| `npm run build`        | Build estático en `dist/`                   |
| `npm run preview`      | Previsualiza el build                       |
| `npx astro check`      | Valida tipos y accesibilidad                |
| `npx tsc --noEmit`     | Revisa tipos de los scripts                 |

---

## 📝 Licencia

Proyecto de uso personal. Las imágenes y videos placeholder deben reemplazarse por material propio.
