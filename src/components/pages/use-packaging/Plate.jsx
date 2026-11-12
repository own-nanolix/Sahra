import { WordmarkDebossG } from '@/components/art/Mark';

import { CONTACT_BLOCKS } from '@/lib/brand';
import { Scene, Box3, ContactText, MarkG, C } from './kit';

// The opening plate: the presentation box of m13, closed, seen from the front-three-quarter on a desk. The lid
// (top face) carries the word-mark debossed vertically inside a debossed frame; the spine (left face) carries the
// three contact blocks and the mark at its foot; the right face is the front edge with the lid seam.
const WL = 860, WR = 620, H = 84;

function LidArt({ idp }) {
  return (
    <g>
      <rect x="40" y="40" width={WR - 80} height={WL - 80} fill="none" stroke="#5E3F2B" strokeOpacity="0.55" strokeWidth="3" />
      <rect x="43" y="43" width={WR - 80} height={WL - 80} fill="none" stroke="#B88A66" strokeOpacity="0.5" strokeWidth="2" />
      <WordmarkDebossG idp={`${idp}-lid`} x={84} y={150} width={620} vertical tone="#9C7050" depth={6} />
    </g>
  );
}

function SpineArt() {
  const blocks = [CONTACT_BLOCKS.office, CONTACT_BLOCKS.service, CONTACT_BLOCKS.online];
  return (
    <g>
      {blocks.map((b, i) => <ContactText key={i} x={110 + i * 250} y={30} lines={b} size={13} fill={C.beige} opacity="0.92" />)}
      <MarkG x={812} y={26} size={30} fill={C.beige} />
    </g>
  );
}

function FrontArt() {
  return (
    <g>
      <rect y="30" width={WR} height="4" fill="#1E140F" opacity="0.5" />
      <rect y="34" width={WR} height="2" fill="#fff" opacity="0.18" />
    </g>
  );
}

export default function Plate() {
  const B = [700, 740], L = [-430, -205], R = [650, -118];
  return (
    <Scene name="presentation-box" title="Presentation box, closed, front-three-quarter view on a desk" w={1600} h={780} horizon={0.36} wall={C.beige} floor={C.sand40}>
      {(idp) => (
        <g>
          <g className="mock-lit">
            <Box3 idp={idp} k="a" B={B} L={L} R={R} H={H} Wl={WL} Wr={WR} tone="tribal" len={70} left={<SpineArt />} right={<FrontArt />} top={<LidArt idp={idp} />} />
          </g>
        </g>
      )}
    </Scene>
  );
}
