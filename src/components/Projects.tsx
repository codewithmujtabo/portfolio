'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'motion/react';
import { projects } from '@/lib/data';
import { useInView } from '@/lib/hooks';
import { ArrowIcon, SectionLabel, SplitReveal } from './ui/motion';

const DeviceScene = dynamic(() => import('./three/DeviceScene'), { ssr: false });

const pad = (n: number) => String(n + 1).padStart(2, '0');
const EASE = [0.16, 1, 0.3, 1] as const;
const SLIDE_MS = 4000;

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [slide, setSlide] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageActive = useInView(stageRef, '100px');
  const project = projects[current];
  const slides = project.media.type === 'slides' ? project.media.slides : null;

  const go = (i: number) => {
    setCurrent((i + projects.length) % projects.length);
    setSlide(0);
  };

  // Auto-advance screenshot slideshows while the stage is visible.
  // `slide` is a dependency so clicking a dot restarts the timer.
  useEffect(() => {
    if (!slides || !stageActive) return;
    const id = setTimeout(() => setSlide((s) => (s + 1) % slides.length), SLIDE_MS);
    return () => clearTimeout(id);
  }, [slides, stageActive, slide]);

  return (
    <section id="projects" className="relative scroll-mt-24 px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="02">Selected work</SectionLabel>
            <h2 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
              <SplitReveal
                text="A small selection of recent projects"
                wordClassName={(_, i) => (i >= 4 ? 'text-rose' : '')}
              />
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-mute">
            {pad(current)} <span className="text-line">/</span> {pad(projects.length - 1)}
          </p>
        </div>

        {/* block on mobile so the stage stays sticky over the list; grid on desktop */}
        <div className="mt-16 lg:grid lg:grid-cols-12 lg:gap-10">
          {/* 3D stage */}
          <div
              ref={stageRef}
              className="sticky top-4 z-20 mb-6 h-[46svh] min-h-[320px] overflow-hidden rounded-3xl border border-line bg-ink-2 lg:order-2 lg:col-span-7 lg:top-24 lg:mb-0 lg:h-[640px] lg:self-start"
              data-cursor="Drag"
            >
              {/* giant ghost index */}
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={current}
                  aria-hidden
                  className="text-outline pointer-events-none absolute -bottom-10 right-2 select-none font-display text-[38vw] font-extrabold leading-none lg:text-[300px]"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  exit={{ opacity: 0, y: -60 }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  {pad(current)}
                </motion.span>
              </AnimatePresence>
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,37,59,0.25),transparent_65%)]" />

              <div className="absolute inset-0">
                <DeviceScene project={project} index={current} slide={slide} active={stageActive} />
              </div>

              {/* HUD */}
              <div aria-hidden className="hud-corners pointer-events-none absolute inset-4" />
              <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-6 font-mono text-[10px] uppercase tracking-[0.25em] text-mute md:p-8">
                <span>PRJ_{pad(current)}</span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose animate-pulse-dot" />
                  Live preview · {project.device}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6 md:p-8">
                {slides ? (
                  <div className="flex min-w-0 flex-col gap-2">
                    <span className="truncate font-mono text-[10px] uppercase tracking-[0.25em] text-bone/80" aria-live="polite">
                      {slides[slide].label}
                    </span>
                    <div className="flex gap-1.5">
                      {slides.map((s, i) => (
                        <button
                          key={s.src}
                          onClick={() => setSlide(i)}
                          aria-label={`Show ${s.label}`}
                          aria-current={i === slide}
                          className="relative h-1 w-5 overflow-hidden rounded-full bg-bone/20 md:w-7"
                        >
                          {i === slide && (
                            <motion.span
                              key={`${current}-${slide}`}
                              className="absolute inset-0 origin-left bg-rose"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: stageActive ? 1 : 0 }}
                              transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-mute sm:block">Drag to rotate</span>
                )}
                <div className="ml-auto flex gap-2">
                  {[
                    { label: 'Previous project', d: -1, path: 'm15 18-6-6 6-6' },
                    { label: 'Next project', d: 1, path: 'm9 18 6-6-6-6' },
                  ].map((b) => (
                    <button
                      key={b.d}
                      onClick={() => go(current + b.d)}
                      aria-label={b.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-line bg-ink/60 backdrop-blur transition-colors hover:border-crimson hover:bg-crimson"
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d={b.path} />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          {/* Index list */}
          <ol className="lg:order-1 lg:col-span-5">
            {projects.map((p, i) => {
              const on = i === current;
              return (
                <li key={p.title} className="border-b border-line first:border-t">
                  <button
                    onClick={() => go(i)}
                    aria-expanded={on}
                    className="group relative flex w-full items-center gap-5 py-6 text-left"
                  >
                    <motion.span
                      className="absolute -left-5 top-0 h-full w-[2px] origin-top bg-crimson md:-left-8"
                      initial={false}
                      animate={{ scaleY: on ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />
                    <span className={`font-mono text-xs transition-colors ${on ? 'text-rose' : 'text-mute'}`}>{pad(i)}</span>
                    <span className="flex-1">
                      <span
                        className={`block font-display text-xl font-semibold transition-all duration-500 md:text-2xl ${
                          on ? 'translate-x-1 text-bone' : 'text-bone/55 group-hover:translate-x-1 group-hover:text-bone'
                        }`}
                      >
                        {p.title}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
                        {p.kind}
                        {p.status && (
                          <span className="rounded-full border border-crimson/60 bg-crimson/15 px-2 py-0.5 text-[9px] text-rose">{p.status}</span>
                        )}
                      </span>
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                        on ? 'rotate-90 border-crimson bg-crimson' : 'border-line group-hover:border-bone/40'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-9">
                          <p className="leading-relaxed text-mute">{p.description1}</p>
                          <p className="mt-4 leading-relaxed text-mute">{p.description2}</p>
                          <ul className="mt-6 flex flex-wrap gap-2">
                            {p.tech.map((t) => (
                              <li
                                key={t.name}
                                className="flex items-center gap-2 rounded-full border border-line bg-ink-2 py-1.5 pl-1.5 pr-3 text-xs font-medium"
                              >
                                {t.icon ? (
                                  <span className="grid h-6 w-6 place-items-center rounded-full bg-bone/95 p-1">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={t.icon} alt="" className="h-full w-full object-contain" />
                                  </span>
                                ) : (
                                  <span aria-hidden className="ml-1.5 h-1.5 w-1.5 rounded-full bg-rose" />
                                )}
                                {t.name}
                              </li>
                            ))}
                          </ul>
                          {p.link && (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-rose hover:text-bone"
                            >
                              Visit {p.link.replace(/^https?:\/\//, '')}
                              <ArrowIcon className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
