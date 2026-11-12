// Four social posts, each 1080 x 1080, no two sharing a layout: the statement panel (m14 right), the white card
// with the quarter-arch window (m10), and the two halves of the hoarding (m16).
import Art from '@/components/art/Art';
import { WordmarkG, MarkG } from '@/components/art/Mark';
import { BrandDefs, SkyPatchG, SteppedShadowG, CornerCutG, TimberG, cornerCut, PHOTO } from '@/components/art/KeyArt';
import { LINES, HOARDING, CONTACT, URL_LINE } from '@/lib/brand';
import { K, Rise, Serif, FadeDefs } from './shared';

const VB = '0 0 1080 1080';

// Statement (m14 right): black ground, four serif lines with "design" and "and" at opposite ends of the third.
export function PostStatement() {
  const [a, b, mid, d] = LINES.designing.rows;
  // re-measured from m14 (right): line at 7.9 % from the left, the second line 74 % of the width, "and" ending
  // under the end of the widest line; mark and address at the foot
  const size = 102, lh = 0.97, y0 = 175;
  return (
    <Art viewBox={VB} title="Post: Designing spaces that connect purpose, design and modern living" exportName="campaign-post-statement">
      <rect width="1080" height="1080" fill={K.black} />
      <Rise i={1}>
        <text className="serif" fontSize={size} fill={K.beige} letterSpacing={-0.02 * size}>
          <tspan x="85" y={y0}>{a}</tspan>
          <tspan x="85" y={y0 + size * lh}>{b}</tspan>
          <tspan x="85" y={y0 + size * lh * 2}>{mid[0]}</tspan>
          <tspan x="880" y={y0 + size * lh * 2} textAnchor="end">{mid[1]}</tspan>
          <tspan x="85" y={y0 + size * lh * 3}>{d}</tspan>
        </text>
      </Rise>
      <Rise i={5} kind="fade-in"><MarkG x={85} y={903} size={75} fill={K.sand} /></Rise>
      <Rise i={6} kind="fade-in">
        <text className="sans" x="985" y="977" fontSize="31" textAnchor="end" fill={K.beige} letterSpacing="-0.3">{CONTACT.web}</text>
      </Rise>
    </Art>
  );
}

// The white card (m10): line and sub line at the top left, a quarter-arch window onto timber at the lower right.
export function PostCard() {
  const idp = 'campaign-pk';
  return (
    <Art viewBox={VB} title="Post: Spaces that elevate everyday living with intention, white card" exportName="campaign-post-card">
      <BrandDefs idp={idp} />
      <rect width="1080" height="1080" fill={K.white} />
      <rect width="1080" height="1080" fill={K.sand} opacity="0.05" filter={`url(#${idp}-grain)`} />
      <Rise i={1}><Serif rows={LINES.elevate.rows} x={66} y={126} size={82} lh={1} fill={K.ink} /></Rise>
      <Rise i={3} kind="fade-in">
        <text className="sans" fontSize="25" fill={K.sandInk} letterSpacing="-0.2">
          {LINES.refined.rows.map((r, i) => <tspan key={r} x="66" y={372 + i * 39}>{r}</tspan>)}
        </text>
      </Rise>
      <g className="fade-in" style={{ '--i': 2 }}>
        {/* the card's arch (m10): a band of 22 % of the width, concentric corners R 0.38 w / r 0.16 w, running
            straight out to the right edge and down to the foot */}
        <clipPath id={`${idp}-archclip`}>
          <path clipRule="evenodd" d={`${cornerCut(537, 598, 543, 482, 408, 'tl')}${cornerCut(772, 833, 308, 247, 173, 'tl')}`} />
        </clipPath>
        <g clipPath={`url(#${idp}-archclip)`}>
          <TimberG idp={`${idp}-t`} x={537} y={598} w={543} h={482} lines={90} />
          <path d="M1080 598L537 1080H1080Z" fill={PHOTO.shade} opacity="0.4" />
        </g>
      </g>
      <text className="sans" x="66" y="1006" fontSize="30" fill={K.tribal} letterSpacing="-0.3">{URL_LINE}</text>
    </Art>
  );
}

