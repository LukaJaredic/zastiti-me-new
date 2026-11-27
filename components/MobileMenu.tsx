'use client';

import {useLayoutEffect, useRef, useState} from 'react';
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
import {menuState} from './menuState';
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
 * It's a modal Dialog: Escape or a tap on the dimmed page closes it, and
 * focus returns to the menu button. Every link closes it before navigating.
 * On open, focus goes to the sheet itself (data-autofocus), not to its
 * first link: otherwise the browser focuses the logo.
 *
 * Dialog closes instantly, with no exit motion of its own. So every close
 * first marks the sheet closing (data-closing): it slides back up and the
 * dimmed page clears (app/globals.css), and only then is the dialog told to
 * close. With reduced motion it closes at once.
 *
 * Switching language keeps the menu open, like switching theme: the other
 * language's menu opens in place (`opensInPlace`, no slide; menuState.carryTo).
 *
 * With cacheComponents, Next keeps the page you left mounted but hidden (a
 * React Activity). A menu left open there would stay a modal dialog, unseen,
 * and block every click on the new page. So whenever the menu is hidden or
 * unmounted it closes its own native dialog.
 */
export function MobileMenu({
  id,
  isOpen,
  opensInPlace = false,
  onClose,
  home,
  sosHref,
  languageHref,
  links,
  content,
}: {
  id: string;
  isOpen: boolean;
  /** Open without sliding in: the menu was open before a language switch. */
  opensInPlace?: boolean;
  onClose: () => void;
  home: string;
  sosHref: string;
  languageHref: string;
  links: {label: string; href: string; isCurrent: boolean}[];
  content: MobileMenuContent;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const [isClosing, setClosing] = useState(false);

  // A fresh open never starts mid-close.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);
    if (isOpen) setClosing(false);
  }

  const requestClose = () => {
    if (isClosing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose();
      return;
    }
    setClosing(true);
    // Matches the 200ms slide-up in app/globals.css.
    closeTimer.current = window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  };

  // Hidden or unmounted: close this page's native dialog so it can't block
  // the page now showing. The open state itself is shared (menuState) and
  // may be carrying over to the other language, so it stays as it is.
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      window.clearTimeout(closeTimer.current);
      dialog?.close();
    };
  }, []);

  return (
    <Dialog
      ref={dialogRef}
      id={id}
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) requestClose();
      }}
      data-closing={isClosing ? '' : undefined}
      data-in-place={opensInPlace ? '' : undefined}
      aria-label={content.navLabel}
      variant="menu-sheet"
      width="100%"
      maxHeight="calc(100dvh - var(--spacing-16))"
      position={{top: 0, start: 0, end: 0}}
      padding={0}
    >
      <Section
        variant="menu-sheet"
        padding={0}
        paddingBlockEnd={8}
        tabIndex={-1}
        data-autofocus=""
      >
        {/* The header row, in the same place as the header's. */}
        <HStack
          minHeight="72px"
          paddingInline={6}
          hAlign="between"
          vAlign="center"
        >
          <Logo name={content.siteName} href={home} onClick={requestClose} />
          <HStack gap={2} vAlign="center">
            <Button
              label={content.sosLabel}
              variant="sos"
              size="lg"
              href={sosHref}
              icon={<Icon icon={WarningCircleIcon} />}
              onClick={requestClose}
            />
            <Button
              label={content.closeLabel}
              variant="ghost"
              size="lg"
              isIconOnly
              icon={<Icon icon="close" />}
              onClick={requestClose}
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
              onClick={requestClose}
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
            onClick={() => menuState.carryTo(languageHref)}
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
