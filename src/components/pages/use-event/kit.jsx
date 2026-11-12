// Shared pieces of the event plates: the plate frame (backdrop, materials), repeats of the word-mark,
// pale placeholder bars, a plain barcode that encodes nothing, perforation dots and the two printed artworks
// (the poster of m11 / m14 and the hoarding of m16) rebuilt from the shared brand components.
import Art from '@/components/art/Art';
import { BackdropG, MaterialDefs, SCENE } from '@/components/art/Mockup';
import { WordmarkG } from '@/components/art/Mark';
import { TimberG, CornerCutG, SteppedShadowG } from '@/components/art/KeyArt';
import { MarkG as Mark } from '@/components/art/Mark';
import { LINES, URL_LINE } from '@/lib/brand';
import { seeded, r2 } from '@/lib/charts';

export const C = SCENE;
export const INK = '#35241C';
export const MUTED = '#5C4A3E';
export const WMH = 251 / 1420; // word-mark height / width
export { Mark };

// One plate: an exportable SVG with its backdrop and materials. children(p, m) gets the id prefix and the
// materials prefix; every id starts with use-event-.
export function Scene({ name, title, w, h, horizon, wall, floor, line = true, children }) {
  const p = `use-event-${name}`;
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={p} preserveAspectRatio="xMidYMid slice">
      <BackdropG idp={`${p}-bd`} w={w} h={h} horizon={horizon} wall={wall} floor={floor} line={line} />
      <MaterialDefs idp={`${p}-m`} />
      {children(p, `${p}-m`)}
    </Art>
  );
}

// The word-mark repeated in staggered rows (woven lanyards, wristbands, banners).
export function WmGrid({ x = 0, y = 0, w, h, width, gapX, gapY, fill, shift = 0.5, opacity = 1 }) {
  const hh = width * WMH;
  const cols = Math.ceil(w / (width + gapX)) + 2;
  const rows = Math.ceil(h / (hh + gapY)) + 1;
  const out = [];
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      out.push(<WordmarkG key={`${r}-${c}`} x={r2(x + c * (width + gapX) - (r % 2) * shift * (width + gapX))} y={r2(y + r * (hh + gapY))} width={width} fill={fill} />);
    }
  }
  return <g opacity={opacity}>{out}</g>;
}

// Quiet pale bars where a name, date, seat or code would be: invented nothing.
export function PaleBars({ x, y, widths, h = 10, gap = 16, fill, op = 0.3 }) {
  return (
    <g fill={fill} opacity={op}>
      {widths.map((bw, i) => <rect key={i} x={x} y={r2(y + i * (h + gap))} width={bw} height={h} rx={h / 2} />)}
    </g>
  );
}

// A generic barcode: plain bars that encode nothing.
export function Barcode({ x, y, w, h, fill, seed = 3 }) {
  const rnd = seeded(seed);
  const bars = [];
  let cx = 0;
  while (cx < w) {
    const bw = 1.5 + Math.floor(rnd() * 4) * 1.5;
    if (bars.length % 2 === 0 || rnd() > 0.5) bars.push(<rect key={cx} x={r2(x + cx)} y={y} width={bw} height={h} />);
    cx += bw + 1.5 + rnd() * 3;
  }
  return <g fill={fill}>{bars.filter((_, i) => i < 400)}</g>;
}

// Perforation dots along a vertical line.
export function Perf({ x, y0, y1, fill, r = 3, step = 13 }) {
  const n = Math.floor((y1 - y0) / step);
  return (
    <g fill={fill}>
      {Array.from({ length: n + 1 }, (_, i) => <circle key={i} cx={x} cy={r2(y0 + i * step)} r={r} />)}
    </g>
  );
}

