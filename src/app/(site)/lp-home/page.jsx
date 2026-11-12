import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-home/Hero';
import Story from '@/components/pages/lp-home/Story';
import PosterPair from '@/components/pages/lp-home/PosterPair';
import PhoneSection from '@/components/pages/lp-home/PhoneSection';
import WordmarkBand from '@/components/pages/lp-home/WordmarkBand';
import Closing from '@/components/pages/lp-home/Closing';

export const metadata = pageMeta('lp-home');

// Landing: Home. The About page of the case study (m12) grown to desktop: hero, a story scroll with the pinned
// visual on the right, the original phone screen, a sign-off and the shared footer.
export default function Page() {
  return (
    <section className="page" id="p-lp-home" aria-label="Landing: Home" style={{ paddingBottom: 0 }}>
      <LandingNav current="lp-home" />
      <Hero />
      <WordmarkBand />
      <Story />
      <PosterPair />
      <PhoneSection />
      <Closing />
      <LandingFooter />
    </section>
  );
}
