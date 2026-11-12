// Exportable artwork of the web system: the three card fills (wall and sky, arch tile, plan fragment), the mega
// menu's field and the two anatomy drawings (the button and a ruled row, with their measurements).
// Every drawing is drawn from the shared art kit; geometry lives in attributes, animation is CSS keyframes only.
import Art from '@/components/art/Art';
import { ArchWindowG, BrandDefs, CornerCutG, CurvedWallG, QuarterArchG, SkyPatchG, SteppedShadowG, TimberG, DRAWING } from '@/components/art/KeyArt';
import { FloorPlanG } from '@/components/art/Devices';
import { MarkG } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';

// 1. A wall and the sky: the curved wall of the left poster inside the hoarding's large rounded corner.
export function WallSkyArt({ idp, className }) {
  return (
    <Art viewBox="0 0 480 300" title="Curved wall and sky field with a large rounded corner" exportName="web-system-wall-sky" className={className}>
      <CornerCutG idp={`${idp}-cut`} x={0} y={0} w={480} h={300} rad={120} corner="br">
        <CurvedWallG idp={`${idp}-wall`} x={0} y={0} w={480} h={300} />
      </CornerCutG>
    </Art>
  );
}

// 2. The arch tile: a thick quarter ring as a window onto timber, on a Beige tile (the card of m10).
export function ArchTileArt({ idp, className }) {
  return (
    <Art viewBox="0 0 320 320" title="Quarter arch window onto timber" exportName="web-system-arch-tile" className={className}>
      <BrandDefs idp={`${idp}-defs`} />
      <rect width="320" height="320" fill={HEX.beige} />
      <QuarterArchG cx={290} cy={290} r={118} R={262} quadrant="tl" fill={HEX.sand} opacity="0.35" />
      <ArchWindowG idp={`${idp}-win`} cx={300} cy={300} r={110} R={250} quadrant="tl" />
      <rect x="0" y="0" width="320" height="320" fill="none" stroke={HEX.chocolate} strokeOpacity="0.12" />
    </Art>
  );
}

// 3. A plan fragment drawn on Tribal Brown board in Beige line, with the car park bays.
export function PlanFragmentArt({ className }) {
  return (
    <Art viewBox="0 0 480 300" title="Plan fragment on Tribal Brown board" exportName="web-system-plan-fragment" className={className}>
      <rect width="480" height="300" fill={HEX.tribal} />
      <FloorPlanG x={36} y={28} w={408} h={244} stroke={HEX.beige} seed={5} />
    </Art>
  );
}

// 4. The mega menu's field: a dark court with a patch of sky, timber light, a stepped shadow and a Sand arch.
export function MegaArt({ idp, className }) {
  return (
    <Art viewBox="0 0 360 440" title="Court with a patch of sky and a stepped shadow" exportName="web-system-mega-art" className={className}>
      <SkyPatchG idp={`${idp}-sky`} x={0} y={0} w={360} h={250} />
      <SteppedShadowG x={0} y={250} w={360} h={190} steps={8} />
      <TimberG idp={`${idp}-tim`} x={190} y={250} w={170} h={190} lines={28} opacity="0.9" />
      <QuarterArchG cx={360} cy={440} r={70} R={140} quadrant="tl" fill={HEX.sand} />
      <g transform="translate(26 372)" color={HEX.sand}>
        <MarkG size={32} fill={HEX.sand} />
      </g>
    </Art>
  );
}

// ---------- Anatomy drawings ----------
const INK = DRAWING.ink, RED = DRAWING.angle, LINE = DRAWING.line;

