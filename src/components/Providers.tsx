'use client';

import { MotionConfig } from 'motion/react';
import SmoothScroll from './SmoothScroll';
import Cursor from './Cursor';
import Preloader from './Preloader';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <Preloader />
      <Cursor />
      {/* Ambient backdrop: grid + crimson glows + film grain */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
        <div className="absolute -top-60 left-1/2 h-[640px] w-[900px] -translate-x-1/2 rounded-full bg-crimson/20 blur-[140px]" />
        <div className="absolute -bottom-80 -right-40 h-[520px] w-[620px] rounded-full bg-crimson/10 blur-[140px]" />
      </div>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
        <div className="grain" />
      </div>
      {children}
    </MotionConfig>
  );
}
