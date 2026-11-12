import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Hero from '@/components/pages/lp-plans/Hero';
import BoxStory from '@/components/pages/lp-plans/BoxStory';
import PlanStudy from '@/components/pages/lp-plans/PlanStudy';
import Grounds from '@/components/pages/lp-plans/Grounds';
import Spine from '@/components/pages/lp-plans/Spine';
import Closing from '@/components/pages/lp-plans/Closing';
import s from '@/components/pages/lp-plans/lp-plans.module.css';

export const metadata = pageMeta('lp-plans');

// Plans, in order (nav and footer shared): 1 nav on Tribal Brown   2 hero: a tilted tablet with the plan
// 3 the story: the presentation box (m13) pinned at the LEFT, opening in stages   4 the plan enlarged on its grid
// with three details   5 the sheet on Beige or Dark, with its colours   6 the spine laid flat   7 the closing
// call on one centre axis   8 footer.
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
      <Spine />
      <Closing />
      <LandingFooter />
    </section>
  );
}
