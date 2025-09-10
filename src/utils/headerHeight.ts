import { ref } from 'vue';

export const headerHeight = ref<number>(64);

let ro: ResizeObserver | null = null;
let initialized = false;

function update() {
  if (typeof document === 'undefined') return;
  const nav = document.querySelector('nav') as HTMLElement | null;
  headerHeight.value = nav ? nav.offsetHeight : 64;
}

export function initHeaderHeight() {
  if (initialized || typeof window === 'undefined') { update(); return; }
  update();
  if ('ResizeObserver' in window) {
    const nav = document.querySelector('nav');
    if (nav) {
      ro = new ResizeObserver(update);
      ro.observe(nav);
    }
  }
  window.addEventListener('resize', update);
  initialized = true;
}

export function destroyHeaderHeight() {
  if (!initialized || typeof window === 'undefined') return;
  if (ro) ro.disconnect();
  window.removeEventListener('resize', update);
  initialized = false;
}