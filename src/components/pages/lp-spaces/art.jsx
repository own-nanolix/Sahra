// Artwork of the Spaces landing page. Abstract flat fields and gradients in the photo tones (never traced), the
// poster of m14 and the white card of m10 rebuilt. Every component returns SVG groups for <Art>.
import { r2 } from '@/lib/charts';
import { WordmarkG } from '@/components/art/Mark';
import { CurvedWallG, BrickCurveG, SkyPatchG, SteppedShadowG, TimberG, quarterArch, PHOTO } from '@/components/art/KeyArt';
import { HEX, LINES } from '@/lib/brand';

// ---------- Hero fields: the two posters of m11 (600 x 840) ----------

// Left poster: a curved wall against the sky, deep shade below and to the right, a stepped dark at the foot.
export function HeroWallG({ idp }) {
  return (
    <g>
      <rect width="600" height="840" fill={PHOTO.shade} />
      <g className="fade-in">
        <CurvedWallG idp={idp} x={0} y={0} w={600} h={840} skyline={0.36} />
      </g>
      <g className="fade-in" style={{ '--i': 6 }}>
        <SteppedShadowG x={0} y={690} w={280} h={150} steps={5} fill="#3A2A20" shade={PHOTO.shade} />
      </g>
    </g>
  );
}

// Right poster's strip: the tall strip of curved brick (the courses bend with the wall, a dark curl at the foot).
export function HeroBrickG({ idp }) {
  return (
    <g>
      <BrickCurveG idp={idp} x={0} y={0} w={300} h={800} courses={44} />
      <g className="fade-in" style={{ '--i': 4 }}>
        <path d="M300 800V560Q180 560 120 800Z" fill={PHOTO.shade} opacity="0.5" />
      </g>
      <path d="M300 560Q180 560 120 800" fill="none" stroke={PHOTO.timberLight} strokeWidth="3" opacity="0.7" className="draw" style={{ '--len': 520, '--i': 3 }} />
    </g>
  );
}

// ---------- The two pinned visuals of the story (640 x 800), one after the other ----------

// A curved wall with the sky: guide lines draw on, a quarter arch of light rests in the sky.
export function WallPinG({ idp }) {
  const guides = [0.2, 0.4, 0.6, 0.8];
  const bands = [340, 400, 460, 520];
  return (
    <g>
      <CurvedWallG idp={idp} x={0} y={0} w={640} h={800} skyline={0.4} />
      <g className="fade-in" style={{ '--i': 5 }}>
        <path d={quarterArch(640, 0, 120, 210, 'bl')} fill="#FFFFFF" opacity="0.16" />
      </g>
      <g stroke="#F5F0E3" strokeOpacity="0.35" strokeWidth="1.2" fill="none">
        {guides.map((g, i) => (
          <path key={g} d={`M${r2(640 * g)} 0V800`} className="draw" style={{ '--len': 800, '--i': i + 1 }} />
        ))}
      </g>
      {/* raking light on the plaster: soft horizontal bands that follow the curve of the wall */}
      <g fill="none" stroke="#F5F0E3" strokeOpacity="0.1" strokeWidth="2">
        {bands.map((b, i) => (
          <path key={b} d={`M0 ${b + 60}Q${r2(640 * 0.45)} ${b - 40} ${r2(640 * 0.78)} ${b + 10}`} className="draw" style={{ '--len': 760, '--i': i + 4 }} />
        ))}
      </g>
      <g className="sun-shadow">
        <SteppedShadowG x={360} y={600} w={280} h={200} steps={6} fill="#B0652A" shade={PHOTO.shade} />
      </g>
    </g>
  );
}

// Curved brick: courses that bend, a deep curl at the foot, a lit edge where the wall turns.
export function BrickPinG({ idp }) {
  return (
    <g>
      <BrickCurveG idp={idp} x={0} y={0} w={640} h={800} courses={52} />
      <path d="M0 0H210Q170 380 360 800H0Z" fill={PHOTO.timberLight} opacity="0.2" />
      <g className="fade-in" style={{ '--i': 3 }}>
        <path d="M640 800V500Q400 500 300 800Z" fill={PHOTO.shade} opacity="0.55" />
      </g>
      <path d="M640 500Q400 500 300 800" fill="none" stroke={PHOTO.timberLight} strokeWidth="4" opacity="0.75" className="draw" style={{ '--len': 700, '--i': 2 }} />
      <path d="M210 0Q170 380 360 800" fill="none" stroke="#F5F0E3" strokeWidth="2" opacity="0.4" className="draw" style={{ '--len': 900, '--i': 4 }} />
    </g>
  );
}

