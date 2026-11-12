'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import Icon from '@/components/site/Icon';
import Toggle from '@/components/ui/Toggle';
import RuledRows from '@/components/ui/RuledRows';
import { ABOUT, NAV_LINKS } from '@/lib/brand';
import { listV, itemV, tEnter, tMove, tDraw } from '@/lib/motion';
import { TABS } from './data';
import { Bars } from './Board';
import s from './mobile-b.module.css';

function Demo({ no, title, note, className = '', children }) {
  return (
    <div className={`tile ${s.demo} ${className}`}>
      <p className="t-num">{no}</p>
      <h3 className="t-h3">{title}</h3>
      <p className="t-small">{note}</p>
      {children}
    </div>
  );
}

// 01  Pull to refresh: drag the list down, or press the button. The rows re-enter.
function Pull() {
  const [busy, setBusy] = useState(false);
  const [gen, setGen] = useState(0);
  const [dy, setDy] = useState(0);
  const y0 = useRef(null);
  const run = () => {
    if (busy) return;
    setBusy(true);
    setTimeout(() => {
      setGen((g) => g + 1);
      setBusy(false);
    }, 700);
  };
  const end = () => {
    if (y0.current !== null && dy >= 60) run();
    y0.current = null;
    setDy(0);
  };
  return (
    <Demo no="01" title="Pull to refresh" note="Drag the list down and let go, or use the button." className="span-3 span-m-3">
      <div
        className={s.pull}
        onPointerDown={(e) => { y0.current = e.clientY; }}
        onPointerMove={(e) => { if (y0.current !== null) setDy(Math.max(0, Math.min(80, e.clientY - y0.current))); }}
        onPointerUp={end}
        onPointerCancel={end}
      >
        <div className={s.pullHead} style={{ height: busy ? 36 : dy * 0.45 }} aria-hidden="true">
          <span className={s.spin} data-busy={busy ? 'true' : undefined} style={{ transform: busy ? undefined : `rotate(${dy * 4}deg)` }}><Icon name="arrow-down" size={18} /></span>
        </div>
        <motion.ul key={gen} className="rows" variants={listV} initial="hidden" animate="show">
          {ABOUT.rows.concat({ no: '04' }).map((r) => (
            <motion.li key={r.no} variants={itemV} className={s.prow}>
              <span className="t-num">{r.no}</span>
              <Bars widths={[8]} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
      <button type="button" className="btn btn-outline btn-sm" onClick={run} disabled={busy}>Refresh</button>
    </Demo>
  );
}

// 02  Swipe between screens: drag, buttons or arrow keys.
function Swipe() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const items = NAV_LINKS.slice(1);
  const go = (k) => {
    const n = Math.min(items.length - 1, Math.max(0, k));
    setDir(n >= i ? 1 : -1);
    setI(n);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(i + 1);
    if (e.key === 'ArrowLeft') go(i - 1);
  };
  return (
    <Demo no="02" title="Swipe between screens" note="Drag the card sideways, or use the arrow keys or the buttons." className="span-3 span-m-3">
      <div className={s.swipe} role="group" aria-label="Screens, swipe" tabIndex={0} onKeyDown={onKey}>
        <motion.div
          key={i}
          className={`card-beige ${s.swCard}`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          dragTransition={{ bounceStiffness: 500, bounceDamping: 80 }}
          onDragEnd={(_, info) => { if (info.offset.x < -50) go(i + 1); else if (info.offset.x > 50) go(i - 1); }}
          initial={{ opacity: 0, x: dir * 48 }}
          animate={{ opacity: 1, x: 0, transition: tEnter }}
        >
          <p className="t-num">{String(i + 2).padStart(2, '0')}</p>
          <p className="t-h3">{items[i].label}</p>
          <Bars widths={[12, 8]} />
        </motion.div>
      </div>
      <div className={s.dotsRow}>
        <button type="button" className="btn btn-ghost btn-sm" disabled={i === 0} onClick={() => go(i - 1)}>Previous</button>
        <span className={s.dots} aria-hidden="true">{items.map((x, k) => <i key={x.id} data-on={k === i ? 'true' : undefined} />)}</span>
        <button type="button" className="btn btn-ghost btn-sm" disabled={i === items.length - 1} onClick={() => go(i + 1)}>Next</button>
      </div>
    </Demo>
  );
}

// 03  Tap a row to expand: the "+" turns.
function Expand() {
  return (
    <Demo no="03" title="Tap a row to expand" note="The plus turns to a minus as the row opens." className="span-2 span-m-3">
      <RuledRows id="mobile-b-demo-expand" rows={ABOUT.rows.map((r) => ({ ...r, body: <Bars widths={[12, 9]} /> }))} />
    </Demo>
  );
}

// 04  Bottom sheet: rises with a drag handle, Escape or the handle closes it.
function SheetDemo() {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const dc = useDragControls();
  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  return (
    <Demo no="04" title="Bottom sheet" note="Drag the handle down, press Escape, or press the handle." className="span-2 span-m-3">
      <div className={s.shWrap}>
        <div className={s.shPage}><Bars widths={[9, 6, 8]} /></div>
        <AnimatePresence>
          {open && (
            <motion.div key="scrim" className={s.shScrim} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: tMove }} exit={{ opacity: 0, transition: tMove }} onClick={close} />
          )}
          {open && (
            <motion.div
              key="sheet"
              role="dialog"
              aria-label="Sheet"
              className={s.shSheetLive}
              initial={{ y: '100%' }}
              animate={{ y: 0, transition: tEnter }}
              exit={{ y: '100%', transition: tMove }}
              drag="y"
              dragControls={dc}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => { if (info.offset.y > 60) close(); }}
              onKeyDown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); close(); } }}
            >
              <button type="button" className={s.handle} autoFocus aria-label="Close sheet" onPointerDown={(e) => dc.start(e)} onClick={close}>
                <span className={s.grab} />
              </button>
              <Bars widths={[10, 7]} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button ref={trigger} type="button" className="btn btn-sm" aria-expanded={open} onClick={() => setOpen(true)}>Open sheet</button>
    </Demo>
  );
}

