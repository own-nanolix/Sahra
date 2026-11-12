'use client';

import Art from '@/components/art/Art';
import { scale, barPath, hbarPath, ticks, r2 } from '@/lib/charts';
import { C, useTip, Tip, Bg, T, HLine, nice } from './kit';
import { exportBins, introWords, letterWords, typeWords, scope, blocks, blockTotal, topExports, rankedAnchors, cut, colours, offsets } from './data';

// 8. DISTRIBUTION: how many pages share each export target.
export function Histogram() {
  const [tip, on] = useTip();
  const W = 360, H = 250, L = 38, R = 12, Tp = 26, B = 52;
  const tk = nice(Math.max(...exportBins.map((b) => b.n)), 4);
  const y = scale(0, tk[tk.length - 1], H - B, Tp);
  const gw = (W - L - R) / exportBins.length;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Pages grouped by their minimum export count" exportName="dataviz-distribution-bins">
      <Bg w={W} h={H} />
      {tk.map((t) => <g key={t}><HLine x1={L} x2={W - R} y={y(t)} /><T x={L - 8} y={y(t) + 4} anchor="end" serif>{t}</T></g>)}
      {exportBins.map((b, i) => (
        <g key={b.label} {...on(L + i * gw + gw / 2, y(b.n), `${b.n} pages with ${b.label} exports`)}>
          <path d={barPath(L + i * gw + 4, y(b.n), gw - 8, H - B - y(b.n), { round: 'tr', radius: 22 })} fill={i % 2 ? C.sand : C.tribal} className="rise" style={{ '--i': i }} />
          <T x={L + i * gw + gw / 2} y={H - B + 18} serif>{b.label}</T>
        </g>
      ))}
      <T x={(L + W - R) / 2} y={H - 8}>Minimum exports per page</T>
      <Tip tip={tip} w={W} />
    </Art>
  );
}

// 9. DISTRIBUTION (strip): every paragraph of three text blocks on one words scale.
export function Strip() {
  const [tip, on] = useTip();
  const W = 420, H = 210, L = 84, R = 20;
  const rows = [['Intro', introWords, C.chocolate], ['Letter', letterWords, C.tribal], ['Type slide', typeWords, C.sand]];
  const tk = ticks(0, 70, 7);
  const x = scale(0, 70, L, W - R);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Words per paragraph in three text blocks, on one scale" exportName="dataviz-distribution-strip">
      <Bg w={W} h={H} />
      {tk.map((t) => <g key={t}><line x1={x(t)} x2={x(t)} y1="16" y2="148" stroke={C.rule} strokeWidth="1" /><T x={x(t)} y="168" serif>{t}</T></g>)}
      {rows.map(([nm, vals, col], r) => (
        <g key={nm}>
          <T x={L - 12} y={50 + r * 44} anchor="end">{nm}</T>
          <rect x={L} y={46 + r * 44} width={W - R - L} height="1.5" fill={C.rule} />
          {vals.map((v, i) => (
            <g key={i} {...on(x(v), 46 + r * 44, `${nm}, paragraph ${i + 1}: ${v} words`)}>
              <circle cx={x(v)} cy={46 + r * 44} r="8" fill={col} className="fade-in" style={{ '--i': r * 3 + i }} />
            </g>
          ))}
        </g>
      ))}
      <T x={(L + W - R) / 2} y={H - 10}>Words in the paragraph</T>
      <Tip tip={tip} w={W} />
    </Art>
  );
}

