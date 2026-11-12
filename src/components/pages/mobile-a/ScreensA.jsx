'use client';

import { useState } from 'react';
import { ABOUT, INTRO, PLAN } from '@/lib/brand';
import { clamp } from '@/lib/site';
import { Lines } from '@/components/ui/Card';
import { StatusBar, Word, MenuButton, BackButton, Row } from './Parts';
import { PlanDrawing, ArchRing, ZONES, PLAN_BOX } from './Drawings';
import s from './mobile-a.module.css';

// Screens 1 to 3. Screen 1 is the About page of m12 rebuilt on a 390 x 844 artboard (positions measured from
// the full-size crop and ScreenAboutG); 2 and 3 open its first two rows.

const LINK_TO = [2, 3, 4];

// 1 About (faithful). Measured once from the straightened full-size crop of m12 (same values as ScreenAboutG and
// lp-home's SCREEN): 24 px margins, word-mark 160 wide, headline 34 / 35, paragraph 13 / 24 wrapping after
// "long-term", and three 99 px ruled rows from 480 px. m12 shows no status bar on this page, so none is drawn.
export function ScreenAbout({ go }) {
  return (
    <div className={`${s.scr} ${s.beige}`}>
      <Word className="fade-in" style={{ left: 24, top: 58, width: 160 }} />
      <MenuButton onClick={() => go(7)} className={s.abMenu} />
      <p className={`${s.abLabel} slide-up`} style={{ '--i': 1 }}>{ABOUT.label}</p>
      <h2 className={`${s.abHead} slide-up`} style={{ '--i': 2 }}>
        <Lines as="span" rows={ABOUT.headline.rows} />
      </h2>
      <p className={`${s.abText} slide-up`} style={{ '--i': 3 }}>{ABOUT.text}</p>
      <div className={`${s.abRows} slide-up`} style={{ '--i': 4 }}>
        {ABOUT.rows.map((r, i) => (
          <Row key={r.no} no={r.no} label={r.label} about onClick={() => go(LINK_TO[i])} />
        ))}
      </div>
    </div>
  );
}

const SIGNS = [0.5, 0.78, 0.62, 0.9];

// 2 Philosophy: the first row opened. The quarter arch fills as the visitor scrolls the screen.
export function ScreenPhilosophy({ go, thumb }) {
  const [p, setP] = useState(thumb ? 0.7 : 0.1);
  const onScroll = (e) => {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setP(0.1 + 0.9 * clamp(max > 0 ? el.scrollTop / max : 0, 0, 1));
  };
  return (
    <div className={`${s.scr} ${s.beige}`}>
      <StatusBar />
      <BackButton onClick={() => go(1)} style={{ left: 22, top: 62 }} />
      <MenuButton onClick={() => go(7)} />
      <svg className={s.archBand} viewBox="0 0 390 190" aria-hidden="true">
        <ArchRing cx={200} cy={190} rm={112} sw={48} progress={p} ghost="#E7DFD9" fill="#875D41" />
      </svg>
      <div className={s.phHead}>
        <Row no="01" label={ABOUT.rows[0].label} open />
      </div>
      <div className={s.scroll} style={{ top: 372 }} onScroll={onScroll} tabIndex={0} role="region" aria-label="Philosophy text, scrolls">
        <p className={s.para}>{INTRO.paragraphs[0]}</p>
        <p className={s.para}>{INTRO.paragraphs[1]}</p>
        <div className={s.bars} aria-hidden="true">
          {SIGNS.map((w, i) => <span key={i} className="ph" style={{ width: `${w * 100}%` }} />)}
        </div>
        <Row no="02" label={ABOUT.rows[1].label} onClick={() => go(3)} />
        <Row no="03" label={ABOUT.rows[2].label} onClick={() => go(4)} />
        <div className={s.bars} aria-hidden="true">
          {SIGNS.map((w, i) => <span key={i} className="ph" style={{ width: `${w * 100}%` }} />)}
        </div>
      </div>
    </div>
  );
}

const STEPS = PLAN.text.split(/(?<=\.)\s+/);

// 3 Our Process: the plan paragraph split at its sentences, as steps beside a small plan drawing.
export function ScreenProcess({ go }) {
  const [step, setStep] = useState(0);
  return (
    <div className={`${s.scr} ${s.beige}`}>
      <StatusBar />
      <BackButton onClick={() => go(1)} style={{ left: 22, top: 62 }} />
      <MenuButton onClick={() => go(7)} />
      <h2 className={s.pTitle}>{ABOUT.rows[1].label}</h2>
      <div className={s.planCard}>
        <svg viewBox={`-14 -14 ${PLAN_BOX.w + 28} ${PLAN_BOX.h + 28}`} role="img" aria-label={`Plan drawing, step ${step + 1} highlighted`}>
          <PlanDrawing zone={ZONES[step]} zoneClass={s.zone} />
        </svg>
        <ol className={s.stepNums} aria-hidden="true">
          {STEPS.map((_, i) => <li key={i} className={i === step ? s.numOn : ''}>{`0${i + 1}`}</li>)}
        </ol>
      </div>
      <ol className={s.steps}>
        {STEPS.map((t, i) => (
          <li key={t}>
            <button type="button" className={`${s.step} ${i === step ? s.stepOn : ''}`} aria-current={i === step ? 'step' : undefined} onClick={() => setStep(i)}>
              <span className={s.stepNo}>{`0${i + 1}`}</span>
              <span>{t}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
