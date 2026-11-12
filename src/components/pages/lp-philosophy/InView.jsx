'use client';

import { useEffect, useRef, useState } from 'react';
import { still } from '@/lib/site';

// Marks its wrapper `data-in="true"` once it scrolls into view, so a CSS keyframe can play at that moment.
// The artwork itself is complete without it: the keyframes only run from a start state towards the base style.
export default function InView({ children, className, threshold = 0.35, ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (still()) {
      const t = setTimeout(() => setOn(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return (
    <div ref={ref} className={className} data-in={on ? 'true' : 'false'} {...rest}>
      {children}
    </div>
  );
}
