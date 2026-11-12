// Two mockup plates, each ONE SVG: a flat field with a hard horizon, one light from the upper left, hard shadows
// falling to the lower right, objects set down one after another. The posters inside are the same artwork as the
// exported posters (drawn with their own id prefixes).
import Art from '@/components/art/Art';
import { BackdropG, WallRibsG, StreetG, BlockG, CastRectG, castRect, ContactShadowG, MaterialDefs, PlaceG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { r2 } from '@/lib/charts';
import { PosterAG, PosterBG, PosterCG } from './Posters';
import { HoardLeftG, HoardRightG } from './Posts';

const PW = 1080, PH = 1350;

// m11: two posters in a dark double frame on a ribbed wall, front view, a floor strip below.
export function MockFrames() {
  const idp = 'campaign-m1';
  const W = 1600, H = 1143, hz = 960;
  const k = 440 / PW;
  const panel = (p, Poster, pid) => {
    const px = 280 + p * 530, py = 232;
    return (
      <PlaceG key={pid} i={p + 1}>
        <rect x={px} y={py} width="490" height="640" fill="#1B120D" />
        <rect x={px + 8} y={py + 8} width="474" height="624" fill="none" stroke="#5A463A" strokeWidth="2" />
        <g transform={`translate(${px + 25} ${py + 45}) scale(${r2(k)})`}>
          <Poster idp={`${idp}-${pid}`} />
        </g>
        <rect x={px + 25} y={py + 45} width="440" height={r2(PH * k)} fill={`url(#${idp}-glass)`} opacity="0.55" className="mock-sheen" />
        <path d={`M${px + 25} ${py + 45}H${px + 25 + 200}L${px + 25 + 70} ${py + 45 + 550}H${px + 25}Z`} fill="#FFFFFF" opacity="0.05" />
        <rect x={px} y={py + 600} width="490" height="40" fill="#241812" />
        <rect x={px} y={py + 636} width="490" height="4" fill="#000000" opacity="0.4" />
      </PlaceG>
    );
  };
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Mockup: two posters in a dark double frame on a ribbed wall" exportName="campaign-mock-frames">
      <MaterialDefs idp={idp} />
      <BackdropG idp={idp} w={W} h={H} horizon={hz / H} wall={SCENE.tribal40} floor={SCENE.sand20} />
      <WallRibsG w={W} h={hz - 2} pitch={13} rib={5} fill={SCENE.tribal40} />
      <path d={`M0 0H560L1060 ${hz}H520Z`} fill="#FFFFFF" opacity="0.14" />
      <path d={`M1160 0H1420L1600 ${hz - 400}V${hz}H1380Z`} fill="#FFFFFF" opacity="0.08" />
      <path d={`M380 ${hz + 20}H1500L1600 ${hz + 120}V${H}H300Z`} fill="#FFFFFF" opacity="0.32" />
      <CastRectG x={250} y={200} w={1100} h={775} len={30} opacity={0.16} className="sun-shadow" />
      <path className="sun-shadow" d={`M250 ${hz + 15}H1350L1400 ${hz + 60}H300Z`} fill={SHADOW_INK} opacity="0.14" />
      <ContactShadowG idp={idp} cx={800} cy={hz + 14} rx={620} ry={10} opacity={0.3} />
      <rect x="250" y="200" width="1100" height="775" fill={`url(#${idp}-board-dark)`} filter={`url(#${idp}-fibre)`} />
      <rect x="250" y="200" width="1100" height="5" fill="#FFFFFF" opacity="0.14" />
      <rect x="250" y="200" width="5" height="775" fill="#FFFFFF" opacity="0.1" />
      <rect x="1345" y="200" width="5" height="775" fill="#000000" opacity="0.35" />
      <rect x="790" y="205" width="20" height="770" fill="#120C09" />
      {panel(0, PosterAG, 'a')}
      {panel(1, PosterBG, 'b')}
    </Art>
  );
}