// A dimension: a line with end ticks and its value, horizontal or vertical. `i` sets the draw order.
function Dim({ x1, y1, x2, y2, text, i = 0, side = 1 }) {
  const horiz = y1 === y2;
  const len = Math.abs(horiz ? x2 - x1 : y2 - y1);
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const t = 5;
  return (
    <g>
      <path d={`M${x1} ${y1}L${x2} ${y2}`} stroke={RED} strokeWidth="1" fill="none" className="draw" style={{ '--len': len, '--i': i }} />
      <path d={horiz ? `M${x1} ${y1 - t}V${y1 + t}M${x2} ${y2 - t}V${y2 + t}` : `M${x1 - t} ${y1}H${x1 + t}M${x2 - t} ${y2}H${x2 + t}`} stroke={RED} strokeWidth="1" fill="none" />
      <text className="sans fade-in" style={{ '--i': i + 6 }} x={horiz ? mx : mx + 10 * side} y={horiz ? my - 9 * side : my + 4} textAnchor={horiz ? 'middle' : side > 0 ? 'start' : 'end'} fontSize="12" fill={INK}>{text}</text>
    </g>
  );
}

// 5. The button and its measurements, in the construction drawing's language (thin brown line, red dimensions).
export function ButtonAnatomyArt({ className }) {
  const bx = 150, by = 80, bw = 300, bh = 88; // the button drawn at 2x: 150 x 44
  return (
    <Art viewBox="0 0 600 300" title="Button anatomy with measurements" exportName="web-system-button-anatomy" className={className}>
      <rect width="600" height="300" fill={HEX.beige} />
      <g stroke={DRAWING.guide} strokeWidth="1">
        {[bx, bx + 40, bx + bw - 40, bx + bw].map((x) => <path key={x} d={`M${x} 40V250`} />)}
        {[by, by + bh].map((y) => <path key={y} d={`M110 ${y}H490`} />)}
      </g>
      <rect x={bx} y={by} width={bw} height={bh} rx="16" fill={HEX.tribal} />
      <path d={`M${bx + 40} ${by + 44}h28m-8 -8l8 8l-8 8`} stroke={HEX.beige} strokeWidth="2.4" fill="none" />
      <text className="sans" x={bx + 88} y={by + 51} fontSize="32" fill={HEX.beige}>sahra.sa</text>
      <rect x={bx - 6} y={by - 6} width={bw + 12} height={bh + 12} rx="20" fill="none" stroke={LINE} strokeWidth="2" strokeDasharray="6 5" />
      <Dim x1={bx} y1={by - 24} x2={bx + 40} y2={by - 24} text="20 padding" i={1} />
      <Dim x1={bx + 88} y1={by + bh + 28} x2={bx + 68} y2={by + bh + 28} text="10 gap" i={2} />
      <Dim x1={bx - 34} y1={by} x2={bx - 34} y2={by + bh} text="44 height" side={-1} i={3} />
      <Dim x1={bx + bw + 30} y1={by} x2={bx + bw + 30} y2={by + 16} text="8 radius" i={4} />
      <text className="sans" x={bx} y={by + bh + 64} fontSize="12" fill={INK}>Focus ring: 2 line, 2 offset. Small 34 high, large 54 high.</text>
      <text className="serif" x="40" y="36" fontSize="20" fill={INK}>Button</text>
    </Art>
  );
}

