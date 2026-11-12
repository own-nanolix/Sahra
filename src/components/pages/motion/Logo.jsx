'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { GLYPHS, ANCHORS, MarkG, WM } from '@/components/art/Mark';
import { ConstructionG, CONSTRUCTION_MARKS, DRAWING } from '@/components/art/KeyArt';
import { TINTS } from '@/lib/brand';
import { ease } from '@/lib/motion';
import { clamp } from '@/lib/site';
import { C, bezierAt } from './data';
import s from './motion.module.css';

const GLYPH_LIST = [...GLYPHS.latin, ...GLYPHS.arabic];
const GUIDES_Y = CONSTRUCTION_MARKS.guides;
const GUIDES_X = [...new Set(ANCHORS.map(([x]) => Math.round(x)))].sort((a, b) => a - b);
const VB = '-60 -50 1540 350';

// The construction animation's own colours (m03): beige paper, fine guides, brown outlines, blue anchors, and the
// fill of its last still (m03_4), sampled at #9A785F: the published Tribal Brown 80% tint.
const M03 = { paper: DRAWING.paper, guide: DRAWING.guide, line: DRAWING.line, anchor: DRAWING.anchor, fill: TINTS.tribal[0] };

// One timeline for every layer, in ms. The CSS animation reads these delays; the storyboard samples the same
// values at a given time, so each key frame is exactly what the animation shows at that moment.
const T = {
  guide: (i) => ({ delay: (i % 24) * 30, dur: 900, e: ease.draw }),
  draw: (i) => ({ delay: 500 + i * 70, dur: 900, e: ease.draw }),
  fade: (i) => ({ delay: 2400 + i * 20, dur: 900, e: ease.sun }),
  anchor: (i) => ({ delay: 1300 + (i % 40) * 18, dur: 1600, e: ease.out }),
  fill: () => ({ delay: 2300, dur: 1600, e: ease.sun }),
};
const END = 3900;
const local = (sp, t) => clamp((t - sp.delay) / sp.dur, 0, 1);
const at = (sp, t) => bezierAt(sp.e, local(sp, t));
// The anchors' keyframes: 0% hidden, 25% shown, 75% shown, 100% hidden; the curve applies to each segment.
const anchorOpacity = (sp, t) => {
  const x = (t - sp.delay) / sp.dur;
  if (x <= 0 || x >= 1) return 0;
  if (x < 0.25) return bezierAt(sp.e, x / 0.25);
  if (x < 0.75) return 1;
  return 1 - bezierAt(sp.e, (x - 0.75) / 0.25);
};
const r3 = (v) => Math.round(v * 1000) / 1000;

// The four layers of the word-mark's build, in the order m03 draws them: 0 guide grid, 1 outlines, 2 anchor points,
// 3 the fill. With t == null each layer carries CSS keyframes that play from its start state towards the finished
// base style (so the still SVG is complete); with a time t (ms) the state at that moment is written as attributes.
function Layers({ t = null }) {
  const live = t === null;
  const delay = (sp) => ({ '--delay': `${sp.delay}ms` });
  const guides = [...GUIDES_Y.map((y) => `M-50 ${y}H1470`), ...GUIDES_X.map((x) => `M${x} -30V280`)];
  return (
    <>
      <rect x="-60" y="-50" width="1540" height="350" fill={M03.paper} />
      <g stroke={M03.guide} strokeWidth="1.5" fill="none">
        {guides.map((d, i) => {
          const sp = T.guide(i < GUIDES_Y.length ? i : i - GUIDES_Y.length);
          return live
            ? <path key={d} d={d} pathLength="1" className={s.gDraw} style={delay(sp)} />
            : <path key={d} d={d} pathLength="1" strokeDasharray="1" strokeDashoffset={r3(1 - at(sp, t))} />;
        })}
      </g>
      <g fill="none" stroke={M03.line} strokeWidth="2">
        {GLYPH_LIST.map((g, i) => {
          const a = T.draw(i), b = T.fade(i);
          if (live) return <path key={g.id} d={g.p.d} pathLength="1" className={s.gOut} style={{ '--delay': `${a.delay}ms`, '--delay2': `${b.delay}ms` }} />;
          const op = t < b.delay ? 1 : 1 - at(b, t);
          if (op <= 0 || local(a, t) <= 0) return null;
          return <path key={g.id} d={g.p.d} pathLength="1" strokeDasharray="1" strokeDashoffset={r3(1 - at(a, t))} opacity={r3(op)} />;
        })}
      </g>
      <g fill={M03.anchor}>
        {ANCHORS.map(([x, y], i) => {
          const sp = T.anchor(i);
          if (live) return <rect key={i} x={x - 4.5} y={y - 4.5} width="9" height="9" className={s.gAnc} style={delay(sp)} />;
          const op = anchorOpacity(sp, t);
          return op > 0 ? <rect key={i} x={x - 4.5} y={y - 4.5} width="9" height="9" opacity={r3(op)} /> : null;
        })}
      </g>
      {(live || at(T.fill(), t) > 0) && (
        <g fill={M03.fill} className={live ? s.gFill : undefined} style={live ? delay(T.fill()) : undefined} opacity={live ? undefined : r3(at(T.fill(), t))}>
          {GLYPH_LIST.map((g) => <path key={g.id} d={g.p.d} />)}
        </g>
      )}
    </>
  );
}

