'use client';

import { useState } from 'react';
import Toggle, { Segmented } from '@/components/ui/Toggle';
import { LINES } from '@/lib/brand';
import { SANS_WEIGHTS, SERIF_WEIGHTS } from './data';
import s from './typography.module.css';

function Slider({ id, label, value, min, max, step, onChange, unit = '' }) {
  return (
    <div className="fieldset">
      <label htmlFor={id}>{label}: {value}{unit}</label>
      <input id={id} className={s.range} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

// A live type tester: your own text in either voice, at any weight, size, leading and tracking, on light or dark.
export default function Tester() {
  const [text, setText] = useState(LINES.elevate.rows.join('\n'));
  const [voice, setVoice] = useState('Serif');
  const [weightName, setWeightName] = useState('Regular');
  const [size, setSize] = useState(56);
  const [lh, setLh] = useState(1.05);
  const [track, setTrack] = useState(-0.02);
  const [dark, setDark] = useState(false);
  const weights = voice === 'Serif' ? SERIF_WEIGHTS : SANS_WEIGHTS;
  const w = weights.find((x) => x.name === weightName) || weights[1] || weights[0];
  const pickVoice = (v) => {
    setVoice(v);
    setWeightName('Regular');
    if (v === 'Sans') { setSize(22); setLh(1.45); setTrack(-0.015); } else { setSize(56); setLh(1.05); setTrack(-0.02); }
  };
  return (
    <div className={s.tester}>
      <div className={s.testerControls}>
        <div className="fieldset">
          <label htmlFor="typography-tester-text">Your text</label>
          <textarea id="typography-tester-text" className="input" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className={s.controlRow}>
          <Segmented id="typography-tester-voice" label="Voice" options={['Serif', 'Sans']} value={voice} onChange={pickVoice} />
          <Segmented id="typography-tester-weight" label="Weight" options={weights.map((x) => x.name)} value={w.name} onChange={setWeightName} />
          <Toggle label="Dark ground" checked={dark} onChange={setDark} />
        </div>
        <Slider id="typography-tester-size" label="Size" value={size} min={12} max={120} step={1} unit=" px" onChange={setSize} />
        <Slider id="typography-tester-lh" label="Leading" value={lh} min={0.9} max={1.8} step={0.05} onChange={setLh} />
        <Slider id="typography-tester-track" label="Tracking" value={track} min={-0.05} max={0.1} step={0.005} unit=" em" onChange={setTrack} />
      </div>
      <div className={`${s.testerStage} ${dark ? 'field-chocolate' : 'field-beige'}`}>
        <p
          className={s.testerText}
          style={{ fontFamily: voice === 'Serif' ? 'var(--font-serif)' : 'var(--font-sans)', fontWeight: w.value, fontSize: size, lineHeight: lh, letterSpacing: `${track}em` }}
        >
          {text}
        </p>
        <p className="t-small" style={{ color: 'inherit', opacity: 0.9 }}>
          {voice} {w.name}, {size} px, leading {lh}, tracking {track} em
        </p>
      </div>
    </div>
  );
}
