'use client';

import { useState } from 'react';
import CopyValue from '@/components/site/CopyValue';
import { HEX, LINES } from '@/lib/brand';
import { TESTER_COLOURS, grade, onFill, ratio, rgbOf, tintOf } from './data';
import s from './color.module.css';

function Picker({ id, label, value, onPick }) {
  return (
    <div role="group" aria-label={label} id={id} className={s.picker}>
      {TESTER_COLOURS.map((c) => (
        <button
          key={c.id}
          type="button"
          className={s.dot}
          style={{ background: c.hex, color: onFill(c.hex) }}
          aria-pressed={value === c.id}
          aria-label={`${label}: ${c.name}`}
          title={c.name}
          onClick={() => onPick(c.id)}
        >
          {value === c.id ? <span aria-hidden="true">A</span> : null}
        </button>
      ))}
    </div>
  );
}

const find = (id) => TESTER_COLOURS.find((c) => c.id === id);

// A live pairing tester: choose a text colour and a ground, see the real brand line set in them and the
// contrast computed from the two hex values, with the four WCAG results.
export function PairingTester() {
  const [fg, setFg] = useState('beige');
  const [bg, setBg] = useState('chocolate');
  const a = find(fg);
  const b = find(bg);
  const r = Number(ratio(a.hex, b.hex));
  const checks = [
    ['Small text, AA', 4.5],
    ['Large text, AA', 3],
    ['Small text, AAA', 7],
    ['Large text, AAA', 4.5],
  ];
  return (
    <div className={s.tester}>
      <div className={s.testerControls}>
        <div>
          <p className="t-label" id="color-tester-fg-label">Text colour</p>
          <Picker id="color-tester-fg" label="Text colour" value={fg} onPick={setFg} />
        </div>
        <div>
          <p className="t-label" id="color-tester-bg-label">Ground</p>
          <Picker id="color-tester-bg" label="Ground" value={bg} onPick={setBg} />
        </div>
      </div>
      <div className={s.testerStage} style={{ background: b.hex, color: a.hex }} data-tester-stage>
        <p className="t-line">{LINES.elevate.text}</p>
        <p className={s.testerSmall}>{LINES.refined.text}</p>
      </div>
      <div className={s.testerResult} aria-live="polite">
        <p className="t-figure">{r.toFixed(2)}:1</p>
        <p className="t-small">
          {a.name} on {b.name}: <CopyValue value={`${a.hex} on ${b.hex}`} label="the pairing" />
        </p>
        <ul className={s.checks}>
          {checks.map(([name, min]) => (
            <li key={name} className={r >= min ? s.pass : s.miss}>
              <span>{name}</span>
              <b>{r >= min ? 'Pass' : 'Fail'}</b>
            </li>
          ))}
        </ul>
        <p className="t-small">Result: {grade(r).label}.</p>
      </div>
    </div>
  );
}

const BASES = ['tribal', 'sand', 'beige', 'chocolate', 'black'];

// A tint mixer: any published colour at 5 to 100 % strength over white, computed live.
export function TintMixer() {
  const [base, setBase] = useState('tribal');
  const [pct, setPct] = useState(60);
  const c = find(base);
  const hex = tintOf(c.hex, pct);
  return (
    <div className={s.mixer}>
      <div className={s.mixerSwatch} style={{ background: hex, color: onFill(hex) }}>
        <span className="t-figure">{pct}%</span>
        <span className="t-small" style={{ color: 'inherit' }}>{c.name}</span>
      </div>
      <div className={s.mixerControls}>
        <div role="group" aria-label="Base colour" className="row">
          {BASES.map((id) => (
            <button key={id} type="button" className="chip chip-sm" aria-pressed={base === id} onClick={() => setBase(id)}>
              {find(id).name}
            </button>
          ))}
        </div>
        <div className="fieldset">
          <label htmlFor="color-mixer-range">Strength: {pct}%</label>
          <input id="color-mixer-range" className={s.range} type="range" min="5" max="100" step="5" value={pct} onChange={(e) => setPct(Number(e.target.value))} />
        </div>
        <p className="t-small">
          HEX <CopyValue value={hex} label="mixed tint hex" /> · RGB <CopyValue value={rgbOf(hex)} label="mixed tint RGB" />
        </p>
        <p className="t-small">Contrast of Ink on this tint: {ratio(HEX.ink, hex)}:1</p>
      </div>
    </div>
  );
}