// 10. TIME: the one printed year, with the four scope-of-work steps in the order printed (no dates).
export function Timeline() {
  const [tip, on] = useTip();
  const W = 560, H = 210, L = 50, R = 510;
  const x = (i) => L + 40 + (i * (R - L - 80)) / 3;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="2026 with the four scope-of-work steps in printed order" exportName="dataviz-time-2026">
      <Bg w={W} h={H} />
      <g {...on(W / 2, 44, 'Date: 2026, as printed on the project sheet')}>
        <path d={`M${L} 60V44H${R}V60`} fill="none" stroke={C.chocolate} strokeWidth="2" className="draw" style={{ '--len': 900 }} />
        <T x={W / 2} y="32" size="22" serif fill={C.chocolate}>2026</T>
      </g>
      <rect x={L} y="119" width={R - L} height="2" fill={C.tribal} className="grow-x" />
      {scope.map((nm, i) => (
        <g key={nm} {...on(x(i), 120, `Step ${i + 1}: ${nm} (order as printed, no dates)`)}>
          <circle cx={x(i)} cy="120" r="9" fill={C.beige} stroke={C.tribal} strokeWidth="3" className="fade-in" style={{ '--i': i + 3 }} />
          <T x={x(i)} y="98" size="13" serif>{String(i + 1).padStart(2, '0')}</T>
          <T x={x(i)} y="152" size="12" fill={C.ink}>{nm}</T>
        </g>
      ))}
      <T x={W / 2} y="192" size="11">Steps in the order printed; the case study publishes no other dates.</T>
      <Tip tip={tip} w={W} />
    </Art>
  );
}

// 11. FLOW: words of each copy block flowing into the case study's copy.
export function Sankey() {
  const [tip, on] = useTip();
  const W = 560, H = 300, x1 = 150, x2 = 400, nw = 14, gapY = 10, top = 22;
  const k =(H - top * 2 - gapY * (blocks.length - 1)) / blockTotal;
  const shade = [C.chocolate, C.tribal, C.sand, '#CFBEB3', '#E1D2C4', C.rule];
  const ry0 = top + (gapY * (blocks.length - 1)) / 2;
  const off = offsets(blocks.map((b) => b.n));
  const mid = (x1 + nw + x2) / 2;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Words of each copy block flowing into the case study's copy" exportName="dataviz-flow-copy">
      <Bg w={W} h={H} />
      {blocks.map((b, i) => {
        const h = b.n * k, a0 = top + off[i] * k + i * gapY, b0 = ry0 + off[i] * k;
        const d = `M${x1 + nw} ${r2(a0)}C${mid} ${r2(a0)} ${mid} ${r2(b0)} ${x2} ${r2(b0)}V${r2(b0 + h)}C${mid} ${r2(b0 + h)} ${mid} ${r2(a0 + h)} ${x1 + nw} ${r2(a0 + h)}Z`;
        return (
          <g key={b.name} {...on(mid, (a0 + b0) / 2 + h / 2, `${b.name}: ${b.n} words`)}>
            <path d={d} fill={shade[i]} opacity="0.62" className="fade-in" style={{ '--i': i }} />
            <rect x={x1} y={a0} width={nw} height={h} fill={shade[i]} className="rise" style={{ '--i': i }} />
            <T x={x1 - 8} y={a0 + h / 2 + 4} anchor="end" fill={C.ink}>{b.name}</T>
            <T x={x1 - 8} y={a0 + h / 2 + 16} anchor="end" serif size={10}>{b.n}</T>
          </g>
        );
      })}
      <rect x={x2} y={top + (gapY * (blocks.length - 1)) / 2} width={nw} height={blockTotal * k} fill={C.chocolate} />
      <T x={x2 + nw + 10} y={H / 2 - 2} anchor="start" fill={C.ink}>Case study copy</T>
      <T x={x2 + nw + 10} y={H / 2 + 22} anchor="start" serif size={20} fill={C.chocolate}>{blockTotal}</T>
      <T x={x2 + nw + 10} y={H / 2 + 38} anchor="start">words</T>
      <Tip tip={tip} w={W} />
    </Art>
  );
}

