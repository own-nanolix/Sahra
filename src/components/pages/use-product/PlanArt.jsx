// The office-style floor plan with a car park, drawn in code as on the sheet of m13: walls, rooms, door swings,
// a column grid, a car park with bays, planters and a few cars. No dimension figures, no room labels (illegible
// in the source). Box 370 x 440; x, y is its top-left.
import { r2, seeded } from '@/lib/charts';

function Car({ x, y, w = 15, h = 32, rot = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="5" strokeWidth="0.9" />
      <rect x={-w / 2 + 2.5} y={-h / 2 + 7} width={w - 5} height={h * 0.34} rx="2" strokeWidth="0.6" />
    </g>
  );
}

export default function PlanArt({ x = 0, y = 0, ink = '#35241C', seed = 7 }) {
  const rnd = seeded(seed);
  // office block: three columns of rooms down the left
  const rooms = [];
  const colX = [0, 62, 124];
  const colW = [62, 62, 56];
  for (let r = 0; r < 8; r++) {
    colX.forEach((cx, c) => {
      if (r < 2 && c === 2) return;
      const tall = rnd() > 0.72 && r < 7 ? 2 : 1;
      rooms.push({ x: cx, y: 52 + r * 40, w: colW[c], h: 40 * tall, door: rnd(), id: `${r}-${c}` });
    });
  }
  const seen = new Set();
  const list = rooms.filter((rm) => {
    const k = `${rm.x}-${rm.y}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  return (
    <g transform={`translate(${r2(x)} ${r2(y)})`} fill="none" stroke={ink} strokeLinecap="round">
      {/* column grid */}
      <g strokeWidth="0.5" strokeDasharray="9 3 2 3" opacity="0.7">
        {[10, 72, 134, 196].map((gx) => <path key={gx} d={`M${gx} -6V${440}`} />)}
        {[52, 132, 212, 292, 372].map((gy) => <path key={gy} d={`M-14 ${gy}H370`} />)}
      </g>
      {/* planters (rounded islands) */}
      <path d="M0 40V4a22 22 0 0 1 22-4h30a8 8 0 0 1 8 8v34z" strokeWidth="1.1" />
      <path d="M122 40V8a8 8 0 0 1 8-8h40a8 8 0 0 1 8 8v32z" strokeWidth="1.1" />
      <rect x="250" y="12" width="40" height="400" rx="20" strokeWidth="1.1" />
      <path d="M118 440V412h50a10 10 0 0 1 10 10v18z" strokeWidth="1.1" />
      {/* the office */}
      <rect x="0" y="52" width="180" height="326" strokeWidth="2.6" />
      <path d="M120 52V4M120 4h30" strokeWidth="2" />
      {list.map((rm) => (
        <g key={rm.id}>
          <rect x={rm.x} y={rm.y} width={rm.w} height={rm.h} strokeWidth="1.1" />
          <path d={`M${r2(rm.x + rm.w * 0.18)} ${rm.y + rm.h}a${r2(rm.h * 0.3)} ${r2(rm.h * 0.3)} 0 0 1 ${r2(rm.h * 0.3)} ${r2(-rm.h * 0.3)}`} strokeWidth="0.6" />
          {rm.door > 0.45 && <rect x={r2(rm.x + rm.w * 0.5)} y={r2(rm.y + rm.h * 0.3)} width={r2(rm.w * 0.3)} height={r2(rm.h * 0.32)} strokeWidth="0.6" />}
          {rm.door > 0.75 && <rect x={r2(rm.x + rm.w * 0.14)} y={r2(rm.y + rm.h * 0.12)} width={r2(rm.w * 0.22)} height={r2(rm.h * 0.22)} rx="2" strokeWidth="0.6" />}
        </g>
      ))}
      <path d="M0 52h180v26" strokeWidth="2.6" />
      <path d="M96 378h84v-62h-84z" strokeWidth="1.8" />
      {/* the stair core: treads between two stringers */}
      <g strokeWidth="0.7">
        <path d="M126 52v34M150 52v34" />
        {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M126 ${r2(54 + i * 3.6)}H150`} />)}
        <path d="M138 56v26" strokeWidth="0.5" />
      </g>
      {/* wet rooms: small cubicles along the back wall */}
      <g strokeWidth="0.7">
        {[0, 1, 2].map((i) => <rect key={i} x={r2(6 + i * 18)} y="340" width="16" height="32" />)}
        {[0, 1, 2].map((i) => <circle key={`c${i}`} cx={r2(14 + i * 18)} cy="360" r="4" />)}
      </g>
      {/* wall poché: short hatching on the outer wall */}
      <g strokeWidth="0.5" opacity="0.6">
        {Array.from({ length: 24 }, (_, i) => <path key={i} d={`M-3 ${r2(58 + i * 13)}l3 -3`} />)}
      </g>
      {/* the car park: bays either side of a drive aisle */}
      <g strokeWidth="0.8">
        {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M196 ${r2(60 + i * 30)}H246`} />)}
        {Array.from({ length: 11 }, (_, i) => <path key={`b${i}`} d={`M296 ${r2(60 + i * 30)}H352`} />)}
        <path d="M196 60V390M352 60V390" strokeWidth="0.6" />
        <path d="M274 70v300" strokeDasharray="8 5" strokeWidth="0.6" />
      </g>
      <g strokeWidth="0.9">
        <Car x={219} y={300} />
        <Car x={324} y={140} rot={90} />
        <Car x={50} y={410} rot={0} />
        <Car x={348} y={28} rot={-32} />
        <Car x={356} y={418} rot={-24} />
      </g>
    </g>
  );
}
