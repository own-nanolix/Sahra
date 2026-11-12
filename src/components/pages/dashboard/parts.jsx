'use client';

// Shared pieces of the dashboard screens: tooltips, brand, search, chips, KPI, table, account chip, live charts.
import { useState } from 'react';
import Icon from '@/components/site/Icon';
import Chip from '@/components/ui/Chip';
import { HEX } from '@/lib/brand';
import { clamp } from '@/lib/site';
import { ArchChart, LineChart } from './art';
import { STATUSES, pad } from './data';
import s from './dashboard.module.css';

export function useTip() {
  const [tip, setTip] = useState(null);
  const on = (x, y, text) => ({
    tabIndex: 0,
    role: 'img',
    'aria-label': text,
    className: s.mark,
    onMouseEnter: () => setTip({ x, y, text }),
    onMouseLeave: () => setTip(null),
    onFocus: () => setTip({ x, y, text }),
    onBlur: () => setTip(null),
    onClick: () => setTip({ x, y, text }),
    onKeyDown: (e) => { if (e.key === 'Escape') setTip(null); },
  });
  return [tip, on];
}

export function Tip({ tip, w }) {
  if (!tip) return null;
  const tw = Math.round(tip.text.length * 6.4 + 22);
  const x = clamp(tip.x - tw / 2, 4, w - tw - 4);
  const y = Math.max(4, tip.y - 38);
  return (
    <g className="fade-in" pointerEvents="none">
      <rect x={x} y={y} width={tw} height="28" fill={HEX.chocolate} />
      <text x={x + 11} y={y + 18} fontSize="13" fill={HEX.beige} className="sans">{tip.text}</text>
    </g>
  );
}

export function ArchLive({ d }) {
  const [tip, on] = useTip();
  return <ArchChart final={d.counts.Final} total={d.total} on={on} tip={<Tip tip={tip} w={420} />} />;
}
export function LineLive({ d }) {
  const [tip, on] = useTip();
  return <LineChart cum={d.cum} rows={d.rows} max={d.total} on={on} tip={<Tip tip={tip} w={900} />} />;
}

export const Brand = ({ h = 20 }) => (
  <svg viewBox="0 0 1420 251" height={h} width={(h * 1420) / 251} role="img" aria-label="Sahra word-mark" className={s.brand}><use href="#site-wordmark" /></svg>
);

export function Search({ d, id, label = 'Search sheets' }) {
  return (
    <label className={s.search} htmlFor={id}>
      <Icon name="search" size={18} />
      <input id={id} type="search" placeholder="Search" aria-label={label} value={d.q} onChange={(e) => d.setQ(e.target.value)} />
      {d.q && <button type="button" className={s.clear} aria-label="Clear search" onClick={() => d.setQ('')}><Icon name="close" size={14} /></button>}
    </label>
  );
}

export function Filters({ d, dark }) {
  return (
    <div className={s.chips} role="group" aria-label="Filter by status">
      {['All', ...STATUSES].map((f) => (
        <Chip key={f} size="sm" pressed={d.filter === f} onClick={() => d.setFilter(f)} className={dark ? s.chipDark : ''}>
          {f}{f !== 'All' && <span className={s.cnt}>{d.counts[f]}</span>}
        </Chip>
      ))}
    </div>
  );
}

export function Kpi({ label, value, hint, active, onClick, tone = '', disabled }) {
  return (
    <button type="button" className={`${s.kpi} ${tone && s[tone]}`} aria-pressed={active} onClick={onClick} disabled={disabled}>
      <span className="t-label">{label}</span>
      <span className={s.kpiNum}>{value}</span>
      <span className="t-small">{hint}</span>
    </button>
  );
}

export function StatusMark({ status }) {
  return <span className={s.status}><i className={s[`st${STATUSES.indexOf(status)}`]} aria-hidden="true" />{status}</span>;
}

// The table: header buttons sort (aria-sort); rows select; the status cell cycles; the last cell opens the record.
export function SheetTable({ d, dense, limit = 99 }) {
  const th = (key, label) => {
    const on = d.sort.key === key;
    return (
      <th scope="col" aria-sort={on ? (d.sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}>
        <button type="button" className={s.sortBtn} onClick={() => d.toggleSort(key)}>{label}<Icon name={on && d.sort.dir === 'desc' ? 'arrow-up' : 'sort'} size={14} /></button>
      </th>
    );
  };
  return (
    <div className={s.tableWrap} role="region" aria-label="Sheets table" tabIndex={0}>
      <table className={`${s.table} ${dense ? s.dense : ''}`}>
        <caption className="sr-only">Sheets</caption>
        <thead><tr>{th('no', 'Sheet')}{th('status', 'Status')}<th scope="col">Layers</th><th scope="col">Updated</th><th scope="col"><span className="sr-only">Open</span></th></tr></thead>
        <tbody>
          {d.visible.slice(0, limit).map((r, i) => (
            <tr key={r.id} aria-current={d.sel === r.id ? 'true' : undefined} className="slide-up" style={{ '--i': Math.min(i, 14) }}>
              <td><button type="button" className={s.cellBtn} onClick={() => d.setSel(r.id)}><span className="t-num">{pad(r.id)}</span><span className={s.serifCell}>{r.name}</span></button></td>
              <td><button type="button" className={s.cellBtn} onClick={() => d.cycle(r.id)} aria-label={`${r.name}: ${r.status}. Change status`}><StatusMark status={r.status} /></button></td>
              <td><span className="ph" style={{ width: '5em' }} /></td>
              <td><span className="ph" style={{ width: '4em' }} /></td>
              <td><button type="button" className={s.openBtn} aria-label={`Open ${r.name}`} onClick={() => { d.setSel(r.id); d.go('record'); }}><Icon name="arrow-right" size={16} /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {!d.visible.length && <p className={`t-small ${s.empty}`}>No sheets match.</p>}
    </div>
  );
}

export function AccountChip({ dark, startOpen = false, disabled }) {
  const [open, setOpen] = useState(startOpen);
  return (
    <div className={s.account}>
      <button type="button" className={`${s.acct} ${dark ? s.acctDark : ''}`} aria-expanded={open} aria-haspopup="menu" disabled={disabled} onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 184 201" width="16" height="17" aria-hidden="true"><use href="#site-mark" /></svg>Account<Icon name="chevron-down" size={14} />
      </button>
      {open && (
        <ul className={s.menu} role="menu" aria-label="Account">
          {['Switch workspace', 'Sign out'].map((m) => <li key={m} role="none"><button type="button" role="menuitem" onClick={() => setOpen(false)}>{m}</button></li>)}
        </ul>
      )}
    </div>
  );
}

export function LayerChips({ d, dark }) {
  return (
    <div className={s.chips} role="group" aria-label="Layers">
      {d.layerList.map((l) => (
        <Chip key={l.id} size="sm" pressed={!!d.layers[l.id]} onClick={() => d.toggleLayer(l.id)} className={dark ? s.chipDark : ''}>{l.label}</Chip>
      ))}
    </div>
  );
}
