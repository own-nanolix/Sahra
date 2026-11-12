// Exportable artwork for the story steps: the intro slide (m02), the two posters (m11: a curved wall against the
// sky, a curved brick strip), and the hoarding (m16). Photographs are never reproduced: these are drawn fields.
import Art from '@/components/art/Art';
import { CurvedWallG, BrickCurveG, SkyPatchG, SteppedShadowG, CornerCutG } from '@/components/art/KeyArt';
import { WordmarkG, MarkG } from '@/components/art/Mark';
import { wrap } from '@/components/art/Devices';
import { INTRO, LINES, HOARDING, POSTER_BODY, SHEET, CONTACT } from '@/lib/brand';

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

// m11 (left): a dark framed poster, a curved wall against the sky, the line set in Beige.
export function WallSkyG({ idp = 'lp-home-wl' }) {
  return (
    <g>
      <rect width="480" height="640" fill="#1E140F" />
      <rect x="14" y="14" width="452" height="612" fill="none" stroke="#5C4A3E" strokeWidth="1" />
      <CurvedWallG idp={idp} x={28} y={28} w={424} h={584} />
      <text className="serif" fontSize="34" fill="#F5F0E3" letterSpacing="-0.6">
        {LINES.imagination.rows.map((r, i) => (
          <tspan key={r} x="52" y={500 + i * 38} className="slide-up" style={{ '--i': i + 1 }}>{r}</tspan>
        ))}
      </text>
      <MarkG x={52} y={64} size={30} fill="#B58F6B" />
      <text x="428" y="590" fontSize="11" fill="#F5F0E3" textAnchor="end" className="sans">{CONTACT.web}</text>
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

// m11 (right): a beige poster with a tall strip of curved brick at the right.
export function BrickPosterG({ idp = 'lp-home-bk' }) {
  const body = wrap(POSTER_BODY, 40);
  return (
    <g>
      <rect width="480" height="640" fill="#1E140F" />
      <rect x="28" y="28" width="424" height="584" fill="#F5F0E3" />
      <BrickCurveG idp={idp} x={360} y={28} w={92} h={584} courses={38} />
      <text className="serif" fontSize="35" fill="#35241C" letterSpacing="-0.6">
        {LINES.builtAround.rows.map((r, i) => (
          <tspan key={r} x="56" y={106 + i * 40} className="slide-up" style={{ '--i': i + 1 }}>{r}</tspan>
        ))}
      </text>
      <text fontSize="11.5" fill="#1E140F" className="sans">
        {body.map((l, i) => (
          <tspan key={i} x="56" y={290 + i * 17}>{l}</tspan>
        ))}
      </text>
      <MarkG x={56} y={556} size={30} fill="#B58F6B" />
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

// m16: the hoarding. Left two thirds a drawn court with a patch of sky, its lower right corner cut by one large
// radius; right third beige with the line, the sub line and the tribal-brown button.
export function HoardingArt() {
  const [a, b, c] = HOARDING.line.rows;
  return (
    <Art viewBox="0 0 900 560" title="Hoarding: refined living spaces" exportName="lp-home-hoarding">
      <rect width="900" height="560" fill="#F5F0E3" />
      <CornerCutG idp="lp-home-hd" x={0} y={0} w={590} h={560} rad={76} corner="br">
        <SkyPatchG idp="lp-home-hd-s" x={0} y={0} w={590} h={560} />
        <SteppedShadowG x={300} y={360} w={290} h={200} steps={7} fill="#A8743F" shade="#2A1C15" opacity="0.9" />
      </CornerCutG>
      <WordmarkG x={36} y={40} width={170} fill="#F5F0E3" />
      <text className="serif" fontSize="25" fill="#F5F0E3" letterSpacing="-0.4">
        {HOARDING.photoLine.rows.map((r, i) => (
          <tspan key={r} x="36" y={496 + i * 28}>{r}</tspan>
        ))}
      </text>
      <text className="serif" fontSize="25" fill="#35241C" letterSpacing="-0.4">
        {[a, b, c].map((r, i) => (
          <tspan key={r} x="616" y={100 + i * 31} className="slide-up" style={{ '--i': i + 1 }}>{r}</tspan>
        ))}
      </text>
      <text fontSize="13.5" fill="#35241C" className="sans">
        {HOARDING.sub.rows.map((r, i) => (
          <tspan key={r} x="616" y={214 + i * 20}>{r}</tspan>
        ))}
      </text>
      <rect x="616" y="496" width="126" height="38" rx="8" fill="#875D41" />
      <text x="679" y="520" fontSize="15" fill="#F5F0E3" textAnchor="middle" className="sans">{HOARDING.button}</text>
    </Art>
  );
}

// m14 (left): a framed poster, a patch of sky seen up a court, then a beige panel with the line, its sub line, the
// word-mark at the bottom left and "We Build Spaces of Imagination" at the bottom right.
export function SkyPosterArt() {
  const [a, b, c] = LINES.elevate.rows;
  return (
    <Art viewBox="0 0 480 640" title="Poster: spaces that elevate everyday living" exportName="lp-home-sky-poster">
      <rect width="480" height="640" fill="#1E140F" />
      <SkyPatchG idp="lp-home-sp" x={28} y={28} w={424} h={330} />
      <rect x="28" y="358" width="424" height="254" fill="#F5F0E3" />
      <text className="serif" fontSize="25" fill="#35241C" letterSpacing="-0.4">
        {[a, b, c].map((r, i) => (
          <tspan key={r} x="52" y={402 + i * 28} className="slide-up" style={{ "--i": i + 1 }}>{r}</tspan>
        ))}
      </text>
      <text fontSize="11" fill="#35241C" className="sans">
        {wrap(LINES.refined.text, 44).map((l, i) => (
          <tspan key={l} x="52" y={500 + i * 15}>{l}</tspan>
        ))}
      </text>
      <WordmarkG x={52} y={572} width={110} fill="#875D41" />
      <text className="serif" fontSize="12" fill="#35241C" textAnchor="end">
        {LINES.imagination.rows.map((r, i) => (
          <tspan key={r} x="428" y={578 + i * 15}>{r}</tspan>
        ))}
      </text>
    </Art>
  );
}
