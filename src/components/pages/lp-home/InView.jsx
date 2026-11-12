'use client';

import { useEffect, useRef } from 'react';
import { still } from '@/lib/site';
import s from './lp-home.module.css';

// Holds the CSS animations of the artwork inside until it scrolls into view, then lets them play once.
// Content stays complete without script: the hold is only set below the fold, in an effect, and removed on cleanup.
export default function InView({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || still()) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return undefined;
    el.setAttribute('data-hold', 'true');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.setAttribute('data-hold', 'false');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.setAttribute('data-hold', 'false');
    };
  }, []);
  return (
    <div ref={ref} data-hold="false" className={`${s.hold} ${className}`}>
      {children}
    </div>
  );
}
