import Art from '@/components/art/Art';
import { CONTACT_BLOCKS, HEX, LINES, URL_LINE } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { INK, SCALE } from './data';

const MUTED = HEX.muted;

// Leading: the same brand line at 1.05 (the brand), 1.3 and 1.6.
export function LeadingArt({ exportName = 'typography-leading' }) {
  const cols = [1.05, 1.3, 1.6];
  const size = 36;
  return (
    <Art viewBox="0 0 1200 330" title="Leading study: the brand line at 1.05, 1.3 and 1.6" exportName={exportName}>
      <rect width="1200" height="330" fill={HEX.beige} />
      {cols.map((lh, c) => {
        const x = 24 + c * 392;
        return (
          <g key={lh} className="slide-up" style={{ '--i': c * 2 }}>
            {LINES.elevate.rows.map((row, i) => {
              const y = 70 + i * size * lh;
              return (
                <g key={row}>
                  <line x1={x} x2={x + 340} y1={r2(y)} y2={r2(y)} stroke={HEX.tribal} strokeOpacity="0.45" />
                  <text className="serif" x={x} y={r2(y)} fontSize={size} letterSpacing="-0.7" fill={INK}>{row}</text>
                </g>
              );
            })}
            <text className="sans" x={x} y="262" fontSize="14" fill={INK}>{lh === 1.05 ? 'Leading 1.05: the brand' : `Leading ${lh}`}</text>
            <text className="sans" x={x} y="282" fontSize="12" fill={MUTED}>{r2(size * lh)} px between baselines at {size} px</text>
          </g>
        );
      })}
    </Art>
  );
}

// Line-breaking habits: short lines, and "design" and "and" pushed to opposite ends of the third line (m14).
export function BreaksArt({ exportName = 'typography-breaks' }) {
  const rows = LINES.designing.rows;
  return (
    <Art viewBox="0 0 1200 560" title="Line-breaking habits: one long line against two or three short lines, and a line pushed to both ends" exportName={exportName}>
      <rect width="1200" height="560" fill={HEX.white} />
      <text className="sans" x="24" y="40" fontSize="13" fill={MUTED}>One long line</text>
      <text className="serif" x="24" y="84" fontSize="30" letterSpacing="-0.4" fill={INK} opacity="0.55">{LINES.elevate.text}</text>
      <line x1="24" x2="1176" y1="108" y2="108" stroke={HEX.chocolate} strokeOpacity="0.3" />
      <text className="sans" x="24" y="148" fontSize="13" fill={MUTED}>Two or three short lines</text>
      <g className="slide-up">
        {LINES.elevate.rows.map((row, i) => (
          <text key={row} className="serif" x="24" y={206 + i * 54} fontSize="52" letterSpacing="-1" fill={INK}>{row}</text>
        ))}
      </g>
      <rect x="640" y="132" width="536" height="404" fill={HEX.black} />
      <text className="sans" x="664" y="164" fontSize="13" fill={HEX.beigeMuted}>Pushed to opposite ends</text>
      <g className="slide-up" style={{ '--i': 2 }}>
        {rows.map((row, i) => {
          const y = 226 + i * 56;
          if (Array.isArray(row)) {
            return (
              <g key={i}>
                <text className="serif" x="664" y={y} fontSize="44" letterSpacing="-0.7" fill={HEX.beige}>{row[0]}</text>
                <text className="serif" x="1152" y={y} fontSize="44" letterSpacing="-0.7" textAnchor="end" fill={HEX.beige}>{row[1]}</text>
              </g>
            );
          }
          return <text key={row} className="serif" x="664" y={y} fontSize="44" letterSpacing="-0.7" fill={HEX.beige}>{row}</text>;
        })}
      </g>
    </Art>
  );
}

