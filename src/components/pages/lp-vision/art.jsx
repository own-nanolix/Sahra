// Artwork of the Our Vision landing page: abstract flat fields in the photo tones (never traced), the hoarding of
// m16 as a long band, and the two posters of m11. Every component returns SVG groups; the pages wrap them in <Art>.
import { r2 } from '@/lib/charts';
import { WM, WordmarkG, MarkG } from '@/components/art/Mark';
import { BrandDefs, CornerCutG, BrickCurveG, SteppedShadowG, CurvedWallG, GuideGridG, cornerCut, quarterArch, PHOTO, DRAWING } from '@/components/art/KeyArt';
import { wrap } from '@/components/art/Devices';
import { HEX, LINES, POSTER_BODY, CONTACT_BLOCKS, HOARDING } from '@/lib/brand';

// ---------- A patch of sky seen up a timber-lined court (m14, m16): drawn in a 1600 x 900 box ----------
// Dark court, a sky opening with one large rounded corner, a lit timber wall at the left bending into a curve,
// stairs of light and shade at the lower right. The right wall is the shadow side: it lengthens on entry.
export function CourtG({ idp, x = 0, y = 0, w = 1600, h = 900, ...rest }) {
  const grain = Array.from({ length: 44 }, (_, i) => 14 + i * 12);
  // slats on the shadow wall: thin vertical lines that follow the wall's top edge
  const slats = Array.from({ length: 12 }, (_, i) => 1180 + i * 36);
  // courses on the lit return under the opening: horizontal lines that close in towards the sky
  const courses = Array.from({ length: 8 }, (_, i) => 540 + i * 32);
  // light rays falling from the opening across the return
  const rays = [[600, 520, 520, 900], [760, 520, 760, 900], [920, 520, 1000, 900]];
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(w / 1600)} ${r2(h / 900)})`} {...rest}>
      <BrandDefs idp={idp} />
      <defs>
        <linearGradient id={`${idp}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={PHOTO.shade} stopOpacity="0" />
          <stop offset="1" stopColor={PHOTO.shade} stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${idp}-fade-top`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={PHOTO.shade} stopOpacity="0" />
          <stop offset="1" stopColor={PHOTO.shade} stopOpacity="0.82" />
        </linearGradient>
        <linearGradient id={`${idp}-beam`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F5F0E3" stopOpacity="0.34" />
          <stop offset="1" stopColor="#F5F0E3" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${idp}-lw`}>
          <path d="M0 0L560 70V520L0 900Z" />
        </clipPath>
      </defs>
      <rect width="1600" height="900" fill={PHOTO.shade} />
      {/* the shadow side: lengthens on entry */}
      <g className="sun-shadow">
        <path d="M1120 70L1600 0V900H1180L1120 520Z" fill={PHOTO.timberDeep} />
        <path d="M1120 70L1600 0V300L1120 330Z" fill="#000000" opacity="0.28" />
      </g>
      {/* the lit return under the opening */}
      <path d="M560 520H1120L1180 900H470Z" fill={`url(#${idp}-timber)`} />
      <path d="M560 520H1120L1010 770H650Z" fill={PHOTO.timberLight} opacity="0.55" />
      <g stroke={PHOTO.shade} strokeOpacity="0.28" strokeWidth="1.4" fill="none">
        {slats.map((x, i) => <path key={x} d={`M${x} ${r2(70 - ((x - 1120) * 70) / 480)}V${i % 2 ? 900 : 860}`} />)}
        {courses.map((y, i) => <path key={y} d={`M${r2(560 - (y - 520) * 0.24)} ${y}H${r2(1120 + (y - 520) * 0.24)}`} strokeOpacity={0.12 + i * 0.015} />)}
      </g>
      <g stroke="#F5F0E3" strokeOpacity="0.1" strokeWidth="3" className="fade-in" style={{ '--i': 9 }}>
        {rays.map(([x0, y0, x1, y1]) => <path key={x0} d={`M${x0} ${y0}L${x1} ${y1}`} />)}
      </g>
      {/* the sky, with its one large rounded corner */}
      <g className="fade-in" style={{ '--i': 4 }}>
        <path d={cornerCut(560, 70, 560, 450, 230, 'bl')} fill={`url(#${idp}-sky)`} />
        <path d="M980 70H1120V260Z" fill="#FFFFFF" opacity="0.16" />
      </g>
      {/* the left timber wall with fine grain */}
      <g className="settle" style={{ '--i': 1 }}>
        <path d="M0 0L560 70V520L0 900Z" fill={`url(#${idp}-timber)`} />
        <g clipPath={`url(#${idp}-lw)`}>
          {grain.map((gx, i) => (
            <rect key={gx} x={gx} y="0" width={i % 4 ? 1.2 : 2.4} height="900" fill={i % 3 ? '#FFFFFF' : PHOTO.shade} opacity={0.05 + (i % 5) * 0.012} />
          ))}
        </g>
        <path d="M0 900V590Q60 400 300 380Q480 372 560 520V900Z" fill={`url(#${idp}-timber)`} />
        <path d="M0 590Q60 400 300 380Q480 372 560 520" fill="none" stroke={PHOTO.timberLight} strokeWidth="5" opacity="0.7" />
      </g>
      <path d="M0 80L520 140V330L0 520Z" fill={`url(#${idp}-beam)`} className="fade-in" style={{ '--i': 7 }} />
      <SteppedShadowG x={980} y={560} w={620} h={340} steps={7} fill={PHOTO.timber} />
      <rect y="420" width="1600" height="480" fill={`url(#${idp}-fade)`} />
      <rect width="1600" height="260" fill={`url(#${idp}-fade-top)`} />
    </g>
  );
}

