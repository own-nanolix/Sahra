import CopyValue from '@/components/site/CopyValue';
import { DARK, LIGHT, grade, onFill, ratio, rgbOf } from './data';
import s from './color.module.css';

function Ratio({ value }) {
  const g = grade(value);
  return (
    <span className={s.ratio}>
      <b>{value.toFixed(2)}</b>
      <span className={`${s.grade} ${s[g.tone]}`}>{g.label}</span>
    </span>
  );
}

// A spec table: token, swatch, HEX, RGB, contrast on Beige (light) and on Dark Chocolate Brown (dark).
// Every ratio is computed from the hex values; HEX and RGB copy on click.
export default function SpecTable({ rows, caption }) {
  return (
    <div className={s.tableWrap} tabIndex={0} role="region" aria-label={caption}>
      <table className={s.table}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Swatch</th>
            <th scope="col">HEX</th>
            <th scope="col">RGB</th>
            <th scope="col">On light (Beige)</th>
            <th scope="col">On dark (Chocolate)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <th scope="row">
                <span className={s.tok}>{r.token}</span>
                <span className="t-small">{r.name}</span>
              </th>
              <td>
                <span className={s.chip} style={{ background: r.hex, color: onFill(r.hex) }} aria-hidden="true">Aa</span>
              </td>
              <td><CopyValue value={r.hex} label={`${r.name} hex`} /></td>
              <td><CopyValue value={rgbOf(r.hex)} label={`${r.name} RGB`} /></td>
              <td><Ratio value={Number(ratio(r.hex, LIGHT))} /></td>
              <td><Ratio value={Number(ratio(r.hex, DARK))} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