// The shared woven look: a fabric noise filter plus a fine weave of thread lines, clipped by the caller.
export function Weave({ x, y, w, h, m, color, thread = '#FFFFFF', pitch = 5 }) {
  const n = Math.floor(h / pitch);
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={color} filter={`url(#${m}-fabric)`} />
      <g stroke={thread} strokeWidth="0.8" opacity="0.1">
        {Array.from({ length: n }, (_, i) => <path key={i} d={`M${x} ${r2(y + i * pitch)}H${x + w}`} />)}
      </g>
      <g stroke={INK} strokeWidth="0.8" opacity="0.1">
        {Array.from({ length: Math.floor(w / pitch) }, (_, i) => <path key={i} d={`M${r2(x + i * pitch)} ${y}V${y + h}`} />)}
      </g>
    </g>
  );
}

// The poster of m11 / m14 as an event artwork: "Spaces that elevate everyday living with intention" over an
// abstract timber court with the quarter-circle corner. Local box 500 x 700.
export function PosterArt({ p, x, y, w }) {
  const k = w / 500;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 1000) / 1000})`}>
      <rect width="500" height="700" fill={C.beige} />
      <text className="serif" fontSize="48" fill={INK} letterSpacing="-1">
        {LINES.elevate.rows.map((row, i) => <tspan key={row} x="40" y={92 + i * 54}>{row}</tspan>)}
      </text>
      <Mark x={422} y={652} size={36} fill={C.tribal} />
      <CornerCutG idp={`${p}-pc`} x={40} y={300} w={420} h={340} rad={96} corner="br">
        <TimberG idp={`${p}-pt`} x={40} y={300} w={420} h={340} lines={70} />
        <path d="M40 300H250L460 520V640H40Z" fill={`url(#${p}-pt-wall)`} opacity="0.9" />
        <path d="M150 300H250L330 380L230 440Z" fill={`url(#${p}-pt-sky)`} />
        <SteppedShadowG x={250} y={470} w={210} h={170} steps={6} />
      </CornerCutG>
    </g>
  );
}

// The hoarding of m16: photograph panel with the rounded corner at its lower right (timber court, sky opening),
// the word-mark and the brand line over it; a Beige half with the headline, the sub-line and the url button.
// Local box 1600 x 530.
export function HoardingArt({ p, x, y, w }) {
  const k = w / 1600;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 1000) / 1000})`}>
      <rect width="1600" height="530" fill={C.beige} />
      <CornerCutG idp={`${p}-hc`} x={0} y={0} w={915} h={530} rad={64} corner="br">
        <rect width="915" height="530" fill="#2A1C15" />
        <TimberG idp={`${p}-ht`} x={0} y={0} w={915} h={530} lines={96} />
        <path d="M470 0H915V530H760Z" fill="#2A1C15" />
        <path d="M250 140L440 40L580 190L420 330Z" fill={`url(#${p}-ht-sky)`} />
        <path d="M0 400L420 330L760 530H0Z" fill="#2A1C15" opacity="0.55" />
        <SteppedShadowG x={520} y={330} w={395} h={200} steps={7} />
        <WordmarkG x={50} y={48} width={285} fill={C.sand40} />
        <text className="serif" fontSize="40" fill={C.sand40} letterSpacing="-0.5">
          {LINES.imagination.rows.map((row, i) => <tspan key={row} x="52" y={440 + i * 46}>{row}</tspan>)}
        </text>
      </CornerCutG>
      <text className="serif" fontSize="50" fill={INK} letterSpacing="-1">
        {LINES.refinedLiving.rows.map((row, i) => <tspan key={row} x="968" y={80 + i * 53}>{row}</tspan>)}
      </text>
      <text className="sans" fontSize="25" fill={INK}>
        {LINES.cleanArchitecture.rows.map((row, i) => <tspan key={row} x="968" y={244 + i * 32}>{row}</tspan>)}
      </text>
      <rect x="968" y="447" width="140" height="42" rx="10" fill={C.tribal} />
      <text className="sans" fontSize="22" fill={C.beige} x="987" y="475">{URL_LINE}</text>
    </g>
  );
}
