// A plate: one exportable graphic and its caption. The caption sits outside the artwork, on the page ground.
import s from './logo.module.css';

export default function Plate({ caption, note, children, className = '', ratio, ground }) {
  return (
    <figure className={`${s.plate} ${className}`} style={ratio || ground ? { '--ratio': ratio, '--ground': ground } : undefined}>
      <div className={s.art}>{children}</div>
      {(caption || note) && (
        <figcaption className={s.cap}>
          {caption && <span className="t-label">{caption}</span>}
          {note && <span className="t-small">{note}</span>}
        </figcaption>
      )}
    </figure>
  );
}
