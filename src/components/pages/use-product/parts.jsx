// Shared pieces of the use-product plates: the page's plate wrapper, the desk scene, vertical spine text.
import Reveal from '@/components/site/Reveal';
import { BackdropG, DeskEdgeG, SHADOW_INK } from '@/components/art/Mockup';
import s from './use-product.module.css';

// A tile holding one exportable SVG and its plain-name caption.
export function Plate({ span = 'span-4', caption, delay = 0, children, className = '' }) {
  return (
    <Reveal as="figure" delay={delay} className={`tile tile-flush ${span} ${s.plate} ${className}`}>
      <div className="mock">{children}</div>
      <figcaption className={`mock-cap ${s.cap}`}>
        <span>{caption}</span>
      </figcaption>
    </Reveal>
  );
}

// A desk seen from the front: the wall field over the desk top, the desk's front edge at deskY, the dark
// underside below it.
export function Desk({ idp, w, h, horizon = 0.6, wall, floor, deskY, edge, grain = true }) {
  return (
    <g>
      <BackdropG idp={idp} w={w} h={h} horizon={horizon} wall={wall} floor={floor} grain={grain} />
      <DeskEdgeG y={deskY} w={w} thickness={26} top={floor} edge={edge} />
      <rect y={deskY + 36} width={w} height={h - deskY - 36} fill={SHADOW_INK} opacity="0.82" />
    </g>
  );
}

// Contact lines set vertically (reading bottom to top) on a spine. x is the first baseline, bottom the start.
export function SpineText({ x, bottom, lines, size = 11, gap = 15.5, fill = '#F5F0E3' }) {
  return (
    <g fontSize={size} className="sans" fill={fill} opacity="0.92">
      {lines.map((t, i) => (
        <text key={t} transform={`translate(${x + i * gap} ${bottom}) rotate(-90)`}>{t}</text>
      ))}
    </g>
  );
}

// A black metal ring of the binder (m13): two arcs, a highlight along the top, the hinge pin. y = the ring axis.
export function Ring({ y }) {
  return (
    <g>
      <path d={`M846 ${y + 4}a62 15 0 0 1 120 -6`} fill="none" stroke="#0A0705" strokeWidth="9" strokeLinecap="round" />
      <path d={`M846 ${y + 4}a62 17 0 0 0 112 10`} fill="none" stroke="#0A0705" strokeWidth="9" strokeLinecap="round" />
      <path d={`M852 ${y - 2}a58 12 0 0 1 100 -5`} fill="none" stroke="#6B5E56" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="962" cy={y - 2} r="6" fill="#0A0705" />
      <circle cx="960" cy={y - 4} r="2" fill="#8B7D74" />
    </g>
  );
}