// ---------- The stepped-shadow divider (3120 x 400): staircases of light and shade on a plaster wall ----------
// Each staircase lengthens on entry; the page slides the whole strip sideways with the scroll (sun moving).
export function SunStepsG({ idp }) {
  const cols = Array.from({ length: 6 }, (_, i) => i);
  return (
    <g>
      <defs>
        <linearGradient id={`${idp}-plaster`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F0E9E1" />
          <stop offset="0.5" stopColor="#E1D2C4" />
          <stop offset="1" stopColor="#D3BCA6" />
        </linearGradient>
      </defs>
      <rect width="3120" height="400" fill={`url(#${idp}-plaster)`} />
      {cols.map((i) => (
        <g key={i} className="sun-shadow" style={{ animationDelay: `${300 + i * 220}ms` }}>
          <SteppedShadowG x={i * 520 + 40} y={0} w={400 - (i % 3) * 40} h={400} steps={6 + (i % 2)} fill={i % 2 ? '#C4A589' : '#E1D2C4'} shade={i % 2 ? '#875D41' : '#35241C'} />
        </g>
      ))}
      <rect y="396" width="3120" height="4" fill="#35241C" opacity="0.5" />
    </g>
  );
}

// ---------- The poster of m14 as the print (524 x 829): a thin black frame round a 500 x 805 poster ----------
// Re-measured from m14 at 2800 px (poster 393 x 633 there): the photo field fills the top 50 %, the beige panel
// the rest; the line at x 36 with baselines 459 / 497 / 535 (37 px); the sub-line at 577 / 590; the word-mark at
// (36, 738), 159 wide; "We Build Spaces / of Imagination" right-aligned at 475, baselines 726 / 744.
const P = { x: 12, y: 12, w: 500, h: 805, photo: 402 };
export function FlatPosterG({ idp }) {
  const { x, y, w, h, photo } = P;
  const at = (dx, dy) => ({ x: x + dx, y: y + dy });
  return (
    <g>
      <rect width={w + 2 * x} height={h + 2 * y} fill="#0A0806" />
      <g className="fade-in" style={{ '--i': 2 }}>
        <SkyPatchG idp={`${idp}-sky`} x={x} y={y} w={w} h={photo} />
      </g>
      <rect x={x} y={y + photo} width={w} height={h - photo} fill="#F2EBDC" />
      <text className="serif" fontSize="37" letterSpacing="-0.5" fill={HEX.chocolate}>
        {LINES.elevate.rows.map((r, i) => <tspan key={r} {...at(36, 459 + i * 38)}>{r}</tspan>)}
      </text>
      <text className="sans" fontSize="10.5" fill={HEX.chocolate}>
        {LINES.refined.rows.map((r, i) => <tspan key={r} {...at(36, 577 + i * 13)}>{r}</tspan>)}
      </text>
      <WordmarkG idp={idp} x={x + 36} y={y + 738} width={159} fill={HEX.tribal} />
      <text className="serif" fontSize="16.5" fill={HEX.chocolate} textAnchor="end">
        {LINES.imagination.rows.map((r, i) => <tspan key={r} {...at(475, 726 + i * 18)}>{r}</tspan>)}
      </text>
    </g>
  );
}

// ---------- The white card of m10 (680 x 520): a landscape card 600 x 422 on the studio ground ----------
// Re-measured from m10 at 2800 px: the line at x 37 with baselines 71 / 114 / 157 (41 px); the sub-line in
// Tribal Brown at 205 / 226; "→ sahra.sa" at 386; the timber seen through a thick arch whose centre is at
// (490, 347), radii 192 and 61, running straight down to the bottom edge and straight out to the right edge.
// No mark is printed on this card.
const C = { x: 40, y: 40, w: 600, h: 422, cx: 490, cy: 347, R: 192, r: 61 };
export function CardG({ idp }) {
  const { x, y, w, h, R, r } = C;
  const cx = x + C.cx, cy = y + C.cy;
  const arch = `M${cx - R} ${y + h}V${cy}A${R} ${R} 0 0 1 ${cx} ${cy - R}H${x + w}V${cy - r}H${cx}A${r} ${r} 0 0 0 ${cx - r} ${cy}V${y + h}Z`;
  return (
    <g>
      <rect width="680" height="520" fill="#F7F3EA" />
      <g className="sun-shadow">
        <rect x={x + 18} y={y + 20} width={w} height={h} fill="#35241C" opacity="0.14" />
      </g>
      <rect x={x} y={y} width={w} height={h} fill="#FFFFFF" />
      <text className="serif" fontSize="41" letterSpacing="-0.6" fill={HEX.chocolate}>
        {LINES.elevate.rows.map((row, i) => <tspan key={row} x={x + 37} y={y + 71 + i * 43}>{row}</tspan>)}
      </text>
      <text className="sans" fontSize="15.5" fill={HEX.tribal}>
        {LINES.refined.rows.map((row, i) => <tspan key={row} x={x + 37} y={y + 205 + i * 21}>{row}</tspan>)}
      </text>
      <defs>
        <clipPath id={`${idp}-arch`}>
          <path d={arch} />
        </clipPath>
      </defs>
      <g className="fade-in" style={{ '--i': 3 }}>
        <g clipPath={`url(#${idp}-arch)`}>
          <TimberG idp={`${idp}-tw`} x={cx - R} y={cy - R} w={x + w - (cx - R)} h={y + h - (cy - R)} lines={40} />
          <path d={arch} fill={PHOTO.shade} opacity="0.35" />
        </g>
      </g>
      <text className="sans" x={x + 37} y={y + 386} fontSize="16.5" fill={HEX.tribal}>{'→ sahra.sa'}</text>
    </g>
  );
}
