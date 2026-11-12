import Reveal from '@/components/site/Reveal';
import Button from '@/components/ui/Button';
import RuledRows from '@/components/ui/RuledRows';
import { Lines } from '@/components/ui/Card';
import { LINES } from '@/lib/brand';
import s from './lp-home.module.css';

const ROWS = [
  { no: '01', label: 'Philosophy', href: '/lp-philosophy/' },
  { no: '02', label: 'Our Process', href: '/lp-process/' },
  { no: '03', label: 'Our Vision', href: '/lp-vision/' },
];

// The sign-off: the refined line, the three rows as links to their pages, and "→ sahra.sa".
export default function Closing() {
  return (
    <section className={`wrap ${s.closing}`} aria-labelledby="lp-home-closing-h">
      <div className={s.closingGrid}>
        <Reveal className="stack-lg">
          <Lines as="h2" id="lp-home-closing-h" className="t-h1" rows={LINES.refined.rows} />
          <Button url href="/lp-contact/" size="lg">sahra.sa</Button>
        </Reveal>
        <Reveal delay={120}>
          <RuledRows id="lp-home-closing-rows" rows={ROWS} />
        </Reveal>
      </div>
    </section>
  );
}
