import Reveal from '@/components/site/Reveal';
import { FROM_BLOCK, SENDER } from '@/lib/brand';
import { FolderArt } from './contact-art';
import s from './lp-contact.module.css';

// The dark folder of m10 on the studio ground, beside its own From block set large: the sender's lines as the
// folder prints them, nothing added.
export default function Folder() {
  const [from, ...lines] = FROM_BLOCK;
  return (
    <section className={s.folder} aria-labelledby="lp-contact-folder-h">
      <div className={`wrap ${s.folderGrid}`}>
        <Reveal from="scale" className={s.folderArt}>
          <FolderArt />
        </Reveal>
        <div className={s.folderCopy}>
          <Reveal>
            <p className="t-label sand-ink">Folder</p>
            <h2 id="lp-contact-folder-h" className="t-h1">{SENDER.brand}</h2>
          </Reveal>
          <Reveal delay={120}>
            <address className={s.folderFrom}>
              <span className="t-small muted">{from}</span>
              {lines.map((l) => <span key={l}>{l}</span>)}
            </address>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
