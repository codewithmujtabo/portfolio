'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * Two-part cursor: a precise dot + a lagging ring that grows over interactive
 * elements and can show a label via `data-cursor="Label"`.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [label, setLabel] = useState('');
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add('has-cursor');

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor], input, textarea, label');
      const isField = !!el && /INPUT|TEXTAREA/.test(el.tagName);
      setHover(!!el && !isField);
      setLabel(el?.dataset.cursor ?? '');
    };
    const leave = () => setVisible(false);
    const pd = () => setDown(true);
    const pu = () => setDown(false);

    window.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    window.addEventListener('pointerdown', pd);
    window.addEventListener('pointerup', pu);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointerdown', pd);
      window.removeEventListener('pointerup', pu);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = label ? 84 : hover ? 56 : 34;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-bone/50 font-mono text-[10px] uppercase tracking-widest text-bone"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          scale: down ? 0.85 : 1,
          backgroundColor: label ? 'rgba(139,37,59,0.9)' : hover ? 'rgba(139,37,59,0.18)' : 'rgba(0,0,0,0)',
          borderColor: hover || label ? 'rgba(227,93,122,0.9)' : 'rgba(245,245,245,0.45)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {label}
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-rose"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && !label ? 1 : 0 }}
      />
    </>
  );
}
