// <Chip>Real Estate</Chip>                        a small pill label (outline on the page ground)
// <Chip tone="brown" size="sm">Philosophy</Chip>   tone: brown | dark | sand | beige; size: sm
// <Chip pressed={on} onClick={...}>Our Vision</Chip>  becomes a toggle button (use inside a client component)
export default function Chip({ children, tone, size, pressed, onClick, as: Tag = 'span', className = '', ...rest }) {
  const cls = ['chip', tone && `chip-${tone}`, size === 'sm' && 'chip-sm', className].filter(Boolean).join(' ');
  if (onClick || pressed !== undefined) {
    return (
      <button type="button" className={cls} aria-pressed={pressed} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
