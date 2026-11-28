import Image from 'next/image';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading, Text} from '@astryxdesign/core/Text';

export type IconItem = {
  /** A cut-paper icon in public/images/, 240px square. */
  icon: string;
  title: string;
  description?: string;
};

/**
 * One column of items, each a cut-paper icon beside its title and, when it
 * has one, a short description. Items with a description are small
 * sections (a heading); items without one are a plain list of phrases.
 * The icon is decorative and comes after the text in the markup; `order`
 * draws it first.
 */
export function IconList({
  items,
  ordered = false,
}: {
  items: IconItem[];
  /** An `ol`, for items that read as steps or a ranking. */
  ordered?: boolean;
}) {
  return (
    <VStack
      as={ordered ? 'ol' : 'ul'}
      gap={6}
      style={{listStyle: 'none', margin: 0, padding: 0}}
    >
      {items.map((item) => (
        <HStack as="li" key={item.title} gap={6} vAlign="center">
          {item.description ? (
            <VStack gap={1} style={{minWidth: 0}}>
              <Heading level={3}>{item.title}</Heading>
              <Text color="secondary" as="p">
                {item.description}
              </Text>
            </VStack>
          ) : (
            <Text weight="semibold" as="p" style={{minWidth: 0}}>
              {item.title}
            </Text>
          )}
          <Image
            src={item.icon}
            alt=""
            width={56}
            height={56}
            style={{flex: 'none', order: -1}}
          />
        </HStack>
      ))}
    </VStack>
  );
}
