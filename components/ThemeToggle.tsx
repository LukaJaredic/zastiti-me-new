'use client';

import {MoonIcon, SunIcon} from '@phosphor-icons/react';
import {Button} from '@astryxdesign/core/Button';
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
  showLabel = false,
}: {
  darkLabel: string;
  lightLabel: string;
  /** Show the words beside the icon (the mobile menu). */
  showLabel?: boolean;
}) {
  const {resolved, setMode} = useColorMode();
  const toDark = resolved === 'light';
  return (
    <Button
      label={toDark ? darkLabel : lightLabel}
      variant="ghost"
      size="lg"
      isIconOnly={!showLabel}
      icon={<Icon icon={toDark ? MoonIcon : SunIcon} />}
      onClick={() => setMode(toDark ? 'dark' : 'light')}
    />
  );
}
