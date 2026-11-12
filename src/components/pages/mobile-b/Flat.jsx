import Art from '@/components/art/Art';
import { WordmarkG, MarkG, MarkTileG } from '@/components/art/Mark';
import { quarterArch } from '@/components/art/KeyArt';
import { IconUse } from '@/components/site/Icon';
import { range } from '@/lib/site';
import { r2 } from '@/lib/charts';
import { ABOUT, CONTACT_BLOCKS, LINES, NAV_LINKS, PEOPLE, PROFILE } from '@/lib/brand';
import { TABS, PC, PC_ARCH, PC_BIO } from './data';
import s from './mobile-b.module.css';

// Flat, exportable artwork of the screens and of two components. Every screen is a 390 x 844 artboard.
const H = { choc: '#35241C', tribal: '#875D41', sand: '#B58F6B', beige: '#F5F0E3', white: '#FFFFFF', ink: '#1E140F', muted: '#5C4A3E', bm: '#CDBBA6' };

function Status({ fill }) {
  return (
    <g fill={fill} opacity="0.7">
      <rect x="34" y="26" width="30" height="9" rx="4.5" />
      <circle cx="318" cy="30.5" r="5" />
      <rect x="330" y="26" width="14" height="9" rx="4.5" />
      <rect x="348" y="25" width="22" height="11" rx="3.5" />
    </g>
  );
}
// Placeholder bar
const Bar = ({ x, y, w, fill }) => <rect x={x} y={y} width={w} height="9" rx="2" fill={fill} opacity="0.16" />;

function Tabs({ y, current, fill, on, h = 88, pressed }) {
  return (
    <g>
      <rect x="0" y={y} width="390" height={h} fill="none" />
      <rect x="0" y={y} width="390" height="1" fill={fill} opacity="0.4" />
      {TABS.map((t, i) => {
        const cx = 39 + i * 78;
        const c = t.to === current ? on : fill;
        return (
          <g key={t.to} color={c}>
            {t.to === pressed && <rect x={cx - 34} y={y + 6} width="68" height="52" rx="10" fill={fill} opacity="0.1" />}
            <IconUse name={t.icon} x={cx - 11} y={y + 14} size={22} fill={c} />
            <text className="sans" x={cx} y={y + 54} fontSize="11" textAnchor="middle" fill={c}>{t.label}</text>
          </g>
        );
      })}
    </g>
  );
}

const Ground = ({ fill }) => <rect width="390" height="844" fill={fill} />;

export function FlatSignIn() {
  return (
    <Art viewBox="0 0 390 844" title="Screen 10, Sign in" exportName="mobile-b-screen-sign-in">
      <Ground fill={H.choc} />
      <path d={quarterArch(390, 0, 72, 170, 'bl')} fill={H.tribal} opacity="0.55" />
      <Status fill={H.beige} />
      <WordmarkG x={28} y={98} width={150} fill={H.sand} />
      {LINES.imagination.rows.map((l, i) => <text key={l} className="serif" x="28" y={216 + i * 40} fontSize="34" fill={H.beige}>{l}</text>)}
      {['Email', 'Password'].map((l, i) => (
        <g key={l}>
          <text className="sans" x="28" y={354 + i * 84} fontSize="13" fill={H.bm}>{l}</text>
          <rect x="28" y={364 + i * 84} width="334" height="48" rx="8" fill={H.white} />
        </g>
      ))}
      <rect x="28" y="548" width="334" height="54" rx="10" fill={H.tribal} />
      <text className="sans" x="195" y="581" fontSize="17" textAnchor="middle" fill={H.beige}>Sign in</text>
      <text className="sans" x="28" y="780" fontSize="14" fill={H.sand}>→ sahra.sa</text>
    </Art>
  );
}

