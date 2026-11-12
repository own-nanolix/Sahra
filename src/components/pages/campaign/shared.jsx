// Small building blocks shared by the campaign pieces: colours as hex for SVG attributes, a serif headline
// block, a wrapped sans paragraph, the three contact blocks. Text is SVG <text> with <tspan> lines.
// Entrance: each block sits in an inner <g> with a shared CSS keyframe class (slide-up / fade-in) that plays
// towards the finished artwork, so with animation off every piece is complete.
import { wrap } from '@/components/art/Devices';
import { CONTACT_BLOCKS } from '@/lib/brand';

export const K = {
  black: '#000000', choc: '#35241C', tribal: '#875D41', sand: '#B58F6B', beige: '#F5F0E3', white: '#FFFFFF',
  ink: '#1E140F', muted: '#5C4A3E', sandInk: '#7A5A3F', beigeMuted: '#CDBBA6',
  sand20: '#F0E9E1', sand40: '#E1D2C4', tribal20: '#E7DFD9', tribal40: '#CFBEB3',
};

// A block that slides up into place (opacity and transform only; no transform attribute on it).
export function Rise({ i = 0, kind = 'slide-up', children }) {
  return <g className={kind} style={{ '--i': i }}>{children}</g>;
}

// Headline voice: serif, tight leading, one <tspan> per printed line.
export function Serif({ rows, x, y, size, lh = 1.06, fill, anchor = 'start', ls = -0.02, ...rest }) {
  return (
    <text className="serif" fontSize={size} fill={fill} textAnchor={anchor} letterSpacing={ls * size} {...rest}>
      {rows.map((r, i) => <tspan key={r} x={x} y={y + i * size * lh}>{r}</tspan>)}
    </text>
  );
}

// Text voice: a paragraph wrapped to `max` characters per line.
export function Para({ text, x, y, size = 16, lh = 1.45, max = 46, fill, anchor = 'start', ...rest }) {
  const rows = wrap(text, max);
  return (
    <text className="sans" fontSize={size} fill={fill} textAnchor={anchor} letterSpacing={-0.005 * size} {...rest}>
      {rows.map((r, i) => <tspan key={i} x={x} y={y + i * size * lh}>{r}</tspan>)}
    </text>
  );
}
// Split a printed text into lines before each of the given starting words (the reference's own breaks), so the
// words stay verbatim and only the breaks are set.
export function splitAt(text, starts) {
  const rows = [];
  let rest = text;
  for (const s of starts) {
    const at = rest.indexOf(s);
    if (at <= 0) continue;
    rows.push(rest.slice(0, at).trim());
    rest = rest.slice(at);
  }
  rows.push(rest.trim());
  return rows;
}

// A justified paragraph, as on the posters (m11): every line but the last is set to the column width.
export function Justified({ rows, x, y, size, lh, width, fill }) {
  return (
    <g className="sans" fontSize={size} fill={fill}>
      {rows.map((r, i) => (
        <text key={i} x={x} y={r2(y + i * lh)} {...(i < rows.length - 1 ? { textLength: width, lengthAdjust: 'spacing' } : {})}>{r}</text>
      ))}
    </g>
  );
}
const r2 = (v) => Math.round(v * 100) / 100;

export const paraHeight =(text, max, size, lh = 1.45) => wrap(text, max).length * size * lh;

// The three contact blocks of the posters, stacked, very small (the linkedin line is never printed here).
// pitch (optional) places the blocks at a fixed distance, as printed: the first block keeps the room of the
// left-out linkedin line.
export function Contacts({ x, y, size = 15, gap = 22, fill, anchor = 'start', blocks, i = 5, pitch, lh: lhIn }) {
  const list = blocks || [CONTACT_BLOCKS.online, CONTACT_BLOCKS.service, CONTACT_BLOCKS.office];
  const lh = lhIn || size * 1.4;
  const tops = list.map((_, bi) => (pitch ? y + bi * pitch : y + list.slice(0, bi).reduce((a, b) => a + b.length * lh + gap, 0)));
  return (
    <g className="fade-in" style={{ '--i': i }}>
      {list.map((b, bi) => {
        const top = tops[bi];
        return (
          <text key={bi} className="sans" fontSize={size} fill={fill} textAnchor={anchor}>
            {b.map((l, li) => <tspan key={l} x={x} y={top + li * lh}>{l}</tspan>)}
          </text>
        );
      })}
    </g>
  );
}
export const contactsHeight = (size = 15, gap = 22, blocks) => {
  const list = blocks || [CONTACT_BLOCKS.online, CONTACT_BLOCKS.service, CONTACT_BLOCKS.office];
  return list.reduce((a, b) => a + b.length * size * 1.4 + gap, -gap);
};

// A vertical gradient that darkens the top of a photo field so beige headlines keep their contrast.
export function FadeDefs({ id, from = '#35241C', a = 0.6, to = 0, dir = 'v' }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={dir === 'v' ? 0 : 1} y2={dir === 'v' ? 1 : 0}>
      <stop offset="0" stopColor={from} stopOpacity={a} />
      <stop offset="1" stopColor={from} stopOpacity={to} />
    </linearGradient>
  );
}
