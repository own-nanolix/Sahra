// One <linearGradient> for a GRADIENTS entry: id is `${idp}-${g.id}`.
export default function GradDef({ idp, g }) {
  const [x1, y1, x2, y2] = g.v;
  return (
    <linearGradient id={`${idp}-${g.id}`} x1={x1} y1={y1} x2={x2} y2={y2}>
      {g.stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
    </linearGradient>
  );
}
