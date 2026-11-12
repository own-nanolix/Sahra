import Art from '@/components/art/Art';
import { GuideGridG } from '@/components/art/KeyArt';
import { QuarterArchG } from '@/components/art/KeyArt';
import { Lines } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { LINES, HEX } from '@/lib/brand';
import { arcPath, arcLength } from '@/lib/charts';
import s from './lp-process.module.css';

// The close: Tribal Brown board with the guide grid of a drawing, a quarter arch drawn on along it, the hoarding's
// line (m16) and the web address as the one button.
export default function Closing() {
  return (
    <section className={`field-tribal on-brown ${s.closing}`} id="lp-process-closing" aria-labelledby="lp-process-closing-title">
      <Art viewBox="0 0 1600 640" title="Guide grid with a quarter arch" exportName="lp-process-grid" className={s.gridSvg} preserveAspectRatio="xMidYMid slice">
        <GuideGridG x={0} y={0} w={1600} h={640} step={40} stroke={HEX.beige} opacity="0.14" />
        <g className="fade-in" style={{ '--i': 2 }}>
          <QuarterArchG cx={1600} cy={640} r={180} R={420} quadrant="tl" fill={HEX.sand} opacity="0.22" />
        </g>
        {[180, 420, 300].map((r, i) => (
          <path key={r} d={arcPath(1600, 640, r, 270, 360)} fill="none" stroke={HEX.beige} strokeWidth="1.6" className="draw" style={{ '--len': arcLength(r, 0, 90) + 4, '--i': i * 3 }} />
        ))}
      </Art>
      <div className={`wrap ${s.closingInner}`}>
        <Lines as="h2" id="lp-process-closing-title" rows={LINES.refinedLiving.rows} className="t-display" />
        <Button url href="/lp-contact/" variant="beige" size="lg">sahra.sa</Button>
      </div>
    </section>
  );
}
