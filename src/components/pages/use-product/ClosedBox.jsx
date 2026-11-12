// The closed presentation box on a desk: front view (turns slowly to the light) and side view (the spine).
import Art from '@/components/art/Art';
import { MarkG, WordmarkDebossG } from '@/components/art/Mark';
import { MaterialDefs, DebossDefs, CastG, CastRectG, ContactShadowG, SheenG, SCENE } from '@/components/art/Mockup';
import { CONTACT } from '@/lib/brand';
import { Desk, SpineText } from './parts';

const SAND = '#B58F6B';

// A ribbon pull lying on the desk, foreshortened, its free end cut on the word-mark's diagonal.
function Ribbon({ x, y, w = 16, len = 40, id }) {
  return (
    <g>
      <path d={`M${x} ${y}h${w}l4 ${len}l-${w / 2 + 4} -9l-${w / 2 + 4} 9z`} fill="#000000" opacity="0.22" transform="translate(5 4)" />
      <path d={`M${x} ${y}h${w}l2 ${len}l-${w / 2 + 2} -10l-${w / 2 + 2} 10z`} fill={`url(#${id}-ribbon)`} />
      <path d={`M${x + 2} ${y}v${len - 8}`} stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.5" />
    </g>
  );
}

function RibbonDefs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-ribbon`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#C9A584" />
        <stop offset="0.5" stopColor={SAND} />
        <stop offset="1" stopColor="#9A7656" />
      </linearGradient>
    </defs>
  );
}

// ---------- Front ----------
export function BoxFront() {
  const id = 'use-product-front';
  const x = 400, y = 106, w = 346, h = 472, side = 34;
  const sheenD = `M${x} ${y}h${w}v${h}h${-w}z`;
  return (
    <Art viewBox="0 0 1200 700" title="Presentation box, closed, front view" exportName="use-product-box-front">
      <MaterialDefs idp={id} />
      <DebossDefs idp={`${id}-frame`} depth={2} />
      <RibbonDefs id={id} />
      <Desk idp={id} w={1200} h={700} horizon={0.6} wall={SCENE.beige} floor={SCENE.sand} deskY={622} edge={SCENE.tribal} />
      <CastG d={`M${x} ${y}h${w + side}v${h}h${-w - side}z`} len={46} steps={10} opacity={0.12} className="sun-shadow" />
      <CastRectG x={x} y={y + h - 8} w={w + side} h={16} len={70} opacity={0.3} className="sun-shadow" />
      <ContactShadowG idp={id} cx={x + (w + side) / 2} cy={y + h + 2} rx={(w + side) / 2 + 8} opacity={0.4} blur={6} />
      <Ribbon x={x + 58} y={y + h - 2} id={id} />
      <g className="mock-lit">
        {/* right-hand board edge, painted */}
        <path d={`M${x + w} ${y}l${side} 8v${h - 14}l${-side} 6z`} fill="#6B4630" />
        <path d={`M${x + w} ${y}l${side} 8v3l${-side} -3z`} fill="#FFFFFF" opacity="0.2" />
        <path d={`M${x + w + 2} ${y + h * 0.46}l${side - 4} 3`} stroke="#2B1B13" strokeOpacity="0.5" strokeWidth="1.2" />
        {/* the cover */}
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-board)`} filter={`url(#${id}-fibre)`} />
        <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-shade)`} opacity="0.55" />
        <rect x={x} y={y} width={w} height="3" fill="#FFFFFF" opacity="0.3" />
        <rect x={x} y={y} width="3" height={h} fill="#FFFFFF" opacity="0.2" />
        <rect x={x} y={y + h - 3} width={w} height="3" fill="#000000" opacity="0.3" />
        <g filter={`url(#${id}-frame-deboss)`}>
          <path d={`M${x + 16} ${y + 16}H${x + w - 16}V${y + h - 16}H${x + 16}z M${x + 18.5} ${y + 18.5}V${y + h - 18.5}H${x + w - 18.5}V${y + 18.5}z`} fill="#8F6447" fillRule="evenodd" />
        </g>
        <WordmarkDebossG idp={`${id}-lid`} x={x + 34} y={y + 36} width={400} vertical tone="#A57A5A" depth={2.4} />
        <SheenG idp={id} d={sheenD} opacity={0.35} />
      </g>
    </Art>
  );
}

// ---------- Side ----------
export function BoxSide() {
  const id = 'use-product-side';
  const x = 258, y = 96, w = 86, h = 500;
  return (
    <Art viewBox="0 0 600 700" title="Presentation box, closed, side view with the spine" exportName="use-product-box-side">
      <MaterialDefs idp={id} />
      <RibbonDefs id={id} />
      <Desk idp={id} w={600} h={700} horizon={0.58} wall="#CFBEB3" floor={SCENE.tribal} deskY={642} edge={SCENE.chocolate} />
      <CastG d={`M${x} ${y}h${w}v${h}h${-w}z`} len={40} steps={9} opacity={0.2} className="sun-shadow" />
      <CastRectG x={x} y={y + h - 6} w={w} h={12} len={60} opacity={0.3} className="sun-shadow" />
      <ContactShadowG idp={id} cx={x + w / 2} cy={y + h + 2} rx={w / 2 + 12} opacity={0.4} blur={5} />
      <Ribbon x={x + w - 30} y={y + h - 2} id={id} />
      {/* the spine */}
      <rect x={x} y={y} width={w} height={h} fill="#7A5239" filter={`url(#${id}-fibre)`} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-shade)`} opacity="0.5" />
      {/* board thickness: the lid and tray edges, wrapped board */}
      <rect x={x} y={y} width="5" height={h} fill="#FFFFFF" opacity="0.2" />
      <rect x={x + w - 4} y={y} width="4" height={h} fill="#000000" opacity="0.3" />
      <rect x={x} y={y} width={w} height="3" fill="#FFFFFF" opacity="0.3" />
      <path d={`M${x + 3} ${y + 10}H${x + w - 3}M${x + 3} ${y + h - 10}H${x + w - 3}`} stroke="#2B1B13" strokeOpacity="0.45" strokeWidth="1.2" />
      <SpineText x={x + 20} bottom={y + 150} lines={[CONTACT.phone2, CONTACT.support, CONTACT.partnerships]} size={10} gap={14} />
      <SpineText x={x + 27} bottom={y + 296} lines={[CONTACT.web, CONTACT.handle]} size={10} gap={14} />
      <SpineText x={x + 20} bottom={y + 440} lines={[CONTACT.city, CONTACT.phone, CONTACT.info]} size={10} gap={14} />
      <MarkG x={x + w / 2 - 14} y={y + h - 50} size={28} fill="#F5F0E3" />
    </Art>
  );
}
