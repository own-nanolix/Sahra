// Artwork for the Contact landing page: the business card of m08 (front and back), the dark envelope of m10 in
// three layers with the letter that rises out of it, the dark folder, the quarter arch and the word-mark sign-off. Every graphic
// is an exportable <Art>; layers share one viewBox so the page can stack them and move the wrappers around them.
import Art from '@/components/art/Art';
import { MarkG, WordmarkG, WordmarkDebossG } from '@/components/art/Mark';
import { QuarterArchG, CurvedWallG } from '@/components/art/KeyArt';
import { MaterialDefs, CastRectG } from '@/components/art/Mockup';
import { wrap } from '@/components/art/Devices';
import { PEOPLE, CONTACT, CONTACT_BLOCKS, LETTER, SENDER, LINES, FROM_BLOCK, URL_LINE } from '@/lib/brand';
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

// ---------- The dark envelope (m10) and the letter, in three layers (one viewBox 1000 x 1300) ----------
// The envelope sits low (880 x 440, 2 : 1 as printed); the letter stands in it, tall enough to rise fully out.
// Envelope re-measured from m10 at 2800 px (553 px wide there): the mark at (56, 313), 60 wide; the second block
// of lines at x 360 and the first at x 660, first baselines 336 below the top edge, 21.5 apart.

export const ENV = { w: 1000, h: 1300, x: 60, y: 840, width: 880, height: 440, pocket: 900 };
const EVB = `0 0 ${ENV.w} ${ENV.h}`;

export function EnvelopeBackArt() {
  const id = 'lp-contact-eb';
  const { x, y, width, height } = ENV;
  return (
    <Art viewBox={EVB} title="Dark envelope, open" exportName="lp-contact-envelope-back" style={FILL}>
      <MaterialDefs idp={id} />
      <CastRectG x={x} y={y} w={width} h={height} len={30} />
      <rect x={x} y={y} width={width} height={height} fill={`url(#${id}-board-dark)`} filter={`url(#${id}-fibre)`} />
      <rect x={x} y={y} width={width} height="60" fill="#120B08" opacity="0.7" />
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
      <MarkG x={x + 56} y={y + 313} size={60} fill="#B58F6B" />
      <text fontSize="16" className="sans" fill="#F5F0E3">
        {CONTACT_BLOCKS.service.map((l, i) => <tspan key={l} x={x + 360} y={r2(y + 336 + i * 21.5)}>{l}</tspan>)}
        {CONTACT_BLOCKS.office.map((l, i) => <tspan key={l} x={x + 660} y={r2(y + 336 + i * 21.5)}>{l}</tspan>)}
      </text>
    </Art>
  );
}

// The letter (m10), re-read and re-measured at 2800 px (528 x 743 there, 560 x 788 here): "Sahra Developement" at
// (34, 36); the second block at x 209 and the first at x 427, baselines 36 / 50 / 63; From at (34, 120) and To at
// (34, 208), 14.4 apart; five paragraphs at x 210, 278 wide, from 120, one empty line between them; "Thanks" at
// 573; the foot: the mark at (34, 713), 37 wide, "@sahra.official" at (210, 736), the second block at x 427 from
// 724 (the printed line naming a social network is left out). `active` (1 to 5) quiets the other paragraphs.
export const LETTER_BOX = { x: 220, y: 140, w: 560, h: 788 };
const LEAD = 14.4;

