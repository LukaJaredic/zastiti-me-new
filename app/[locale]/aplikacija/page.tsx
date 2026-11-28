import type {Metadata} from 'next';
import type {ReactNode} from 'react';
import {DownloadSimpleIcon} from '@phosphor-icons/react/dist/ssr';
import {Section} from '@astryxdesign/core/Section';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Button} from '@astryxdesign/core/Button';
import {Divider} from '@astryxdesign/core/Divider';
import {Heading, Text} from '@astryxdesign/core/Text';
import {SplitArt, SplitText} from '@/components/Split';
import {GlossedText} from '@/components/GlossedText';
import {Illustration} from '@/components/Illustration';
import {IconList} from '@/components/IconList';
import {listGrid} from '@/components/listGrid';
import {pageMetadata} from '@/lib/metadata';
import {getDictionary, getLocale} from '../dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const {metadata, components} = await getDictionary();
  return pageMetadata({
    locale: await getLocale(),
    path: '/aplikacija',
    title: metadata['app-title'],
    description: metadata['app-description'],
    siteName: components.header.siteName,
  });
}

const icon = (name: string) => `/images/app/${name}.webp`;

/** The portrait illustrations stay a comfortable size beside their text. */
const pictureWidth = 'calc(120 * var(--spacing-1))';

/** A paragraph of a row's text. */
function Para({children}: {children: ReactNode}) {
  return (
    <Text type="large" color="secondary" as="p">
      {children}
    </Text>
  );
}

/** A note under a list, below a fold in the paper. */
function FinePrint({children}: {children: ReactNode}) {
  return (
    <VStack gap={5} paddingBlockStart={8}>
      <Divider variant="fold" />
      <Text color="secondary" as="p">
        {children}
      </Text>
    </VStack>
  );
}

/**
 * Aplikacija: the Zaštiti.me app for parents. A hero, then what it covers,
 * what it recognises, what it shows and when, its statistics, SOS support,
 * privacy and installation, and a closing band with the download. Every
 * row is text beside a list (the theme's split rows: 5:7 on desktop, equal
 * halves on tablets, stacked on phones).
 */