// Key frames sampled from the timeline above: guides drawn; outlines drawing; outlines and anchors (as m03_1);
// the finished fill (as m03_4).
const FRAMES = [
  { n: 0, name: 'Guide grid', t: 900, note: 'The fine guides draw on along the grid, 900 ms each, 30 ms apart.' },
  { n: 1, name: 'Outlines', t: 1500, note: 'The outlines draw on one letter at a time, 70 ms apart.' },
  { n: 2, name: 'Anchor points', t: 2400, note: 'Every anchor point is on, as in the first still of the construction animation.' },
  { n: 3, name: 'The fill', t: END, note: 'The fill has come up over 1600 ms and the construction has fallen away.' },
];
const secs = (ms) => `${(ms / 1000).toFixed(1)} s`;

export function LogoBuild() {
  const [run, setRun] = useState(0);
  return (
    <div className={s.logoBuild}>
      <Art viewBox={VB} title="The word-mark assembling: guide grid, outlines, anchor points, fill" exportName="motion-logo-build" key={run}>
        <Layers />
      </Art>
      <div className={s.tileFoot}>
        <span className="t-small">Guide grid, outlines, anchor points, then the fill: {secs(END)}.</span>
        <button type="button" className="btn btn-sm btn-outline" onClick={() => setRun((n) => n + 1)} aria-label="Replay the word-mark build">Replay</button>
      </div>
    </div>
  );
}

export function MarkAssemble() {
  const [run, setRun] = useState(0);
  return (
    <div className={s.markAssemble}>
      <Art viewBox="0 0 300 300" title="The mark: two halves of the S sliding together" exportName="motion-mark-assemble" key={run}>
        <rect width="300" height="300" fill={C.chocolate} />
        <MarkG idp="motion-mk" x={78} y={74} size={144} fill={C.sand} topClass="mark-top" bottomClass="mark-bottom" />
      </Art>
      <div className={s.tileFoot}>
        <span className="t-small on-dark">The two halves slide in and lock along the cut, 1600 ms.</span>
        <button type="button" className="btn btn-sm btn-beige" onClick={() => setRun((n) => n + 1)} aria-label="Replay the mark assembling">Replay</button>
      </div>
    </div>
  );
}

export function Storyboard() {
  return (
    <div className={s.storyboard}>
      {FRAMES.map((f) => (
        <figure key={f.n} className={s.frame}>
          <Art viewBox={VB} title={`Key frame ${f.n + 1}: ${f.name}, ${secs(f.t)}`} exportName={`motion-logo-frame-${f.n + 1}`}>
            <Layers t={f.t} />
          </Art>
          <figcaption>
            <b className="t-num">{`0${f.n + 1}`}</b> <span className="t-serif">{f.name}</span> <span className="t-small">{secs(f.t)}</span>
            <span className="t-small" style={{ display: 'block' }}>{f.note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

// The reference frames of the construction animation (m03_1 to m03_4), redrawn. Cuts are labelled as printed: "34°" on the Latin cuts, "42°" on the Arabic cuts.
const REFS = [
  { n: 1, vb: VB, name: 'Guides, outlines and anchor points', cfg: { units: false, angles: false } },
  { n: 2, vb: '-40 -40 780 340', name: 'Close-up of Sahra, x and y units', cfg: { units: true, angles: true } },
  { n: 3, vb: '690 -40 780 340', name: 'Close-up of the Arabic half, 42° cuts', cfg: { units: true, angles: true } },
  { n: 4, vb: VB, name: 'The finished word-mark', cfg: null },
];

export function RefFrames() {
  const [open, setOpen] = useState(1);
  const cur = REFS.find((r) => r.n === open);
  return (
    <div className={s.refs}>
      <div className="row" role="group" aria-label="Reference frames">
        {REFS.map((r) => (
          <button key={r.n} type="button" className={`btn btn-sm ${r.n === open ? 'btn-dark' : 'btn-ghost'}`} aria-pressed={r.n === open} onClick={() => setOpen(r.n)}>
            {`Frame ${r.n}`}
          </button>
        ))}
      </div>
      <Art viewBox={cur.vb} title={`Reference frame ${cur.n}: ${cur.name}`} exportName={`motion-logo-ref-${cur.n}`} key={cur.n} className={s.refSvg}>
        <rect x="-100" y="-100" width="1700" height="500" fill={M03.paper} />
        {cur.cfg ? (
          <g className={s.refIn}>
            <ConstructionG width={WM.W} {...cur.cfg} />
          </g>
        ) : (
          <g fill={M03.fill} className={s.refIn}>
            {GLYPH_LIST.map((g) => <path key={g.id} d={g.p.d} />)}
          </g>
        )}
      </Art>
      <p className="t-small">{`Frame ${cur.n}: ${cur.name}.`}</p>
    </div>
  );
}
