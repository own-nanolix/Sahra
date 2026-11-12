// Exportable artwork for the hero and the first story step: the profile card's arch header (m12, left), the
// quarter arch used as a window, and the About page on the phone (m12, right) as flat artwork.
import Art from '@/components/art/Art';
import { BrandDefs, ArchWindowG, TimberG } from '@/components/art/KeyArt';
import { MarkTileG, MarkG, WordmarkG } from '@/components/art/Mark';
import { wrap } from '@/components/art/Devices';
import { ABOUT, LINES, PROFILE } from '@/lib/brand';
import s from './lp-home.module.css';

// The thick band of the arch is ONE stroked centre line (a quarter circle that runs on into a straight arm), so the
// arch can fill along its length: the page sets --lp-fill (0 to 1) on the wrapper and the stroke's dash offset
// follows. With no variable set, or with the SVG exported, the arch is complete.
export const ARCH_LEN = 520;
const ARCH_D = 'M113.5 210V172A87.5 87.5 0 0 1 201 84.5H560';

export function ArchHeaderArt() {
  const bio = wrap(PROFILE.bio, 82);
  const idp = 'lp-home-ah';
  return (
    <Art viewBox="0 0 512 410" title="Profile card with the quarter arch header" exportName="lp-home-arch-header">
      <BrandDefs idp={idp} />
      <clipPath id={`${idp}-card`}>
        <rect width="512" height="410" rx="40" />
      </clipPath>
      <clipPath id={`${idp}-head`}>
        <rect width="512" height="172" />
      </clipPath>
      <g clipPath={`url(#${idp}-card)`}>
        <rect width="512" height="410" fill="#F6F4F0" />
        <rect width="512" height="172" fill={`url(#${idp}-hero)`} />
        <g clipPath={`url(#${idp}-head)`}>
          <path d={ARCH_D} className={s.archStroke} fill="none" stroke={`url(#${idp}-arch)`} strokeWidth="85" strokeDasharray={ARCH_LEN} />
        </g>
        <text className="serif" fontSize="28.5" fill="#F5F0E3" letterSpacing="-0.4">
          {LINES.imagination.rows.map((r, i) => (
            <tspan key={r} x="234" y={81 + i * 32}>{r}</tspan>
          ))}
        </text>
        <MarkTileG x={47} y={130} size={104} radius={24} tile="#F5F0E3" fill="#875D41" />
        <rect x="302" y="193" width="161" height="46" rx="8" fill="#000000" />
        <text x="382.5" y="222" fontSize="19" fill="#FFFFFF" textAnchor="middle" className="sans">{PROFILE.action}</text>
        <text x="44" y="283" fontSize="23" fill="#1E140F" className="sans">{PROFILE.name}</text>
        <text x="44" y="309" fontSize="17" fill="#5C4A3E" className="sans">{PROFILE.handle}</text>
        <text fontSize="10.5" fill="#1E140F" className="sans">
          {bio.map((l, i) => (
            <tspan key={i} x="44" y={338 + i * 19}>{l}</tspan>
          ))}
        </text>
      </g>
    </Art>
  );
}

// The quarter arch as a window onto timber (the card m10 and the header of m12 use the same shape).
export function ArchWindowArt() {
  const arcs = [150, 260, 370];
  return (
    <Art viewBox="0 0 600 700" title="Quarter arch window onto timber" exportName="lp-home-arch-window">
      <rect width="600" height="700" fill="#E1D2C4" />
      <ArchWindowG idp="lp-home-aw" cx={540} cy={640} r={190} R={470} quadrant="tl">
        <TimberG idp="lp-home-aw-t" x={70} y={170} w={470} h={470} lines={90} />
      </ArchWindowG>
      <g fill="none" stroke="#875D41" strokeWidth="1">
        {arcs.map((r, i) => (
          <path key={r} d={`M${540 - r} 640A${r} ${r} 0 0 1 540 ${640 - r}`} className="draw" style={{ '--len': 700, '--i': i }} />
        ))}
        <path d="M540 640V120M60 640H560" strokeOpacity="0.5" />
      </g>
      <MarkG x={64} y={62} size={46} fill="#875D41" topClass="mark-top" bottomClass="mark-bottom" />
    </Art>
  );
}

// The About page on the phone (m12, right), measured once from a straightened full-size crop of the original
// (390 x 844 artboard; the screen is 543 px wide in the crop at the row level, so 1 unit = 1.39 px): 24 margins,
// word-mark 160 wide, menu bars at the right margin, label baseline 165, headline 34 / 35, paragraph 13 / 24
// in five lines from baseline 322, three rows 99 apart from y 480 with a fine rule, the number, the serif label
// and a small "+". No status bar. ScreenAboutG (art/Devices) and mobile-a's screen 1 use the same values.
export const SCREEN = {
  mx: 24,
  word: { x: 24, y: 58, w: 160 },
  menu: { x: 336, y: 67, w: 30, gap: 8 },
  label: { y: 165, size: 12 },
  head: { y: 210, size: 34, lh: 35 },
  text: { y: 322, size: 13, lh: 24, wrap: 44 },
  rows: { y: 480, h: 99, w: 342, noY: 56, labelX: 57, labelY: 56, labelSize: 18, plusX: 331, plusY: 50, plus: 10 },
};

export function PhoneScreenArt() {
  const { word, menu, label, head, text, rows } = SCREEN;
  const ink = '#35241C';
  const rule = 'rgba(53, 36, 28, 0.4)';
  const half = rows.plus / 2;
  return (
    <Art viewBox="0 0 390 844" title="About Sahra page on the phone" exportName="lp-home-phone-screen">
      <rect width="390" height="844" fill="#F5F0E3" />
      <WordmarkG x={word.x} y={word.y} width={word.w} fill="#875D41" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={menu.x} y={menu.y + i * menu.gap} width={menu.w} height="2" fill={ink} />
      ))}
      <text x={SCREEN.mx} y={label.y} fontSize={label.size} fill={ink} className="sans">{ABOUT.label}</text>
      <text fontSize={head.size} fontWeight="500" className="serif" fill={ink} letterSpacing="-0.4">
        {ABOUT.headline.rows.map((r, i) => <tspan key={r} x={SCREEN.mx} y={head.y + i * head.lh}>{r}</tspan>)}
      </text>
      <text fontSize={text.size} className="sans" fill="#1E140F">
        {wrap(ABOUT.text, text.wrap).map((l, i) => <tspan key={i} x={SCREEN.mx} y={text.y + i * text.lh}>{l}</tspan>)}
      </text>
      {ABOUT.rows.map((r, i) => (
        <g key={r.no} transform={`translate(${SCREEN.mx} ${rows.y + i * rows.h})`}>
          <path d={`M0 0H${rows.w}`} stroke={rule} strokeWidth="1" />
          <text x="0" y={rows.noY} fontSize="14" className="sans" fill={ink}>{r.no}</text>
          <text x={rows.labelX} y={rows.labelY} fontSize={rows.labelSize} className="serif" fill={ink}>{r.label}</text>
          <path d={`M${rows.plusX - half} ${rows.plusY}h${rows.plus}M${rows.plusX} ${rows.plusY - half}v${rows.plus}`} stroke={ink} strokeWidth="1" />
        </g>
      ))}
      <path d={`M${SCREEN.mx} ${rows.y + 3 * rows.h}H${SCREEN.mx + rows.w}`} stroke={rule} strokeWidth="1" />
    </Art>
  );
}
