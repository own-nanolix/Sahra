import Link from 'next/link';
import LandingNav from '@/components/ui/LandingNav';
import { Contact, Lines } from '@/components/ui/Card';
import { CONTACT_BLOCKS, LINES } from '@/lib/brand';
import { SheetArt } from './PlanArt';
import s from './lp-process.module.css';

// Split in thirds: the plan sheet (m13) at the left on Tribal Brown board, the headline in the centre on Beige,
// the contacts at the right on Dark Chocolate. The plan's walls draw on and the sheet is set down on the board.
export default function Hero() {
  return (
    <header className={s.hero} id="lp-process-hero">
      <LandingNav current="lp-process" />
      <div className={s.thirds}>
        <div className={`field-tribal ${s.third} ${s.left}`}>
          <SheetArt className={s.sheet} />
        </div>
        <div className={`${s.third} ${s.centre}`}>
          <p className={`t-label ${s.kicker}`}>Our Process</p>
          <h1 tabIndex={-1} className={s.headline} aria-label={LINES.builtAround.text}>
            <Lines rows={LINES.builtAround.rows} as="span" className={s.headlineLines} aria-hidden="true" />
          </h1>
          <span className={s.centreRule} aria-hidden="true" />
        </div>
        <div className={`field-chocolate on-dark ${s.third} ${s.right}`}>
          <div className={s.contacts}>
            <Contact lines={CONTACT_BLOCKS.office} className={s.contactBig} />
            <Contact lines={CONTACT_BLOCKS.service} className={s.contactBig} />
            <Contact lines={CONTACT_BLOCKS.online} className={s.contactBig} />
          </div>
          <Link href="/lp-contact/" className="site-url">sahra.sa</Link>
        </div>
      </div>
    </header>
  );
}
