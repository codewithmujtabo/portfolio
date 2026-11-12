'use client';

import { useSyncExternalStore } from 'react';

// Tiny shared flag: flips to true when the preloader finishes so intro animations can start.
let loaded = false;
const listeners = new Set<() => void>();

export function markLoaded() {
  if (loaded) return;
  loaded = true;
  listeners.forEach((l) => l());
}

export function useLoaded() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => loaded,
    () => false,
  );
}
