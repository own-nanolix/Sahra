'use client';

import { useState } from 'react';
import { cubic } from './data';
import { ease } from '@/lib/motion';
import s from './motion.module.css';

// Four pairs, played together. Both sides are real transform animations; only the don't has one thing wrong,
// and says so. Every block ends in place.
const OUT = cubic(ease.out);
const OVERSHOOT = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

const PAIRS = [
  {
    id: 'easing',
    title: 'Easing',
    do: { ease: OUT, dur: 'var(--dur-3)', from: 'translateX(-96px)', note: '--ease-out: arrives and stops.' },
    dont: { ease: OVERSHOOT, dur: 'var(--dur-3)', from: 'translateX(-96px)', note: 'Overshoot: passes its place, then snaps back.' },
  },
  {
    id: 'distance',
    title: 'Distance',
    do: { ease: OUT, dur: 'var(--dur-3)', from: 'translateY(18px)', note: 'Rises 18 px: a settle.' },
    dont: { ease: OUT, dur: 'var(--dur-3)', from: 'translateY(150px)', note: 'Flies in from 150 px: too far to read as a settle.' },
  },
  {
    id: 'duration',
    title: 'Duration',
    do: { ease: OUT, dur: 'var(--dur-2)', from: 'translateX(-48px)', note: 'A small move in --dur-2 (240 ms).' },
    dont: { ease: OUT, dur: 'var(--dur-5)', from: 'translateX(-48px)', note: 'The same small move in --dur-5 (1600 ms): it drags.' },
  },
  {
    id: 'stagger',
    title: 'Stagger',
    count: 3,
    do: { ease: OUT, dur: 'var(--dur-3)', from: 'translateY(18px)', st: '60ms', note: 'Items 60 ms apart: one gesture.' },
    dont: { ease: OUT, dur: 'var(--dur-3)', from: 'translateY(18px)', st: '320ms', note: 'Items 320 ms apart: a queue.' },
  },
];

function Lane({ spec, count = 1, run }) {
  return (
    <div className={s.lane}>
      <div className={s.laneBlocks} key={run}>
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className={s.laneBlock}
            style={{ '--e': spec.ease, '--d': spec.dur, '--from': spec.from, '--st': spec.st || '0ms', '--i': i }}
          />
        ))}
      </div>
    </div>
  );
}

export default function DoDont() {
  const [run, setRun] = useState(0);
  return (
    <div>
      <div className={s.ddBar}>
        <button type="button" className="btn btn-sm" onClick={() => setRun((n) => n + 1)} aria-label="Play every pair">Play</button>
        <span className="t-small">Both sides are transform animations. The ones on the right are labelled, and wrong in one thing only.</span>
      </div>
      <div className={s.dd}>
        {['do', 'dont'].map((side) => (
          <div key={side} className={`tile ${side === 'do' ? 'tile-beige' : 'tile-dark on-dark'} ${s.ddTile}`}>
            <h3 className="t-h3">{side === 'do' ? 'Do' : 'Don’t'}</h3>
            {PAIRS.map((p) => (
              <div key={p.id} className={s.ddRow}>
                <div className="row" style={{ justifyContent: 'space-between' }}>
                  <span className="t-label">{p.title}</span>
                </div>
                <Lane spec={p[side]} count={p.count} run={run} />
                <p className="t-small">{`${side === 'do' ? 'Do' : 'Don’t'}: ${p[side].note}`}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
