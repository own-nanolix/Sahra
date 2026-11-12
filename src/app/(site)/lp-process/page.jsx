import { pageMeta } from '@/lib/pages';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-process/Hero';
import PlanStory from '@/components/pages/lp-process/PlanStory';
import Layers from '@/components/pages/lp-process/Layers';
import Letter from '@/components/pages/lp-process/Letter';
import Next from '@/components/pages/lp-process/Next';
import Closing from '@/components/pages/lp-process/Closing';

export const metadata = pageMeta('lp-process');

// Landing 3: hero in thirds (plan sheet / headline / contacts) / story with the plan pinned in the centre column and
// steps alternating left and right / layer explorer / the letter / closing board / footer.
export default function Page() {
  return (
    <section className="page" id="p-lp-process" aria-label="Landing: Our Process" style={{ paddingBottom: 0 }}>
      <Hero />
      <PlanStory />
      <Layers />
      <Letter />
      <Next />
      <Closing />
      <LandingFooter />
    </section>
  );
}
