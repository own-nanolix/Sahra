import { pageMeta } from '@/lib/pages';
import Hero from '@/components/pages/strategy/Hero';
import Story, { Close } from '@/components/pages/strategy/Story';
import Description from '@/components/pages/strategy/Description';
import s from '@/components/pages/strategy/strategy.module.css';

export const metadata = pageMeta('strategy');

// Strategy: the case study's own story (the problem, the positioning, the purpose) as six bento rows that change shape,
// each paragraph beside a diagram drawn from its own words. The case study prints no research figures
// or statistics, so none are shown.
export default function Page() {
  return (
    <section className="page" id="p-strategy" aria-label="Strategy">
      <Hero />
      <Story />
      <Description />
      <div className={`wrap ${s.closeWrap}`}>
        <Close />
      </div>
    </section>
  );
}
