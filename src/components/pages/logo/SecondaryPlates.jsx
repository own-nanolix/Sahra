// The secondary graphic, built from the mark's own geometry: the quarter arch (as a window and as the header of the
// profile card), the whole word-mark cropped very large (the sand folder, m01) and the blind deboss on board.
import Art from '@/components/art/Art';
import { ArchWindowG, BrandDefs, QuarterArchG } from '@/components/art/KeyArt';
import { WordmarkCropG, WordmarkDebossG, MarkDebossG } from '@/components/art/Mark';
import { HEX, LINES } from '@/lib/brand';

// The quarter arch as a window onto timber (the white card, m01 and m10).
export function ArchWindowPlate() {
  return (
    <Art viewBox="0 0 1000 1000" title="The quarter arch as a window onto timber in hard light" exportName="logo-arch-window">
      <rect width="1000" height="1000" fill={HEX.white} />
      <ArchWindowG idp="logo-arch-win" cx={840} cy={880} r={300} R={660} quadrant="tl" />
    </Art>
  );
}

// The quarter arch as the header of the profile card (m12): brown gradient, the lighter arch, the brand line.
export function ArchHeaderPlate() {
  const rows = LINES.imagination.rows;
  return (
    <Art viewBox="0 0 1200 560" title="The quarter arch on the profile card header with We Build Spaces of Imagination" exportName="logo-arch-header">
      <BrandDefs idp="logo-hdr" />
      <rect width="1200" height="560" fill="url(#logo-hdr-hero)" />
      <QuarterArchG cx={1200} cy={560} r={170} R={470} quadrant="tl" fill="url(#logo-hdr-arch)" className="grow-x" />
      <text className="serif" fontSize="76" fill={HEX.beige} letterSpacing="-1.5">
        {rows.map((row, i) => <tspan key={row} x="72" y={400 + i * 84}>{row}</tspan>)}
      </text>
    </Art>
  );
}

// The sand folder (m01): the whole word-mark debossed very large and cropped by the folder's left edge.
export function CropPlate() {
  return (
    <Art viewBox="0 0 1600 1000" title="The whole word-mark enlarged and cropped by the left edge, debossed on Sand" exportName="logo-crop">
      <rect width="1600" height="1000" fill={HEX.sand} />
      <WordmarkCropG idp="logo-crop" w={1600} h={1000}>
        <WordmarkDebossG idp="logo-crop-deb" x={-1080} y={217} width={3200} tone="#BF9A77" depth={7} />
      </WordmarkCropG>
    </Art>
  );
}

// A deboss plate: the word-mark pressed blind into Tribal Brown board, with the mark below it.
export function DebossPlate() {
  return (
    <Art viewBox="0 0 1600 1000" title="The word-mark and the mark blind-debossed into Tribal Brown board" exportName="logo-deboss">
      <rect width="1600" height="1000" fill={HEX.tribal} />
      <WordmarkDebossG idp="logo-deb-wm" x={300} y={360} width={1000} depth={6} />
      <MarkDebossG idp="logo-deb-mk" x={1330} y={830} size={72} depth={3} />
    </Art>
  );
}
