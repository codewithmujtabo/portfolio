'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLoaded } from '@/lib/loader';
import { useClock, useInView, useMediaQuery } from '@/lib/hooks';
import { profile } from '@/lib/data';
import { ArrowIcon, Magnetic, SplitReveal } from './ui/motion';

const HeroScene = dynamic(() => import('./three/HeroScene'), { ssr: false });

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const loaded = useLoaded();
  const inView = useInView(ref, '0px');
  const compact = useMediaQuery('(max-width: 1023px)');
  const time = useClock(profile.timeZone);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: loaded ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1, ease: EASE, delay },
  });

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2, ease: EASE }}
        data-cursor="Move"
      >
        <HeroScene active={inView} compact={compact} />
      </motion.div>
      {/* keep text legible over the 3D on small screens */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent lg:bg-gradient-to-r lg:from-ink/80 lg:via-ink/10 lg:to-transparent" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-28 pt-32 md:px-8 lg:justify-center lg:pb-16"
      >
        <motion.div {...fade(0.1)} className="mb-8 flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-line bg-ink-2/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-mute backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-rose animate-pulse-dot" />
            Available for new projects
          </span>
        </motion.div>

        <h1 className="max-w-4xl font-display text-[13vw] font-bold leading-[0.92] tracking-[-0.03em] sm:text-7xl lg:text-[96px]">
          <SplitReveal play={loaded} delay={0.15} text="Transforming concepts" className="block" />
          <SplitReveal
            play={loaded}
            delay={0.3}
            text="into seamless"
            className="block"
            wordClassName={(w) => (w === 'seamless' ? 'italic text-rose' : '')}
          />
          <SplitReveal play={loaded} delay={0.45} text="experiences." className="block text-outline" />
        </h1>

        <motion.p {...fade(0.7)} className="mt-8 max-w-md text-base leading-relaxed text-mute md:text-lg">
          Hi! I&apos;m <span className="text-bone">{profile.name}</span>, a full-stack developer based in{' '}
          {profile.location}, building fast, interactive web products end to end.
        </motion.p>

        <motion.div {...fade(0.85)} className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href="#projects"
              className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-crimson px-7 py-4 font-semibold text-bone shadow-[0_0_40px_-8px_rgba(139,37,59,0.9)]"
            >
              <span className="absolute inset-0 translate-y-full bg-rose transition-transform duration-500 ease-out group-hover:translate-y-0" />
              <span className="relative">View my work</span>
              <ArrowIcon className="relative h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="flex items-center gap-3 rounded-full border border-line bg-ink-2/60 px-7 py-4 font-semibold backdrop-blur transition-colors hover:border-bone/40"
            >
              Get in touch
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Bottom HUD */}
      <motion.div
        {...fade(1)}
        className="absolute inset-x-0 bottom-0 z-10 mx-auto flex max-w-7xl items-end justify-between px-5 pb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mute md:px-8"
      >
        <div className="hidden gap-8 sm:flex">
          <span>
            Based in
            <br />
            <span className="text-bone">Bandung, ID</span>
          </span>
          <span>
            Local time
            <br />
            <span className="tabular-nums text-bone">{time || '--:--:--'} WIB</span>
          </span>
        </div>
        <a href="#about" className="pointer-events-auto flex flex-col items-center gap-3" aria-label="Scroll to about">
          <span>Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-line">
            <span className="absolute inset-0 bg-rose animate-scroll-line" />
          </span>
        </a>
        <span className="hidden text-right sm:block">
          Role
          <br />
          <span className="text-bone">{profile.role}</span>
        </span>
      </motion.div>
    </section>
  );
}
