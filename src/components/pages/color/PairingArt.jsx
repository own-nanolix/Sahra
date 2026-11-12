import Art from '@/components/art/Art';
import { HEX, LINES } from '@/lib/brand';
import { SEMANTIC, grade, ratio } from './data';

// A quarter ring in the bottom-right corner of a w x h box (the quarter arch, the brand's second shape).
const ring = (w, h, R, r) => `M${w} ${h - R}A${R} ${R} 0 0 0 ${w - R} ${h}L${w - r} ${h}A${r} ${r} 0 0 1 ${w} ${h - r}Z`;

// One pairing: a ground, a brand line in the text colour, a small line, the computed ratio and its grade.
export function PairingArt({ pair, exportName }) {
  const r = Number(ratio(pair.fg, pair.bg));
  const g = grade(r);
  const W = 480;
  const H = 300;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`${pair.fgName} on ${pair.bgName}, contrast ${r.toFixed(2)} to 1, ${g.label}`} exportName={exportName}>
      <rect width={W} height={H} fill={pair.bg} />
      <g className="fade-in">
        <path d={ring(W, H, 150, 96)} fill={pair.fg} opacity="0.16" />
      </g>
      <g className="slide-up">
        {LINES.elevate.rows.map((row, i) => (
          <text key={row} className="serif" x="32" y={78 + i * 36} fontSize="32" letterSpacing="-0.5" fill={pair.fg}>{row}</text>
        ))}
      </g>
      <g className="slide-up" style={{ '--i': 2 }}>
        <text className="sans" x="32" y="204" fontSize="13" fill={pair.fg}>{LINES.refined.rows[0]}</text>
        <text className="sans" x="32" y="221" fontSize="13" fill={pair.fg}>{LINES.refined.rows[1]}</text>
      </g>
      <line x1="32" x2="200" y1="248" y2="248" stroke={pair.fg} strokeOpacity="0.5" />
      <text className="sans" x="32" y="272" fontSize="13" fill={pair.fg}>{pair.fgName} on {pair.bgName}</text>
      <text className="serif" x={W - 28} y="42" fontSize="30" textAnchor="end" fill={pair.fg}>{r.toFixed(2)}:1</text>
      <text className="sans" x={W - 28} y="62" fontSize="13" textAnchor="end" fill={pair.fg}>{g.label}</text>
    </Art>
  );
}

// The semantic tokens of one mode as a miniature of a page: the ground, a surface card and the token rows.
export function SemanticArt({ mode, exportName }) {
  const m = SEMANTIC[mode];
  const dark = mode === 'dark';
  const fg = dark ? HEX.beige : HEX.ink;
  const mu = dark ? HEX.beigeMuted : HEX.muted;
  const surface = dark ? HEX.black : HEX.white;
  const W = 560;
  const rowH = 46;
  const H = 150 + m.rows.length * rowH;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`${m.name}: semantic colour tokens with computed contrast`} exportName={exportName}>
      <rect width={W} height={H} fill={m.ground} />
      <text className="serif" x="28" y="52" fontSize="28" fill={fg}>{m.name}</text>
      <text className="sans" x="28" y="76" fontSize="13" fill={mu}>Token, colour, contrast on its ground</text>
      <rect x="16" y="98" width={W - 32} height={H - 114} rx="18" fill={surface} />
      {m.rows.map((row, i) => {
        const y = 98 + 18 + i * rowH;
        const rr = row.on ? Number(ratio(row.hex, row.on)) : null;
        return (
          <g key={`${row.name}-${i}`} className="slide-up" style={{ '--i': i }}>
            <rect x="36" y={y} width="30" height="30" rx="6" fill={row.hex} stroke={fg} strokeOpacity="0.3" />
            <text className="sans" x="80" y={y + 13} fontSize="14" fill={fg}>{row.name}</text>
            <text className="sans" x="80" y={y + 28} fontSize="12" fill={mu}>{row.token}  {row.hex}</text>
            <text className="sans" x={W - 36} y={y + 13} fontSize="14" textAnchor="end" fill={fg}>{rr ? `${rr.toFixed(2)}:1` : 'Ground'}</text>
            {rr ? <text className="sans" x={W - 36} y={y + 28} fontSize="12" textAnchor="end" fill={mu}>{grade(rr).label}</text> : null}
          </g>
        );
      })}
    </Art>
  );
}
