'use client';

import { useState } from 'react';
import { clamp } from '@/lib/site';
import { ticks } from '@/lib/charts';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import s from './dataviz.module.css';

export const C = { ...HEX, rule: '#C9BBAE' };

// Tooltip state shared by every chart: marks get hover and keyboard focus; the tip is drawn inside the SVG.
export function useTip() {
  const [tip, setTip] = useState(null);
  const on = (x, y, text) => ({
    tabIndex: 0,
    role: 'img',
    'aria-label': text,
    className: s.mark,
    onMouseEnter: () => setTip({ x, y, text }),
    onMouseLeave: () => setTip(null),
    onFocus: () => setTip({ x, y, text }),
    onBlur: () => setTip(null),
    onClick: () => setTip({ x, y, text }),
    onKeyDown: (e) => { if (e.key === 'Escape') setTip(null); },
  });
  return [tip, on];
}

export function Tip({ tip, w }) {
  if (!tip) return null;
  const tw = Math.round(tip.text.length * 6.1 + 20);
  const x = clamp(tip.x - tw / 2, 4, w - tw - 4);
  const y = Math.max(4, tip.y - 36);
  return (
    <g className="fade-in" pointerEvents="none">
      <rect x={x} y={y} width={tw} height="26" rx="5" fill={C.chocolate} />
      <text x={x + 10} y={y + 17} fontSize="12" fill={C.beige} className="sans">{tip.text}</text>
    </g>
  );
}

export const Bg = ({ w, h, fill = C.white }) => <rect width={w} height={h} fill={fill} />;

// Tick text and axis lines of the brand's kind: thin, muted, serif numerals.
export const T = ({ x, y, children, anchor = 'middle', size = 11, serif, fill = C.muted, ...r }) => (
  <text x={x} y={y} textAnchor={anchor} fontSize={size} fill={fill} className={serif ? 'serif' : 'sans'} {...r}>{children}</text>
);
export const HLine = ({ x1, x2, y, ...r }) => <line x1={x1} x2={x2} y1={y} y2={y} stroke={C.rule} strokeWidth="1" {...r} />;

export const pathLen = (pts) => Math.ceil(pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0)) + 2;

// A tile: heading, the chart, and a plain caption saying what it counts.
export function Fig({ span = 4, title, caption, children, delay = 0 }) {
  return (
    <Reveal as="figure" delay={delay} className={`tile tile-print span-${span} ${s.fig}`}>
      <h3 className={`t-h3 ${s.figTitle}`}>{title}</h3>
      <div className={s.figArt}>{children}</div>
      <figcaption className="t-small">{caption}</figcaption>
    </Reveal>
  );
}

export function Legend({ items, label = 'Legend' }) {
  return (
    <ul className={s.legend} aria-label={label}>
      {items.map((it) => (
        <li key={it.name}>
          <i className={s.swatch} style={{ background: it.color }} aria-hidden="true" />
          <span>{it.name}</span>
        </li>
      ))}
    </ul>
  );
}

// Ticks from 0 that always reach the maximum.
export function nice(max, n = 4) {
  const tk = ticks(0, max, n);
  const step = tk[1] - tk[0];
  while (tk[tk.length - 1] < max) tk.push(tk[tk.length - 1] + step);
  return tk;
}
