/**
 * Cursor personalizado: punto + anillo con interacción hover.
 * Se desactiva automáticamente en dispositivos táctiles y con reduced motion.
 */
export function initCursor(): void {
  const fine = window.matchMedia('(pointer: fine)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduced) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  document.documentElement.classList.add('has-cursor');

  const pos = { x: -100, y: -100 };
  const ringPos = { x: -100, y: -100 };
  let visible = false;

  window.addEventListener('mousemove', (event) => {
    pos.x = event.clientX;
    pos.y = event.clientY;
    dot.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`;
    if (!visible) {
      visible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  });

  const loop = (): void => {
    ringPos.x += (pos.x - ringPos.x) * 0.16;
    ringPos.y += (pos.y - ringPos.y) * 0.16;
    ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);

  const growTargets = 'a, button, [data-cursor="hover"], input, textarea, select, .cursor-grow';

  document.addEventListener('mouseover', (event) => {
    const target = (event.target as HTMLElement).closest(growTargets);
    ring.classList.toggle('cursor-ring--grow', Boolean(target));
    dot.classList.toggle('cursor-dot--grow', Boolean(target));
  });

  document.addEventListener('mousedown', () => {
    dot.style.transform += ' scale(0.7)';
    ring.classList.add('cursor-ring--pressed');
  });
  document.addEventListener('mouseup', () => {
    ring.classList.remove('cursor-ring--pressed');
  });

  document.addEventListener('mouseleave', () => {
    visible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
}
