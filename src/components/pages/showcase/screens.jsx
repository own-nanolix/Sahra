// Screens and card faces drawn in the brand's language, for the showcase scenes. Every word is the case study's
// own (ABOUT, LINES, PALETTE, NAV_LINKS, PROFILE, PLAN, the contacts). `bd` is the id prefix of a <BrandDefs> that
// the scene puts in its own defs (gradients -hero, -arch, -desert).
import { WordmarkG, MarkG, MarkTileG } from '@/components/art/Mark';
import { QuarterArchG, ArchWindowG, CornerCutG, SkyPatchG } from '@/components/art/KeyArt';
import { wrap } from '@/components/art/Devices';
import { PlanG, SheetG } from './showcase-plan-art';
import { ABOUT, LINES, PALETTE, NAV_LINKS, PROFILE, PLAN, CONTACT_BLOCKS, URL_LINE, SENDER } from '@/lib/brand';
import { contrast } from '@/lib/site';
import { rr } from './kit';

const INK = '#35241C';
const BEIGE = '#F5F0E3';
const SAND = '#B58F6B';
const TRIBAL = '#875D41';
const MUTED = '#CDBBA6';

// ---------- Phone screens, 390 x 844 (the About page itself is ScreenAboutG from art/Devices) ----------

// a dark brand screen: the mark, the brand line, the address
export function ScreenDarkG() {
  return (
    <g>
      <rect width="390" height="844" fill={INK} />
      <MarkG x={137} y={250} size={116} fill={SAND} />
      <path d="M28 560H362" stroke={BEIGE} strokeOpacity="0.25" />
      <text className="serif" fontSize="31" fill={BEIGE} letterSpacing="-0.5">
        {LINES.imagination.rows.map((r, i) => <tspan key={r} x="28" y={608 + i * 38}>{r}</tspan>)}
      </text>
      <text x="28" y="740" fontSize="15" className="sans" fill={MUTED}>{URL_LINE}</text>
    </g>
  );
}

// the plan on a phone: the sheet's header, the plan, the office contacts
export function ScreenPlanPhoneG() {
  return (
    <g>
      <rect width="390" height="844" fill={BEIGE} />
      <text x="28" y="84" fontSize="14" className="sans" fill={TRIBAL}>{SENDER.developement}</text>
      <path d="M28 108H362" stroke={INK} strokeOpacity="0.3" />
      <PlanG x={20} y={150} scale={0.8} ink={INK} sw={1.2} />
      <MarkG x={28} y={700} size={36} fill={SAND} />
      <text fontSize="12" className="sans" fill={INK}>
        {CONTACT_BLOCKS.office.map((l, i) => <tspan key={l} x="28" y={776 + i * 17}>{l}</tspan>)}
      </text>
    </g>
  );
}

// the six published colours as stacked fields, name and hex as printed
export function ScreenPaletteG() {
  const hh = 844 / PALETTE.length;
  return (
    <g>
      {PALETTE.map((c, i) => {
        const ink = contrast(c.hex, BEIGE) > contrast(c.hex, INK) ? BEIGE : INK;
        return (
          <g key={c.name}>
            <rect y={i * hh} width="390" height={hh + 1} fill={c.hex} />
            <text x="28" y={i * hh + 70} fontSize="24" className="serif" fill={ink}>{c.name}</text>
            <text x="28" y={i * hh + 98} fontSize="13" className="sans" fill={ink}>{c.hex}</text>
          </g>
        );
      })}
    </g>
  );
}

