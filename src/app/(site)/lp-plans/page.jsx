import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-plans/Hero';
import BoxStory from '@/components/pages/lp-plans/BoxStory';
import PlanStudy from '@/components/pages/lp-plans/PlanStudy';
import Grounds from '@/components/pages/lp-plans/Grounds';
import Closing from '@/components/pages/lp-plans/Closing';
import s from '@/components/pages/lp-plans/lp-plans.module.css';

export const metadata = pageMeta('lp-plans');

// Plans: a tilted tablet with the plan on Tribal Brown, then the presentation box opening in stages beside the
// plan text, the plan enlarged, the sheet on Beige or Dark, and the closing call.
export default function Page() {
  return (
    <section className={`page ${s.page}`} style={{ paddingBottom: 0 }} id="p-lp-plans" aria-label="Landing: Plans">
      <div className={s.top}>
        <LandingNav current="lp-plans" tone="dark" />
        <Hero />
      </div>
      <BoxStory />
      <PlanStudy />
      <Grounds />
      <Closing />
      <LandingFooter />
    </section>
  );
}