// Hoarding, left two thirds (m16): the timber court, the word-mark top left, the line bottom left, and the large
// rounded corner at the lower right that the hoarding photograph is cut by.
export function HoardLeftG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <FadeDefs id={`${idp}-fade`} a={0.55} />
      <rect width="1080" height="1080" fill={K.beige} />
      <rect width="1080" height="1080" fill={K.sand} opacity="0.06" filter={`url(#${idp}-grain)`} />
      {/* m16: the photograph's corner radius is about a tenth of the hoarding's height */}
      <CornerCutG idp={`${idp}-c`} w={1080} h={1080} rad={110} corner="br">
        <SkyPatchG idp={`${idp}-s`} w={1080} h={1080} />
        <SteppedShadowG x={380} y={760} w={700} h={320} steps={9} fill={PHOTO.timberLight} />
        <rect width="1080" height="320" fill={`url(#${idp}-fade)`} />
        <rect width="1080" height="1080" fill="#000000" opacity="0.05" filter={`url(#${idp}-grain)`} />
      </CornerCutG>
      <Rise i={1} kind="fade-in"><WordmarkG x={100} y={92} width={560} fill={K.beige} /></Rise>
      <Rise i={2}><Serif rows={LINES.imagination.rows} x={100} y={900} size={90} lh={0.95} fill={K.beige} /></Rise>
    </g>
  );
}
export function PostHoardLeft() {
  return (
    <Art viewBox={VB} title="Post: the hoarding photograph with the word-mark and the brand line" exportName="campaign-post-hoarding-left">
      <HoardLeftG idp="campaign-ph" />
    </Art>
  );
}

// Hoarding, right third (m16): beige, the line in the serif, the sub line, the tribal-brown button.
export function HoardRightG({ idp }) {
  return (
    <g>
      <BrandDefs idp={idp} />
      <rect width="1080" height="1080" fill={K.beige} />
      <rect width="1080" height="1080" fill={K.sand} opacity="0.06" filter={`url(#${idp}-grain)`} />
      {/* m16's beige third scaled to the post's width: line, sub line and button keep their printed places */}
      <Rise i={1}><Serif rows={HOARDING.line.rows} x={88} y={150} size={90} lh={0.93} fill={K.ink} /></Rise>
      <Rise i={3} kind="fade-in">
        <text className="sans" fontSize="38" fill={K.ink} letterSpacing="-0.4">
          {HOARDING.sub.rows.map((r, i) => <tspan key={r} x="88" y={395 + i * 49}>{r}</tspan>)}
        </text>
      </Rise>
      <Rise i={4}>
        <rect x="88" y="699" width="236" height="66" rx="16" fill={K.tribal} />
        <text className="sans" x="206" y="744" fontSize="34" textAnchor="middle" fill={K.beige}>{HOARDING.button}</text>
      </Rise>
    </g>
  );
}
export function PostHoardRight() {
  return (
    <Art viewBox={VB} title="Post: Refined living spaces designed for comfort and simplicity" exportName="campaign-post-hoarding-right">
      <HoardRightG idp="campaign-pr" />
    </Art>
  );
}

// The hoarding as one wide piece (m16): the photograph half and the line half joined, 2160 x 1080. The photograph's
// large rounded corner meets the beige half, as on the hoarding.
export function HoardingWide() {
  return (
    <Art viewBox="0 0 2160 1080" title="Hoarding: the photograph half and the line half joined" exportName="campaign-hoarding-wide">
      <g>
        <HoardLeftG idp="campaign-hw-l" />
      </g>
      <g transform="translate(1080 0)">
        <HoardRightG idp="campaign-hw-r" />
      </g>
    </Art>
  );
}
