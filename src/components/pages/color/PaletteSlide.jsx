import Art from '@/components/art/Art';
import { HEX, PALETTE, TINT_STEPS } from '@/lib/brand';
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
// Type colour on each field: white on the dark ones, black on the light ones; Sand takes Dark Chocolate so
// that its small lines reach 4.5:1.
const INK = { black: '#FFFFFF', chocolate: '#FFFFFF', tribal: '#FFFFFF', sand: HEX.chocolate, beige: '#000000', white: '#000000' };
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
                  <text className="sans" x={lx} y={c.rows + r * 13.8} fontSize="12" fill={ink}>{k}</text>
                  <text className="sans" x={lx + 56} y={c.rows + r * 13.8} fontSize="12" fill={ink}>{values[r]}</text>
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
                <text className="sans" x={TINT_X + TINT_W / 2} y={cell.y + k * h + h / 2 + 4} fontSize="12" textAnchor="middle" fill={HEX.ink}>
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
