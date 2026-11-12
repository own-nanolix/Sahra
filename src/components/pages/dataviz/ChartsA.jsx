'use client';

import Art from '@/components/art/Art';
import { scale, linePath, stepPath, areaPath, barPath, arcPath, arcLength, bandPath } from '@/lib/charts';
import { range } from '@/lib/site';
import { C, useTip, Tip, Bg, T, HLine, pathLen, nice } from './kit';
import { introWords, letterWords, introCumulative, charLines, CHAR_NAMES, groupCounts, pageCount, RING_COLORS, colours, offsets } from './data';

// 1. TREND: a line over paragraph order (words per paragraph).
export function TrendChart({ series, exportName, title }) {
  const [tip, on] = useTip();
  const W = 560, H = 310, L = 50, R = 18, Tp = 30, B = 52;
  const n = Math.max(...series.map((q) => q.values.length));
  const tk = nice(Math.max(...series.flatMap((q) => q.values)), 4);
  const top = tk[tk.length - 1];
  const x = scale(0, n - 1, L + 12, W - R - 12), y = scale(0, top, H - B, Tp);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={title} exportName={exportName}>
      <Bg w={W} h={H} />
      {tk.map((t) => (
        <g key={t}><HLine x1={L} x2={W - R} y={y(t)} /><T x={L - 10} y={y(t) + 5} anchor="end" serif size={16}>{t}</T></g>
      ))}
      {range(n).map((i) => <T key={i} x={x(i)} y={H - B + 24} serif size={16}>{i + 1}</T>)}
      <T x={(L + W - R) / 2} y={H - 6} size={16}>Paragraph, in the order printed</T>
      {series.map((q, k) => {
        const pts = q.values.map((v, i) => [x(i), y(v)]);
        return (
          <g key={q.name}>
            <path d={linePath(pts)} fill="none" stroke={q.color} strokeWidth="3" strokeLinejoin="miter" className="draw" style={{ '--len': pathLen(pts), '--i': k }} />
            {pts.map(([px, py], i) => (
              <g key={i} {...on(px, py, `${q.name}, paragraph ${i + 1}: ${q.values[i]} words`)}>
                <circle cx={px} cy={py} r="5.5" fill={C.white} stroke={q.color} strokeWidth="3" className="fade-in" style={{ '--i': 8 + i }} />
              </g>
            ))}
          </g>
        );
      })}
      <Tip tip={tip} w={W} size={16} />
    </Art>
  );
}

// 2. TREND (stepped): the running total of intro words, drawn as the stepped shadow.
export function StepArea() {
  const [tip, on] = useTip();
  const W = 360, H = 250, L = 44, R = 14, Tp = 24, B = 38;
  const tk = nice(introCumulative[introCumulative.length - 1], 4);
  const x = scale(0, introCumulative.length - 1, L, W - R), y = scale(0, tk[tk.length - 1], H - B, Tp);
  const pts = introCumulative.map((v, i) => [x(i), y(v)]);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Running total of words across the intro paragraphs" exportName="dataviz-trend-steps">
      <Bg w={W} h={H} />
      {tk.map((t) => <g key={t}><HLine x1={L} x2={W - R} y={y(t)} /><T x={L - 8} y={y(t) + 4} anchor="end" serif>{t}</T></g>)}
      <path d={areaPath(pts, H - B, 'step')} fill={C.sand40} className="fade-in" />
      <path d={stepPath(pts)} fill="none" stroke={C.tribal} strokeWidth="3" className="draw" style={{ '--len': 1200 }} />
      {pts.map(([px, py], i) => (
        <g key={i} {...on(px, py, `After paragraph ${i + 1}: ${introCumulative[i]} words`)}>
          <rect x={px - 6} y={py - 6} width="12" height="12" fill={C.chocolate} className="fade-in" style={{ '--i': 6 + i }} />
          <T x={px} y={H - B + 20} serif>{i + 1}</T>
        </g>
      ))}
      <T x={(L + W - R) / 2} y={H - 6}>Paragraph</T>
      <Tip tip={tip} w={W} />
    </Art>
  );
}

