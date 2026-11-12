'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import s from './lp-spaces.module.css';

// The stepped-shadow divider: a strip wider than the screen whose staircases of light and shade slide sideways as
// the page scrolls past, like the sun moving along a wall. The wrapper moves; the artwork inside stays as drawn.
export default function Sun({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-23%']);
  return (
    <div ref={ref} className={s.sun}>
      <motion.div className={s.sunTrack} style={{ x }}>{children}</motion.div>
    </div>
  );
}