export function FlatSheet() {
  return (
    <Art viewBox="0 0 390 844" title="Screen 11, Section switcher" exportName="mobile-b-screen-sections">
      <Ground fill={H.beige} />
      <Status fill={H.choc} />
      <text className="sans" x="28" y="100" fontSize="12" fill={H.muted}>{ABOUT.label}</text>
      <text className="serif" x="28" y="146" fontSize="34" fill={H.choc}>{NAV_LINKS[0].label}</text>
      {[200, 140, 180, 120].map((w, i) => <Bar key={i} x={28} y={196 + i * 28} w={w} fill={H.choc} />)}
      <rect width="390" height="844" fill={H.choc} opacity="0.4" />
      <rect x="0" y="404" width="390" height="440" rx="28" fill={H.beige} />
      <rect x="165" y="418" width="60" height="5" rx="2.5" fill={H.choc} opacity="0.35" />
      <text className="sans" x="28" y="462" fontSize="12" fill={H.muted}>Sections</text>
      {NAV_LINKS.map((l, i) => (
        <g key={l.id}>
          <rect x="28" y={478 + i * 78} width="334" height="1" fill={H.choc} opacity="0.42" />
          <text className="sans" x="30" y={522 + i * 78} fontSize="13" fill={H.muted}>{ABOUT.rows.find((r) => r.label === l.label)?.no}</text>
          <text className="serif" x="76" y={524 + i * 78} fontSize="22" fill={H.choc}>{l.label}</text>
          {i === 0 && <IconUse name="check" x={338} y={506} size={22} fill={H.tribal} />}
        </g>
      ))}
    </Art>
  );
}

export function FlatFiles() {
  return (
    <Art viewBox="0 0 390 844" title="Screen 16, Files" exportName="mobile-b-screen-files">
      <Ground fill={H.beige} />
      <Status fill={H.choc} />
      <text className="serif" x="28" y="120" fontSize="32" fill={H.choc}>Files</text>
      {range(4).map((i) => (
        <g key={i}>
          <rect x="28" y={170 + i * 74} width="334" height="1" fill={H.choc} opacity="0.42" />
          <IconUse name={i === 0 ? 'plan' : 'document'} x={30} y={198 + i * 74} size={22} fill={H.choc} />
          {i === 0 ? <text className="serif" x="72" y={216} fontSize="22" fill={H.choc}>Plan sheet</text> : <Bar x={72} y={209 + i * 74} w={110} fill={H.choc} />}
          {i === 0 && <IconUse name="check" x={338} y={198} size={22} fill={H.tribal} />}
        </g>
      ))}
      <rect x="28" y="478" width="334" height="1" fill={H.choc} opacity="0.42" />
      <rect x="28" y="510" width="334" height="48" rx="8" fill={H.tribal} />
      <IconUse name="download" x={142} y={523} size={22} fill={H.beige} />
      <text className="sans" x="176" y="540" fontSize="16" fill={H.beige}>Download</text>
      <Tabs y={756} current={16} fill={H.choc} on={H.tribal} />
    </Art>
  );
}

// The profile card of m12, rebuilt: no platform tick, no logo.
// The profile card of m12 at its measured proportions (334 x 267): no platform tick, no logo.
export function FlatProfileCard() {
  const idp = 'mobile-b-pc';
  return (
    <Art viewBox={`0 0 ${PC.w} ${PC.h}`} title="Profile card" exportName="mobile-b-profile-card">
      <defs>
        <clipPath id={`${idp}-clip`}><rect width={PC.w} height={PC.h} rx={PC.r} /></clipPath>
        <clipPath id={`${idp}-head`}><rect width={PC.w} height={PC.head} /></clipPath>
        <linearGradient id={`${idp}-hd`} x1="0" x2={PC.w} y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={H.choc} />
          <stop offset="1" stopColor={H.tribal} />
        </linearGradient>
        <linearGradient id={`${idp}-ar`} x1="40" x2="320" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={H.choc} stopOpacity="0" />
          <stop offset="0.6" stopColor={H.choc} stopOpacity="0.45" />
          <stop offset="1" stopColor={H.choc} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${idp}-clip)`}>
        <rect width={PC.w} height={PC.h} fill={H.white} />
        <rect width={PC.w} height={PC.head} fill={`url(#${idp}-hd)`} />
        <g clipPath={`url(#${idp}-head)`}>
          <path d={PC_ARCH} fill={H.tribal} />
          <path d={PC_ARCH} fill={`url(#${idp}-ar)`} />
        </g>
        {PROFILE.header.rows.map((l, i) => <text key={l} className="serif" x="152.8" y={r2(52.6 + i * 20.1)} fontSize="19.2" fill={H.beige}>{l}</text>)}
      </g>
      <MarkTileG x={30.9} y={84.2} size={67.1} radius={15.6} tile={H.beige} fill={H.tribal} />
      <rect x="196.8" y="125.3" width="105.1" height="29.8" rx="4.5" fill="#000000" />
      <text className="sans" x="249.4" y="144.6" fontSize="13" textAnchor="middle" fill="#FFFFFF">{PROFILE.action}</text>
      <text className="sans" x="28.3" y="182.7" fontSize="16.5" fill={H.ink}>{PROFILE.name}</text>
      <text className="sans" x="28.3" y="199.4" fontSize="13" fill={H.muted}>{PROFILE.handle}</text>
      {PC_BIO.map((l, i) => <text key={l} className="sans" x="28.3" y={r2(218 + i * 12.1)} fontSize="7.3" fill={H.ink}>{l}</text>)}
    </Art>
  );
}

