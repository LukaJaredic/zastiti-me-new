import type {Messages} from '@/app/[locale]/dictionaries';

/**
 * Header and footer link config. Paths are locale-relative and keep the live
 * site's Montenegrin slugs (ARCHITECTURE.md, invariant 5).
 */

type Header = Messages['components']['header'];
type Footer = Messages['components']['footer'];

export type Audience = 'parents' | 'kids' | 'sos';

/** Which door a path is in, or null for shared pages. */
export function audienceOf(pathname: string): Audience | null {
  const path = pathname.replace(/^\/(me|en)(?=\/|$)/, '');
  if (path === '/sos' || path.startsWith('/sos/')) return 'sos';
  if (path === '/roditelji' || path.startsWith('/roditelji/')) return 'parents';
  if (path === '/djeca' || path.startsWith('/djeca/')) return 'kids';
  return null;
}

export type NavLink = {label: string; path: string};

/** The five words in the middle of the desktop bar: the two doors first. */
export function primaryLinks(m: Messages): NavLink[] {
  const menu = m.components.header.menu;
  return [
    {label: m.rest.parents, path: '/roditelji'},
    {label: m.rest.kids, path: '/djeca'},
    {label: menu.activities, path: '/aktivnosti'},
    {label: menu.library, path: '/biblioteka'},
    {label: menu.about, path: '/o-nama'},
  ];
}

/** Every page, for the mobile menu. */
export function allLinks(m: Messages): NavLink[] {
  const menu: Header['menu'] = m.components.header.menu;
  return [
    {label: menu.home, path: ''},
    ...primaryLinks(m),
    {label: menu.digitalAbuse, path: '/digitalno-nasilje'},
    {label: menu.team, path: '/tim-i-partneri'},
    {label: menu.contact, path: '/kontakt'},
    {label: menu.rest, path: '/ostalo'},
  ];
}

export const sosPath = '/sos';

export function footerLinks(f: Footer): NavLink[] {
  return [
    {label: f.quickLinks.about, path: '/o-nama'},
    {label: f.quickLinks.digitalAbuse, path: '/digitalno-nasilje'},
    {label: f.quickLinks.activities, path: '/aktivnosti'},
    {label: f.quickLinks.library, path: '/biblioteka'},
    {label: f.quickLinks.contact, path: '/kontakt'},
  ];
}

export function legalLinks(f: Footer): NavLink[] {
  return [
    {label: f.legalLinks.terms, path: '/uslovi-koristenja'},
    {label: f.legalLinks.privacy, path: '/politika-privatnosti'},
    {label: f.legalLinks.accessibility, path: '/pristupacnost'},
  ];
}
