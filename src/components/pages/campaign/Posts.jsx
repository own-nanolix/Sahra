// Four social posts, each 1080 x 1080, no two sharing a layout: the statement panel (m14 right), the white card
// with the quarter-arch window (m10), and the two halves of the hoarding (m16).
import Art from '@/components/art/Art';
import { WordmarkG, MarkG } from '@/components/art/Mark';
import { BrandDefs, ArchWindowG, QuarterArchG, SkyPatchG, SteppedShadowG, CornerCutG, TimberG, PHOTO } from '@/components/art/KeyArt';
import { LINES, HOARDING, CONTACT } from '@/lib/brand';
import { K, Rise, Serif, FadeDefs } from './shared';

const VB = '0 0 1080 1080';

// Statement (m14 right): black ground, four serif lines with "design" and "and" at opposite ends of the third.
export function PostStatement() {
  const [a, b, mid, d] = LINES.designing.rows;
  const size = 88, lh = 1.1, y0 = 190;
  return (
    <Art viewBox={VB} title="Post: Designing spaces that connect purpose, design and modern living" exportName="campaign-post-statement">
      <rect width="1080" height="1080" fill={K.black} />
      <Rise i={1}>
        <text className="serif" fontSize={size} fill={K.beige} letterSpacing={-0.02 * size}>
          <tspan x="80" y={y0}>{a}</tspan>
          <tspan x="80" y={y0 + size * lh}>{b}</tspan>
          <tspan x="80" y={y0 + size * lh * 2}>{mid[0]}</tspan>
          <tspan x="1000" y={y0 + size * lh * 2} textAnchor="end">{mid[1]}</tspan>
          <tspan x="80" y={y0 + size * lh * 3}>{d}</tspan>
        </text>
      </Rise>
      <path className="grow-x" style={{ '--i': 4 }} d="M80 810H1000" stroke={K.sand} strokeOpacity="0.35" strokeWidth="1.5" />
      <Rise i={5} kind="fade-in"><MarkG x={80} y={870} size={96} fill={K.sand} /></Rise>
      <Rise i={6} kind="fade-in">
        <text className="sans" x="1000" y="975" fontSize="30" textAnchor="end" fill={K.beige} letterSpacing="-0.3">{CONTACT.web}</text>
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
      <Rise i={1}><Serif rows={LINES.elevate.rows} x={90} y={210} size={82} fill={K.ink} /></Rise>
      <Rise i={3} kind="fade-in">
        <text className="sans" fontSize="26" fill={K.muted} letterSpacing="-0.2">
          {LINES.refined.rows.map((r, i) => <tspan key={r} x="90" y={478 + i * 36}>{r}</tspan>)}
        </text>
      </Rise>
      <g className="fade-in" style={{ '--i': 2 }}>
        <ArchWindowG idp={`${idp}-a`} cx={1080} cy={1080} r={250} R={610} quadrant="tl">
          <TimberG idp={`${idp}-t`} x={440} y={440} w={640} h={640} lines={90} />
          <path d="M1080 440L440 1080H1080Z" fill={PHOTO.shade} opacity="0.35" />
        </ArchWindowG>
      </g>
      <text className="sans" x="90" y="985" fontSize="32" fill={K.tribal} letterSpacing="-0.3">{'→ sahra.sa'}</text>
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
      <CornerCutG idp={`${idp}-c`} w={1080} h={1080} rad={300} corner="br">
        <SkyPatchG idp={`${idp}-s`} w={1080} h={1080} />
        <SteppedShadowG x={380} y={760} w={700} h={320} steps={9} fill={PHOTO.timberLight} />
        <rect width="1080" height="320" fill={`url(#${idp}-fade)`} />
        <rect width="1080" height="1080" fill="#000000" opacity="0.05" filter={`url(#${idp}-grain)`} />
      </CornerCutG>
      <Rise i={1} kind="fade-in"><WordmarkG x={70} y={86} width={440} fill={K.beige} /></Rise>
      <Rise i={2}><Serif rows={LINES.imagination.rows} x={70} y={900} size={62} lh={1.1} fill={K.beige} /></Rise>
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
      <g className="fade-in" style={{ '--i': 1 }}>
        <QuarterArchG cx={1080} cy={1080} r={210} R={400} quadrant="tl" fill={K.sand20} />
      </g>
      <Rise i={1}><Serif rows={HOARDING.line.rows} x={90} y={200} size={78} fill={K.ink} /></Rise>
      <Rise i={3} kind="fade-in">
        <text className="sans" fontSize="32" fill={K.muted} letterSpacing="-0.3">
          {HOARDING.sub.rows.map((r, i) => <tspan key={r} x="90" y={560 + i * 46}>{r}</tspan>)}
        </text>
      </Rise>
      <Rise i={4}>
        <rect x="90" y="860" width="270" height="78" rx="12" fill={K.tribal} />
        <text className="sans" x="225" y="910" fontSize="32" textAnchor="middle" fill={K.beige}>{HOARDING.button}</text>
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
      <path d="M1080 0V1080" stroke="#35241C" strokeOpacity="0.2" strokeWidth="2" />
    </Art>
  );
}
