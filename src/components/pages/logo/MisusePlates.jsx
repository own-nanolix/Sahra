// Six misuses, each a small square exportable plate (one tile of the misuse strip) with a plain English label.
import Art from '@/components/art/Art';
import { WordmarkG, WordmarkOutlineG } from '@/components/art/Mark';
import { PHOTO } from '@/components/art/KeyArt';
import { wrap } from '@/components/art/Devices';
import { HEX } from '@/lib/brand';
import { PLATE_INK } from './data';

const W = 600, H = 600, MW = 440, MX = (W - MW) / 2, MH = (251 * MW) / 1420, CY = 250, MY = Math.round(CY - MH / 2);

// The treatment itself, drawn by kind.
function Treatment({ kind }) {
  switch (kind) {
    case 'stretch':
      return (
        <g transform={`translate(${MX} ${Math.round(CY - MH * 1.15)}) scale(1 2.3)`}>
          <WordmarkG width={MW} fill={HEX.chocolate} />
        </g>
      );
    case 'rotate':
      return (
        <g transform={`rotate(-16 ${W / 2} ${CY})`}>
          <WordmarkG x={MX} y={MY} width={MW} fill={HEX.chocolate} />
        </g>
      );
    case 'outline':
      return <WordmarkOutlineG x={MX} y={MY} width={MW} stroke={HEX.chocolate} strokeWidth={1.8} />;
    case 'contrast':
      return <WordmarkG x={MX} y={MY} width={MW} fill={HEX.sand} />;
    case 'colour':
      return <WordmarkG x={MX} y={MY} width={MW} fill={PHOTO.sky} />;
    default:
      return (
        <g>
          <WordmarkG x={MX + 12} y={MY + 12} width={MW} fill={HEX.chocolate} opacity="0.35" />
          <WordmarkG x={MX} y={MY} width={MW} fill={HEX.tribal} />
        </g>
      );
  }
}

export function MisusePlate({ item }) {
  const lines = wrap(item.label, 20);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`Misuse: ${item.label}`} exportName={`logo-misuse-${item.id}`}>
      <rect width={W} height={H} fill={HEX.beige} />
      <rect x="1" y="1" width={W - 2} height={H - 2} fill="none" stroke={HEX.tribal} strokeOpacity="0.35" strokeWidth="2" />
      <Treatment kind={item.kind} />
      <g stroke={PLATE_INK.alert} strokeWidth="4" fill="none">
        <circle cx={W - 60} cy="60" r="26" />
        <path d={`M${W - 71} 49l22 22M${W - 49} 49l-22 22`} />
      </g>
      <text fontSize="42" fill={PLATE_INK.dark} className="sans">
        {lines.map((ln, i) => (
          <tspan key={ln} x="44" y={H - 56 - (lines.length - 1 - i) * 52}>{ln}</tspan>
        ))}
      </text>
    </Art>
  );
}
