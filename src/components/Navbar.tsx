'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react';
import { navLinks, profile } from '@/lib/data';
import { lenis } from './SmoothScroll';

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 300 && y > prev && !open);
    setScrolled(y > 40);
  });

  // Highlight the section currently in view
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-crimson" style={{ scaleX: progress }} />

      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6"
        animate={{ y: hidden ? '-120%' : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 py-3 transition-colors duration-500 md:px-6 ${
            scrolled || open ? 'border-line bg-ink/70 backdrop-blur-xl' : 'border-transparent'
          }`}
        >
          <a href="#" className="group flex items-center gap-3" aria-label="Back to top">
            <span className="relative grid h-9 w-9 place-items-center rounded-lg border border-line bg-ink-2 font-display text-sm font-bold">
              MS
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-rose animate-pulse-dot" />
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-mute transition-colors group-hover:text-bone sm:block">
              {profile.firstName}.dev
            </span>
          </a>

          <ul className="hidden items-center gap-1 rounded-full border border-line bg-ink-2/60 p-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id} className="relative">
                <a
                  href={`#${l.id}`}
                  className={`relative z-10 block rounded-full px-4 py-1.5 text-sm transition-colors ${
                    active === l.id ? 'text-bone' : 'text-mute hover:text-bone'
                  }`}
                >
                  {l.label}
                </a>
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-crimson"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-bone px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-rose hover:text-bone md:flex"
          >
            Let&apos;s talk
          </a>

          <button
            className="relative h-10 w-10 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`absolute left-2 right-2 h-px bg-bone transition-transform duration-300 ${open ? 'top-1/2 rotate-45' : 'top-[40%]'}`} />
            <span className={`absolute left-2 right-2 h-px bg-bone transition-transform duration-300 ${open ? 'top-1/2 -rotate-45' : 'top-[60%]'}`} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-12 pt-28 md:hidden"
            initial={{ clipPath: 'circle(0% at 92% 6%)' }}
            animate={{ clipPath: 'circle(150% at 92% 6%)' }}
            exit={{ clipPath: 'circle(0% at 92% 6%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {navLinks.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 font-display text-5xl font-bold"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-mono text-xs text-rose">0{i + 1}</span>
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex gap-6 font-mono text-xs uppercase tracking-widest text-mute">
              {profile.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
