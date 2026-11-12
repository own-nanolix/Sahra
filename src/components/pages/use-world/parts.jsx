// Shared drawing parts of the use-world scenes: the abstract timber court (the stand-in for the photograph of
// m14 and m16), the three posters (m14 elevate, the two of m11) and small hardware (bolts, a shaded rail).
// Every part returns SVG groups and takes an `idp` that starts with `use-world-`.
import { r2 } from '@/lib/charts';
import { LINES, CONTACT_BLOCKS, POSTER_BODY } from '@/lib/brand';
import { BrandDefs, SteppedShadowG, CurvedWallG, BrickCurveG, PHOTO } from '@/components/art/KeyArt';
import { WordmarkG, MarkG } from '@/components/art/Mark';
import { wrap } from '@/components/art/Devices';

export const INK = '#35241C';

// A row of bolts (round heads with a lit upper left and a dark lower right).
export function Bolts({ xs, y, r = 3.2 }) {
  return (
    <g>
      {xs.map((x) => (
        <g key={x}>
          <circle cx={r2(x + r * 0.35)} cy={r2(y + r * 0.4)} r={r} fill={INK} opacity="0.3" />
          <circle cx={x} cy={y} r={r} fill="#8A8077" />
          <circle cx={r2(x - r * 0.3)} cy={r2(y - r * 0.3)} r={r2(r * 0.45)} fill="#FFFFFF" opacity="0.55" />
        </g>
      ))}
    </g>
  );
}

// A metal bar seen from the front: body in the dark anodised gradient, lit top edge, shaded foot.
export function Bar({ x, y, w, h, fill, hi = 0.35 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} />
      <rect x={x} y={y} width={w} height={Math.max(1.5, h * 0.12)} fill="#FFFFFF" opacity={hi} />
      <rect x={x} y={r2(y + h - Math.max(1.5, h * 0.14))} width={w} height={Math.max(1.5, h * 0.14)} fill="#000000" opacity="0.35" />
    </g>
  );
}

// The abstract timber court in its own space of 915 x 528, scaled to w x h. Flat fields and gradients in the
// photo tones: a lightwell with one large rounded corner, a lit timber slab, stairs of light and shade.
export function Court({ idp, w, h, lines = 44 }) {
  const sx = r2((w / 915) * 1000) / 1000;
  const sy = r2((h / 528) * 1000) / 1000;
  const wall = 'M0 0H495L372 74L232 150Q172 255 232 335L405 478V528H0Z';
  return (
    <g transform={`scale(${sx} ${sy})`}>
      <BrandDefs idp={idp} />
      <defs>
        <linearGradient id={`${idp}-lw`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EAF0F4" />
          <stop offset="1" stopColor="#9FB9CC" />
        </linearGradient>
        <pattern id={`${idp}-brk`} width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="1.2" fill="#FFF6E8" opacity="0.07" />
        </pattern>
      </defs>
      <clipPath id={`${idp}-wl`}>
        <path d={wall} />
      </clipPath>
      <clipPath id={`${idp}-stairs`}>
        <path d="M520 528L915 330V528Z" />
      </clipPath>
      <rect width="915" height="528" fill="#17100C" />
      <rect x="585" width="330" height="528" fill="#100B08" />
      <rect x="585" width="330" height="528" fill={`url(#${idp}-brk)`} />
      <path d={wall} fill={`url(#${idp}-timber)`} />
      <g clipPath={`url(#${idp}-wl)`}>
        {Array.from({ length: lines }, (_, i) => (
          <rect key={i} x={i * 9.5} y="0" width={i % 4 === 0 ? 2.2 : 1} height="528" fill={i % 3 ? '#FFFFFF' : PHOTO.shade} opacity={i % 5 === 0 ? 0.14 : 0.07} />
        ))}
        <path d="M0 330Q80 350 150 440L120 528H0Z" fill={PHOTO.shade} opacity="0.7" />
        <path d="M232 335L405 478V528H300L170 400Z" fill={PHOTO.shade} opacity="0.35" />
      </g>
      <path d="M232 170C232 120 275 95 330 60L430 22L470 70L585 172L405 320Q250 290 232 170Z" fill={`url(#${idp}-lw)`} />
      <path d="M470 70L585 172L520 232L430 130Z" fill="#FFFFFF" opacity="0.16" />
      <path d="M405 320L585 175L915 470V528H470Z" fill={`url(#${idp}-timber)`} />
      <path d="M405 320L585 175L915 470" fill="none" stroke="#FFF6E8" strokeWidth="2" opacity="0.5" />
      <path d="M405 320L470 528H300Z" fill={PHOTO.shade} opacity="0.3" />
      <g clipPath={`url(#${idp}-stairs)`}>
        <SteppedShadowG x={470} y={330} w={445} h={198} steps={10}fill={PHOTO.timber} shade="#1B130E" />
      </g>
      <path d="M0 0H210L915 528H690Z" fill="#FFF6E8" opacity="0.045" />
      <path d="M250 0H300L915 460V528H880Z" fill="#FFF6E8" opacity="0.035" />
      <path d="M470 0V528" stroke="#000000" strokeWidth="1.4" opacity="0.5" />
    </g>
  );
}

// ---------- Posters (design space 400 x 560, scaled to w x h at x, y) ----------

function ContactBlock({ x, y, lines, fill, size = 7.2, anchor = 'start' }) {
  return (
    <text className="sans" fontSize={size} fill={fill} textAnchor={anchor}>
      {lines.map((t, i) => <tspan key={t} x={x} y={y + i * (size + 2.6)}>{t}</tspan>)}
    </text>
  );
}

function PosterFrame({ idp, x, y, w, h, children }) {
  const k = r2((w / 400) * 1000) / 1000;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${k} ${r2((h / 560) * 1000) / 1000})`}>
      <clipPath id={`${idp}-clip`}>
        <rect width="400" height="560" />
      </clipPath>
      <g clipPath={`url(#${idp}-clip)`}>{children}</g>
    </g>
  );
}

