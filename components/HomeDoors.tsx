'use client';

import Image from 'next/image';
import {ArrowRightIcon} from '@phosphor-icons/react';
import {Section} from '@astryxdesign/core/Section';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Overlay} from '@astryxdesign/core/Overlay';
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
 * one link; the text sits in the illustration's empty top-left corner.
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
          <Overlay
            scrim={false}
            position="top"
            align="start"
            style={{height: '100%'}}
            content={
              // The illustrations are light in both modes: keep dark text.
              <MediaTheme mode="light">
                <VStack gap={3} padding={6} width="100%">
                  <Heading level={2} type="display-2">
                    {d.title}
                  </Heading>
                  {/* The illustrations leave their left ~45% empty at every
                      width: keep the running text inside it. */}
                  <VStack gap={3} maxWidth="42%">
                    <Text>{d.description}</Text>
                    <HStack gap={2} vAlign="center">
                      <Text weight="semibold">{d.action}</Text>
                      <Icon icon={ArrowRightIcon} />
                    </HStack>
                  </VStack>
                </VStack>
              </MediaTheme>
            }
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
              sizes="(min-width: 1024px) 50vw, 100vw"
              style={{objectFit: 'cover', objectPosition: 'right 35%'}}
            />
          </Overlay>
        </ClickableCard>
      ))}
    </Section>
  );
}