// ---------- The hoarding of m16, drawn as a long band (4400 x 800) so that its crop can slide ----------
// 0 to 2415 is the hoarding as printed, re-measured from m16 at 2800 px (band height 928 px there = 800 here):
// the field ends at 1379 with one rounded corner of radius 82 at its lower right, the seam between two printed
// sheets at 707, the word-mark top left (x 78, width 426), "We Build Spaces / of Imagination" bottom left
// (60 / 58), the beige panel's line at x 1461 (80 / 78), its sub-line (37 / 48) and the "→ sahra.sa" button
// (209 x 62, radius 17). Beyond 2415 the beige runs on as quiet board with the shadows and a quarter arch.
export const HOARD = { field: 1379, rad: 82, seam: 707, text: 1461, end: 2415 };
export function HoardingG({ idp }) {
  const { field, rad, seam, text, end } = HOARD;
  const shadows = [0, 1, 2, 3].map((i) => `M${3000 + i * 230} 0H${3140 + i * 230}L${3500 + i * 230} 800H${3360 + i * 230}Z`);
  return (
    <g>
      <BrandDefs idp={`${idp}-b`} />
      <rect width="4400" height="800" fill={HEX.beige} />
      <rect x={field - 200} width={4400 - field + 200} height="800" fill={`url(#${idp}-b-paper)`} filter={`url(#${idp}-b-grain)`} />
      {shadows.map((d, i) => (
        <g key={i} className="fade-in" style={{ '--i': 8 + i }}>
          <path d={d} fill={HEX.tribal} opacity={0.05 + (i % 2) * 0.03} />
        </g>
      ))}
      <path d={`M${end} 0V800`} stroke={HEX.chocolate} strokeOpacity="0.08" strokeWidth="2" />
      <path d={quarterArch(4400, 800, 250, 380, 'tl')} fill="#E1D2C4" />
      <MarkG x={3980} y={110} size={70} fill={HEX.tribal} />
      <CornerCutG idp={idp} x={0} y={0} w={field} h={800} rad={rad} corner="br">
        <CourtG idp={`${idp}-c`} x={0} y={0} w={field} h={800} />
      </CornerCutG>
      {/* the thin seam where two printed sheets meet (m16) */}
      <path d={`M${seam} 0V800`} stroke={HEX.chocolate} strokeOpacity="0.45" strokeWidth="2" />
      <WordmarkG idp={idp} x={78} y={70} width={426} fill={HEX.beige} className="fade-in" style={{ '--i': 2 }} />
      <text className="serif" fontSize="60" letterSpacing="-0.8" fill={HEX.beige}>
        {HOARDING.photoLine.rows.map((r, i) => <tspan key={r} x="78" y={664 + i * 58}>{r}</tspan>)}
      </text>
      <text className="serif" fontSize="80" letterSpacing="-1.2" fill={HEX.chocolate}>
        {HOARDING.line.rows.map((r, i) => <tspan key={r} x={text} y={125 + i * 78}>{r}</tspan>)}
      </text>
      <text className="sans" fontSize="37" letterSpacing="-0.4" fill={HEX.chocolate}>
        {HOARDING.sub.rows.map((r, i) => <tspan key={r} x={text} y={367 + i * 48}>{r}</tspan>)}
      </text>
      <rect x={text} y="675" width="209" height="62" rx="17" fill={HEX.tribal} />
      <text className="sans" x={text + 104.5} y="717" fontSize="33" fill={HEX.beige} textAnchor="middle">{HOARDING.button}</text>
    </g>
  );
}

