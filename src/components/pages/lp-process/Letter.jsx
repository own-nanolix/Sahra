import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { Contact } from '@/components/ui/Card';
import { LETTER, CONTACT_BLOCKS, HEX } from '@/lib/brand';
import s from './lp-process.module.css';

// The letterhead of m10 rebuilt as a quiet section: the sender, the two contact blocks, the From and To blocks,
// the first three paragraphs (the other two are in the story above), "Thanks" and the Sand mark at the foot.
export default function Letter() {
  const [fromHead, ...fromLines] = LETTER.from;
  const [toHead, ...toLines] = LETTER.to;
  return (
    <section className={s.letter} id="lp-process-letter" aria-labelledby="lp-process-letter-title">
      <div className="wrap">
        <Reveal className={`card-print ${s.paper}`}>
          <div className={s.paperHead}>
            <h2 id="lp-process-letter-title" className={`t-serif ${s.sender}`}>{LETTER.sender}</h2>
            <Contact lines={CONTACT_BLOCKS.service.slice(1)} />
            <Contact lines={CONTACT_BLOCKS.office} />
          </div>
          <hr className="hair" />
          <div className={s.addresses}>
            <address className="contact">
              <span className="muted">{fromHead}</span>
              {fromLines.map((l) => <span key={l}>{l}</span>)}
            </address>
            <address className="contact">
              <span className="muted">{toHead}</span>
              {toLines.map((l) => <span key={l}>{l}</span>)}
            </address>
          </div>
          <div className={s.paras}>
            {LETTER.paragraphs.slice(0, 3).map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <p className={`t-body ${s.para}`}>{p}</p>
              </Reveal>
            ))}
            <p className={`t-body ${s.para}`}>{LETTER.close}</p>
          </div>
          <div className={s.paperFoot}>
            <Art viewBox="0 0 184 201" title="Sahra mark in Sand" exportName="lp-process-letter-mark" className={s.letterMark}>
              <MarkG size={184} fill={HEX.sand} topClass="mark-top" bottomClass="mark-bottom" />
            </Art>
            <Contact lines={CONTACT_BLOCKS.online} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
