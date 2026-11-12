// Exportable artwork for the story steps: the intro slide (m02), the two posters (m11: a curved wall against the
// sky, a curved brick strip), the hoarding (m16) and the framed poster (m14, left). Photographs are never
// reproduced: these are drawn fields. Positions and sizes are measured from the full-size originals as fractions
// of each poster and scaled to the artboards below.
import Art from '@/components/art/Art';
import { CurvedWallG, BrickCurveG, SkyPatchG, SteppedShadowG, CornerCutG } from '@/components/art/KeyArt';
import { WordmarkG, MarkG } from '@/components/art/Mark';
import { wrap } from '@/components/art/Devices';
import { INTRO, LINES, HOARDING, POSTER_BODY, SHEET, CONTACT_BLOCKS } from '@/lib/brand';

// m02: title left with a thin rule, the body justified-looking at the right, the project sheet below.
export function IntroSlideArt() {
  const body = wrap(INTRO.paragraphs[0], 50);
  return (
    <Art viewBox="0 0 800 560" title="Intro slide: We Build Spaces of Imagination" exportName="lp-home-intro-slide">
      <rect width="800" height="560" fill="#FFFFFF" />
      <path d="M52 72V220" stroke="#35241C" strokeOpacity="0.35" strokeWidth="1.5" className="draw" style={{ '--len': 160 }} />
      <text className="serif" fontSize="40" fill="#35241C" letterSpacing="-0.8">
        {LINES.imagination.rows.map((l, i) => (
          <tspan key={l} x="76" y={110 + i * 46}>{l}</tspan>
        ))}
      </text>
      <text fontSize="13.5" fill="#1E140F" className="sans">
        {body.map((l, i) => (
          <tspan key={i} x="400" y={104 + i * 22} className="fade-in" style={{ '--i': i }}>{l}</tspan>
        ))}
      </text>
      <path d="M52 380H748" stroke="#35241C" strokeOpacity="0.3" />
      <g fontSize="12.5" className="sans">
        {SHEET.map(([k, v], i) => (
          <g key={k} transform={`translate(${52 + (i % 3) * 232} ${410 + Math.floor(i / 3) * 84})`}>
            <text fill="#5C4A3E">{k}</text>
            <text fill="#1E140F">
              {wrap(v, 28).map((l, j) => (
                <tspan key={l} x="0" y={20 + j * 17}>{l}</tspan>
              ))}
            </text>
          </g>
        ))}
      </g>
      <MarkG x={720} y={500} size={28} fill="#B58F6B" />
    </Art>
  );
}

// The three contact blocks of the posters, top to bottom: online (the printed line that names a social network is
// left out), service, office. Set very small, 10 apart, the blocks 48 apart.
const POSTER_BLOCKS = [CONTACT_BLOCKS.online, CONTACT_BLOCKS.service, CONTACT_BLOCKS.office];
function PosterContactsG({ x, y, fill }) {
  return (
    <text fontSize="7" fill={fill} className="sans">
      {POSTER_BLOCKS.map((b, i) =>
        b.map((l, j) => <tspan key={l} x={x} y={y + i * 48 + j * 10}>{l}</tspan>),
      )}
    </text>
  );
}

// m11 (left): a dark framed poster, a curved wall against the sky. The line sits at the top left in Beige, the
// body in a narrow column from 44 % of the width, the contacts lower in a column from 59 %, the Sand mark at the
// bottom left. Poster 424 x 584 inside a 28 frame.
export function WallSkyG({ idp = 'lp-home-wl' }) {
  const body = wrap(POSTER_BODY, 50);
  return (
    <g>
      <rect width="480" height="640" fill="#1E140F" />
      <CurvedWallG idp={idp} x={28} y={28} w={424} h={584} />
      <text className="serif" fontSize="28" fill="#F5F0E3" letterSpacing="-0.4">
        {LINES.imagination.rows.map((r, i) => (
          <tspan key={r} x="52" y={73 + i * 29} className="slide-up" style={{ '--i': i + 1 }}>{r}</tspan>
        ))}
      </text>
      <text fontSize="7" fill="#F5F0E3" className="sans">
        {body.map((l, i) => (
          <tspan key={i} x="214" y={258 + i * 9}>{l}</tspan>
        ))}
      </text>
      <PosterContactsG x={277} y={467} fill="#F5F0E3" />
      <MarkG x={52} y={547} size={35} fill="#B58F6B" />
    </g>
  );
}

export function WallSkyArt() {
  return (
    <Art viewBox="0 0 480 640" title="Poster on a curved wall against the sky" exportName="lp-home-wall-sky">
      <WallSkyG />
    </Art>
  );
}

