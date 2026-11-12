// Dashboard artwork: charts, drawings and thumbnails as inline SVG. No hooks here, so the server renders them.
// `on` (optional) returns the props that make a mark focusable with a tooltip; `tip` is the tooltip node.
import Art from '@/components/art/Art';
import { HEX, TINTS } from '@/lib/brand';
import { areaPath, bandPath, r2, scale, stepPath, archShares } from '@/lib/charts';
import { ALL_LAYERS, pad } from './data';

const RULE = '#C9BBAE';
const noop = () => ({});
const len = (pts) => Math.ceil(pts.slice(1).reduce((a, p, i) => a + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0)) + 2;

// The quarter arch as a progress chart: one segment per sheet, filled for each Final sheet.
export function ArchChart({ final, total, on = noop, tip, exportName, title = 'Progress as a quarter arch: Final sheets of all sheets' }) {
  const cx = 30, cy = 390, r0 = 170, R = 350, step = 90 / Math.max(total, 1), gap = 1.6;
  return (
    <Art viewBox="0 0 420 420" title={title} exportName={exportName}>
      <rect width="420" height="420" fill={HEX.white} />
      {Array.from({ length: total }, (_, i) => (
        <path key={i} d={bandPath(cx, cy, r0, R, i * step + gap / 2, (i + 1) * step - gap / 2)} fill={i < final ? HEX.tribal : TINTS.sand[2]} className="fade-in" style={{ '--i': i }} />
      ))}
      <path d={`M${cx} ${cy - r0}V${cy - R - 10}M${cx + r0} ${cy}H${cx + R + 10}`} stroke={RULE} strokeWidth="1" fill="none" />
      <text x="62" y="352" fontSize="92" className="serif" fill={HEX.chocolate}>{final}</text>
      <text x="62" y="378" fontSize="14" className="sans" fill={HEX.muted}>{`of ${total} sheets Final`}</text>
      <path d={bandPath(cx, cy, r0, R, 0, 90)} fill="transparent" {...on(250, 140, `${final} of ${total} sheets are Final`)} />
      {tip}
    </Art>
  );
}

// The line: running count of Final sheets along the visible sheets (cum), a step as the stepped shadow.
export function LineChart({ cum, rows, max, on = noop, tip, exportName, title = 'Line of Final sheets counted along the sheet numbers' }) {
  const W = 900, H = 300, x0 = 56, x1 = W - 28, y0 = 28, y1 = H - 46;
  const n = cum.length;
  const sx = scale(0, Math.max(n - 1, 1), x0, x1), sy = scale(0, Math.max(max, 1), y1, y0);
  const pts = cum.map((v, i) => [sx(i), sy(v)]);
  const grid = Array.from({ length: Math.min(max, 4) + 1 }, (_, i) => Math.round((i * max) / Math.min(max, 4) || 0));
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={title} exportName={exportName}>
      <rect width={W} height={H} fill={HEX.white} />
      {[...new Set(grid)].map((g) => (
        <g key={g}>
          <line x1={x0} x2={x1} y1={r2(sy(g))} y2={r2(sy(g))} stroke={RULE} strokeWidth="1" />
          <text x={x0 - 12} y={r2(sy(g)) + 4} fontSize="12" textAnchor="end" className="serif" fill={HEX.muted}>{g}</text>
        </g>
      ))}
      {n > 1 && <path d={areaPath(pts, y1, 'step')} fill={TINTS.sand[3]} />}
      {n > 1 && <path d={stepPath(pts)} fill="none" stroke={HEX.chocolate} strokeWidth="2.5" strokeLinejoin="miter" className="draw" style={{ '--len': len(pts) * 2 }} />}
      {pts.map(([x, y], i) => (
        <g key={rows[i].id}>
          <text x={r2(x)} y={H - 18} fontSize="12" textAnchor="middle" className="sans" fill={HEX.muted}>{pad(rows[i].id)}</text>
          <circle cx={r2(x)} cy={r2(y)} r="6" fill={HEX.tribal} stroke={HEX.white} strokeWidth="2" {...on(x, y, `${rows[i].name}: ${cum[i]} Final so far`)} />
        </g>
      ))}
      {!n && <text x={W / 2} y={H / 2} fontSize="16" textAnchor="middle" className="sans" fill={HEX.muted}>No sheets match</text>}
      {tip}
    </Art>
  );
}

