// The three posters, each 1080 x 1350. A and B rebuild the two posters of the double frame (m11), C rebuilds the
// framed poster on the fins (m14). The photographs are never reproduced: flat architecture fields in their tones.
import Art from '@/components/art/Art';
import { WordmarkG, MarkG } from '@/components/art/Mark';
import { BrandDefs, CurvedWallG, BrickCurveG, SkyPatchG, PHOTO } from '@/components/art/KeyArt';
import { LINES, POSTER_BODY } from '@/lib/brand';
import { K, Rise, Serif, Contacts, FadeDefs, Justified, splitAt } from './shared';

export const POSTER_VB = '0 0 1080 1350';

// Poster A (m11 left): dark, a curved orange wall against blue sky in the upper part, the line top left in Beige,
// the body in a small column at the right, three contact blocks and the sand mark at the bottom left.
// Positions re-measured from m11 at full size (poster A: line 6 % / 7 % from the top-left; justified body column
// 47.5 to 94 % of the width from 39 % of the height; contacts at 64 % in three blocks from 76 %; mark at 90 %).
const BODY_A = splitAt(POSTER_BODY, ['how environments', 'approach to design', 'crafted to offer', 'Rather than', 'principles—creating', 'and connected']);
const BODY_B = splitAt(POSTER_BODY, ['focusing on', 'Through a careful', 'materiality,', 'continuity and', 'following trends', 'principles—creating', 'adaptable and', 'them.']);

export function PosterAG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <FadeDefs id={`${idp}-fade`} a={0.7} />
      <FadeDefs id={`${idp}-floor`} from={PHOTO.shade} a={0} to={1} />
      <rect width="1080" height="1350" fill={PHOTO.shade} />
      <CurvedWallG idp={`${idp}-w`} w={1080} h={930} />
      <rect y="640" width="1080" height="292" fill={`url(#${idp}-floor)`} />
      <rect width="1080" height="360" fill={`url(#${idp}-fade)`} />
      <rect width="1080" height="1350" fill="#000000" opacity="0.06" filter={`url(#${idp}-grain)`} />
      <Rise i={1}><Serif rows={LINES.imagination.rows} x={65} y={104} size={84} lh={0.95} fill={K.beige} /></Rise>
      <Rise i={3} kind="fade-in"><Justified rows={BODY_A} x={513} y={529} size={17} lh={24} width={505} fill={K.beige} /></Rise>
      <Contacts x={691} y={1031} size={16} lh={22} pitch={108} fill={K.beige} />
      <Rise i={4} kind="fade-in"><MarkG x={65} y={1200} size={96} fill={K.sand} /></Rise>
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
      <Rise i={1}><Serif rows={LINES.builtAround.rows} x={60} y={104} size={88} lh={0.9} fill={K.ink} /></Rise>
      <Rise i={3} kind="fade-in"><Justified rows={BODY_B} x={60} y={589} size={20} lh={25} width={502} fill={K.muted} /></Rise>
      <Contacts x={60} y={1035} size={16} lh={22} pitch={108} fill={K.muted} />
      <clipPath id={`${idp}-strip`}>
        <rect x="621" y="59" width="459" height="1246" />
      </clipPath>
      <g className="grow-x" style={{ '--i': 2 }} clipPath={`url(#${idp}-strip)`}>
        <BrickCurveG idp={`${idp}-b`} x={621} y={59} w={459} h={1246} courses={46} />
        <path d="M621 900Q800 870 940 1010Q870 1120 621 1210Z" fill={PHOTO.shade} opacity="0.55" />
        <path d="M1080 59H1010V1305H1080Z" fill={PHOTO.shade} opacity="0.18" />
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
      <SkyPatchG idp={`${idp}-s`} w={1080} h={675} />
      <rect width="1080" height="675" fill="#000000" opacity="0.04" filter={`url(#${idp}-grain)`} />
      <rect y="675" width="1080" height="675" fill={K.beige} />
      <rect y="675" width="1080" height="675" fill={K.sand} opacity="0.06" filter={`url(#${idp}-grain)`} />
      <Rise i={1}><Serif rows={LINES.elevate.rows} x={77} y={768} size={72} lh={0.92} fill={K.ink} /></Rise>
      <Rise i={3} kind="fade-in">
        <text className="sans" fontSize="21" fill={K.muted} letterSpacing="-0.1">
          {LINES.refined.rows.map((r, i) => <tspan key={r} x="77" y={971 + i * 26}>{r}</tspan>)}
        </text>
      </Rise>
      <Rise i={4} kind="fade-in"><WordmarkG x={77} y={1239} width={341} fill={K.tribal} /></Rise>
      <Serif rows={LINES.imagination.rows} x={1023} y={1218} size={32} lh={0.92} fill={K.ink} anchor="end" />
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
