// Device frames and ready screens as SVG groups, for mockups and showcase scenes (one SVG per scene).
// For live, interactive screens use the HTML frames in components/ui/Devices (Phone, Tablet, Laptop, Monitor,
// Watch). Each frame takes `w` (its width in the parent SVG) and `idp`, and draws `children` on its screen in
// the screen's own coordinate space:
//   PhoneG   screen 390 x 844      MonitorG screen 1600 x 1000     LaptopG screen 1440 x 900
//   TabletG  screen 1180 x 820     WatchG   screen 184 x 224
// Frames are warm graphite; the light comes from the upper left (a thin highlight on the upper-left edge).
//
// Screens: ScreenAboutG is the case study's own About page (m12), rebuilt. ScreenPlanG (the plan sheet on a
// tablet) and ScreenWatchG are extensions in the same language, using only the case study's words.
import { WordmarkG, MarkG } from './Mark';
import { ABOUT, PLAN, CONTACT, SENDER, LINES } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';

export const SCREEN = { phone: [390, 844], monitor: [1600, 1000], laptop: [1440, 900], tablet: [1180, 820], watch: [184, 224] };
const BODY = '#2E2621', EDGE = '#3A302A', GLASS = '#120D0A';

export function PhoneG({ idp, x = 0, y = 0, w = 300, children, screenFill = '#F5F0E3', ...rest }) {
  const k = w / 430; // frame is 430 x 884 around a 390 x 844 screen
  return (
    <g transform={`translate(${x} ${y}) scale(${r2(k * 10000) / 10000})`} {...rest}>
      <clipPath id={`${idp}-ph`}>
        <rect x="20" y="20" width="390" height="844" rx="48" />
      </clipPath>
      <rect x="-3" y="150" width="6" height="34" rx="2" fill={EDGE} />
      <rect x="-3" y="210" width="6" height="62" rx="2" fill={EDGE} />
      <rect x="427" y="230" width="6" height="96" rx="2" fill={EDGE} />
      <rect width="430" height="884" rx="66" fill={EDGE} />
      <rect x="4" y="4" width="422" height="876" rx="62" fill={GLASS} />
      <rect x="20" y="20" width="390" height="844" rx="48" fill={screenFill} />
      <g clipPath={`url(#${idp}-ph)`}>
        <g transform="translate(20 20)">{children}</g>
      </g>
      <rect x="153" y="34" width="124" height="34" rx="17" fill="#000000" />
      <path d="M66 6h298a60 60 0 0 1 60 60v60" fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" />
    </g>
  );
}

export function MonitorG({ idp, x = 0, y = 0, w = 800, children, screenFill = '#F5F0E3', stand = true, ...rest }) {
  const k = w / 1640; // frame 1640 x 1040 around a 1600 x 1000 screen; the stand adds 300 below
  return (
    <g transform={`translate(${x} ${y}) scale(${r2(k * 10000) / 10000})`} {...rest}>
      <clipPath id={`${idp}-mo`}>
        <rect x="20" y="20" width="1600" height="1000" rx="4" />
      </clipPath>
      {stand && (
        <g>
          <path d="M700 1040h240v230H700z" fill={EDGE} />
          <path d="M700 1040h240v60H700z" fill="#000000" opacity="0.3" />
          <path d="M540 1270h560l40 30H500z" fill={BODY} />
          <path d="M700 1040h70v230h-70z" fill="#FFFFFF" opacity="0.08" />
        </g>
      )}
      <rect width="1640" height="1040" rx="18" fill={GLASS} />
      <rect x="20" y="20" width="1600" height="1000" rx="4" fill={screenFill} />
      <g clipPath={`url(#${idp}-mo)`}>
        <g transform="translate(20 20)">{children}</g>
      </g>
      <path d="M18 2h1604a16 16 0 0 1 16 16v300" fill="none" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="2" />
    </g>
  );
}

export function LaptopG({ idp, x = 0, y = 0, w = 800, children, screenFill = '#F5F0E3', ...rest }) {
  const k = w / 1840; // lid 1500 x 960 centred on a 1840-wide base
  return (
    <g transform={`translate(${x} ${y}) scale(${r2(k * 10000) / 10000})`} {...rest}>
      <clipPath id={`${idp}-la`}>
        <rect x="200" y="30" width="1440" height="900" rx="6" />
      </clipPath>
      <rect x="170" y="0" width="1500" height="960" rx="30" fill={BODY} />
      <rect x="200" y="30" width="1440" height="900" rx="6" fill={screenFill} />
      <g clipPath={`url(#${idp}-la)`}>
        <g transform="translate(200 30)">{children}</g>
      </g>
      <path d="M830 30h180v16a12 12 0 0 1-12 12H842a12 12 0 0 1-12-12z" fill={BODY} />
      <path d="M0 960h1840v26a30 30 0 0 1-30 30H30a30 30 0 0 1-30-30z" fill={EDGE} />
      <path d="M0 960h1840v8H0z" fill="#5A4E46" />
      <path d="M780 960h280v10a10 10 0 0 1-10 10H790a10 10 0 0 1-10-10z" fill={GLASS} />
      <path d="M200 4h1440" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="2" />
    </g>
  );
}

