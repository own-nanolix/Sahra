// Four stories, each 1080 x 1920, in the brand's own visuals: the word-mark cropped very large, the quarter arch
// as a window, the construction grid, and the word-mark blind-debossed into brown board.
import Art from '@/components/art/Art';
import { WordmarkG, WordmarkCropG, WordmarkDebossG, MarkG, MarkTileG } from '@/components/art/Mark';
import { BrandDefs, ArchWindowG, GuideGridG, ConstructionG, TimberG, QuarterArchG, PHOTO } from '@/components/art/KeyArt';
import { LINES, ABOUT, CONTACT_BLOCKS, URL_LINE } from '@/lib/brand';
import { K, Rise, Serif, Para, Contacts } from './shared';

const VB = '0 0 1080 1920';

// 1. Dark Chocolate, the word-mark enlarged and cropped by the story edge, the brand line over it.
export function StoryCrop() {
  const idp = 'campaign-s1';
  return (
    <Art viewBox={VB} title="Story: the word-mark cropped very large on Dark Chocolate" exportName="campaign-story-crop">
      <BrandDefs idp={idp} />
      <rect width="1080" height="1920" fill={K.choc} />
      <rect width="1080" height="1920" fill="#000000" opacity="0.08" filter={`url(#${idp}-grain)`} />
      <WordmarkCropG idp={`${idp}-c`} w={1080} h={1920}>
        <g className="settle" style={{ '--i': 1 }}>
          <WordmarkG x={-1480} y={560} width={4300} fill={K.tribal} />
        </g>
      </WordmarkCropG>
      <rect y="0" width="1080" height="560" fill={K.choc} opacity="0.55" />
      <Rise i={2}><Serif rows={LINES.imagination.rows} x={80} y={230} size={96} lh={1.04} fill={K.beige} /></Rise>
      <Rise i={4} kind="fade-in"><text className="sans" x="80" y="1790" fontSize="38" fill={K.sand}>{URL_LINE}</text></Rise>
    </Art>
  );
}

// 2. Beige, a large quarter arch as a window onto the timber court, the line above it.
export function StoryArch() {
  const idp = 'campaign-s2';
  const sentence = ABOUT.text.split('. ')[1];
  return (
    <Art viewBox={VB} title="Story: Built with intention, designed for life beyond structure, quarter-arch window" exportName="campaign-story-arch">
      <BrandDefs idp={idp} />
      <rect width="1080" height="1920" fill={K.beige} />
      <rect width="1080" height="1920" fill={K.sand} opacity="0.06" filter={`url(#${idp}-grain)`} />
      <Rise i={1}><Serif rows={LINES.intention.rows} x={80} y={250} size={92} fill={K.ink} /></Rise>
      <g className="fade-in" style={{ '--i': 2 }}>
        <ArchWindowG idp={`${idp}-a`} cx={0} cy={1560} r={330} R={1010} quadrant="tr">
          <TimberG idp={`${idp}-t`} x={0} y={550} w={1010} h={1010} lines={110} />
          <path d="M1010 550L0 1560H1010Z" fill={PHOTO.shade} opacity="0.32" />
        </ArchWindowG>
      </g>
      <Rise i={4} kind="fade-in"><Para text={sentence} x={80} y={1690} size={30} lh={1.4} max={50} fill={K.muted} /></Rise>
      <Rise i={5} kind="fade-in"><text className="sans" x="80" y="1830" fontSize="34" fill={K.tribal}>{URL_LINE}</text></Rise>
    </Art>
  );
}

// 3. The construction grid: fine guides, the word-mark's outline with its anchors, the unit bars and the cuts.
export function StoryGrid() {
  const idp = 'campaign-s3';
  const rows = ['Clean architecture', 'inspired by nature', 'and built for', 'everyday life.'];
  return (
    <Art viewBox={VB} title="Story: Clean architecture inspired by nature, over the construction grid" exportName="campaign-story-grid">
      <BrandDefs idp={idp} />
      <rect width="1080" height="1920" fill={K.beige} />
      <GuideGridG w={1080} h={1920} step={60} stroke="#CDBFAE" opacity="0.6" />
      <Rise i={1}><Serif rows={rows} x={80} y={250} size={88} fill={K.ink} /></Rise>
      <ConstructionG x={80} y={1000} width={920} draw />
      <Rise i={8} kind="fade-in"><MarkTileG x={80} y={1640} size={120} tile={K.tribal} fill={K.beige} /></Rise>
      <Rise i={9} kind="fade-in"><text className="sans" x="1000" y="1730" fontSize="34" textAnchor="end" fill={K.tribal}>{URL_LINE}</text></Rise>
    </Art>
  );
}

// 4. Tribal Brown board: the word-mark blind-debossed, the line above, the three contact blocks below.
export function StoryDeboss() {
  const idp = 'campaign-s4';
  return (
    <Art viewBox={VB} title="Story: the word-mark debossed into brown board, with the contacts" exportName="campaign-story-deboss">
      <BrandDefs idp={idp} />
      <rect width="1080" height="1920" fill={K.tribal} />
      <rect width="1080" height="1920" fill="#000000" opacity="0.1" filter={`url(#${idp}-grain)`} />
      <g className="fade-in" style={{ '--i': 1 }}>
        <QuarterArchG cx={1080} cy={0} r={190} R={420} quadrant="bl" fill="#9A6E50" opacity="0.55" />
      </g>
      <Rise i={1}><Serif rows={LINES.imagination.rows} x={80} y={250} size={92} fill={K.beige} /></Rise>
      <g className="fade-in" style={{ '--i': 3 }}>
        <WordmarkDebossG idp={`${idp}-d`} x={80} y={800} width={920} depth={7} />
      </g>
      <Contacts x={80} y={1380} size={30} gap={34} fill={K.beige} blocks={[CONTACT_BLOCKS.online, CONTACT_BLOCKS.service, CONTACT_BLOCKS.office]} />
      <Rise i={6} kind="fade-in"><MarkG x={896} y={1700} size={104} fill={K.beige} /></Rise>
    </Art>
  );
}
