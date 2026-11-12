import Link from 'next/link';
import Art from '@/components/art/Art';
import { SkyPatchG } from '@/components/art/KeyArt';
import { WordmarkG } from '@/components/art/Mark';
import { r2 } from '@/lib/charts';
import { LINES, HEX, POSTER_BODY, CONTACT_BLOCKS } from '@/lib/brand';
import { Contact } from '@/components/ui/Card';
import { SCENE, SHADOW_INK } from '@/components/art/Mockup';
import s from './lp-philosophy.module.css';

// The left half of m14, rebuilt as a scene: a framed poster on a wall of vertical fins under a dark ceiling, light
// from the upper left, a hard shadow to the lower right. The poster's photograph is a drawn court and sky patch
// (never traced); its beige panel carries the printed lines.
// Scene in brand colours only (SCENE): fins in Tribal Brown with their shaded faces, a Dark Chocolate ceiling, a
// Sand floor. The poster is 0.62 wide to high as printed; its type is placed as fractions of the poster measured
// from the full-size original: the line from 57 % of the height (7 % of the width high), the sub line at 71 %,
// the word-mark (31.5 % wide) at 93 %, "We Build Spaces of Imagination" set right at 90 %.
const FIN = 50;
const FINS = 32;
const FIN_TONES = [SCENE.tribal, HEX.sandInk];

export default function Poster() {
  const fx = 582, fy = 150, fw = 436, fh = 702;
  const at = (f) => r2(fy + fh * f);
  return (
    <section className={s.poster} id="lp-philosophy-poster" aria-labelledby="lp-philosophy-poster-title">
      <h2 id="lp-philosophy-poster-title" className="sr-only">{LINES.elevate.text}</h2>
      <Art viewBox="0 0 1600 1000" title="Framed poster on a wall of vertical fins" exportName="lp-philosophy-poster" className={s.posterSvg}>
        <rect width="1600" height="1000" fill={SCENE.chocolate} />
        {Array.from({ length: FINS }, (_, i) => (
          <g key={i} className="fade-in" style={{ '--i': i % 16 }}>
            <rect x={i * FIN} y="110" width={FIN} height="790" fill={FIN_TONES[i % 2]} />
            <rect x={i * FIN + FIN * 0.62} y="110" width={FIN * 0.38} height="790" fill={SHADOW_INK} opacity="0.4" />
            <rect x={i * FIN} y="110" width="3" height="790" fill={SCENE.white} opacity="0.1" />
          </g>
        ))}
        <rect y="900" width="1600" height="100" fill={SCENE.sand} />
        <rect y="900" width="1600" height="3" fill={SHADOW_INK} opacity="0.5" />
        <g className="sun-shadow">
          <rect x={fx - 22 + 24} y={fy - 22 + 28} width={fw + 44} height={fh + 44} fill={SHADOW_INK} opacity="0.6" />
        </g>
        <g className="mock-place" style={{ '--i': 1 }}>
          <rect x={fx - 22} y={fy - 22} width={fw + 44} height={fh + 44} fill={SCENE.black} />
          <rect x={fx} y={fy} width={fw} height={fh} fill={HEX.beige} />
          <SkyPatchG idp="lp-philosophy-poster" x={fx} y={fy} w={fw} h={r2(fh * 0.5)} />
          <g className="sans" fill={HEX.ink}>
            {LINES.elevate.rows.map((r, i) => (
              <text key={r} x={fx + 31} y={r2(at(0.569) + i * 32)} fontSize="30.5" letterSpacing="-0.5" className="serif">{r}</text>
            ))}
            {LINES.refined.rows.map((r, i) => (
              <text key={r} x={fx + 31} y={r2(at(0.712) + i * 12.5)} fontSize="8.3">{r}</text>
            ))}
          </g>
          <WordmarkG x={fx + 31} y={r2(at(0.93) - 12)} width={137} fill={HEX.tribal} />
          <text className="serif" fontSize="14.4" textAnchor="end" fill={HEX.ink}>
            <tspan x={r2(fx + fw * 0.949)} y={at(0.9)}>We Build Spaces</tspan>
            <tspan x={r2(fx + fw * 0.949)} y={at(0.923)}>of Imagination</tspan>
          </text>
          <rect x={fx} y={fy} width={fw} height={fh} fill="url(#lp-philosophy-poster-glaze)" />
          <defs>
            <linearGradient id="lp-philosophy-poster-glaze" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.1" />
              <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </g>
      </Art>
      <div className={`wrap ${s.posterCap}`}>
        <p className={s.posterBody}>{POSTER_BODY}</p>
        <Contact lines={CONTACT_BLOCKS.online} />
        <Link href="/lp-contact/" className="site-url on-dark">sahra.sa</Link>
      </div>
    </section>
  );
}
