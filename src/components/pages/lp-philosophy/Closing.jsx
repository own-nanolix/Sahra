import Link from 'next/link';
import Art from '@/components/art/Art';
import { BrandDefs } from '@/components/art/KeyArt';
import { QuarterArchG } from '@/components/art/KeyArt';
import { Lines } from '@/components/ui/Card';
import { Contact } from '@/components/ui/Card';
import { LINES, HEX, CONTACT_BLOCKS } from '@/lib/brand';
import { PHOTO } from '@/components/art/KeyArt';
import InView from './InView';
import s from './lp-philosophy.module.css';

// The closing field: full bleed, a curved plaster wall against the sky as in the left poster of m11 (drawn, not
// traced). The deep shadow of the court lengthens over the wall when the field comes into view.
const IDP = 'lp-philosophy-wall';

export default function Closing() {
  return (
    <InView className={s.closing} id="lp-philosophy-closing" threshold={0.25}>
      <Art viewBox="0 0 1600 760" title="Curved wall against the sky" exportName="lp-philosophy-wall" className={s.wallSvg} preserveAspectRatio="xMidYMid slice">
        <BrandDefs idp={IDP} grain={0.08} />
        <rect width="1600" height="760" fill={`url(#${IDP}-sky)`} />
        <path d="M0 430C300 300 760 230 1170 330L1170 760H0Z" fill={`url(#${IDP}-wall)`} filter={`url(#${IDP}-grain)`} />
        <path d="M1170 0H1600V760H1170Z" fill={PHOTO.shade} />
        <g className={s.shadeG}>
          <path d="M0 640L1170 470V760H0Z" fill={PHOTO.shade} opacity="0.84" />
        </g>
        <g className="fade-in" style={{ '--i': 3 }}>
          <QuarterArchG cx={1170} cy={0} r={150} R={300} quadrant="bl" fill="none" stroke={HEX.beige} strokeWidth="1.5" opacity="0.55" />
        </g>
      </Art>
      <div className={s.closingShade} aria-hidden="true" />
      <div className={`wrap ${s.closingText}`}>
        <Lines as="h2" rows={LINES.imagination.rows} className="t-display" />
        <div className={s.closingFoot}>
          <Link href="/lp-contact/" className="site-url on-dark">sahra.sa</Link>
          <div className="contact-group">
            <Contact lines={CONTACT_BLOCKS.office} />
            <Contact lines={CONTACT_BLOCKS.service} />
          </div>
        </div>
      </div>
    </InView>
  );
}
