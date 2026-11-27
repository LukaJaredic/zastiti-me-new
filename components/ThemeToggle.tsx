'use client';

import {MoonIcon, SunIcon} from '@phosphor-icons/react';
import {Button, type ButtonVariant} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';
import {useColorMode} from './ColorMode';

/**
 * Light/dark switch. Shows the mode it switches to: a moon on a light page,
 * a sun on a dark one. The label says the action, so state is never shown by
 * the icon alone.
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
  const {resolved, setMode} = useColorMode();
  const toDark = resolved === 'light';
  return (
    <Button
      label={toDark ? darkLabel : lightLabel}
      variant={variant}
      size="lg"
      isIconOnly
      icon={<Icon icon={toDark ? MoonIcon : SunIcon} />}
      onClick={() => setMode(toDark ? 'dark' : 'light')}
    />
  );
}
