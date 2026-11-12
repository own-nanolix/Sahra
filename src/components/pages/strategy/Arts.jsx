// Exportable diagrams of the strategy page. Each is drawn from the case study's own words: the problem and the
// refined answer, the scope of work as four steps, "vision meets reality", the journey of discovery, belonging and
// aspiration, the project sheet, the three ruled rows. No figure is shown that the case study does not print.
// Animation is CSS only (the shared classes), playing from a start state towards the finished artwork.
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { QuarterArchG, DRAWING } from '@/components/art/KeyArt';
import { wrap } from '@/components/art/Devices';
import { HEX, TINTS, SCOPE, SHEET, ABOUT } from '@/lib/brand';
import { r2, smoothPath, barPath, seeded } from '@/lib/charts';

// A line that draws on: its length is measured as 1 so one rule fits every path.
const drawProps = (i) => ({ className: 'draw', pathLength: 1, style: { '--len': 1, '--i': i } });

// ---------- 1. The problem and its answer: tangled choices resolving into one refined line ----------
export function ProblemArt() {
  const W = 480;
  const H = 360;
  const rnd = seeded(11);
  const left = ['complexity', 'rigidity', 'overwhelming choices'];
  const right = ['refined', 'human-centered', 'seamless'];
  const ly = [92, 168, 244];
  const ry = [112, 168, 224];
  // Each of the three tangles is two crossing strokes that wander, then settle onto one straight line.
  const tangles = left.flatMap((_, i) =>
    [0, 1].map((k) => {
      const y0 = ly[i];
      const wobble = () => (rnd() - 0.5) * 120;
      const pts = [
        [170, y0],
        [205, y0 + wobble() * 0.6],
        [240, y0 + wobble() * 0.7],
        [285, 168 + wobble() * 0.4 * (1 - k * 0.4)],
        [330, ry[i]],
        [340, ry[i]],
      ];
      return { d: smoothPath(pts, 0.9), key: `${i}-${k}`, i, k };
    }),
  );
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Complexity, rigidity and overwhelming choices resolving into a refined, human-centered and seamless line" exportName="strategy-problem">
      <rect width={W} height={H} fill={HEX.white} />
      <text x="24" y="40" className="sans" fontSize="13" fill={HEX.muted}>The first impression</text>
      <text x={W - 24} y="40" textAnchor="end" className="sans" fontSize="13" fill={HEX.muted}>Sahra introduces</text>
      <g fill="none" strokeLinecap="butt">
        {tangles.map((t) => (
          <path key={t.key} d={t.d} stroke={t.k ? HEX.sand : HEX.chocolate} strokeWidth="1.4" opacity={t.k ? 0.9 : 0.55} {...drawProps(t.i * 2 + t.k)} />
        ))}
        {ry.map((y, i) => (
          <path key={y} d={`M340 ${y}H${W - 24}`} stroke={HEX.tribal} strokeWidth="4" {...drawProps(8 + i)} />
        ))}
      </g>
      {left.map((w, i) => (
        <text key={w} x="24" y={ly[i] - 12} className="sans fade-in" fontSize="13" fill={HEX.muted} style={{ '--i': i }}>{w}</text>
      ))}
      {right.map((w, i) => (
        <text key={w} x={W - 24} y={ry[i] - 12} textAnchor="end" className="serif fade-in" fontSize="17" fill={HEX.tribal} style={{ '--i': 10 + i }}>{w}</text>
      ))}
      <text x="24" y={H - 28} className="serif fade-in" fontSize="19" fill={HEX.chocolate} style={{ '--i': 14 }}>redefining how people connect with spaces</text>
    </Art>
  );
}

// ---------- 2. The scope of work as four steps, the first (Positioning) lit ----------
export function ScopeArt() {
  const W = 800;
  const H = 340;
  const base = 288;
  const stepW = 168;
  const gap = 16;
  const x0 = 40;
  const heights = [74, 126, 178, 230];
  const fills = [HEX.tribal, TINTS.sand[1], TINTS.sand[2], TINTS.sand[3]];
  const ink = [HEX.beige, HEX.chocolate, HEX.chocolate, HEX.chocolate];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The scope of work as four rising steps: Positioning, Visual Identity, Art Direction, Brand Communication" exportName="strategy-scope">
      <rect width={W} height={H} fill={HEX.beige} />
      <text x={x0} y="40" className="sans" fontSize="13" fill={HEX.muted}>{SHEET[0][0]}</text>
      {SCOPE.map((label, i) => {
        const x = x0 + i * (stepW + gap);
        const h = heights[i];
        return (
          <g key={label}>
            <g className="rise" style={{ '--i': i * 3 }}>
              <path d={`M${x} ${base}V${base - h}H${x + stepW - 28}L${x + stepW} ${base - h + 28}V${base}Z`} fill={fills[i]} />
            </g>
            <g className="fade-in" style={{ '--i': i * 3 + 5 }}>
              <text x={x + 16} y={base - 16} className="sans" fontSize="13" fill={ink[i]}>{String(i + 1).padStart(2, '0')}</text>
              {wrap(label, 12).map((ln, k, arr) => (
                <text key={ln} x={x + 16} y={base - 40 - (arr.length - 1 - k) * 22} className="serif" fontSize="19" fill={ink[i]}>{ln}</text>
              ))}
            </g>
          </g>
        );
      })}
      <path d={`M${x0} ${base}H${W - x0}`} stroke={HEX.chocolate} strokeWidth="1.2" {...drawProps(0)} />
      <g className="fade-in" style={{ '--i': 16 }}>
        <text x={x0} y="320" className="sans" fontSize="13" fill={HEX.muted}>This positioning reflects a vision where real estate is not just transactional, but emotional and intentional.</text>
      </g>
    </Art>
  );
}

