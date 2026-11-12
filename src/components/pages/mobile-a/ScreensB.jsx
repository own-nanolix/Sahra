'use client';

import { useRef, useState } from 'react';
import { ABOUT, INTRO, LINES, PLAN, POSTER_BODY, CONTACT } from '@/lib/brand';
import { Lines } from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';
import { CurvedWallG } from '@/components/art/KeyArt';
import { StatusBar, Word, MenuButton, BackButton, Pill } from './Parts';
import { PlanDrawing, LAYERS, ALL_LAYERS, PLAN_BOX } from './Drawings';
import s from './mobile-a.module.css';

// Screens 4 to 6: a dark screen, a vertical pager and a plan sheet.

// 4 Our Vision: dark, the sky-and-wall field above, the line, intro paragraph 6.
export function ScreenVision({ go, idp }) {
  return (
    <div className={`${s.scr} ${s.dark}`}>
      <svg className={s.fieldTop} viewBox="0 0 390 430" aria-hidden="true">
        <CurvedWallG idp={`${idp}-wall`} x={0} y={0} w={390} h={430} />
        <defs>
          <linearGradient id={`${idp}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.55" stopColor="#35241C" stopOpacity="0" />
            <stop offset="1" stopColor="#35241C" />
          </linearGradient>
        </defs>
        <rect width="390" height="430" fill={`url(#${idp}-fade)`} />
      </svg>
      <StatusBar dark />
      <BackButton onClick={() => go(1)} style={{ left: 22, top: 62 }} />
      <MenuButton onClick={() => go(7)} />
      <p className={`${s.vLabel} slide-up`} style={{ '--i': 1 }}>{ABOUT.rows[2].label}</p>
      <h2 className={`${s.vHead} slide-up`} style={{ '--i': 2 }}>
        <Lines as="span" rows={LINES.imagination.rows} />
      </h2>
      <p className={`${s.vText} slide-up`} style={{ '--i': 3 }}>{INTRO.paragraphs[5]}</p>
      <button type="button" className={`site-url on-dark ${s.vUrl}`} onClick={() => go(8)}>sahra.sa</button>
    </div>
  );
}

const CARDS = [
  { id: 'imagination', rows: LINES.imagination.rows, body: POSTER_BODY, cls: 'field-dusk' },
  { id: 'built-around', rows: LINES.builtAround.rows, cls: s.cardBeige },
  { id: 'elevate', rows: LINES.elevate.rows, sub: LINES.refined.text, cls: 'field-sand' },
  { id: 'designing', rows: LINES.designing.rows, cls: 'field-black' },
];

// 5 Spaces: the poster lines as a vertical pager of full-height cards. Swipe, drag or step with the buttons.
export function ScreenSpaces({ go }) {
  const [i, setI] = useState(0);
  const y0 = useRef(null);
  const to = (n) => setI(Math.max(0, Math.min(CARDS.length - 1, n)));
  const down = (e) => { y0.current = e.clientY; };
  const up = (e) => {
    if (y0.current === null) return;
    const d = e.clientY - y0.current;
    y0.current = null;
    if (Math.abs(d) > 40) to(i + (d < 0 ? 1 : -1));
  };
  return (
    <div className={`${s.scr} ${s.dark}`}>
      <StatusBar dark />
      <BackButton onClick={() => go(1)} style={{ left: 22, top: 62 }} />
      <Word className={s.sandWord} style={{ left: 138, top: 74, width: 114 }} />
      <MenuButton onClick={() => go(7)} />
      <div className={s.pager} onPointerDown={down} onPointerUp={up} onPointerCancel={() => { y0.current = null; }}>
        <div className={s.pagerTrack} style={{ transform: `translateY(${-i * 744}px)` }}>
          {CARDS.map((c, n) => (
            <section key={c.id} className={`${s.card} ${c.cls}`} aria-label={`Card ${n + 1} of ${CARDS.length}`} aria-hidden={n !== i}>
              <Lines as="h2" rows={c.rows} className={s.cardLine} />
              {c.sub && <p className={s.cardSub}>{c.sub}</p>}
              {c.body && <p className={s.cardBody}>{c.body}</p>}
            </section>
          ))}
        </div>
      </div>
      <div className={s.pagerCtl}>
        <Pill dark label="Previous card" onClick={() => to(i - 1)} disabled={i === 0}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 15l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
        </Pill>
        {CARDS.map((c, n) => (
          <button key={c.id} type="button" className={`${s.dot} ${n === i ? s.dotOn : ''}`} aria-label={`Show card ${n + 1}`} aria-current={n === i} onClick={() => to(n)} />
        ))}
        <Pill dark label="Next card" onClick={() => to(i + 1)} disabled={i === CARDS.length - 1}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 9l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.6" /></svg>
        </Pill>
      </div>
    </div>
  );
}

const ZOOMS = [1, 1.5, 2, 2.5];
const PLAN_W = 274;

// 6 Plan sheet: the plan with layer toggles and zoom buttons (no pinch needed).
export function ScreenPlan({ go }) {
  const [z, setZ] = useState(0);
  const [layers, setLayers] = useState(ALL_LAYERS);
  const flip = (k) => setLayers((l) => ({ ...l, [k]: !l[k] }));
  return (
    <div className={`${s.scr} ${s.beige}`}>
      <StatusBar />
      <BackButton onClick={() => go(1)} style={{ left: 22, top: 62 }} />
      <MenuButton onClick={() => go(7)} />
      <div className={s.sheet}>
        <div className={s.sheetHead}>
          <span className={s.sheetName}>{PLAN.sender}</span>
          <span className={s.sheetCt}>{CONTACT.city}<br />{CONTACT.phone}</span>
        </div>
        <div className={s.viewport} tabIndex={0} role="region" aria-label="Plan drawing, scrolls when zoomed">
          <svg className={s.planSvg} viewBox={`-6 -6 ${PLAN_BOX.w + 12} ${PLAN_BOX.h + 12}`} role="img" aria-label="Plan drawing" style={{ width: PLAN_W * ZOOMS[z] }}>
            <PlanDrawing layers={layers} />
          </svg>
        </div>
      </div>
      <div className={s.zoomBar}>
        <Pill label="Zoom out" onClick={() => setZ(Math.max(0, z - 1))} disabled={z === 0}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" /></svg>
        </Pill>
        <span className={s.zoomVal} aria-live="polite">{`Zoom ${Math.round(ZOOMS[z] * 100)}%`}</span>
        <Pill label="Zoom in" onClick={() => setZ(Math.min(ZOOMS.length - 1, z + 1))} disabled={z === ZOOMS.length - 1}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="1.6" /></svg>
        </Pill>
        <button type="button" className={s.reset} onClick={() => setZ(0)} disabled={z === 0}>Reset</button>
      </div>
      <div className={s.layers}>
        {LAYERS.map((k) => <Toggle key={k} label={k} checked={layers[k]} onChange={() => flip(k)} />)}
      </div>
    </div>
  );
}
