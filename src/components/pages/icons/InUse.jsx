import Link from 'next/link';
import Art from '@/components/art/Art';
import { quarterArch } from '@/components/art/KeyArt';
import Icon from '@/components/site/Icon';
import Reveal from '@/components/site/Reveal';
import Button from '@/components/ui/Button';
import { ABOUT, CONTACT_BLOCKS, CONTACT, HEX, URL_LINE } from '@/lib/brand';
import GlyphG from './GlyphG';
import s from './icons.module.css';

// Four icons in use, in the brand's own components and words.
const ROW_ICONS = { Philosophy: 'compass', 'Our Process': 'plan', 'Our Vision': 'sun' };
const ROW_HREF = { Philosophy: '/lp-philosophy/', 'Our Process': '/lp-process/', 'Our Vision': '/lp-vision/' };

const CONTACT_ICONS = [
  [CONTACT_BLOCKS.office, ['pin', 'phone', 'mail']],
  [CONTACT_BLOCKS.service, ['phone', 'mail', 'mail']],
];

const PLAQUE = [
  { icon: 'door', label: 'Entrance' },
  { icon: 'stairs', label: 'Stairs' },
  { icon: 'car', label: 'Parking' },
];

function Plaque() {
  const rowY = (i) => 56 + i * 58;
  return (
    <Art viewBox="0 0 520 300" title="Wayfinding plaque with three icons and the web address" exportName="icons-plaque">
      <rect width="520" height="300" rx="0" fill={HEX.chocolate} />
      <path d={quarterArch(520, 300, 44, 84, 'tl')} fill={HEX.tribal} />
      <rect x="14" y="14" width="492" height="272" fill="none" stroke={HEX.sand} strokeOpacity="0.4" strokeWidth="1" />
      {PLAQUE.map((p, i) => (
        <g key={p.label} className="settle" style={{ '--i': i }}>
          <GlyphG name={p.icon} x={44} y={rowY(i)} size={40} fill={HEX.sand} />
          <text x="108" y={rowY(i) + 29} className="serif" fontSize="28" fill={HEX.beige}>{p.label}</text>
          <GlyphG name="arrow-right" x={440} y={rowY(i) + 4} size={32} fill={HEX.beige} />
          <path className="draw" style={{ '--len': 440, '--i': i + 1 }} d={`M44 ${rowY(i) + 50}H476`} stroke={HEX.sand} strokeOpacity="0.5" strokeWidth="1" fill="none" />
        </g>
      ))}
      <text x="44" y="268" className="sans" fontSize="13" fill={HEX.beige}>{URL_LINE}</text>
    </Art>
  );
}

export default function InUse() {
  return (
    <>
      <Reveal className={`tile tile-dark span-1 rows-2 ${s.useTile}`}>
        <h3 className={`t-label ${s.darkLabel}`}>A button</h3>
        <div className={s.useStack}>
          <Button url href="/lp-contact/" variant="beige" size="sm">sahra.sa</Button>
          <Button variant="outline" size="sm" icon="plan" href="/lp-process/">Our Process</Button>
          <div className="row">
            <Button icon="menu" label="Menu" variant="outline" size="sm" />
            <Button icon="search" label="Search" variant="outline" size="sm" />
          </div>
        </div>
        <p className="t-small">Icons sit at 16 px in small buttons, 20 px in the standard size.</p>
      </Reveal>

      <Reveal delay={60} className={`tile tile-beige span-2 rows-2 ${s.useTile}`}>
        <h3 className="t-label">A ruled row, from the About page</h3>
        <ul className="rows" id="icons-use-rows">
          {ABOUT.rows.map((r) => (
            <li key={r.no}>
              <Link className="ruled-row" href={ROW_HREF[r.label]}>
                <span className="t-num">{r.no}</span>
                <span className={`ruled-row-label ${s.rowLabel}`}>
                  <Icon name={ROW_ICONS[r.label]} size={22} />
                  {r.label}
                </span>
                <span className="ruled-row-plus" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="t-small">The icon sits left of the serif label, on the same baseline, in the label&apos;s ink.</p>
      </Reveal>

      <Reveal delay={120} className={`tile tile-dark tile-flush span-2 rows-2 ${s.useTile} ${s.plaqueTile}`}>
        <h3 className={`t-label ${s.plaqueCap} ${s.darkLabel}`}>A wayfinding plaque</h3>
        <Plaque />
      </Reveal>

      <Reveal delay={180} className={`tile span-1 rows-2 ${s.useTile}`}>
        <h3 className="t-label">A contact block</h3>
        <div className={s.useStack}>
          {CONTACT_ICONS.map(([lines, icons]) => (
            <address key={lines[0]} className={`contact ${s.contactIcons}`}>
              {lines.map((l, i) => (
                <span key={l}>
                  <Icon name={icons[i]} size={14} />
                  {l}
                </span>
              ))}
            </address>
          ))}
          <address className={`contact ${s.contactIcons}`}>
            <span><Icon name="globe" size={14} />{CONTACT.web}</span>
          </address>
        </div>
      </Reveal>
    </>
  );
}
