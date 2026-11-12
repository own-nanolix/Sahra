// Two ceramic mugs on a desk edge, front view. One has its handle turned to the light (left).
import { ContactShadowG } from '@/components/art/Mockup';
import Stage, { C, Cyl, Ledge, Mk, Wm, SHADOW_INK } from './kit';

const CX = 380;
const BODY = 'M280 120V306A100 16 0 0 0 480 306V120Z';

const MUGS = [
  { id: 'mug-beige', title: 'Matte Beige ceramic mug with the mark', fill: 'ceramic', dark: '#BFAF98', rim: '#FBF8F0', inner: '#B3A28A', wall: C.tribal, desk: C.chocolate, edge: C.sand, side: 1, art: 'mark', ink: C.tribal },
  { id: 'mug-chocolate', title: 'Dark Chocolate ceramic mug with the word-mark', fill: C.chocolate, dark: '#1E140F', rim: '#4A3529', inner: '#150D09', wall: C.sand, desk: C.beige, edge: C.tribal, side: -1, art: 'wordmark', ink: C.sand },
];

// x mirrored about the mug axis when the handle sits on the left.
const hx = (x, m) => CX + m * (x - CX);

function Mug({ cw, lit }) {
  const m = cw.side;
  const handle = `M${hx(476, m)} 160C${hx(570, m)} 150 ${hx(572, m)} 264 ${hx(474, m)} 258`;
  const fill = cw.fill === 'ceramic' ? 'url(#IDP-ceramic)' : cw.fill;
  return (
    <Stage id={cw.id} title={cw.title} w={800} h={400} horizon={0.62} wall={cw.wall} floor={cw.desk} lit={lit} order={1}>
      {(idp) => (
        <g>
          <Ledge y={332} w={800} h={400} thick={24} edge={cw.edge} apron={C.chocolate} />
          <path d="M296 306H480L612 330H424Z" fill={SHADOW_INK} opacity="0.24" />
          <path d={`${handle}`} fill="none" stroke={SHADOW_INK} strokeOpacity="0.2" strokeWidth="26" transform="translate(30 20)" />
          <ContactShadowG idp={idp} cx={CX} cy={318} rx={104} opacity={0.4} />
          <path d={handle} fill="none" stroke={cw.dark} strokeWidth="30" strokeLinecap="round" />
          <path d={handle} fill="none" stroke={cw.fill === 'ceramic' ? C.beige : cw.rim} strokeWidth="23" strokeLinecap="round" />
          <path d={handle} fill="none" stroke="#FFFFFF" strokeOpacity={m < 0 ? 0.5 : 0.18} strokeWidth="4" strokeLinecap="round" transform="translate(-4 -4)" />
          <path d={BODY} fill={fill.replace('IDP', idp)} />
          <clipPath id={`${idp}-body`}>
            <path d={BODY} />
          </clipPath>
          <g clipPath={`url(#${idp}-body)`}>
            {cw.art === 'mark' ? <Mk cx={CX} cy={216} s={62} fill={cw.ink} sx={0.94} /> : <Wm cx={CX} cy={214} w={150} fill={cw.ink} sx={0.9} />}
          </g>
          <Cyl idp={idp} d={BODY} />
          <ellipse cx={CX} cy="120" rx="100" ry="16" fill={cw.rim} />
          <ellipse cx={CX} cy="121" rx="91" ry="12" fill={cw.inner} />
          <path d="M289 121A91 12 0 0 0 471 121A91 9 0 0 1 289 121Z" fill="#000000" opacity="0.25" />
          <ellipse cx={CX} cy="120" rx="100" ry="16" fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.5" />
        </g>
      )}
    </Stage>
  );
}

export const MUG_PLATES = MUGS.map((cw, i) => ({ key: cw.id, cap: i ? 'Mug, Dark Chocolate' : 'Mug, Beige ceramic', c: 2, r: 1, ar: 2, node: <Mug cw={cw} /> }));