// ---------- 3. "We exist where vision meets reality": an arch meets a wall; an empty space becomes a living story ----------
export function VisionArt() {
  const W = 560;
  const H = 400;
  const cx = 280;
  const wallBars = [0, 1, 2, 3, 4];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Where vision meets reality: a quarter arch and a ribbed wall meeting on one line, an empty space becoming a living story" exportName="strategy-vision">
      <rect width={W} height={H} fill={HEX.white} />
      <text x="28" y="40" className="serif" fontSize="22" fill={HEX.chocolate}>vision</text>
      <text x={W - 28} y="40" textAnchor="end" className="serif" fontSize="22" fill={HEX.chocolate}>reality</text>
      <g className="settle" style={{ '--i': 1 }}>
        <QuarterArchG cx={cx - 12} cy={236} r={72} R={170} quadrant="tl" fill={HEX.sand} />
      </g>
      <g>
        {wallBars.map((b) => (
          <g key={b} className="rise" style={{ '--i': b + 2 }}>
            <path d={barPath(cx + 12 + b * 34, 236 - (b === 0 ? 170 : 170 - b * 8), 26, b === 0 ? 170 : 170 - b * 8, { cut: true })} fill={b % 2 ? HEX.tribal : HEX.chocolate} />
          </g>
        ))}
      </g>
      <path d={`M${cx} 56V236`} stroke={DRAWING.angle} strokeWidth="1.2" fill="none" {...drawProps(8)} />
      <path d={`M28 236H${W - 28}`} stroke={HEX.chocolate} strokeWidth="1.2" fill="none" {...drawProps(0)} />
      <text x={cx} y="262" textAnchor="middle" className="sans fade-in" fontSize="13" fill={HEX.muted} style={{ '--i': 10 }}>where vision meets reality</text>
      {/* an empty space, then a living story */}
      <g className="fade-in" style={{ '--i': 12 }}>
        <rect x="28" y="300" width="110" height="64" fill="none" stroke={HEX.chocolate} strokeWidth="1.2" strokeDasharray="5 5" />
        <text x="28" y="388" className="sans" fontSize="13" fill={HEX.muted}>empty spaces</text>
      </g>
      <path d="M156 332H212" stroke={HEX.tribal} strokeWidth="2" fill="none" {...drawProps(13)} />
      <path d="M204 324L212 332L204 340" stroke={HEX.tribal} strokeWidth="2" fill="none" {...drawProps(14)} />
      <g className="slide-up" style={{ '--i': 15 }}>
        <rect x="232" y="300" width="110" height="64" fill={HEX.tribal} />
        <QuarterArchG cx={342} cy={364} r={14} R={46} quadrant="tl" fill={HEX.beige} />
        <text x="232" y="388" className="sans" fontSize="13" fill={HEX.muted}>into living stories</text>
      </g>
      <g transform={`translate(${W - 78} 300)`}>
        <g className="mark-top" style={{ animationDelay: '1.2s' }}>
          <MarkG size={50} fill={HEX.sand} />
        </g>
      </g>
    </Art>
  );
}