// 05  Tab bar change
function TabChange() {
  const [i, setI] = useState(0);
  const refs = useRef([]);
  const onKey = (e) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + 4) % 4;
    setI(n);
    refs.current[n]?.focus();
  };
  const tabs = TABS.slice(0, 4);
  return (
    <Demo no="05" title="Tab bar change" note="The mark under the tab slides to the next one." className={s.pA}>
      <div className={s.mtabs} role="tablist" aria-label="Tab bar demo" onKeyDown={onKey}>
        {tabs.map((t, k) => (
          <button key={t.label} ref={(el) => { refs.current[k] = el; }} type="button" role="tab" id={`mobile-b-demo-tab-${k}`} aria-selected={k === i} aria-controls="mobile-b-demo-tabpanel" tabIndex={k === i ? 0 : -1} className={s.mtab} onClick={() => setI(k)}>
            <Icon name={t.icon} size={22} />
            <span>{t.label}</span>
            {k === i && <motion.span layoutId="mobile-b-demo-ind" className={s.ind} transition={tMove} />}
          </button>
        ))}
      </div>
      <div id="mobile-b-demo-tabpanel" role="tabpanel" aria-labelledby={`mobile-b-demo-tab-${i}`} className={s.mpanel}>
        <motion.p key={i} className="t-h3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: tEnter }}>{tabs[i].label}</motion.p>
      </div>
    </Demo>
  );
}

// 06  Stepper
function Stepper() {
  const [i, setI] = useState(0);
  const n = 4;
  return (
    <Demo no="06" title="Stepper" note="Back and Next move one step; the line draws to it." className={s.pB}>
      <ol className={s.steps}>
        <span className={s.stepLine} aria-hidden="true"><motion.span animate={{ scaleX: i / (n - 1) }} transition={tDraw} /></span>
        {Array.from({ length: n }, (_, k) => (
          <li key={k} className={s.step} data-done={k <= i ? 'true' : undefined} aria-current={k === i ? 'step' : undefined}>
            <span>{k + 1}</span>
            <span className="sr-only">Step {k + 1}</span>
          </li>
        ))}
      </ol>
      <div className={s.dotsRow}>
        <button type="button" className="btn btn-outline btn-sm" disabled={i === 0} onClick={() => setI(i - 1)}>Back</button>
        <span className="t-num" aria-live="polite">Step {i + 1} of {n}</span>
        <button type="button" className="btn btn-sm" disabled={i === n - 1} onClick={() => setI(i + 1)}>Next</button>
      </div>
    </Demo>
  );
}

// 07  Long-press / toggle: hold for a moment, or press Enter or Space; the switch mirrors it.
function LongPress() {
  const [on, setOn] = useState(false);
  const [held, setHeld] = useState(false);
  const t = useRef(null);
  useEffect(() => () => clearTimeout(t.current), []);
  const stop = () => {
    clearTimeout(t.current);
    setHeld(false);
  };
  const start = () => {
    setHeld(true);
    t.current = setTimeout(() => {
      setOn((v) => !v);
      setHeld(false);
    }, 600);
  };
  return (
    <Demo no="07" title="Long-press and toggle" note="Hold the circle, or press Enter or Space." className="span-2 span-m-3">
      <div className={s.lpRow}>
        <button
          type="button"
          className={s.lp}
          aria-pressed={on}
          aria-label="Hold to save"
          data-held={held ? 'true' : undefined}
          onPointerDown={start}
          onPointerUp={stop}
          onPointerLeave={stop}
          onPointerCancel={stop}
          onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) { e.preventDefault(); setOn((v) => !v); } }}
        >
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="28" className={s.lpTrack} />
            <circle cx="32" cy="32" r="28" className={s.lpRing} pathLength="1" />
          </svg>
          <Icon name={on ? 'check' : 'heart'} size={24} />
        </button>
        <Toggle label="Saved" checked={on} onChange={setOn} />
      </div>
    </Demo>
  );
}

export default function Patterns() {
  return (
    <>
      <h2 className="sr-only">Interaction patterns</h2>
      <Pull />
      <Swipe />
      <Expand />
      <SheetDemo />
      <LongPress />
      <TabChange />
      <Stepper />
    </>
  );
}