// m14: the timber court above, a beige panel below with the line, the sub line, the word-mark and the brand line.
export function PosterElevate({ idp, x = 0, y = 0, w = 400, h = 560 }) {
  const { rows } = LINES.elevate;
  return (
    <PosterFrame idp={idp} x={x} y={y} w={w} h={h}>
      <rect width="400" height="560" fill="#F5F0E3" />
      <Court idp={`${idp}-ct`} w={400} h={300} lines={26} />
      <rect y="300" width="400" height="260" fill="#F5F0E3" />
      <rect y="300" width="400" height="2" fill="#000000" opacity="0.16" />
      <text className="serif" fontSize="28" letterSpacing="-0.8" fill={INK}>
        {rows.map((t, i) => <tspan key={t} x="28" y={348 + i * 29}>{t}</tspan>)}
      </text>
      <text className="sans" fontSize="8.6" fill="#5C4A3E">
        {LINES.refined.rows.map((t, i) => <tspan key={t} x="28" y={448 + i * 11}>{t}</tspan>)}
      </text>
      <WordmarkG x={28} y={512} width={122} fill="#875D41" />
      <text className="serif" fontSize="11.5" fill={INK}>
        {LINES.imagination.rows.map((t, i) => <tspan key={t} x="268" y={522 + i * 13}>{t}</tspan>)}
      </text>
    </PosterFrame>
  );
}

// m11 left: the curved wall at dusk, the line at the top, the mark and the three contact blocks.
export function PosterImagination({ idp, x = 0, y = 0, w = 400, h = 560, body = false }) {
  const bodyRows = wrap(POSTER_BODY, 46);
  return (
    <PosterFrame idp={idp} x={x} y={y} w={w} h={h}>
      <rect width="400" height="560" fill="#1B130E" />
      <CurvedWallG idp={`${idp}-cw`} x={0} y={0} w={400} h={560} skyline={0.3} />
      <rect y="225" width="400" height="335" fill="#1B130E" opacity="0.86" />
      <text className="serif" fontSize="29" letterSpacing="-0.8" fill="#F5F0E3">
        {LINES.imagination.rows.map((t, i) => <tspan key={t} x="30" y={56 + i * 31}>{t}</tspan>)}
      </text>
      {body && (
        <text className="sans" fontSize="6.2" fill="#E1D2C4">
          {bodyRows.map((t, i) => <tspan key={i} x="196" y={290 + i * 8.6}>{t}</tspan>)}
        </text>
      )}
      <ContactBlock x={254} y={430} lines={CONTACT_BLOCKS.online} fill="#E1D2C4" />
      <ContactBlock x={254} y={466} lines={CONTACT_BLOCKS.service} fill="#E1D2C4" />
      <ContactBlock x={254} y={502} lines={CONTACT_BLOCKS.office} fill="#E1D2C4" />
      <MarkG x={30} y={496} size={34} fill="#B58F6B" />
    </PosterFrame>
  );
}

// m11 right: beige, the line at the top left, a tall strip of curved brick at the right, the contacts below.
export function PosterBuilt({ idp, x = 0, y = 0, w = 400, h = 560, body = false }) {
  const bodyRows = wrap(POSTER_BODY, 40);
  return (
    <PosterFrame idp={idp} x={x} y={y} w={w} h={h}>
      <rect width="400" height="560" fill="#EFE6D3" />
      <BrickCurveG idp={`${idp}-bk`} x={252} y={22} w={132} h={460} courses={30} />
      <text className="serif" fontSize="29" letterSpacing="-0.8" fill={INK}>
        {LINES.builtAround.rows.map((t, i) => <tspan key={t} x="26" y={58 + i * 31}>{t}</tspan>)}
      </text>
      {body && (
        <text className="sans" fontSize="6.2" fill="#5C4A3E">
          {bodyRows.map((t, i) => <tspan key={i} x="26" y={290 + i * 8.6}>{t}</tspan>)}
        </text>
      )}
      <ContactBlock x={26} y={414} lines={CONTACT_BLOCKS.online} fill="#5C4A3E" />
      <ContactBlock x={26} y={450} lines={CONTACT_BLOCKS.service} fill="#5C4A3E" />
      <ContactBlock x={26} y={486} lines={CONTACT_BLOCKS.office} fill="#5C4A3E" />
    </PosterFrame>
  );
}
