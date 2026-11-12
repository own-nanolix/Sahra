// A paper cup with a kraft sleeve, and cork coasters: on a counter, three-quarter view.
import { WordmarkDebossG } from '@/components/art/Mark';
import { seeded, r2 } from '@/lib/charts';
import Stage, { C, Cyl, Ledge, Mk, SHADOW_INK } from './kit';

const CORK = { top: '#CDA97F', side: '#A9835A', speck: ['#8E6A44', '#E3C79F', '#7A5836'] };

// A cork disc seen from above at an angle: side wall, top face with speckle, optional mark lying flat on it.
function Cork({ cx, cy, rx, ry, th = 11, seed = 3, mark, idp }) {
  const rnd = seeded(seed);
  const dots = Array.from({ length: 70 }, (_, i) => {
    const a = rnd() * Math.PI * 2, u = Math.sqrt(rnd());
    return { x: r2(cx + rx * 0.94 * u * Math.cos(a)), y: r2(cy + ry * 0.94 * u * Math.sin(a)), r: r2(0.9 + rnd() * 1.7), c: CORK.speck[i % 3] };
  });
  return (
    <g>
      <path d={`M${cx - rx} ${cy}V${cy + th}A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + th}V${cy}Z`} fill={CORK.side} />
      <path d={`M${cx - rx} ${cy}V${cy + th}A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + th}V${cy}Z`} fill={`url(#${idp}-shade)`} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={CORK.top} />
      {dots.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} opacity="0.55" />)}
      {mark && (
        <g transform={`translate(${cx} ${cy}) scale(1 ${r2(ry / rx)})`}>
          <Mk cx={0} cy={0} s={rx * 0.62} fill={C.chocolate} opacity="0.88" />
        </g>
      )}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${idp}-sheet)`} />
      <path d={`M${cx - rx} ${cy}A${rx} ${ry} 0 0 1 ${cx} ${cy - ry}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1.6" />
    </g>
  );
}

const CX = 450;
const hw = (y) => 100 - (28 * (y - 170)) / 280;
const ryAt = (y) => 28 - (8 * (y - 170)) / 280;

function Cup() {
  const body = `M${CX - 100} 170L${CX - 72} 450A72 20 0 0 0 ${CX + 72} 450L${CX + 100} 170Z`;
  const [y1, y2] = [236, 372];
  const band = `M${CX - hw(y1)} ${y1}A${r2(hw(y1))} ${r2(ryAt(y1))} 0 0 0 ${CX + hw(y1)} ${y1}L${CX + hw(y2)} ${y2}A${r2(hw(y2))} ${r2(ryAt(y2))} 0 0 1 ${CX - hw(y2)} ${y2}Z`;
  const mid = (y1 + y2) / 2 + 10;
  return (
    <Stage id="cup" title="Paper cup with a kraft sleeve debossed with the word-mark" w={900} h={600} horizon={0.46} wall={C.tribal20} floor={C.sand40} order={1}>
      {(idp) => (
        <g>
          <Ledge y={522} w={900} h={600} thick={30} edge={C.tribal} apron={C.chocolate} />
          <path d={`M${CX - 70} 462H${CX + 80}L${CX + 270} 498H${CX + 130}Z`} fill={SHADOW_INK} opacity="0.26" />
          <ellipse cx={CX + 40} cy="470" rx="150" ry="14" fill={SHADOW_INK} opacity="0.12" />
          <Cork cx={CX} cy={452} rx={122} ry={34} th={9} seed={5} idp={idp} />
          <path d={body} fill={`url(#${idp}-paper)`} />
          <path d={band} fill={`url(#${idp}-board-sand)`} filter={`url(#${idp}-fibre)`} />
          <g transform={`translate(${CX} 0) scale(0.9 1) translate(${-CX} 0)`}>
            <WordmarkDebossG idp={`${idp}-dbs`} x={CX - 60} y={mid - 11} width={120} tone="#C9A47F" depth={3} />
          </g>
          <path d={band} fill={`url(#${idp}-edge)`} />
          <path d={`M${CX - hw(y1)} ${y1}A${r2(hw(y1))} ${r2(ryAt(y1))} 0 0 0 ${CX + hw(y1)} ${y1}`} fill="none" stroke={SHADOW_INK} strokeOpacity="0.3" strokeWidth="2" />
          <path d={`M${CX - hw(y2)} ${y2}A${r2(hw(y2))} ${r2(ryAt(y2))} 0 0 0 ${CX + hw(y2)} ${y2}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="1.5" />
          <Cyl idp={idp} d={body} />
          <path d={`M${CX - 106} 142V172A106 29 0 0 0 ${CX + 106} 172V142Z`} fill={C.chocolate} />
          <path d={`M${CX - 106} 142V172A106 29 0 0 0 ${CX + 106} 172V142Z`} fill={`url(#${idp}-shade)`} />
          <ellipse cx={CX} cy="142" rx="106" ry="29" fill="#4A3529" />
          <ellipse cx={CX} cy="138" rx="78" ry="20" fill="#3C2A20" />
          <ellipse cx={CX} cy="138" rx="78" ry="20" fill="none" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="2" />
          <path d={`M${CX + 22} 128h40a8 5 0 0 1 0 10h-40a8 5 0 0 1 0-10Z`} fill="#150D09" />
          <path d={`M${CX - 96} 134A100 26 0 0 1 ${CX - 30} 116`} fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}
    </Stage>
  );
}

function Coasters() {
  return (
    <Stage id="coasters" title="Stack of cork coasters carrying the mark" w={800} h={400} horizon={0.2} wall={C.sand} floor={C.beige} order={1}>
      {(idp) => (
        <g>
          <Ledge y={356} w={800} h={400} thick={22} edge={C.chocolate} />
          <path d="M300 250H440L610 296H460Z" fill={SHADOW_INK} opacity="0.26" />
          <path d="M510 262H690L780 296H620Z" fill={SHADOW_INK} opacity="0.24" />
          {[0, 1, 2].map((i) => <Cork key={i} cx={250} cy={248 - i * 13} rx={118} ry={33} th={12} seed={10 + i} mark={i === 2} idp={idp} />)}
          <Cork cx={560} cy={268} rx={118} ry={33} th={12} seed={21} mark idp={idp} />
        </g>
      )}
    </Stage>
  );
}

export const COUNTER_PLATES = {
  cup: { key: 'cup', cap: 'Cup with sleeve', c: 3, r: 2, ar: 1.5, node: <Cup /> },
  coasters: { key: 'coasters', cap: 'Coasters', c: 2, r: 1, ar: 2, node: <Coasters /> },
};