export default async function AppPage() {
  const locale = await getLocale();
  const {app} = await getDictionary();
  const {purpose, detects, shows, warns, stats, sos, privacy, install, close} = app;

  return (
    <VStack as="article">
      <Section variant="split-hero">
        <SplitText>
          <Heading level={1}>{app.hero.title}</Heading>
          <Text type="large" as="p">
            {app.hero.lead}
          </Text>
          <Para>{app.hero.body}</Para>
        </SplitText>
        <SplitArt centred>
          <VStack hAlign="center">
            <VStack style={{width: '100%', maxWidth: pictureWidth}}>
              <Illustration
                src="/images/app/otac-i-sin.webp"
                alt={app.images.hero}
                width={1005}
                height={1100}
                priority
              />
            </VStack>
          </VStack>
        </SplitArt>
      </Section>

      <Section variant="split">
        <SplitText>
          <Heading level={2}>{purpose.title}</Heading>
          <Para>{purpose.para1}</Para>
          <Para>{purpose.para2}</Para>
        </SplitText>
        <SplitArt>
          <IconList
            items={[
              {icon: icon('platforma-mreze'), ...purpose.social},
              {icon: icon('platforma-poruke'), ...purpose.messaging},
              {icon: icon('platforma-email'), ...purpose.email},
              {icon: icon('platforma-igre'), ...purpose.games},
            ]}
          />
        </SplitArt>
      </Section>

      <Section variant="split">
        <SplitText>
          <Heading level={2}>{detects.title}</Heading>
          <Para>{detects.intro}</Para>
        </SplitText>
        <SplitArt>
          <IconList
            items={[
              {icon: icon('rizik-grooming'), ...detects.grooming},
              {icon: icon('rizik-seksting'), ...detects.sexting},
              {icon: icon('rizik-nasilje'), ...detects.abuse},
              {icon: icon('rizik-drugo'), ...detects.other},
            ]}
          />
          <FinePrint>{detects.note}</FinePrint>
        </SplitArt>
      </Section>

      <Section variant="split">
        <SplitText>
          <Heading level={2}>{shows.title}</Heading>
          <Para>{shows.para1}</Para>
          <Para>{shows.para2}</Para>
        </SplitText>
        <SplitArt>
          <VStack gap={4}>
            <Heading level={2}>{warns.title}</Heading>
            <Para>{warns.para1}</Para>
            <Para>
              <GlossedText text={warns.para2} locale={locale} />
            </Para>
          </VStack>
        </SplitArt>
      </Section>

      <Section variant="split">
        <SplitText>
          <Heading level={2}>{stats.title}</Heading>
          <Para>{stats.intro}</Para>
        </SplitText>
        <SplitArt>
          <IconList
            items={[
              {icon: icon('statistika-telefon'), title: stats.phoneTime},
              {icon: icon('statistika-aplikacije'), title: stats.appTime},
              {icon: icon('statistika-poruke'), title: stats.messages},
            ]}
          />
          <FinePrint>{stats.note}</FinePrint>
        </SplitArt>
      </Section>

      <Section variant="band-muted" paddingBlock={10} paddingInline={0}>
        <Section variant="split">
          <SplitText>
            <Heading level={2}>{sos.title}</Heading>
            <Para>{sos.para1}</Para>
            <Para>{sos.para2}</Para>
            <Para>{sos.para3}</Para>
          </SplitText>
          <SplitArt>
            <IconList
              items={[
                {icon: icon('sos-psiholog'), ...sos.psychologist},
                {icon: icon('sos-forenzicar'), ...sos.forensics},
                {icon: icon('sos-pravnik'), ...sos.lawyer},
              ]}
            />
            <FinePrint>{sos.note}</FinePrint>
          </SplitArt>
        </Section>
      </Section>

      <Section variant="split">
        <SplitText>
          <Heading level={2}>{privacy.title}</Heading>
          <Para>{privacy.intro}</Para>
        </SplitText>
        <SplitArt>
          <VStack as="ul" gap={8} style={{listStyle: 'none', margin: 0, padding: 0}}>
            {[privacy.encrypted, privacy.automated, privacy.deleted].map((item) => (
              <VStack as="li" key={item.title} gap={1}>
                <Heading level={3}>{item.title}</Heading>
                <Para>{item.description}</Para>
              </VStack>
            ))}
          </VStack>
        </SplitArt>
      </Section>

      <Section variant="split">
        <SplitText>
          <Heading level={2}>{install.title}</Heading>
          <Para>{install.para}</Para>
        </SplitText>
        <SplitArt>
          <VStack
            as="dl"
            style={listGrid({
              minColumn: 'calc(50 * var(--spacing-1))',
              maxColumns: 2,
              columnGap: 'var(--spacing-8)',
            })}
          >
            {[install.child, install.parent].map((device) => (
              <VStack key={device.label} gap={1}>
                <VStack as="dt">
                  <Text color="secondary">{device.label}</Text>
                </VStack>
                <VStack as="dd" style={{margin: 0}}>
                  <Text type="large" weight="semibold">
                    {device.value}
                  </Text>
                </VStack>
              </VStack>
            ))}
          </VStack>
        </SplitArt>
      </Section>

      <Section variant="band-brand" paddingBlock={10} paddingInline={0}>
        <Section variant="split">
          <SplitText centred>
            <Heading level={2}>{close.title}</Heading>
            <Text type="large" as="p">
              {close.para1}
            </Text>
            <Para>{close.para2}</Para>
            <HStack paddingBlockStart={4}>
              <Button
                variant="on-band"
                size="lg"
                href={close.ctaHref}
                label={close.ctaText}
                // The SSR build of the icon: a server page can't hand a
                // component to Astryx's client Icon.
                icon={<DownloadSimpleIcon aria-hidden size="1.25em" />}
              />
            </HStack>
          </SplitText>
          <SplitArt centred>
            <VStack hAlign="center">
              <VStack style={{width: '100%', maxWidth: pictureWidth}}>
                <Illustration
                  src="/images/app/majka-i-djeca.webp"
                  alt={app.images.close}
                  width={800}
                  height={1000}
                />
              </VStack>
            </VStack>
          </SplitArt>
        </Section>
      </Section>
    </VStack>
  );
}
