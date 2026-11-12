// Six misuses, each a small exportable plate with a plain English label.
import Art from '@/components/art/Art';
import { WordmarkG, WordmarkOutlineG } from '@/components/art/Mark';
import { PHOTO } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { PLATE_INK } from './data';

const W = 600, H = 450, MX = 110, MY = 178, MW = 380;

// The treatment itself, drawn by kind.
function Treatment({ kind }) {
  switch (kind) {
    case 'stretch':
      return (
        <g transform={`translate(${MX} 112) scale(1 2.3)`}>
          <WordmarkG width={MW} fill={HEX.chocolate} />
        </g>
      );
    case 'rotate':
      return (
        <g transform={`rotate(-16 ${W / 2} 210)`}>
          <WordmarkG x={MX} y={MY} width={MW} fill={HEX.chocolate} />
        </g>
      );
    case 'outline':
      return <WordmarkOutlineG x={MX} y={MY} width={MW} stroke={HEX.chocolate} strokeWidth={1.6} />;
    case 'contrast':
      return <WordmarkG x={MX} y={MY} width={MW} fill={HEX.sand} />;
    case 'colour':
      return <WordmarkG x={MX} y={MY} width={MW} fill={PHOTO.sky} />;
    default:
      return (
        <g>
          <WordmarkG x={MX + 11} y={MY + 11} width={MW} fill={HEX.chocolate} opacity="0.35" />
          <WordmarkG x={MX} y={MY} width={MW} fill={HEX.tribal} />
        </g>
      );
  }
}

export function MisusePlate({ item }) {
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`Misuse: ${item.label}`} exportName={`logo-misuse-${item.id}`}>
      <rect width={W} height={H} fill={HEX.beige} />
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} fill="none" stroke={HEX.tribal} strokeOpacity="0.35" />
      <Treatment kind={item.kind} />
      <g stroke={PLATE_INK.alert} strokeWidth="3" fill="none">
        <circle cx={W - 44} cy="44" r="18" />
        <path d={`M${W - 52} 36l16 16M${W - 36} 36l-16 16`} />
      </g>
      <text x="32" y={H - 32} fontSize="26" fill={PLATE_INK.dark} className="sans">{item.label}</text>
    </Art>
  );
}
