// Exportable graphics of the overview page. Each one is its own <Art>: viewBox, <title>, exportName.
// Animation is CSS only (the shared classes), playing from a start state towards the finished artwork.
import Art from '@/components/art/Art';
import { WordmarkG, WordmarkOutlineG, MarkG } from '@/components/art/Mark';
import { BrandDefs, QuarterArchG, DRAWING } from '@/components/art/KeyArt';
import { HEX, TINTS, FIELDS, CONTACT, PROJECT_TITLE, DESIGNER, SHEET } from '@/lib/brand';
import { r2, hbarPath } from '@/lib/charts';

// Draw-on props: the path is measured as 1, so one rule fits every line.
const drawProps = (i) => ({ className: 'draw', pathLength: 1, style: { '--len': 1, '--i': i } });

// ---------- The cover: the word-mark in Sand on Dark Chocolate (m04), drawn on along its guides ----------
export function CoverArt() {
  const W = 1200;
  const H = 700;
  const width = 600;
  const k = width / 1420;
  const x = (W - width) / 2;
  const y = 300;
  // The word-mark's own guides (top, x-height, centre, bar, baseline), carried across the plate.
  const guides = [0, 56, 128.5, 169, 201].map((g) => r2(y + g * k));
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Sahra word-mark in Sand on Dark Chocolate Brown, drawn on along its guides" exportName="overview-cover" preserveAspectRatio="xMidYMid slice">
      <rect width={W} height={H} fill={HEX.chocolate} />
      <g stroke={HEX.sand} strokeWidth="1" fill="none" opacity="0.38">
        {guides.map((gy, i) => (
          <path key={gy} d={`M0 ${gy}H${W}`} {...drawProps(i)} />
        ))}
        <path d={`M${x} 0V${H}`} {...drawProps(5)} />
        <path d={`M${x + width} 0V${H}`} {...drawProps(6)} />
      </g>
      <WordmarkOutlineG idp="overview-cv" x={x} y={y} width={width} stroke={HEX.sand} strokeWidth={1.4} pieceClass="draw" style={{ '--len': 3200 }} />
      <WordmarkG idp="overview-cvf" x={x} y={y} width={width} fill={HEX.sand} className="fade-in" style={{ '--i': 24 }} />
      <g className="sans" fontSize="18" fill={HEX.beigeMuted}>
        <text x="56" y="76" className="sans fade-in" style={{ '--i': 26 }}>{PROJECT_TITLE}</text>
        <text x="56" y={H - 56} className="sans fade-in" style={{ '--i': 28 }}>{DESIGNER}</text>
        <text x={W - 56} y={H - 56} textAnchor="end" className="sans fade-in" fill={HEX.sand} style={{ '--i': 30 }}>{'→ sahra.sa'}</text>
      </g>
    </Art>
  );
}

// ---------- About: the profile card's header language, with the three fields of the case study ----------
export function AboutArt() {
  const W = 600;
  const H = 520;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Fields of the case study on a Dark Chocolate plate with a quarter arch" exportName="overview-about-arch" preserveAspectRatio="xMidYMid slice">
      <BrandDefs idp="overview-ab" />
      <rect width={W} height={H} fill="url(#overview-ab-hero)" />
      <g className="fade-in" style={{ '--i': 2 }}>
        <QuarterArchG cx={W} cy={H} r={250} R={420} quadrant="tl" fill="url(#overview-ab-arch)" />
      </g>
      <text x="44" y="70" className="sans" fontSize="15" fill={HEX.beigeMuted}>Fields</text>
      {FIELDS.map((f, i) => (
        <g key={f}>
          <path d={`M44 ${r2(104 + i * 64)}H300`} stroke={HEX.sand} strokeWidth="1" opacity="0.5" className="grow-x" style={{ '--i': i + 3 }} />
          <text x="44" y={r2(146 + i * 64)} className="serif slide-up" fontSize="38" fill={HEX.beige} style={{ '--i': i + 4 }}>{f}</text>
        </g>
      ))}
      <g className="sans fade-in" fontSize="15" fill={HEX.beige} style={{ '--i': 9 }}>
        <text x="44" y={H - 92}>{SHEET[2][1]}</text>
        <text x="44" y={H - 68}>{CONTACT.city}</text>
        <text x="44" y={H - 44}>{SHEET[4][1]}</text>
      </g>
      <g transform={`translate(${W - 150} ${H - 80})`} className="fade-in" style={{ '--i': 10 }}>
        <MarkG size={46} fill={HEX.sand} />
      </g>
    </Art>
  );
}

