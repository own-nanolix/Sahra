import Art from '@/components/art/Art';
import { PhoneG, wrap } from '@/components/art/Devices';
import { MarkG, MarkTileG, WordmarkG } from '@/components/art/Mark';
import { CurvedWallG } from '@/components/art/KeyArt';
import { ABOUT, CONTACT_BLOCKS, LINES, PALETTE, PEOPLE } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { PlanDrawing, ArchRing, ZONES } from './Drawings';
import s from './mobile-a.module.css';

// Exportable artwork of the mobile screens, each its own SVG. Animation is CSS keyframes that end on the
// finished drawing (`draw`, `fade-in`), so with motion off every SVG is complete.

const INK = '#35241C';
const STAGES = [0.25, 0.5, 0.75, 1];

function Fig({ children, name, span = 3, rows = 1 }) {
  return (
    <figure className={s.fig} style={{ '--span': span, '--rows': rows }}>
      {children}
      <figcaption>{name}</figcaption>
    </figure>
  );
}

// Screen 1 as flat artwork: the About page on the phone (m12), with the same measured geometry as the live
// screen (24 px margins, 34 px headline, the paragraph broken as printed, three 99 px rows from 488 px).
const ABOUT_LINES = wrap(ABOUT.text, 44);
function AboutFlatG() {
  return (
    <g>
      <rect width="390" height="844" fill="#F5F0E3" />
      <WordmarkG x={24} y={59} width={160} fill="#875D41" />
      {[59, 66.5, 74].map((y) => <rect key={y} x="335" y={y} width="31" height="2" fill={INK} />)}
      <text x="24" y="168.5" fontSize="12.5" className="sans" fill="#5C4A3E">{ABOUT.label}</text>
      <text fontSize="34" className="serif" fill={INK} letterSpacing="-0.3">
        {ABOUT.headline.rows.map((r, i) => <tspan key={r} x="24" y={r2(214 + i * 35.3)}>{r}</tspan>)}
      </text>
      <text fontSize="13" className="sans" fill={INK}>
        {ABOUT_LINES.map((l, i) => <tspan key={l} x="24" y={328.5 + i * 24}>{l}</tspan>)}
      </text>
      {ABOUT.rows.map((r, i) => (
        <g key={r.no} transform={`translate(24 ${488 + i * 99})`}>
          <path d="M0 0.5H342" stroke={INK} strokeOpacity="0.4" />
          <text x="0" y="54" fontSize="14" className="sans" fill="#5C4A3E">{r.no}</text>
          <text x="62" y="54.5" fontSize="16" className="serif" fill={INK}>{r.label}</text>
          <path d="M331 47.5H341M336 42.5V52.5" stroke={INK} />
        </g>
      ))}
      <path d="M24 785.5H366" stroke={INK} strokeOpacity="0.4" />
    </g>
  );
}

function AboutScreen() {
  return (
    <Art viewBox="0 0 430 884" title="About screen on a phone" exportName="mobile-a-about-screen">
      <PhoneG idp="mobile-a-art-about" w={430}>
        <AboutFlatG />
      </PhoneG>
    </Art>
  );
}

// Screen 2: the quarter arch at four stages of the scroll.
function ArchStages() {
  return (
    <Art viewBox="0 0 880 290" title="Quarter arch filling in four stages" exportName="mobile-a-arch-stages">
      <rect width="880" height="290" fill="#F5F0E3" />
      {STAGES.map((p, i) => (
        <g key={p} transform={`translate(${30 + i * 210} 20)`}>
          <ArchRing cx={150} cy={210} rm={96} sw={44} progress={p} cls="draw" />
        </g>
      ))}
    </Art>
  );
}

// Screen 3: the plan with the three steps highlighted, one after another.
function PlanSteps() {
  return (
    <Art viewBox="0 0 1120 440" title="Plan drawing with three steps highlighted" exportName="mobile-a-plan-steps">
      <rect width="1120" height="440" fill="#FFFFFF" />
      {ZONES.map((z, i) => (
        <g key={i} transform={`translate(${50 + i * 360} 24)`}>
          <PlanDrawing zone={z} />
          <text x="0" y="398" fontSize="13" className="sans" fill={INK}>{`0${i + 1}`}</text>
        </g>
      ))}
    </Art>
  );
}