// 12. PLACE: the plan sheet's zones as shapes. The case study prints no areas, so there are no figures.
const ZONES = [
  ['Zone 1', 20, 20, 150, 110], ['Zone 2', 170, 20, 130, 110], ['Zone 3', 20, 130, 100, 130],
  ['Zone 4', 120, 130, 180, 130], ['Zone 5', 300, 130, 100, 60], ['Car park', 300, 190, 100, 70],
];
export function Place() {
  const [tip, on] = useTip();
  const W = 420, H = 280;
  const fills = ['#F0E9E1', '#E1D2C4', C.beige, '#E7DFD9', '#CFBEB3'];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Plan sheet zones as shapes, without figures" exportName="dataviz-place-zones">
      <defs>
        <pattern id="dataviz-place-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="10" height="10" fill={C.white} /><rect width="3" height="10" fill="#CFBEB3" />
        </pattern>
      </defs>
      <Bg w={W} h={H} />
      {ZONES.map(([nm, zx, zy, zw, zh], i) => (
        <g key={nm} {...on(zx + zw / 2, zy + 8, `${nm}: a shape only, the case study prints no size`)}>
          <rect x={zx} y={zy} width={zw} height={zh} fill={i === 5 ? 'url(#dataviz-place-hatch)' : fills[i]} stroke={C.tribal} strokeWidth="2" className="fade-in" style={{ '--i': i }} />
          <T x={zx + zw / 2} y={zy + zh / 2 + 4} size="12" serif fill={C.chocolate}>{nm === 'Car park' ? nm : i + 1}</T>
        </g>
      ))}
      <path d="M300 20H340A60 60 0 0 1 400 80V130H300Z" fill="none" stroke={C.chocolate} strokeWidth="2" className="draw" style={{ '--len': 400 }} />
      <T x="210" y="274" size="11">Zones drawn as shapes; no areas are published.</T>
      <Tip tip={tip} w={W} />
    </Art>
  );
}

// 13. RANKING: pages with the highest export targets.
export function Rank() {
  const [tip, on] = useTip();
  const W = 480, H = 296, L = 170, R = 40, Tp = 14;
  const x = scale(0, topExports[0].n, 0, W - L - R);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The eight pages with the highest minimum export counts" exportName="dataviz-ranking-pages">
      <Bg w={W} h={H} />
      {topExports.map((p, i) => (
        <g key={p.id} {...on(L + x(p.n), Tp + i * 33 + 10, `${p.title}: ${p.n} exports`)}>
          <T x={L - 10} y={Tp + i * 33 + 15} anchor="end" fill={C.ink} size={12}>{p.title}</T>
          <path d={hbarPath(L, Tp + i * 33, x(p.n), 20)} fill={i === 0 ? C.chocolate : i < 3 ? C.tribal : C.sand} className="grow-x" style={{ '--i': i }} />
          <T x={L + x(p.n) + 8} y={Tp + i * 33 + 15} anchor="start" serif size={13} fill={C.chocolate}>{p.n}</T>
        </g>
      ))}
      <Tip tip={tip} w={W} />
    </Art>
  );
}

// 14. RANKING (lollipop): anchor points per letter of the traced word-mark.
export function Anchors() {
  const [tip, on] = useTip();
  const W = 400, H = 262, L = 128, R = 40, Tp = 16;
  const x = scale(0, rankedAnchors[0].n, 0, W - L - R);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Anchor points per letter of the traced word-mark" exportName="dataviz-ranking-anchors">
      <Bg w={W} h={H} />
      {rankedAnchors.map((g, i) => (
        <g key={g.id} {...on(L + x(g.n), Tp + i * 34 + 10, `${g.name}: ${g.n} anchor points`)}>
          <T x={L - 10} y={Tp + i * 34 + 14} anchor="end" fill={C.ink} size={12}>{g.name}</T>
          <rect x={L} y={Tp + i * 34 + 8} width={x(g.n)} height="3" fill={C.tribal} className="grow-x" style={{ '--i': i }} />
          <circle cx={L + x(g.n)} cy={Tp + i * 34 + 9.5} r="8" fill={C.sand} stroke={C.chocolate} strokeWidth="2" className="fade-in" style={{ '--i': i + 4 }} />
          <T x={L + x(g.n) + 16} y={Tp + i * 34 + 14} anchor="start" serif size={13} fill={C.chocolate}>{g.n}</T>
        </g>
      ))}
      <Tip tip={tip} w={W} />
    </Art>
  );
}

