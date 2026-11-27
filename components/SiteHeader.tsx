'use client';

import {useState} from 'react';
import {usePathname} from 'next/navigation';
import {TranslateIcon, WarningCircleIcon} from '@phosphor-icons/react';
import {useAppShellMobile} from '@astryxdesign/core/AppShell';
import {TopNav, TopNavItem} from '@astryxdesign/core/TopNav';
import {HStack} from '@astryxdesign/core/HStack';
import {Button} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import {locales, type Locale} from '@/lib/i18n';
import {Logo} from './Logo';
import {MobileMenu} from './MobileMenu';
import {ThemeToggle} from './ThemeToggle';
import {sosPath, type NavLink} from './siteNav';

export type HeaderContent = {
  siteName: string;
  navLabel: string;
  closeMenuLabel: string;
  sosLabel: string;
  languageLabel: string;
  themeDarkLabel: string;
  themeLightLabel: string;
  primary: NavLink[];
  menu: NavLink[];
};

const menuId = 'site-menu';

/**
 * The site header: the logo and five plain words on the left, read as one
 * line; on the right only buttons, the language and theme switches as one
 * pair and, set apart on the far right, the one SOS button. Below lg (the
 * AppShell mobile breakpoint) the bar keeps the logo, SOS and the menu
 * button, which opens MobileMenu, the paper sheet. AppShell's own drawer
 * gets no content, so it stays off.
 */
export function SiteHeader({
  locale,
  content,
}: {
  locale: Locale;
  content: HeaderContent;
}) {
  const pathname = usePathname();
  const {isMobile} = useAppShellMobile();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const home = `/${locale}`;

  // Close the menu when the page changes. Past lg it isn't rendered at all.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenuOpen(false);
  }

  const isCurrent = (href: string) =>
    href === home
      ? pathname === home
      : pathname === href || pathname.startsWith(`${href}/`);

  // The same page in the other language.
  const other = locales.find((l) => l !== locale) ?? locale;
  const languageHref = pathname.replace(/^\/(me|en)(?=\/|$)/, `/${other}`);
  const sosHref = `${home}${sosPath}`;

  const sos = (
    <Button
      label={content.sosLabel}
      variant="sos"
      size="lg"
      href={sosHref}
      icon={<Icon icon={WarningCircleIcon} />}
    />
  );

  if (isMobile) {
    return (
      <>
        <TopNav
          label={content.navLabel}
          heading={<Logo name={content.siteName} href={home} />}
          endContent={
            <HStack gap={2} vAlign="center">
              {sos}
              <Button
                label={content.navLabel}
                variant="ghost"
                size="lg"
                isIconOnly
                icon={<Icon icon="menu" />}
                onClick={() => setMenuOpen(true)}
                aria-expanded={isMenuOpen}
                aria-controls={menuId}
              />
            </HStack>
          }
        />
        <MobileMenu
          id={menuId}
          isOpen={isMenuOpen}
          onClose={() => setMenuOpen(false)}
          home={home}
          sosHref={sosHref}
          languageHref={languageHref}
          links={content.menu.map(({label, path}) => {
            const href = `${home}${path}`;
            return {label, href, isCurrent: isCurrent(href)};
          })}
          content={{
            siteName: content.siteName,
            navLabel: content.navLabel,
            closeLabel: content.closeMenuLabel,
            sosLabel: content.sosLabel,
            languageLabel: content.languageLabel,
            themeDarkLabel: content.themeDarkLabel,
            themeLightLabel: content.themeLightLabel,
          }}
        />
      </>
    );
  }

  return (
    <TopNav
      label={content.navLabel}
      heading={<Logo name={content.siteName} href={home} />}
      startContent={
        // Centred in the room between the logo and the buttons, not in the
        // bar (TopNav's centerContent), so the words never crowd the buttons
        // at 1024px. The stretch comes from app/globals.css.
        <HStack hAlign="center" vAlign="center" data-site-nav-links="">
          {content.primary.map(({label, path}) => {
            const href = `${home}${path}`;
            return (
              <TopNavItem
                key={path}
                label={label}
                href={href}
                isSelected={isCurrent(href)}
              />
            );
          })}
        </HStack>
      }
      endContent={
        // The two settings sit together as a pair (4px apart), set 24px back
        // from SOS so they never read as part of it. SOS keeps the column's
        // right edge: the same place on every page and at every width,
        // beside the menu on phones. The centred nav words re-centre in the
        // room left, so this gap doesn't crowd them at 1024px.
        <HStack gap={6} vAlign="center">
          <HStack gap={1} vAlign="center">
            <Button
              label={content.languageLabel}
              variant="ghost"
              size="lg"
              isIconOnly
              href={languageHref}
              icon={<Icon icon={TranslateIcon} />}
            />
            <ThemeToggle
              darkLabel={content.themeDarkLabel}
              lightLabel={content.themeLightLabel}
            />
          </HStack>
          {sos}
        </HStack>
      }
    />
  );
}