export function TabletG({ idp, x = 0, y = 0, w = 600, children, screenFill = '#F5F0E3', ...rest }) {
  const k = w / 1260; // frame 1260 x 900 around a 1180 x 820 screen
  return (
    <g transform={`translate(${x} ${y}) scale(${r2(k * 10000) / 10000})`} {...rest}>
      <clipPath id={`${idp}-ta`}>
        <rect x="40" y="40" width="1180" height="820" rx="14" />
      </clipPath>
      <rect width="1260" height="900" rx="46" fill={EDGE} />
      <rect x="4" y="4" width="1252" height="892" rx="42" fill={GLASS} />
      <rect x="40" y="40" width="1180" height="820" rx="14" fill={screenFill} />
      <g clipPath={`url(#${idp}-ta)`}>
        <g transform="translate(40 40)">{children}</g>
      </g>
      <circle cx="630" cy="20" r="5" fill="#2A2420" />
      <path d="M46 6h1168a40 40 0 0 1 40 40v120" fill="none" stroke="#FFFFFF" strokeOpacity="0.16" strokeWidth="2" />
    </g>
  );
}

export function WatchG({ idp, x = 0, y = 0, w = 120, children, band = '#35241C', ...rest }) {
  const k = w / 240; // case 240 x 290 around a 184 x 224 screen; band above and below
  return (
    <g transform={`translate(${x} ${y}) scale(${r2(k * 10000) / 10000})`} {...rest}>
      <clipPath id={`${idp}-wa`}>
        <rect x="28" y="133" width="184" height="224" rx="44" />
      </clipPath>
      <path d="M50 0h140l10 110H40z" fill={band} />
      <path d="M40 380h160l-10 110H50z" fill={band} />
      <path d="M50 0h140l10 110H40z" fill="#000000" opacity="0.12" />
      <rect x="236" y="190" width="12" height="46" rx="5" fill="#9A8F86" />
      <rect y="100" width="240" height="290" rx="70" fill="#CBC2B8" />
      <rect x="8" y="108" width="224" height="274" rx="62" fill={GLASS} />
      <rect x="28" y="133" width="184" height="224" rx="44" fill="#1A1411" />
      <g clipPath={`url(#${idp}-wa)`}>
        <g transform="translate(28 133)">{children}</g>
      </g>
    </g>
  );
}

// ---------- Helpers ----------

// Wrap text into lines of at most `max` characters (for SVG <text>, which does not wrap).
export function wrap(text, max = 40) {
  const out = [];
  let line = '';
  for (const word of text.split(' ')) {
    if ((line + ' ' + word).trim().length > max) { out.push(line.trim()); line = word; }
    else line += ' ' + word;
  }
  if (line.trim()) out.push(line.trim());
  return out;
}

// A floor plan drawn as architecture, without labels or dimensions (the plan on the sheet, m13, is illegible
// at that size and is never copied): outer walls, rooms, door swings and a car park with bays.
// Box w x h. seed varies the room layout deterministically.
export function FloorPlanG({ x = 0, y = 0, w = 400, h = 520, stroke = '#35241C', seed = 3, bays = true, ...rest }) {
  const rnd = seeded(seed);
  const bw = bays ? w * 0.62 : w;
  const cols = 3, rows = 5;
  const cw = bw / cols, ch = h / rows;
  const rooms = [];
  for (let r = 0; r < rows; r++) {
    let c = 0;
    while (c < cols) {
      const span = c < cols - 1 && rnd() > 0.6 ? 2 : 1;
      rooms.push({ x: c * cw, y: r * ch, w: span * cw, h: ch, door: rnd() });
      c += span;
    }
  }
  return (
    <g transform={`translate(${r2(x)} ${r2(y)})`} fill="none" stroke={stroke} {...rest}>
      <rect width={r2(bw)} height={h} strokeWidth="3" />
      {rooms.map((rm, i) => (
        <g key={i}>
          <rect x={r2(rm.x)} y={r2(rm.y)} width={r2(rm.w)} height={r2(rm.h)} strokeWidth="1.2" />
          <path d={`M${r2(rm.x + rm.w * 0.2)} ${r2(rm.y + rm.h)}a${r2(rm.h * 0.22)} ${r2(rm.h * 0.22)} 0 0 1 ${r2(rm.h * 0.22)} ${r2(-rm.h * 0.22)}`} strokeWidth="0.8" />
          {rm.door > 0.5 && <rect x={r2(rm.x + rm.w * 0.55)} y={r2(rm.y + rm.h * 0.25)} width={r2(rm.w * 0.3)} height={r2(rm.h * 0.4)} strokeWidth="0.8" strokeDasharray="3 3" />}
        </g>
      ))}
      {bays && (
        <g strokeWidth="1">
          <path d={`M${r2(bw + w * 0.06)} 0V${h}`} strokeDasharray="10 6" />
          {Array.from({ length: 10 }, (_, i) => (
            <path key={i} d={`M${r2(bw + w * 0.14)} ${r2((h * (i + 0.5)) / 10)}H${w}`} />
          ))}
        </g>
      )}
    </g>
  );
}

