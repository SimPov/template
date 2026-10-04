/**
 * Scroll reveals — one shared IntersectionObserver for every [data-reveal]
 * element on the page.
 *
 * Behaviour:
 *   - Elements already in view at load are revealed immediately, so
 *     above-the-fold content is never invisible.
 *   - Each element animates once and is then unobserved (no re-trigger on
 *     scroll-up), which is what you want for marketing pages.
 *   - Fully skipped when the user prefers reduced motion.
 *   - A no-op when the browser lacks IntersectionObserver.
 *
 * The visible/hidden states themselves live in src/styles/global.css.
 */
const SELECTOR = '[data-reveal]';

// Guard: never run outside the browser (e.g. if this file is ever imported
// during SSR, where `window` and `document` do not exist).
function canRun(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function initReveals(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal everything at once: no animation, nothing hidden.
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
      el.dataset.reveal = 'in';
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.reveal = 'in';
        observer.unobserve(entry.target);
      }
    },
    {
      // Fire slightly after the element enters, so the animation is visible.
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1,
    },
  );

  document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => observer.observe(el));
}

if (canRun()) {
  initReveals();
}
