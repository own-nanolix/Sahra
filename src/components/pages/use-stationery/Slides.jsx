// The five slides of the case study rebuilt at 1600 x 900 (m02, m04, m06, m05, m09), and the plate with the report
// cover leaning on a wall beside a monitor that shows them.
import { INTRO, LINES, SHEET, TYPE, PALETTE, TINTS, TINT_STEPS } from '@/lib/brand';
import Art from '@/components/art/Art';
import { BackdropG, ContactShadowG, DeskEdgeG, PlaceG, SCENE } from '@/components/art/Mockup';
import { MonitorG, wrap } from '@/components/art/Devices';
import { WordmarkG } from '@/components/art/Mark';
import { ID, C, T, Plate, Cast, flow, boxPts } from './kit';
import { ReportG, ReportSpineG } from './Report';

const GREY = '#B9B9B9';

// m02: the headline behind its thin rule, six justified paragraphs, the project sheet. No portrait badges.
function IntroSlide() {
  const { list: paras } = flow(INTRO.paragraphs, (t) => wrap(t, 94), 108, 18.2, 17);
  return (
    <g>
      <rect width="1600" height="900" fill="#FFFFFF" />
      <path d="M42 52V126" stroke={GREY} strokeWidth="2" />
      <T x={82} y={80} size={34} serif fill="#111111" text={LINES.imagination.rows} lh={1.05} ls="-0.4" />
      {paras.map((p) => p.rows.map((row, i) => (
        <text key={`${p.at}-${i}`} x="475" y={r1(p.at + i * 18.2)} fontSize="14" className="sans" fill="#111111" textLength={i < p.rows.length - 1 ? 650 : undefined} lengthAdjust="spacing">{row}</text>
      )))}
      {SHEET.map(([k, v], i) => (
        <g key={k}>
          <T x={475} y={736 + i * 18.4} size={13.5} fill="#111111" text={k} />
          <T x={691} y={736 + i * 18.4} size={13.5} fill="#111111" text={v} />
        </g>
      ))}
    </g>
  );
}
const r1 = (n) => Math.round(n * 10) / 10;

// m04: the word-mark in Sand on Dark Chocolate Brown, centred, about half the width.
function WordmarkSlide() {
  return (
    <g>
      <rect width="1600" height="900" fill={C.chocolate} />
      <WordmarkG x={400} y={379.5} width={800} fill={C.sand} />
    </g>
  );
}

// m05: the palette. Left Black over Dark Chocolate Brown; right Tribal Brown, Sand, Beige, White with tint strips.
const BLOCKS = [[0, 0, 800, 449], [0, 449, 800, 451], [800, 0, 682, 225], [800, 225, 682, 224], [800, 449, 682, 225], [800, 674, 800, 226]];
function PaletteSlide() {
  return (
    <g>
      {PALETTE.map((c, i) => {
        const [x, y, w, h] = BLOCKS[i];
        const light = c.token === 'beige' || c.token === 'white';
        const ink = light ? '#000000' : '#F5F0E3';
        const rows = [['HEX', c.hex], ['RGB', c.rgb], ['HSB', c.hsb], ['CMYK', c.cmyk]];
        return (
          <g key={c.token}>
            <rect x={x} y={y} width={w} height={h} fill={c.hex} />
            <T x={x + 50} y={y + 50} size={27} fill={ink} text={c.name} weight={300} />
            <T x={x + 50} y={y + 106} size={10.5} fill={ink} text={rows.map((r) => r[0])} lh={1.3} />
            <T x={x + 106} y={y + 106} size={10.5} fill={ink} text={rows.map((r) => r[1])} lh={1.3} />
            {c.tints && TINT_STEPS.map((t, j) => (
              <g key={t}>
                <rect x="1482" y={y + (h / 4) * j} width="118" height={h / 4} fill={TINTS[c.token][j]} />
                <T x={1524} y={y + (h / 4) * j + h / 8 + 4} size={10} fill="#5C4A3E" text={t} />
              </g>
            ))}
          </g>
        );
      })}
    </g>
  );
}

