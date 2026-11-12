'use client';

import { useState } from 'react';
import { colours } from './data';
import s from './dataviz.module.css';

const COLS = [
  ['name', 'Colour', (c) => c.name],
  ['hex', 'HEX', (c) => c.hex],
  ['r', 'RGB', (c) => c.rgb],
  ['c', 'CMYK', (c) => c.cmyk],
];

// The six published colours, sortable by every column (RGB by red, CMYK by cyan). Values are as printed on m05.
export default function DataTable() {
  const [sort, setSort] = useState({ key: 'name', dir: 1 });
  const rows = [...colours].sort((a, b) => {
    const [x, y] = sort.key === 'hex' ? [a.hex.toUpperCase(), b.hex.toUpperCase()] : [a[sort.key], b[sort.key]];
    return (typeof x === 'string' ? x.localeCompare(y) : x - y) * sort.dir;
  });
  const pick = (key) => setSort((o) => ({ key, dir: o.key === key ? -o.dir : 1 }));
  return (
    <div className={s.tableWrap} role="region" aria-label="Palette values table" tabIndex={0}>
      <table className={s.table}>
        <caption className="t-small">The six published colours. Click a heading to sort.</caption>
        <thead>
          <tr>
            {COLS.map(([key, label]) => (
              <th key={key} scope="col" aria-sort={sort.key === key ? (sort.dir === 1 ? 'ascending' : 'descending') : 'none'}>
                <button type="button" className={s.sortBtn} onClick={() => pick(key)}>
                  {label}
                  <span aria-hidden="true">{sort.key === key ? (sort.dir === 1 ? ' ↑' : ' ↓') : ' ↕'}</span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.token}>
              {COLS.map(([key, , get]) => (
                <td key={key} className={key === 'name' ? 't-serif' : ''}>
                  {key === 'name' && <i className={s.swatch} style={{ background: c.hex }} aria-hidden="true" />}
                  {get(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