// ---------- 4. "A journey of discovery, belonging and aspiration" ----------
export function JourneyArt() {
  const W = 1200;
  const H = 300;
  const stops = [
    { x: 150, y: 190, word: 'discovery', note: 'life' },
    { x: 560, y: 120, word: 'belonging', note: 'growth' },
    { x: 960, y: 60, word: 'aspiration', note: 'future possibilities' },
  ];
  const d = smoothPath([[40, 230], ...stops.map((p) => [p.x, p.y]), [1160, 40]], 0.8);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="A journey of discovery, belonging and aspiration, a foundation for life, growth and future possibilities" exportName="strategy-journey">
      <rect width={W} height={H} fill={HEX.beige} />
      <path d={`M40 262H${W - 40}`} stroke={HEX.chocolate} strokeWidth="1" opacity="0.5" fill="none" {...drawProps(0)} />
      <path d={d} stroke={HEX.tribal} strokeWidth="5" fill="none" strokeLinecap="butt" {...drawProps(2)} />
      {stops.map((p, i) => (
        <g key={p.word}>
          <path d={`M${p.x} ${p.y}V262`} stroke={HEX.sand} strokeWidth="1" fill="none" {...drawProps(6 + i)} />
          <g className="fade-in" style={{ '--i': 9 + i * 3 }}>
            <circle cx={p.x} cy={p.y} r="12" fill={HEX.beige} stroke={HEX.tribal} strokeWidth="3" />
            <text x={p.x + 24} y={p.y + 44} className="serif" fontSize="30" fill={HEX.chocolate}>{p.word}</text>
            <text x={p.x} y="284" textAnchor="middle" className="sans" fontSize="14" fill={HEX.muted}>{p.note}</text>
          </g>
        </g>
      ))}
      <text x="40" y="40" className="sans fade-in" fontSize="14" fill={HEX.muted} style={{ '--i': 18 }}>a journey of</text>
    </Art>
  );
}

// ---------- 5. The project sheet (m02), drawn row by row ----------
export function SheetArt() {
  const W = 320;
  const rowH = 46;
  const x0 = 24;
  const colX = 120;
  const scopeLines = wrap(SHEET[0][1], 17);
  // rows grow with the wrapped scope text
  const heights = SHEET.map((_, i) => Math.max(rowH, 22 + (i === 0 ? scopeLines.length : 1) * 18));
  const rows = SHEET.map(([label, value], i) => ({
    label,
    lines: i === 0 ? scopeLines : [value],
    y: 76 + heights.slice(0, i).reduce((a, b) => a + b, 0),
  }));
  const H = 76 + heights.reduce((a, b) => a + b, 0) + 24;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The project sheet: scope of work, client, industry, location, date" exportName="strategy-sheet">
      <rect width={W} height={H} fill={HEX.white} />
      <text x={x0} y="40" className="sans" fontSize="13" fill={HEX.muted}>Project sheet</text>
      {rows.map((r, i) => (
        <g key={r.label}>
          <path d={`M${x0} ${r.y - 10}H${W - x0}`} stroke={HEX.chocolate} strokeWidth="1" opacity="0.45" className="grow-x" style={{ '--i': i }} />
          <g className="slide-up" style={{ '--i': i + 2 }}>
            <text x={x0} y={r.y + 14} className="sans" fontSize="14" fill={HEX.ink}>{r.label}</text>
            {r.lines.map((ln, k) => (
              <text key={ln} x={colX} y={r.y + 14 + k * 18} className="sans" fontSize="14" fill={HEX.ink}>{ln}</text>
            ))}
          </g>
        </g>
      ))}
      <path d={`M${x0} ${H - 20}H${W - x0}`} stroke={HEX.chocolate} strokeWidth="1" opacity="0.45" className="grow-x" style={{ '--i': 7 }} />
    </Art>
  );
}

// ---------- 6. The three ruled rows of the About page (m12) ----------
export function RowsArt() {
  const W = 300;
  const H = 300;
  const x0 = 28;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The three ruled rows: Philosophy, Our Process, Our Vision" exportName="strategy-rows">
      <rect width={W} height={H} fill={HEX.beige} />
      <text x={x0} y="40" className="sans" fontSize="13" fill={HEX.muted}>{ABOUT.label}</text>
      {ABOUT.rows.map((r, i) => {
        const y = 76 + i * 64;
        return (
          <g key={r.no}>
            <path d={`M${x0} ${y}H${W - x0}`} stroke={HEX.chocolate} strokeWidth="1" opacity="0.5" className="grow-x" style={{ '--i': i * 2 }} />
            <g className="slide-up" style={{ '--i': i * 2 + 1 }}>
              <text x={x0} y={y + 38} className="sans" fontSize="13" fill={HEX.muted}>{r.no}</text>
              <text x={x0 + 44} y={y + 40} className="serif" fontSize="24" fill={HEX.chocolate}>{r.label}</text>
              <path d={`M${W - x0 - 14} ${y + 32}H${W - x0}M${W - x0 - 7} ${y + 25}V${y + 39}`} stroke={HEX.chocolate} strokeWidth="1.2" fill="none" />
            </g>
          </g>
        );
      })}
      <path d={`M${x0} ${76 + 3 * 64}H${W - x0}`} stroke={HEX.chocolate} strokeWidth="1" opacity="0.5" className="grow-x" style={{ '--i': 6 }} />
    </Art>
  );
}