// ---------- Screens ----------

// The About page on the phone (m12), rebuilt: word-mark top left, menu top right, "About Sahra", the headline,
// the paragraph, and the three ruled rows with a "+". 390 x 844.
export function ScreenAboutG({ idp, fill = '#F5F0E3', ink = '#35241C', accent = '#875D41' }) {
  const lines = wrap(ABOUT.text, 46);
  const ry = 560;
  return (
    <g data-idp={idp}>
      <rect width="390" height="844" fill={fill} />
      <WordmarkG x={28} y={74} width={118} fill={accent} />
      {[0, 7, 14].map((d) => <rect key={d} x="334" y={74 + d} width="26" height="2" fill={ink} />)}
      <text x="28" y="196" fontSize="12" fill={ink} className="sans">{ABOUT.label}</text>
      <text fontSize="33" className="serif" fill={ink} letterSpacing="-0.6">
        {ABOUT.headline.rows.map((r, i) => <tspan key={r} x="28" y={240 + i * 38}>{r}</tspan>)}
      </text>
      <text fontSize="13" className="sans" fill={ink}>
        {lines.map((l, i) => <tspan key={i} x="28" y={378 + i * 20}>{l}</tspan>)}
      </text>
      {ABOUT.rows.map((r, i) => (
        <g key={r.no} transform={`translate(28 ${ry + i * 74})`}>
          <path d="M0 0H334" stroke={ink} strokeOpacity="0.4" strokeWidth="1" />
          <text x="0" y="44" fontSize="13" className="sans" fill={ink}>{r.no}</text>
          <text x="70" y="45" fontSize="20" className="serif" fill={ink}>{r.label}</text>
          <path d="M320 39h12M326 33v12" stroke={ink} strokeWidth="1.2" />
        </g>
      ))}
      <path d={`M28 ${ry + 3 * 74}H362`} stroke={ink} strokeOpacity="0.4" strokeWidth="1" />
    </g>
  );
}

// The plan sheet on a tablet (an extension of the presentation box, m13): the sheet's header and contacts as
// printed, the plan, the mark, and the plan text. 1180 x 820.
export function ScreenPlanG({ idp, ink = '#35241C', accent = '#875D41' }) {
  const lines = wrap(PLAN.text, 70);
  return (
    <g data-idp={idp}>
      <rect width="1180" height="820" fill="#F5F0E3" />
      <rect x="40" y="36" width="1100" height="748" fill="#FFFFFF" />
      <text x="80" y="92" fontSize="15" className="sans" fill={accent}>{SENDER.developement}</text>
      <text fontSize="14" className="sans" fill={ink}>
        <tspan x="470" y="92">{CONTACT.support}</tspan>
        <tspan x="470" y="112">{CONTACT.partnerships}</tspan>
        <tspan x="880" y="92">{CONTACT.city}</tspan>
        <tspan x="880" y="112">{CONTACT.phone}</tspan>
        <tspan x="880" y="132">{CONTACT.info}</tspan>
      </text>
      <FloorPlanG x={250} y={170} w={680} h={430} stroke={ink} />
      <MarkG x={80} y={668} size={44} fill="#B58F6B" />
      <text fontSize="13" className="sans" fill={ink}>
        {lines.map((l, i) => <tspan key={i} x="600" y={660 + i * 19}>{l}</tspan>)}
      </text>
    </g>
  );
}

// A glanceable watch screen: the mark and the brand line. 184 x 224.
export function ScreenWatchG({ idp }) {
  return (
    <g data-idp={idp}>
      <rect width="184" height="224" fill="#35241C" />
      <MarkG x={70} y={34} size={44} fill="#B58F6B" />
      <text fontSize="17" className="serif" fill="#F5F0E3" textAnchor="middle">
        {LINES.imagination.rows.map((r, i) => <tspan key={r} x="92" y={136 + i * 21}>{r}</tspan>)}
      </text>
      <text x="92" y="196" fontSize="11" className="sans" fill="#CDBBA6" textAnchor="middle">→ sahra.sa</text>
    </g>
  );
}
