'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { GLYPHS, ANCHORS, MarkG, WM } from '@/components/art/Mark';
import { ConstructionG, CONSTRUCTION_MARKS } from '@/components/art/KeyArt';
import { C } from './data';
import s from './motion.module.css';

const GLYPH_LIST = [...GLYPHS.latin, ...GLYPHS.arabic];
const GUIDES_Y = CONSTRUCTION_MARKS.guides;
const GUIDES_X = [...new Set(ANCHORS.map(([x]) => Math.round(x)))].sort((a, b) => a - b);
const VB = '-60 -50 1540 350';

// The four layers of the word-mark's build, in the order m03 draws them. With `animated` each layer carries the
// CSS keyframes that play from its start state towards the finished base style, so the still SVG is complete.
//   0 guide grid, 1 outlines, 2 anchor points, 3 the fill.
function Layers({ upTo, animated }) {
  const a = (cls) => (animated ? cls : undefined);
  const showOutline = upTo === 1 || upTo === 2 || animated;
  return (
    <>
      <rect x="-60" y="-50" width="1540" height="350" fill={C.chocolate} />
      <g stroke={C.beige} strokeOpacity="0.22" strokeWidth="1.2" fill="none">
        {GUIDES_Y.map((y, i) => (
          <path key={`h${y}`} d={`M-50 ${y}H1470`} pathLength="1" className={a(s.gDraw)} style={{ '--i': i }} />
        ))}
        {GUIDES_X.map((x, i) => (
          <path key={`v${x}`} d={`M${x} -30V280`} pathLength="1" className={a(s.gDraw)} style={{ '--i': i % 24 }} />
        ))}
      </g>
      {showOutline && (
        <g fill="none" stroke={C.sand} strokeWidth="1.8">
          {GLYPH_LIST.map((g, i) => (
            <path key={g.id} d={g.p.d} pathLength="1" className={a(s.gOut)} style={{ '--i': i }} />
          ))}
        </g>
      )}
      {(upTo === 2 || animated) && (
        <g fill={C.anchor}>
          {ANCHORS.map(([x, y], i) => (
            <rect key={i} x={x - 4.5} y={y - 4.5} width="9" height="9" className={a(s.gAnc)} style={{ '--i': i % 40 }} />
          ))}
        </g>
      )}
      {(upTo === 3 || animated) && (
        <g fill={C.sand} className={a(s.gFill)}>
          {GLYPH_LIST.map((g) => <path key={g.id} d={g.p.d} />)}
        </g>
      )}
    </>
  );
}

// The key frames of the build, sampled from the same layers (times are the delays set in motion.module.css).
const FRAMES = [
  { n: 0, name: 'Guide grid', t: '0.0 s', note: 'Fine guides draw on along the grid, 900 ms each, 30 ms apart.' },
  { n: 1, name: 'Outlines', t: '0.5 s', note: 'The outlines draw on one letter at a time, 70 ms apart.' },
  { n: 2, name: 'Anchor points', t: '1.3 s', note: 'Anchor points appear in a quiet cascade, then step back.' },
  { n: 3, name: 'The fill', t: '2.3 s', note: 'The fill comes up slowly over 1600 ms and the construction falls away.' },
];

export function LogoBuild() {
  const [run, setRun] = useState(0);
  return (
    <div className={s.logoBuild}>
      <Art viewBox={VB} title="The word-mark assembling: guide grid, outlines, anchor points, fill" exportName="motion-logo-build" key={run}>
        <Layers upTo={3} animated />
      </Art>
      <div className={s.tileFoot}>
        <span className="t-small on-dark">Guide grid, outlines, anchor points, then the fill: about 3.9 s.</span>
        <button type="button" className="btn btn-sm btn-beige" onClick={() => setRun((n) => n + 1)} aria-label="Replay the word-mark build">Replay</button>
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
          <Art viewBox={VB} title={`Key frame ${f.n + 1}: ${f.name}, ${f.t}`} exportName={`motion-logo-frame-${f.n + 1}`}>
            <Layers upTo={f.n} animated={false} />
          </Art>
          <figcaption>
            <b className="t-num">{`0${f.n + 1}`}</b> <span className="t-serif">{f.name}</span> <span className="t-small">{f.t}</span>
            <span className="t-small" style={{ display: 'block' }}>{f.note}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

// The reference frames of the construction animation (m03_1 to m03_4), redrawn. Cuts are labelled "42°" as printed.
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
        <rect x="-100" y="-100" width="1700" height="500" fill={C.beige} />
        {cur.cfg ? (
          <g className={s.refIn}>
            <ConstructionG width={WM.W} {...cur.cfg} />
          </g>
        ) : (
          <g fill={C.tribal} className={s.refIn}>
            {GLYPH_LIST.map((g) => <path key={g.id} d={g.p.d} />)}
          </g>
        )}
      </Art>
      <p className="t-small">{`Frame ${cur.n}: ${cur.name}.`}</p>
    </div>
  );
}
