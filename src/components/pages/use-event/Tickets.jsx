// Three tickets and a VIP pass on a counter, three-quarter top view, staggered. Each ticket carries the word-mark,
// one brand line, a perforated stub and quiet pale bars where a date, a seat or a code would be (invented
// none). The bars at the stub are a generic barcode of plain bars that encodes nothing. The pass hangs on a short
// lanyard and uses the plain word "VIP".
import { CastG, PlaceG, SheenG } from '@/components/art/Mockup';
import { WordmarkG, MarkG } from '@/components/art/Mark';
import { ArchWindowG } from '@/components/art/KeyArt';
import { LINES } from '@/lib/brand';
import { Scene, PaleBars, Barcode, Perf, C, INK } from './kit';

const TW = 480;
const TH = 200;
const PX = 356;
const TILT = 'matrix(1.3 0 -0.42 0.9 0 0)';

// Rounded ticket with a half-circle notch above and below the perforation.
function ticketPath(w, h, r, px, n) {
  return `M${r} 0H${px - n}A${n} ${n} 0 0 0 ${px + n} 0H${w - r}Q${w} 0 ${w} ${r}V${h - r}Q${w} ${h} ${w - r} ${h}H${px + n}A${n} ${n} 0 0 0 ${px - n} ${h}H${r}Q0 ${h} 0 ${h - r}V${r}Q0 0 ${r} 0Z`;
}

const VARIANTS = {
  beige: {
    name: 'Beige', face: 'card', ground: [C.tribal, C.chocolate], ink: INK, wm: C.tribal, bars: C.tribal, line: LINES.imagination.rows,
    step: [40, 100], at: [110, 190], lines: 2,
  },
  dark: {
    name: 'Dark Chocolate', face: 'board-dark', ground: [C.sand, C.beige], ink: C.beige, wm: C.sand, bars: C.beige, line: LINES.builtAround.rows,
    step: [80, -60], at: [130, 330], lines: 3,
  },
  sand: {
    name: 'Sand', face: 'board-sand', ground: [C.beige, C.tribal], ink: C.chocolate, wm: C.chocolate, bars: C.chocolate, line: LINES.elevate.rows,
    step: [-50, 100], at: [330, 190], lines: 3,
  },
};

function Ticket({ p, m, v, k }) {
  const d = ticketPath(TW, TH, 16, PX, 13);
  const size = v.lines === 3 ? 25 : 30;
  return (
    <g>
      <CastG d={d} len={20} opacity={0.24} />
      <path d={d} transform="translate(2 4)" fill="#000000" opacity="0.28" />
      <path d={d} fill={`url(#${m}-${v.face})`} filter={`url(#${m}-paper-grain)`} />
      <WordmarkG x={30} y={28} width={150} fill={v.wm} />
      <text className="serif" fontSize={size} fill={v.ink} letterSpacing="-0.4">
        {v.line.map((row, i) => <tspan key={row} x="30" y={86 + i * (size + 4)}>{row}</tspan>)}
      </text>
      <g>
        {[0, 1, 2].map((i) => <PaleBars key={i} x={30 + i * 96} y={166} widths={[74]} h={8} fill={v.bars} op={0.38} />)}
      </g>
      <Perf x={PX} y0={22} y1={180} fill={v.ink} r={2.4} step={12} />
      <Barcode x={376} y={26} w={84} h={148} fill={v.ink} seed={k + 4} />
      <path d={d} fill={`url(#${m}-shade)`} opacity="0.5" />
    </g>
  );
}

// Each colourway lies differently: Beige as a staggered stack, Dark Chocolate fanned from one corner, Sand as a
// loose column of three, apart.
function place(kind, v, k) {
  if (kind === 'dark') return { x: 230, y: 470, rotate: -20 + k * 12 };
  if (kind === 'sand') return { x: 250 + (k % 2) * 60, y: 230 + k * 240, rotate: k % 2 ? 4 : -5 };
  return { x: v.at[0] + k * v.step[0], y: v.at[1] + k * v.step[1] + 120 };
}

export function TicketPlate({ kind }) {
  const v = VARIANTS[kind];
  return (
    <Scene name={`ticket-${kind}`} title={`Tickets, ${v.name}`} w={980} h={1000} horizon={0.16} wall={v.ground[0]} floor={v.ground[1]}>
      {(p, m) => (
        <>
          {[0, 1, 2].map((k) => (
            <PlaceG key={k} i={k} {...place(kind, v, k)}>
              <g transform={TILT}>
                <Ticket p={p} m={m} v={v} k={k} />
                {k === 2 && <SheenG idp={m} d={ticketPath(TW, TH, 16, PX, 13)} opacity={0.3} />}
              </g>
            </PlaceG>
          ))}
        </>
      )}
    </Scene>
  );
}

// The VIP pass on its short lanyard: tall plate.
export function VipPass() {
  const loop = 'M176 0C120 -180 -40 -250 -20 -380C0 -480 170 -470 196 -380C232 -270 236 -140 216 0';
  const card = 'M26 0H374Q400 0 400 26V614Q400 640 374 640H26Q0 640 0 614V26Q0 0 26 0Z';
  return (
    <Scene name="vip-pass" title="VIP pass on a short lanyard" w={760} h={1600} horizon={0.1} wall={C.tribal} floor={C.sand}>
      {(p, m) => (
        <>
          <g transform="translate(250 760) matrix(1.12 0 -0.2 0.96 0 0)">
            <PlaceG i={1}>
              <path d={loop} fill="none" stroke="#000000" strokeOpacity="0.25" strokeWidth="46" transform="translate(14 18)" strokeLinejoin="round" />
              <path d={loop} fill="none" stroke={C.tribal} strokeWidth="46" />
              <path d={loop} fill="none" stroke={C.beige} strokeOpacity="0.55" strokeWidth="3" strokeDasharray="3 13" />
              <path d={loop} fill="none" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="14" transform="translate(-10 0)" />
              <CastG d={card} len={26} opacity={0.24} />
              <path d={card} transform="translate(3 6)" fill="#000000" opacity="0.4" />
              <path d={card} fill={`url(#${m}-board-dark)`} filter={`url(#${m}-fibre)`} />
              <clipPath id={`${p}-pass`}>
                <path d={card} />
              </clipPath>
              <g clipPath={`url(#${p}-pass)`}>
                <ArchWindowG idp={`${p}-win`} cx={0} cy={640} r={80} R={250} quadrant="tr" />
                <text className="serif" fontSize="150" fill={C.beige} letterSpacing="-4" x="34" y="250">VIP</text>
              </g>
              <WordmarkG x={34} y={34} width={190} fill={C.sand} />
              <MarkG x={326} y={32} size={42} fill={C.sand} />
              <rect x="160" y="-34" width="80" height="44" rx="8" fill={`url(#${m}-metal)`} />
              <ellipse cx="200" cy="-40" rx="16" ry="12" fill="none" stroke={`url(#${m}-metal)`} strokeWidth="6" />
              <rect x="176" y="22" width="48" height="12" rx="6" fill="#000000" opacity="0.6" />
              <path d={card} fill={`url(#${m}-shade)`} opacity="0.7" />
              <SheenG idp={m} d={card} opacity={0.3} />
            </PlaceG>
          </g>
        </>
      )}
    </Scene>
  );
}
