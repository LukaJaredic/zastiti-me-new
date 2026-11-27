import Image from 'next/image';
import {VStack} from '@astryxdesign/core/VStack';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Text} from '@astryxdesign/core/Text';
import {listGrid} from './listGrid';

type Partner = {
  name: string;
  href: string;
  logo?: {src: string; width: number; height: number};
  /** A tile colour for a logo drawn for a coloured ground. */
  ground?: string;
};

/**
 * Logos are sized by area, not by width or height, so a long wordmark
 * (UNICEF) and a tall mark (UNDP) carry the same visual weight: each gets
 * the box of about 100×100px its own ratio allows, then the tile's limits
 * clip it.
 */
const LOGO_AREA_REM2 = (100 / 16) ** 2;

function logoWidth(width: number, height: number) {
  return `${Math.sqrt(LOGO_AREA_REM2 * (width / height)).toFixed(2)}rem`;
}

/**
 * The partners as a logo wall: two tiles to a row where they fit, each a
 * white paper tile (ClickableCard `logo` variant) linking to the partner's
 * site. A partner without a logo shows its name.
 */
export function PartnerList({partners}: {partners: Partner[]}) {
  return (
    <VStack
      as="ul"
      style={listGrid({
        minColumn: 'calc(55 * var(--spacing-1))',
        maxColumns: 2,
        columnGap: 'var(--spacing-5)',
      })}
    >
      {partners.map((partner) => (
        <VStack as="li" key={partner.href}>
          <ClickableCard
            variant="logo"
            href={partner.href}
            label={partner.name}
            padding={6}
            height="calc(5 * var(--spacing-8))"
            style={partner.ground ? {backgroundColor: partner.ground} : undefined}
          >
            {partner.logo ? (
              <Image
                src={partner.logo.src}
                alt={partner.name}
                width={partner.logo.width}
                height={partner.logo.height}
                // Logos are small files already; SVGs can't go through the
                // image optimizer.
                unoptimized
                style={{
                  width: `min(85%, ${logoWidth(partner.logo.width, partner.logo.height)})`,
                  height: 'auto',
                  maxHeight: 'calc(3 * var(--spacing-8))',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Text type="large" weight="semibold" justify="center" style={{color: 'inherit'}}>
                {partner.name}
              </Text>
            )}
          </ClickableCard>
        </VStack>
      ))}
    </VStack>
  );
}
