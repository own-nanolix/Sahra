// Clear space (in units of x, the stroke) and the four minimum sizes.
import Art from '@/components/art/Art';
import { WordmarkG, MarkG, MarkTileG, LockupLineG, WM, LOCKUP_LINE } from '@/components/art/Mark';
import { DRAWING } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { CLEAR, MIN_SIZES } from './data';

// Double-headed arrow with a label, in plate units (vertical or horizontal).
function Span({ x1, y1, x2, y2, label, lx, ly }) {
  const h = 7;
  const vertical = x1 === x2;
  const head = (px, py, dir) => (vertical
    ? `M${px} ${py}l${-h * 0.5} ${dir * h}h${h}Z`
    : `M${px} ${py}l${dir * h} ${-h * 0.5}v${h}Z`);
  return (
    <g>
      <path d={`M${x1} ${y1}L${x2} ${y2}`} stroke={DRAWING.ink} strokeWidth="1.2" />
      <path d={head(x1, y1, 1)} fill={DRAWING.ink} />
      <path d={head(x2, y2, -1)} fill={DRAWING.ink} />
      <text x={lx} y={ly} fontSize="22" textAnchor="middle" fill={DRAWING.ink} className="sans">{label}</text>
    </g>
  );
}

export function ClearSpacePlate() {
  const W = 1000, k = W / WM.W, ux = WM.X * k, c = CLEAR * ux;
  const mx = 300, my = 362, mh = WM.H * k;
  const ox = mx - c, oy = my - c, ow = W + 2 * c, oh = mh + 2 * c;
  const label = `${CLEAR}x`;
  const squares = Array.from({ length: CLEAR }, (_, i) => i);
  return (
    <Art viewBox="0 0 1600 900" title={`Clear space: ${CLEAR}x on every side of the word-mark, where x is the stroke`} exportName="logo-clear-space">
      <rect width="1600" height="900" fill={DRAWING.paper} />
      <path d={`M${r2(ox)} ${r2(oy)}h${r2(ow)}v${r2(oh)}h${-r2(ow)}ZM${mx} ${my}v${r2(mh)}h${W}v${-r2(mh)}Z`} fill={DRAWING.unit} fillOpacity="0.5" fillRule="evenodd" />
      <rect x={r2(ox)} y={r2(oy)} width={r2(ow)} height={r2(oh)} fill="none" stroke={DRAWING.line} strokeWidth="1.5" strokeDasharray="10 7" />
      <rect x={mx} y={my} width={W} height={r2(mh)} fill="none" stroke={DRAWING.line} strokeWidth="1" />
      <WordmarkG x={mx} y={my} width={W} fill={HEX.chocolate} />
      {/* the unit squares: four x on the left and above */}
      <g fill="none" stroke={DRAWING.line} strokeWidth="1">
        {squares.map((i) => (
          <g key={i}>
            <rect x={r2(ox + i * ux)} y={r2(my + mh / 2 - ux / 2)} width={r2(ux)} height={r2(ux)} />
            <rect x={r2(mx + W / 2 - ux / 2)} y={r2(oy + i * ux)} width={r2(ux)} height={r2(ux)} />
          </g>
        ))}
      </g>
      <Span x1={r2(ox)} y1={r2(my + mh * 0.8)} x2={mx} y2={r2(my + mh * 0.8)} label={label} lx={r2(ox + c / 2)} ly={r2(my + mh * 0.8 - 12)} />
      <Span x1={r2(mx + W)} y1={r2(my + mh * 0.8)} x2={r2(ox + ow)} y2={r2(my + mh * 0.8)} label={label} lx={r2(mx + W + c / 2)} ly={r2(my + mh * 0.8 - 12)} />
      <Span x1={r2(mx + W * 0.2)} y1={r2(oy)} x2={r2(mx + W * 0.2)} y2={my} label={label} lx={r2(mx + W * 0.2 + 34)} ly={r2(oy + c / 2 + 8)} />
      <Span x1={r2(mx + W * 0.2)} y1={r2(my + mh)} x2={r2(mx + W * 0.2)} y2={r2(oy + oh)} label={label} lx={r2(mx + W * 0.2 + 34)} ly={r2(my + mh + c / 2 + 8)} />
      <text x={r2(ox)} y={r2(oy + oh + 56)} fontSize="22" fill={DRAWING.ink} className="sans">x is the stroke of the word-mark. Keep {label} clear on every side.</text>
    </Art>
  );
}

// One minimum size, drawn at its width in plate units, with a dimension line under it.
export function MinSizePlate({ item }) {
  const { id, name, width } = item;
  const W = 480, H = 300;
  const cx = W / 2;
  let art, h;
  if (id === 'wordmark') {
    h = (WM.H * width) / WM.W;
    art = (x, y) => <WordmarkG x={x} y={y} width={width} fill={HEX.chocolate} />;
  } else if (id === 'row') {
    h = (LOCKUP_LINE.row.h * width) / LOCKUP_LINE.row.w;
    art = (x, y) => <LockupLineG x={x} y={y} scale={width / LOCKUP_LINE.row.w} fill={HEX.chocolate} />;
  } else if (id === 'mark') {
    h = (201 * width) / 184;
    art = (x, y) => <MarkG x={x} y={y} size={width} fill={HEX.chocolate} />;
  } else {
    h = width;
    art = (x, y) => <MarkTileG x={x} y={y} size={width} tile={HEX.chocolate} fill={HEX.beige} />;
  }
  const x = r2(cx - width / 2), y = r2(120 - h / 2);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`Minimum size: ${name}, ${width} px wide`} exportName={`logo-min-${id}`}>
      <rect width={W} height={H} fill={DRAWING.paper} />
      <g stroke={DRAWING.guide} strokeWidth="0.8">
        <path d={`M${x} 40V220`} /><path d={`M${r2(x + width)} 40V220`} />
      </g>
      {art(x, y)}
      <Span x1={x} y1="200" x2={r2(x + width)} y2="200" label={`${width} px`} lx={cx} ly="232" />
      <text x="24" y="276" fontSize="20" fill={DRAWING.ink} className="sans">{name}, minimum width</text>
    </Art>
  );
}

