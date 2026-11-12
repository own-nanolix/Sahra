// The presentation box, open, top view (m13), on the warm off-white studio ground. A faithful rebuild measured
// from the 1600 x 1143 original: tribal-brown lid at the left with the word-mark debossed vertically inside a
// debossed frame; the spine with three vertical contact blocks and a beige mark at its foot; the tray at the
// right, dark inside, with two black rings holding the white sheet. Hard shadows to the lower right.
import Art from '@/components/art/Art';
import { MarkG, WordmarkDebossG } from '@/components/art/Mark';
import { MaterialDefs, DebossDefs, CastRectG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { wrap } from '@/components/art/Devices';
import { PLAN, SENDER, CONTACT } from '@/lib/brand';
import PlanArt from './PlanArt';
import { Ring } from './parts';

const ID = 'use-product-box';
const SAND = '#B58F6B';

// Vertical contact text on the spine, reading bottom to top.
function SpineBlock({ x, bottom, lines }) {
  return (
    <g fontSize="10.5" className="sans" fill="#F5F0E3" opacity="0.92">
      {lines.map((t, i) => (
        <text key={t} transform={`translate(${x + i * 15.5} ${bottom}) rotate(-90)`}>{t}</text>
      ))}
    </g>
  );
}

export default function OpenBox() {
  const para = wrap(PLAN.text, 96);
  return (
    <Art viewBox="0 0 1600 1143" title="Presentation box, open: lid, spine, tray with two rings and the plan sheet" exportName="use-product-box-open">
      <MaterialDefs idp={ID} />
      <DebossDefs idp={`${ID}-frame`} depth={2.5} />
      <defs>
        <linearGradient id={`${ID}-cavity`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B0705" />
          <stop offset="1" stopColor="#1F140E" />
        </linearGradient>
        <linearGradient id={`${ID}-liner`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5A3C2A" />
          <stop offset="1" stopColor="#3C281D" />
        </linearGradient>
        <linearGradient id={`${ID}-sheet`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F1EDE5" />
        </linearGradient>
        <filter id={`${ID}-blur`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <rect width="1600" height="1143" fill={SCENE.studio} />

      {/* hard shadow of the whole box, falling to the lower right */}
      <CastRectG x={150} y={148} w={1293} h={834} len={30} opacity={0.34} className="sun-shadow" />

      {/* lid */}
      <rect x="150" y="148" width="612" height="834" fill={`url(#${ID}-board)`} filter={`url(#${ID}-fibre)`} />
      <rect x="150" y="148" width="612" height="3" fill="#FFFFFF" opacity="0.28" />
      <rect x="150" y="148" width="3" height="834" fill="#FFFFFF" opacity="0.18" />
      <rect x="150" y="979" width="612" height="3" fill="#000000" opacity="0.3" />
      <rect x="150" y="148" width="612" height="834" fill={`url(#${ID}-shade)`} opacity="0.18" />
      {/* debossed frame */}
      <g filter={`url(#${ID}-frame-deboss)`}>
        <path d="M176 172H742V950H176z M180 176V946H738V176z" fill="#8F6447" fillRule="evenodd" />
      </g>
      <WordmarkDebossG idp={`${ID}-lid`} x={196} y={206} width={706} vertical tone="#A57A5A" depth={4} />

      {/* spine */}
      <rect x="762" y="148" width="78" height="834" fill="#7A5239" filter={`url(#${ID}-fibre)`} />
      <rect x="762" y="148" width="78" height="834" fill={`url(#${ID}-shade)`} opacity="0.4" />
      <rect x="760" y="148" width="4" height="834" fill="#2B1B13" opacity="0.65" />
      <rect x="838" y="148" width="4" height="834" fill="#2B1B13" opacity="0.7" />
      <SpineBlock x={786} bottom={325} lines={[CONTACT.phone2, CONTACT.support, CONTACT.partnerships]} />
      <SpineBlock x={786} bottom={550} lines={[CONTACT.web, CONTACT.handle]} />
      <SpineBlock x={786} bottom={772} lines={[CONTACT.city, CONTACT.phone, CONTACT.info]} />
      <MarkG x={782} y={903} size={38} fill="#F5F0E3" />

      {/* tray: outer walls, dark cavity, liner */}
      <rect x="840" y="148" width="603" height="834" fill={`url(#${ID}-board)`} filter={`url(#${ID}-fibre)`} />
      <rect x="840" y="148" width="603" height="3" fill="#FFFFFF" opacity="0.28" />
      <rect x="1440" y="148" width="3" height="834" fill="#000000" opacity="0.25" />
      <rect x="868" y="178" width="514" height="760" fill={`url(#${ID}-cavity)`} />
      <rect x="872" y="206" width="504" height="700" fill={`url(#${ID}-liner)`} />
      <path d="M868 178H1382V214H872z" fill="#000000" opacity="0.55" />
      <rect x="868" y="936" width="560" height="26" fill="#5B3D2B" />
      <rect x="868" y="936" width="560" height="3" fill="#FFFFFF" opacity="0.18" />
      <rect x="1382" y="178" width="46" height="760" fill="#4A2F20" />
      <rect x="1382" y="178" width="3" height="760" fill="#000000" opacity="0.5" />

      {/* ring mounts behind the sheet */}
      <path d="M888 372Q902 372 904 390V740Q902 762 888 764z" fill="#0A0705" />
      <path d="M892 380V756" stroke="#5A4C44" strokeWidth="1.5" opacity="0.6" />

      {/* the sheet: soft shadow, hard shadow, paper edge, paper */}
      <rect x="918" y="256" width="432" height="650" fill="#000000" opacity="0.45" filter={`url(#${ID}-blur)`} />
      <g className="mock-place" style={{ '--i': 1 }}>
        <rect x="908" y="243" width="436" height="656" fill="#D9D3C8" />
        <rect x="908" y="243" width="432" height="650" fill={`url(#${ID}-sheet)`} filter={`url(#${ID}-paper-grain)`} />
        <text x="936" y="277" fontSize="8.2" className="sans" fill="#875D41">{SENDER.developement}</text>
        <g fontSize="7" className="sans" fill="#35241C">
          <text x="1081" y="277">{CONTACT.support}</text>
          <text x="1081" y="287">{CONTACT.partnerships}</text>
          <text x="1261" y="277">{CONTACT.city}</text>
          <text x="1261" y="287">{CONTACT.phone}</text>
          <text x="1261" y="297">{CONTACT.info}</text>
        </g>
        <PlanArt x={955} y={335} />
        <MarkG x={936} y={832} size={32} fill={SAND} />
        <text fontSize="5.4" className="sans" fill="#35241C">
          {para.map((l, i) => <tspan key={l} x="1082" y={836 + i * 8.4}>{l}</tspan>)}
        </text>
      </g>

      {/* rings in front */}
      <Ring y={453} />
      <Ring y={684} />

      {/* lid / spine / tray shading and soft foot shadows */}
      <path d="M820 982h580l-20 24H846z" fill={SHADOW_INK} opacity="0.5" />
    </Art>
  );
}