// m06: the type slide.
function TypeSlide() {
  const [a, b] = TYPE.text;
  return (
    <g>
      <rect width="1600" height="900" fill="#FFFFFF" />
      <T x={56} y={54} size={14.5} fill="#111111" text={TYPE.family} />
      <T x={1150} y={55} size={21} serif fill="#111111" text={TYPE.charset.slice(0, 3)} lh={1.55} />
      <T x={1150} y={154} size={19} fill="#111111" text={TYPE.charset[3]} />
      <T x={56} y={415} size={12.6} serif fill="#111111" text={wrap(a, 56)} lh={1.3} />
      <T x={627} y={415} size={12.6} serif fill="#111111" text={wrap(b, 52)} lh={1.3} />
      {TYPE.weights.map((w, i) => <T key={w} x={1324} y={420 + i * 17.4} size={15} serif fill={i ? GREY : '#111111'} text={w} />)}
      <text x="40" y="862" className="serif" fontSize="352" fontWeight="500" fill="#000000" textLength="1510" lengthAdjust="spacingAndGlyphs">{TYPE.specimen}</text>
    </g>
  );
}

// m09: the four colour versions in a 2 x 2 of equal fields.
const WAYS = [[C.sand, C.beige], [C.tribal, C.sand], [C.beige, C.tribal], [C.black, C.beige]];
function VersionsSlide() {
  return (
    <g>
      {WAYS.map(([bg, fg], i) => {
        const x = (i % 2) * 800, y = Math.floor(i / 2) * 450;
        return (
          <g key={i}>
            <rect x={x} y={y} width="800" height="450" fill={bg} />
            <WordmarkG x={x + 207} y={y + 191} width={386} fill={fg} />
          </g>
        );
      })}
    </g>
  );
}

export const SLIDES = [
  { name: 'slide-1-intro', title: 'Slide 1, the intro', C: IntroSlide },
  { name: 'slide-2-wordmark', title: 'Slide 2, the word-mark on Dark Chocolate Brown', C: WordmarkSlide },
  { name: 'slide-3-palette', title: 'Slide 3, the palette', C: PaletteSlide },
  { name: 'slide-4-type', title: 'Slide 4, the type', C: TypeSlide },
  { name: 'slide-5-versions', title: 'Slide 5, the four colour versions', C: VersionsSlide },
];

export function SlideArt({ n }) {
  const { name, title, C: Slide } = SLIDES[n];
  return <Art viewBox="0 0 1600 900" title={title} exportName={`${ID}-${name}`}><Slide /></Art>;
}

export function ReportSlidesPlate() {
  const m = `${ID}-rs-m`;
  const k = 0.6, rx = 120, base = 800, ry = base - 936 * k;
  const mon = { x: 580, y: 70, w: 860 };
  return (
    <Plate name="report-and-slides" title="The report cover leaning on a wall beside a monitor showing the five slides" w={1600} h={1000} m={m}>
      <BackdropG idp={`${ID}-rs-bd`} w={1600} h={1000} horizon={0.64} wall={SCENE.beige} floor={SCENE.sand} />
      <Cast pts={boxPts(rx, ry, 704 * k, 936 * k)} len={60} opacity={0.2} />
      <ContactShadowG idp={`${ID}-rs-c1`} cx={rx + 352 * k} cy={base + 4} rx={300 * k} opacity={0.4} />
      <ContactShadowG idp={`${ID}-rs-c2`} cx={mon.x + mon.w / 2} cy={base - 22} rx={mon.w * 0.2} opacity={0.35} />
      <PlaceG i={1} x={rx} y={ry}>
        <g transform={`matrix(${k} 0 ${-0.025 * k} ${k} 0 0)`}>
          <path d="M-32.4 -9H671.6L704 0H0Z" fill="#A97A58" />
          <g transform="matrix(0.36 0.1 0 1 -32.4 -9)"><ReportSpineG m={m} /></g>
          <ReportG m={m} idp={`${ID}-rs-rep`} />
        </g>
      </PlaceG>
      <PlaceG i={2} x={0} y={0}>
        <MonitorG idp={`${ID}-rs-mon`} x={mon.x} y={mon.y} w={mon.w} screenFill="#1F1814">
          <g>
            <rect width="1600" height="1000" fill="#1F1814" />
            {SLIDES.map(({ name, C: Slide }, i) => (
              <g key={name} transform={`translate(50 ${60 + i * 140}) scale(0.11)`}>
                <Slide />
                {i === 0 && <rect width="1600" height="900" fill="none" stroke={C.sand} strokeWidth="30" />}
              </g>
            ))}
            <g transform="translate(270 60) scale(0.8)"><IntroSlide /></g>
            <rect x="270" y="830" width="520" height="12" rx="6" fill="#3A2C24" />
            <rect x="270" y="862" width="340" height="12" rx="6" fill="#2D221C" />
          </g>
        </MonitorG>
      </PlaceG>
      <DeskEdgeG y={928} w={1600} thickness={34} top={SCENE.sand} edge={SCENE.tribal} />
    </Plate>
  );
}