// 6. A ruled row and its measurements: rule, number column, serif label, "+" and the padding.
export function RowAnatomyArt({ className }) {
  const x0 = 60, y0 = 70, w = 480, h = 94;       // the row at 2x
  const num = 3.2 * 16 * 2;                     // number column: 3.2em of 16 px, drawn at 2x
  const px = x0 + 4, lx = x0 + num + 24;
  return (
    <Art viewBox="0 0 600 270" title="Ruled row anatomy with measurements" exportName="web-system-row-anatomy" className={className}>
      <rect width="600" height="270" fill={HEX.beige} />
      <text className="serif" x="40" y="36" fontSize="20" fill={INK}>Ruled row</text>
      <path d={`M${x0} ${y0}H${x0 + w}M${x0} ${y0 + h}H${x0 + w}`} stroke={INK} strokeOpacity="0.5" strokeWidth="1" className="grow-x" />
      <text className="sans" x={px} y={y0 + 50} fontSize="26" fill="#5C4A3E">02</text>
      <text className="serif" x={lx} y={y0 + 54} fontSize="38" fill={INK}>Our Process</text>
      <path d={`M${x0 + w - 32} ${y0 + h / 2}h28M${x0 + w - 18} ${y0 + h / 2 - 14}v28`} stroke={INK} strokeWidth="2" fill="none" />
      <Dim x1={x0} y1={y0 + h + 30} x2={x0 + num} y2={y0 + h + 30} text="3.2em number" i={1} />
      <Dim x1={x0 + num} y1={y0 + h + 30} x2={lx} y2={y0 + h + 30} text="12" i={2} side={-1} />
      <Dim x1={x0 - 22} y1={y0} x2={x0 - 22} y2={y0 + 44} text="22" i={3} side={-1} />
      <Dim x1={x0 + w + 22} y1={y0 + h / 2 - 16} x2={x0 + w + 22} y2={y0 + h / 2 + 16} text="16" i={4} />
      <text className="sans" x={x0} y={y0 + h + 66} fontSize="12" fill={INK}>{'Rule 1, padding 22 above and below. Label 19 to 24 serif. Opens as an accordion; the "+" turns to "-".'}</text>
      <circle cx={r2(x0 + w - 18)} cy={y0 + h / 2} r="1.5" fill={RED} />
    </Art>
  );
}

// 7. The card and its arch: radius 32 on the card, 18 on the media, and the quarter ring (inner and outer radius)
// that forms the window of the arch tile. Drawn at 1.5x.
export function CardAnatomyArt({ className }) {
  const x = 90, y = 64, w = 290, h = 230;
  const cx = 560, cy = 280;
  return (
    <Art viewBox="0 0 700 330" title="Card and quarter arch anatomy" exportName="web-system-card-anatomy" className={className}>
      <rect width="700" height="330" fill={HEX.beige} />
      <text className="serif" x="40" y="36" fontSize="20" fill={INK}>Card and quarter arch</text>
      <rect x={x} y={y} width={w} height={h} rx="48" fill={HEX.white} stroke={LINE} strokeWidth="1" />
      <rect x={x + 30} y={y + 30} width={w - 60} height="96" rx="27" fill={HEX.sand} fillOpacity="0.4" stroke={LINE} strokeDasharray="5 4" />
      <rect x={x + 30} y={y + 146} width="150" height="12" rx="3" fill={HEX.chocolate} opacity="0.7" />
      <rect x={x + 30} y={y + 170} width="210" height="8" rx="3" fill={HEX.chocolate} opacity="0.2" />
      <Dim x1={x} y1={y + h + 26} x2={x + 30} y2={y + h + 26} text="padding to 36" i={1} />
      <Dim x1={x + w + 28} y1={y} x2={x + w + 28} y2={y + 32} text="32 card radius" i={2} />
      <Dim x1={x - 26} y1={y + 30} x2={x - 26} y2={y + 57} text="18 media" side={-1} i={3} />
      <g className="fade-in" style={{ '--i': 4 }}>
        <QuarterArchG cx={cx} cy={cy} r={70} R={160} quadrant="tl" fill={HEX.tribal} />
        <path d={`M${cx} ${cy}H${cx - 160}M${cx} ${cy}V${cy - 160}`} stroke={LINE} strokeWidth="1" />
        <path d={`M${cx} ${cy}L${r2(cx - 70 * 0.7071)} ${r2(cy - 70 * 0.7071)}`} stroke={RED} strokeWidth="1" />
        <path d={`M${r2(cx - 70 * 0.7071)} ${r2(cy - 70 * 0.7071)}L${r2(cx - 160 * 0.7071)} ${r2(cy - 160 * 0.7071)}`} stroke={RED} strokeWidth="2" />
        <circle cx={cx} cy={cy} r="3.5" fill={DRAWING.anchor} />
      </g>
      <text className="sans" x={cx - 150} y={cy + 24} fontSize="12" fill={INK}>Ring: inner radius 70, outer radius 160, one quadrant</text>
    </Art>
  );
}
