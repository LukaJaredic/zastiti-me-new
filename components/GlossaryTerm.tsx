'use client';

import {Popover} from '@astryxdesign/core/Popover';
import {Link} from '@astryxdesign/core/Link';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';

/**
 * A glossary term in running text: the words keep the sentence's colour and
 * size, marked by a dotted underline (a hint, not a link, and not colour
 * alone). Tapping, clicking or Enter opens the term and its definition in a
 * popover; a tap outside or Escape closes it. `more` links on to the term
 * on the glossary page.
 */
export function GlossaryTerm({
  term,
  definition,
  more,
  children,
}: {
  term: string;
  definition: string;
  more?: {href: string; label: string};
  children: React.ReactNode;
}) {
  return (
    <Popover
      label={term}
      width="calc(80 * var(--spacing-1))"
      padding={4}
      content={
        <VStack gap={3}>
          <VStack gap={1}>
            <Text weight="semibold">{term}</Text>
            <Text color="secondary">{definition}</Text>
          </VStack>
          {more && (
            <Link href={more.href} isStandalone hasUnderline>
              {more.label}
            </Link>
          )}
        </VStack>
      }
    >
      {/* Render-prop mode: Popover's default mode wraps the trigger in a
          <div>, which can't sit inside the paragraph a term lives in. */}
      {({ref, ...triggerProps}) => (
        <Link
          ref={ref}
          {...triggerProps}
          type="inherit"
          style={{
            color: 'inherit',
            textDecorationLine: 'underline',
            textDecorationStyle: 'dotted',
            textDecorationThickness: '0.08em',
            textUnderlineOffset: '0.2em',
          }}
        >
          {children}
        </Link>
      )}
    </Popover>
  );
}
