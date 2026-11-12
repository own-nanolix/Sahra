// Two close-ups of the open box (m13): the blind deboss on the lid, and the black rings holding the sheet.
import Art from '@/components/art/Art';
import { WordmarkDebossG } from '@/components/art/Mark';
import { MaterialDefs, DebossDefs, CastRectG } from '@/components/art/Mockup';
import { SENDER } from '@/lib/brand';
import { Ring } from './parts';

// The lid, enlarged: the debossed frame's corner and the word-mark pressed into the board, raking light.
export function LidDetail() {
  const id = 'use-product-lid';
  return (
    <Art viewBox="0 0 900 640" title="Lid, blind deboss in close view" exportName="use-product-lid-detail">
      <MaterialDefs idp={id} />
      <DebossDefs idp={`${id}-frame`} depth={5} />
      <clipPath id={`${id}-clip`}>
        <rect width="900" height="640" />
      </clipPath>
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="900" height="640" fill={`url(#${id}-board)`} filter={`url(#${id}-fibre)`} />
        <rect width="900" height="640" fill={`url(#${id}-shade)`} opacity="0.35" />
        <g filter={`url(#${id}-frame-deboss)`}>
          <path d="M70 60H900V640H70z M80 70V640H900V70z" fill="#8F6447" fillRule="evenodd" />
        </g>
        <WordmarkDebossG idp={`${id}-wm`} x={250} y={-260} width={1400} vertical tone="#A57A5A" depth={9} />
      </g>
    </Art>
  );
}

// The rings, enlarged: the dark tray, the ring mount, the sheet's punched edge, two black rings with a highlight.
export function RingDetail() {
  const id = 'use-product-rings';
  const k = 3.2;
  return (
    <Art viewBox="0 0 900 640" title="Rings and plan sheet in close view" exportName="use-product-rings-detail">
      <MaterialDefs idp={id} />
      <defs>
        <linearGradient id={`${id}-cavity`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B0705" />
          <stop offset="1" stopColor="#2A1B13" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>
      <rect width="900" height="640" fill={`url(#${id}-cavity)`} />
      <rect y="560" width="900" height="80" fill="#5B3D2B" />
      <rect y="560" width="900" height="3" fill="#FFFFFF" opacity="0.18" />
      {/* the ring mount, a black strip behind the sheet */}
      <path d="M236 0H300Q312 0 312 14V626Q312 640 300 640H236z" fill="#0A0705" />
      <path d="M244 0V640" stroke="#5A4C44" strokeWidth="3" opacity="0.6" />
      {/* the sheet, its soft and hard shadows, its paper edge */}
      <rect x="336" y="-20" width="600" height="600" fill="#000000" opacity="0.5" filter={`url(#${id}-blur)`} />
      <CastRectG x={318} y={-10} w={600} h={590} len={14} opacity={0.35} />
      <rect x="318" y="-10" width="620" height="600" fill="#D9D3C8" />
      <rect x="320" y="-10" width="618" height="592" fill="#FFFFFF" filter={`url(#${id}-paper-grain)`} />
      <text x="388" y="70" fontSize="24" className="sans" fill="#875D41">{SENDER.developement}</text>
      <path d="M388 100H860" stroke="#35241C" strokeOpacity="0.5" strokeWidth="1.6" />
      <path d="M388 122H760M388 144H820" stroke="#35241C" strokeOpacity="0.16" strokeWidth="6" strokeLinecap="round" />
      {/* the punched holes and the rings */}
      <circle cx="352" cy="196" r="15" fill="#0A0705" />
      <circle cx="352" cy="458" r="15" fill="#0A0705" />
      <g transform={`translate(${-846 * k + 130} ${196 - 453 * k}) scale(${k})`}>
        <Ring y={453} />
      </g>
      <g transform={`translate(${-846 * k + 130} ${458 - 453 * k}) scale(${k})`}>
        <Ring y={453} />
      </g>
    </Art>
  );
}
