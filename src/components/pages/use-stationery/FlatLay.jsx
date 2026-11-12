// The designer's own flat lay (m10): top view on the warm off-white studio ground, three columns, hard shadows to
// the lower right. Pieces that exist as their own artwork (letter, envelope, cards, notebook, box) are reused here.
import { LINES, FROM_BLOCK } from '@/lib/brand';
import { BackdropG } from '@/components/art/Mockup';
import { MarkG, WordmarkDebossG } from '@/components/art/Mark';
import { CurvedWallG, ArchWindowG } from '@/components/art/KeyArt';
import { ID, URL_LINE, C, T, Sheet, Plate, Piece } from './kit';
import { LetterG, EnvelopeG } from './Print';
import { CardG } from './Cards';
import { NotebookG } from './Books';
import { ReportG } from './Report';

function FolderG({ m, idp }) {
  return (
    <g>
      <Sheet m={m} w={466} h={330} kind="dark" />
      <MarkG x={26} y={24} size={26} fill={C.sand} />
      <T x={27} y={160} size={24} serif fill={C.beige} text={LINES.imagination.rows} lh={1.0} ls="-0.2" />
      <T x={27} y={268} size={8.5} fill={C.beige} text={FROM_BLOCK} lh={1.4} />
      <T x={151} y={306} size={8.5} fill={C.sand} text={URL_LINE} />
      <CurvedWallG idp={`${idp}-photo`} x={275} y={24} w={191} h={280} />
    </g>
  );
}

function WhiteCardG({ m, idp }) {
  const arch = { idp: `${idp}-arch`, cx: 293, cy: 231, r: 58, R: 131 };
  return (
    <g>
      <clipPath id={`${idp}-clip`}><rect width="329" height="231" /></clipPath>
      <Sheet m={m} w={329} h={231} kind="paper" />
      <T x={20} y={37} size={25} serif fill={C.ink} text={LINES.elevate.rows} lh={0.98} ls="-0.3" />
      <T x={20} y={108} size={9.6} fill={C.tribal} text={LINES.refined.rows} lh={1.3} />
      <T x={20} y={205} size={9.6} fill={C.sandInk} text={URL_LINE} />
      <g clipPath={`url(#${idp}-clip)`}>
        <ArchWindowG {...arch} idp={`${idp}-a1`} quadrant="tl" />
        <ArchWindowG {...arch} idp={`${idp}-a2`} quadrant="tr" />
      </g>
    </g>
  );
}

function LidG({ m, idp }) {
  return (
    <g>
      <Sheet m={m} w={427} h={318} kind="dark" />
      <rect x="6" y="6" width="415" height="306" fill="none" stroke="#FFFFFF" strokeOpacity="0.06" />
      <T x={36} y={38} size={11.5} serif fill={C.beige} text={LINES.imagination.rows} lh={1.08} />
      <T x={393} y={38} size={9} fill={C.sand} text={URL_LINE} anchor="end" />
      <WordmarkDebossG idp={`${idp}-wm`} x={36} y={246} width={357} tone={C.deboss} depth={3} />
    </g>
  );
}

function StringEnvelopeG({ m, idp }) {
  return (
    <g>
      <Sheet m={m} w={636} h={322} kind="board" />
      <path d="M0 0H232a28 28 0 0 1 28 28V294a28 28 0 0 1-28 28H0Z" fill="#FFFFFF" opacity="0.07" stroke={C.chocolate} strokeOpacity="0.3" strokeWidth="1.5" />
      {[76, 228].map((x) => (
        <g key={x}>
          <circle cx={x + 3} cy="159" r="23" fill={C.chocolate} opacity="0.3" />
          <circle cx={x} cy="156" r="22" fill="#6E4A33" />
          <circle cx={x} cy="156" r="14" fill="none" stroke="#9A6E50" strokeWidth="3" />
          <circle cx={x} cy="156" r="6" fill="#1E140F" />
        </g>
      ))}
      <path d="M76 156C118 118 190 192 228 156M76 156C118 194 190 118 228 156" fill="none" stroke="#E8DCC6" strokeWidth="2.6" strokeLinecap="round" />
      <WordmarkDebossG idp={`${idp}-wm`} x={556} y={44} width={236} vertical tone={C.deboss} depth={2.5} />
    </g>
  );
}

function BagG({ m, idp }) {
  const rope = 'M143 6C147 70 188 128 227 128C266 128 306 70 313 6';
  return (
    <g>
      <Sheet m={m} w={454} h={343} kind="dark" />
      <path d={rope} transform="translate(8 6)" fill="none" stroke="#000000" strokeOpacity="0.35" strokeWidth="9" />
      <path d={rope} fill="none" stroke="#0C0806" strokeWidth="9" />
      <path d={rope} fill="none" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1.5" transform="translate(-2 -1)" />
      <T x={27} y={40} size={13} serif fill={C.beige} text={LINES.imagination.rows} lh={1.08} />
      <T x={386} y={40} size={9.4} fill={C.sand} text={URL_LINE} />
      <WordmarkDebossG idp={`${idp}-wm`} x={27} y={263} width={403} tone={C.deboss} depth={3.5} />
    </g>
  );
}

export function FlatLayPlate() {
  const m = `${ID}-fl-m`;
  const p = `${ID}-fl`;
  return (
    <Plate name="flat-lay" title="The stationery flat lay: folder, card, box lid, notebook, envelopes, cards, bag, letterhead and tall box on the studio ground" w={1600} h={1372} m={m}>
      <BackdropG idp={`${p}-bd`} w={1600} h={1372} horizon={0} floor={C.studio} line={false} />
      <Piece i={1} x={117} y={94} w={466} h={330} len={22}><FolderG m={m} idp={`${p}-folder`} /></Piece>
      <Piece i={2} x={662} y={135} w={329} h={231} len={14}><WhiteCardG m={m} idp={`${p}-card`} /></Piece>
      <Piece i={3} x={1040} y={90} w={427} h={318} len={70}><LidG m={m} idp={`${p}-lid`} /></Piece>
      <Piece i={4} x={244} y={530} w={434} h={606} k={0.5} len={30}><NotebookG m={m} idp={`${p}-nb`} /></Piece>
      <Piece i={5} x={670} y={465} w={632} h={316} k={0.5} len={16}><EnvelopeG m={m} /></Piece>
      <Piece i={6} x={679} y={668} w={660} h={400} k={0.1788} len={14}>
        <rect x="14" y="14" width="660" height="400" fill="#B8AE98" />
        <rect x="7" y="7" width="660" height="400" fill="#E4DCCB" />
        <CardG m={m} kind="front" idp={`${p}-c1`} />
      </Piece>
      <Piece i={7} x={833} y={671} w={660} h={400} k={0.185} len={14}>
        <rect x="14" y="14" width="660" height="400" fill="#4F3424" />
        <rect x="7" y="7" width="660" height="400" fill="#6A452D" />
        <CardG m={m} kind="back" idp={`${p}-c2`} />
      </Piece>
      <Piece i={8} x={1089} y={548} w={636} h={322} k={0.5} len={26}><StringEnvelopeG m={m} idp={`${p}-str`} /></Piece>
      <Piece i={9} x={123} y={925} w={454} h={343} len={80}><BagG m={m} idp={`${p}-bag`} /></Piece>
      <Piece i={10} x={680} y={850} w={604} h={850} k={0.5} len={14}><LetterG m={m} /></Piece>
      <Piece i={11} x={1088} y={847} w={704} h={936} k={0.5} len={56}><ReportG m={m} idp={`${p}-tall`} /></Piece>
    </Plate>
  );
}
