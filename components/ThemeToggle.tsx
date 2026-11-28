'use client';

import {MoonIcon, SunIcon} from '@phosphor-icons/react';
import {Button, type ButtonVariant} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import {useColorMode} from './ColorMode';

/**
 * Light/dark switch. Shows the mode it switches to: a moon on a light page,
 * a sun on a dark one. The label says the action, so state is never shown by
 * the icon alone.
 *
 * Both buttons are rendered and app/globals.css shows the right one
 * (data-theme-toggle), from the saved pick on <html> or the OS setting. The
 * server can't know either, so choosing in React flipped the icon on load.
 */
export function ThemeToggle({
  darkLabel,
  lightLabel,
  variant = 'ghost',
}: {
  darkLabel: string;
  lightLabel: string;
  /** The button's look: `ghost` in the header bar, `menu-setting` in the
   * mobile menu. */
  variant?: ButtonVariant;
}) {
  const {setMode} = useColorMode();
  return (
    <>
      <Button
        data-theme-toggle="dark"
        label={darkLabel}
        variant={variant}
        size="lg"
        isIconOnly
        icon={<Icon icon={MoonIcon} />}
        onClick={() => setMode('dark')}
      />
      <Button
        data-theme-toggle="light"
        label={lightLabel}
        variant={variant}
        size="lg"
        isIconOnly
        icon={<Icon icon={SunIcon} />}
        onClick={() => setMode('light')}
      />
    </>
  );
}
