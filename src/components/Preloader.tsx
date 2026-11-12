'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { markLoaded } from '@/lib/loader';
import { lenis } from './SmoothScroll';

const DURATION = 1500;

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true);
      markLoaded();
      return;
    }
    lenis?.stop();
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // ease-out so the counter decelerates into 100
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setDone(true);
          markLoaded();
          lenis?.start();
        }, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[90] flex flex-col justify-between bg-ink p-6 md:p-10"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between font-mono text-xs uppercase tracking-[0.25em] text-mute">
            <span>Mujtabo / Portfolio</span>
            <span>Initializing</span>
          </div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[18vw] font-extrabold leading-[0.85] tracking-tight md:text-[13vw]"
            >
              {String(count).padStart(3, '0')}
              <span className="text-crimson">.</span>
            </motion.p>
          </div>

          <div className="h-px w-full bg-line">
            <div className="h-px bg-crimson transition-[width] duration-75" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
