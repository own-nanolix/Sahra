'use client';

import Art from '@/components/art/Art';
import { scale, barPath, hbarPath, ticks, r2 } from '@/lib/charts';
import { range } from '@/lib/site';
import { C, useTip, Tip, Bg, T, HLine, nice } from './kit';
import { exportBins, introWords, letterWords, typeWords, scope, blocks, blockTotal, topExports, rankedAnchors, cut, colours, offsets } from './data';

// 8. DISTRIBUTION: how many pages of the site ask for each number of SVG artworks (pages.json, minExports).
export function Histogram() {
  const [tip, on] = useTip();
  const W = 300, H = 250, L = 34, R = 8, Tp = 24, B = 56;
  const tk = nice(Math.max(...exportBins.map((b) => b.n)), 3);
  const y = scale(0, tk[tk.length - 1], H - B, Tp);
  const gw = (W - L - R) / exportBins.length;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Pages of the site grouped by their minimum number of SVG artworks" exportName="dataviz-distribution-bins">
      <Bg w={W} h={H} />
      {tk.map((t) => <g key={t}><HLine x1={L} x2={W - R} y={y(t)} /><T x={L - 7} y={y(t) + 5} anchor="end" serif size={14}>{t}</T></g>)}
      {exportBins.map((b, i) => (
        <g key={b.label} {...on(L + i * gw + gw / 2, y(b.n), `${b.n} pages ask for ${b.label} artworks`)}>
          <path d={barPath(L + i * gw + 3, y(b.n), gw - 6, H - B - y(b.n), { round: 'tr', radius: 18 })} fill={i % 2 ? C.sand : C.tribal} className="rise" style={{ '--i': i }} />
          <T x={L + i * gw + gw / 2} y={H - B + 20} serif size={14}>{b.label}</T>
        </g>
      ))}
      <T x={(L + W - R) / 2} y={H - 8} size={14}>Artworks per page</T>
      <Tip tip={tip} w={W} size={14} />
    </Art>
  );
}

// 9. DISTRIBUTION (strip): every paragraph of three text blocks on one words scale. Equal values stack upwards.
export function Strip() {
  const [tip, on] = useTip();
  const W = 420, H = 220, L = 88, R = 20, gapY = 46, y0 = 56;
  const rows = [['Intro', introWords, C.chocolate], ['Letter', letterWords, C.tribal], ['Type slide', typeWords, C.sand]];
  const tk = ticks(0, 70, 7);
  const x = scale(0, 70, L, W - R);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Words per paragraph in three text blocks, on one scale" exportName="dataviz-distribution-strip">
      <Bg w={W} h={H} />
      {tk.map((t) => <g key={t}><line x1={x(t)} x2={x(t)} y1="16" y2={y0 + 2 * gapY + 14} stroke={C.rule} strokeWidth="1" /><T x={x(t)} y={y0 + 2 * gapY + 34} serif size={14}>{t}</T></g>)}
      {rows.map(([nm, vals, col], r) => {
        const cy = y0 + r * gapY;
        return (
          <g key={nm}>
            <T x={L - 12} y={cy + 5} anchor="end" size={14}>{nm}</T>
            <rect x={L} y={cy} width={W - R - L} height="1.5" fill={C.rule} />
            {vals.map((v, i) => {
              const k = vals.slice(0, i).filter((u) => u === v).length;
              return (
                <g key={i} {...on(x(v), cy - k * 15, `${nm}, paragraph ${i + 1}: ${v} words`)}>
                  <circle cx={x(v)} cy={cy - k * 15} r="7.5" fill={col} stroke={C.white} strokeWidth="1.5" className="fade-in" style={{ '--i': r * 3 + i }} />
                </g>
              );
            })}
          </g>
        );
      })}
      <T x={(L + W - R) / 2} y={H - 8} size={14}>Words in the paragraph</T>
      <Tip tip={tip} w={W} size={14} />
    </Art>
  );
}

// 10. TIME: the one printed year, with the four scope-of-work items in the order printed (no other dates exist).
export function Timeline() {
  const [tip, on] = useTip();
  const W = 560, H = 220, L = 40, R = 520;
  const x = (i) => L + 60 + (i * (R - L - 120)) / 3;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="2026 with the four scope-of-work items in printed order" exportName="dataviz-time-2026">
      <Bg w={W} h={H} />
      <g {...on(W / 2, 44, 'Date: 2026, as printed on the project sheet')}>
        <path d={`M${L} 62V46H${R}V62`} fill="none" stroke={C.chocolate} strokeWidth="2" className="draw" style={{ '--len': 900 }} />
        <T x={W / 2} y="34" size="26" serif fill={C.chocolate}>2026</T>
      </g>
      <rect x={L} y="121" width={R - L} height="2" fill={C.tribal} className="grow-x" />
      {scope.map((nm, i) => (
        <g key={nm} {...on(x(i), 122, `Scope of work, item ${i + 1}: ${nm}`)}>
          <circle cx={x(i)} cy="122" r="9" fill={C.beige} stroke={C.tribal} strokeWidth="3" className="fade-in" style={{ '--i': i + 3 }} />
          <T x={x(i)} y="100" size="15" serif>{String(i + 1).padStart(2, '0')}</T>
          {nm.split(' ').map((wd, j) => <T key={wd} x={x(i)} y={156 + j * 18} size="15" fill={C.ink}>{wd}</T>)}
        </g>
      ))}
      <T x={W / 2} y="208" size="14">The order printed on the project sheet. No other dates are published.</T>
      <Tip tip={tip} w={W} size={15} />
    </Art>
  );
}

