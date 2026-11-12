import Link from 'next/link';
import Card, { Lines } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Chip from '@/components/ui/Chip';
import Reveal from '@/components/site/Reveal';
import { LINES, SCOPE, TAGS } from '@/lib/brand';
import { ArchTileArt, PlanFragmentArt, WallSkyArt } from './artwork';
import s from './web-system.module.css';

// Three feature cards, each built differently: a stacked card with a cut-corner field, a wide dark card with the
// arch tile at its side, and a Tribal Brown board card with a plan fragment. Copy is the brand's own lines.
export default function FeatureCards() {
  return (
    <div className={s.cards}>
      <Reveal>
        <Card className={s.cardHover} style={{ height: '100%' }}>
          <WallSkyArt idp="web-system-card-a" className={s.cardMedia} />
          <Lines as="h3" rows={LINES.elevate.rows} className="t-h3" />
          <p className="t-small" style={{ marginTop: 12 }}>{LINES.refined.text}</p>
          <div className={s.cardFoot}>
            <Link href="/lp-contact/" className="site-url">sahra.sa</Link>
            <Chip size="sm">{TAGS[0]}</Chip>
          </div>
        </Card>
      </Reveal>
      <Reveal delay={90}>
        <Card variant="dark" className={`${s.cardHover} ${s.cardWide}`} style={{ height: '100%' }}>
          <ArchTileArt idp="web-system-card-b" />
          <div className={s.cardBody}>
            <Lines as="h3" rows={LINES.builtAround.rows} className="t-h3" />
            <p className="t-small">{LINES.cleanArchitecture.text}</p>
            <div className="row">
              <Button variant="beige" size="sm" href="/lp-vision/" iconRight="arrow-right">Our Vision</Button>
            </div>
          </div>
        </Card>
      </Reveal>
      <Reveal delay={180}>
        <Card variant="board" className={s.cardHover} style={{ height: '100%' }}>
          <PlanFragmentArt className={s.boardMedia} />
          <Lines as="h3" rows={LINES.refinedLiving.rows} className="t-h3" />
          <div className={s.cardFoot}>
            <div className="row">
              {SCOPE.slice(0, 2).map((t) => <Chip key={t} tone="beige" size="sm">{t}</Chip>)}
            </div>
            <Link href="/lp-plans/" className="site-url on-dark" style={{ color: 'var(--beige)' }}>sahra.sa</Link>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
