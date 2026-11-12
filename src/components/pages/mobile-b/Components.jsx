'use client';

import { useState } from 'react';
import Tabs from '@/components/ui/Tabs';
import { Segmented } from '@/components/ui/Toggle';
import Field from '@/components/ui/Field';
import RuledRows from '@/components/ui/RuledRows';
import Icon from '@/components/site/Icon';
import { toast } from '@/components/site/Toast';
import { ABOUT, LINES } from '@/lib/brand';
import { StatusBar, NavBar, TabBar, Bars } from './Board';
import s from './mobile-b.module.css';

// One specimen: a small switch for its states, and the component on a stage.
function States({ id, label, states, children, dark = false }) {
  const [v, setV] = useState(states[0]);
  return (
    <div className={s.spec}>
      <Segmented id={id} label={label} options={states} value={v} onChange={setV} />
      <div className={`${s.specStage} ${dark || v === 'Dark' ? `on-dark ${s.specDark}` : ''}`}>{children(v)}</div>
    </div>
  );
}

function TabSpec() {
  const [cur, setCur] = useState(12);
  return (
    <States id="mobile-b-spec-tabbar" label="Tab bar state" states={['Default', 'Pressed']}>
      {(v) => <TabBar current={cur} go={setCur} pressed={v === 'Pressed' ? 16 : undefined} />}
    </States>
  );
}

const ROW_STATE = { Default: {}, Selected: { 'aria-pressed': true }, Disabled: { disabled: true } };

const SPECS = [
  {
    id: 'status', label: 'Status bar',
    content: (
      <States id="mobile-b-spec-status" label="Ground" states={['Beige', 'Dark']}>
        {() => <StatusBar />}
      </States>
    ),
  },
  {
    id: 'nav', label: 'Nav',
    content: (
      <States id="mobile-b-spec-nav" label="Nav variant" states={['Default', 'Dark']}>
        {() => <NavBar title="Settings" label="Profile" back onBack={() => toast('Back')} action="search" actionLabel="Search" onAction={() => toast('Search')} />}
      </States>
    ),
  },
  { id: 'tabbar', label: 'Tab bar', content: <TabSpec /> },
  {
    id: 'row', label: 'List row',
    content: (
      <States id="mobile-b-spec-row" label="Row state" states={['Default', 'Selected', 'Disabled']}>
        {(v) => (
          <button type="button" className={s.lrow} {...ROW_STATE[v]}>
            <Icon name="document" size={22} />
            <span className="ruled-row-label">Plan sheet</span>
            <Bars widths={[5]} />
            <Icon name="chevron-right" size={18} />
          </button>
        )}
      </States>
    ),
  },
  {
    id: 'menu', label: 'Menu row',
    content: (
      <States id="mobile-b-spec-menu" label="Menu row state" states={['Closed', 'Open']}>
        {(v) => (
          <div className="rows">
            <button type="button" className="ruled-row" aria-expanded={v === 'Open'}>
              <span className="t-num">{ABOUT.rows[0].no}</span>
              <span className="ruled-row-label">{ABOUT.rows[0].label}</span>
              <span className="ruled-row-plus" aria-hidden="true" />
            </button>
            {v === 'Open' && <div className="ruled-row-body"><Bars widths={[14, 10]} /></div>}
          </div>
        )}
      </States>
    ),
  },
  {
    id: 'card', label: 'Card',
    content: (
      <States id="mobile-b-spec-card" label="Card ground" states={['Beige', 'Dark', 'Brand']}>
        {(v) => (
          <div className={v === 'Dark' ? 'card-dark' : v === 'Brand' ? 'card-hero card' : 'card-beige'}>
            <p className="t-h3">{LINES.imagination.text}</p>
            <p className="t-small"><Bars widths={[12, 8]} /></p>
          </div>
        )}
      </States>
    ),
  },
  {
    id: 'stat', label: 'Stat card',
    content: (
      <States id="mobile-b-spec-stat" label="Rows shown" states={['2', '3', '4']}>
        {(v) => (
          <div className="card">
            <p className="t-label">Rows shown</p>
            <p className={s.statNum}>{v}</p>
            <ul className="rows">
              {Array.from({ length: Number(v) }, (_, i) => <li key={i} className={s.statRow}><Bars widths={[8 + i]} /></li>)}
            </ul>
          </div>
        )}
      </States>
    ),
  },
  {
    id: 'input', label: 'Input',
    content: (
      <States id="mobile-b-spec-input" label="Input state" states={['Default', 'Focus', 'Error', 'Disabled']}>
        {(v) => (
          <div className={`${v === 'Focus' ? s.forceFocus : ''} ${v === 'Error' ? s.err : ''}`}>
            <Field id="mobile-b-spec-email" label="Email" type="email" disabled={v === 'Disabled'} aria-invalid={v === 'Error' || undefined} hint={v === 'Error' ? 'Enter an email' : undefined} />
          </div>
        )}
      </States>
    ),
  },
  {
    id: 'accordion', label: 'Accordion',
    content: (
      <div className={s.spec}>
        <div className={s.specStage}>
          <RuledRows id="mobile-b-spec-acc" rows={ABOUT.rows.map((r) => ({ ...r, body: <Bars widths={[14, 10]} /> }))} />
        </div>
      </div>
    ),
  },
  {
    id: 'sheet', label: 'Sheet',
    content: (
      <States id="mobile-b-spec-sheet" label="Sheet height" states={['Peek', 'Half', 'Full']}>
        {(v) => (
          <div className={s.shWrap}>
            <div className={s.shPage}><Bars widths={[9, 6, 8]} /></div>
            <div className={s.shSheet} style={{ transform: `translateY(${v === 'Peek' ? 64 : v === 'Half' ? 32 : 0}%)` }}>
              <span className={s.grab} aria-hidden="true" />
              <Bars widths={[10, 7]} />
            </div>
          </div>
        )}
      </States>
    ),
  },
];

export default function Components() {
  return <Tabs id="mobile-b-components" label="Mobile components" tabs={SPECS} />;
}
