/**
 * Utilidades auxiliares del portafolio.
 */

/**
 * Prefija el base path de GitHub Pages a una ruta de un archivo de /public.
 * Ejemplo: asset("/assets/hero.jpg") -> "/repo/assets/hero.jpg"
 */
export function asset(path: string): string {
  if (!path || path.startsWith('http') || path.startsWith('mailto') || path.startsWith('#')) {
    return path;
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}
