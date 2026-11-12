'use client';

import Art from '@/components/art/Art';
import { scale, linePath, segments, barPath } from '@/lib/charts';
import { range } from '@/lib/site';
import { C, useTip, Tip, T, pathLen } from './kit';
import { introWords, letterWords, charLines, glyphAnchors, weights, groupCounts, pageCount, cut, tinted, colours, RING_COLORS, offsets } from './data';

const V = '0 0 240 150';

// STAT CARD 1: one large numeral with a caption and a rule.
export function StatNumeral() {
  return (
    <Art viewBox={V} title={`${introWords.length} paragraphs on the intro slide`} exportName="dataviz-stat-numeral">
      <rect width="240" height="150" fill={C.white} />
      <text x="20" y="98" fontSize="92" fill={C.chocolate} className="serif slide-up">{introWords.length}</text>
      <T x="96" y="62" anchor="start" size="13" fill={C.ink}>paragraphs on</T>
      <T x="96" y="80" anchor="start" size="13" fill={C.ink}>the intro slide</T>
      <rect x="20" y="118" width="200" height="1.5" fill={C.chocolate} className="grow-x" />
      {range(introWords.length).map((i) => <rect key={i} x={20 + i * 34} y="124" width="26" height="8" fill={C.sand} className="rise" style={{ '--i': i }} />)}
    </Art>
  );
}

// STAT CARD 2: the four type weights as four segments, on Dark Chocolate.
export function StatWeights() {
  const seg = segments(weights.length, 200, weights.length, 6);
  return (
    <Art viewBox={V} title={`${weights.length} type weights`} exportName="dataviz-stat-weights">
      <rect width="240" height="150" fill={C.chocolate} />
      <text x="20" y="72" fontSize="64" fill={C.sand} className="serif slide-up">{weights.length}</text>
      <T x="70" y="50" anchor="start" size="13" fill={C.beige}>type weights</T>
      <T x="70" y="66" anchor="start" size="12" fill={C.beigeMuted}>Test Tiempos Text</T>
      {seg.map((sg, i) => (
        <g key={i}>
          <path d={barPath(20 + sg.x, 94, sg.w, 22, { round: 'tr', radius: 11 })} fill={[C.sand, C.tribal, C.tribal40, C.beige][i]} className="grow-x" style={{ '--i': i }} />
          <T x={20 + sg.x + sg.w / 2} y="134" size="10.5" fill={C.beigeMuted}>{weights[i].replace('Test Tiempos Text ', '')}</T>
        </g>
      ))}
    </Art>
  );
}

// STAT CARD 3: two numbers either side of a cut.
export function StatCut() {
  return (
    <Art viewBox={V} title="Cut angle: 42 degrees labelled, 45 degrees measured" exportName="dataviz-stat-cut">
      <rect width="240" height="150" fill={C.sand20} />
      <path d="M130 0H240V150H85Z" fill={C.sand} className="fade-in" />
      <text x="16" y="84" fontSize="50" fill={C.chocolate} className="serif slide-up">{cut.drawn}°</text>
      <T x="18" y="106" anchor="start" size="12" fill={C.ink}>labelled</T>
      <text x="136" y="84" fontSize="50" fill={C.chocolate} className="serif slide-up" style={{ '--i': 2 }}>{cut.measured}°</text>
      <T x="138" y="106" anchor="start" size="12" fill={C.chocolate}>measured</T>
      <line x1="130" y1="0" x2="85" y2="150" stroke={C.chocolate} strokeWidth="2" className="draw" style={{ '--len': 160 }} />
    </Art>
  );
}

// STAT CARD 4: a ledger of the colours printed with tints (m05), as ruled rows with their tint strips.
export function StatLedger() {
  return (
    <Art viewBox={V} title={`${tinted.length} colours printed with ${tinted[0].tints.length} tints each`} exportName="dataviz-stat-ledger">
      <rect width="240" height="150" fill={C.beige} />
      <text x="18" y="52" fontSize="44" fill={C.chocolate} className="serif slide-up">{tinted.length}</text>
      <T x="48" y="34" anchor="start" size="13" fill={C.ink}>colours with</T>
      <T x="48" y="50" anchor="start" size="13" fill={C.ink}>printed tints</T>
      {tinted.map((c, i) => (
        <g key={c.token}>
          <rect x="18" y={66 + i * 26} width="204" height="1" fill={C.chocolate} className="grow-x" style={{ '--i': i }} />
          <T x="18" y={85 + i * 26} anchor="start" size="13" serif fill={C.ink}>{c.name}</T>
          {c.tints.map((t, k) => <rect key={t} x={150 + k * 18} y={73 + i * 26} width="16" height="14" fill={t} stroke={C.rule} strokeWidth="0.5" className="fade-in" style={{ '--i': i + k }} />)}
        </g>
      ))}
    </Art>
  );
}

