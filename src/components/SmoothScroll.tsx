'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export let lenis: Lenis | null = null;

export function scrollToTarget(target: string | number) {
  if (lenis) lenis.scrollTo(target, { offset: typeof target === 'string' ? -24 : 0, duration: 1.4 });
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
}

export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
    }

    // Route in-page anchor links through Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute('href')!;
      if (hash === '#') {
        e.preventDefault();
        scrollToTarget(0);
        return;
      }
      if (document.querySelector(hash)) {
        e.preventDefault();
        scrollToTarget(hash);
        history.replaceState(null, '', hash);
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