// a ruled menu: the case study's own navigation words
export function ScreenMenuG() {
  return (
    <g>
      <rect width="390" height="844" fill={INK} />
      <WordmarkG x={28} y={74} width={118} fill={SAND} />
      <path d="M338 76L360 98M360 76L338 98" stroke={BEIGE} strokeWidth="2" />
      {NAV_LINKS.map((n, i) => (
        <g key={n.id} transform={`translate(28 ${220 + i * 96})`}>
          <path d="M0 0H334" stroke={BEIGE} strokeOpacity="0.3" />
          <text x="0" y="62" fontSize="32" className="serif" fill={BEIGE} letterSpacing="-0.4">{n.label}</text>
          <path d="M320 54h12M326 48v12" stroke={BEIGE} strokeWidth="1.4" />
        </g>
      ))}
      <path d={`M28 ${220 + NAV_LINKS.length * 96}H362`} stroke={BEIGE} strokeOpacity="0.3" />
      <text fontSize="13" className="sans" fill={MUTED}>
        {CONTACT_BLOCKS.office.map((l, i) => <tspan key={l} x="28" y={724 + i * 18}>{l}</tspan>)}
      </text>
      <text x="28" y="800" fontSize="15" className="sans" fill={SAND}>{URL_LINE}</text>
    </g>
  );
}

// the profile card (m12) on a phone, on Dark Chocolate
export function ScreenProfileG({ bd }) {
  return (
    <g>
      <rect width="390" height="844" fill={INK} />
      <ProfileCardG bd={bd} x={20} y={250} w={350} h={308} />
    </g>
  );
}

// the arch screen: the quarter arch as a window, and a brand line
export function ScreenArchG({ bd }) {
  return (
    <g>
      <rect width="390" height="844" fill={BEIGE} />
      <ArchWindowG idp={`${bd}-aw`} cx={390} cy={470} r={150} R={360} quadrant="tl" />
      <QuarterArchG cx={30} cy={840} r={80} R={120} quadrant="tr" fill={TRIBAL} opacity="0.9" />
      <text className="serif" fontSize="31" fill={INK} letterSpacing="-0.5">
        {LINES.elevate.rows.map((r, i) => <tspan key={r} x="28" y={600 + i * 36}>{r}</tspan>)}
      </text>
      <text x="28" y="740" fontSize="14" className="sans" fill={TRIBAL}>{URL_LINE}</text>
    </g>
  );
}

// the word-mark alone on Black
export function ScreenMarkG() {
  return (
    <g>
      <rect width="390" height="844" fill="#000000" />
      <WordmarkG x={35} y={386} width={320} fill={SAND} />
    </g>
  );
}

// ---------- A laptop screen, 1440 x 900: the About page grown to a desktop landing ----------

export function ScreenLandingG({ bd }) {
  const lines = wrap(ABOUT.text, 54);
  return (
    <g>
      <rect width="1440" height="900" fill={BEIGE} />
      <WordmarkG x={64} y={50} width={190} fill={TRIBAL} />
      <text fontSize="16" className="sans" fill={INK}>
        {NAV_LINKS.map((n, i) => <tspan key={n.id} x={820 + i * 150} y="76">{n.label}</tspan>)}
      </text>
      <path d="M64 112H1376" stroke={INK} strokeOpacity="0.25" />
      <ArchWindowG idp={`${bd}-lw`} cx={1440} cy={900} r={250} R={650} quadrant="tl" />
      <text x="64" y="260" fontSize="16" className="sans" fill="#7A5A3F">{ABOUT.label}</text>
      <text className="serif" fontSize="82" fill={INK} letterSpacing="-1.6">
        {ABOUT.headline.rows.map((r, i) => <tspan key={r} x="64" y={348 + i * 88}>{r}</tspan>)}
      </text>
      <text fontSize="19" className="sans" fill={INK}>
        {lines.map((l, i) => <tspan key={i} x="64" y={650 + i * 28}>{l}</tspan>)}
      </text>
      <rect x="64" y="772" width="180" height="56" rx="10" fill={TRIBAL} />
      <text x="154" y="807" fontSize="19" className="sans" fill={BEIGE} textAnchor="middle">{URL_LINE}</text>
    </g>
  );
}

// ---------- Cards (digital: large radius), drawn with their own face ----------

