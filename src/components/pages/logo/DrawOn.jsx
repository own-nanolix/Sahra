'use client';

// The signature motion: the word-mark draws on along its guides, then fills. CSS keyframes only inside the SVG
// (the shared `draw` and `fade-in` classes), playing towards the finished artwork. Replay re-mounts the graphic.
import { useState } from 'react';
import Art from '@/components/art/Art';
import { GLYPHS, WM } from '@/components/art/Mark';
import { CONSTRUCTION_MARKS } from '@/components/art/KeyArt';
import Button from '@/components/ui/Button';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './logo.module.css';

const PIECES = [...GLYPHS.latin, ...GLYPHS.arabic];
const W = 1600, H = 700, MW = 1300, MX = 150, MY = 215;
const K = MW / WM.W;

function DrawOnArt() {
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The word-mark drawing on along its guides, then filling" exportName="logo-draw-on">
      <rect width={W} height={H} fill={HEX.chocolate} />
      <g stroke={HEX.sand} strokeOpacity="0.4" strokeWidth="1" fill="none">
        {CONSTRUCTION_MARKS.guides.map((gy, i) => (
          <path key={gy} d={`M90 ${r2(MY + gy * K)}H1510`} className="draw" style={{ '--len': 1420, '--i': i }} />
        ))}
      </g>
      <g transform={`translate(${MX} ${MY}) scale(${r2(K * 10000) / 10000})`}>
        <g fill="none" stroke={HEX.sand} strokeWidth="1.6">
          {PIECES.map((g, i) => (
            <path key={g.id} d={g.p.d} pathLength="1" className="draw" style={{ '--len': 1, '--i': i + 4 }} />
          ))}
        </g>
        <g fill={HEX.sand}>
          {PIECES.map((g, i) => (
            <path key={g.id} d={g.p.d} className="fade-in" style={{ animationDelay: `${r2(1.5 + i * 0.07)}s` }} />
          ))}
        </g>
      </g>
    </Art>
  );
}

export default function DrawOn() {
  const [run, setRun] = useState(0);
  return (
    <div className={s.drawOn}>
      <div className={s.drawStage} key={run}>
        <DrawOnArt />
      </div>
      <div className={s.drawBar}>
        <span className="t-small">The guides draw first, then the strokes, then the fill.</span>
        <Button variant="beige" size="sm" icon="play" onClick={() => setRun((n) => n + 1)}>Replay</Button>
      </div>
    </div>
  );
}
