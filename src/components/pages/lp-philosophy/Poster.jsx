import Link from 'next/link';
import Art from '@/components/art/Art';
import { SkyPatchG } from '@/components/art/KeyArt';
import { WordmarkG } from '@/components/art/Mark';
import { r2 } from '@/lib/charts';
import { LINES, HEX, POSTER_BODY, CONTACT_BLOCKS } from '@/lib/brand';
import { Contact } from '@/components/ui/Card';
import s from './lp-philosophy.module.css';

// The left half of m14, rebuilt as a scene: a framed poster on a wall of vertical fins under a dark ceiling, light
// from the upper left, a hard shadow to the lower right. The poster's photograph is a drawn court and sky patch
// (never traced); its beige panel carries the printed lines.
const FIN = 50;
const FINS = 32;
const FIN_TONES = ['#7B6948', '#6E5D3F'];

export default function Poster() {
  const fx = 582, fy = 172, fw = 436, fh = 576;
  const split = fy + fh * 0.62;
  return (
    <section className={s.poster} id="lp-philosophy-poster" aria-labelledby="lp-philosophy-poster-title">
      <h2 id="lp-philosophy-poster-title" className="sr-only">{LINES.elevate.text}</h2>
      <Art viewBox="0 0 1600 900" title="Framed poster on a wall of vertical fins" exportName="lp-philosophy-poster" className={s.posterSvg}>
        <rect width="1600" height="900" fill="#3A322A" />
        <rect y="0" width="1600" height="110" fill="#26211C" />
        {Array.from({ length: FINS }, (_, i) => (
          <g key={i} className="fade-in" style={{ '--i': i % 16 }}>
            <rect x={i * FIN} y="110" width={FIN} height="680" fill={FIN_TONES[i % 2]} />
            <rect x={i * FIN + FIN * 0.62} y="110" width={FIN * 0.38} height="680" fill="#000000" opacity="0.28" />
            <rect x={i * FIN} y="110" width="3" height="680" fill="#FFFFFF" opacity="0.08" />
          </g>
        ))}
        <rect y="790" width="1600" height="110" fill="#5A534C" />
        <rect y="790" width="1600" height="3" fill="#000000" opacity="0.35" />
        <g className="sun-shadow">
          <rect x={fx - 22 + 24} y={fy - 22 + 28} width={fw + 44} height={fh + 44} fill="#000000" opacity="0.34" />
        </g>
        <g className="mock-place" style={{ '--i': 1 }}>
          <rect x={fx - 22} y={fy - 22} width={fw + 44} height={fh + 44} fill="#14100D" />
          <rect x={fx} y={fy} width={fw} height={fh} fill={HEX.beige} />
          <SkyPatchG idp="lp-philosophy-poster" x={fx} y={fy} w={fw} h={r2(split - fy)} />
          <g className="sans" fill={HEX.ink}>
            {LINES.elevate.rows.map((r, i) => (
              <text key={r} x={fx + 26} y={r2(split + 56 + i * 37)} fontSize="33" letterSpacing="-0.6" className="serif">{r}</text>
            ))}
            {LINES.refined.rows.map((r, i) => (
              <text key={r} x={fx + 26} y={r2(split + 150 + i * 14)} fontSize="10.5" fill={HEX.muted}>{r}</text>
            ))}
          </g>
          <WordmarkG x={fx + 26} y={fy + fh - 36} width={112} fill={HEX.tribal} />
          <text className="serif" fontSize="13" textAnchor="end" fill={HEX.ink}>
            <tspan x={fx + fw - 26} y={fy + fh - 40}>We Build Spaces</tspan>
            <tspan x={fx + fw - 26} y={fy + fh - 24}>of Imagination</tspan>
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
