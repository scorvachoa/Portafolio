/**
 * Modal de video (YouTube / TikTok / Facebook) con <dialog> nativo: accesible y lazy.
 * Cualquier elemento con [data-video-open] y [data-video-id] abre el modal.
 */
export function initVideoModal(): void {
  const dialog = document.getElementById('video-modal') as HTMLDialogElement | null;
  const iframe = document.getElementById('video-modal-frame') as HTMLIFrameElement | null;
  if (!dialog || !iframe) return;

  const verticalPlatforms = ['tiktok', 'facebook', 'youtube'];

  const embedUrl = (video: { platform: string; id: string; url?: string }): string => {
    switch (video.platform) {
      case 'tiktok':
        return `https://www.tiktok.com/embed/${video.id}?autoplay=1`;
      case 'facebook':
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.url ?? '')}&show_text=false&autoplay=1&width=420`;
      default:
        return `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`;
    }
  };

  const openVideo = (video: { platform: string; id: string; url?: string }): void => {
    iframe.src = embedUrl(video);
    dialog.classList.toggle('is-vertical', verticalPlatforms.includes(video.platform));
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
      if (!id) return;
      openVideo({
        id,
        platform: trigger.dataset.videoPlatform ?? 'youtube',
        url: trigger.dataset.videoUrl,
      });
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
