'use client';

// The plan explorer: the presentation sheet of m13 as a viewer that works. Zoom and pan the plan (buttons, wheel
// while the viewer has focus, arrow keys, drag, reset), switch five layers, step through the three ruled rows
// (each moves the view and shows one verbatim sentence of the plan paragraph), switch the sheet between Beige and
// Dark grounds, and play a guided tour that ends with the box lid closing over the sheet. The tour can be
// interrupted at any moment and always lands on a finished state (Skip to end).
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Toggle, { Segmented } from '@/components/ui/Toggle';
import Typewriter from '@/components/site/Typewriter';
import { MaterialDefs, CastRectG } from '@/components/art/Mockup';
import { ABOUT, PLAN } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { LAYER_KEYS, LAYER_LABELS, ALL_ON, SHEET_SIZE, SHEET_PLAN, SheetG, LidG, BOX } from './plan-art';
import s from './feature.module.css';

const VW = BOX.lid.w;
const VH = BOX.lid.h;
const FIT = { k: 1, tx: 60, ty: 73, m: 'slow' };
const K_MIN = 0.7;
const K_MAX = 5;
const SPEED = 22;

// the plan paragraph as printed, split into its three sentences; each ruled row shows one of them
const SENTENCES = PLAN.text.match(/[^.]+\./g).map((t) => t.trim());
// the part of the plan each row looks at, in plan coordinates
const STEPS = [
  { ...ABOUT.rows[0], focus: { x: 16, y: 30, w: 230, h: 210 }, text: SENTENCES[0] },
  { ...ABOUT.rows[1], focus: { x: 16, y: 226, w: 230, h: 260 }, text: SENTENCES[1] },
  { ...ABOUT.rows[2], focus: { x: 250, y: 30, w: 190, h: 480 }, text: SENTENCES[2] },
];

function viewFor(f) {
  const { x, y, k } = SHEET_PLAN;
  const w = f.w * k;
  const h = f.h * k;
  const kk = r2(Math.min(4.5, (VW - 70) / w, (VH - 70) / h));
  const cx = x + (f.x + f.w / 2) * k;
  const cy = y + (f.y + f.h / 2) * k;
  return { k: kk, tx: r2(VW / 2 - cx * kk), ty: r2(VH / 2 - cy * kk), m: 'slow' };
}

// keep a part of the sheet in view
function clampView(v) {
  const k = Math.min(K_MAX, Math.max(K_MIN, v.k));
  const m = 150;
  const sw = SHEET_SIZE.w * k;
  const sh = SHEET_SIZE.h * k;
  return { k, m: v.m, tx: r2(Math.min(VW - m, Math.max(m - sw, v.tx))), ty: r2(Math.min(VH - m, Math.max(m - sh, v.ty))) };
}

function zoomView(v, factor, cx = VW / 2, cy = VH / 2, m = 'fast') {
  const k = Math.min(K_MAX, Math.max(K_MIN, v.k * factor));
  return clampView({ k, tx: cx - ((cx - v.tx) * k) / v.k, ty: cy - ((cy - v.ty) * k) / v.k, m });
}

const holdFor = (i) => STEPS[i].text.length * SPEED + 1900;

