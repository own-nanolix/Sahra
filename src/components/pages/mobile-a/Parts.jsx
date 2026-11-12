'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { tEnter } from '@/lib/motion';
import s from './mobile-a.module.css';

// Shared pieces of the nine screens. Every screen is drawn on a fixed 390 x 844 artboard in plain pixels;
// <Artboard> scales that artboard to whatever box it is given with a CSS transform.

export const W = 390;
export const H = 844;

// A fixed-size artboard scaled by CSS transform. `scale` fixes the factor (the strip of thumbnails); without it
// the board fits the width of its parent box (the live phone). `name` becomes the data-screen marker.
export function Artboard({ name, scale, children }) {
  const box = useRef(null);
  const [fit, setFit] = useState(0.9);
  useEffect(() => {
    if (scale) return undefined;
    const el = box.current;
    const ro = new ResizeObserver(([e]) => setFit(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, [scale]);
  const k = scale || fit;
  const sized = scale ? { width: W * scale, height: H * scale } : undefined;
  return (
    <div ref={box} className={scale ? s.fixedBox : s.fitBox} style={sized}>
      <div className={s.board} data-screen={name} style={{ transform: `scale(${k})` }}>
        {children}
      </div>
    </div>
  );
}

// The screen changes with a slow, exact slide: no bounce.
export function Swap({ id, children }) {
  const calm = useReducedMotion();
  return (
    <motion.div key={id} className={s.swap} initial={calm ? false : { opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={tEnter}>
      {children}
    </motion.div>
  );
}

export function Word({ className = '', style }) {
  return (
    <svg className={`${s.word} ${className}`} viewBox="0 0 1420 251" aria-hidden="true" style={style}>
      <use href="#site-wordmark" />
    </svg>
  );
}

// The status bar is drawn as neutral shapes only (no clock time).
export function StatusBar({ dark }) {
  return (
    <div className={`${s.status} ${dark ? s.statusDark : ''}`} aria-hidden="true">
      <span className={s.stA} />
      <span className={s.stB} />
      <span className={s.stC} />
      <span className={s.stD} />
    </div>
  );
}

export function MenuButton({ onClick, style, className = '' }) {
  return (
    <button type="button" className={`${s.menuBtn} ${className}`} aria-label="Menu" onClick={onClick} style={style}>
      <i /><i /><i />
    </button>
  );
}

export function BackButton({ onClick, label = 'Back to About Sahra', style }) {
  return (
    <button type="button" className={s.backBtn} aria-label={label} onClick={onClick} style={style}>
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M20 12H5M11 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
    </button>
  );
}

// The row of a ruled list: number, serif label, "+" (or "-"). Used as a button when onClick is given.
export function Row({ no, label, onClick, open, ph, tall, about }) {
  const inner = (
    <>
      <span className={s.rowNo}>{no}</span>
      {ph ? <span className={s.rowBar} /> : <span className={s.rowLabel}>{label}</span>}
      <span className={`${s.rowPlus} ${open ? s.rowOpen : ''}`} aria-hidden="true" />
    </>
  );
  const cls = `${s.row} ${tall ? s.rowTall : ''} ${about ? s.rowAbout : ''} ${onClick ? s.rowBtn : ''}`;
  if (!onClick) return <div className={cls}>{inner}</div>;
  return (
    <button type="button" className={cls} onClick={onClick} aria-expanded={open === undefined ? undefined : open}>
      {inner}
    </button>
  );
}

// A small round-cornered control used inside screens (step, zoom, copy ...).
export function Pill({ children, onClick, pressed, label, dark, disabled }) {
  return (
    <button type="button" className={`${s.pill} ${dark ? s.pillDark : ''}`} aria-pressed={pressed} aria-label={label} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
