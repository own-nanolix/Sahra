import Art from '@/components/art/Art';
import { QuarterArchG } from '@/components/art/KeyArt';
import { arcPath, arcLength, bandPath, polar, r2 } from '@/lib/charts';
import { HEX } from '@/lib/brand';
import s from './lp-philosophy.module.css';

// The quarter arch of the story: a thick quarter ring with its centre at the lower right of the frame, cut into
// equal segments that fill one by one. Segment i is "on" when it has been reached; the current one is darker.
const C = 600;
const R_IN = 236;
const R_OUT = 590;
const GAP = 1.1; // degrees between segments

export const SEGMENTS = 6;

export function ArchFill({ active = 0, count = SEGMENTS, exportName = 'lp-philosophy-arch-fill', className }) {
  const span = 90 / count;
  return (
    <Art viewBox="0 0 600 600" title="Quarter arch filling step by step" exportName={exportName} className={className}>
      <g fill="none" stroke={HEX.tribal} strokeWidth="1" opacity="0.55">
        <path d={arcPath(C, C, R_IN - 14, 270, 360)} className="draw" style={{ '--len': arcLength(R_IN - 14, 0, 90), '--i': 0 }} />
        <path d={arcPath(C, C, R_OUT + 8, 270, 360)} className="draw" style={{ '--len': arcLength(R_OUT + 8, 0, 90), '--i': 2 }} />
        <path d={arcPath(C, C, 150, 270, 360)} className="draw" style={{ '--len': arcLength(150, 0, 90), '--i': 4 }} strokeDasharray="2 7" />
        {Array.from({ length: count + 1 }, (_, i) => {
          const [x0, y0] = polar(C, C, R_IN - 30, 270 + i * span);
          const [x1, y1] = polar(C, C, R_OUT + 20, 270 + i * span);
          return <path key={i} d={`M${x0} ${y0}L${x1} ${y1}`} strokeOpacity="0.35" className="fade-in" style={{ '--i': i + 3 }} />;
        })}
      </g>
      <g>
        {Array.from({ length: count }, (_, i) => {
          const a0 = 270 + i * span + GAP / 2;
          const a1 = 270 + (i + 1) * span - GAP / 2;
          return (
            <path
              key={i}
              d={bandPath(C, C, R_IN, R_OUT, a0, a1)}
              className={`${s.seg} fade-in`}
              style={{ '--i': i + 1 }}
              data-on={i <= active ? 'true' : 'false'}
              data-now={i === active ? 'true' : 'false'}
            />
          );
        })}
      </g>
    </Art>
  );
}

// Nested quarter arches, as the ruler of the philosophy: rings of equal width that thin out towards the corner.
// Decorative sign-off for the statement section; exportable.
export function ArchRings({ rings = 6, className }) {
  const w = 34;
  const gap = 12;
  return (
    <Art viewBox="0 0 520 520" title="Nested quarter arches" exportName="lp-philosophy-arch-rings" className={className}>
      {Array.from({ length: rings }, (_, i) => {
        const r = 60 + i * (w + gap);
        const op = r2(0.95 - i * 0.14);
        return (
          <g key={i} className="fade-in" style={{ '--i': i * 2 }}>
            <QuarterArchG cx={520} cy={520} r={r} R={r + w} quadrant="tl" fill={i % 2 ? HEX.tribal : HEX.sand} opacity={op} />
          </g>
        );
      })}
    </Art>
  );
}
