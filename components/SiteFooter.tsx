import {Section} from '@astryxdesign/core/Section';
import {Center} from '@astryxdesign/core/Center';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Grid} from '@astryxdesign/core/Grid';
import {Divider} from '@astryxdesign/core/Divider';
import {Text} from '@astryxdesign/core/Text';
import {Link} from '@astryxdesign/core/Link';
import type {Locale} from '@/lib/i18n';
import type {Messages} from '@/app/[locale]/dictionaries';
import {FooterLinks} from './FooterLinks';
import {Logo} from './Logo';
import {footerLinks, legalLinks} from './siteNav';

type FooterMessages = Messages['components']['footer'];

/** The copyright year, fixed at build time (pages are static). */
async function buildYear() {
  'use cache';
  return new Date().getFullYear();
}

/** A small label over a column; the column is its own landmark. */
function Column({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <VStack as="nav" gap={4} aria-label={label}>
      <Text type="label" color="secondary">
        {label}
      </Text>
      {children}
    </VStack>
  );
}

/**
 * The site footer (footer-columns) on the quiet sunken band: the name and
 * the line it stands for, the sitemap, how to reach the team, then the legal
 * row. Register and bank numbers live on the contact page, not here.
 */
export async function SiteFooter({
  locale,
  siteName,
  tagline,
  contactLabel,
  footer,
}: {
  locale: Locale;
  siteName: string;
  tagline: string;
  contactLabel: string;
  footer: FooterMessages;
}) {
  const home = `/${locale}`;
  const year = await buildYear();

  return (
    <VStack as="footer">
      <Section variant="muted" dividers={['top']} padding={0}>
        <Center axis="horizontal" paddingInline={6} paddingBlock={10}>
          <VStack gap={10} width="100%" maxWidth={1120}>
            <Grid columns={{minWidth: 240, max: 3}} gap={8}>
              <VStack gap={3}>
                <Logo name={siteName} href={home} size="3xl" />
                <Text type="large" color="secondary">
                  {tagline}
                </Text>
              </VStack>

              <Column label={footer.quickLinksTitle}>
                <FooterLinks
                  layout="column"
                  links={footerLinks(footer).map((l) => ({
                    label: l.label,
                    href: `${home}${l.path}`,
                  }))}
                />
              </Column>

              <Column label={contactLabel}>
                <VStack gap={1}>
                  <Text>{footer.organizationName}</Text>
                  <Text color="secondary">{footer.addressLine1}</Text>
                  <Text color="secondary">{footer.addressLine2}</Text>
                </VStack>
                <Link href={`mailto:${footer.emailAddress}`}>
                  {footer.emailAddress}
                </Link>
              </Column>
            </Grid>

            <VStack gap={6}>
              <Divider />
              <HStack gap={6} wrap="wrap" vAlign="center">
                <Text type="supporting">
                  {footer.copyright.replace('{year}', String(year))}
                </Text>
                <VStack as="nav" aria-label={footer.legalLinksTitle}>
                  <FooterLinks
                    layout="row"
                    links={legalLinks(footer).map((l) => ({
                      label: l.label,
                      href: `${home}${l.path}`,
                    }))}
                  />
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </Center>
      </Section>
    </VStack>
  );
}
