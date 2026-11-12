// Exportable artwork for the last story steps: the plan sheet in its tray (m13, drawn without the illegible room
// labels) and the contacts card (the three printed blocks, set as on the posters).
import Art from '@/components/art/Art';
import { FloorPlanG, wrap } from '@/components/art/Devices';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { PLAN, SENDER, CONTACT, CONTACT_BLOCKS, LINES, URL_LINE } from '@/lib/brand';

export function PlanSheetArt() {
  const lines = wrap(PLAN.text, 74);
  return (
    <Art viewBox="0 0 620 780" title="Plan sheet in the presentation box" exportName="lp-home-plan-drawing">
      <rect width="620" height="780" fill="#875D41" />
      <rect x="34" y="34" width="552" height="712" fill="#1E140F" />
      <rect x="34" y="34" width="552" height="712" fill="none" stroke="#35241C" strokeWidth="6" />
      <rect x="74" y="70" width="474" height="640" fill="#FFFFFF" />
      <g className="fade-in">
        <text x="98" y="104" fontSize="9" fill="#875D41" className="sans">{SENDER.developement}</text>
        <text fontSize="8" fill="#1E140F" className="sans">
          <tspan x="228" y="104">{CONTACT.support}</tspan>
          <tspan x="228" y="115">{CONTACT.partnerships}</tspan>
          <tspan x="410" y="104">{CONTACT.city}</tspan>
          <tspan x="410" y="115">{CONTACT.phone}</tspan>
          <tspan x="410" y="126">{CONTACT.info}</tspan>
        </text>
      </g>
      <g className="fade-in" style={{ '--i': 4 }}>
        <FloorPlanG x={112} y={166} w={400} h={400} stroke="#35241C" seed={5} />
      </g>
      <g stroke="#1E140F" strokeWidth="5" fill="none">
        {[250, 560].map((y) => (
          <g key={y}>
            <ellipse cx="74" cy={y} rx="26" ry="14" />
            <circle cx="74" cy={y} r="5" fill="#1E140F" />
          </g>
        ))}
      </g>
      <MarkG x={98} y={620} size={26} fill="#B58F6B" />
      <text fontSize="7.5" fill="#1E140F" className="sans">
        {lines.map((l, i) => (
          <tspan key={i} x="196" y={622 + i * 11}>{l}</tspan>
        ))}
      </text>
    </Art>
  );
}

export function ContactsArt() {
  const blocks = [CONTACT_BLOCKS.office, CONTACT_BLOCKS.service, CONTACT_BLOCKS.online];
  return (
    <Art viewBox="0 0 600 640" title="Contacts card" exportName="lp-home-contacts">
      <rect width="600" height="640" fill="#35241C" />
      <MarkG x={48} y={52} size={46} fill="#B58F6B" topClass="mark-top" bottomClass="mark-bottom" />
      <text className="serif" fontSize="40" fill="#F5F0E3" letterSpacing="-0.7">
        {LINES.imagination.rows.map((r, i) => (
          <tspan key={r} x="48" y={248 + i * 46} className="slide-up" style={{ '--i': i }}>{r}</tspan>
        ))}
      </text>
      <path d="M48 372H552" stroke="#F5F0E3" strokeOpacity="0.25" className="draw" style={{ '--len': 504 }} />
      <text fontSize="14" fill="#F5F0E3" className="sans">
        {blocks.map((b, i) =>
          b.map((l, j) => (
            <tspan key={l} x={48 + i * 172} y={410 + j * 20}>{l}</tspan>
          )),
        )}
      </text>
      <text x="48" y="560" fontSize="18" fill="#B58F6B" className="sans">{URL_LINE}</text>
      <WordmarkG x={352} y={538} width={200} fill="#B58F6B" />
    </Art>
  );
}
