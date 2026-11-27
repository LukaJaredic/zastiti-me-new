'use client';

import Image from 'next/image';
import {ArrowRightIcon} from '@phosphor-icons/react';
import {Section} from '@astryxdesign/core/Section';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {MediaTheme} from '@astryxdesign/core/theme';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Icon} from '@astryxdesign/core/Icon';

export type Door = {
  audience: 'kids' | 'parents';
  title: string;
  description: string;
  action: string;
  href: string;
  image: string;
};

const variant = {kids: 'door-kids', parents: 'door-parents'} as const;

/**
 * The home page's two doors: Za djecu and Za roditelje. Side by side as
 * framed cards on wide screens, stacked edge to edge under 1024px (the
 * `doors` and `door-*` variants in the zastiti theme). Each whole card is
 * one link. On wide screens the text sits in the illustration's empty
 * top-left; under 1024px text and art sit side by side, the parents' door
 * mirroring the kids', so the text never lands on the drawing.
 */
export function HomeDoors({doors}: {doors: Door[]}) {
  return (
    <Section variant="doors">
      {doors.map((d, i) => (
        <ClickableCard
          key={d.audience}
          href={d.href}
          label={`${d.title}: ${d.description}`}
          variant={variant[d.audience]}
          padding={0}
        >
          {/* The art spans the door. On wide screens it fills it and the text
              sits over its empty left side; below lg the theme puts the text
              in one column and sizes the art to the other side, fading it
              out under the text's edge, parents mirrored (doorLayout in
              zastitiTheme.ts). Neither takes pointer events, so the whole
              door is one link. */}
          <VStack
            style={{
              gridRow: '1',
              gridColumn: '1 / -1',
              justifySelf: 'var(--door-art-side)',
              width: 'var(--door-art-width)',
              position: 'relative',
              minHeight: '0',
              pointerEvents: 'none',
            }}
          >
            <Image
              src={d.image}
              alt=""
              fill
              // The first door is the LCP image on every width: preload it at
              // high priority. `priority` is deprecated in Next 16.
              preload={i === 0}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              loading="eager"
              sizes="(min-width: 1024px) 50vw, 70vw"
              style={{
                objectFit: 'cover',
                objectPosition: 'var(--door-art-position)',
                maskImage: 'var(--door-art-mask)',
                transform: 'var(--door-art-flip)',
              }}
            />
          </VStack>
          {/* The illustrations are light in both modes: keep dark text. */}
          <MediaTheme mode="light">
            <VStack
              gap={3}
              padding={6}
              style={{
                gridRow: '1',
                gridColumn: 'var(--door-text-col)',
                alignSelf: 'var(--door-text-align)',
                position: 'relative',
                minWidth: '0',
                pointerEvents: 'none',
              }}
            >
              <Heading level={2} type="display-2" weight="bold">
                {d.title}
              </Heading>
              {/* Over the art, the running text stays in the illustration's
                  empty left side; in its own column it fills the column. */}
              <VStack gap={3} maxWidth="var(--door-text-max)">
                <Text>{d.description}</Text>
                <HStack gap={2} vAlign="center">
                  <Text weight="semibold">{d.action}</Text>
                  <Icon icon={ArrowRightIcon} />
                </HStack>
              </VStack>
            </VStack>
          </MediaTheme>
        </ClickableCard>
      ))}
    </Section>
  );
}
