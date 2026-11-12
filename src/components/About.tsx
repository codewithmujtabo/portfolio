'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { animate, useInView as useMotionInView } from 'motion/react';
import { experience, profile, projects, stack } from '@/lib/data';
import { useClock, useInView } from '@/lib/hooks';
import { FadeUp, SectionLabel, SplitReveal, TiltCard } from './ui/motion';

const GlobeScene = dynamic(() => import('./three/GlobeScene'), { ssr: false });

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useMotionInView(ref, { once: true });
  useEffect(() => {
    if (!seen || !ref.current) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => ref.current && (ref.current.textContent = Math.round(v) + suffix),
    });
    return () => c.stop();
  }, [seen, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(profile.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${profile.email}`;
        }
      }}
      className="group relative mt-6 flex w-full items-center justify-between overflow-hidden rounded-2xl border border-bone/20 bg-ink/40 px-5 py-4 text-left backdrop-blur transition-colors hover:border-bone/50"
    >
      <span className="relative z-10 text-sm font-semibold">{copied ? 'Copied to clipboard ✓' : 'Copy my email address'}</span>
      <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-bone text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {copied ? (
            <path d="M20 6 9 17l-5-5" />
          ) : (
            <>
              <rect width="14" height="14" x="8" y="8" rx="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </>
          )}
        </svg>
      </span>
    </button>
  );
}

export default function About() {
  const globeRef = useRef<HTMLDivElement>(null);
  const globeActive = useInView(globeRef);
  const time = useClock(profile.timeZone);
  const internships = experience.filter((e) => e.tag === 'Internship').length;
  const half = Math.ceil(stack.length / 2);

  return (
    <section id="about" className="relative scroll-mt-24 px-5 py-28 md:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="01">About</SectionLabel>
        <h2 className="mt-6 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl">
          <SplitReveal text="I build things for the web, from the database to the last pixel." />
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6 md:gap-5 lg:grid-cols-12">
          {/* Portrait + intro */}
          <FadeUp className="md:col-span-6 lg:col-span-7">
            <TiltCard className="flex h-full flex-col overflow-hidden sm:flex-row" max={4}>
              <div className="relative h-96 shrink-0 overflow-hidden sm:h-auto sm:min-h-[420px] sm:w-[44%]">
                <Image
                  src="/images/mujtabo-portrait.jpg"
                  alt={`Portrait of ${profile.name}`}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
                  className="object-cover object-[50%_18%] grayscale contrast-125 transition-all duration-700 hover:scale-105 hover:grayscale-0"
                  priority={false}
                />
                {/* duotone wash */}
                <div className="pointer-events-none absolute inset-0 bg-crimson mix-blend-multiply opacity-60" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-2 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-ink-2" />
                <span className="absolute left-4 top-4 rounded-full border border-bone/20 bg-ink/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">
                  ID_001 · {profile.firstName}
                </span>
              </div>
              <div className="relative z-10 flex flex-col justify-between gap-8 p-7 md:p-9">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-rose">The inside scoop</p>
                <div>
                  <p className="font-display text-2xl font-semibold leading-snug md:text-3xl">
                    I prioritize client collaboration, fostering open communication.
                  </p>
                  <p className="mt-5 leading-relaxed text-mute">
                    I love solving problems and building things through code. Programming isn&apos;t just my profession, it&apos;s my
                    passion. I enjoy exploring new technologies and constantly enhancing my skills.
                  </p>
                </div>
              </div>
            </TiltCard>
          </FadeUp>

          {/* Globe / time zones */}
          <FadeUp delay={0.1} className="md:col-span-6 lg:col-span-5">
            <TiltCard className="relative h-full min-h-[420px] overflow-hidden" max={4}>
              <div ref={globeRef} className="absolute inset-0 top-16" data-cursor="Earth">
                <GlobeScene active={globeActive} />
              </div>
              <div className="relative z-10 flex items-start justify-between p-7 md:p-9">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-mute">Remote-ready</p>
                  <p className="mt-2 max-w-[16rem] font-display text-2xl font-semibold leading-snug">
                    Very flexible with time zone communications
                  </p>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 flex justify-between bg-gradient-to-t from-ink-2 to-transparent p-7 pt-16 font-mono text-[11px] uppercase tracking-[0.2em] text-mute md:p-9">
                <span>
                  Bandung · UTC+7
                  <br />
                  <span className="text-bone tabular-nums">{time || '--:--:--'}</span>
                </span>
                <span className="text-right">
                  Lat −6.9°
                  <br />
                  Lon 107.6°
                </span>
              </div>
            </TiltCard>
          </FadeUp>

          {/* Stack */}
          <FadeUp delay={0.05} className="md:col-span-3 lg:col-span-5">
            <TiltCard className="relative flex h-full min-h-[340px] overflow-hidden" max={4}>
              <div className="relative z-10 flex w-1/2 flex-col justify-end p-7 md:p-9">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-mute">I constantly try to improve</p>
                <p className="mt-2 font-display text-3xl font-bold">My tech stack</p>
              </div>
              <div className="mask-fade-y absolute inset-y-0 right-4 flex w-1/2 gap-3 overflow-hidden md:right-6">
                {[stack.slice(0, half), stack.slice(half)].map((col, ci) => (
                  <div key={ci} className={`flex flex-1 flex-col gap-3 ${ci ? 'animate-marquee-y-rev' : 'animate-marquee-y'}`}>
                    {[...col, ...col].map((s, i) => (
                      <span
                        key={i}
                        aria-hidden={i >= col.length}
                        className="rounded-xl border border-line bg-ink-3 px-3 py-3 text-center text-sm font-medium transition-colors hover:border-crimson hover:text-rose"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </TiltCard>
          </FadeUp>

          {/* Passion */}
          <FadeUp delay={0.1} className="md:col-span-3 lg:col-span-3">
            <TiltCard className="flex h-full min-h-[340px] flex-col justify-between p-7 md:p-9" max={6}>
              <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" aria-hidden>
                <rect x="1" y="1" width="46" height="46" rx="12" stroke="#8B253B" strokeWidth="2" />
                <path d="m18 18-6 6 6 6M30 18l6 6-6 6M26 14l-4 20" stroke="#E35D7A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="relative z-10 font-display text-2xl font-semibold leading-snug">
                Tech enthusiast with a passion for development.
              </p>
            </TiltCard>
          </FadeUp>

          {/* CTA */}
          <FadeUp delay={0.15} className="md:col-span-6 lg:col-span-4">
            <div className="relative flex h-full min-h-[340px] flex-col justify-end overflow-hidden rounded-3xl bg-crimson p-7 md:p-9">
              <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[40px] border-bone/10" />
              <div aria-hidden className="absolute -right-4 top-10 h-24 w-24 rounded-full bg-rose/40 blur-2xl" />
              <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-bone/70">Let&apos;s collaborate</p>
              <p className="relative mt-2 font-display text-3xl font-bold leading-tight">Do you want to start a project together?</p>
              <CopyEmail />
            </div>
          </FadeUp>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-1 divide-y divide-line rounded-3xl border border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { n: projects.length, s: '+', label: 'Projects shipped' },
            { n: 1, s: 'st', label: 'Place out of 150 at Hackhazards' },
            { n: internships, s: '', label: 'Full-stack internships' },
          ].map((st, i) => (
            <FadeUp key={i} delay={i * 0.08} className="flex items-end justify-between gap-4 p-7 md:p-9">
              <span className="font-display text-6xl font-bold tracking-tight md:text-7xl">
                <Counter to={st.n} suffix={st.s} />
              </span>
              <span className="max-w-[9rem] text-right font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-mute">
                {st.label}
              </span>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

