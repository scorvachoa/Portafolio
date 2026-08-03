import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

/**
 * BASE_PATH y SITE se inyectan automáticamente desde GitHub Actions.
 * Localmente no se definen y el sitio corre desde la raíz "/".
 */
const base = process.env.BASE_PATH || '/';
const site = process.env.SITE || 'http://localhost:4321';

export default defineConfig({
  site,
  base,
  output: 'static',
  build: {
    format: 'directory',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/assets/'),
    }),
    compress({
      CSS: true,
      HTML: true,
      JavaScript: true,
      SVG: true,
      Image: false,
    }),
  ],
});
