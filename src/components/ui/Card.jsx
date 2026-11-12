import Icon from '@/components/site/Icon';

// The card. Digital cards have a large radius (the profile card, m12); print pieces are square (the flat lays).
// <Card title="Philosophy" variant="white|beige|dark|print|board|line" level="h3" arrow>…</Card>
// The title is a serif heading rendered with the tag given in `level` (default h3).
const CLASS = { white: 'card', beige: 'card-beige', dark: 'card-dark', print: 'card-print', board: 'card-board', line: 'card-line' };
export default function Card({ title, arrow = false, variant = 'white', level = 'h3', as: Tag = 'div', className = '', children, ...rest }) {
  const H = level;
  return (
    <Tag className={`${CLASS[variant] || 'card'} ${className}`} {...rest}>
      {(title || arrow) && (
        <div className="card-head">
          {title && <H className="t-h3">{title}</H>}
          {arrow && <Icon name="arrow-up-right" size={20} />}
        </div>
      )}
      {children}
    </Tag>
  );
}

// A brand line set with its printed line breaks: <Lines rows={LINES.elevate.rows} className="t-h1" as="h2" />
// A row given as an array is spread to both ends of the line (as "design … and" on m14).
export function Lines({ rows, as: Tag = 'p', className = '', ...rest }) {
  return (
    <Tag className={className} {...rest}>
      {rows.map((r, i) => (
        <span key={i} style={{ display: Array.isArray(r) ? 'flex' : 'block', justifyContent: 'space-between', gap: '0.5em' }}>
          {Array.isArray(r) ? r.map((w) => <span key={w}>{w}</span>) : r}
        </span>
      ))}
    </Tag>
  );
}

// A contact block as printed: short lines, very small, stacked. <Contact lines={CONTACT_BLOCKS.office} />
export function Contact({ lines, className = '' }) {
  return (
    <address className={`contact ${className}`}>
      {lines.map((l) => <span key={l}>{l}</span>)}
    </address>
  );
}

// The web address with its arrow, "→ sahra.sa" (text only; for a link put className="site-url" on a <Link>).
export function SiteUrl({ children = 'sahra.sa', className = '' }) {
  return <span className={`site-url ${className}`}>{children}</span>;
}

// A quiet placeholder line for a fact the case study does not publish. width in em.
export function Placeholder({ width = 6, label = 'Not published in the case study' }) {
  return <span className="ph" style={{ minWidth: `${width}em` }} role="img" aria-label={label} />;
}
