'use client';

// The date range control and the dashboard components sheet: nine components, each with its states and a live one.
import { useState } from 'react';
import Icon from '@/components/site/Icon';
import { toast } from '@/components/site/Toast';
import Chip from '@/components/ui/Chip';
import { STATUSES, pad } from './data';
import { AccountChip, Filters, Kpi, Search, SheetTable, StatusMark } from './parts';
import { useDash } from './useDash';
import s from './dashboard.module.css';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Click a first day, then a last day. The count of days is computed from the choice.
export function DateRange({ id, preset }) {
  const [r, setR] = useState(preset || [null, null]);
  const pick = (i) => setR(([a, b]) => (a === null || b !== null ? [i, null] : [Math.min(a, i), Math.max(a, i)]));
  const [a, b] = r;
  const last = b === null ? a : b;
  const inside = (i) => a !== null && i >= a && i <= last;
  return (
    <div className={s.range} role="group" aria-label="Date range" id={id}>
      <Icon name="calendar" size={16} />
      {DAYS.map((day, i) => <button key={day} type="button" className={s.day} aria-pressed={inside(i)} data-edge={i === a || i === last ? 'true' : undefined} onClick={() => pick(i)}>{day}</button>)}
      <span className="t-small" aria-live="polite">{a === null ? 'Choose days' : `${DAYS[a]} to ${DAYS[last]}, ${last - a + 1} ${last === a ? 'day' : 'days'}`}</span>
    </div>
  );
}

const STATES = ['Default', 'Hover', 'Selected', 'Focus', 'Disabled'];
// One state of a component. Hover and focus are shown by data-force; the copy is inert.
function Strip({ render, states = STATES, dark }) {
  return (
    <div className={`${s.strip5} ${dark ? `${s.darkPane} on-dark` : ''}`}>
      {states.map((st) => (
        <figure key={st} className={s.state} data-force={st.toLowerCase()}>
          <div inert>{render({ on: st === 'Selected', disabled: st === 'Disabled' })}</div>
          <figcaption className="t-label">{st}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Spec({ no, title, note, strip, children, dark }) {
  return (
    <section className={`${s.spec} ${dark ? 'on-dark' : ''}`} aria-labelledby={`dashboard-spec-${no}`}>
      <div className={s.specHead}><span className="t-num">{no}</span><h3 className="t-h3" id={`dashboard-spec-${no}`}>{title}</h3><p className="t-small">{note}</p></div>
      {strip}
      <div className={s.live}><p className="t-label">Live</p>{children}</div>
    </section>
  );
}

const SbItem = ({ icon, label, on, ...r }) => <button type="button" className={s.sbItem} aria-current={on ? 'page' : undefined} {...r}><Icon name={icon} size={18} />{label}</button>;
const RailItem = ({ no, label, status, on, ...r }) => <button type="button" className={s.railRow} aria-current={on ? 'true' : undefined} {...r}><span className="t-num">{no}</span><span className="ruled-row-label">{label}</span><span className={s.railSt}>{status}</span></button>;

export default function Components() {
  const d = useDash(() => toast('Opens the sheet record'));
  const [side, setSide] = useState(0);
  const [rail, setRail] = useState(1);
  const [kpi, setKpi] = useState('Final');
  const [sheet, setSheet] = useState(3);
  const items = [['plan', 'Plans'], ['document', 'Sheets'], ['grid', 'Layers']];
  return (
    <div className={s.specs}>
      <Spec no="01" title="Sidebar item" note="An icon and a label. The current item is marked." strip={<Strip render={(p) => <SbItem icon="plan" label="Plans" {...p} disabled={p.disabled} />} />}>
        <nav className={s.sidebar} aria-label="Sidebar example">{items.map(([ic, lb], i) => <SbItem key={lb} icon={ic} label={lb} on={side === i} onClick={() => setSide(i)} />)}</nav>
      </Spec>
      <Spec dark no="02" title="Rail item" note="A number, a serif label and the status, on Dark Chocolate." strip={<Strip dark render={(p) => <RailItem no="01" label="Sheet 01" status="Draft" {...p} />} />}>
        <ul className={`rows ${s.railDemo}`}>{[1, 2, 3].map((n) => <li key={n}><RailItem no={pad(n)} label={`Sheet ${pad(n)}`} status={d.sheets[n - 1].status} on={rail === n} onClick={() => setRail(n)} /></li>)}</ul>
      </Spec>
      <Spec no="03" title="KPI tile" note="A count taken from the list. It filters the list." strip={<Strip render={(p) => <Kpi label="Final" value={d.counts.Final} hint="sheets" active={p.on} disabled={p.disabled} />} />}>
        <div className={s.kpiRow}>{STATUSES.map((st) => <Kpi key={st} label={st} value={d.counts[st]} hint="sheets" active={kpi === st} onClick={() => setKpi(st)} />)}</div>
      </Spec>
      <Spec no="04" title="Table header and row" note="Click a header to sort. Click a status to change it. Rows select." strip={<Strip states={['Default', 'Hover', 'Selected', 'Focus']} render={(p) => <table className={`${s.table} ${s.dense}`}><tbody><tr aria-current={p.on ? 'true' : undefined}><td><span className={s.cellBtn}><span className="t-num">01</span><span className={s.serifCell}>Sheet 01</span></span></td><td><StatusMark status="Draft" /></td></tr></tbody></table>} />}>
        <SheetTable d={d} dense limit={5} />
      </Spec>
      <Spec no="05" title="Filter chip" note="Chips filter the list by status." strip={<Strip render={(p) => <Chip size="sm" pressed={p.on} disabled={p.disabled}>Draft</Chip>} />}>
        <Filters d={d} />
        <p className="t-small" aria-live="polite">{d.visible.length} of {d.total} sheets shown</p>
      </Spec>
      <Spec no="06" title="Status row" note="A ruled row; a click moves the sheet to its next status." strip={<Strip render={(p) => <div className="ruled-row"><span className="t-num">02</span><span className="ruled-row-label">Status</span><StatusMark status={p.on ? 'Final' : 'Draft'} /></div>} />}>
        <ul className="rows">
          <li><button type="button" className="ruled-row" onClick={() => d.cycle(sheet)}><span className="t-num">{pad(sheet)}</span><span className="ruled-row-label">{`Sheet ${pad(sheet)}`}</span><StatusMark status={d.sheets[sheet - 1].status} /></button></li>
        </ul>
        <div className={s.chips}>{[3, 4, 5].map((n) => <Chip key={n} size="sm" pressed={sheet === n} onClick={() => setSheet(n)}>{`Sheet ${pad(n)}`}</Chip>)}</div>
      </Spec>
      <Spec no="07" title="Search field" note="Filters the table and the charts as you type." strip={<Strip states={['Default', 'Focus', 'Disabled']} render={(p) => <label className={s.search}><Icon name="search" size={18} /><input placeholder="Search" aria-label="Search example" disabled={p.disabled} tabIndex={-1} /></label>} />}>
        <Search d={d} id="dashboard-spec-search" label="Search sheets in the components sheet" />
      </Spec>
      <Spec no="08" title="Date range" note="Pick a first day, then a last day." strip={<Strip states={['Default', 'Selected']} render={(p) => <DateRange preset={p.on ? [1, 3] : undefined} />} />}>
        <DateRange id="dashboard-spec-range" />
      </Spec>
      <Spec no="09" title="Account chip" note="Opens a small menu of two plain choices." strip={<Strip states={['Default', 'Hover', 'Focus', 'Disabled']} render={(p) => <AccountChip disabled={p.disabled} />} />}>
        <AccountChip />
      </Spec>
    </div>
  );
}
