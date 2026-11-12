// The letterhead and the dark envelope (m10): every printed line as the designers set it, plus the desk plate.
import { LETTER, FROM_BLOCK, CONTACT, CONTACT_BLOCKS } from '@/lib/brand';
import { BackdropG, SCENE } from '@/components/art/Mockup';
import { MarkG } from '@/components/art/Mark';
import { wrap } from '@/components/art/Devices';
import { ID, C, T, Sheet, Plate, Piece, flow } from './kit';

export const LETTER_SIZE = [604, 850];
export const ENVELOPE_SIZE = [632, 316];

export function LetterG({ m }) {
  const ink = C.text;
  const { list: body, end } = flow(LETTER.paragraphs, (t) => wrap(t, 60), 132, 15.4, 15);
  return (
    <g>
      {[3, 2, 1].map((o) => (
        <rect key={o} x={o} y={o} width="604" height="850" fill={o === 1 ? "#E9E3D6" : "#DDD5C6"} />
      ))}
      <Sheet m={m} w={604} h={850} kind="paper" />
      <T x={36} y={44} size={9.5} fill={C.tribal} text={LETTER.sender} weight={500} />
      <T x={226} y={44} size={8.5} fill={ink} text={[CONTACT.support, CONTACT.partnerships]} lh={1.45} />
      <T x={458} y={44} size={8.5} fill={ink} text={CONTACT_BLOCKS.office} lh={1.45} />
      <T x={36} y={132} size={8.5} fill={ink} text={FROM_BLOCK} lh={1.55} boldFirst />
      <T x={36} y={238} size={8.5} fill={ink} text={LETTER.to} lh={1.55} boldFirst />
      {body.map((b, i) => <T key={i} x={226} y={b.at} size={9.4} fill={ink} text={b.rows} lh={1.64} />)}
      <T x={226} y={end + 34} size={9.4} fill={ink} text={LETTER.close} />
      <MarkG x={36} y={766} size={24} fill={C.sand} />
      <T x={226} y={780} size={8.5} fill={ink} text={CONTACT.handle} />
      <T x={458} y={780} size={8.5} fill={ink} text={CONTACT_BLOCKS.service} lh={1.45} />
    </g>
  );
}

export function EnvelopeG({ m }) {
  return (
    <g>
      <Sheet m={m} w={632} h={316} kind="dark" />
      <path d="M0 0L316 168L632 0" fill="none" stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="1.4" />
      <path d="M0 316L230 150M632 316L402 150" fill="none" stroke="#000000" strokeOpacity="0.14" strokeWidth="1.2" />
      <MarkG x={40} y={222} size={46} fill={C.sand} />
      <T x={258} y={246} size={10.5} fill={C.beige} text={CONTACT_BLOCKS.service} lh={1.45} />
      <T x={474} y={246} size={10.5} fill={C.beige} text={CONTACT_BLOCKS.office} lh={1.45} />
    </g>
  );
}

export function LetterheadArt() {
  const m = `${ID}-letterhead-m`;
  return <Plate name="letterhead" title="Letterhead, print artwork" w={604} h={850} m={m}><LetterG m={m} /></Plate>;
}

export function EnvelopeArt() {
  const m = `${ID}-envelope-m`;
  return <Plate name="envelope" title="Dark envelope, print artwork" w={632} h={316} m={m}><EnvelopeG m={m} /></Plate>;
}

// Desk, top view: the letter over the envelope, both turned a little.
export function LetterPlate() {
  const m = `${ID}-lp-m`;
  const env = { x: 600, y: 300, rot: -8, k: 1.0 };
  const let_ = { x: 210, y: 140, rot: 4, k: 0.8 };
  return (
    <Plate name="letter-and-envelope" title="Letterhead over the dark envelope on a desk" w={1400} h={1000} m={m}>
      <BackdropG idp={`${ID}-lp-bd`} w={1400} h={1000} horizon={0.07} wall={SCENE.beige} floor={SCENE.sand} />
      <Piece i={1} x={env.x} y={env.y} w={632} h={316} rot={env.rot} k={env.k} len={22}>
        <EnvelopeG m={m} />
      </Piece>
      <Piece i={2} x={let_.x} y={let_.y} w={604} h={850} rot={let_.rot} k={let_.k} len={20}>
        <LetterG m={m} />
      </Piece>
    </Plate>
  );
}
