'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Art from '@/components/art/Art';
import { QuarterArchG, quarterArch } from '@/components/art/KeyArt';
import Icon from '@/components/site/Icon';
import { toast } from '@/components/site/Toast';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import Field from '@/components/ui/Field';
import Toggle from '@/components/ui/Toggle';
import { copy } from '@/lib/site';
import { C } from './data';
import s from './motion.module.css';

// Buttons: the shared states (hover lifts 1 px, active presses 1 px, focus-visible rings 2 px) and one that
// carries a task through to "Saved". The spinner is the quarter arch turning on --ease-in-out.
export function ButtonsDemo() {
  const [state, setState] = useState('idle');
  const timers = useRef([]);
  useEffect(() => {
    const list = timers;
    return () => list.current.forEach(clearTimeout);
  }, []);
  const save = () => {
    if (state !== 'idle') return;
    setState('busy');
    timers.current.push(setTimeout(() => setState('done'), 1100));
    timers.current.push(setTimeout(() => setState('idle'), 2800));
  };
  return (
    <div className="row" style={{ gap: 12 }}>
      <Button onClick={save} aria-busy={state === 'busy'} className={s.saveBtn}>
        <span className={s.saveSlot} aria-hidden="true">
          {state === 'busy' && (
            <svg viewBox="0 0 20 20" width="18" height="18" className={s.spinSm}>
              <path d={quarterArch(10, 10, 5, 9, 'tl')} fill="currentColor" />
            </svg>
          )}
          {state === 'done' && <Icon name="check" size={18} />}
        </span>
        {state === 'busy' ? 'Saving' : state === 'done' ? 'Saved' : 'Save'}
      </Button>
      <Button variant="outline">Preview</Button>
      <Button variant="black">Follow</Button>
      <Button url>sahra.sa</Button>
    </div>
  );
}

// A switch: the thumb slides 20 px (--dur-2, --ease-out); the grid behind it comes up and goes down.
export function ToggleDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className={s.toggleRow}>
      <Toggle label="Show grid" checked={on} onChange={setOn} />
      <svg viewBox="0 0 60 60" width="60" height="60" aria-hidden="true" className={`${s.miniGrid} ${on ? s.miniGridOn : ''}`}>
        {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => (
          <rect key={`${r}${c}`} x={4 + c * 19} y={4 + r * 19} width="14" height="14" fill="currentColor" />
        )))}
      </svg>
    </div>
  );
}

// An input: the shared field (focus draws a 1.5 px ring) and a ruled one whose rule draws on along the field.
export function InputDemo() {
  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <Field id="motion-name" label="Name" placeholder="Your name" autoComplete="off" />
      <div className={s.ruled}>
        <label htmlFor="motion-ruled">Ruled field</label>
        <input id="motion-ruled" className={s.ruledInput} placeholder="Type here" autoComplete="off" />
        <span className={s.ruledLine} aria-hidden="true" />
      </div>
    </div>
  );
}

// Loaders, built from the quarter arch and from the grid (both exportable; with animation off they are complete).
export function Loaders() {
  return (
    <div className={s.loaders}>
      <figure>
        <Art viewBox="0 0 120 120" title="Quarter arch loader" exportName="motion-loader-arch">
          <rect width="120" height="120" fill={C.beige} />
          {['tr', 'br', 'bl'].map((q) => <QuarterArchG key={q} cx={60} cy={60} r={22} R={44} quadrant={q} fill={C.sand} fillOpacity="0.28" />)}
          <g className={s.spin}>
            <QuarterArchG cx={60} cy={60} r={22} R={44} quadrant="tl" fill={C.tribal} />
          </g>
        </Art>
        <figcaption className="t-small">Quarter arch, 1600 ms a turn</figcaption>
      </figure>
      <figure>
        <Art viewBox="0 0 120 120" title="Grid loader" exportName="motion-loader-grid">
          <rect width="120" height="120" fill={C.beige} />
          {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => (
            <rect key={`${r}${c}`} x={24 + c * 26} y={24 + r * 26} width="20" height="20" fill={C.tribal} className={s.pulse} style={{ '--i': r + c }} />
          )))}
        </Art>
        <figcaption className="t-small">Grid, a diagonal wave</figcaption>
      </figure>
      <LineLoader />
    </div>
  );
}

function LineLoader() {
  const [run, setRun] = useState(0);
  return (
    <figure className={s.lineLoader}>
      <div className={s.lineTrack}>
        <span key={run} className={s.lineFill} />
      </div>
      <figcaption className="row" style={{ justifyContent: 'space-between' }}>
        <span className="t-small">Line, 1600 ms</span>
        <button type="button" className="btn btn-sm btn-outline" onClick={() => setRun((n) => n + 1)} aria-label="Run the line loader">Run</button>
      </figcaption>
    </figure>
  );
}

// Toasts: the shell's toast enters 24 px from the right over 480 ms and leaves over 240 ms.
export function ToastDemo() {
  return (
    <div className="row" style={{ gap: 10 }}>
      <Button size="sm" onClick={() => toast('Saved')}>Show saved toast</Button>
      <Button size="sm" variant="outline" onClick={() => toast('Copied')}>Show copied toast</Button>
    </div>
  );
}

// Chips: pressed chips change ground in 140 ms; the press moves them 1 px.
export function ChipsDemo() {
  const [on, setOn] = useState({ guides: true, anchors: false, fill: false });
  return (
    <div className="row" role="group" aria-label="Layers">
      {Object.keys(on).map((k) => (
        <Chip key={k} pressed={on[k]} onClick={() => setOn((o) => ({ ...o, [k]: !o[k] }))}>
          {k[0].toUpperCase() + k.slice(1)}
        </Chip>
      ))}
    </div>
  );
}

// An icon button: the copy icon turns into a check, crossfaded (opacity and a 4 px move, --dur-2).
export function CopyDemo() {
  const [done, setDone] = useState(false);
  const timer = useRef(0);
  useEffect(() => {
    const t = timer;
    return () => clearTimeout(t.current);
  }, []);
  const go = async () => {
    await copy('sahra.sa');
    toast('Copied');
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1600);
  };
  return (
    <button type="button" className="btn btn-outline btn-icon" onClick={go} aria-label="Copy the web address">
      <span className={s.swap}>
        <span className={`${s.swapA} ${done ? s.swapOut : ''}`}><Icon name="copy" size={20} /></span>
        <span className={`${s.swapB} ${done ? s.swapIn : ''}`}><Icon name="check" size={20} /></span>
      </span>
    </button>
  );
}

// A link: its rule runs out to the right on hover and the arrow of "→ sahra.sa" moves 4 px.
export function LinkDemo() {
  return (
    <div className="row" style={{ gap: 28 }}>
      <Link href="/logo/" className="link">The logo page</Link>
      <Link href="/lp-contact/" className="site-url">sahra.sa</Link>
    </div>
  );
}
