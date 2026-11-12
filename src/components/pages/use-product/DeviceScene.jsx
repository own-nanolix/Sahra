// Tablet, phone and watch showing the product, standing on a desk edge, front view, falling size left to right.
// Neutral graphite frames; no clock time on any screen.
import Art from '@/components/art/Art';
import { TabletG, PhoneG, WatchG, ScreenPlanG, ScreenAboutG, ScreenWatchG } from '@/components/art/Devices';
import { MaterialDefs, CastG, CastRectG, ContactShadowG, PlaceG, SCENE } from '@/components/art/Mockup';
import { Desk } from './parts';

export default function DeviceScene() {
  const id = 'use-product-devices';
  const base = 566;
  const tw = 560, th = Math.round((tw * 900) / 1260);   // 400
  const pw = 206, ph = Math.round((pw * 884) / 430);    // 424
  const ww = 118, wh = Math.round((ww * 490) / 240);    // 241
  const tx = 90, px = 720, wx = 1000;
  return (
    <Art viewBox="0 0 1200 700" title="Tablet with the plan sheet, phone with the About page and watch with the mark" exportName="use-product-devices">
      <MaterialDefs idp={id} />
      <Desk idp={id} w={1200} h={700} horizon={0.62} wall={SCENE.chocolate} floor={SCENE.sand} deskY={622} edge={SCENE.tribal} />

      {/* tablet: a rear support (hidden), hard shadow, contact shadow */}
      <CastG d={`M${tx} ${base - th}h${tw}v${th}h${-tw}z`} len={44} steps={9} opacity={0.14} className="sun-shadow" />
      <CastRectG x={tx} y={base - 10} w={tw} h={12} len={64} opacity={0.28} className="sun-shadow" />
      <ContactShadowG idp={`${id}-t`} cx={tx + tw / 2} cy={base + 2} rx={tw / 2 + 6} opacity={0.4} blur={6} />
      <PlaceG i={1}>
        <TabletG idp={`${id}-tablet`} x={tx} y={base - th} w={tw}>
          <ScreenPlanG idp={`${id}-plan`} />
        </TabletG>
      </PlaceG>

      {/* phone */}
      <CastG d={`M${px} ${base - ph}h${pw}v${ph}h${-pw}z`} len={36} steps={8} opacity={0.14} className="sun-shadow" />
      <CastRectG x={px} y={base - 8} w={pw} h={10} len={52} opacity={0.28} className="sun-shadow" />
      <ContactShadowG idp={`${id}-p`} cx={px + pw / 2} cy={base + 2} rx={pw / 2 + 4} opacity={0.4} blur={5} />
      <PlaceG i={2}>
        <PhoneG idp={`${id}-phone`} x={px} y={base - ph} w={pw}>
          <ScreenAboutG idp={`${id}-about`} />
        </PhoneG>
      </PlaceG>

      {/* watch: standing on its case */}
      <CastG d={`M${wx} ${base - wh + 40}h${ww}v${wh - 40}h${-ww}z`} len={26} steps={6} opacity={0.14} className="sun-shadow" />
      <CastRectG x={wx} y={base - 8} w={ww} h={10} len={40} opacity={0.28} className="sun-shadow" />
      <ContactShadowG idp={`${id}-w`} cx={wx + ww / 2} cy={base + 2} rx={ww / 2 + 4} opacity={0.4} blur={4} />
      <PlaceG i={3}>
        <WatchG idp={`${id}-watch`} x={wx} y={base - wh} w={ww}>
          <ScreenWatchG idp={`${id}-wscreen`} />
        </WatchG>
      </PlaceG>
    </Art>
  );
}
