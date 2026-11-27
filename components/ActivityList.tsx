import Image from 'next/image';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading, Text} from '@astryxdesign/core/Text';
import {listGrid} from './listGrid';

type Activity = {title: string; description: string};

/**
 * The organisation's activities: two columns where they fit (1 2 / 3 4),
 * one on a phone. Each item is a cut-paper numeral beside its title and
 * description. The numeral is decorative (the ordered list numbers the
 * items) and comes after the text in the markup; `order` draws it first.
 */
export function ActivityList({activities}: {activities: Activity[]}) {
  return (
    <VStack
      as="ol"
      style={listGrid({
        minColumn: 'calc(75 * var(--spacing-1))',
        maxColumns: 2,
        columnGap: 'calc(2 * var(--spacing-10))',
        rowGap: 'var(--spacing-8)',
      })}
    >
      {activities.map((activity, i) => (
        <HStack as="li" key={activity.title} gap={6} vAlign="center">
          <VStack gap={1} style={{minWidth: 0}}>
            <Heading level={3}>{activity.title}</Heading>
            <Text type="large" color="secondary" as="p">
              {activity.description}
            </Text>
          </VStack>
          <Image
            src={`/images/about/broj-${i + 1}.webp`}
            alt=""
            width={80}
            height={80}
            style={{flex: 'none', order: -1}}
          />
        </HStack>
      ))}
    </VStack>
  );
}
