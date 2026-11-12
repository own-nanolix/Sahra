import Art from '@/components/art/Art';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { BALANCE, DARK, LADDERS, LIGHT, grade, onFill, ratio, rgbOf } from './data';

const COL = 120;

// A colour scale as one exportable sheet: a swatch per step, its token and hex, and the contrast on Beige and on
// Dark Chocolate Brown as computed numbers with a bar whose length is the ratio (21:1 is the full width).
export function ScaleArt({ rows, title, exportName }) {
  const w = rows.length * COL;
  const bar = (r) => r2(Math.min(r, 21) / 21 * (COL - 20));
  return (
    <Art viewBox={`0 0 ${w} 336`} title={title} exportName={exportName}>
      <rect width={w} height="336" fill={HEX.white} />
      {rows.map((c, i) => {
        const x = i * COL;
        const l = Number(ratio(c.hex, LIGHT));
        const d = Number(ratio(c.hex, DARK));
        return (
          <g key={c.id}>
            <g className="slide-up" style={{ '--i': i }}>
              <rect x={x + 4} y="8" width={COL - 8} height="186" fill={c.hex} stroke={HEX.chocolate} strokeOpacity="0.16" />
              <text className="serif" x={x + 16} y="64" fontSize="38" fill={onFill(c.hex)}>Aa</text>
              <text className="sans" x={x + 16} y="86" fontSize="11" fill={onFill(c.hex)}>{c.name.length > 16 ? c.name.replace('Dark Chocolate Brown', 'Dark Chocolate') : c.name}</text>
            </g>
            <text className="sans" x={x + 10} y="216" fontSize="12" fill={HEX.ink}>{c.token}</text>
            <text className="sans" x={x + 10} y="233" fontSize="12" fill={HEX.muted}>{c.hex}</text>
            <text className="sans" x={x + 10} y="256" fontSize="11" fill={HEX.muted}>On Beige</text>
            <text className="sans" x={x + 10} y="271" fontSize="12" fill={HEX.ink}>{l.toFixed(2)} {grade(l).label}</text>
            <rect className="grow-x" style={{ '--i': i }} x={x + 10} y="278" width={bar(l)} height="4" fill={HEX.tribal} />
            <text className="sans" x={x + 10} y="298" fontSize="11" fill={HEX.muted}>On Chocolate</text>
            <text className="sans" x={x + 10} y="313" fontSize="12" fill={HEX.ink}>{d.toFixed(2)} {grade(d).label}</text>
            <rect className="grow-x" style={{ '--i': i + 2 }} x={x + 10} y="320" width={bar(d)} height="4" fill={HEX.chocolate} />
          </g>
        );
      })}
    </Art>
  );
}

// One ladder: the colour at 100, 80, 60, 40 and 20 %, each band with its hex and RGB (tints are computed
// from the published colour by mixing with white).
export function TintLadder({ token, exportName }) {
  const steps = LADDERS[token];
  const name = steps[0].name;
  return (
    <Art viewBox="0 0 360 410" title={`${name}: the published colour and its four tints`} exportName={exportName}>
      <rect width="360" height="410" fill={HEX.white} />
      <text className="serif" x="14" y="30" fontSize="20" fill={HEX.ink}>{name}</text>
      {steps.map((t, i) => (
        <g key={t.id} className="grow-x" style={{ '--i': i * 2 }}>
          <rect x="0" y={48 + i * 72} width="360" height="72" fill={t.hex} />
          <text className="sans" x="16" y={48 + i * 72 + 30} fontSize="16" fill={onFill(t.hex)}>{t.pct}%</text>
          <text className="sans" x="16" y={48 + i * 72 + 52} fontSize="12" fill={onFill(t.hex)}>{t.token}</text>
          <text className="sans" x="344" y={48 + i * 72 + 30} fontSize="14" textAnchor="end" fill={onFill(t.hex)}>{t.hex}</text>
          <text className="sans" x="344" y={48 + i * 72 + 52} fontSize="12" textAnchor="end" fill={onFill(t.hex)}>{rgbOf(t.hex)}</text>
        </g>
      ))}
    </Art>
  );
}

// The balance of the six colours as measured on the case study (data.js): one bar of widths in proportion.
// A segment too narrow for its figure carries it in the label rows below instead.
export function ProportionBar({ exportName = 'color-proportion' }) {
  const total = BALANCE.reduce((a, b) => a + b.share, 0);
  const widths = BALANCE.map((b) => r2((b.share / total) * 1200));
  const starts = widths.map((_, i) => r2(widths.slice(0, i).reduce((a, b) => a + b, 0)));
  return (
    <Art viewBox="0 0 1200 230" title="Colour proportion: the share of each of the six colours in the case study images" exportName={exportName}>
      <rect width="1200" height="230" fill={HEX.white} />
      {BALANCE.map((b, i) => {
        const w = widths[i];
        const x = starts[i];
        const hex = HEX[b.token];
        return (
          <g key={b.token}>
            <g className="grow-x" style={{ '--i': i }}>
              <rect x={x} y="0" width={w} height="150" fill={hex} stroke={HEX.chocolate} strokeOpacity="0.16" />
              {w >= 96 ? <text className="serif" x={x + 14} y="44" fontSize="30" fill={onFill(hex)}>{b.share}%</text> : null}
            </g>
            <text className="sans" x={i === widths.length - 1 ? x + w - 2 : x + 2} textAnchor={i === widths.length - 1 ? 'end' : 'start'} y="178" fontSize="14" fill={HEX.ink}>{b.name}</text>
            <text className="sans" x={i === widths.length - 1 ? x + w - 2 : x + 2} textAnchor={i === widths.length - 1 ? 'end' : 'start'} y="198" fontSize="12" fill={HEX.muted}>{w >= 96 ? hex : `${b.share}%  ${hex}`}</text>
          </g>
        );
      })}
    </Art>
  );
}
