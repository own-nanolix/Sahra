// Artwork of the Spaces landing page. Abstract flat fields and gradients in the photo tones (never traced), the
// framed poster of m14 and the white card of m10 rebuilt. Every component returns SVG groups for <Art>.
import { r2 } from '@/lib/charts';
import { WordmarkG, MarkG } from '@/components/art/Mark';
import { BrandDefs, CurvedWallG, BrickCurveG, SkyPatchG, SteppedShadowG, ArchWindowG, TimberG, quarterArch, PHOTO } from '@/components/art/KeyArt';
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

// ---------- The framed poster of m14, rebuilt (800 x 1000): a wall of vertical fins under a dark ceiling ----------
export function FramedPosterG({ idp }) {
  const fins = Array.from({ length: 40 }, (_, i) => i);
  const perf = Array.from({ length: 8 * 40 }, (_, i) => [(i % 40) * 20 + 10, 18 + Math.floor(i / 40) * 12]);
  return (
    <g>
      <BrandDefs idp={idp} />
      <defs>
        <linearGradient id={`${idp}-light`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000000" stopOpacity="0.05" />
          <stop offset="0.7" stopColor="#000000" stopOpacity="0.3" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`${idp}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6A6259" />
          <stop offset="1" stopColor="#4A433C" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="#2B241E" />
      {perf.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="#4A4036" />)}
      {fins.map((i) => (
        <g key={i} className="rise" style={{ '--i': i % 20 }}>
          <rect x={i * 20} y="110" width="20" height="780" fill={i % 2 ? '#7C6742' : '#6A5836'} />
          <rect x={i * 20 + 14} y="110" width="6" height="780" fill="#000000" opacity="0.28" />
        </g>
      ))}
      <rect y="110" width="800" height="780" fill={`url(#${idp}-light)`} />
      <rect y="890" width="800" height="110" fill={`url(#${idp}-floor)`} />
      {/* the frame, its soft shade on the fins, then the poster */}
      <rect x="168" y="168" width="500" height="700" fill="#000000" opacity="0.28" />
      <rect x="150" y="150" width="500" height="700" fill="#0A0806" />
      <g className="fade-in" style={{ '--i': 6 }}>
        <SkyPatchG idp={`${idp}-sky`} x={175} y={175} w={450} h={345} />
        <rect x="175" y="520" width="450" height="305" fill="#F2EBDC" />
        <text className="serif" fontSize="34" letterSpacing="-0.6" fill={HEX.chocolate}>
          {LINES.elevate.rows.map((r, i) => <tspan key={r} x="205" y={578 + i * 38}>{r}</tspan>)}
        </text>
        <text className="sans" fontSize="10" fill={HEX.chocolate}>
          {LINES.refined.rows.map((r, i) => <tspan key={r} x="205" y={706 + i * 14}>{r}</tspan>)}
        </text>
        <WordmarkG idp={idp} x={205} y={776} width={140} fill={HEX.tribal} />
        <text className="serif" fontSize="12" fill={HEX.chocolate} textAnchor="end">
          {LINES.imagination.rows.map((r, i) => <tspan key={r} x="595" y={778 + i * 15}>{r}</tspan>)}
        </text>
      </g>
    </g>
  );
}

// ---------- The white card of m10 / m01 (600 x 720): lines, "→ sahra.sa" and a timber cut by the quarter arch ----------
export function CardG({ idp }) {
  return (
    <g>
      <rect width="600" height="720" fill="#F7F3EA" />
      <g className="sun-shadow">
        <rect x="84" y="86" width="480" height="600" fill="#35241C" opacity="0.14" />
      </g>
      <rect x="60" y="60" width="480" height="600" fill="#FFFFFF" />
      <text className="serif" fontSize="36" letterSpacing="-0.6" fill={HEX.chocolate}>
        {LINES.elevate.rows.map((r, i) => <tspan key={r} x="100" y={140 + i * 42}>{r}</tspan>)}
      </text>
      <text className="sans" fontSize="12" fill={HEX.muted}>
        {LINES.refined.rows.map((r, i) => <tspan key={r} x="100" y={286 + i * 17}>{r}</tspan>)}
      </text>
      <g className="fade-in" style={{ '--i': 3 }}>
        <ArchWindowG idp={idp} cx={540} cy={660} r={150} R={360} quadrant="tl">
          <TimberG idp={`${idp}-tw`} x={180} y={300} w={360} h={360} lines={44} />
        </ArchWindowG>
      </g>
      <text className="sans" x="100" y="624" fontSize="13" fill={HEX.sandInk}>{'→ sahra.sa'}</text>
      <MarkG x={472} y={92} size={34} fill={HEX.sand} />
    </g>
  );
}
