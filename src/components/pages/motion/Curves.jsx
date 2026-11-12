'use client';

import { useEffect, useRef, useState } from 'react';
import Art from '@/components/art/Art';
import { r2 } from '@/lib/charts';
import { still } from '@/lib/site';
import { C, EASES, DURS, cubic, bezierAt } from './data';
import s from './motion.module.css';

// Plot box of one curve inside its 260 x 220 sheet: time runs left to right, progress bottom to top.
const X0 = 40, X1 = 220, Y0 = 170, Y1 = 50;
const W = X1 - X0, H = Y0 - Y1;
const px = (p) => [
  [X0, Y0],
  [r2(X0 + p[0] * W), r2(Y0 - p[1] * H)],
  [r2(X0 + p[2] * W), r2(Y0 - p[3] * H)],
  [X1, Y1],
];

// The curve as an exportable sheet: the real control points, the handles, the token name and value.
function CurveArt({ e, run }) {
  const [a, b, c, d] = px(e.p);
  return (
    <Art viewBox="0 0 260 220" title={`${e.token}: ${cubic(e.p)}`} exportName={`motion-curve-${e.id}`}>
      <rect width="260" height="220" fill={C.beige} />
      <text x="14" y="24" fontSize="14" fontWeight="500" fill={C.ink} className="sans">{e.token}</text>
      <text x="14" y="41" fontSize="11" fill={C.muted} className="sans">{cubic(e.p)}</text>
      <rect x={X0} y={Y1} width={W} height={H} fill="none" stroke={C.line} strokeWidth="1" />
      <path d={`M${X0} ${Y0}L${X1} ${Y1}`} stroke={C.line} strokeWidth="1" strokeDasharray="3 4" />
      <path d={`M${a[0]} ${a[1]}L${b[0]} ${b[1]}M${d[0]} ${d[1]}L${c[0]} ${c[1]}`} stroke={C.sand} strokeWidth="1.5" />
      <path
        key={run}
        d={`M${a[0]} ${a[1]}C${b[0]} ${b[1]} ${c[0]} ${c[1]} ${d[0]} ${d[1]}`}
        fill="none"
        stroke={C.tribal}
        strokeWidth="3"
        pathLength="1"
        className="draw"
        style={{ '--len': 1 }}
      />
      {[a, d].map((q, i) => <circle key={i} cx={q[0]} cy={q[1]} r="3.5" fill={C.ink} />)}
      {[b, c].map((q, i) => <rect key={i} x={q[0] - 4} y={q[1] - 4} width="8" height="8" fill={C.tribal} />)}
      <text x={X0} y="188" fontSize="11" fill={C.muted} className="sans">0</text>
      <text x={X1} y="188" fontSize="11" textAnchor="end" fill={C.muted} className="sans">time 1</text>
      <text x={X0 - 6} y={Y1 + 4} fontSize="11" textAnchor="end" fill={C.muted} className="sans">1</text>
      <text x={X0 - 6} y={Y0 + 4} fontSize="11" textAnchor="end" fill={C.muted} className="sans">0</text>
      <text x="14" y="208" fontSize="11" fill={C.ink} className="sans">{e.role}, plays at {e.durToken} ({e.ms} ms)</text>
    </Art>
  );
}

// One curve, live. The dot is driven frame by frame from the same bezier, so it travels the drawn curve and a
// track below it; it always ends on the final value (also when it is replayed, or on reduced motion).
function CurveTile({ e }) {
  const [run, setRun] = useState(0);
  const wrap = useRef(null);
  const dot = useRef(null);
  const track = useRef(null);
  const tdot = useRef(null);
  const raf = useRef(0);

  const apply = (t) => {
    const w = wrap.current ? wrap.current.clientWidth : 0;
    const k = w / 260;
    const v = bezierAt(e.p, t);
    if (dot.current) dot.current.style.transform = `translate(${r2((t - 1) * W * k)}px, ${r2((1 - v) * H * k)}px)`;
    if (track.current && tdot.current) {
      const span = track.current.clientWidth - tdot.current.offsetWidth;
      tdot.current.style.transform = `translateX(${r2((v - 1) * span)}px)`;
    }
  };

  const play = () => {
    cancelAnimationFrame(raf.current);
    setRun((n) => n + 1);
    if (still()) {
      apply(1);
      return;
    }
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - t0) / e.ms);
      apply(t);
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    apply(0);
    raf.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const frame = raf;
    return () => cancelAnimationFrame(frame.current);
  }, []);

  return (
    <div className={s.curveTile}>
      <div className={s.curveWrap} ref={wrap}>
        <CurveArt e={e} run={run} />
        <span className={s.dot} ref={dot} aria-hidden="true" />
      </div>
      <div className={s.track} ref={track} aria-hidden="true">
        <span className={s.rail} />
        <span className={s.tdot} ref={tdot} />
      </div>
      <div className={s.tileFoot}>
        <span className="t-small">{e.token} with {e.durToken}</span>
        <button type="button" className="btn btn-sm btn-outline" onClick={play} aria-label={`Play the ${e.token} curve`}>Play</button>
      </div>
    </div>
  );
}

export function CurveGrid() {
  return (
    <div className={s.curveGrid}>
      {EASES.map((e) => <CurveTile key={e.id} e={e} />)}
    </div>
  );
}

// The five durations as bars; each bar grows over its own length, so the strip is a real clock.
export function DurationStrip() {
  const [run, setRun] = useState(0);
  const max = 1600;
  const L = 20, BW = 380;
  return (
    <div className={s.durWrap}>
      <Art viewBox="0 0 420 310" title="Duration tokens --dur-1 to --dur-5 as bars" exportName="motion-durations" key={run}>
        <rect width="420" height="310" fill={C.beige} />
        <text x={L} y="28" fontSize="13" fill={C.muted} className="sans">Duration tokens, drawn to scale</text>
        {DURS.map((d, i) => {
          const y = 52 + i * 50;
          return (
            <g key={d.token}>
              <text x={L} y={y + 12} fontSize="13" fontWeight="500" fill={C.ink} className="sans">{d.token}</text>
              <text x={L + 76} y={y + 12} fontSize="13" fill={C.muted} className="sans">{d.ms} ms, {d.use}</text>
              <rect x={L} y={y + 20} width={BW} height="14" fill="#E7DFD9" />
              <rect
                x={L}
                y={y + 20}
                width={r2((d.ms / max) * BW)}
                height="14"
                fill={C.tribal}
                className={s.bar}
                style={{ '--d': `var(--dur-${i + 1})` }}
              />
            </g>
          );
        })}
      </Art>
      <div className={s.tileFoot}>
        <span className="t-small">Each bar grows over its own duration.</span>
        <button type="button" className="btn btn-sm btn-outline" onClick={() => setRun((n) => n + 1)} aria-label="Play the duration bars">Play</button>
      </div>
    </div>
  );
}
