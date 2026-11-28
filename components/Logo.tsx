'use client';

import Image from 'next/image';
import {Link} from '@astryxdesign/core/Link';

// public/images/logo.png is 1073×567: the old site's shield with
// "Zaštiti.me NVO", on a transparent ground.
const ratio = 1073 / 567;
const heights = {xl: 44, '3xl': 88} as const;

/**
 * The Zaštiti.me logo, linked home. `xl` sits in the header at the height of
 * a large button (44px), `3xl` in the footer at twice that. next/image gets
 * the drawn size, so it serves a 1x and 2x copy, not the full file. The logo
 * is dark green and blue, so in dark mode a filter lifts both colours until
 * they read on the dark ground. The filter is in app/globals.css (data-logo),
 * so it is right from the first paint, before React knows the mode.
 */
export function Logo({
  name,
  href,
  size = 'xl',
  onClick,
}: {
  name: string;
  href: string;
  size?: keyof typeof heights;
  /** Runs before navigating (the mobile menu closes itself). */
  onClick?: () => void;
}) {
  const height = heights[size];
  return (
    <Link href={href} isStandalone onClick={onClick}>
      <Image
        src="/images/logo.png"
        alt={name}
        width={Math.round(height * ratio)}
        height={height}
        loading="eager"
        data-logo=""
      />
    </Link>
  );
}
