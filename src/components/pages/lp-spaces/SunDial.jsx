'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import Reveal from '@/components/site/Reveal';
import { r2, scale } from '@/lib/charts';
import { HEX, LETTER } from '@/lib/brand';
import { PHOTO } from '@/components/art/KeyArt';
import s from './lp-spaces.module.css';

// A stair on a plaster wall and the shadow it throws. The brand's own idea of light ("shadows lengthen like sun on
// a wall"): one control moves the sun, and the stepped shadow leans and lengthens with it. The drawing is static
// at the start; the slider is plain English ("Sun position") and works with the keyboard.
const BASE = 470;
const STEPS = 6;
const SW = 84;
const SH = 52;
const X0 = 380;

// Outline of the stair, left to right, rising to the right: [[x, y], ...] with the base line closed.
const outline = [[X0, BASE]];
for (let i = 0; i < STEPS; i++) {
  outline.push([X0 + SW * i, BASE - SH * (i + 1)], [X0 + SW * (i + 1), BASE - SH * (i + 1)]);
}
outline.push([X0 + SW * STEPS, BASE]);
const stairD = `M${outline.map(([x, y]) => `${x} ${y}`).join('L')}Z`;

export default function SunDial() {
  const [t, setT] = useState(0.4);
  // The sun's height falls as t rises: the shadow leans further to the right and lengthens.
  const lean = scale(0, 1, 0.15, 1.5)(t);
  const shadowD = `M${outline.map(([x, y]) => `${r2(x + (BASE - y) * lean)} ${y}`).join('L')}Z`;
  const sunX = scale(0, 1, 140, 300)(t);
  const sunY = scale(0, 1, 90, 250)(t);
  return (
    <div className={s.dial}>
      <Reveal from="scale" className={s.dialArt}>
        <Art viewBox="0 0 1200 600" title="A stair on a plaster wall and its stepped shadow, lengthening with the sun" exportName="lp-spaces-sun-wall">
          <defs>
            <linearGradient id="lp-spaces-dial-wall" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F0E9E1" />
              <stop offset="1" stopColor="#D3BCA6" />
            </linearGradient>
            <clipPath id="lp-spaces-dial-clip">
              <rect width="1200" height={BASE} />
            </clipPath>
          </defs>
          <rect width="1200" height="600" fill="url(#lp-spaces-dial-wall)" />
          <rect y={BASE} width="1200" height={600 - BASE} fill={HEX.sand} opacity="0.55" />
          <g clipPath="url(#lp-spaces-dial-clip)">
            <path d={shadowD} fill={HEX.chocolate} opacity="0.55" />
          </g>
          <path d={stairD} fill={PHOTO.timberLight} />
          {Array.from({ length: STEPS }, (_, i) => (
            <rect key={i} x={X0 + SW * i} y={BASE - SH * (i + 1)} width={SW} height="6" fill="#F5F0E3" opacity="0.7" />
          ))}
          <circle cx={sunX} cy={sunY} r="38" fill={HEX.beige} />
          <circle cx={sunX} cy={sunY} r="38" fill="none" stroke={HEX.sand} strokeWidth="2" />
          <rect y={BASE - 3} width="1200" height="3" fill={HEX.chocolate} opacity="0.4" />
        </Art>
      </Reveal>
      <div className={s.dialText}>
        <Reveal>
          <p className="t-lead">{LETTER.paragraphs[3]}</p>
        </Reveal>
        <Reveal delay={100}>
          <div className={s.dialControl}>
            <label htmlFor="lp-spaces-sun" className="t-label">Sun position</label>
            <input
              id="lp-spaces-sun"
              className={s.dialRange}
              type="range"
              min="0"
              max="100"
              step="1"
              value={Math.round(t * 100)}
              onChange={(e) => setT(Number(e.target.value) / 100)}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
