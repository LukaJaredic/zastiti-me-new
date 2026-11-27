'use client';

import type {ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {Theme} from '@astryxdesign/core/theme';
import {zastitiRoditeljiTheme} from '@/src/themes/zastiti-roditelji/zastiti-roditelji.js';
import {zastitiDjecaTheme} from '@/src/themes/zastiti-djeca/zastiti-djeca.js';
import {zastitiSosTheme} from '@/src/themes/zastiti-sos/zastiti-sos.js';
import '@/src/themes/zastiti-roditelji/zastiti-roditelji.css';
import '@/src/themes/zastiti-djeca/zastiti-djeca.css';
import '@/src/themes/zastiti-sos/zastiti-sos.css';
import {audienceOf} from './siteNav';
import {useColorMode} from './ColorMode';

const themes = {
  parents: zastitiRoditeljiTheme,
  kids: zastitiDjecaTheme,
  sos: zastitiSosTheme,
};

/**
 * Paints the header and page in the colour of the door you are in:
 * /roditelji teal, /djeca sun, /sos coral. Shared pages keep brand green.
 */
export function AudienceTheme({children}: {children: ReactNode}) {
  const audience = audienceOf(usePathname());
  // A nested Theme defaults to "system"; keep the reader's light/dark pick.
  const {mode} = useColorMode();
  if (audience == null) return children;
  return (
    <Theme theme={themes[audience]} mode={mode}>
      {children}
    </Theme>
  );
}
