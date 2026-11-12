// The box with its packaging: the slipcases (m15) and the kit contents on a shelf (plan sheets, the dark folder
// of m10, the cream tube of m01).
import Art from '@/components/art/Art';
import { MarkG, WordmarkG, WordmarkDebossG } from '@/components/art/Mark';
import { MaterialDefs, DebossDefs, BackdropG, ShelfG, CastRectG, CastG, ContactShadowG, PlaceG, SheenG, SCENE } from '@/components/art/Mockup';
import { CONTACT, LINES, URL_LINE } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Desk, SpineText } from './parts';
import PlanArt from './PlanArt';

// ---------- Slipcase ----------

// A slipcase lying with its spine to the viewer, as the stacked books of m15.
function SpineBook({ id, x, y, w = 470, h = 68 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-board)`} filter={`url(#${id}-fibre)`} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-shade-v)`} opacity="0.6" />
      <rect x={x} y={y} width={w} height="3" fill="#FFFFFF" opacity="0.3" />
      <rect x={x} y={y + h - 3} width={w} height="3" fill="#000000" opacity="0.28" />
      <rect x={x + w - 4} y={y} width="4" height={h} fill="#000000" opacity="0.22" />
      <text x={x + 24} y={y + h / 2 + 4} fontSize="12" className="sans" fill="#F5F0E3">{URL_LINE}</text>
      <text x={x + 104} y={y + h / 2 + 6} fontSize="16" className="serif" fill="#F5F0E3" letterSpacing="-0.3">{LINES.imagination.text}</text>
      <text fontSize="9.5" className="sans" fill="#F5F0E3">
        {[CONTACT.phone2, CONTACT.support, CONTACT.partnerships].map((t, i) => (
          <tspan key={t} x={x + w - 112} y={y + 23 + i * 14}>{t}</tspan>
        ))}
      </text>
    </g>
  );
}

export function Slipcase() {
  const id = 'use-product-slip';
  const cx = 600, cy = 226, cw = 236, ch = 330;
  return (
    <Art viewBox="0 0 900 640" title="Presentation box in its slipcase, with the slipcases stacked beside it" exportName="use-product-slipcase">
      <MaterialDefs idp={id} />
      <DebossDefs idp={`${id}-frame`} depth={2} />
      <Desk idp={id} w={900} h={640} horizon={0.58} wall={SCENE.sand40} floor={SCENE.chocolate} deskY={572} edge={SCENE.tribal} />
      {/* stacked, spine out */}
      <CastRectG x={54} y={524} w={470} h={14} len={64} opacity={0.3} className="sun-shadow" />
      <CastG d="M54 404h470v140H54z" len={30} steps={8} opacity={0.14} className="sun-shadow" />
      <ContactShadowG idp={`${id}-a`} cx={290} cy={546} rx={250} opacity={0.4} blur={6} />
      <PlaceG i={1}>
        <SpineBook id={id} x={50} y={476} />
        <SpineBook id={id} x={64} y={408} w={456} />
      </PlaceG>
      {/* standing slipcase with the box drawn out of its open side */}
      <CastG d={`M${cx} ${cy}h${cw}v${ch}h${-cw}z`} len={38} steps={9} opacity={0.18} className="sun-shadow" />
      <CastRectG x={cx} y={cy + ch - 8} w={cw + 60} h={14} len={64} opacity={0.3} className="sun-shadow" />
      <ContactShadowG idp={`${id}-b`} cx={cx + (cw + 60) / 2} cy={cy + ch + 3} rx={(cw + 60) / 2 + 8} opacity={0.4} blur={6} />
      <PlaceG i={2}>
        <rect x={cx + cw - 4} y={cy + 18} width="64" height={ch - 36} fill="#6A4631" />
        <rect x={cx + cw - 4} y={cy + 18} width="64" height={ch - 36} fill={`url(#${id}-shade)`} opacity="0.45" />
        <rect x={cx + cw - 4} y={cy + 18} width="64" height="3" fill="#FFFFFF" opacity="0.25" />
        <SpineText x={cx + cw + 14} bottom={cy + ch - 56} lines={[CONTACT.phone2, CONTACT.support, CONTACT.partnerships]} size={8.5} gap={12} />
        <rect x={cx} y={cy} width={cw} height={ch} fill={`url(#${id}-board)`} filter={`url(#${id}-fibre)`} />
        <rect x={cx} y={cy} width={cw} height={ch} fill={`url(#${id}-shade)`} opacity="0.55" />
        <rect x={cx} y={cy} width={cw} height="3" fill="#FFFFFF" opacity="0.3" />
        <rect x={cx} y={cy} width="3" height={ch} fill="#FFFFFF" opacity="0.2" />
        <rect x={cx + cw - 3} y={cy} width="3" height={ch} fill="#000000" opacity="0.3" />
        <g filter={`url(#${id}-frame-deboss)`}>
          <path d={`M${cx + 12} ${cy + 12}H${cx + cw - 12}V${cy + ch - 12}H${cx + 12}z M${cx + 14.5} ${cy + 14.5}V${cy + ch - 14.5}H${cx + cw - 14.5}V${cy + 14.5}z`} fill="#8F6447" fillRule="evenodd" />
        </g>
        <WordmarkDebossG idp={`${id}-cover`} x={cx + 24} y={cy + 26} width={278} vertical tone="#A57A5A" depth={2} />
        <SheenG idp={id} d={`M${cx} ${cy}h${cw}v${ch}h${-cw}z`} opacity={0.3} />
      </PlaceG>
    </Art>
  );
}

