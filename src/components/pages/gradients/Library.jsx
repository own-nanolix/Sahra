// The library: six named gradients, each its own exportable plate, rising in height from left to right.
import Art from '@/components/art/Art';
import { GrainFilter } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { contrast } from '@/lib/site';
import { GRADIENTS } from './data';
import GradDef from './GradDef';
import s from './gradients.module.css';

function Plate({ g, i }) {
  const idp = `gradients-lib-${g.id}`;
  return (
    <Art viewBox={`0 0 200 ${g.h}`} title={g.name} exportName={`gradients-lib-${g.id}`}>
      <defs>
        <GradDef idp={idp} g={g} />
        <clipPath id={`${idp}-clip`}><rect width="200" height={g.h} rx="18" /></clipPath>
        <GrainFilter idp={idp} amount={0.05} seed={i + 2} />
      </defs>
      <g clipPath={`url(#${idp}-clip)`}>
        <rect width="200" height={g.h} fill={`url(#${idp}-${g.id})`} filter={`url(#${idp}-grain)`} />
      </g>
      <rect x="0.5" y="0.5" width="199" height={g.h - 1} rx="17.5" fill="none" stroke={HEX.chocolate} strokeOpacity="0.14" />
      {g.stops.map(([o], k) => {
        // a small tick at each stop, on the vector, so the plate carries its own anatomy
        const [x1, y1, x2, y2] = g.v;
        const px = (x1 + (x2 - x1) * o) * 200, py = (y1 + (y2 - y1) * o) * g.h;
        const cx = Math.min(188, Math.max(12, px)), cy = Math.min(g.h - 12, Math.max(12, py));
        return <circle key={k} cx={cx} cy={cy} r="3.5" fill="none" stroke={contrast(g.stops[k][1], HEX.white) < 2 ? HEX.chocolate : HEX.white} strokeOpacity="0.8" strokeWidth="1.2" />;
      })}
    </Art>
  );
}

export default function Library() {
  return (
    <>
      {GRADIENTS.map((g, i) => (
        <Reveal key={g.id} delay={i * 60} className={`tile tile-beige span-2 span-m-3 span-s-1 ${s.libTile}`}>
          <Plate g={g} i={i} />
          <h3 className="t-h3">{g.name}</h3>
          <ul className={s.stops}>
            {g.stops.map(([o, c, n]) => (
              <li key={o} className="t-small"><i className={s.dot} style={{ background: c }} />{n} {Math.round(o * 100)}% {c}</li>
            ))}
          </ul>
        </Reveal>
      ))}
    </>
  );
}
