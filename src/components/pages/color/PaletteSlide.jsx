import Art from '@/components/art/Art';
import { HEX, PALETTE, TINT_STEPS } from '@/lib/brand';
import { contrast } from '@/lib/site';
import { LADDERS } from './data';
import s from './color.module.css';

// The palette slide rebuilt as m05 (1600 x 1143): Black over Dark Chocolate Brown at the left; Tribal Brown,
// Sand, Beige and White stacked at the right; a strip of four tints beside Tribal Brown, Sand and Beige.
// Names and the HEX / RGB / HSB / CMYK lines are exactly as printed, including Dark Chocolate's HSB "0, 0%, 0".
const CELLS = [
  { token: 'black', x: 0, y: 0, w: 800, h: 571, name: 75, rows: 132 },
  { token: 'chocolate', x: 0, y: 571, w: 800, h: 572, name: 653, rows: 710 },
  { token: 'tribal', x: 800, y: 0, w: 682, h: 286, name: 75, rows: 132 },
  { token: 'sand', x: 800, y: 286, w: 682, h: 285, name: 363, rows: 421 },
  { token: 'beige', x: 800, y: 571, w: 682, h: 286, name: 653, rows: 710 },
  { token: 'white', x: 800, y: 857, w: 800, h: 286, name: 942, rows: 999 },
];
// Type colour on each field as printed: white on the dark fields and on Sand, black on the light ones.
// Accessibility (the smallest change that works): on Sand, the printed white fails for the small value lines
// (2.9:1), so only those four lines are set in Dark Chocolate Brown (5.0:1); the name "Sand" is display type and
// keeps its printed white. Every other field keeps its printed colours.
const INK = { black: HEX.white, chocolate: HEX.white, tribal: HEX.white, sand: HEX.white, beige: HEX.black, white: HEX.black };
const VALUE_INK = { ...INK, sand: HEX.chocolate };
// The tint labels are printed in a mid grey (about #555555) that fails on the darker tints. Each label takes the
// lightest grey on the way from the printed grey to black that reaches 4.5:1 on its own tint.
const PRINTED_GREY = 0x55;
function labelInk(bg) {
  for (let t = 0; t <= 1; t += 0.05) {
    const v = Math.round(PRINTED_GREY * (1 - t)).toString(16).padStart(2, '0');
    const hex = `#${v}${v}${v}`;
    if (contrast(hex, bg) >= 4.5) return hex;
  }
  return HEX.black;
}
const KEYS = ['HEX', 'RGB', 'HSB', 'CMYK'];
const TINT_X = 1482;
const TINT_W = 118;

export default function PaletteSlide({ exportName = 'color-palette' }) {
  const by = Object.fromEntries(PALETTE.map((p) => [p.token, p]));
  return (
    <Art viewBox="0 0 1600 1143" title="Palette: Black, Dark Chocolate Brown, Tribal Brown, Sand, Beige and White with their HEX, RGB, HSB and CMYK values and four tints" exportName={exportName} className={s.slide}>
      {CELLS.map((c, i) => {
        const p = by[c.token];
        const ink = INK[c.token];
        const valueInk = VALUE_INK[c.token];
        const values = [p.hex, p.rgb, p.hsb, p.cmyk];
        const lx = c.x + 50;
        return (
          <g key={c.token}>
            <g className="fade-in" style={{ '--i': i }}>
              <rect x={c.x} y={c.y} width={c.w} height={c.h} fill={HEX[c.token]} />
            </g>
            <g className="slide-up" style={{ '--i': i + 3 }}>
              <text className="sans" x={lx} y={c.name} fontSize="30" fontWeight="300" letterSpacing="-0.3" fill={ink}>
                {p.name}
              </text>
              {KEYS.map((k, r) => (
                <g key={k}>
                  <text className="sans" x={lx} y={c.rows + r * 13.8} fontSize="12" fill={valueInk}>{k}</text>
                  <text className="sans" x={lx + 56} y={c.rows + r * 13.8} fontSize="12" fill={valueInk}>{values[r]}</text>
                </g>
              ))}
            </g>
          </g>
        );
      })}
      {['tribal', 'sand', 'beige'].map((t, gi) => {
        const cell = CELLS.find((c) => c.token === t);
        const h = cell.h / 4;
        return (
          <g key={t}>
            {LADDERS[t].slice(1).map((tint, k) => (
              <g key={tint.id} className="grow-x" style={{ '--i': 8 + gi * 4 + k }}>
                <rect x={TINT_X} y={cell.y + k * h} width={TINT_W} height={h + 0.5} fill={tint.hex} />
                <text className="sans" x={TINT_X + 43} y={cell.y + k * h + h / 2 + 4} fontSize="12" textAnchor="middle" fill={labelInk(tint.hex)}>
                  {TINT_STEPS[k]}
                </text>
              </g>
            ))}
          </g>
        );
      })}
    </Art>
  );
}
