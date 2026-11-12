import Button from '@/components/ui/Button';
import s from './web-system.module.css';

// The button set: six variants (shared Button) across rest, hover, focus-visible, active and disabled.
// The rest column is live (real hover and focus); the pinned columns hold a state still for comparison.
const STATES = [
  { key: 'rest', label: 'Rest', cls: '' },
  { key: 'hover', label: 'Hover', cls: s.sHover },
  { key: 'focus', label: 'Focus-visible', cls: s.sFocus },
  { key: 'active', label: 'Active', cls: s.sActive },
  { key: 'disabled', label: 'Disabled', cls: '' },
];

const VARIANTS = [
  { key: 'url', label: 'Tribal Brown, as the hoarding', props: { url: true }, text: 'sahra.sa' },
  { key: 'black', label: 'Black, as Follow', props: { variant: 'black' }, text: 'Follow' },
  { key: 'outline', label: 'Outline', props: { variant: 'outline' }, text: 'Our Vision' },
  { key: 'quiet', label: 'Quiet link with arrow', props: { variant: 'ghost', iconRight: 'arrow-right' }, text: 'Our Process' },
  { key: 'icon', label: 'Icon button', props: { icon: 'menu', label: 'Menu' }, text: null },
  { key: 'large', label: 'Large', props: { url: true, size: 'lg' }, text: 'sahra.sa' },
];

export default function ButtonSet() {
  return (
    <div className={s.scroller} tabIndex={0} role="group" aria-label="Button set, scrolls sideways on small screens">
      <div className={s.matrix}>
        <span />
        {STATES.map((st) => <span key={st.key} className={s.colHead}>{st.label}</span>)}
        {VARIANTS.map((v) => (
          <ButtonRow key={v.key} v={v} />
        ))}
      </div>
    </div>
  );
}

function ButtonRow({ v }) {
  return (
    <>
      <span className={s.rowHead}>{v.label}</span>
      {STATES.map((st) => (
        <div key={st.key} className={`${s.cell} ${st.cls}`}>
          <Button
            {...v.props}
            disabled={st.key === 'disabled'}
            tabIndex={st.key === 'rest' || st.key === 'disabled' ? undefined : -1}
            aria-label={v.text ? undefined : v.props.label}
          >
            {v.text}
          </Button>
        </div>
      ))}
    </>
  );
}
