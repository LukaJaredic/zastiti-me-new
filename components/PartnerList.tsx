import {VStack} from '@astryxdesign/core/VStack';
import {Heading, Text} from '@astryxdesign/core/Text';
import {listGrid} from './listGrid';

type Partner = {name: string; kind: string; help: string};

/**
 * Partners, two to a row where they fit. Each is its name, the kind of
 * help it gives (small, above the name: drawn first by `order`, after the
 * name in the markup) and one line on what it does.
 */
export function PartnerList({partners}: {partners: Partner[]}) {
  return (
    <VStack
      as="ul"
      style={listGrid({
        minColumn: 'calc(55 * var(--spacing-1))',
        maxColumns: 2,
        columnGap: 'var(--spacing-8)',
      })}
    >
      {partners.map((partner) => (
        <VStack as="li" key={partner.name} gap={3}>
          <VStack gap={1}>
            <Heading level={3}>{partner.name}</Heading>
            <Text type="supporting" style={{order: -1}}>
              {partner.kind}
            </Text>
          </VStack>
          <Text color="secondary" as="p">
            {partner.help}
          </Text>
        </VStack>
      ))}
    </VStack>
  );
}