// 15. ANGLE: the cut drawn at 42 degrees on the construction drawing against the 45 measured on the artwork.
export function Angle() {
  const [tip, on] = useTip();
  const W = 360, H = 260, ox = 36, oy = 214, len = 300;
  const end = (a) => [r2(ox + len * Math.cos((a * Math.PI) / 180)), r2(oy - len * Math.sin((a * Math.PI) / 180))];
  const arc = (rad, a) => `M${ox + rad} ${oy}A${rad} ${rad} 0 0 0 ${r2(ox + rad * Math.cos((a * Math.PI) / 180))} ${r2(oy - rad * Math.sin((a * Math.PI) / 180))}`;
  const [e42, e45] = [end(cut.drawn), end(cut.measured)];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The cut angle: 42 degrees as labelled, 45 degrees as measured" exportName="dataviz-angle-cut">
      <Bg w={W} h={H} />
      <path d={`M${ox} ${oy}L${e45[0]} ${e45[1]}L${e42[0]} ${e42[1]}Z`} fill="#E1D2C4" className="fade-in" />
      <line x1={ox} y1={oy} x2={ox + len} y2={oy} stroke={C.rule} strokeWidth="2" />
      <g {...on(e42[0] - 40, e42[1] + 30, 'Labelled 42° on the construction drawing')}>
        <line x1={ox} y1={oy} x2={e42[0]} y2={e42[1]} stroke={C.tribal} strokeWidth="3" className="draw" style={{ '--len': 320 }} />
        <path d={arc(110, 42)} fill="none" stroke={C.tribal} strokeWidth="2" />
        <T x={ox + 128} y={oy - 52} anchor="start" serif size={20} fill={C.tribal}>42°</T>
      </g>
      <g {...on(e45[0] - 50, e45[1] + 20, 'Measured 45° on the artwork')}>
        <line x1={ox} y1={oy} x2={e45[0]} y2={e45[1]} stroke={C.chocolate} strokeWidth="3" className="draw" style={{ '--len': 320, '--i': 2 }} />
        <path d={arc(70, 45)} fill="none" stroke={C.chocolate} strokeWidth="2" />
        <T x={ox + 80} y={oy - 70} anchor="start" serif size={20} fill={C.chocolate}>45°</T>
      </g>
      <T x={W / 2} y="246" size="11">Drawn label against measured cut, in degrees</T>
      <Tip tip={tip} w={W} />
    </Art>
  );
}

// 16. SCATTER: the six colours placed by their red and blue values.
export function Scatter() {
  const [tip, on] = useTip();
  const W = 380, H = 300, L = 44, R = 20, Tp = 20, B = 46;
  const x = scale(0, 255, L, W - R), y = scale(0, 255, H - B, Tp);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Red against blue values of the six palette colours" exportName="dataviz-scatter-rgb">
      <Bg w={W} h={H} />
      {[0, 128, 255].map((t) => (
        <g key={t}>
          <HLine x1={L} x2={W - R} y={y(t)} /><T x={L - 8} y={y(t) + 4} anchor="end" serif>{t}</T>
          <line x1={x(t)} x2={x(t)} y1={Tp} y2={H - B} stroke={C.rule} strokeWidth="1" /><T x={x(t)} y={H - B + 18} serif>{t}</T>
        </g>
      ))}
      {colours.map((c, i) => (
        <g key={c.token} {...on(x(c.r), y(c.b), `${c.name}: red ${c.r}, blue ${c.b}`)}>
          <circle cx={x(c.r)} cy={y(c.b)} r="11" fill={c.hex} stroke={C.chocolate} strokeWidth="2" className="fade-in" style={{ '--i': i }} />
          <T x={c.r > 200 ? x(c.r) - 16 : x(c.r) + 16} y={y(c.b) + 4} anchor={c.r > 200 ? 'end' : 'start'} fill={C.ink}>{c.short}</T>
        </g>
      ))}
      <T x={(L + W - R) / 2} y={H - 6}>Red value (across) against blue value (up)</T>
      <Tip tip={tip} w={W} />
    </Art>
  );
}