// Screen 4: the sky-and-wall field with the brand line.
function VisionField() {
  return (
    <Art viewBox="0 0 390 520" title="Sky and wall field with the brand line" exportName="mobile-a-vision-field">
      <CurvedWallG idp="mobile-a-art-vision" x={0} y={0} w={390} h={520} />
      <linearGradient id="mobile-a-art-vision-fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.5" stopColor="#35241C" stopOpacity="0" />
        <stop offset="1" stopColor="#35241C" />
      </linearGradient>
      <rect width="390" height="520" fill="url(#mobile-a-art-vision-fade)" />
      <text fontSize="36" className="serif" fill="#F5F0E3" letterSpacing="-0.6">
        {LINES.imagination.rows.map((r, i) => <tspan key={r} x="28" y={440 + i * 40}>{r}</tspan>)}
      </text>
    </Art>
  );
}

// Screen 9: the palette as six bands with the word-mark above.
function PaletteBands() {
  const ink = ['#F5F0E3', '#F5F0E3', '#F5F0E3', '#35241C', '#35241C', '#35241C'];
  return (
    <Art viewBox="0 0 390 560" title="Palette as six bands under the word-mark" exportName="mobile-a-palette-bands">
      <rect width="390" height="160" fill="#35241C" />
      <WordmarkG idp="mobile-a-art-bands" x={28} y={52} width={334} fill="#B58F6B" />
      {PALETTE.map((p, i) => (
        <g key={p.token} transform={`translate(0 ${160 + i * 66.67})`} className="fade-in" style={{ '--i': i }}>
          <rect width="390" height="67" fill={p.hex} />
          <text x="28" y="40" fontSize="17" className="serif" fill={ink[i]}>{p.name}</text>
          <text x="362" y="39" fontSize="13" className="sans" fill={ink[i]} textAnchor="end">{p.hex}</text>
        </g>
      ))}
    </Art>
  );
}

// Screen 8: the business card as a small card.
function BizCard() {
  return (
    <Art viewBox="0 0 520 320" title="Business card, front" exportName="mobile-a-contact-card">
      <rect width="520" height="320" fill="#F5F0E3" />
      <rect x="40" y="40" width="440" height="240" rx="18" fill="#FFFFFF" />
      <MarkG x={410} y={64} size={36} fill="#B58F6B" />
      <text x="68" y="112" fontSize="26" className="serif" fill={INK}>{PEOPLE.card.name}</text>
      <text x="68" y="138" fontSize="13" className="sans" fill="#5C4A3E">{PEOPLE.card.role}</text>
      <text fontSize="12" className="sans" fill={INK}>
        {CONTACT_BLOCKS.office.map((l, i) => <tspan key={l} x="68" y={r2(216 + i * 17)}>{l}</tspan>)}
      </text>
    </Art>
  );
}

// The mark tile of screen 9 and the word-mark of screen 1 sit in two small plates.
function TilePlate() {
  return (
    <Art viewBox="0 0 520 320" title="Mark tile on Dark Chocolate" exportName="mobile-a-mark-tile">
      <rect width="520" height="320" fill="#35241C" />
      <MarkTileG x={170} y={60} size={180} />
      <text x="260" y="278" fontSize="14" className="sans" fill="#CDBBA6" textAnchor="middle">{ABOUT.label}</text>
    </Art>
  );
}

export default function ArtSet() {
  return (
    <div className={s.figs}>
      <Fig name="Screen 1 on a phone, flat" rows={2}><AboutScreen /></Fig>
      <Fig name="Screen 2, quarter arch" span={9}><ArchStages /></Fig>
      <Fig name="Screen 3, plan steps" span={9}><PlanSteps /></Fig>
      <Fig name="Screen 4, sky and wall"><VisionField /></Fig>
      <Fig name="Screen 9, palette bands"><PaletteBands /></Fig>
      <Fig name="Screen 8, business card"><BizCard /></Fig>
      <Fig name="Screen 9, mark tile"><TilePlate /></Fig>
    </div>
  );
}
