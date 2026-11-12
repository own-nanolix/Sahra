import Link from 'next/link';
import Icon from '@/components/site/Icon';

// Buttons are rounded rectangles with a small radius, as the hoarding's "→ sahra.sa" and the profile's "Follow".
// <Button>Follow</Button>                          tribal brown with beige text (default)
// <Button variant="black">Follow</Button>          variants: tribal | black | dark | beige | outline | ghost
// <Button url href="/lp-contact/">sahra.sa</Button>   url: the brand's arrow before the label ("→ sahra.sa")
// <Button icon="plan" label="Plan" />              square icon button (label is required for icon-only buttons)
// size="sm" | "lg", block, iconRight="arrow-right"
export default function Button({ children, variant = 'tribal', size, block, href, url, icon, iconRight, label, className = '', type = 'button', ...rest }) {
  const iconOnly = !children && (icon || iconRight);
  const cls = ['btn', variant !== 'tribal' && `btn-${variant}`, size === 'sm' && 'btn-sm', size === 'lg' && 'btn-lg', block && 'btn-block', url && 'btn-url', iconOnly && 'btn-icon', className].filter(Boolean).join(' ');
  const is = size === 'sm' ? 16 : 20;
  const inner = (
    <>
      {icon && <Icon name={icon} size={is} />}
      {children}
      {iconRight && <Icon name={iconRight} size={is} />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={label} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} className={cls} aria-label={label} {...rest}>
      {inner}
    </button>
  );
}