// ---------- Kit contents ----------

function SheetStack({ id, x, y, w = 250, n = 7 }) {
  const d = 46, dx = r2(d * 0.6);
  const t = 6;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const yy = y - i * t;
        const off = (i % 3) * 2 - 2;
        return (
          <g key={i}>
            <rect x={x + off} y={yy - t} width={w} height={t} fill={i % 2 ? '#F2EEE6' : '#FFFFFF'} />
            <path d={`M${x + off} ${yy}h${w}`} stroke="#35241C" strokeOpacity="0.18" strokeWidth="0.8" />
          </g>
        );
      })}
      <path d={`M${x + w} ${y - n * t}l${dx} ${-d}v${n * t}l${-dx} ${d}z`} fill="#D9D3C8" />
      <path d={`M${x} ${y - n * t}l${dx} ${-d}h${w}l${-dx} ${d}z`} fill={`url(#${id}-paper)`} filter={`url(#${id}-paper-grain)`} />
      <g transform={`matrix(${r2(w / 400)} 0 ${r2(-dx / 480)} ${r2(d / 480)} ${r2(x + dx + 20)} ${r2(y - n * t - d + 4)})`} opacity="0.85">
        <PlanArt ink="#35241C" />
      </g>
    </g>
  );
}

export function Kit() {
  const id = 'use-product-kit';
  const base = 478;
  const fx = 350, fw = 200, fh = 268;
  const tx = 640, tw = 96;
  return (
    <Art viewBox="0 0 900 640" title="Kit contents on a shelf: plan sheets, the dark folder and the cream tube" exportName="use-product-kit">
      <MaterialDefs idp={id} />
      <defs>
        <linearGradient id={`${id}-tube`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFDF7" />
          <stop offset="0.35" stopColor="#F5F0E3" />
          <stop offset="0.8" stopColor="#D9CDB8" />
          <stop offset="1" stopColor="#B9AB92" />
        </linearGradient>
        <linearGradient id={`${id}-label`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.7" stopColor="#F4F1EA" />
          <stop offset="1" stopColor="#CFC8BB" />
        </linearGradient>
      </defs>
      <BackdropG idp={id} w={900} h={640} horizon={0.9} wall={SCENE.tribal} floor={SCENE.chocolate} />
      <ShelfG x={0} y={base} w={900} depth={30} edge={22} fill={SCENE.sand20} />

      {/* plan sheets */}
      <CastRectG x={60} y={base - 14} w={250} h={14} len={40} opacity={0.3} className="sun-shadow" />
      <ContactShadowG idp={`${id}-a`} cx={190} cy={base + 1} rx={150} opacity={0.4} blur={5} />
      <PlaceG i={1}>
        <SheetStack id={id} x={60} y={base} />
      </PlaceG>

      {/* the dark folder, leaning on the wall */}
      <CastG d={`M${fx} ${base - fh}h${fw}v${fh}h${-fw}z`} len={34} steps={8} opacity={0.2} className="sun-shadow" />
      <ContactShadowG idp={`${id}-b`} cx={fx + fw / 2} cy={base + 1} rx={fw / 2 + 6} opacity={0.4} blur={5} />
      <PlaceG i={2} x={fx} y={base} rotate={-3}>
        <rect x="0" y={-fh} width={fw} height={fh} fill={`url(#${id}-board-dark)`} filter={`url(#${id}-fibre)`} />
        <rect x="0" y={-fh} width={fw} height={fh} fill={`url(#${id}-shade)`} opacity="0.5" />
        <rect x="0" y={-fh} width={fw} height="3" fill="#FFFFFF" opacity="0.22" />
        <rect x="0" y={-fh} width="3" height={fh} fill="#FFFFFF" opacity="0.14" />
        <rect x={fw - 5} y={-fh} width="5" height={fh} fill="#000000" opacity="0.35" />
        <MarkG x={fw - 62} y={-fh + 22} size={34} fill="#B58F6B" />
        <text className="serif" fontSize="19" fill="#F5F0E3" letterSpacing="-0.3">
          {LINES.imagination.rows.map((r, i) => <tspan key={r} x="22" y={-fh + 150 + i * 23}>{r}</tspan>)}
        </text>
        <text x="22" y={-26} fontSize="10" className="sans" fill="#CDBBA6">{URL_LINE}</text>
      </PlaceG>

      {/* the cream tube */}
      <CastRectG x={tx} y={base - 12} w={tw} h={12} len={54} opacity={0.3} className="sun-shadow" />
      <CastG d={`M${tx} ${base - 250}h${tw}v250h${-tw}z`} len={30} steps={7} opacity={0.16} className="sun-shadow" />
      <ContactShadowG idp={`${id}-c`} cx={tx + tw / 2} cy={base + 1} rx={tw / 2 + 6} opacity={0.42} blur={4} />
      <PlaceG i={3}>
        <rect x={tx} y={base - 250} width={tw} height="250" fill={`url(#${id}-tube)`} />
        <ellipse cx={tx + tw / 2} cy={base} rx={tw / 2} ry="9" fill="#B9AB92" />
        <rect x={tx} y={base - 250} width={tw} height="250" fill={`url(#${id}-tube)`} />
        <path d={`M${tx} ${base}a${tw / 2} 9 0 0 0 ${tw} 0v-4a${tw / 2} 9 0 0 1 ${-tw} 0z`} fill="#CDBFA8" />
        <rect x={tx} y={base - 250} width={tw} height="16" fill="#875D41" />
        <ellipse cx={tx + tw / 2} cy={base - 250} rx={tw / 2} ry="9" fill="#9A6E50" />
        <ellipse cx={tx + tw / 2} cy={base - 253} rx={tw / 2 - 8} ry="5" fill="#B58F6B" />
        <rect x={tx} y={base - 214} width={tw} height="170" fill={`url(#${id}-label)`} filter={`url(#${id}-paper-grain)`} />
        <path d={`M${tx} ${base - 214}h${tw}M${tx} ${base - 44}h${tw}`} stroke="#35241C" strokeOpacity="0.15" strokeWidth="0.8" />
        <g transform={`translate(${tx + 37} ${base - 56}) rotate(-90) scale(0.0885)`}>
          <WordmarkG fill="#000000" />
        </g>
        <rect x={tx} y={base - 250} width={tw} height="250" fill={`url(#${id}-shade)`} opacity="0.35" />
      </PlaceG>
    </Art>
  );
}
