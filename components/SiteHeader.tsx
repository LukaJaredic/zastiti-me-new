'use client';

import {usePathname} from 'next/navigation';
import {TranslateIcon, WarningCircleIcon} from '@phosphor-icons/react';
import {useAppShellMobile} from '@astryxdesign/core/AppShell';
import {TopNav, TopNavItem} from '@astryxdesign/core/TopNav';
import {HStack} from '@astryxdesign/core/HStack';
import {Button} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import {locales, type Locale} from '@/lib/i18n';
import {Logo} from './Logo';
import {ThemeToggle} from './ThemeToggle';
import {sosPath, type NavLink} from './siteNav';

export type HeaderContent = {
  siteName: string;
  navLabel: string;
  sosLabel: string;
  languageLabel: string;
  themeDarkLabel: string;
  themeLightLabel: string;
  primary: NavLink[];
  all: NavLink[];
};

/**
 * The site header: the logo and five plain words on the left, read as one
 * line; on the right only buttons, the language and theme switches as one
 * pair and, set apart on the far right, the one SOS button. Below
 * the md breakpoint AppShell keeps the logo, SOS and the menu toggle; the
 * drawer lists every page, the language and SOS.
 */
export function SiteHeader({
  locale,
  content,
}: {
  locale: Locale;
  content: HeaderContent;
}) {
  const pathname = usePathname();
  const {isMobile, isMobileNavOpen, mobileNavId, toggleMobileNav} =
    useAppShellMobile();
  const home = `/${locale}`;

  const isCurrent = (href: string) =>
    href === home
      ? pathname === home
      : pathname === href || pathname.startsWith(`${href}/`);

  const items = (links: NavLink[]) =>
    links.map(({label, path}) => {
      const href = `${home}${path}`;
      return (
        <TopNavItem
          key={path || 'home'}
          label={label}
          href={href}
          isSelected={isCurrent(href)}
        />
      );
    });

  // One quiet link to the same page in the other language.
  const other = locales.find((l) => l !== locale) ?? locale;
  // The bar shows the icon alone as a 44px square button like the theme
  // switch, named "Odaberi jezik"; the mobile menu keeps the code beside it so
  // the row reads like the others.
  const languageHref = pathname.replace(/^\/(me|en)(?=\/|$)/, `/${other}`);
  const language = isMobile ? (
    <TopNavItem
      label={other.toUpperCase()}
      href={languageHref}
      icon={<Icon icon={TranslateIcon} />}
    />
  ) : (
    <Button
      label={content.languageLabel}
      variant="ghost"
      size="lg"
      isIconOnly
      href={languageHref}
      icon={<Icon icon={TranslateIcon} />}
    />
  );

  const themeToggle = (
    <ThemeToggle
      darkLabel={content.themeDarkLabel}
      lightLabel={content.themeLightLabel}
      showLabel={isMobile}
    />
  );

  const sos = (
    <Button
      label={content.sosLabel}
      variant="sos"
      size="lg"
      href={`${home}${sosPath}`}
      icon={<Icon icon={WarningCircleIcon} />}
    />
  );

  return (
    <TopNav
      label={content.navLabel}
      heading={<Logo name={content.siteName} href={home} />}
      startContent={
        isMobile ? (
          <>
            {items(content.all)}
            {language}
            {themeToggle}
            {sos}
          </>
        ) : (
          // Centred in the room between the logo and the buttons, not in
          // the bar (TopNav's centerContent), so the words never crowd the
          // buttons at 1024px. The stretch comes from app/globals.css.
          <HStack hAlign="center" vAlign="center" data-site-nav-links="">
            {items(content.primary)}
          </HStack>
        )
      }
      endContent={
        isMobile ? (
          <HStack gap={2} vAlign="center">
            {sos}
            <Button
              label={content.navLabel}
              variant="ghost"
              size="lg"
              isIconOnly
              icon={<Icon icon="menu" />}
              onClick={toggleMobileNav}
              aria-expanded={isMobileNavOpen}
              aria-controls={mobileNavId || undefined}
            />
          </HStack>
        ) : (
          // The two settings sit together as a pair (4px apart), set 24px
          // back from SOS so they never read as part of it. SOS keeps the
          // column's right edge: the same place on every page and at every
          // width, beside the menu on phones. The centred nav words re-centre
          // in the room left, so this gap doesn't crowd them at 1024px.
          <HStack gap={6} vAlign="center">
            <HStack gap={1} vAlign="center">
              {language}
              {themeToggle}
            </HStack>
            {sos}
          </HStack>
        )
      }
    />
  );
}
