'use client';

import { useEffect, useRef, useState } from 'react';
import { still } from '@/lib/site';
import s from './icons.module.css';

// Holds the drawing animations of everything inside it until it scrolls into view, then lets them run once.
// The artwork itself is always complete: the animations play from a start state towards the base style.
export default function InView({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (still()) {
      const t = setTimeout(() => setSeen(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setSeen(true);
        io.disconnect();
      }
    }, { rootMargin: '0px 0px -10% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-seen={seen ? 'on' : 'off'} className={`${s.gate} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
