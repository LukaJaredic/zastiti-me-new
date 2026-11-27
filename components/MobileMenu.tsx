'use client';

import {useEffectEvent, useLayoutEffect, useRef} from 'react';
import {TranslateIcon, WarningCircleIcon} from '@phosphor-icons/react';
import {Dialog} from '@astryxdesign/core/Dialog';
import {Section} from '@astryxdesign/core/Section';
import {VStack, HStack} from '@astryxdesign/core/Layout';
import {Divider} from '@astryxdesign/core/Divider';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {Button} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import {Logo} from './Logo';
import {ThemeToggle} from './ThemeToggle';
import {underlineSeed} from './siteNav';

export type MobileMenuContent = {
  siteName: string;
  navLabel: string;
  closeLabel: string;
  sosLabel: string;
  languageLabel: string;
  themeDarkLabel: string;
  themeLightLabel: string;
};

/**
 * The menu on phones and tablets (design system, MobileMenu): a full-width
 * sheet of cream paper that unfolds down from the header, with a torn bottom
 * edge. Its first row repeats the header in place (logo, SOS, and the menu
 * button turned into a close button), then a fold, the six main links,
 * another fold, and the language and theme switches as icons.
 *
 * It's a modal Dialog: focus moves in, Escape or a tap on the dimmed page
 * closes it, and focus returns to the menu button. Every link closes it
 * before navigating.
 *
 * With cacheComponents, Next keeps the page you left mounted but hidden (a
 * React Activity). A menu left open there would stay a modal dialog, unseen,
 * and block every click on the new page. So whenever the menu is hidden or
 * unmounted it closes its native dialog itself.
 */
export function MobileMenu({
  id,
  isOpen,
  onClose,
  home,
  sosHref,
  languageHref,
  links,
  content,
}: {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  home: string;
  sosHref: string;
  languageHref: string;
  links: {label: string; href: string; isCurrent: boolean}[];
  content: MobileMenuContent;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = useEffectEvent(onClose);
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      dialog?.close();
      close();
    };
  }, []);

  return (
    <Dialog
      ref={dialogRef}
      id={id}
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
      aria-label={content.navLabel}
      variant="menu-sheet"
      width="100%"
      maxHeight="calc(100dvh - var(--spacing-16))"
      position={{top: 0, start: 0, end: 0}}
      padding={0}
    >
      <Section variant="menu-sheet" padding={0} paddingBlockEnd={8}>
        {/* The header row, in the same place as the header's. */}
        <HStack
          minHeight="72px"
          paddingInline={6}
          hAlign="between"
          vAlign="center"
        >
          <Logo name={content.siteName} href={home} onClick={onClose} />
          <HStack gap={2} vAlign="center">
            <Button
              label={content.sosLabel}
              variant="sos"
              size="lg"
              href={sosHref}
              icon={<Icon icon={WarningCircleIcon} />}
              onClick={onClose}
            />
            <Button
              label={content.closeLabel}
              variant="ghost"
              size="lg"
              isIconOnly
              icon={<Icon icon="close" />}
              onClick={onClose}
            />
          </HStack>
        </HStack>
        <Divider variant="fold" />
        <VStack
          as="nav"
          aria-label={content.navLabel}
          gap={0.5}
          paddingInline={4}
          paddingBlock={3}
        >
          {links.map((l, i) => (
            <SideNavItem
              key={l.href}
              label={l.label}
              href={l.href}
              isSelected={l.isCurrent}
              size="lg"
              onClick={onClose}
              data-underline-seed={underlineSeed(i)}
            />
          ))}
        </VStack>
        <Divider variant="fold" />
        <HStack gap={10} hAlign="center" paddingBlockStart={3}>
          <Button
            label={content.languageLabel}
            variant="menu-setting"
            isIconOnly
            href={languageHref}
            icon={<Icon icon={TranslateIcon} />}
            onClick={onClose}
          />
          <ThemeToggle
            darkLabel={content.themeDarkLabel}
            lightLabel={content.themeLightLabel}
            variant="menu-setting"
          />
        </HStack>
      </Section>
    </Dialog>
  );
}