export default function Explorer() {
  const [view, setView] = useState(FIT);
  const [layers, setLayers] = useState(ALL_ON);
  const [ground, setGround] = useState('beige');
  const [step, setStep] = useState(-1);
  const [tour, setTour] = useState('idle'); // idle | playing | paused | done
  const [lid, setLid] = useState('none'); // none | closed | open
  const [dragging, setDragging] = useState(false);
  const timer = useRef(0);
  const drag = useRef(null);
  const viewer = useRef(null);

  const halt = () => {
    clearTimeout(timer.current);
    setTour((t) => (t === 'playing' ? 'paused' : t));
  };

  // the wheel zooms only while the viewer has focus; otherwise the page scrolls as usual
  useEffect(() => {
    const el = viewer.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      if (document.activeElement !== el) return;
      e.preventDefault();
      clearTimeout(timer.current);
      setTour((t) => (t === 'playing' ? 'paused' : t));
      const r = el.getBoundingClientRect();
      const cx = ((e.clientX - r.left) / r.width) * VW;
      const cy = ((e.clientY - r.top) / r.height) * VH;
      setView((v) => zoomView(v, e.deltaY < 0 ? 1.15 : 1 / 1.15, cx, cy, 'none'));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // a timer left running when the page is left must not fire
  useEffect(() => () => clearTimeout(timer.current), []);

  const zoom = (f) => {
    halt();
    setView((v) => zoomView(v, f));
  };
  const reset = () => {
    halt();
    setStep(-1);
    setView({ ...FIT });
  };
  const choose = (i) => {
    clearTimeout(timer.current);
    setTour('paused');
    setLid((l) => (l === 'closed' ? 'open' : l));
    setStep(i);
    setView(viewFor(STEPS[i].focus));
  };

  function runStep(i) {
    clearTimeout(timer.current);
    setLid((l) => (l === 'closed' ? 'open' : l));
    setStep(i);
    setView(viewFor(STEPS[i].focus));
    setTour('playing');
    timer.current = setTimeout(() => {
      if (i + 1 < STEPS.length) runStep(i + 1);
      else {
        setLid('closed');
        setTour('done');
      }
    }, holdFor(i));
  }
  const finish = () => {
    clearTimeout(timer.current);
    setStep(STEPS.length - 1);
    setView(viewFor(STEPS[STEPS.length - 1].focus));
    setLid('closed');
    setTour('done');
  };
  const playPause = () => {
    if (tour === 'playing') halt();
    else if (tour === 'paused' && step >= 0) runStep(step);
    else runStep(0);
  };
  const toggleLid = () => {
    clearTimeout(timer.current);
    setTour((t) => (t === 'playing' ? 'paused' : t));
    setLid((l) => (l === 'closed' ? 'open' : 'closed'));
  };

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty };
    setDragging(true);
    halt();
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const ratio = VW / e.currentTarget.getBoundingClientRect().width;
    setView((v) => clampView({ ...v, m: 'none', tx: d.tx + (e.clientX - d.x) * ratio, ty: d.ty + (e.clientY - d.y) * ratio }));
  };
  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };
  const onKeyDown = (e) => {
    const pan = (dx, dy) => {
      e.preventDefault();
      halt();
      setView((v) => clampView({ ...v, m: 'fast', tx: v.tx + dx, ty: v.ty + dy }));
    };
    if (e.key === 'ArrowLeft') pan(48, 0);
    else if (e.key === 'ArrowRight') pan(-48, 0);
    else if (e.key === 'ArrowUp') pan(0, 48);
    else if (e.key === 'ArrowDown') pan(0, -48);
    else if (e.key === '+' || e.key === '=') {
      e.preventDefault();
      zoom(1.25);
    } else if (e.key === '-' || e.key === '_') {
      e.preventDefault();
      zoom(1 / 1.25);
    } else if (e.key === '0' || e.key === 'Home') {
      e.preventDefault();
      reset();
    }
  };

  const status = step < 0 ? 'Plan sheet at full view' : `Row ${STEPS[step].no}, ${STEPS[step].label}`;
  const playLabel = tour === 'playing' ? 'Pause' : tour === 'done' ? 'Replay' : tour === 'paused' ? 'Play' : 'Play tour';
  const motion = view.m === 'none' ? s.glideNone : view.m === 'fast' ? s.glideFast : s.glideSlow;
  const lidClass = lid === 'closed' ? s.lidClosed : lid === 'open' ? s.lidOpen : s.lidNone;

  return (
    <div className={s.explorer}>
      <div className={s.stageCol}>
        <div className={s.stage}>
          <div
            ref={viewer}
            className={`${s.viewer} ${dragging ? s.grabbing : ''}`}
            tabIndex={lid === 'closed' ? -1 : 0}
            role="group"
            aria-label="Plan viewer"
            aria-describedby="feature-hint"
            data-zoomed={view.k > 1.02 ? 'yes' : 'no'}
            inert={lid === 'closed'}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onKeyDown={onKeyDown}
          >
            <svg viewBox={`0 0 ${VW} ${VH}`} role="img" aria-label="The plan sheet in the open presentation box tray">
              <MaterialDefs idp="feature-vw" />
              <clipPath id="feature-vw-clip">
                <rect x="26" y="26" width={VW - 52} height={VH - 52} />
              </clipPath>
              <rect width={VW} height={VH} fill="url(#feature-vw-board)" filter="url(#feature-vw-fibre)" />
              <rect x="26" y="26" width={VW - 52} height={VH - 52} fill="#1E140F" />
              <g clipPath="url(#feature-vw-clip)">
                <g className={motion} style={{ transform: `translate(${view.tx}px, ${view.ty}px) scale(${view.k})` }}>
                  <CastRectG x={0} y={0} w={SHEET_SIZE.w} h={SHEET_SIZE.h} len={12} opacity={0.5} />
                  <SheetG tone={ground} layers={layers} transition />
                  <rect width={SHEET_SIZE.w} height={SHEET_SIZE.h} fill="none" stroke="#F5F0E3" strokeOpacity="0.28" strokeWidth={r2(1 / view.k)} />
                </g>
              </g>
              <rect x="26" y="26" width={VW - 52} height={VH - 52} fill="none" stroke="#000000" strokeOpacity="0.5" strokeWidth="4" />
            </svg>
          </div>
          <div className={`${s.lid} ${lidClass}`} aria-hidden={lid !== 'closed'}>
            <svg viewBox={`0 0 ${VW} ${VH}`} role="img" aria-label="The presentation box lid, closed over the plan sheet">
              <MaterialDefs idp="feature-lidov" />
              <LidG idp="feature-lidov" />
            </svg>
          </div>
        </div>

        <div className={s.caption}>
          <p className="t-label">{step < 0 ? 'Caption' : `${STEPS[step].no} ${STEPS[step].label}`}</p>
          {step < 0 ? (
            <p className={`${s.captionText} muted`}>Choose a row or play the tour.</p>
          ) : (
            <Typewriter key={`${step}-${tour === 'done' ? 'd' : 'p'}`} as="p" className={s.captionText} text={STEPS[step].text} speed={SPEED} />
          )}
        </div>
        <p className="sr-only" aria-live="polite">{status}{lid === 'closed' ? ', box closed' : ''}</p>
      </div>

      <div className={s.panel}>
        <section className={s.group} aria-labelledby="feature-g-view">
          <h3 id="feature-g-view" className="t-label">View</h3>
          <div className="row">
            <Button size="sm" variant="outline" icon="plus" label="Zoom in" onClick={() => zoom(1.25)} />
            <Button size="sm" variant="outline" icon="minus" label="Zoom out" onClick={() => zoom(1 / 1.25)} />
            <Button size="sm" variant="outline" onClick={reset}>Reset</Button>
            <span className={`t-small ${s.zoomNum}`} aria-label="Zoom level">{Math.round(view.k * 100)}%</span>
          </div>
          <p id="feature-hint" className="t-small">Drag to pan. With the plan in focus: arrow keys pan, plus and minus zoom, zero resets, the wheel zooms.</p>
        </section>

        <section className={s.group} aria-labelledby="feature-g-layers">
          <h3 id="feature-g-layers" className="t-label">Layers</h3>
          <div className={s.toggles}>
            {LAYER_KEYS.map((k) => (
              <Toggle key={k} label={LAYER_LABELS[k]} checked={layers[k]} onChange={(v) => setLayers((l) => ({ ...l, [k]: v }))} />
            ))}
          </div>
        </section>

        <section className={s.group} aria-labelledby="feature-g-ground">
          <h3 id="feature-g-ground" className="t-label">Sheet ground</h3>
          <Segmented id="feature-ground" label="Sheet ground" options={['Beige', 'Dark']} value={ground === 'dark' ? 'Dark' : 'Beige'} onChange={(o) => setGround(o === 'Dark' ? 'dark' : 'beige')} />
        </section>

        <section className={s.group} aria-labelledby="feature-g-rows">
          <h3 id="feature-g-rows" className="t-label">Steps</h3>
          <ul className="rows">
            {STEPS.map((r, i) => (
              <li key={r.no}>
                <button type="button" className={`ruled-row ${s.stepRow}`} aria-pressed={step === i} onClick={() => choose(i)}>
                  <span className="t-num">{r.no}</span>
                  <span className="ruled-row-label">{r.label}</span>
                  <span className="ruled-row-plus" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className={s.group} aria-labelledby="feature-g-tour">
          <h3 id="feature-g-tour" className="t-label">Guided tour</h3>
          <div className="row">
            <Button size="sm" icon={tour === 'playing' ? 'pause' : 'play'} onClick={playPause}>{playLabel}</Button>
            <Button size="sm" variant="outline" onClick={finish} disabled={tour === 'done'}>Skip to end</Button>
            <Button size="sm" variant="ghost" onClick={toggleLid}>{lid === 'closed' ? 'Open the box' : 'Close the box'}</Button>
          </div>
        </section>

        <section className={s.group} aria-labelledby="feature-g-text">
          <h3 id="feature-g-text" className="t-label">Plan text</h3>
          <p className={`t-body ${s.planText}`}>
            {SENTENCES.map((t, i) => (
              <span key={i} className={step === i ? s.on : step >= 0 ? s.dim : undefined}>{t} </span>
            ))}
          </p>
        </section>
      </div>
    </div>
  );
}
