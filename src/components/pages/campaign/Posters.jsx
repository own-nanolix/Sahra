// The three posters, each 1080 x 1350. A and B rebuild the two posters of the double frame (m11), C rebuilds the
// framed poster on the fins (m14). The photographs are never reproduced: flat architecture fields in their tones.
import Art from '@/components/art/Art';
import { WordmarkG, MarkG } from '@/components/art/Mark';
import { BrandDefs, CurvedWallG, BrickCurveG, SkyPatchG, PHOTO } from '@/components/art/KeyArt';
import { LINES, POSTER_BODY } from '@/lib/brand';
import { K, Rise, Serif, Para, Contacts, FadeDefs } from './shared';

export const POSTER_VB = '0 0 1080 1350';

// Poster A (m11 left): dark, a curved orange wall against blue sky in the upper part, the line top left in Beige,
// the body in a small column at the right, three contact blocks and the sand mark at the bottom left.
export function PosterAG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <FadeDefs id={`${idp}-fade`} a={0.7} />
      <rect width="1080" height="1350" fill={`url(#${idp}-dusk)`} />
      <CurvedWallG idp={`${idp}-w`} w={1080} h={930} />
      <rect width="1080" height="360" fill={`url(#${idp}-fade)`} />
      <rect width="1080" height="1350" fill="#000000" opacity="0.06" filter={`url(#${idp}-grain)`} />
      <Rise i={1}><Serif rows={LINES.imagination.rows} x={70} y={168} size={80} fill={K.beige} /></Rise>
      <Rise i={3} kind="fade-in"><Para text={POSTER_BODY} x={610} y={800} size={16} lh={1.46} max={50} fill={K.beige} /></Rise>
      <Contacts x={610} y={1086} size={15} gap={22} fill={K.beige} />
      <Rise i={4} kind="fade-in"><MarkG x={70} y={1168} size={78} fill={K.sand} /></Rise>
    </g>
  );
}

// Poster B (m11 right): beige, the line in the serif, the same body and contacts, a tall strip of curved brick.
export function PosterBG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <rect width="1080" height="1350" fill={K.beige} />
      <rect width="1080" height="1350" fill={K.sand} opacity="0.05" filter={`url(#${idp}-grain)`} />
      <Rise i={1}><Serif rows={LINES.builtAround.rows} x={70} y={170} size={84} fill={K.ink} /></Rise>
      <Rise i={3} kind="fade-in"><Para text={POSTER_BODY} x={70} y={770} size={16} lh={1.46} max={40} fill={K.muted} /></Rise>
      <Contacts x={70} y={1090} size={15} gap={22} fill={K.muted} />
      <g className="grow-x" style={{ '--i': 2 }}>
        <BrickCurveG idp={`${idp}-b`} x={610} y={0} w={470} h={1290} courses={46} />
        <path d="M610 880Q790 850 930 990Q860 1100 610 1190Z" fill={PHOTO.shade} opacity="0.55" />
        <path d="M1080 0H1010V1290H1080Z" fill={PHOTO.shade} opacity="0.18" />
      </g>
    </g>
  );
}

// Poster C (m14): the timber court and its patch of sky on top; below, a beige panel with the line, the sub line,
// the word-mark at the left and the brand line at the right.
export function PosterCG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <rect width="1080" height="1350" fill={K.beige} />
      <SkyPatchG idp={`${idp}-s`} w={1080} h={840} />
      <rect width="1080" height="840" fill="#000000" opacity="0.04" filter={`url(#${idp}-grain)`} />
      <rect y="840" width="1080" height="510" fill={K.beige} />
      <rect y="840" width="1080" height="510" fill={K.sand} opacity="0.06" filter={`url(#${idp}-grain)`} />
      <Rise i={1}><Serif rows={LINES.elevate.rows} x={70} y={942} size={64} fill={K.ink} /></Rise>
      <Rise i={3} kind="fade-in">
        <text className="sans" fontSize="21" fill={K.muted} letterSpacing="-0.1">
          {LINES.refined.rows.map((r, i) => <tspan key={r} x="70" y={1120 + i * 29}>{r}</tspan>)}
        </text>
      </Rise>
      <Rise i={4} kind="fade-in"><WordmarkG x={70} y={1232} width={330} fill={K.tribal} /></Rise>
      <Serif rows={LINES.imagination.rows} x={1010} y={1262} size={26} lh={1.2} fill={K.ink} anchor="end" />
    </g>
  );
}

export function PosterA() {
  return (
    <Art viewBox={POSTER_VB} title="Poster: We Build Spaces of Imagination, dark" exportName="campaign-poster-imagination">
      <PosterAG idp="campaign-pa" />
    </Art>
  );
}
export function PosterB() {
  return (
    <Art viewBox={POSTER_VB} title="Poster: Built around how people live today, beige" exportName="campaign-poster-built-around">
      <PosterBG idp="campaign-pb" />
    </Art>
  );
}
export function PosterC() {
  return (
    <Art viewBox={POSTER_VB} title="Poster: Spaces that elevate everyday living with intention" exportName="campaign-poster-elevate">
      <PosterCG idp="campaign-pc" />
    </Art>
  );
}
