// The profile: the card of m12 (brown gradient header with the quarter arch, the mark in its beige tile, the
// "Follow" button, name, handle, bio; no verified tick, no platform chrome) and a 3 x 3 grid of nine square tiles.
import Art from '@/components/art/Art';
import { WordmarkG, MarkG, MarkTileG, WordmarkCropG, WordmarkOutlineG } from '@/components/art/Mark';
import { wrap } from '@/components/art/Devices';
import { BrandDefs, QuarterArchG, CurvedWallG, SkyPatchG, BrickCurveG, GuideGridG, ArchWindowG } from '@/components/art/KeyArt';
import { PROFILE, LINES, URL_LINE } from '@/lib/brand';
import { K, Serif } from './shared';

// The arch band is one stroked centre line (a quarter circle running on into a straight arm), as the header of m12.
const ARCH_D = 'M113.5 210V172A87.5 87.5 0 0 1 201 84.5H560';

export function ProfileCard() {
  const idp = 'campaign-pf';
  const bio = wrap(PROFILE.bio, 82);
  return (
    <Art viewBox="0 0 512 410" title="Profile card: Sahra Real Estate" exportName="campaign-profile-card">
      <BrandDefs idp={idp} />
      <clipPath id={`${idp}-card`}><rect width="512" height="410" rx="40" /></clipPath>
      <clipPath id={`${idp}-head`}><rect width="512" height="172" /></clipPath>
      <g clipPath={`url(#${idp}-card)`}>
        <rect width="512" height="410" fill="#F6F4F0" />
        <rect width="512" height="172" fill={`url(#${idp}-hero)`} />
        <g clipPath={`url(#${idp}-head)`} className="fade-in" style={{ '--i': 1 }}>
          <path d={ARCH_D} fill="none" stroke={`url(#${idp}-arch)`} strokeWidth="85" />
        </g>
        <g className="slide-up" style={{ '--i': 2 }}>
          <text className="serif" fontSize="27" fill={K.beige} letterSpacing="-0.4">
            {LINES.imagination.rows.map((r, i) => <tspan key={r} x="234" y={70 + i * 32}>{r}</tspan>)}
          </text>
        </g>
        <MarkTileG x={47} y={130} size={104} radius={24} tile={K.beige} fill={K.tribal} />
        <rect x="302" y="193" width="161" height="46" rx="8" fill={K.black} />
        <text className="sans" x="382.5" y="222" fontSize="19" textAnchor="middle" fill={K.white}>{PROFILE.action}</text>
        <g className="slide-up" style={{ '--i': 4 }}>
          <text className="sans" x="47" y="278" fontSize="25" fill={K.ink} letterSpacing="-0.4">{PROFILE.name}</text>
          <text className="sans" x="47" y="305" fontSize="17" fill="#5C5650">{PROFILE.handle}</text>
          <text className="sans" fontSize="11.5" fill={K.ink} letterSpacing="-0.2">
            {bio.map((r, i) => <tspan key={i} x="47" y={338 + i * 19}>{r}</tspan>)}
          </text>
        </g>
      </g>
    </Art>
  );
}

// Nine square tiles of 360 with 8 between them, on Dark Chocolate. Each tile is drawn in its own 0..360 space.
const T = 360, GAP = 8;
const tiles = [
  (idp) => ( // the mark on Tribal Brown
    <g><rect width={T} height={T} fill={K.tribal} /><MarkG x={110} y={96} size={140} fill={K.beige} /></g>
  ),
  (idp) => ( // the quarter arch on beige
    <g>
      <rect width={T} height={T} fill={K.beige} />
      <QuarterArchG cx={T} cy={T} r={90} R={250} quadrant="tl" fill={K.sand} />
    </g>
  ),
  (idp) => ( // the word-mark cropped on sand
    <g><rect width={T} height={T} fill={K.sand} />
      <WordmarkCropG idp={`${idp}-w`} w={T} h={T}><WordmarkG x={-300} y={96} width={1100} fill={K.choc} opacity="0.85" /></WordmarkCropG>
    </g>
  ),
  (idp) => ( // the timber court
    <g><SkyPatchG idp={`${idp}-s`} w={T} h={T} /></g>
  ),
  (idp) => ( // a line on beige
    <g><rect width={T} height={T} fill={K.beige} /><Serif rows={LINES.builtAround.rows} x={34} y={84} size={44} fill={K.ink} /></g>
  ),
  (idp) => ( // black with the url
    <g><rect width={T} height={T} fill={K.black} />
      <MarkG x={34} y={34} size={54} fill={K.sand} />
      <text className="sans" x="34" y="320" fontSize="22" fill={K.beige}>{URL_LINE}</text>
    </g>
  ),
  (idp) => ( // the curved wall
    <g><CurvedWallG idp={`${idp}-c`} w={T} h={T} /></g>
  ),
  (idp) => ( // the construction outline
    <g><rect width={T} height={T} fill={K.beige} />
      <GuideGridG w={T} h={T} step={30} stroke="#CDBFAE" opacity="0.7" />
      <WordmarkOutlineG x={20} y={120} width={320} stroke={K.tribal} strokeWidth={1.4} />
    </g>
  ),
  (idp) => ( // the line on sand
    <g><rect width={T} height={T} fill={K.sand20} />
      <ArchWindowG idp={`${idp}-a`} cx={0} cy={T} r={60} R={200} quadrant="tr">
        <BrickCurveG idp={`${idp}-b`} x={0} y={160} w={200} h={200} courses={20} />
      </ArchWindowG>
      <Serif rows={LINES.elevate.rows} x={34} y={64} size={32} fill={K.ink} />
    </g>
  ),
];

export function ProfileGrid() {
  const size = T * 3 + GAP * 2;
  return (
    <Art viewBox={`0 0 ${size} ${size}`} title="Profile grid: nine square tiles" exportName="campaign-profile-grid">
      <rect width={size} height={size} fill={K.choc} />
      {tiles.map((tile, i) => {
        const idp = `campaign-pg${i}`;
        const x = (i % 3) * (T + GAP), y = Math.floor(i / 3) * (T + GAP);
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <clipPath id={`${idp}-clip`}><rect width={T} height={T} /></clipPath>
            <g clipPath={`url(#${idp}-clip)`}>
              <g className="fade-in" style={{ '--i': i }}>{tile(idp)}</g>
            </g>
          </g>
        );
      })}
    </Art>
  );
}
