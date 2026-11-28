import type {Messages} from '@/app/[locale]/dictionaries';
import {locales, type Locale} from '@/lib/i18n';
import {hasGlossary} from '@/content/glossary';

/**
 * Header and footer link config. Paths are locale-relative and keep the live
 * site's Montenegrin slugs (ARCHITECTURE.md, invariant 5).
 */

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

/**
 * The four words in the middle of the desktop bar. The two doors (parents,
 * kids) are the home page itself, so the bar doesn't repeat them.
 */
export function primaryLinks(m: Messages): NavLink[] {
  const menu = m.components.header.menu;
  return [
    {label: menu.app, path: '/aplikacija'},
    {label: menu.activities, path: '/aktivnosti'},
    {label: menu.library, path: '/biblioteka'},
    {label: menu.about, path: '/o-nama'},
  ];
}

/**
 * The mobile menu: home and the same four words as the desktop bar. The
 * other pages are linked from the footer (design system, MobileMenu).
 */
export function menuLinks(m: Messages): NavLink[] {
  return [{label: m.components.header.menu.home, path: ''}, ...primaryLinks(m)];
}

/**
 * Whether a link points at the page you're on, for every nav list (header,
 * mobile menu, footer). A locale's home page matches only itself; any other
 * link matches its page and everything under it, so a book's page still
 * marks "Biblioteka".
 */
export function isCurrentPath(pathname: string, href: string): boolean {
  const isHome = locales.some((l) => href === `/${l}`);
  return isHome
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

/** How many hand-drawn underline shapes the theme has (--paper-pen-line-N). */
const underlineShapes = 4;

/**
 * The hand-drawn underline a link in a list draws (data-underline-seed, 1 to
 * 4): handed out in turn down the list, so every shape is used equally and
 * no two neighbours share one.
 */
export function underlineSeed(index: number): string {
  return String((index % underlineShapes) + 1);
}

export const sosPath = '/sos';

export const glossaryPath = '/sta-znaci';

/** The glossary's link only where the glossary has its page. */
export function footerLinks(f: Footer, locale: Locale): NavLink[] {
  return [
    {label: f.quickLinks.app, path: '/aplikacija'},
    {label: f.quickLinks.about, path: '/o-nama'},
    {label: f.quickLinks.digitalAbuse, path: '/digitalno-nasilje'},
    {label: f.quickLinks.activities, path: '/aktivnosti'},
    {label: f.quickLinks.library, path: '/biblioteka'},
    ...(hasGlossary(locale) ? [{label: f.quickLinks.glossary, path: glossaryPath}] : []),
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
