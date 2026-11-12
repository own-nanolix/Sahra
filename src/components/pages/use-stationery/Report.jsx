// The report cover (the tall Tribal Brown box of m10 and the box of m13): the word-mark debossed vertically,
// contacts set vertically, "Sahra Developement", and its spine with three contact blocks and the mark at the foot.
import { CONTACT_BLOCKS, SENDER } from '@/lib/brand';
import { MarkG, WordmarkDebossG } from '@/components/art/Mark';
import { ID, C, T, Sheet, Plate } from './kit';

export const COVER = [704, 936];
export const SPINE = [90, 936];

export function ReportG({ m, idp }) {
  return (
    <g>
      <Sheet m={m} w={704} h={936} kind="board" />
      <WordmarkDebossG idp={`${idp}-wm`} x={486} y={48} width={748} vertical tone={C.deboss} depth={4} />
      <T x={44} y={166} size={10.5} fill={C.beige} text={CONTACT_BLOCKS.office} lh={1.45} rotate={-90} />
      <T x={44} y={506} size={10.5} fill={C.beige} text={CONTACT_BLOCKS.service} lh={1.45} rotate={-90} />
      <T x={44} y={880} size={10.5} fill={C.beige} text={SENDER.developement} weight={500} rotate={-90} />
    </g>
  );
}

export function ReportSpineG({ m }) {
  return (
    <g>
      <Sheet m={m} w={90} h={936} kind="board" />
      <rect width="90" height="936" fill="#000000" opacity="0.12" />
      <T x={30} y={300} size={10.5} fill={C.beige} text={CONTACT_BLOCKS.office} lh={1.45} rotate={-90} />
      <T x={30} y={520} size={10.5} fill={C.beige} text={CONTACT_BLOCKS.service} lh={1.45} rotate={-90} />
      <T x={30} y={740} size={10.5} fill={C.beige} text={CONTACT_BLOCKS.online} lh={1.45} rotate={-90} />
      <MarkG x={26} y={858} size={38} fill={C.beige} />
    </g>
  );
}

export function ReportCoverArt() {
  const m = `${ID}-report-m`;
  return (
    <Plate name="report-cover" title="Report cover with its spine, word-mark debossed vertically" w={818} h={936} m={m}>
      <ReportG m={m} idp={`${ID}-report`} />
      <g transform="translate(728 0)"><ReportSpineG m={m} /></g>
    </Plate>
  );
}