// 11. FLOW: words of each copy block flowing into the total of the six blocks.
export function Sankey() {
  const [tip, on] = useTip();
  const W = 560, H = 320, x1 = 150, x2 = 390, nw = 14, gapY = 12, top = 20;
  const k = (H - top * 2 - gapY * (blocks.length - 1)) / blockTotal;
  const shade = [C.chocolate, C.tribal, C.sand, C.tribal40, C.sand40, C.rule];
  const ry0 = top + (gapY * (blocks.length - 1)) / 2;
  const off = offsets(blocks.map((b) => b.n));
  const mid = (x1 + nw + x2) / 2;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Words of each of six copy blocks flowing into their total" exportName="dataviz-flow-copy">
      <Bg w={W} h={H} />
      {blocks.map((b, i) => {
        const h = b.n * k, a0 = top + off[i] * k + i * gapY, b0 = ry0 + off[i] * k;
        const d = `M${x1 + nw} ${r2(a0)}C${mid} ${r2(a0)} ${mid} ${r2(b0)} ${x2} ${r2(b0)}V${r2(b0 + h)}C${mid} ${r2(b0 + h)} ${mid} ${r2(a0 + h)} ${x1 + nw} ${r2(a0 + h)}Z`;
        const small = h < 30;
        return (
          <g key={b.name} {...on(mid, (a0 + b0) / 2 + h / 2, `${b.name}: ${b.n} words`)}>
            <path d={d} fill={shade[i]} opacity="0.62" className="fade-in" style={{ '--i': i }} />
            <rect x={x1} y={a0} width={nw} height={h} fill={shade[i]} className="rise" style={{ '--i': i }} />
            <T x={x1 - 10} y={a0 + h / 2 + (small ? 5 : -2)} anchor="end" fill={C.ink} size={15}>{small ? `${b.name}  ${b.n}` : b.name}</T>
            {!small && <T x={x1 - 10} y={a0 + h / 2 + 16} anchor="end" serif size={14}>{b.n}</T>}
          </g>
        );
      })}
      <rect x={x2} y={ry0} width={nw} height={blockTotal * k} fill={C.chocolate} />
      <T x={x2 + nw + 12} y={H / 2 - 6} anchor="start" fill={C.ink} size={15}>Six copy blocks</T>
      <T x={x2 + nw + 12} y={H / 2 + 22} anchor="start" serif size={26} fill={C.chocolate}>{blockTotal}</T>
      <T x={x2 + nw + 12} y={H / 2 + 42} anchor="start" size={14}>words</T>
      <Tip tip={tip} w={W} size={15} />
    </Art>
  );
}

