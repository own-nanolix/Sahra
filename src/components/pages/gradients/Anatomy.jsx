// Anatomy of two gradients: the vector, the stops (anchors, as the construction drawing marks them), their
// positions and the angle, drawn and labelled in the construction drawing's own colours (m03).
import Art from '@/components/art/Art';
import { DRAWING } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { byId } from './data';
import GradDef from './GradDef';
import s from './gradients.module.css';

const VB = { w: 600, h: 420 };

const PLATES = [
  { id: 'chocolate-tribal', rect: [60, 46, 480, 190], labels: 'below', cap: 'Two stops, one horizontal vector' },
  { id: 'black-chocolate-tribal', rect: [60, 30, 300, 300], labels: 'right', cap: 'Three stops on a 45 degree vector' },
];

function Plate({ spec }) {
  const g = byId(spec.id);
  const idp = `gradients-anat-${g.id}`;
  const [rx, ry, rw, rh] = spec.rect;
  const [x1, y1, x2, y2] = g.v;
  const mid = (a, b, lo, size) => (a === b ? lo + size / 2 : null); // a flat vector is drawn through the middle
  const ay0 = mid(y1, y2, ry, rh), ax0 = mid(x1, x2, rx, rw);
  const ax = r2(ax0 ?? rx + x1 * rw), ay = r2(ay0 ?? ry + y1 * rh), bx = r2(ax0 ?? rx + x2 * rw), by = r2(ay0 ?? ry + y2 * rh);
  const len = r2(Math.hypot(bx - ax, by - ay));
  const ang = Math.round((Math.atan2(by - ay, bx - ax) * 180) / Math.PI);
  const arcR = 54;
  const arc = `M${r2(ax + arcR)} ${ay}A${arcR} ${arcR} 0 0 1 ${r2(ax + arcR * Math.cos((ang * Math.PI) / 180))} ${r2(ay + arcR * Math.sin((ang * Math.PI) / 180))}`;
  const below = spec.labels === 'below';
  const textY = below ? ry + rh + 50 : 0;
  const ink = { fill: HEX.ink }, mut = { fill: HEX.muted };
  return (
    <Art viewBox={`0 0 ${VB.w} ${VB.h}`} title={`Anatomy of ${g.name}`} exportName={`gradients-anatomy-${g.id}`}>
      <defs><GradDef idp={idp} g={g} /></defs>
      <rect width={VB.w} height={VB.h} fill={HEX.beige} />
      <rect x={rx} y={ry} width={rw} height={rh} fill={`url(#${idp}-${g.id})`} />
      <rect x={rx} y={ry} width={rw} height={rh} fill="none" stroke={DRAWING.line} strokeWidth="1" />
      {ang !== 0 && <path d={`M${ax} ${ay}H${r2(ax + 120)}`} stroke={HEX.beige} strokeWidth="1" strokeDasharray="4 4" />}
      {ang !== 0 && <path d={arc} fill="none" stroke={DRAWING.angle} strokeWidth="1.6" />}
      <path d={`M${ax} ${ay}L${bx} ${by}`} stroke={HEX.beige} strokeWidth="2" className="draw" style={{ '--len': len }} />
      {g.stops.map(([o, c, n], i) => {
        const mx = r2(ax + (bx - ax) * o), my = r2(ay + (by - ay) * o);
        const lx = below ? mx : rx + rw + 30;
        const ly = below ? ry + rh + 24 : my;
        const anchor = below ? (o === 0 ? 'start' : o === 1 ? 'end' : 'middle') : 'start';
        const tx = below ? lx + (o === 0 ? -4 : o === 1 ? 4 : 0) : lx + 8;
        const ty = below ? textY : my - 10;
        return (
          <g key={o}>
            <path d={below ? `M${mx} ${my}V${ly}` : `M${mx} ${my}H${lx}`} stroke={DRAWING.line} strokeWidth="1" />
            <g className="fade-in" style={{ '--i': i + 3 }}>
              <rect x={mx - 5} y={my - 5} width="10" height="10" fill={DRAWING.anchor} />
              <text className="sans" x={tx} y={ty} fontSize="14" textAnchor={anchor} {...ink}>Stop {i + 1}: {n}</text>
              <text className="sans" x={tx} y={ty + 18} fontSize="13" textAnchor={anchor} {...mut}>{Math.round(o * 100)}%  {c}</text>
            </g>
          </g>
        );
      })}
      {ang !== 0 && <text className="sans" x={ax + arcR + 12} y={ay + 22} fontSize="14" fill={HEX.beige}>{ang}°</text>}
      {ang === 0 && <text className="sans" x={ax + 8} y={ay - 10} fontSize="14" fill={HEX.beige}>0°</text>}
      <text className="sans" x="60" y={VB.h - 26} fontSize="13" {...mut}>
        Vector from {g.v[0]}, {g.v[1]} to {g.v[2]}, {g.v[3]} across the shape
      </text>
    </Art>
  );
}

export default function Anatomy() {
  return (
    <>
      {PLATES.map((p, i) => (
        <Reveal key={p.id} delay={i * 80} className={`tile tile-beige span-6 ${s.anat}`}>
          <Plate spec={p} />
          <p className={`t-small ${s.cap}`}>{p.cap}</p>
        </Reveal>
      ))}
    </>
  );
}
