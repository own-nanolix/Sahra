import { pageMeta } from '@/lib/pages';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-philosophy/Hero';
import ArchStory from '@/components/pages/lp-philosophy/ArchStory';
import Statement from '@/components/pages/lp-philosophy/Statement';
import Poster from '@/components/pages/lp-philosophy/Poster';
import Scope from '@/components/pages/lp-philosophy/Scope';
import TypeSection from '@/components/pages/lp-philosophy/TypeSection';
import Closing from '@/components/pages/lp-philosophy/Closing';

export const metadata = pageMeta('lp-philosophy');

// Landing 2: Hero on Black as m14 (right) / story scroll with the quarter arch pinned at the left / dark pause with
// the three ruled rows / the type slide as a quiet section (m06) / closing curved-wall field / footer.
export default function Page() {
  return (
    <section className="page" id="p-lp-philosophy" aria-label="Landing: Philosophy" style={{ paddingBottom: 0 }}>
      <Hero />
      <ArchStory />
      <Statement />
      <Poster />
      <Scope />
      <TypeSection />
      <Closing />
      <LandingFooter />
    </section>
  );
}
