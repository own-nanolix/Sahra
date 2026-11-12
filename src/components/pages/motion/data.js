// The motion system, as the site defines it (src/lib/motion.js and the tokens in globals.css).
// Nothing here is invented: the curves, the durations and the paired transitions are the shared ones.
import { ease, dur } from '@/lib/motion';

// Hex values for exportable SVGs (CSS variables do not travel with an exported file).
export const C = {
  ink: '#1E140F',
  muted: '#5C4A3E',
  chocolate: '#35241C',
  tribal: '#875D41',
  sand: '#B58F6B',
  beige: '#F5F0E3',
  beigeMuted: '#CDBBA6',
  line: '#C9B9A6',
  anchor: '#1F6FE5',
};

// The four curves, each with the transition the site pairs it with (tEnter, tMove, tDraw, tSun).
export const EASES = [
  { id: 'out', token: '--ease-out', p: ease.out, role: 'Entering', durToken: '--dur-3', ms: Math.round(dur.d3 * 1000), sec: dur.d3 },
  { id: 'inout', token: '--ease-in-out', p: ease.inOut, role: 'Moves', durToken: '--dur-2', ms: Math.round(dur.d2 * 1000), sec: dur.d2 },
  { id: 'draw', token: '--ease-draw', p: ease.draw, role: 'Lines drawing', durToken: '--dur-4', ms: Math.round(dur.d4 * 1000), sec: dur.d4 },
  { id: 'sun', token: '--ease-sun', p: ease.sun, role: 'Slow light', durToken: '--dur-5', ms: Math.round(dur.d5 * 1000), sec: dur.d5 },
];

export const DURS = [
  { token: '--dur-1', ms: 140, use: 'Hover' },
  { token: '--dur-2', ms: 240, use: 'Small: toggles, chips' },
  { token: '--dur-3', ms: 480, use: 'Standard: cards, reveals' },
  { token: '--dur-4', ms: 900, use: 'Large: draws, charts' },
  { token: '--dur-5', ms: 1600, use: 'Slow: shadows, the mark' },
];

export const cubic = (p) => `cubic-bezier(${p.join(', ')})`;

// y (progress) of a cubic-bezier easing at time t (0..1): solve x(s) = t by bisection, return y(s).
export function bezierAt(p, t) {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  let lo = 0;
  let hi = 1;
  let s = t;
  for (let i = 0; i < 28; i += 1) {
    const x = 3 * (1 - s) * (1 - s) * s * p[0] + 3 * (1 - s) * s * s * p[2] + s * s * s;
    if (x < t) lo = s;
    else hi = s;
    s = (lo + hi) / 2;
  }
  return 3 * (1 - s) * (1 - s) * s * p[1] + 3 * (1 - s) * s * s * p[3] + s * s * s;
}
