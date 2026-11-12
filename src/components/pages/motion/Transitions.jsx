'use client';

import { useEffect, useState } from 'react';
import Art from '@/components/art/Art';
import RuledRows from '@/components/ui/RuledRows';
import Tabs from '@/components/ui/Tabs';
import { ABOUT } from '@/lib/brand';
import { C } from './data';
import s from './motion.module.css';

// 1. The page enter used by the site: items rise 18 px and fade in over 480 ms (--dur-3, --ease-out), 60 ms apart.
//    (The same values as itemV / listV in src/lib/motion.js.) Replay remounts the items; they always end in place.
export function PageEnter() {
  const [run, setRun] = useState(0);
  return (
    <div className={s.enter}>
      <div className={s.enterFrame} key={run}>
        <div className={s.enterBar} style={{ '--i': 0 }}><span className="ph" style={{ width: '38%' }} /></div>
        {[0, 1, 2].map((i) => (
          <div key={i} className={`${s.enterItem} ${s.enterItemRow}`} style={{ '--i': i + 1 }}>
            <span className="ph" style={{ width: `${70 - i * 14}%` }} />
          </div>
        ))}
        <div className={`${s.enterItem} ${s.enterBlock}`} style={{ '--i': 4 }} />
      </div>
      <div className={s.tileFoot}>
        <span className="t-small">Rises 18 px, 480 ms, 60 ms apart.</span>
        <button type="button" className="btn btn-sm btn-outline" onClick={() => setRun((n) => n + 1)} aria-label="Replay the page enter">Replay</button>
      </div>
    </div>
  );
}

// The same enter drawn as a timeline: each item's delay and length, from the real values (exportable).
export function EnterTimeline() {
  const k = 0.4; // px per ms (800 ms fills the strip)
  const rows = [0, 1, 2, 3, 4];
  return (
    <Art viewBox="0 0 420 220" title="Page enter timeline: five items, 60 ms apart, 480 ms each" exportName="motion-enter-timeline">
      <rect width="420" height="220" fill={C.beige} />
      <text x="20" y="28" fontSize="13" fill={C.muted} className="sans">Page enter, time in ms</text>
      {rows.map((i) => {
        const d = 80 + i * 60;
        const y = 48 + i * 28;
        return (
          <g key={i}>
            <text x="20" y={y + 14} fontSize="12" fill={C.ink} className="sans">{`Item ${i + 1}`}</text>
            <rect x="80" y={y} width="320" height="20" fill="#E7DFD9" />
            <rect x={80 + d * k} y={y} width={480 * k} height="20" fill={C.tribal} className="grow-x" style={{ '--i': i }} />
          </g>
        );
      })}
      <path d="M80 196H400" stroke={C.line} />
      {[0, 200, 400, 600, 800].map((t) => (
        <text key={t} x={80 + t * k} y="212" fontSize="12" textAnchor="middle" fill={C.muted} className="sans">{t}</text>
      ))}
    </Art>
  );
}

// 2. A ruled row opening: the shared RuledRows turns the "+" and lowers the body (--dur-3, --ease-out).
export function RowsDemo() {
  const rows = ABOUT.rows.map((r) => ({
    ...r,
    body: (
      <div style={{ display: 'grid', gap: 8 }}>
        <span className="ph" style={{ width: '90%' }} />
        <span className="ph" style={{ width: '72%' }} />
      </div>
    ),
  }));
  return <RuledRows id="motion-rows" rows={rows} />;
}

// 3. A card: it lifts off its hard shadow and settles back (transform only, --dur-3, --ease-out).
export function CardDemo() {
  const [lift, setLift] = useState(false);
  return (
    <div className={s.cardDemo}>
      <div className={s.cardShadow} aria-hidden="true" />
      <button type="button" className={`${s.cardFace} ${lift ? s.cardLift : ''}`} aria-pressed={lift} onClick={() => setLift((v) => !v)}>
        <span className="t-label">Card</span>
        <span className="t-h3">{lift ? 'Lifted' : 'At rest'}</span>
        <span className="ph" style={{ width: '60%' }} />
      </button>
    </div>
  );
}

// 4. A sheet: it rises from the bottom edge over a scrim and leaves faster than it arrived.
export function SheetDemo() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return undefined;
    const on = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [open]);
  return (
    <div className={s.sheetStage}>
      <div className={s.sheetPage}>
        <span className="ph" style={{ width: '40%' }} />
        <span className="ph" style={{ width: '70%' }} />
        <button type="button" className="btn btn-sm" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="motion-sheet">Open sheet</button>
      </div>
      <div className={`${s.scrim} ${open ? s.scrimOn : ''}`} aria-hidden="true" onClick={() => setOpen(false)} />
      <div id="motion-sheet" role="dialog" aria-label="Sheet" className={`${s.sheet} ${open ? s.sheetOn : ''}`} inert={!open}>
        <div style={{ display: 'grid', gap: 8 }}>
          <span className="t-h3">Sheet</span>
          <span className="ph" style={{ width: '80%' }} />
          <span className="ph" style={{ width: '55%' }} />
        </div>
        <button type="button" className="btn btn-sm btn-dark" onClick={() => setOpen(false)}>Close sheet</button>
      </div>
    </div>
  );
}

// 5. Tabs: the shared Tabs; the panel enters with a short rise (--dur-2, --ease-out).
export function TabsDemo() {
  const panel = (name) => (
    <div style={{ display: 'grid', gap: 8 }}>
      <span className="t-h3">{name}</span>
      <span className="ph" style={{ width: '82%' }} />
      <span className="ph" style={{ width: '58%' }} />
    </div>
  );
  return (
    <Tabs
      id="motion-tabs"
      label="Transition tabs"
      panelClassName={s.tabIn}
      tabs={[
        { id: 'plan', label: 'Plan', content: panel('Plan') },
        { id: 'sheet', label: 'Sheet', content: panel('Sheet') },
        { id: 'box', label: 'Box', content: panel('Box') },
      ]}
    />
  );
}
