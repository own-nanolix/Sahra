// Exportable artwork for the last story steps: the plan sheet in its tray (m13, drawn without the illegible room
// labels) and the contacts card (the three printed blocks, set as on the posters).
import Art from '@/components/art/Art';
import { FloorPlanG, wrap } from '@/components/art/Devices';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { PLAN, SENDER, CONTACT, CONTACT_BLOCKS, LINES, URL_LINE } from '@/lib/brand';

export function PlanSheetArt() {
  // m13: the sheet is A4 (474 x 670); header at 5.5 % of its height with the contacts at 37.6 % and 76.7 % of its
  // width; the plan between 14 % and 84 %; the Sand mark and the plan text (from 37.6 %) at 91 %; rings at 32 / 68 %.
  const lines = wrap(PLAN.text, 98);
  return (
    <Art viewBox="0 0 620 810" title="Plan sheet in the presentation box" exportName="lp-home-plan-drawing">
      <rect width="620" height="810" fill="#875D41" />
      <rect x="34" y="34" width="552" height="742" fill="#1E140F" />
      <rect x="34" y="34" width="552" height="742" fill="none" stroke="#35241C" strokeWidth="6" />
      <rect x="74" y="70" width="474" height="670" fill="#FFFFFF" />
      <g className="fade-in">
        <text x="103" y="107" fontSize="7.6" fill="#875D41" className="sans">{SENDER.developement}</text>
        <text fontSize="7.6" fill="#1E140F" className="sans">
          <tspan x="252" y="107">{CONTACT.support}</tspan>
          <tspan x="252" y="117.5">{CONTACT.partnerships}</tspan>
          <tspan x="437" y="107">{CONTACT.city}</tspan>
          <tspan x="437" y="117.5">{CONTACT.phone}</tspan>
          <tspan x="437" y="128">{CONTACT.info}</tspan>
        </text>
      </g>
      <g className="fade-in" style={{ '--i': 4 }}>
        <FloorPlanG x={112} y={180} w={400} h={420} stroke="#35241C" seed={5} />
      </g>
      <g stroke="#1E140F" strokeWidth="5" fill="none">
        {[284, 526].map((y) => (
          <g key={y}>
            <ellipse cx="74" cy={y} rx="26" ry="14" />
            <circle cx="74" cy={y} r="5" fill="#1E140F" />
          </g>
        ))}
      </g>
      <MarkG x={103} y={677} size={31} fill="#B58F6B" />
      <text fontSize="5.6" fill="#1E140F" className="sans">
        {lines.map((l, i) => (
          <tspan key={i} x="252" y={683 + i * 8.8}>{l}</tspan>
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