// Line boxes: the leading of four steps shown as alternating bands, one band per line.
export function BoxesArt({ exportName = 'typography-line-boxes' }) {
  const picks = ['t-h2', 't-h3', 't-body', 't-small'].map((c) => SCALE.find((s) => s.cls === c));
  const widths = [420, 300, 190, 150];
  const xs = widths.map((_, i) => 24 + widths.slice(0, i).reduce((a, b) => a + b + 40, 0));
  return (
    <Art viewBox="0 0 1200 330" title="Line boxes: how much room each step gives a line" exportName={exportName}>
      <rect width="1200" height="330" fill={HEX.white} />
      {picks.map((p, c) => {
        const lh = p.size * p.lh;
        return (
          <g key={p.cls} className="fade-in" style={{ '--i': c * 2 }}>
            {LINES.elevate.rows.map((row, i) => (
              <g key={row}>
                <rect x={xs[c]} y={r2(40 + i * lh)} width={widths[c]} height={r2(lh)} fill={i % 2 ? HEX.beige : HEX.sand} fillOpacity={i % 2 ? 1 : 0.35} />
                <text className={p.voice} x={xs[c] + 6} y={r2(40 + i * lh + (lh - p.size) / 2 + p.size * 0.8)} fontSize={p.size} letterSpacing={r2(p.size * p.track)} fill={INK}>{row}</text>
              </g>
            ))}
            <text className="sans" x={xs[c]} y="250" fontSize="14" fill={INK}>{p.name}</text>
            <text className="sans" x={xs[c]} y="270" fontSize="12" fill={MUTED}>{p.size} / {r2(p.size * p.lh)} px ({p.lh})</text>
          </g>
        );
      })}
    </Art>
  );
}

// The web address: "→ sahra.sa" on light, on dark, and as the button.
export function UrlArt({ exportName = 'typography-url' }) {
  return (
    <Art viewBox="0 0 900 300" title="The web address style: an arrow, then sahra.sa" exportName={exportName}>
      <rect width="450" height="300" fill={HEX.beige} />
      <rect x="450" width="450" height="300" fill={HEX.chocolate} />
      <text className="sans" x="32" y="44" fontSize="13" fill={MUTED}>On Beige: Tribal Brown</text>
      <text className="sans" x="482" y="44" fontSize="13" fill={HEX.beigeMuted}>On Dark Chocolate: Sand</text>
      <g className="slide-up">
        <text className="sans" x="32" y="130" fontSize="40" letterSpacing="-0.6" fill={HEX.tribal}>{URL_LINE}</text>
        <text className="sans" x="482" y="130" fontSize="40" letterSpacing="-0.6" fill={HEX.sand}>{URL_LINE}</text>
      </g>
      <g className="slide-up" style={{ '--i': 2 }}>
        <text className="sans" x="32" y="180" fontSize="13" fill={HEX.tribal}>{URL_LINE}</text>
        <text className="sans" x="482" y="180" fontSize="13" fill={HEX.sand}>{URL_LINE}</text>
      </g>
      <g className="slide-up" style={{ '--i': 3 }}>
        <rect x="32" y="206" width="148" height="44" rx="8" fill={HEX.tribal} />
        <text className="sans" x="106" y="233" fontSize="16" textAnchor="middle" fill={HEX.beige}>{URL_LINE}</text>
        <text className="sans" x="482" y="233" fontSize="13" fill={HEX.beige}>{CONTACT_BLOCKS.online[0]}</text>
      </g>
    </Art>
  );
}

// Contacts: stacked blocks of short lines, very small.
export function ContactsArt({ exportName = 'typography-contacts' }) {
  const blocks = [CONTACT_BLOCKS.office, CONTACT_BLOCKS.service, CONTACT_BLOCKS.online];
  return (
    <Art viewBox="0 0 900 260" title="Contact blocks: short stacked lines set very small" exportName={exportName}>
      <rect width="900" height="260" fill={HEX.white} />
      <rect y="150" width="900" height="110" fill={HEX.chocolate} />
      {blocks.map((b, i) => (
        <g key={i} className="slide-up" style={{ '--i': i }}>
          {b.map((line, k) => (
            <text key={line} className="sans" x={32 + i * 230} y={r2(60 + k * 12 * 1.38 * 1.5)} fontSize="18" fill={INK}>{line}</text>
          ))}
          {b.map((line, k) => (
            <text key={line} className="sans" x={32 + i * 230} y={r2(186 + k * 12 * 1.38 * 1.3)} fontSize="12" fill={HEX.beige}>{line}</text>
          ))}
        </g>
      ))}
      <text className="sans" x="32" y="118" fontSize="12" fill={MUTED}>12 px / 1.38 on light, shown enlarged above</text>
    </Art>
  );
}
