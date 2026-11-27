import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {Link} from '@astryxdesign/core/Link';
import {listGrid} from './listGrid';

type Partner = {name: string; href: string};

/**
 * Partners, two to a row where they fit, each name linking to the
 * partner's own site.
 */
export function PartnerList({partners}: {partners: Partner[]}) {
  return (
    <VStack
      as="ul"
      style={listGrid({
        minColumn: 'calc(55 * var(--spacing-1))',
        maxColumns: 2,
        columnGap: 'var(--spacing-8)',
        rowGap: 'var(--spacing-5)',
      })}
    >
      {partners.map((partner) => (
        <VStack as="li" key={partner.href}>
          <Text type="large">
            {/* Underlined, so it reads as a link by more than its colour. */}
            <Link href={partner.href} hasUnderline>
              {partner.name}
            </Link>
          </Text>
        </VStack>
      ))}
    </VStack>
  );
}