// m14: one framed poster on a wall of vertical fins, a slight angle from the left, a dark soffit above.
export function MockFins() {
  const idp = 'campaign-m2';
  const W = 1600, H = 1000, hz = 880;
  const fins = [];
  for (let x = 0, i = 0; x < W; i++) {
    const w = 34 + i * 3.4;
    fins.push({ x: r2(x), w: r2(w) });
    x += w;
  }
  const k = 0.4, fw = PW * k, fh = PH * k;
  const fx = 560, fy = 190;
  const skew = 'translate(0 -56) matrix(1 0.07 0 1 0 0)';
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Mockup: one framed poster on a wall of vertical fins" exportName="campaign-mock-fins">
      <MaterialDefs idp={idp} />
      <BackdropG idp={idp} w={W} h={H} horizon={hz / H} wall={SCENE.sand} floor={SCENE.tribal40} />
      <g>
        {fins.map((f, i) => (
          <g key={i}>
            <rect x={f.x} y="90" width={r2(f.w * 0.62)} height={hz - 92} fill="#C29C78" />
            <rect x={r2(f.x + f.w * 0.62)} y="90" width={r2(f.w * 0.38)} height={hz - 92} fill="#8B6849" />
          </g>
        ))}
      </g>
      <rect width={W} height="90" fill={SCENE.chocolate} />
      <rect y="90" width={W} height="10" fill="#000000" opacity="0.4" />
      <path d={`M0 100H700L1180 ${hz}H300Z`} fill="#FFFFFF" opacity="0.1" />
      <path d={`M0 ${hz}H${W}`} stroke={SHADOW_INK} strokeOpacity="0.22" strokeWidth="1.5" />
      <g transform={skew}>
        <path className="sun-shadow" d={castRect(fx, fy, fw + 36, fh + 36, 28)} fill={SHADOW_INK} opacity="0.2" />
        <g className="mock-lit">
          <rect x={fx - 18} y={fy - 18} width={fw + 36} height={fh + 36} fill="#0B0705" />
          <rect x={fx - 18} y={fy - 18} width={fw + 36} height="4" fill="#FFFFFF" opacity="0.16" />
          <rect x={fx - 18} y={fy - 18} width="4" height={fh + 36} fill="#FFFFFF" opacity="0.1" />
          <g transform={`translate(${fx} ${fy}) scale(${k})`}><PosterCG idp={`${idp}-c`} /></g>
          <rect x={fx} y={fy} width={fw} height={fh} fill={`url(#${idp}-glass)`} opacity="0.5" className="mock-sheen" />
        </g>
      </g>
      <PlaceG i={2}>
        <CastRectG x={1120} y={872} w={300} h={16} len={42} opacity={0.22} />
        <BlockG x={1120} y={836} w={300} h={44} d={30} front={SCENE.beige} top={SCENE.white} side={SCENE.sand40} />
      </PlaceG>
    </Art>
  );
}

// m16: the hoarding on a street, front view: the two halves side by side above a pavement, a kerb and the road.
export function MockHoarding() {
  const idp = 'campaign-m3';
  const W = 1600, H = 1000, hz = 830;
  const k = 700 / 1080, hx = 100, hy = 110;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Mockup: the hoarding on a street" exportName="campaign-mock-hoarding">
      <MaterialDefs idp={idp} />
      <BackdropG idp={idp} w={W} h={H} horizon={hz / H} wall={SCENE.sand20} floor={SCENE.sand20} />
      <path d={`M0 0H420L900 ${hz}H0Z`} fill="#FFFFFF" opacity="0.4" />
      <PlaceG i={1}>
        <path className="sun-shadow" d={castRect(hx, hy, 1400, 700, 34)} fill={SHADOW_INK} opacity="0.16" />
        <rect x={hx - 10} y={hy - 10} width="1420" height="720" fill="#120C09" />
        <g transform={`translate(${hx} ${hy}) scale(${r2(k)})`}><HoardLeftG idp={`${idp}-l`} /></g>
        <g transform={`translate(${r2(hx + 1080 * k)} ${hy}) scale(${r2(k)})`}><HoardRightG idp={`${idp}-r`} /></g>
        <path d={`M${hx} ${hy}H${hx + 420}L${hx + 120} ${hy + 700}H${hx}Z`} fill="#FFFFFF" opacity="0.05" />
      </PlaceG>
      <StreetG y={hz + 10} w={W} h={H} />
      <rect y={hz} width={W} height="10" fill={SHADOW_INK} opacity="0.55" />
      <path className="sun-shadow" d={`M${hx} ${hz + 10}H${hx + 1400}L${hx + 1440} ${hz + 44}H${hx + 40}Z`} fill={SHADOW_INK} opacity="0.16" />
    </Art>
  );
}
