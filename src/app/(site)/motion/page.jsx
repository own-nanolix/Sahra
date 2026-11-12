import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { CurveGrid, DurationStrip } from '@/components/pages/motion/Curves';
import { LogoBuild, MarkAssemble, Storyboard, RefFrames } from '@/components/pages/motion/Logo';
import { PageEnter, EnterTimeline, RowsDemo, CardDemo, SheetDemo, TabsDemo } from '@/components/pages/motion/Transitions';
import { ButtonsDemo, ToggleDemo, InputDemo, Loaders, ToastDemo, ChipsDemo, CopyDemo, LinkDemo } from '@/components/pages/motion/Micro';
import DoDont from '@/components/pages/motion/DoDont';
import s from '@/components/pages/motion/motion.module.css';

export const metadata = pageMeta('motion');

function Head({ id, title, text }) {
  return (
    <div className={s.secHead}>
      <h2 className="t-h1" id={id}>{title}</h2>
      <p className="t-lead muted">{text}</p>
    </div>
  );
}

function Label({ title, text }) {
  return (
    <div className={s.tileHead}>
      <h3 className="t-h3">{title}</h3>
      {text && <p className="t-small">{text}</p>}
    </div>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-motion" aria-label="Motion">
      <header className="wrap band">
        <div className={s.intro}>
          <h1 className="t-display" tabIndex={-1}>Motion</h1>
          <p className="t-lead">
            Slow, architectural and exact. Lines draw on along the grid, shapes slide into place and stop, shadows
            lengthen like sun on a wall. No bounce anywhere.
          </p>
          <p className="t-small">Every demo below is live. Each one ends on its final value, also when replayed or when reduced motion is on.</p>
        </div>
      </header>

      <section className={`wrap ${s.sec}`} aria-labelledby="motion-h-curves">
        <Reveal>
          <Head id="motion-h-curves" title="Easing curves and durations" text="Four curves and five durations are the whole system. Each curve is drawn from its real control points; press Play and the dot travels it." />
        </Reveal>
        <Reveal><CurveGrid /></Reveal>
        <div className="bento bento-8" style={{ marginTop: 'var(--gap)' }}>
          <Reveal className="span-8"><DurationStrip /></Reveal>
        </div>
      </section>

      <section className={`wrap ${s.sec}`} aria-labelledby="motion-h-logo">
        <Reveal>
          <Head id="motion-h-logo" title="Logo animation" text="The word-mark is built the way its construction drawing is: a grid of guides, outlines drawing on, anchor points, then the fill." />
        </Reveal>
        <div className="bento bento-8">
          <Reveal className="span-5">
            <div className="tile tile-print">
              <Label title="Word-mark build" text="In the construction drawing&apos;s own colours, in the order it is drawn." />
              <LogoBuild />
            </div>
          </Reveal>
          <Reveal className="span-3">
            <div className="tile tile-dark on-dark tile-print">
              <Label title="The mark assembling" />
              <MarkAssemble />
            </div>
          </Reveal>
          <Reveal className="span-8">
            <div className="tile">
              <Label title="Storyboard" text="Four key frames, drawn from the same layers as the animation." />
              <Storyboard />
            </div>
          </Reveal>
          <Reveal className="span-8">
            <div className="tile">
              <Label title="Reference frames" text="The four stills of the construction animation, redrawn." />
              <RefFrames />
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`wrap ${s.sec}`} aria-labelledby="motion-h-trans">
        <Reveal>
          <Head id="motion-h-trans" title="Page and component transitions" text="Entering uses --ease-out and --dur-3. Moves between states use --ease-in-out. Everything that arrives also stops." />
        </Reveal>
        <div className="bento bento-8">
          <Reveal className="span-4">
            <div className="tile">
              <Label title="Page enter" text="The enter used by the site." />
              <PageEnter />
            </div>
          </Reveal>
          <Reveal className="span-4">
            <div className="tile">
              <Label title="Page enter, timeline" text="Five items, each 480 ms, starting 60 ms apart." />
              <EnterTimeline />
            </div>
          </Reveal>
          <Reveal className="span-4">
            <div className="tile">
              <Label title="Ruled row" text="The + turns a quarter as the row opens." />
              <RowsDemo />
            </div>
          </Reveal>
          <Reveal className="span-4">
            <div className="tile">
              <Label title="Card" text="Press the card: it lifts off its shadow and settles back." />
              <CardDemo />
            </div>
          </Reveal>
          <Reveal className="span-4">
            <div className="tile">
              <Label title="Sheet" text="Rises over a scrim in 480 ms and leaves in 240 ms." />
              <SheetDemo />
            </div>
          </Reveal>
          <Reveal className="span-4">
            <div className="tile">
              <Label title="Tabs" text="The panel enters with an 8 px rise in 240 ms." />
              <TabsDemo />
            </div>
          </Reveal>
        </div>
      </section>

      <section className={`wrap ${s.sec}`} aria-labelledby="motion-h-micro">
        <Reveal>
          <Head id="motion-h-micro" title="Micro-interactions" text="Hover, focus and press on every control. Tab to any of them to see the focus ring." />
        </Reveal>
        <div className={`bento bento-8 ${s.microGrid}`}>
          <Reveal className="span-4"><div className="tile"><Label title="Buttons" text="Hover lifts 1 px, press sinks 1 px. Run shows the busy state through to Done." /><ButtonsDemo /></div></Reveal>
          <Reveal className="span-2"><div className="tile"><Label title="Toggle" text="The thumb slides 20 px in 240 ms." /><ToggleDemo /></div></Reveal>
          <Reveal className="span-2"><div className="tile"><Label title="Chips" text="Pressed chips change ground in 140 ms." /><ChipsDemo /></div></Reveal>
          <Reveal className="span-4"><div className="tile"><Label title="Inputs" text="Focus draws the ring, or a rule that runs along the field." /><InputDemo /></div></Reveal>
          <Reveal className="span-4"><div className="tile"><Label title="Loaders" text="Built from the quarter arch and the grid." /><Loaders /></div></Reveal>
          <Reveal className="span-2"><div className="tile"><Label title="Toasts" text="In from the right, out in half the time." /><ToastDemo /></div></Reveal>
          <Reveal className="span-2"><div className="tile"><Label title="Icon button" text="Copy turns into a check." /><CopyDemo /></div></Reveal>
          <Reveal className="span-4"><div className="tile"><Label title="Links" text="The rule runs out on hover; the arrow moves 4 px." /><LinkDemo /></div></Reveal>
        </div>
      </section>

      <section className={`wrap ${s.sec}`} aria-labelledby="motion-h-dd">
        <Reveal>
          <Head id="motion-h-dd" title="Do and don’t" text="Four pairs, played together. The wrong side is built the same way; only its curve, distance, length or spacing is off." />
        </Reveal>
        <Reveal><DoDont /></Reveal>
      </section>
    </section>
  );
}
