// A desk mat crossing the frame and a mouse pad, desk top view.
import { CastRectG } from '@/components/art/Mockup';
import { WordmarkG } from '@/components/art/Mark';
import Stage, { C, Ledge, Mk, Stitch, Sheet, rrect } from './kit';

function DeskMat() {
  const y = 44, h = 268;
  return (
    <Stage id="desk-mat" title="Dark Chocolate desk mat with the word-mark cropped very large, tone on tone" w={1600} h={400} horizon={0.88} wall={C.sand40} floor={C.chocolate} order={1}>
      {(idp) => (
        <g>
          <Ledge y={356} w={1600} h={400} thick={18} edge={C.tribal} apron={C.chocolate} />
          <CastRectG x={0} y={y} w={1600} h={h} len={22} opacity={0.28} />
          <rect x="-10" y={y + 5} width="1620" height={h} fill="#150D09" />
          <clipPath id={`${idp}-mat`}>
            <rect x="-10" y={y} width="1620" height={h} />
          </clipPath>
          <rect x="-10" y={y} width="1620" height={h} fill={C.chocolate} filter={`url(#${idp}-fabric)`} />
          <g clipPath={`url(#${idp}-mat)`}>
            <WordmarkG x={-420} y={y - 74} width={2420} fill="#5C463C" />
            <rect x="-10" y={y} width="1620" height={h} fill={`url(#${idp}-rubber)`} opacity="0.04" />
            <rect x="-10" y={y} width="1620" height="4" fill="#FFFFFF" opacity="0.14" />
          </g>
          <Stitch d={`M-10 ${y + 16}H1610M-10 ${y + h - 16}H1610`} color={C.sand} opacity={0.55} width={2.2} dash="9 7" />
          <Sheet idp={idp} d={`M-10 ${y}H1610V${y + h}H-10Z`} />
        </g>
      )}
    </Stage>
  );
}

function MousePad() {
  const pad = rrect(215, 70, 470, 384, 44);
  return (
    <Stage id="mouse-pad" title="Sand mouse pad with the mark" w={900} h={600} horizon={0.9} wall={C.beige} floor={C.chocolate} order={1}>
      {(idp) => (
        <g>
          <Ledge y={548} w={900} h={600} thick={22} edge={C.tribal} apron={C.chocolate} />
          <g transform="rotate(-5 450 262)">
            <CastRectG x={215} y={70} w={470} h={384} len={24} opacity={0.26} />
            <path d={pad} fill="#1E1410" transform="translate(0 6)" />
            <path d={pad} fill={C.sand} filter={`url(#${idp}-fabric)`} />
            <Mk cx={450} cy={262} s={118} fill={C.tribal} />
            <path d={rrect(233, 88, 434, 348, 30)} fill="none" stroke={C.beige} strokeOpacity="0.6" strokeWidth="2.4" strokeDasharray="9 7" />
            <path d={pad} fill="none" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="2" />
            <Sheet idp={idp} d={pad} />
          </g>
        </g>
      )}
    </Stage>
  );
}

export const DESK_PLATES = {
  mat: { key: 'desk-mat', cap: 'Desk mat', c: 8, r: 2, ar: 4, node: <DeskMat /> },
  pad: { key: 'mouse-pad', cap: 'Mouse pad', c: 3, r: 2, ar: 1.5, node: <MousePad /> },
};
