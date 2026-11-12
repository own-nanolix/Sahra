// The event kit page: the booth as the opening wide plate, then a 12-column bento with the lanyard tall (3 x 4)
// and the rest of the kit filling around it. Captions are plain names.
import Reveal from '@/components/site/Reveal';
import Booth from './Booth';
import Lanyard from './Lanyard';
import { IdBeige, IdDark } from './Ids';
import { FabricBand, SiliconeBand } from './Bands';
import { TicketPlate, VipPass } from './Tickets';
import { FlagPlate, BannerPlate, StreetScene } from './Street';
import s from './use-event.module.css';

// span x rows of the bento and the plate's own aspect (used when the tiles stack)
const AR = { '3x4': 0.475, '3x2': 0.98, '4x3': 0.87, '12x3': 2.7, '12x4': 2 };

function Plate({ size, caption, delay = 0, children }) {
  const [c, r] = size.split('x');
  return (
    <Reveal as="figure" delay={delay} className={`tile tile-flush tile-print span-${c} rows-${r} ${s.plate}`} style={{ '--ar': AR[size] }}>
      {children}
      <figcaption className={s.cap}>{caption}</figcaption>
    </Reveal>
  );
}

export default function EventPage({ title }) {
  return (
    <section className="page" id="p-use-event" aria-label={title}>
      <div className="wrap">
        <header className={s.head}>
          <h1 className="t-h1" tabIndex={-1}>{title}</h1>
        </header>
        <Reveal as="figure" className={`tile tile-flush tile-print ${s.hero}`}>
          <Booth />
          <figcaption className={s.cap}>Exhibition booth</figcaption>
        </Reveal>
        <h2 className="t-label" style={{ padding: 'var(--gap) 0' }}>Event kit</h2>
        <div className="bento" style={{ paddingBottom: 'var(--band)' }}>
          <Plate size="3x4" caption="Lanyard with speaker badge"><Lanyard /></Plate>
          <Plate size="3x2" caption="Staff ID card, Beige" delay={60}><IdBeige /></Plate>
          <Plate size="3x2" caption="Staff ID card, Dark Chocolate" delay={120}><IdDark /></Plate>
          <Plate size="3x4" caption="VIP pass" delay={60}><VipPass /></Plate>
          <Plate size="3x2" caption="Fabric wristbands, Dark Chocolate"><FabricBand kind="dark" /></Plate>
          <Plate size="3x2" caption="Fabric wristbands, Tribal Brown" delay={60}><FabricBand kind="tribal" /></Plate>
          <Plate size="3x2" caption="Fabric wristbands, Sand"><FabricBand kind="sand" /></Plate>
          <Plate size="3x2" caption="Fabric wristbands, Beige" delay={60}><FabricBand kind="beige" /></Plate>
          <Plate size="3x2" caption="Silicone wristband, Dark Chocolate" delay={120}><SiliconeBand kind="dark" /></Plate>
          <Plate size="3x2" caption="Silicone wristband, Tribal Brown" delay={180}><SiliconeBand kind="tribal" /></Plate>
          <Plate size="3x2" caption="Silicone wristband, Sand"><SiliconeBand kind="sand" /></Plate>
          <Plate size="3x2" caption="Tickets, Beige" delay={60}><TicketPlate kind="beige" /></Plate>
          <Plate size="3x2" caption="Tickets, Dark Chocolate" delay={120}><TicketPlate kind="dark" /></Plate>
          <Plate size="3x2" caption="Tickets, Sand" delay={180}><TicketPlate kind="sand" /></Plate>
          <Plate size="4x3" caption="Feather flag, Dark Chocolate"><FlagPlate kind="dark" /></Plate>
          <Plate size="4x3" caption="Feather flag, Tribal Brown" delay={60}><FlagPlate kind="tribal" /></Plate>
          <Plate size="4x3" caption="Feather flag, Beige" delay={120}><FlagPlate kind="beige" /></Plate>
          <Plate size="12x3" caption="Hanging banner"><BannerPlate /></Plate>
          <Plate size="12x4" caption="Flags and banner, street"><StreetScene /></Plate>
        </div>
      </div>
    </section>
  );
}