export function LetterArt({ active = 0 }) {
  const id = 'lp-contact-lt';
  const { x, y, w, h } = LETTER_BOX;
  const paras = [];
  LETTER.paragraphs.forEach((p, n) => {
    const lines = wrap(p, 64);
    const prev = paras[n - 1];
    const top = prev ? prev.top + (prev.lines.length + 1) * LEAD : y + 120;
    paras.push({ lines, top });
  });
  const tone = (n) => ({ opacity: !active || active === n ? 1 : 0.32, transition: 'opacity var(--dur-3) var(--ease-out)' });
  return (
    <Art viewBox={EVB} title="Letterhead letter with five paragraphs" exportName="lp-contact-letter" style={FILL}>
      <MaterialDefs idp={id} />
      <CastRectG x={x} y={y} w={w} h={h} len={14} opacity={0.26} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${id}-paper)`} filter={`url(#${id}-paper-grain)`} />
      <text x={x + 34} y={y + 36} fontSize="9.6" className="sans" fill="#875D41">{SENDER.developement}</text>
      <text fontSize="9" className="sans" fill="#1E140F">
        <tspan x={x + 209} y={y + 36}>{CONTACT.support}</tspan>
        <tspan x={x + 209} y={y + 50}>{CONTACT.partnerships}</tspan>
        <tspan x={x + 427} y={y + 36}>{CONTACT.city}</tspan>
        <tspan x={x + 427} y={y + 50}>{CONTACT.phone}</tspan>
        <tspan x={x + 427} y={y + 63}>{CONTACT.info}</tspan>
      </text>
      <text fontSize="8.8" className="sans" fill="#1E140F">
        {LETTER.from.map((l, i) => <tspan key={l} x={x + 34} y={r2(y + 120 + i * LEAD)} fontWeight={i === 0 ? 500 : 400}>{l}</tspan>)}
        {LETTER.to.map((l, i) => <tspan key={l} x={x + 34} y={r2(y + 208 + i * LEAD)} fontWeight={i === 0 ? 500 : 400}>{l}</tspan>)}
      </text>
      {paras.map((p, n) => (
        <text key={n} fontSize="8.8" className="sans" fill="#1E140F" style={tone(n + 1)}>
          {p.lines.map((l, i) => <tspan key={i} x={x + 210} y={r2(p.top + i * LEAD)}>{l}</tspan>)}
        </text>
      ))}
      <text x={x + 210} y={y + 573} fontSize="8.8" className="sans" fill="#1E140F">{LETTER.close}</text>
      <MarkG x={x + 34} y={y + 713} size={37} fill="#B58F6B" />
      <text fontSize="8.8" className="sans" fill="#1E140F">
        <tspan x={x + 210} y={y + 736}>{CONTACT.handle}</tspan>
        {CONTACT_BLOCKS.service.map((l, i) => <tspan key={l} x={x + 427} y={r2(y + 724 + i * 13)}>{l}</tspan>)}
      </text>
    </Art>
  );
}

// ---------- The dark folder of m10 (800 x 564), re-measured at 2800 px (650 x 458 there) ----------
// The mark at (44, 41), 44 wide; "We Build Spaces / of Imagination" at x 44, baselines 277 / 318 (40 px); the
// From block at x 44 from 462, 15 apart; "→ sahra.sa" in Sand at (258, 522); the photo tile from x 474 to the
// right edge, y 39 to 524 (a curved wall against the sky, drawn as flat fields).
export function FolderArt() {
  const id = 'lp-contact-fd';
  return (
    <Art viewBox="0 0 840 604" title="Dark folder: the mark, We Build Spaces of Imagination, the From block and a photo tile" exportName="lp-contact-folder" style={{ width: '100%', height: 'auto' }}>
      <MaterialDefs idp={id} />
      <CastRectG x={0} y={0} w={800} h={564} len={30} />
      <rect width="800" height="564" fill={`url(#${id}-board-dark)`} filter={`url(#${id}-fibre)`} />
      <g className="fade-in" style={{ '--i': 2 }}>
        <ArchClipTile idp={id} />
      </g>
      <MarkG x={44} y={41} size={44} fill="#B58F6B" topClass="mark-top" bottomClass="mark-bottom" />
      <text className="serif" fontSize="40" letterSpacing="-0.6" fill="#F5F0E3">
        {LINES.imagination.rows.map((r, i) => <tspan key={r} x="44" y={277 + i * 41}>{r}</tspan>)}
      </text>
      <text className="sans" fontSize="12" fill="#F5F0E3">
        {FROM_BLOCK.map((l, i) => <tspan key={l} x="44" y={462 + i * 15}>{l}</tspan>)}
      </text>
      <text className="sans" x="258" y="522" fontSize="12" fill="#B58F6B">{URL_LINE}</text>
    </Art>
  );
}

function ArchClipTile({ idp }) {
  return (
    <g>
      <defs>
        <clipPath id={`${idp}-tile`}>
          <rect x="474" y="39" width="326" height="485" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${idp}-tile)`}>
        <CurvedWallG idp={`${idp}-cw`} x={474} y={39} w={326} h={485} skyline={0.26} />
      </g>
    </g>
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
