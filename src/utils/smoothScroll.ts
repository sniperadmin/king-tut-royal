export const smoothScroll = (target: string | HTMLElement | null, options?: { behavior?: ScrollBehavior; block?: ScrollLogicalPosition; offset?: number }) => {
  if (typeof document === 'undefined') return;

  const resolveElement = (t: string | HTMLElement | null): HTMLElement | null => {
    if (!t) return null;
    if (typeof t === 'string') {
      const id = t.startsWith('#') ? t.slice(1) : t;
      return document.getElementById(id);
    }
    return t as HTMLElement;
  };

  const targetElement = resolveElement(target);
  if (!targetElement) {
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      window.scrollTo({ top: 0, behavior: options?.behavior || 'smooth' });
    }
    return;
  }

  const prefersReduced = typeof window !== 'undefined' && 'matchMedia' in window && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = prefersReduced ? 'auto' : (options?.behavior || 'smooth');

  if ('scrollIntoView' in targetElement && typeof targetElement.scrollIntoView === 'function' && !options?.offset) {
    targetElement.scrollIntoView({ behavior, block: options?.block || 'start' });
    return;
  }

  const rect = targetElement.getBoundingClientRect();
  const offset = options?.offset || 0;
  const top = rect.top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior });
};