// ---------- Credit badges: the case study's round badges "FS" and "93" (the portraits are not reproduced) ----------
export function CreditBadges() {
  return (
    <Art viewBox="0 0 118 60" title="Round badges FS and 93, the two agencies" exportName="overview-credits">
      {[['FS', 'sans'], ['93', 'serif']].map(([t, face], i) => (
        <g key={t} className="settle" style={{ '--i': i * 2 }}>
          <circle cx={30 + i * 58} cy="30" r="28" fill={HEX.black} />
          <text x={30 + i * 58} y="38" textAnchor="middle" className={face} fontSize="22" fill={HEX.white}>{t}</text>
        </g>
      ))}
    </Art>
  );
}

// ---------- Principle: clarity, trust and elegance, as three nested quarter arches ----------
export function ClarityArt() {
  const cx = 20;
  const cy = 214;
  const rings = [
    { r: 18, R: 78, word: 'clarity', fill: HEX.tribal },
    { r: 88, R: 148, word: 'trust', fill: HEX.sand },
    { r: 158, R: 218, word: 'elegance', fill: TINTS.sand[1] },
  ];
  return (
    <Art viewBox="0 0 260 250" title="Clarity, trust and elegance as three nested quarter arches" exportName="overview-principle-clarity">
      <path d={`M0 ${cy}H260`} stroke={HEX.chocolate} strokeWidth="1" opacity="0.4" {...drawProps(0)} />
      {rings.map((ring, i) => (
        <g key={ring.word}>
          <g className="rise" style={{ '--i': i * 3 }}>
            <QuarterArchG cx={cx} cy={cy} r={ring.r} R={ring.R} quadrant="tr" fill={ring.fill} />
          </g>
          <text x={r2(cx + (ring.r + ring.R) / 2)} y={cy + 24} textAnchor="middle" className="sans fade-in" fontSize="13" fill={HEX.muted} style={{ '--i': i * 3 + 6 }}>{ring.word}</text>
        </g>
      ))}
    </Art>
  );
}

// ---------- Principle: emotional and intentional, the mark assembling from its two halves ----------
export function IntentionArt() {
  return (
    <Art viewBox="0 0 260 250" title="The mark assembling from its two halves, emotional and intentional" exportName="overview-principle-intention">
      <circle cx="130" cy="108" r="86" fill="none" stroke={HEX.tribal} strokeWidth="1" opacity="0.35" {...drawProps(0)} />
      <g transform="translate(70 40)">
        <MarkG size={120} fill={HEX.tribal} topClass="mark-top" bottomClass="mark-bottom" />
      </g>
      <g className="sans fade-in" fontSize="14" fill={HEX.muted} textAnchor="middle" style={{ '--i': 8 }}>
        <text x="130" y="222">emotional and intentional</text>
      </g>
    </Art>
  );
}

// ---------- Principle: transparency, care and long-term vision, three equal strokes ----------
export function TransparencyArt() {
  const rows = ['transparency', 'care', 'long-term vision'];
  return (
    <Art viewBox="0 0 260 100" title="Transparency, care and long-term vision as three equal strokes" exportName="overview-principle-transparency">
      {rows.map((w, i) => (
        <g key={w}>
          <text x="0" y={r2(26 + i * 30)} className="sans fade-in" fontSize="13" fill={HEX.muted} style={{ '--i': i }}>{w}</text>
          <path d={hbarPath(122, 14 + i * 30, 138, 16)} fill={i === 1 ? HEX.sand : HEX.tribal} className="grow-x" style={{ '--i': i + 1 }} />
        </g>
      ))}
    </Art>
  );
}

// ---------- Principle: precision, a stroke with its cut end on the diagonal, labelled as m03 labels it ----------
export function PrecisionArt() {
  return (
    <Art viewBox="0 0 260 100" title="A stroke with its end cut on the diagonal, labelled 42 degrees as in the construction drawing" exportName="overview-principle-precision">
      <path d="M12 38H164L190 64H12Z" fill={HEX.tribal} className="grow-x" style={{ '--i': 1 }} />
      <path d="M190 64L226 28" stroke={DRAWING.angle} strokeWidth="1.5" fill="none" {...drawProps(3)} />
      <path d="M12 76H44" stroke={DRAWING.unit} strokeWidth="6" fill="none" {...drawProps(4)} />
      <g className="sans fade-in" fontSize="13" fill={HEX.muted} style={{ '--i': 6 }}>
        <text x="52" y="82">x</text>
        <text x="204" y="22">{'42°'}</text>
      </g>
    </Art>
  );
}