// 3. COMPARISON: intro and letter paragraphs side by side.
export function PairedBars() {
  const [tip, on] = useTip();
  const W = 360, H = 250, L = 40, R = 12, Tp = 28, B = 38;
  const tk = nice(Math.max(...introWords, ...letterWords), 4);
  const y = scale(0, tk[tk.length - 1], H - B, Tp);
  const gw = (W - L - R) / 6, bw = gw * 0.3;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Words per paragraph: intro slide against letter" exportName="dataviz-compare-pairs">
      <Bg w={W} h={H} />
      {tk.map((t) => <g key={t}><HLine x1={L} x2={W - R} y={y(t)} /><T x={L - 8} y={y(t) + 4} anchor="end" serif>{t}</T></g>)}
      {range(6).map((i) => {
        const gx = L + i * gw + gw * 0.18;
        return (
          <g key={i}>
            <T x={L + i * gw + gw / 2} y={H - B + 20} serif>{i + 1}</T>
            {[[introWords[i], C.chocolate, 'Intro'], [letterWords[i], C.sand, 'Letter']].map(([v, col, nm], k) => v === undefined ? null : (
              <g key={nm} {...on(gx + k * (bw + 3) + bw / 2, y(v), `${nm}, paragraph ${i + 1}: ${v} words`)}>
                <path d={barPath(gx + k * (bw + 3), y(v), bw, H - B - y(v), { round: 'tr', radius: bw })} fill={col} className="rise" style={{ '--i': i }} />
              </g>
            ))}
          </g>
        );
      })}
      <rect x={L} y="6" width="10" height="10" fill={C.chocolate} /><T x={L + 16} y="15" anchor="start">Intro</T>
      <rect x={L + 64} y="6" width="10" height="10" fill={C.sand} /><T x={L + 80} y="15" anchor="start">Letter</T>
      <T x={(L + W - R) / 2} y={H - 6}>Paragraph</T>
      <Tip tip={tip} w={W} />
    </Art>
  );
}

// 4. COMPARISON: the three RGB channels of the six colours.
export function ChannelBars() {
  const [tip, on] = useTip();
  const W = 560, H = 290, L = 36, R = 10, Tp = 34, B = 52;
  const y = scale(0, 255, H - B, Tp);
  const gw = (W - L - R) / colours.length, bw = gw * 0.22;
  const cols = [['Red', C.chocolate, 'r'], ['Green', C.tribal, 'g'], ['Blue', C.sand, 'b']];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Red, green and blue values of the six palette colours" exportName="dataviz-compare-channels">
      <Bg w={W} h={H} />
      {[0, 128, 255].map((t) => <g key={t}><HLine x1={L} x2={W - R} y={y(t)} /><T x={L - 6} y={y(t) + 4} anchor="end" serif size={15}>{t}</T></g>)}
      {colours.map((c, i) => {
        const gx = L + i * gw + gw * 0.14;
        return (
          <g key={c.token}>
            <T x={L + i * gw + gw / 2} y={H - B + 22} size={16}>{c.short.split(' ')[0]}</T>
            {cols.map(([nm, col, key], k) => (
              <g key={key} {...on(gx + k * (bw + 4) + bw / 2, y(c[key]), `${c.name}, ${nm}: ${c[key]}`)}>
                <path d={barPath(gx + k * (bw + 4), y(c[key]) - 0.01, bw, Math.max(1, H - B - y(c[key])), { cut: true })} fill={col} className="rise" style={{ '--i': i + k }} />
              </g>
            ))}
          </g>
        );
      })}
      {cols.map(([nm, col], k) => (
        <g key={nm}><rect x={L + k * 70} y="8" width="12" height="12" fill={col} /><T x={L + k * 70 + 18} y="19" anchor="start" size={15}>{nm}</T></g>
      ))}
      <Tip tip={tip} w={W} size={15} />
    </Art>
  );
}