// 12. PLACE: the floor plan on the plan sheet (m13), as its two parts: the building and the car park around it.
// The plan's dimensions and room labels are illegible, so it is drawn as shapes, with no figures.
const P = (px, py) => [r2(112 + (px - 1000) * 0.62), r2(14 + (py - 335) * 0.62)];
const poly = (pts) => `M${pts.map((p) => P(...p).join(' ')).join('L')}Z`;
const BUILDING = poly([[1003, 390], [1185, 390], [1185, 522], [1137, 522], [1137, 700], [1003, 700]]);
const PARK = poly([[1197, 345], [1330, 345], [1330, 755], [1003, 755], [1003, 712], [1149, 712], [1149, 534], [1197, 534]]);
export function Place() {
  const [tip, on] = useTip();
  const W = 420, H = 300;
  const [bx0, by0] = P(1258, 360), [bx1, by1] = P(1330, 740);
  const bayRows = range(11).map((i) => r2(by0 + (i * (by1 - by0)) / 10));
  const [mx0, my0] = P(1149, 545), [mx1, my1] = P(1197, 700);
  const midRows = range(6).map((i) => r2(my0 + (i * (my1 - my0)) / 5));
  const [sx0, sy0] = P(1010, 712), [sx1, sy1] = P(1149, 755);
  const stalls = range(7).map((i) => r2(sx0 + (i * (sx1 - sx0)) / 6));
  const grid = range(6).map((i) => P(1000, 400 + i * 60)[1]);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The plan sheet's floor plan: the building and the car park, without figures" exportName="dataviz-place-plan">
      <defs>
        <pattern id="dataviz-place-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" fill={C.white} /><rect width="2" height="8" fill={C.tribal40} />
        </pattern>
      </defs>
      <Bg w={W} h={H} />
      {grid.map((gy, i) => (
        <g key={gy}>
          <line x1="100" x2="330" y1={gy} y2={gy} stroke={C.rule} strokeWidth="1" strokeDasharray="6 5" className="fade-in" style={{ '--i': i }} />
          <circle cx="94" cy={gy} r="5" fill={C.white} stroke={C.rule} strokeWidth="1" />
        </g>
      ))}
      <g {...on(P(1260, 400)[0], P(1260, 400)[1], 'Car park, as drawn on the plan sheet')}>
        <path d={PARK} fill="url(#dataviz-place-hatch)" stroke={C.sand} strokeWidth="2" className="fade-in" style={{ '--i': 2 }} />
        {bayRows.map((by) => <line key={by} x1={bx0} x2={bx1} y1={by} y2={by} stroke={C.sand} strokeWidth="1.5" />)}
        {midRows.map((my) => <line key={my} x1={mx0} x2={mx1} y1={my} y2={my} stroke={C.sand} strokeWidth="1.5" />)}
        {stalls.map((sx) => <line key={sx} x1={sx} x2={sx} y1={sy0} y2={sy1} stroke={C.sand} strokeWidth="1.5" />)}
      </g>
      <g {...on(P(1070, 450)[0], P(1070, 450)[1], 'Building, as drawn on the plan sheet')}>
        <path d={BUILDING} fill={C.sand20} stroke={C.chocolate} strokeWidth="3" strokeLinejoin="miter" className="draw" style={{ '--len': 760 }} />
        <T x={P(1070, 600)[0]} y={P(1070, 600)[1]} size={15} serif fill={C.chocolate}>Building</T>
      </g>
      <path d={`M${P(1330, 560).join(' ')}H346`} stroke={C.chocolate} strokeWidth="1" />
      <T x="350" y={P(1330, 560)[1] + 5} anchor="start" size={15} serif fill={C.chocolate}>Car park</T>
      <T x={W / 2} y={H - 4} size={13}>Shapes only: the sheet prints no legible figures.</T>
      <Tip tip={tip} w={W} size={14} />
    </Art>
  );
}

// 13. RANKING: the pages that ask for the most SVG artworks (pages.json, minExports).
export function Rank() {
  const [tip, on] = useTip();
  const W = 480, H = 300, L = 176, R = 40, Tp = 14;
  const x = scale(0, topExports[0].n, 0, W - L - R);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The eight pages that ask for the most SVG artworks" exportName="dataviz-ranking-pages">
      <Bg w={W} h={H} />
      {topExports.map((p, i) => (
        <g key={p.id} {...on(L + x(p.n), Tp + i * 34 + 10, `${p.title}: at least ${p.n} artworks`)}>
          <T x={L - 10} y={Tp + i * 34 + 16} anchor="end" fill={C.ink} size={14}>{p.title}</T>
          <path d={hbarPath(L, Tp + i * 34, x(p.n), 22)} fill={i === 0 ? C.chocolate : i < 3 ? C.tribal : C.sand} className="grow-x" style={{ '--i': i }} />
          <T x={L + x(p.n) + 8} y={Tp + i * 34 + 16} anchor="start" serif size={15} fill={C.chocolate}>{p.n}</T>
        </g>
      ))}
      <Tip tip={tip} w={W} size={14} />
    </Art>
  );
}

// 14. RANKING (lollipop): the letters of the traced word-mark with the most anchor points.
export function Anchors() {
  const [tip, on] = useTip();
  const W = 400, H = 262, L = 150, R = 40, Tp = 16;
  const x = scale(0, rankedAnchors[0].n, 0, W - L - R);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Anchor points per letter of the traced word-mark" exportName="dataviz-ranking-anchors">
      <Bg w={W} h={H} />
      {rankedAnchors.map((g, i) => (
        <g key={g.id} {...on(L + x(g.n), Tp + i * 34 + 10, `${g.name}: ${g.n} anchor points`)}>
          <T x={L - 12} y={Tp + i * 34 + 15} anchor="end" fill={C.ink} size={14}>{g.name}</T>
          <rect x={L} y={Tp + i * 34 + 8} width={x(g.n)} height="3" fill={C.tribal} className="grow-x" style={{ '--i': i }} />
          <circle cx={L + x(g.n)} cy={Tp + i * 34 + 9.5} r="8" fill={C.sand} stroke={C.chocolate} strokeWidth="2" className="fade-in" style={{ '--i': i + 4 }} />
          <T x={L + x(g.n) + 16} y={Tp + i * 34 + 15} anchor="start" serif size={15} fill={C.chocolate}>{g.n}</T>
        </g>
      ))}
      <Tip tip={tip} w={W} size={14} />
    </Art>
  );
}

