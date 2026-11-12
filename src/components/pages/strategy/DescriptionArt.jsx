// The case study's page description as a drawing: desert tones (dunes in the palette's own tints) meeting clean,
// contemporary design (the guide grid), resting on a balance between nature, comfort and modern lifestyle
// (three equal quarter arches). Exportable; CSS animation only.
import Art from '@/components/art/Art';
import { GuideGridG, QuarterArchG, DRAWING } from '@/components/art/KeyArt';
import { HEX, TINTS } from '@/lib/brand';
import { areaPath, smoothPath, r2 } from '@/lib/charts';

const drawProps = (i) => ({ className: 'draw', pathLength: 1, style: { '--len': 1, '--i': i } });

// Three dune lines, back to front; heights are drawn by eye, they are not data.
const DUNES = [
  { pts: [[0, 214], [120, 168], [260, 206], [400, 150], [520, 196], [640, 176]], fill: TINTS.sand[3], z: 0 },
  { pts: [[0, 246], [110, 206], [250, 240], [380, 196], [520, 236], [640, 214]], fill: TINTS.sand[1], z: 1 },
  { pts: [[0, 280], [140, 252], [280, 276], [420, 240], [560, 274], [640, 258]], fill: HEX.sand, z: 2 },
];

export default function DescriptionArt() {
  const W = 640;
  const H = 400;
  const words = ['nature', 'comfort', 'modern lifestyle'];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Desert dunes meeting a clean grid, resting on a balance of nature, comfort and modern lifestyle" exportName="strategy-desert">
      <defs>
        <clipPath id="strategy-desert-clip">
          <rect width={W} height="300" />
        </clipPath>
      </defs>
      <rect width={W} height={H} fill={HEX.beige} />
      <g clipPath="url(#strategy-desert-clip)">
        <GuideGridG x={0} y={0} w={W} h={300} step={40} stroke={DRAWING.guide} className="fade-in" />
        {DUNES.map((d) => (
          <g key={d.z} className="rise" style={{ '--i': d.z * 3 }}>
            <path d={areaPath(d.pts, 300, 'smooth')} fill={d.fill} />
          </g>
        ))}
        {DUNES.map((d) => (
          <path key={`l${d.z}`} d={smoothPath(d.pts)} fill="none" stroke={HEX.chocolate} strokeWidth="1.2" opacity="0.55" {...drawProps(4 + d.z)} />
        ))}
      </g>
      <path d={`M0 300H${W}`} stroke={HEX.chocolate} strokeWidth="1.4" fill="none" {...drawProps(0)} />
      {words.map((w, i) => {
        const cx = 40 + i * 170 + (i === 2 ? 40 : 0);
        return (
          <g key={w}>
            <g className="slide-up" style={{ '--i': 8 + i * 2 }}>
              <QuarterArchG cx={cx} cy={360} r={14} R={44} quadrant="tr" fill={i === 1 ? HEX.tribal : HEX.sand} />
            </g>
            <text x={r2(cx + 56)} y="356" className="serif fade-in" fontSize="22" fill={HEX.chocolate} style={{ '--i': 10 + i * 2 }}>{w}</text>
          </g>
        );
      })}
    </Art>
  );
}