// 5. SHARE: the quarter arch. Four rings, one per character-set line, each against the longest line.
export function ArchShare() {
  const [tip, on] = useTip();
  const W = 300, H = 268, cx = 284, cy = 222, ringW = 36, gap = 6, ro = 204;
  const max = Math.max(...charLines);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Quarter arch: characters per line of the type slide's character set" exportName="dataviz-share-arch">
      <Bg w={W} h={H} />
      {charLines.map((v, i) => {
        const r1 = ro - i * (ringW + gap), rm = r1 - ringW / 2, ang = (v / max) * 90;
        const lx = cx - rm;
        return (
          <g key={CHAR_NAMES[i]} {...on(cx - rm * 0.72, cy - rm * 0.72, `${CHAR_NAMES[i]} line: ${v} characters`)}>
            <path d={bandPath(cx, cy, r1 - ringW, r1, 270, 360)} fill={C.sand20} />
            <path d={arcPath(cx, cy, rm, 270, 270 + ang)} fill="none" stroke={RING_COLORS[i]} strokeWidth={ringW} className="draw" style={{ '--len': arcLength(rm, 270, 270 + ang) + 4, '--i': i }} />
            <T x={lx} y={cy + 17 + (i % 2) * 14} size={11}>{CHAR_NAMES[i]}</T>
            <T x={cx - rm + 0} y={cy - 8} size={13} serif fill={i < 2 ? C.beige : C.chocolate}>{v}</T>
          </g>
        );
      })}
      <Tip tip={tip} w={W} />
    </Art>
  );
}

// 6. SHARE (ring): pages of the site by group.
export function RingShare() {
  const [tip, on] = useTip();
  const W = 300, H = 268, cx = 150, cy = 134, rm = 86, sw = 38, gap = 2;
  const off = offsets(groupCounts.map((g) => g.n));
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="The 30 pages of the site, by group" exportName="dataviz-share-ring">
      <Bg w={W} h={H} />
      {groupCounts.map((g, i) => {
        const a = (off[i] / pageCount) * 360, span = (g.n / pageCount) * 360, a0 = a + gap / 2, a1 = a + span - gap / 2;
        return (
          <g key={g.name} {...on(cx + (rm + 4) * Math.sin(((a0 + a1) / 2) * Math.PI / 180), cy - (rm + 4) * Math.cos(((a0 + a1) / 2) * Math.PI / 180), `${g.name}: ${g.n} pages`)}>
            <path d={arcPath(cx, cy, rm, a0, a1)} fill="none" stroke={RING_COLORS[i]} strokeWidth={sw} className="draw" style={{ '--len': arcLength(rm, a0, a1) + 4, '--i': i }} />
          </g>
        );
      })}
      <T x={cx} y={cy + 12} size={40} serif fill={C.chocolate}>{pageCount}</T>
      <T x={cx} y={cy + 32}>pages</T>
      <Tip tip={tip} w={W} />
    </Art>
  );
}

// 7. HEATMAP: the printed CMYK values of the six colours, in the published tints.
const bucket = (v) => (v === 0 ? [C.beige, C.chocolate] : v <= 30 ? [C.sand40, C.chocolate] : v <= 60 ? [C.sand, C.chocolate] : v <= 80 ? [C.tribal, C.beige] : [C.chocolate, C.beige]);
export function Heat() {
  const [tip, on] = useTip();
  const W = 420, H = 270, L = 112, Tp = 34, cw = 72, ch = 34;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Printed CMYK values of the six palette colours" exportName="dataviz-heat-cmyk">
      <Bg w={W} h={H} />
      {['C', 'M', 'Y', 'K'].map((k, c) => <T key={k} x={L + c * (cw + 4) + cw / 2} y="22" serif size={15}>{k}</T>)}
      {colours.map((col, r) => (
        <g key={col.token}>
          <T x={L - 10} y={Tp + r * (ch + 4) + 22} anchor="end" size={15}>{col.short}</T>
          {['c', 'm', 'y', 'k'].map((k, c) => {
            const [bg, fg] = bucket(col[k]);
            const px = L + c * (cw + 4), py = Tp + r * (ch + 4);
            return (
              <g key={k} {...on(px + cw / 2, py, `${col.name}, ${k.toUpperCase()}: ${col[k]}`)}>
                <rect x={px} y={py} width={cw} height={ch} rx="3" fill={bg} stroke={C.rule} strokeWidth="0.5" className="fade-in" style={{ '--i': r * 4 + c }} />
                <text x={px + cw / 2} y={py + 22} textAnchor="middle" fontSize="16" fill={fg} className="serif">{col[k]}</text>
              </g>
            );
          })}
        </g>
      ))}
      <Tip tip={tip} w={W} />
    </Art>
  );
}