// The plan as layers: grid, walls, doors, car park. Drawn without dimensions or room labels.
const WALLS = [[50, 160, 250, 160], [310, 160, 440, 160], [50, 270, 110, 270], [170, 270, 440, 270], [180, 50, 180, 160], [310, 50, 310, 100], [310, 150, 310, 270], [245, 270, 245, 330], [245, 380, 245, 390], [360, 270, 360, 390]];
const DOORS = ['M250 160V220M250 220A60 60 0 0 0 310 160', 'M110 270V210M110 210A60 60 0 0 1 170 270', 'M310 100H360M360 100A50 50 0 0 1 310 150', 'M245 330H295M295 330A50 50 0 0 1 245 380'];
const XS = [50, 180, 310, 440], YS = [50, 160, 270, 390];
export function PlanDrawing({ layers = ALL_LAYERS, exportName, title = 'Plan drawing in layers: grid, walls, doors and car park', paper = HEX.white }) {
  return (
    <Art viewBox="0 0 620 440" title={title} exportName={exportName}>
      <rect width="620" height="440" fill={paper} />
      {layers.grid && (
        <g stroke={RULE} strokeWidth="1" fill="none">
          {XS.map((x, i) => <g key={x}><path d={`M${x} 40V424`} strokeDasharray="8 6" /><circle cx={x} cy="22" r="11" fill={paper} /><text x={x} y="26" fontSize="11" textAnchor="middle" className="sans" fill={HEX.muted} stroke="none">{'ABCD'[i]}</text></g>)}
          {YS.map((y, i) => <g key={y}><path d={`M40 ${y}H460`} strokeDasharray="8 6" /><circle cx="24" cy={y} r="11" fill={paper} /><text x="24" y={y + 4} fontSize="11" textAnchor="middle" className="sans" fill={HEX.muted} stroke="none">{i + 1}</text></g>)}
        </g>
      )}
      {layers.walls && (
        <g fill="none" stroke={HEX.chocolate} strokeWidth="5" strokeLinejoin="miter">
          <rect x="50" y="50" width="390" height="340" className="draw" style={{ '--len': 1460 }} />
          {WALLS.map((w, i) => <path key={i} d={`M${w[0]} ${w[1]}L${w[2]} ${w[3]}`} className="draw" style={{ '--len': 220, '--i': i + 2 }} />)}
        </g>
      )}
      {layers.doors && <g fill="none" stroke={HEX.tribal} strokeWidth="2">{DOORS.map((d) => <path key={d} d={d} className="fade-in" />)}</g>}
      {layers.parking && (
        <g fill="none" stroke={HEX.sand} strokeWidth="2.5">
          <path d="M475 50V390" strokeDasharray="12 7" />
          {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${r2(520)} ${r2(50 + i * 42.5)}H590`} />)}
          <path d="M590 50V390" />
        </g>
      )}
    </Art>
  );
}

// Four layers stacked as planes, the way the viewer switches them.
export function LayerDiagram({ exportName }) {
  const names = ['Car park', 'Doors', 'Walls', 'Grid'];
  return (
    <Art viewBox="0 0 480 360" title="The four plan layers stacked" exportName={exportName}>
      <rect width="480" height="360" fill={HEX.beige} />
      {names.map((nm, i) => {
        const y = 40 + i * 76;
        return (
          <g key={nm} className="slide-up" style={{ '--i': i }}>
            <polygon points={`${90},${y} ${330},${y} ${270},${y + 56} ${30},${y + 56}`} fill={TINTS.sand[i]} stroke={HEX.chocolate} strokeWidth="2" strokeLinejoin="miter" />
            <path d={`M${120 - 15 * 0} ${y + 28}H${300 - 30}`} stroke={i === 2 ? HEX.chocolate : HEX.tribal} strokeWidth={i === 2 ? 5 : 2} strokeDasharray={i === 3 ? '8 6' : undefined} />
            <path d={`M330 ${y}H400M270 ${y + 56}H400`} stroke={RULE} strokeWidth="1" />
            <text x="404" y={y + 36} fontSize="16" className="serif" fill={HEX.chocolate}>{nm}</text>
          </g>
        );
      })}
    </Art>
  );
}

// Tile artwork: flat fields, the quarter arch and the stepped shadow. No photographs.
export function TileArt({ kind = 'arch', exportName }) {
  if (kind === 'steps') {
    const pts = Array.from({ length: 7 }, (_, i) => [i * 60, 240 - i * 34]);
    return (
      <Art viewBox="0 0 360 240" title="Tile artwork: the stepped shadow" exportName={exportName}>
        <rect width="360" height="240" fill={HEX.beige} />
        <path d={areaPath(pts.map(([x, y]) => [x + 40, y + 26]), 240, 'step')} fill={TINTS.sand[1]} className="fade-in" />
        <path d={areaPath(pts, 240, 'step')} fill={HEX.tribal} className="fade-in" style={{ '--i': 2 }} />
      </Art>
    );
  }
  return (
    <Art viewBox="0 0 360 240" title="Tile artwork: nested quarter arches" exportName={exportName}>
      <rect width="360" height="240" fill={HEX.chocolate} />
      {archShares([4, 3, 2, 1], 360, 240, 230, 38, 8).map((a, i) => <path key={i} d={a.d} fill={[HEX.sand, HEX.tribal, TINTS.sand[1], TINTS.tribal[0]][i]} className="fade-in" style={{ '--i': i }} />)}
    </Art>
  );
}

// One small diagram per home structure (A to E), 160 x 100.
export function Thumb({ kind, exportName }) {
  const k = String(kind);
  const line = (x, y, w, c = HEX.chocolate) => <rect key={`${x}-${y}`} x={x} y={y} width={w} height="2" fill={c} opacity=".35" />;
  return (
    <Art viewBox="0 0 160 100" title={`Structure of option ${k.toUpperCase()}`} exportName={exportName}>
      <rect width="160" height="100" fill={HEX.beige} />
      {k === 'a' && <><rect width="160" height="12" fill={HEX.chocolate} /><path d={bandPath(8, 74, 22, 58, 0, 90)} fill={HEX.tribal} /><rect x="80" y="22" width="50" height="6" fill={HEX.chocolate} />{[44, 54, 64].map((y) => <g key={y}>{line(80, y, 70)}</g>)}{[8, 46, 84, 122].map((x) => <rect key={x} x={x} y="80" width="30" height="14" fill={HEX.white} />)}</>}
      {k === 'b' && <><rect width="40" height="100" fill={HEX.chocolate} />{[14, 26, 38, 50, 62, 74].map((y) => line(6, y, 28, HEX.beige))}<rect x="50" y="10" width="100" height="80" fill={HEX.white} /><rect x="62" y="24" width="76" height="52" fill="none" stroke={HEX.chocolate} strokeWidth="3" /></>}
      {k === 'c' && <>{[[6, 6, 52, 60, HEX.white], [64, 6, 90, 36, HEX.white], [64, 48, 42, 18, HEX.beige], [112, 48, 42, 46, HEX.chocolate], [6, 72, 52, 22, HEX.beige], [64, 72, 42, 22, HEX.tribal]].map(([x, y, w, h, f], i) => <rect key={i} x={x} y={y} width={w} height={h} fill={f} stroke={HEX.chocolate} strokeOpacity=".25" />)}</>}
      {k === 'd' && <>{[8, 46, 84, 122].map((x) => <rect key={x} x={x} y="8" width="30" height="16" fill={HEX.white} />)}{Array.from({ length: 7 }, (_, i) => <g key={i}>{line(8, 36 + i * 9, 144)}</g>)}</>}
      {k === 'e' && <><rect x="6" y="6" width="84" height="88" fill={HEX.white} /><rect x="16" y="22" width="64" height="54" fill="none" stroke={HEX.chocolate} strokeWidth="3" /><path d="M48 22V76M16 50H80" stroke={HEX.chocolate} strokeWidth="2" />{[16, 34, 52, 70].map((y) => <g key={y}>{line(100, y, 52)}{line(100, y + 6, 30)}</g>)}</>}
    </Art>
  );
}