// 15. ANGLE: the cut labelled 42 degrees on the Arabic cuts of the construction drawing against the 45 measured on the artwork.
export function Angle() {
  const [tip, on] = useTip();
  const W = 360, H = 260, ox = 40, oy = 214, len = 250;
  const end = (a) => [r2(ox + len * Math.cos((a * Math.PI) / 180)), r2(oy - len * Math.sin((a * Math.PI) / 180))];
  const arc = (rad, a) => `M${ox + rad} ${oy}A${rad} ${rad} 0 0 0 ${r2(ox + rad * Math.cos((a * Math.PI) / 180))} ${r2(oy - rad * Math.sin((a * Math.PI) / 180))}`;
  const [e42, e45] = [end(cut.drawn), end(cut.measured)];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The cut angle: 42 degrees as labelled, 45 degrees as measured" exportName="dataviz-angle-cut">
      <Bg w={W} h={H} />
      <path d={`M${ox} ${oy}L${e45[0]} ${e45[1]}L${e42[0]} ${e42[1]}Z`} fill={C.sand40} className="fade-in" />
      <line x1={ox} y1={oy} x2={ox + len + 30} y2={oy} stroke={C.rule} strokeWidth="2" />
      <g {...on(e42[0], e42[1], 'Labelled 42° on the Arabic cuts of the construction drawing')}>
        <line x1={ox} y1={oy} x2={e42[0]} y2={e42[1]} stroke={C.tribal} strokeWidth="3" className="draw" style={{ '--len': 270 }} />
        <path d={arc(120, cut.drawn)} fill="none" stroke={C.tribal} strokeWidth="2" />
        <T x={e42[0] + 12} y={e42[1] + 16} anchor="start" serif size={22} fill={C.tribal}>{cut.drawn}°</T>
        <T x={e42[0] + 12} y={e42[1] + 34} anchor="start" size={13}>labelled</T>
      </g>
      <g {...on(e45[0], e45[1], 'Measured 45° on the artwork')}>
        <line x1={ox} y1={oy} x2={e45[0]} y2={e45[1]} stroke={C.chocolate} strokeWidth="3" className="draw" style={{ '--len': 270, '--i': 2 }} />
        <path d={arc(80, cut.measured)} fill="none" stroke={C.chocolate} strokeWidth="2" />
        <T x={e45[0] - 22} y={e45[1] + 2} anchor="end" serif size={22} fill={C.chocolate}>{cut.measured}°</T>
        <T x={e45[0] - 22} y={e45[1] + 20} anchor="end" size={13}>measured</T>
      </g>
      <T x={W / 2} y="246" size={13}>Labelled cut against measured cut, in degrees</T>
      <Tip tip={tip} w={W} size={14} />
    </Art>
  );
}

// 16. SCATTER: the six colours placed by their printed red and blue values.
export function Scatter() {
  const [tip, on] = useTip();
  const W = 380, H = 300, L = 44, R = 20, Tp = 24, B = 48;
  const x = scale(0, 255, L, W - R), y = scale(0, 255, H - B, Tp);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Red against blue values of the six palette colours" exportName="dataviz-scatter-rgb">
      <Bg w={W} h={H} />
      {[0, 128, 255].map((t) => (
        <g key={t}>
          <HLine x1={L} x2={W - R} y={y(t)} /><T x={L - 8} y={y(t) + 5} anchor="end" serif size={14}>{t}</T>
          <line x1={x(t)} x2={x(t)} y1={Tp} y2={H - B} stroke={C.rule} strokeWidth="1" /><T x={x(t)} y={H - B + 20} serif size={14}>{t}</T>
        </g>
      ))}
      {colours.map((c, i) => (
        <g key={c.token} {...on(x(c.r), y(c.b), `${c.name}: red ${c.r}, blue ${c.b}`)}>
          <circle cx={x(c.r)} cy={y(c.b)} r="11" fill={c.hex} stroke={C.chocolate} strokeWidth="2" className="fade-in" style={{ '--i': i }} />
          <T x={c.r > 200 ? x(c.r) - 18 : x(c.r) + 17} y={y(c.b) + 5} anchor={c.r > 200 ? 'end' : 'start'} fill={C.ink} size={14}>{c.short}</T>
        </g>
      ))}
      <T x={(L + W - R) / 2} y={H - 6} size={14}>Red value (across) against blue value (up)</T>
      <Tip tip={tip} w={W} size={14} />
    </Art>
  );
}