// Screen 18: the business card of m08, landscape, as the live screen draws it.
export function FlatProfile() {
  const block = (lines, x, y) => lines.map((l, j) => <text key={l} className="sans" x={x} y={y + j * 9} fontSize="7.5" fill={H.ink}>{l}</text>);
  return (
    <Art viewBox="0 0 390 844" title="Screen 18, Profile" exportName="mobile-b-screen-profile">
      <Ground fill={H.beige} />
      <Status fill={H.choc} />
      <text className="sans" x="92" y="98" fontSize="12" fill={H.muted}>Sahra Brand</text>
      <text className="serif" x="92" y="130" fontSize="32" fill={H.choc}>Profile</text>
      <g transform="translate(28 162)">
        <rect x="6" y="7" width="334" height="216" fill="#000000" opacity="0.25" />
        <rect width="334" height="216" fill={H.white} />
        <MarkG x={288} y={22} size={22} fill={H.sand} />
        <text className="serif" x="22" y="46" fontSize="19" fill={H.ink}>{PEOPLE.card.name}</text>
        <text className="sans" x="22" y="61" fontSize="9" fill={H.muted}>{PEOPLE.card.role}</text>
        {block(CONTACT_BLOCKS.office, 22, 139)}
        {block(CONTACT_BLOCKS.online, 22, 173)}
        {block(CONTACT_BLOCKS.service, 226, 173)}
      </g>
      <text className="sans" x="28" y="440" fontSize="13" fill={H.tribal}>→ sahra.sa</text>
      <Tabs y={756} current={18} fill={H.choc} on={H.tribal} />
    </Art>
  );
}

// Components as artwork
export function FlatStatusBar() {
  return (
    <Art viewBox="0 0 390 160" title="Status bar, Beige and Dark" exportName="mobile-b-status-bar">
      <rect width="390" height="80" fill={H.beige} />
      <rect y="80" width="390" height="80" fill={H.choc} />
      <Status fill={H.choc} />
      <g transform="translate(0 80)"><Status fill={H.beige} /></g>
    </Art>
  );
}

export function FlatTabBar() {
  return (
    <Art viewBox="0 0 390 300" title="Tab bar: default, current and pressed" exportName="mobile-b-tab-bar">
      <rect width="390" height="300" fill={H.beige} />
      <Tabs y={6} current={0} fill={H.choc} on={H.tribal} />
      <Tabs y={104} current={12} fill={H.choc} on={H.tribal} />
      <Tabs y={202} current={13} pressed={16} fill={H.choc} on={H.tribal} />
    </Art>
  );
}

export function FlatShelf() {
  return (
    <div className={s.flatGrid}>
      {[
        [FlatSignIn, 'Sign in'], [FlatSheet, 'Section switcher'], [FlatFiles, 'Files'], [FlatProfile, 'Profile'],
      ].map(([C, cap]) => (
        <figure key={cap} className={s.flatFig}><C /><figcaption className="t-label">{cap}</figcaption></figure>
      ))}
      <figure className={`${s.flatFig} ${s.flatWide}`}><FlatProfileCard /><figcaption className="t-label">Profile card</figcaption></figure>
      <figure className={`${s.flatFig} ${s.flatWide}`}><FlatStatusBar /><FlatTabBar /><figcaption className="t-label">Status bar and tab bar</figcaption></figure>
    </div>
  );
}

