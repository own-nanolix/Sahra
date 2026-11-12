'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { range } from '@/lib/site';
import s from './dataviz.module.css';

// Three states of a chart tile: loading (skeleton bars), empty (quiet placeholder marks, no numbers), error.
const BARS = [48, 72, 38, 86, 60, 30];

function Frame({ title, children, role }) {
  return (
    <section className={`tile tile-print span-4 ${s.fig}`} aria-label={title} role={role}>
      <h3 className={`t-h3 ${s.figTitle}`}>{title}</h3>
      {children}
    </section>
  );
}

export function Loading() {
  return (
    <Frame title="Loading" role="status">
      <div className={s.stateBars} aria-hidden="true">
        {BARS.map((h, i) => <span key={i} className="skeleton" style={{ height: `${h}%`, animationDelay: `${i * 120}ms` }} />)}
      </div>
      <p className="t-small">The chart is being drawn. Marks appear when the figures are ready.</p>
    </Frame>
  );
}

export function Empty() {
  return (
    <Frame title="Empty">
      <div className={s.stateBars} aria-hidden="true">
        {BARS.map((h, i) => <span key={i} className={s.quiet} style={{ height: `${h}%` }} />)}
      </div>
      <p className="t-small">Nothing to chart. The case study does not publish this figure, so the marks stay quiet.</p>
    </Frame>
  );
}

export function ErrorState() {
  const [busy, setBusy] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);
  const retry = () => {
    setBusy(true);
    timer.current = setTimeout(() => setBusy(false), 900);
  };
  return (
    <Frame title="Error" role="alert">
      <div className={s.stateBars} aria-hidden="true">
        {range(6).map((i) => <span key={i} className={busy ? 'skeleton' : s.quiet} style={{ height: `${BARS[i]}%`, opacity: busy ? 1 : 0.5 }} />)}
      </div>
      <p className={`t-small ${s.err}`}>{busy ? 'Trying again.' : 'The chart could not be drawn.'}</p>
      <Button variant="outline" size="sm" onClick={retry}>Try again</Button>
    </Frame>
  );
}
