import Art from '@/components/art/Art';
import { HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { CHARSET, FAMILY, INK, SANS_WEIGHTS, SCALE, SERIF_WEIGHTS } from './data';

const MUTED = HEX.muted;

// The primary typeface: the four weights of the brand serif, each with its name, a big "Aa" and a brand line.
export function PrimaryArt({ exportName = 'typography-primary' }) {
  return (
    <Art viewBox="0 0 900 620" title="Primary typeface: the four weights of the brand serif" exportName={exportName}>
      <rect width="900" height="620" fill="#FFFFFF" />
      <text className="serif" x="32" y="52" fontSize="30" fill={INK}>{FAMILY}</text>
      <text className="sans" x="32" y="76" fontSize="13" fill={MUTED}>Headlines and brand lines: sentence case, tight leading</text>
      {SERIF_WEIGHTS.map((w, i) => {
        const y = 100 + i * 128;
        return (
          <g key={w.name} className="slide-up" style={{ '--i': i }}>
            <line x1="32" x2="868" y1={y} y2={y} stroke={HEX.chocolate} strokeOpacity="0.4" />
            <text className="serif" x="32" y={y + 90} fontSize="92" fontWeight={w.value} fill={INK}>Aa</text>
            <text className="sans" x="220" y={y + 30} fontSize="13" fill={MUTED}>{FAMILY} {w.name}</text>
            <text className="serif" x="220" y={y + 76} fontSize="34" fontWeight={w.value} letterSpacing="-0.5" fill={INK}>{LINES.imagination.rows[0]}</text>
            <text className="serif" x="220" y={y + 112} fontSize="34" fontWeight={w.value} letterSpacing="-0.5" fill={INK}>{LINES.imagination.rows[1]}</text>
            <text className="sans" x="868" y={y + 30} fontSize="13" textAnchor="end" fill={MUTED}>{w.value}</text>
          </g>
        );
      })}
    </Art>
  );
}

// The secondary typeface: the light grotesque used for small text, set in its weights.
export function SecondaryArt({ exportName = 'typography-secondary' }) {
  return (
    <Art viewBox="0 0 900 500" title="Secondary typeface: the sans voice in three weights" exportName={exportName}>
      <rect width="900" height="500" fill={HEX.beige} />
      <text className="serif" x="32" y="52" fontSize="30" fill={INK}>The sans voice</text>
      <text className="sans" x="32" y="76" fontSize="13" fill={MUTED}>Body, contacts and labels: light to regular, slightly tight</text>
      {SANS_WEIGHTS.map((w, i) => {
        const y = 100 + i * 128;
        return (
          <g key={w.name} className="slide-up" style={{ '--i': i }}>
            <line x1="32" x2="868" y1={y} y2={y} stroke={HEX.chocolate} strokeOpacity="0.4" />
            <text className="sans" x="32" y={y + 86} fontSize="84" fontWeight={w.value} letterSpacing="-1.5" fill={INK}>Aa</text>
            <text className="sans" x="220" y={y + 30} fontSize="13" fill={MUTED}>Sans voice {w.name}</text>
            <text className="sans" x="220" y={y + 68} fontSize="21" fontWeight={w.value} letterSpacing="-0.3" fill={INK}>{LINES.refined.rows[0]}</text>
            <text className="sans" x="220" y={y + 96} fontSize="21" fontWeight={w.value} letterSpacing="-0.3" fill={INK}>{LINES.refined.rows[1]}</text>
            <text className="sans" x="868" y={y + 30} fontSize="13" textAnchor="end" fill={MUTED}>{w.value}</text>
          </g>
        );
      })}
    </Art>
  );
}

// The full type scale, each step at its own size.
export function ScaleArt({ exportName = 'typography-scale' }) {
  const heights = SCALE.map((s) => Math.round(s.size * s.lh) + 34);
  const tops = heights.map((_, i) => heights.slice(0, i).reduce((a, b) => a + b, 0));
  const H = tops[tops.length - 1] + heights[heights.length - 1] + 24;
  return (
    <Art viewBox={`0 0 1200 ${H}`} title="The type scale from Display to Contact, each step at its own size" exportName={exportName}>
      <rect width="1200" height={H} fill="#FFFFFF" />
      {SCALE.map((s, i) => {
        const y = tops[i] + 12;
        const base = y + Math.round(s.size * 0.95) + 6;
        return (
          <g key={s.cls} className="slide-up" style={{ '--i': i }}>
            <line x1="0" x2="1200" y1={y} y2={y} stroke={HEX.chocolate} strokeOpacity="0.3" />
            <text className="sans" x="8" y={y + 26} fontSize="14" fill={INK}>{s.name}</text>
            <text className="sans" x="8" y={y + 44} fontSize="12" fill={MUTED}>{s.size} px / {s.lh} / {s.track} em</text>
            <text className={s.voice} x="300" y={base} fontSize={s.size} letterSpacing={r2(s.size * s.track)} fill={INK}>{s.sample}</text>
          </g>
        );
      })}
    </Art>
  );
}

// The character set as published (m06) and every glyph in its own cell.
export function CharsetArt({ exportName = 'typography-charset' }) {
  const glyphs = Array.from(CHARSET.join(''));
  const per = 20;
  const cw = 56;
  return (
    <Art viewBox={`0 0 1200 ${400 + Math.ceil(glyphs.length / per) * 70}`} title="Character set: capitals, lower case, figures and symbols" exportName={exportName}>
      <rect width="1200" height={400 + Math.ceil(glyphs.length / per) * 70} fill={HEX.beige} />
      {CHARSET.map((row, i) => (
        <text key={row} className="serif" x="24" y={72 + i * 76} fontSize="52" letterSpacing="-0.5" fill={INK}>{row}</text>
      ))}
      <line x1="24" x2="1176" y1="352" y2="352" stroke={HEX.chocolate} strokeOpacity="0.4" />
      {glyphs.map((g, i) => {
        const x = 24 + (i % per) * cw;
        const y = 372 + Math.floor(i / per) * 70;
        return (
          <g key={i} className="fade-in" style={{ '--i': i % 20 }}>
            <rect x={x} y={y} width={cw - 4} height="66" fill="#FFFFFF" stroke={HEX.chocolate} strokeOpacity="0.16" />
            <text className="serif" x={x + (cw - 4) / 2} y={y + 44} fontSize="32" textAnchor="middle" fill={INK}>{g}</text>
          </g>
        );
      })}
    </Art>
  );
}