// m11 (right): a beige poster, the line at the top left, the body from 42 % of the height, the three contact
// blocks below it, and a tall strip of curved brick from 58 % of the width to the right edge.
export function BrickPosterG({ idp = 'lp-home-bk' }) {
  const body = wrap(POSTER_BODY, 56);
  return (
    <g>
      <rect width="480" height="640" fill="#1E140F" />
      <rect x="28" y="28" width="424" height="584" fill="#F5F0E3" />
      <BrickCurveG idp={idp} x={272} y={48} w={180} h={535} courses={44} />
      <text className="serif" fontSize="30" fill="#35241C" letterSpacing="-0.5">
        {LINES.builtAround.rows.map((r, i) => (
          <tspan key={r} x="52" y={69 + i * 30} className="slide-up" style={{ '--i': i + 1 }}>{r}</tspan>
        ))}
      </text>
      <text fontSize="7" fill="#1E140F" className="sans">
        {body.map((l, i) => (
          <tspan key={i} x="52" y={273 + i * 9.5}>{l}</tspan>
        ))}
      </text>
      <PosterContactsG x={52} y={459} fill="#1E140F" />
    </g>
  );
}

export function BrickPosterArt() {
  return (
    <Art viewBox="0 0 480 640" title="Poster with a strip of curved brick" exportName="lp-home-brick-poster">
      <BrickPosterG />
    </Art>
  );
}

// m16: the hoarding, 3 : 1 as printed. Left 57 % a drawn court with a patch of sky, its lower right corner cut by
// one large radius (60), the beige word-mark at the top left and the line at the bottom left; the right part beige
// with the line (37 / 39), the sub line (15 / 23.5) and the tribal-brown button "→ sahra.sa" (104 x 31, radius 8).
export function HoardingArt() {
  return (
    <Art viewBox="0 0 1200 400" title="Hoarding: refined living spaces" exportName="lp-home-hoarding">
      <rect width="1200" height="400" fill="#F5F0E3" />
      <CornerCutG idp="lp-home-hd" x={0} y={0} w={686} h={400} rad={60} corner="br">
        <SkyPatchG idp="lp-home-hd-s" x={0} y={0} w={686} h={400} />
        <SteppedShadowG x={330} y={230} w={356} h={170} steps={7} fill="#A8743F" shade="#2A1C15" opacity="0.9" />
      </CornerCutG>
      <WordmarkG x={38} y={38} width={212} fill="#F5F0E3" />
      <text className="serif" fontSize="30" fill="#F5F0E3" letterSpacing="-0.4">
        {HOARDING.photoLine.rows.map((r, i) => (
          <tspan key={r} x="39" y={330 + i * 31.5}>{r}</tspan>
        ))}
      </text>
      <text className="serif" fontSize="37" fill="#35241C" letterSpacing="-0.6">
        {HOARDING.line.rows.map((r, i) => (
          <tspan key={r} x="726" y={60 + i * 39} className="slide-up" style={{ '--i': i + 1 }}>{r}</tspan>
        ))}
      </text>
      <text fontSize="15" fill="#35241C" className="sans">
        {HOARDING.sub.rows.map((r, i) => (
          <tspan key={r} x="726" y={182 + i * 23.5}>{r}</tspan>
        ))}
      </text>
      <rect x="726" y="335" width="104" height="31" rx="8" fill="#875D41" />
      <text x="778" y="355.5" fontSize="14" fill="#F5F0E3" textAnchor="middle" className="sans">{HOARDING.button}</text>
    </Art>
  );
}

// m14 (left): a framed poster 0.62 wide to high: a patch of sky seen up a court in the top half, then a beige panel
// with the line (30, from 57 % of the height), its two-line sub line, the word-mark at the bottom left and
// "We Build Spaces of Imagination" set right at the bottom right.
export function SkyPosterArt() {
  return (
    <Art viewBox="0 0 480 739" title="Poster: spaces that elevate everyday living" exportName="lp-home-sky-poster">
      <rect width="480" height="739" fill="#1E140F" />
      <SkyPatchG idp="lp-home-sp" x={28} y={28} w={424} h={342} />
      <rect x="28" y="370" width="424" height="341" fill="#F5F0E3" />
      <text className="serif" fontSize="30" fill="#35241C" letterSpacing="-0.5">
        {LINES.elevate.rows.map((r, i) => (
          <tspan key={r} x="58" y={417 + i * 32} className="slide-up" style={{ '--i': i + 1 }}>{r}</tspan>
        ))}
      </text>
      <text fontSize="8" fill="#35241C" className="sans">
        {LINES.refined.rows.map((l, i) => (
          <tspan key={l} x="58" y={514 + i * 12.5}>{l}</tspan>
        ))}
      </text>
      <WordmarkG x={58} y={651} width={134} fill="#875D41" />
      <text className="serif" fontSize="14" fill="#35241C" textAnchor="end">
        {LINES.imagination.rows.map((r, i) => (
          <tspan key={r} x="430" y={643 + i * 15}>{r}</tspan>
        ))}
      </text>
    </Art>
  );
}
