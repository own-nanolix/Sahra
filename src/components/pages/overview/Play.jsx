'use client';

import { useEffect, useRef } from 'react';
import { still } from '@/lib/site';
import s from './play.module.css';

// Holds the CSS animations of the artwork inside it until the piece scrolls into view, so that a drawing that
// starts below the fold is seen drawing. Content already in view plays at once. With motion off, or when the
// page is exported, nothing is held: the artwork is complete.
// No state: the attribute is set on the element itself (as the shared Reveal does).
export default function Play({ children, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || still()) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return undefined;
    el.setAttribute('data-play', 'wait');
    const go = () => el.setAttribute('data-play', 'go');
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          go();
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    io.observe(el);
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
          go();
          io.disconnect();
          window.removeEventListener('scroll', onScroll);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      el.setAttribute('data-play', 'go');
    };
  }, []);
  return (
    <Tag ref={ref} data-play="go" className={`${s.play} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
