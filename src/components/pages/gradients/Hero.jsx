// The one gradient the case study shows: the brown header of the profile card (m12), rebuilt and measured.
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { GrainFilter } from '@/components/art/KeyArt';
import { quarterArch } from '@/components/art/KeyArt';
import { PROFILE, HEX } from '@/lib/brand';
import { byId, HEADER_SAMPLES, mix } from './data';
import GradDef from './GradDef';
import s from './gradients.module.css';

const P = 'gradients-hero';
const W = 512, H = 410, HEAD = 171, RAD = 44;
// The card body is a pale grey in the reference, sampled at #F5F5F5 (not the palette's White).
const CARD = '#F5F5F5';
const BIO = [
  'Sahra is where creativity meets purpose, crafting refined brand experiences that',
  'inspire and resonate. Through thoughtful design and a deep understanding of',
  'identity, we transform ideas into meaningful visual narratives.',
];

export function ProfileHeaderArt() {
  const g = byId('chocolate-tribal');
  const arch = quarterArch(202, HEAD, 44, 132, 'tl');
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Profile card with its brown header gradient" exportName="gradients-profile-header">
      <defs>
        <GradDef idp={P} g={{ ...g, v: [0, 0, 1, 0] }} />
        <linearGradient id={`${P}-arch`} gradientUnits="userSpaceOnUse" x1="70" y1="0" x2="430" y2="0">
          <stop offset="0" stopColor="#8D6143" />
          <stop offset="0.55" stopColor="#6A4A35" stopOpacity="0.7" />
          <stop offset="1" stopColor="#6A4A35" stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${P}-card`}><rect width={W} height={H} rx={RAD} /></clipPath>
        <clipPath id={`${P}-head`}><rect width={W} height={HEAD} /></clipPath>
        <GrainFilter idp={P} amount={0.05} />
      </defs>
      <g clipPath={`url(#${P}-card)`}>
        <rect width={W} height={H} fill={CARD} />
        <g clipPath={`url(#${P}-head)`}>
          <rect width={W} height={HEAD} fill={`url(#${P}-chocolate-tribal)`} filter={`url(#${P}-grain)`} />
          <path d={arch} fill={`url(#${P}-arch)`} />
          <rect x="202" y="39" width={W - 202} height="88" fill={`url(#${P}-arch)`} />
        </g>
      </g>
      <text className="serif" fontSize="29" fill={HEX.beige} letterSpacing="-0.3">
        <tspan x="234" y="80">{PROFILE.header.rows[0]}</tspan>
        <tspan x="234" y="112">{PROFILE.header.rows[1]}</tspan>
      </text>
      <rect x="46" y="129" width="104" height="104" rx="26" fill={HEX.beige} />
      <MarkG x={70} y={157} size={56} fill={HEX.tribal} />
      <rect x="302" y="193" width="161" height="46" rx="8" fill={HEX.black} />
      <text className="sans" x="382.5" y="222" fontSize="20" textAnchor="middle" fill={HEX.white}>{PROFILE.action}</text>
      <text className="sans" x="44" y="282" fontSize="25" fill={HEX.ink}>{PROFILE.name}</text>
      <text className="sans" x="44" y="310" fontSize="19" fill={HEX.muted}>{PROFILE.handle}</text>
      <text className="sans" fontSize="10.5" fill={HEX.ink}>
        {BIO.map((l, i) => <tspan key={i} x="44" y={338 + i * 19}>{l}</tspan>)}
      </text>
    </Art>
  );
}

// The measured samples next to what the rebuilt two-stop gradient gives at the same place.
export function SampleTable() {
  const [a, b] = byId('chocolate-tribal').stops;
  return (
    <div className={s.tableWrap}>
      <table className={s.samples}>
        <caption className="sr-only">Header gradient: measured against rebuilt</caption>
        <thead>
          <tr><th scope="col">Across the card</th><th scope="col">Measured</th><th scope="col">Rebuilt</th></tr>
        </thead>
        <tbody>
          {HEADER_SAMPLES.map(([t, hex]) => (
            <tr key={t}>
              <th scope="row">{Math.round(t * 100)}%</th>
              <td><i className={s.dot} style={{ background: hex }} />{hex}</td>
              <td><i className={s.dot} style={{ background: mix(a[1], b[1], t) }} />{mix(a[1], b[1], t)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
