import s from './web-system.module.css';

// The component specification: measurements read from the shared stylesheet (px), set as a ruled table.
const SPEC = [
  ['Button', 'height 44, padding 20, radius 8, gap 10, type 16'],
  ['Button small', 'height 34, padding 14, radius 6, type 14'],
  ['Button large', 'height 54, padding 26, radius 10, type 18'],
  ['Icon button', '44 x 44, small 34 x 34'],
  ['Tag', 'padding 6 and 12, pill radius, type 13; small 4 and 9, type 12'],
  ['Card', 'radius 32, padding 18 to 36; media radius 18'],
  ['Ruled row', 'padding 22, number 3.2em, label 19 to 24, plus 16 x 16, rule 1'],
  ['Navigation bar', 'padding 18, links type 14, action small button'],
  ['Focus', '2 line, offset 3 (buttons 2), Tribal Brown; Sand on dark grounds'],
  ['Motion', 'hover 140 ms, small 240 ms, standard 480 ms, draws 900 ms; out-quart, no bounce'],
];

export default function Specification() {
  return (
    <dl className={s.spec}>
      {SPEC.map(([k, v]) => (
        <div key={k} className={s.specRow}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