const VK = '0 0 240 120';

// KPI TILE 1: the page count with the groups as one divided strip.
export function KpiPages() {
  const [tip, on] = useTip();
  const off = offsets(groupCounts.map((g) => g.n));
  return (
    <Art viewBox={VK} title={`${pageCount} pages in ${groupCounts.length} groups`} exportName="dataviz-kpi-pages">
      <rect width="240" height="120" fill={C.white} />
      <text x="16" y="52" fontSize="46" fill={C.chocolate} className="serif">{pageCount}</text>
      <T x="72" y="46" anchor="start" size="13" fill={C.ink}>pages, by group</T>
      {groupCounts.map((g, i) => {
        const w = (g.n / pageCount) * 208, px = 16 + (off[i] / pageCount) * 208;
        return (
          <g key={g.name} {...on(px + w / 2, 76, g.n === 1 ? `${g.name}: 1 page` : `${g.name}: ${g.n} pages`)}>
            <rect x={px + 1} y="76" width={Math.max(2, w - 2)} height="24" fill={RING_COLORS[i]} className="grow-x" style={{ '--i': i }} />
          </g>
        );
      })}
      <Tip tip={tip} w={240} size={11} />
    </Art>
  );
}

// KPI TILE 2: the printed year on a ruler.
export function KpiYear() {
  return (
    <Art viewBox={VK} title="Date: 2026" exportName="dataviz-kpi-year">
      <rect width="240" height="120" fill={C.tribal} />
      <text x="16" y="56" fontSize="50" fill={C.beige} className="serif">2026</text>
      <T x="156" y="40" anchor="start" size="12" fill={C.beige}>as printed</T>
      <T x="156" y="56" anchor="start" size="12" fill={C.beige}>on the sheet</T>
      {range(31).map((i) => (
        <rect key={i} x={16 + i * 7} y={i === 15 ? 78 : 90} width="1.5" height={i === 15 ? 24 : 12} fill={C.beige} className="rise" style={{ '--i': i / 3 }} />
      ))}
    </Art>
  );
}

// KPI TILE 3: the six colours as a row of chips.
export function KpiColours() {
  const [tip, on] = useTip();
  return (
    <Art viewBox={VK} title={`${colours.length} palette colours`} exportName="dataviz-kpi-colours">
      <rect width="240" height="120" fill={C.beige} />
      <text x="16" y="52" fontSize="46" fill={C.chocolate} className="serif">{colours.length}</text>
      <T x="62" y="46" anchor="start" size="13" fill={C.ink}>published colours</T>
      {colours.map((c, i) => (
        <g key={c.token} {...on(16 + i * 35 + 15, 76, `${c.name} ${c.hex}`)}>
          <path d={barPath(16 + i * 35, 76, 30, 28, { round: 'tr', radius: 14 })} fill={c.hex} stroke={C.rule} strokeWidth="1" className="rise" style={{ '--i': i }} />
        </g>
      ))}
      <Tip tip={tip} w={240} />
    </Art>
  );
}

// SPARKLINES: four small series, each from counted data.
export function Sparklines() {
  const [tip, on] = useTip();
  const rows = [
    ['Intro words', introWords, C.chocolate],
    ['Letter words', letterWords, C.tribal],
    ['Character lines', charLines, C.sand],
    ['Anchors per letter', glyphAnchors.map((g) => g.n), C.chocolate],
  ];
  const W = 320, H = 4 * 40 + 14;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Sparklines of four counted series" exportName="dataviz-sparklines">
      <rect width={W} height={H} fill={C.white} />
      {rows.map(([nm, vals, col], r) => {
        const x = scale(0, vals.length - 1, 150, 272), y = scale(Math.min(...vals), Math.max(...vals), 28 + r * 40, 8 + r * 40);
        const pts = vals.map((v, i) => [x(i), y(v)]);
        const last = pts[pts.length - 1];
        return (
          <g key={nm}>
            <rect x="12" y={36 + r * 40} width={W - 24} height="1" fill={C.rule} />
            <T x="12" y={25 + r * 40} anchor="start" size="14" fill={C.ink}>{nm}</T>
            <path d={linePath(pts)} fill="none" stroke={col} strokeWidth="2.5" className="draw" style={{ '--len': pathLen(pts), '--i': r }} />
            <g {...on(last[0], last[1], `${nm}: ${vals.length} values, the last is ${vals[vals.length - 1]}`)}>
              <circle cx={last[0]} cy={last[1]} r="4" fill={col} className="fade-in" style={{ '--i': 10 }} />
              <T x="300" y={25 + r * 40} serif size="16" fill={C.chocolate}>{vals[vals.length - 1]}</T>
            </g>
          </g>
        );
      })}
      <Tip tip={tip} w={W} />
    </Art>
  );
}
