import { pageMeta } from '@/lib/pages';
import { LINES } from '@/lib/brand';
import { Lines } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import Shell from '@/components/pages/dashboard/Shell';
import Components from '@/components/pages/dashboard/controls';
import Gallery from '@/components/pages/dashboard/Gallery';
import s from '@/components/pages/dashboard/dashboard.module.css';

export const metadata = pageMeta('dashboard');

export default function Page() {
  return (
    <section className="page" id="p-dashboard" aria-label="Dashboard">
      <header className="wrap band">
        <p className="t-label">Product</p>
        <h1 tabIndex={-1} className="t-display">Dashboard</h1>
        <Lines rows={LINES.refined.rows} className={`t-lead ${s.lead}`} />
      </header>
      <div className="wrap stack-lg">
        <Reveal><h2 className="t-h2">Seven screens, one workspace</h2><p className="t-body muted">Five home options, an overview that compares them, and two inner screens. Switch with the tabs or the arrow keys; every control works.</p></Reveal>
        <Shell />
        <Reveal><h2 className="t-h2">Components</h2><p className="t-body muted">Each component with its states, and a live one that responds.</p></Reveal>
        <Components />
        <Reveal><h2 className="t-h2">Charts and drawings</h2><p className="t-body muted">Each one exports as SVG.</p></Reveal>
        <Gallery />
      </div>
    </section>
  );
}