// ---------- The two posters of m11 (600 x 840 each), re-measured from m11 at 2800 px ----------
// Both posters: headline at x 36 with baselines 67 / 110 (45 / 43); contact blocks with first baselines 637,
// 703 and 770 (the printed line naming a social network is left out, so the first block has two lines and the
// gap where the third was). Left: justified body at x 287, 304 wide, from 330; contacts at x 385; mark at
// (36, 746), 53 wide. Right: body at x 35, 246 wide, from 365; contacts at x 35; brick strip x 346, y 38, to the
// right edge, 762 tall.
// The body is printed justified; here it is set ranged left at the printed measure (stretching SVG lines to a
// length pulls their letters apart).
const BLOCK_Y = [637, 703, 770];
function PosterText({ x, bodyX, bodyY, lead, max, fill, size = 10.4 }) {
  const body = wrap(POSTER_BODY, max);
  const blocks = [CONTACT_BLOCKS.online, CONTACT_BLOCKS.service, CONTACT_BLOCKS.office];
  return (
    <g>
      <text className="sans" fontSize={size} fill={fill}>
        {body.map((l, i) => (
          <tspan key={i} x={bodyX} y={r2(bodyY + i * lead)}>{l}</tspan>
        ))}
      </text>
      {blocks.map((b, bi) => (
        <text key={bi} className="sans" fontSize="9.8" fill={fill}>
          {b.map((l, i) => <tspan key={l} x={x} y={BLOCK_Y[bi] + i * 13.8}>{l}</tspan>)}
        </text>
      ))}
    </g>
  );
}

// Left poster: the curved wall against the sky, dark, "We Build Spaces of Imagination", the mark bottom left.
export function PosterLeftG({ idp }) {
  return (
    <g>
      <rect width="600" height="840" fill={PHOTO.shade} />
      <g className="fade-in">
        <CurvedWallG idp={idp} x={0} y={0} w={600} h={840} skyline={0.3} />
      </g>
      <text className="serif" fontSize="45" letterSpacing="-0.6" fill={HEX.beige}>
        {LINES.imagination.rows.map((r, i) => <tspan key={r} x="36" y={67 + i * 43}>{r}</tspan>)}
      </text>
      <PosterText x={385} bodyX={287} bodyY={330} lead={14.6} max={60} fill="#E8DFD0" />
      <g className="fade-in" style={{ '--i': 5 }}>
        <SteppedShadowG x={0} y={700} w={260} h={140} steps={5} fill="#3A2A20" shade={PHOTO.shade} />
      </g>
      <MarkG x={36} y={746} size={53} fill={HEX.sand} />
    </g>
  );
}

// Right poster: beige, "Built around how people live today", a tall strip of curved brick at the right.
export function PosterRightG({ idp }) {
  return (
    <g>
      <rect width="600" height="840" fill="#EFE8D8" />
      <text className="serif" fontSize="45" letterSpacing="-0.6" fill={HEX.chocolate}>
        {LINES.builtAround.rows.map((r, i) => <tspan key={r} x="35" y={66 + i * 43.5}>{r}</tspan>)}
      </text>
      <g className="fade-in" style={{ '--i': 2 }}>
        <BrickCurveG idp={idp} x={346} y={38} w={254} h={762} courses={36} />
      </g>
      <PosterText x={35} bodyX={35} bodyY={365} lead={13.6} max={47} fill={HEX.ink} />
    </g>
  );
}