// the profile card of m12: gradient header with the quarter arch and the brand line, the mark tile, "Follow"
export function ProfileCardG({ bd, x = 0, y = 0, w = 380, h = 336, k = 1 }) {
  const lines = wrap(PROFILE.bio, 64);
  const hd = h * 0.42;
  const id = `${bd}-pc${Math.round(w)}`;
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <clipPath id={`${id}-clip`}>
        <path d={rr(0, 0, w, h, 30)} />
      </clipPath>
      <g clipPath={`url(#${id}-clip)`}>
        <rect width={w} height={h} fill="#F5F4F1" />
        <rect width={w} height={hd} fill={`url(#${bd}-hero)`} />
        <QuarterArchG cx={w * 0.78} cy={hd + 10} r={w * 0.2} R={w * 0.4} quadrant="tl" fill={`url(#${bd}-arch)`} />
        <text className="serif" fontSize={w * 0.058} fill={BEIGE}>
          {LINES.imagination.rows.map((r, i) => <tspan key={r} x={w * 0.42} y={hd * 0.42 + i * w * 0.068}>{r}</tspan>)}
        </text>
      </g>
      <MarkTileG x={w * 0.08} y={hd - w * 0.1} size={w * 0.2} radius={w * 0.045} />
      <rect x={w * 0.62} y={hd + 16} width={w * 0.3} height={w * 0.09} rx="8" fill="#0E0B09" />
      <text x={w * 0.77} y={hd + 16 + w * 0.058} fontSize={w * 0.04} className="sans" fill="#FFFFFF" textAnchor="middle">{PROFILE.action}</text>
      <text x={w * 0.08} y={hd + w * 0.25} fontSize={w * 0.056} className="sans" fill="#1E140F">{PROFILE.name}</text>
      <text x={w * 0.08} y={hd + w * 0.3} fontSize={w * 0.04} className="sans" fill="#5C4A3E">{PROFILE.handle}</text>
      <text fontSize={w * 0.026} className="sans" fill="#1E140F">
        {lines.map((l, i) => <tspan key={i} x={w * 0.08} y={hd + w * 0.358 + i * w * 0.037}>{l}</tspan>)}
      </text>
    </g>
  );
}

// the three ruled rows of the About page on a white card
export function RowsCardG({ w = 320, h = 440 }) {
  return (
    <g>
      <text x="28" y="58" fontSize="12" className="sans" fill="#7A5A3F">{ABOUT.label}</text>
      <text className="serif" fontSize="29" fill={INK} letterSpacing="-0.5">
        {ABOUT.headline.rows.map((r, i) => <tspan key={r} x="28" y={104 + i * 34}>{r}</tspan>)}
      </text>
      {ABOUT.rows.map((r, i) => (
        <g key={r.no} transform={`translate(28 ${h - 214 + i * 66})`}>
          <path d={`M0 0H${w - 56}`} stroke={INK} strokeOpacity="0.4" />
          <text x="0" y="40" fontSize="12" className="sans" fill="#5C4A3E">{r.no}</text>
          <text x="46" y="42" fontSize="23" className="serif" fill={INK}>{r.label}</text>
          <path d={`M${w - 70} 36h12M${w - 64} 30v12`} stroke={INK} strokeWidth="1.2" />
        </g>
      ))}
      <path d={`M28 ${h - 16}H${w - 28}`} stroke={INK} strokeOpacity="0.4" />
    </g>
  );
}

// a fragment of the plan on a beige card, cropped by the card
export function PlanCardG({ idp, w = 340, h = 370 }) {
  return (
    <g>
      <clipPath id={`${idp}-planclip`}>
        <rect x="18" y="64" width={w - 36} height={h - 120} />
      </clipPath>
      <text x="26" y="42" fontSize="12" className="sans" fill={TRIBAL}>{PLAN.sender}</text>
      <g clipPath={`url(#${idp}-planclip)`}>
        <PlanG x={-10} y={30} scale={0.95} ink={INK} sw={1.1} />
      </g>
      <MarkG x={26} y={h - 46} size={26} fill={SAND} />
    </g>
  );
}

