import Art from '@/components/art/Art';
import { wrap } from '@/components/art/Devices';
import { MarkG } from '@/components/art/Mark';
import { CONTACT_BLOCKS, HEX, LINES, POSTER_BODY, CONTACT } from '@/lib/brand';
import { INK } from './data';

// The black poster of m14 (right half), 800 x 1143: the headline in four lines with "design" and "and" pushed
// to opposite ends of the third, the Sand mark bottom left and the address bottom right.
function BlackPosterG() {
  const rows = LINES.designing.rows;
  return (
    <g>
      <rect width="800" height="1143" fill={HEX.black} />
      <g className="slide-up">
        {rows.map((row, i) => {
          const y = 124 + i * 73;
          if (Array.isArray(row)) {
            return (
              <g key={i}>
                <text className="serif" x="63" y={y} fontSize="66" letterSpacing="-1.3" fill={HEX.beige}>{row[0]}</text>
                <text className="serif" x="652" y={y} fontSize="66" letterSpacing="-1.3" textAnchor="end" fill={HEX.beige}>{row[1]}</text>
              </g>
            );
          }
          return <text key={row} className="serif" x="63" y={y} fontSize="66" letterSpacing="-1.3" fill={HEX.beige}>{row}</text>;
        })}
      </g>
      <g className="fade-in" style={{ '--i': 4 }}>
        <MarkG x={63} y={1010} size={56} fill={HEX.sand} />
        <text className="sans" x="732" y="1062" fontSize="22" textAnchor="end" letterSpacing="-0.3" fill={HEX.beige}>{CONTACT.web}</text>
      </g>
    </g>
  );
}

export function BlackPoster({ exportName = 'typography-poster-black' }) {
  return (
    <Art viewBox="0 0 800 1143" title="Poster on black: Designing spaces that connect purpose, design and modern living" exportName={exportName}>
      <BlackPosterG />
    </Art>
  );
}

// The beige poster of m11: a headline, the body paragraph, three contact blocks and the mark; a tall strip of
// warm architecture (drawn as a flat gradient, never a photograph) at the right.
export function BeigePoster({ exportName = 'typography-poster-beige' }) {
  const body = wrap(POSTER_BODY, 50);
  const blocks = [CONTACT_BLOCKS.online, CONTACT_BLOCKS.service, CONTACT_BLOCKS.office];
  return (
    <Art viewBox="0 0 800 1143" title="Poster on beige: Built around how people live today" exportName={exportName}>
      <defs>
        <linearGradient id="typography-strip" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#C79A62" />
          <stop offset="0.5" stopColor={HEX.timber} />
          <stop offset="1" stopColor="#6E4524" />
        </linearGradient>
      </defs>
      <rect width="800" height="1143" fill={HEX.beige} />
      <rect x="610" y="60" width="150" height="1023" fill="url(#typography-strip)" />
      <g className="slide-up">
        {LINES.builtAround.rows.map((row, i) => (
          <text key={row} className="serif" x="56" y={150 + i * 62} fontSize="58" letterSpacing="-1.1" fill={INK}>{row}</text>
        ))}
      </g>
      <g className="slide-up" style={{ '--i': 2 }}>
        {body.map((line, i) => (
          <text key={i} className="sans" x="56" y={470 + i * 22} fontSize="14" fill={INK}>{line}</text>
        ))}
      </g>
      <g className="fade-in" style={{ '--i': 4 }}>
        {blocks.map((b, i) => (
          <g key={i}>
            {b.map((line, k) => (
              <text key={line} className="sans" x={56 + i * 168} y={920 + k * 16.5} fontSize="12" fill={INK}>{line}</text>
            ))}
          </g>
        ))}
        <MarkG x={56} y={1010} size={48} fill={HEX.tribal} />
      </g>
    </Art>
  );
}

const NOTES = [
  { no: '1', title: 'The headline', text: ['Serif, sentence case, 66 px.', 'Four short lines, leading about 1.1.'], at: [28, 96] },
  { no: '2', title: 'The push', text: ['The third line sends "design" and', '"and" to opposite ends.'], at: [28, 244] },
  { no: '3', title: 'The mark', text: ['Sand, small, bottom left.'], at: [28, 1020] },
  { no: '4', title: 'The address', text: ['www.sahra.sa, the sans voice,', 'bottom right.'], at: [770, 1054] },
];

// Hierarchy in use: the black poster with its four levels numbered and described.
export function HierarchyArt({ exportName = 'typography-hierarchy' }) {
  return (
    <Art viewBox="0 0 1500 1143" title="Hierarchy in use: the black poster with headline, push, mark and address marked" exportName={exportName}>
      <rect width="1500" height="1143" fill={HEX.beige} />
      <BlackPosterG />
      {NOTES.map((n, i) => (
        <g key={n.no} className="fade-in" style={{ '--i': 6 + i }}>
          <circle cx={n.at[0]} cy={n.at[1]} r="14" fill={HEX.sand} />
          <text className="sans" x={n.at[0]} y={n.at[1] + 5} fontSize="14" textAnchor="middle" fill={HEX.chocolate}>{n.no}</text>
        </g>
      ))}
      {NOTES.map((n, i) => {
        const y = 150 + i * 200;
        return (
          <g key={n.no} className="slide-up" style={{ '--i': 3 + i }}>
            <line x1="860" x2="1440" y1={y - 40} y2={y - 40} stroke={HEX.chocolate} strokeOpacity="0.4" />
            <text className="sans" x="860" y={y - 8} fontSize="14" fill={HEX.muted}>{n.no}</text>
            <text className="serif" x="910" y={y} fontSize="40" letterSpacing="-0.6" fill={INK}>{n.title}</text>
            {n.text.map((t, k) => (
              <text key={k} className="sans" x="910" y={y + 36 + k * 24} fontSize="18" fill={INK}>{t}</text>
            ))}
          </g>
        );
      })}
    </Art>
  );
}