// ---------- The black statement of m14 (right half), re-measured: 800 x 1131 ----------
// Four lines at x 63, baselines 130 / 203 / 275 / 348, set at 68 px; "design" and "and" at the two ends of the third
// line (the end of "and" at 652; 68 px sets "purpose," ending near 658 as printed); the mark at (62, 1012), 56 wide; "www.sahra.sa" right-aligned at 731, 1066.
export function BlackStatementG() {
  const rows = LINES.designing.rows;
  return (
    <g>
      <rect width="800" height="1131" fill="#000000" />
      <text className="serif" fontSize="68" letterSpacing="-1" fill="#EDE4D3">
        {rows.map((r, i) => (Array.isArray(r) ? (
          <tspan key={i}>
            <tspan x="63" y={r2(130 + i * 72.7)}>{r[0]}</tspan>
            <tspan x="652" y={r2(130 + i * 72.7)} textAnchor="end">{r[1]}</tspan>
          </tspan>
        ) : <tspan key={i} x="63" y={r2(130 + i * 72.7)}>{r}</tspan>))}
      </text>
      <g className="fade-in" style={{ '--i': 4 }}>
        <MarkG x={62} y={1012} size={56} fill={HEX.sand} topClass="mark-top" bottomClass="mark-bottom" />
      </g>
      <text className="sans" x="731" y="1066" fontSize="21" fill="#EDE4D3" textAnchor="end">{CONTACT_BLOCKS.online[0]}</text>
    </g>
  );
}

export const CONSTRUCTION_BOX = `-90 -40 ${WM.W + 180} ${WM.DESC + 90}`;

// ---------- The court as a line drawing (1600 x 700): lines draw on along the grid, anchors fade in ----------
// Converging lines from the frame to the opening, timber slats on both planes, the stairs of light as a stepped
// line, and the opening with its one large rounded corner. Drawn in the language of the construction drawing (m03).
export function CourtLinesG() {
  const [L, R, T, B] = [40, 1560, 40, 660];
  const op = { x: 560, y: 160, w: 480, h: 300 };
  const topY = (x) => T + ((x - L) * (op.y - T)) / (op.x - L);
  const botY = (x) => B - ((x - L) * (B - (op.y + op.h))) / (op.x - L);
  const mirror = (x) => R - (x - L);
  const slats = Array.from({ length: 9 }, (_, i) => L + (i + 1) * 52);
  const corners = [[L, T], [R, T], [L, B], [R, B], [op.x, op.y], [op.x + op.w, op.y], [op.x, op.y + op.h], [op.x + op.w, op.y + op.h]];
  const rays = [[L, T, op.x, op.y], [R, T, op.x + op.w, op.y], [L, B, op.x, op.y + op.h], [R, B, op.x + op.w, op.y + op.h]];
  const steps = 7, dx = (R - (op.x + op.w)) / steps, dy = (B - (op.y + op.h)) / steps;
  let stair = `M${op.x + op.w} ${op.y + op.h}`;
  for (let i = 1; i <= steps; i++) stair += `H${r2(op.x + op.w + dx * i)}V${r2(op.y + op.h + dy * i)}`;
  return (
    <g fill="none" stroke={DRAWING.line} strokeWidth="1.6" strokeLinecap="square">
      <GuideGridG x={L} y={T} w={R - L} h={B - T} step={52} stroke={DRAWING.guide} />
      <rect x={L} y={T} width={R - L} height={B - T} className="draw" style={{ '--len': 4200 }} />
      {rays.map(([x0, y0, x1, y1], i) => (
        <path key={i} d={`M${x0} ${y0}L${x1} ${y1}`} className="draw" style={{ '--len': 760, '--i': 2 + i }} />
      ))}
      {slats.map((x, i) => (
        <g key={x}>
          <path d={`M${x} ${r2(topY(x))}V${r2(botY(x))}`} strokeWidth="1" className="draw" style={{ '--len': 620, '--i': 4 + i }} />
          <path d={`M${mirror(x)} ${r2(topY(x))}V${r2(botY(x))}`} strokeWidth="1" className="draw" style={{ '--len': 620, '--i': 4 + i }} />
        </g>
      ))}
      <path d={cornerCut(op.x, op.y, op.w, op.h, 150, 'bl')} stroke={DRAWING.angle} strokeWidth="2.4" className="draw" style={{ '--len': 1800, '--i': 12 }} />
      <path d={stair} strokeWidth="2" className="draw" style={{ '--len': 1400, '--i': 14 }} />
      <g fill={DRAWING.anchor} stroke="none">
        {corners.map(([x, y], i) => <rect key={i} x={x - 5} y={y - 5} width="10" height="10" className="fade-in" style={{ '--i': 16 + i }} />)}
      </g>
    </g>
  );
}
