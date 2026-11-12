'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { experience } from '@/lib/data';
import { FadeUp, SectionLabel, SplitReveal, TiltCard } from './ui/motion';

export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="experience" className="relative scroll-mt-24 px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="03">Experience</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
              <SplitReveal text="Milestones & achievements" wordClassName={(w) => (w === 'achievements' ? 'text-rose' : '')} />
            </h2>
            <FadeUp delay={0.2}>
              <p className="mt-6 max-w-sm leading-relaxed text-mute">
                Internships, competitions and challenges where I shipped real software for real people.
              </p>
            </FadeUp>
          </div>
        </div>

        <ol ref={listRef} className="relative space-y-6 pl-10 lg:col-span-7 md:pl-14">
          {/* track + scroll-drawn progress */}
          <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-line md:left-[15px]" />
          <motion.span
            aria-hidden
            style={{ scaleY: line }}
            className="absolute bottom-0 left-[11px] top-0 w-px origin-top bg-gradient-to-b from-rose via-crimson to-crimson shadow-[0_0_12px_rgba(227,93,122,0.8)] md:left-[15px]"
          />

          {experience.map((e, i) => (
            <li key={`${e.role}-${e.org}`} className="relative">
              <motion.span
                aria-hidden
                className="absolute -left-10 top-8 grid h-6 w-6 place-items-center rounded-full border border-crimson bg-ink md:-left-14 md:h-8 md:w-8"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-30% 0px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <span className="h-2 w-2 rounded-full bg-rose md:h-2.5 md:w-2.5" />
              </motion.span>

              <FadeUp delay={0.05}>
                <TiltCard className="p-7 md:p-9" max={4}>
                  <div className="relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-crimson/60 bg-crimson/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-rose">
                        {e.tag}
                      </span>
                      <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
                      <div className="max-w-md">
                        <h3 className="font-display text-2xl font-semibold leading-tight">{e.role}</h3>
                        <p className="mt-1 text-sm text-bone/70">{e.org}</p>
                      </div>
                      {e.highlight && (
                        <span className="text-sheen font-display text-5xl font-extrabold tracking-tight">{e.highlight}</span>
                      )}
                    </div>
                    <p className="mt-5 leading-relaxed text-mute">{e.desc}</p>
                  </div>
                </TiltCard>
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
