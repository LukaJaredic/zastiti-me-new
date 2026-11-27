import Image from 'next/image';
import {VStack} from '@astryxdesign/core/VStack';
import {Card} from '@astryxdesign/core/Card';
import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {Text} from '@astryxdesign/core/Text';
import {listGrid} from './listGrid';

type Partner = {
  name: string;
  href: string;
  logo?: {src: string; width: number; height: number};
  /** A tile colour for a logo drawn for a coloured ground. */
  ground?: string;
  /** Takes a whole row, with a larger logo. */
  featured?: boolean;
};

/**
 * Logos are sized by area, not by width or height, so a long wordmark
 * (UNICEF) and a tall mark (UNDP) carry the same visual weight: each gets
 * the box of about 100×100px its own ratio allows, then the tile's limits
 * clip it.
 */
const LOGO_AREA_REM2 = (100 / 16) ** 2;
/** A featured partner's logo gets twice the area. */
const FEATURED_AREA = 2;

function logoWidth(width: number, height: number, area: number) {
  return `${Math.sqrt(LOGO_AREA_REM2 * area * (width / height)).toFixed(2)}rem`;
}

/**
 * The partners as a logo wall: one white sheet (Card `logo-wall`) split into
 * cells by hairlines, two to a row where they fit, each cell
 * (ClickableCard `logo`) linking to the partner's site. A featured partner
 * takes a whole, taller row with a logo of twice the area; otherwise, with
 * an odd count, the last cell spans the row, so the sheet has no empty
 * corner. A partner without a logo shows its name.
 */
export function PartnerList({partners}: {partners: Partner[]}) {
  return (
    <Card variant="logo-wall" padding={0}>
      <VStack
        as="ul"
        style={{
          ...listGrid({
            minColumn: 'calc(55 * var(--spacing-1))',
            maxColumns: 2,
            columnGap: '0px',
          }),
          // The cells draw their hairlines on their top and left edges; the
          // outer ones fall outside the sheet and are clipped (theme).
          margin: '-1px 0 0 -1px',
        }}
      >
        {partners.map((partner, index) => (
          <VStack
            as="li"
            key={partner.href}
            style={
              partner.featured || (index === partners.length - 1 && partners.length % 2 === 1)
                ? {gridColumn: '1 / -1'}
                : undefined
            }
          >
            <ClickableCard
              variant="logo"
              href={partner.href}
              label={partner.name}
              padding={6}
              height={partner.featured ? 'calc(6 * var(--spacing-8))' : 'calc(5 * var(--spacing-8))'}
              style={
                partner.ground
                  ? ({'--logo-ground': partner.ground} as React.CSSProperties)
                  : undefined
              }
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
                    width: `min(85%, ${logoWidth(
                      partner.logo.width,
                      partner.logo.height,
                      partner.featured ? FEATURED_AREA : 1,
                    )})`,
                    height: 'auto',
                    maxHeight: `calc(${partner.featured ? 4 : 3} * var(--spacing-8))`,
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
    </Card>
  );
}
