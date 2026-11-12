'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { profile } from '@/lib/data';
import { useClock } from '@/lib/hooks';
import { ArrowIcon, Magnetic, SplitReveal } from './ui/motion';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const time = useClock(profile.timeZone);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const nameY = useTransform(scrollYProgress, [0, 1], ['40%', '0%']);
  const clip = useTransform(scrollYProgress, [0.4, 1], ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']);

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-line px-5 pt-28 md:px-8 md:pt-40">
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[1000px] -translate-x-1/2 translate-y-1/2 rounded-full bg-crimson/30 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
          <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
            <SplitReveal
              text="Ready to take your digital presence to the next level?"
              wordClassName={(w) => (w === 'your' ? 'text-rose' : '')}
            />
          </h2>
          <Magnetic strength={0.25}>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative grid h-40 w-40 place-items-center overflow-hidden rounded-full bg-crimson text-center font-semibold md:h-48 md:w-48"
            >
              <span className="absolute inset-0 scale-0 rounded-full bg-rose transition-transform duration-500 group-hover:scale-100" />
              <span className="relative flex flex-col items-center gap-2">
                Let&apos;s get
                <br />
                in touch
                <ArrowIcon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </a>
          </Magnetic>
        </div>
        <p className="mt-8 max-w-md text-mute">Reach out today and let&apos;s discuss how I can help you achieve your goals.</p>

        <div className="mt-24 flex flex-col gap-6 border-t border-line py-8 font-mono text-[11px] uppercase tracking-[0.2em] text-mute md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span className="tabular-nums">Bandung · {time || '--:--:--'} WIB</span>
          <div className="flex gap-6">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-rose">
                {s.label}
              </a>
            ))}
            <a href="#" className="transition-colors hover:text-rose">
              Top ↑
            </a>
          </div>
        </div>
      </div>

      {/* Giant wordmark that fills with crimson as you reach the end */}
      <motion.div style={{ y: nameY }} aria-hidden className="relative mx-auto -mb-[2vw] max-w-[1600px] select-none">
        <span className="text-outline block text-center font-display text-[19vw] font-extrabold leading-[0.8] tracking-[-0.04em]">
          MUJTABO
        </span>
        <motion.span
          className="absolute inset-0 block overflow-hidden text-center font-display text-[19vw] font-extrabold leading-[0.8] tracking-[-0.04em] text-crimson"
          style={{ clipPath: clip }}
        >
          MUJTABO
        </motion.span>
      </motion.div>
    </footer>
  );
}
