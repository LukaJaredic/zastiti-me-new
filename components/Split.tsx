import type {ReactNode} from 'react';
import {VStack} from '@astryxdesign/core/VStack';

/**
 * The two halves of a split row (Section variants `split`, `split-reverse`
 * and `split-hero` in the zastiti theme). The text always comes first in
 * the markup; the variant decides which side each half sits on, and on
 * phones they stack in markup order.
 *
 * Both halves start at the top of the row unless `centred`.
 */
export function SplitText({
  centred = false,
  children,
}: {
  centred?: boolean;
  children: ReactNode;
}) {
  return (
    <VStack gap={4} style={{gridArea: 'text', alignSelf: centred ? 'center' : undefined}}>
      {children}
    </VStack>
  );
}

export function SplitArt({
  centred = false,
  children,
}: {
  centred?: boolean;
  children: ReactNode;
}) {
  return (
    <VStack style={{gridArea: 'art', alignSelf: centred ? 'center' : undefined}}>
      {children}
    </VStack>
  );
}

/**
 * A full-width strip under both halves of a split row, such as a note under
 * the row's list. It spans every column on a row of its own, so it works
 * the same side by side and stacked.
 */
export function SplitBelow({children}: {children: ReactNode}) {
  return <VStack style={{gridColumn: '1 / -1'}}>{children}</VStack>;
}
