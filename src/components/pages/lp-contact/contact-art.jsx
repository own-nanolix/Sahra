// Artwork for the Contact landing page: the business card of m08 (front and back), the dark envelope of m10 in
// three layers with the letter that rises out of it, the quarter arch and the word-mark sign-off. Every graphic
// is an exportable <Art>; layers share one viewBox so the page can stack them and move the wrappers around them.
import Art from '@/components/art/Art';
import { MarkG, WordmarkG, WordmarkDebossG } from '@/components/art/Mark';
import { QuarterArchG } from '@/components/art/KeyArt';
import { MaterialDefs, CastRectG } from '@/components/art/Mockup';
import { wrap } from '@/components/art/Devices';
import { PEOPLE, CONTACT, CONTACT_BLOCKS, LETTER, SENDER } from '@/lib/brand';
import { r2 } from '@/lib/charts';

// ---------- The business card (m08): 700 x 400 ----------

export const CARD = { w: 700, h: 400 };
const FILL = { width: '100%', height: '100%' };

// Front: off-white card, the sand mark top right, name and role, the three contact blocks as printed (the line
// naming a social network is left out).
export function CardFrontArt() {
  const id = 'lp-contact-cf';
  const { name, role } = PEOPLE.card;
  const left = [CONTACT_BLOCKS.office, CONTACT_BLOCKS.online];
  return (
    <Art viewBox={`0 0 ${CARD.w} ${CARD.h}`} title="Business card, front" exportName="lp-contact-card-front" style={FILL}>
      <MaterialDefs idp={id} />
      <rect width={CARD.w} height={CARD.h} fill={`url(#${id}-card)`} filter={`url(#${id}-paper-grain)`} />
      <MarkG x={604} y={36} size={50} fill="#B58F6B" />
      <text x="44" y="168" fontSize="31" className="serif" fill="#1E140F" letterSpacing="-0.5">{name}</text>
      <text x="45" y="194" fontSize="13" className="sans" fill="#7A5A3F">{role}</text>
      <text fontSize="12" className="sans" fill="#1E140F">
        {left[0].map((l, i) => <tspan key={l} x="44" y={266 + i * 16}>{l}</tspan>)}
        {left[1].map((l, i) => <tspan key={l} x="44" y={330 + i * 16}>{l}</tspan>)}
        {CONTACT_BLOCKS.service.map((l, i) => <tspan key={l} x="470" y={266 + i * 16}>{l}</tspan>)}
      </text>
      <rect width={CARD.w} height={CARD.h} fill="none" stroke="#35241C" strokeOpacity="0.12" />
    </Art>
  );
}

// Back: Tribal Brown board with the word-mark blind-debossed at the lower right.
export function CardBackArt() {
  const id = 'lp-contact-cb';
  return (
    <Art viewBox={`0 0 ${CARD.w} ${CARD.h}`} title="Business card, back, the word-mark debossed" exportName="lp-contact-card-back" style={FILL}>
      <MaterialDefs idp={id} />
      <rect width={CARD.w} height={CARD.h} fill={`url(#${id}-board)`} filter={`url(#${id}-fibre)`} />
      <rect width={CARD.w} height={CARD.h} fill={`url(#${id}-shade)`} />
      <WordmarkDebossG idp={`${id}-wm`} x={324} y={304} width={332} depth={3} />
      <rect x="1" y="1" width={CARD.w - 2} height={CARD.h - 2} fill="none" stroke="#C29C78" strokeOpacity="0.28" />
    </Art>
  );
}

// ---------- The dark envelope (m10) and the letter, in three layers (one viewBox 1000 x 900) ----------

export const ENV = { w: 1000, h: 900, x: 60, y: 400, width: 880, height: 440, pocket: 470 };
const EVB = `0 0 ${ENV.w} ${ENV.h}`;

export function EnvelopeBackArt() {
  const id = 'lp-contact-eb';
  const { x, y, width, height } = ENV;
  return (
    <Art viewBox={EVB} title="Dark envelope, open" exportName="lp-contact-envelope-back" style={FILL}>
      <MaterialDefs idp={id} />
      <CastRectG x={x} y={y} w={width} h={height} len={30} />
      <rect x={x} y={y} width={width} height={height} fill={`url(#${id}-board-dark)`} filter={`url(#${id}-fibre)`} />
      <rect x={x} y={y} width={width} height="70" fill="#120B08" opacity="0.7" />
    </Art>
  );
}

export function EnvelopeFrontArt() {
  const id = 'lp-contact-ef';
  const { x, y, width, height, pocket } = ENV;
  return (
    <Art viewBox={EVB} title="Dark envelope, the mark and two contact blocks" exportName="lp-contact-envelope-front" style={FILL}>
      <MaterialDefs idp={id} />
      <rect x={x} y={pocket} width={width} height={y + height - pocket} fill={`url(#${id}-board-dark)`} filter={`url(#${id}-fibre)`} />
      <rect x={x} y={pocket} width={width} height={y + height - pocket} fill={`url(#${id}-shade-v)`} />
      <path d={`M${x} ${pocket}H${x + width}`} stroke="#B58F6B" strokeOpacity="0.4" strokeWidth="2" />
      <MarkG x={x + 56} y={720} size={62} fill="#B58F6B" />
      <text fontSize="17" className="sans" fill="#F5F0E3">
        {CONTACT_BLOCKS.service.map((l, i) => <tspan key={l} x="540" y={742 + i * 24}>{l}</tspan>)}
        {CONTACT_BLOCKS.office.map((l, i) => <tspan key={l} x="760" y={742 + i * 24}>{l}</tspan>)}
      </text>
    </Art>
  );
}

