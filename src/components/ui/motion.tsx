'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, type HTMLMotionProps } from 'motion/react';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Word-by-word masked rise. `play` forces start (e.g. after preloader); otherwise triggers in view. */
export function SplitReveal({
  text,
  className = '',
  wordClassName = '',
  delay = 0,
  play,
  stagger = 0.06,
}: {
  text: string;
  className?: string;
  wordClassName?: ((word: string, i: number) => string) | string;
  delay?: number;
  play?: boolean;
  stagger?: number;
}) {
  const words = text.split(' ');
  const trigger =
    play === undefined
      ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
      : { initial: 'hidden', animate: play ? 'show' : 'hidden' };

  return (
    <motion.span className={className} {...trigger} transition={{ staggerChildren: stagger, delayChildren: delay }} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className={`inline-block ${typeof wordClassName === 'function' ? wordClassName(w, i) : wordClassName}`}
            variants={{ hidden: { y: '110%', rotate: 4 }, show: { y: 0, rotate: 0 } }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function FadeUp({ delay = 0, className, children, ...rest }: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Pulls its child toward the pointer. */
export function Magnetic({ children, strength = 0.35, className = '' }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** 3D tilt + pointer spotlight card. */
export function TiltCard({ children, className = '', max = 7 }: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className={`spotlight relative rounded-3xl border border-line bg-ink-2/80 backdrop-blur-sm [transform-style:preserve-3d] ${className}`}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1200 }}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el || e.pointerType !== 'mouse') return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', `${px * 100}%`);
        el.style.setProperty('--my', `${py * 100}%`);
        el.style.setProperty('--spot-o', '1');
        ry.set((px - 0.5) * max * 2);
        rx.set(-(py - 0.5) * max * 2);
      }}
      onPointerLeave={() => {
        ref.current?.style.setProperty('--spot-o', '0');
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-mute">
      <span className="text-rose">{index}</span>
      <span className="h-px w-10 bg-line" />
      <span>{children}</span>
    </div>
  );
}

export function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}