// ---------- The hoarding artwork of m16, to fit a wide screen ----------

// field with the word-mark and "We Build Spaces of Imagination", the rounded corner, the beige panel
// Re-measured from m16 at full size: the photograph takes 57 % of the width and its corner radius is about a
// tenth of the height; the line half starts 3.4 % of the width after it; line at 15 %, sub line at 46 %,
// button at 85 % of the height.
export function HoardingG({ idp, w = 1260, h = 420 }) {
  const pw = Math.round(w * 0.571);
  const tx = Math.round(pw + w * 0.034);
  const u = h / 526; // one pixel of m16's 526 px tall hoarding
  return (
    <g>
      <rect width={w} height={h} fill={BEIGE} />
      <CornerCutG idp={`${idp}-hc`} x={0} y={0} w={pw} h={h} rad={Math.round(h * 0.098)} corner="br">
        <SkyPatchG idp={`${idp}-hp`} x={0} y={0} w={pw} h={h} />
      </CornerCutG>
      <WordmarkG x={Math.round(50 * u)} y={Math.round(45 * u)} width={Math.round(280 * u)} fill={BEIGE} opacity="0.95" />
      <text className="serif" fontSize={Math.round(36 * u)} fill={BEIGE} opacity="0.95" letterSpacing="-0.4">
        {LINES.imagination.rows.map((r, i) => <tspan key={r} x={Math.round(52 * u)} y={Math.round((438 + i * 42) * u)}>{r}</tspan>)}
      </text>
      <text className="serif" fontSize={Math.round(50 * u)} fill={INK} letterSpacing="-0.6">
        {LINES.refinedLiving.rows.map((r, i) => <tspan key={r} x={tx} y={Math.round((78 + i * 53) * u)}>{r}</tspan>)}
      </text>
      <text fontSize={Math.round(22 * u)} className="sans" fill={INK}>
        {LINES.cleanArchitecture.rows.map((r, i) => <tspan key={r} x={tx} y={Math.round((235 + i * 31) * u)}>{r}</tspan>)}
      </text>
      <rect x={tx} y={Math.round(445 * u)} width={Math.round(139 * u)} height={Math.round(41 * u)} rx={Math.round(9 * u)} fill={TRIBAL} />
      <text x={Math.round(tx + 69.5 * u)} y={Math.round(472 * u)} fontSize={Math.round(20 * u)} className="sans" fill={BEIGE} textAnchor="middle">{URL_LINE}</text>
    </g>
  );
}

// ---------- The plan viewer on a tablet, 1180 x 820: the sheet at the left, the ruled rows and the plan text ----------

export function ScreenPlanTabletG() {
  const lines = wrap(PLAN.text, 50);
  return (
    <g>
      <rect width="1180" height="820" fill={INK} />
      <g transform="translate(76 34) scale(1.1)">
        <SheetG tone="white" />
      </g>
      <text x="720" y="86" fontSize="15" className="sans" fill={SAND}>{SENDER.developement}</text>
      {ABOUT.rows.map((r, i) => (
        <g key={r.no} transform={`translate(720 ${120 + i * 92})`}>
          <path d="M0 0H390" stroke={BEIGE} strokeOpacity="0.3" />
          <text x="0" y="56" fontSize="14" className="sans" fill={MUTED}>{r.no}</text>
          <text x="60" y="58" fontSize="30" className="serif" fill={BEIGE}>{r.label}</text>
          <path d="M376 50h14M383 43v14" stroke={BEIGE} strokeWidth="1.4" />
        </g>
      ))}
      <path d="M720 396H1110" stroke={BEIGE} strokeOpacity="0.3" />
      <text fontSize="15" className="sans" fill={MUTED}>
        {lines.map((l, i) => <tspan key={i} x="720" y={446 + i * 23}>{l}</tspan>)}
      </text>
    </g>
  );
}