// The letter (m10): sender, the three contact blocks, From and To, five paragraphs verbatim, "Thanks".
// `active` (1 to 5) quiets the other paragraphs; 0 shows all of them.
export const LETTER_BOX = { x: 220, y: 40, w: 560, h: 760 };

export function LetterArt({ active = 0 }) {
  const id = 'lp-contact-lt';
  const { x, y, w, h } = LETTER_BOX;
  const paras = [];
  LETTER.paragraphs.forEach((p, n) => {
    const lines = wrap(p, 70);
    const prev = paras[n - 1];
    const top = prev ? prev.top + prev.lines.length * 11.6 + 11 : y + 150;
    paras.push({ lines, top });
  });
  const last = paras[paras.length - 1];
  const cursor = last.top + last.lines.length * 11.6 + 11;
  const tone = (n) => ({ opacity: !active || active === n ? 1 : 0.32, transition: 'opacity var(--dur-3) var(--ease-out)' });
  return (
    <Art viewBox={EVB} title="Letterhead letter with five paragraphs" exportName="lp-contact-letter" style={FILL}>
      <MaterialDefs idp={id} />
      <CastRectG x={x} y={y} w={w} h={h} len={14} opacity={0.26} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-paper)`} filter={`url(#${id}-paper-grain)`} />
      <text x={x + 28} y={y + 40} fontSize="10.5" className="sans" fill="#875D41">{SENDER.developement}</text>
      <text fontSize="8.6" className="sans" fill="#1E140F">
        <tspan x={x + 250} y={y + 40}>{CONTACT.support}</tspan>
        <tspan x={x + 250} y={y + 51}>{CONTACT.partnerships}</tspan>
        <tspan x={x + 420} y={y + 40}>{CONTACT.city}</tspan>
        <tspan x={x + 420} y={y + 51}>{CONTACT.phone}</tspan>
        <tspan x={x + 420} y={y + 62}>{CONTACT.info}</tspan>
      </text>
      <text fontSize="8.4" className="sans" fill="#1E140F">
        {LETTER.from.map((l, i) => <tspan key={l} x={x + 28} y={y + 120 + i * 11.5} fontWeight={i === 0 ? 500 : 400}>{l}</tspan>)}
        {LETTER.to.map((l, i) => <tspan key={l} x={x + 28} y={y + 200 + i * 11.5} fontWeight={i === 0 ? 500 : 400}>{l}</tspan>)}
      </text>
      {paras.map((p, n) => (
        <text key={n} fontSize="8.6" className="sans" fill="#1E140F" style={tone(n + 1)}>
          {p.lines.map((l, i) => <tspan key={i} x={x + 150} y={r2(p.top + i * 11.6)}>{l}</tspan>)}
        </text>
      ))}
      <text x={x + 150} y={r2(cursor + 6)} fontSize="8.6" className="sans" fill="#1E140F">{LETTER.close}</text>
      <MarkG x={x + 28} y={y + h - 54} size={22} fill="#B58F6B" />
      <text fontSize="7.8" className="sans" fill="#1E140F">
        <tspan x={x + 150} y={y + h - 42}>{CONTACT.handle}</tspan>
        {CONTACT_BLOCKS.service.map((l, i) => <tspan key={l} x={x + 420} y={y + h - 42 + i * 10}>{l}</tspan>)}
      </text>
    </Art>
  );
}

// ---------- The quarter arch for the dark contact section (decorative) ----------

export function ArchArt() {
  return (
    <Art viewBox="0 0 600 600" title="A quarter arch in Tribal Brown and Sand" exportName="lp-contact-arch" decorative style={{ width: '100%', height: 'auto' }}>
      <g className="fade-in">
        <QuarterArchG cx={600} cy={0} r={300} R={600} quadrant="bl" fill="#875D41" />
      </g>
      <g className="fade-in" style={{ '--i': 3 }}>
        <QuarterArchG cx={600} cy={0} r={110} R={190} quadrant="bl" fill="#B58F6B" />
      </g>
    </Art>
  );
}

// ---------- The sign-off: the word-mark on Black, each letter settling into place ----------

export function SignoffArt() {
  return (
    <Art viewBox="0 0 1420 251" title="Sahra word-mark in Sand on Black" exportName="lp-contact-wordmark" style={{ width: '100%', height: 'auto' }}>
      <rect width="1420" height="251" fill="#000000" />
      <WordmarkG fill="#B58F6B" pieceClass="settle" />
    </Art>
  );
}
