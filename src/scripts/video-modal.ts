/**
 * Modal de video (YouTube) con <dialog> nativo: accesible y lazy.
 * Cualquier elemento con [data-video-open] y [data-video-id] abre el modal.
 */
export function initVideoModal(): void {
  const dialog = document.getElementById('video-modal') as HTMLDialogElement | null;
  const iframe = document.getElementById('video-modal-frame') as HTMLIFrameElement | null;
  if (!dialog || !iframe) return;

  const openVideo = (videoId: string): void => {
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    if (!dialog.open) dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  };

  const closeVideo = (): void => {
    iframe.src = '';
    dialog.close();
    document.documentElement.style.overflow = '';
  };

  document.querySelectorAll<HTMLElement>('[data-video-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const id = trigger.dataset.videoId;
      if (id) openVideo(id);
    });
  });

  dialog.querySelectorAll<HTMLElement>('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', closeVideo);
  });

  dialog.addEventListener('close', closeVideo);
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeVideo();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) closeVideo();
  });
}
