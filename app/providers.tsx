'use client';

import type {ReactNode} from 'react';
import Link from 'next/link';
import {Theme} from '@astryxdesign/core/theme';
import {LinkProvider} from '@astryxdesign/core/Link';
import {themes, defaultThemeSlug} from '@/src/astryx-themes';
import {ColorModeProvider} from '@/components/ColorMode';

export function Providers({children}: {children: ReactNode}) {
  return (
    <ColorModeProvider>
      {(mode) => (
        <Theme theme={themes[defaultThemeSlug]} mode={mode}>
          <LinkProvider component={Link}>{children}</LinkProvider>
        </Theme>
      )}
    </ColorModeProvider>
  );
}
