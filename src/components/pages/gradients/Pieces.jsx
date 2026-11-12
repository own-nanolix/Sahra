// Six key-art pieces built from the brand's own geometry. Every fill is an abstract flat field or gradient in the
// photo tones (never a photograph), and every line of text is one the case study prints, verbatim.
import Art from '@/components/art/Art';
import {
  ArchWindowG, BrandDefs, ConstructionG, CornerCutG, CurvedWallG, GuideGridG, PHOTO, QuarterArchG, SkyPatchG, SteppedShadowG, DRAWING,
} from '@/components/art/KeyArt';
import { WordmarkG, WordmarkDebossG, WordmarkCropG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { HEX, LINES, URL_LINE } from '@/lib/brand';
import s from './gradients.module.css';

const SLICE = 'xMidYMid slice';

// 1. The quarter arch as a window onto timber, beside the card line of m01 / m10.
function ArchWindowArt() {
  const P = 'gradients-ka-arch';
  return (
    <Art viewBox="0 0 1000 600" title="Quarter arch window" exportName="gradients-ka-arch-window" preserveAspectRatio={SLICE}>
      <BrandDefs idp={P} grain={0.06} />
      <rect width="1000" height="600" fill={HEX.beige} filter={`url(#${P}-grain)`} />
      <ArchWindowG idp={P} cx={700} cy={680} r={170} R={430} quadrant="tl" />
      <QuarterArchG cx={700} cy={680} r={142} R={146} quadrant="tl" fill={HEX.tribal} />
      <text className="serif" fontSize="54" fill={HEX.chocolate} letterSpacing="-0.8">
        {LINES.elevate.rows.map((l, i) => <tspan key={l} x="60" y={104 + i * 62}>{l}</tspan>)}
      </text>
      <text className="sans" x="60" y="548" fontSize="22" fill={HEX.sandInk}>{URL_LINE}</text>
    </Art>
  );
}

// 2. The hoarding's large rounded corner (m16): a patch of sky court cut by one big radius, beige at the right.
function CornerArt() {
  const P = 'gradients-ka-corner';
  return (
    <Art viewBox="0 0 920 500" title="Large rounded corner cut" exportName="gradients-ka-corner-cut" preserveAspectRatio={SLICE}>
      <defs>
        <linearGradient id={`${P}-scrim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={PHOTO.shade} stopOpacity="0.6" />
          <stop offset="0.4" stopColor={PHOTO.shade} stopOpacity="0" />
          <stop offset="0.62" stopColor={PHOTO.shade} stopOpacity="0" />
          <stop offset="1" stopColor={PHOTO.shade} stopOpacity="0.82" />
        </linearGradient>
      </defs>
      <rect width="920" height="500" fill={HEX.beige} />
      <CornerCutG idp={P} w={620} h={500} rad={240} corner="br">
        <SkyPatchG idp={`${P}-sky`} w={620} h={500} />
        <rect width="620" height="500" fill={`url(#${P}-scrim)`} />
      </CornerCutG>
      <WordmarkG x={36} y={36} width={140} fill={HEX.beige} />
      <text className="serif" fontSize="34" fill={HEX.beige} letterSpacing="-0.4">
        {LINES.imagination.rows.map((l, i) => <tspan key={l} x="36" y={410 + i * 40}>{l}</tspan>)}
      </text>
      <text className="serif" fontSize="25" fill={HEX.chocolate} letterSpacing="-0.3">
        {LINES.refinedLiving.rows.map((l, i) => <tspan key={l} x="656" y={78 + i * 32}>{l}</tspan>)}
      </text>
      <rect x="656" y="400" width="180" height="50" rx="8" fill={HEX.tribal} />
      <text className="sans" x="746" y="431" fontSize="18" textAnchor="middle" fill={HEX.beige}>{URL_LINE}</text>
    </Art>
  );
}

// 3. The whole word-mark, blind-debossed very large and cropped by the edge, as on the sand folder (m01).
function DebossArt() {
  const P = 'gradients-ka-deboss';
  return (
    <Art viewBox="0 0 1000 256" title="Word-mark blind deboss, cropped" exportName="gradients-ka-deboss-crop" preserveAspectRatio={SLICE}>
      <BrandDefs idp={P} grain={0.08} />
      <rect width="1000" height="256" fill={HEX.sand} filter={`url(#${P}-grain)`} />
      <WordmarkCropG idp={`${P}-c`} w={1000} h={256}>
        <WordmarkDebossG idp={`${P}-d`} x={-720} y={-86} width={2400} depth={7} tone="#BA946F" />
      </WordmarkCropG>
    </Art>
  );
}

// 4. The construction grid: guides, outline, anchors, x / y unit bars and the cut lines labelled "42°".
function GridArt() {
  return (
    <Art viewBox="0 0 800 552" title="Construction grid with units and cut lines" exportName="gradients-ka-construction-grid" preserveAspectRatio={SLICE}>
      <rect width="800" height="552" fill={DRAWING.paper} />
      <GuideGridG w={800} h={552} step={46} />
      <ConstructionG x={-70} y={96} width={2000} draw />
    </Art>
  );
}

// 5. A curved wall against the sky, and a patch of sky seen from a court: flat fields in the photo tones.
function WallSkyArt() {
  return (
    <Art viewBox="0 0 800 552" title="Curved wall and a patch of sky" exportName="gradients-ka-wall-sky" preserveAspectRatio={SLICE}>
      <rect width="800" height="552" fill={HEX.beige} />
      <CurvedWallG idp="gradients-ka-wall" w={510} h={552} />
      <SkyPatchG idp="gradients-ka-court" x={534} w={266} h={552} />
    </Art>
  );
}

// 6. A stepped shadow lengthening across a sunlit wall.
function ShadowArt() {
  const P = 'gradients-ka-sun';
  return (
    <Art viewBox="0 0 800 552" title="Stepped shadow on a sunlit wall" exportName="gradients-ka-stepped-shadow" preserveAspectRatio={SLICE}>
      <BrandDefs idp={P} grain={0.08} />
      <rect width="800" height="552" fill={`url(#${P}-wall)`} filter={`url(#${P}-grain)`} />
      <QuarterArchG cx={330} cy={330} r={90} R={210} quadrant="tl" fill={PHOTO.wallDeep} opacity="0.35" />
      <g className="sun-shadow">
        <SteppedShadowG w={800} h={552} steps={9} fill={HEX.chocolate} shade="none" />
      </g>
    </Art>
  );
}

const PIECES = [
  { C: ArchWindowArt, cls: 'span-7 rows-3', ar: '1000 / 600' },
  { C: CornerArt, cls: 'span-5 rows-2', ar: '920 / 500' },
  { C: DebossArt, cls: 'span-5 rows-1', ar: '1000 / 256' },
  { C: GridArt, cls: 'span-4 rows-2', ar: '800 / 552' },
  { C: WallSkyArt, cls: 'span-4 rows-2', ar: '800 / 552' },
  { C: ShadowArt, cls: 'span-4 rows-2', ar: '800 / 552' },
];

export default function Pieces() {
  return (
    <>
      {PIECES.map(({ C, cls, ar }, i) => (
        <Reveal key={i} delay={(i % 3) * 80} className={`tile tile-flush tile-print ${cls} ${s.fill}`} style={{ '--ar': ar }}>
          <div className={s.fillArt}><C /></div>
        </Reveal>
      ))}
    </>
  );
}
