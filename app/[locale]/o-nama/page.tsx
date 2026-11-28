import type {Metadata} from 'next';
import {ArrowRightIcon} from '@phosphor-icons/react/dist/ssr';
import {Section} from '@astryxdesign/core/Section';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Button} from '@astryxdesign/core/Button';
import {Heading, Text} from '@astryxdesign/core/Text';
import {SplitArt, SplitText} from '@/components/Split';
import {GlossedText} from '@/components/GlossedText';
import {Illustration} from '@/components/Illustration';
import {ActivityList} from '@/components/ActivityList';
import {TeamList} from '@/components/TeamList';
import {PartnerList} from '@/components/PartnerList';
import {team} from '@/content/team';
import {partners} from '@/content/partners';
import {pageMetadata} from '@/lib/metadata';
import {sentenceCase} from '@/lib/text';
import {getDictionary, getLocale} from '../dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const {metadata, components} = await getDictionary();
  return pageMetadata({
    locale: await getLocale(),
    path: '/o-nama',
    title: metadata['about-title'],
    description: metadata['about-description'],
    siteName: components.header.siteName,
  });
}

/**
 * O nama. A hero, the mission and the story, what we do, who does it, who
 * helps, and how to help. The rows and bands are Section variants in the
 * zastiti theme: split rows are 5:7 on desktop, equal halves on tablets and
 * stacked on phones.
 */
export default async function AboutPage() {
  const locale = await getLocale();
  const {about, collaborators} = await getDictionary();
  const {activities, support} = about;

  return (
    <VStack as="article">
      <Section variant="split-hero">
        <SplitText>
          <Heading level={1}>{about.hero.subtitle}</Heading>
          <Text type="large" color="secondary" as="p">
            <GlossedText text={about.mission.para1} locale={locale} />
          </Text>
        </SplitText>
        <SplitArt>
          <Illustration
            src="/images/about/zajedno.webp"
            alt={about.images.together}
            width={1254}
            height={1254}
            priority
          />
        </SplitArt>
      </Section>

      <Section variant="row">
        <VStack gap={4}>
          <Heading level={2}>{sentenceCase(about.mission.title)}</Heading>
          <Text type="large" color="secondary" as="p">
            {about.mission.para2}
          </Text>
        </VStack>
      </Section>

      <Section variant="row">
        <VStack gap={4}>
          <Heading level={2}>{sentenceCase(about.history.title)}</Heading>
          <Text type="large" color="secondary" as="p">
            {about.history.para}
          </Text>
        </VStack>
      </Section>

      <Section variant="row">
        <VStack gap={8}>
          <Heading level={2}>{sentenceCase(activities.title)}</Heading>
          <ActivityList
            activities={[
              activities.freeHelp,
              activities.education,
              activities.workshops,
              activities.research,
            ]}
          />
        </VStack>
      </Section>

      <Section variant="split">
        <SplitText>
          <Heading level={2}>{sentenceCase(collaborators['team-title'])}</Heading>
          <Text type="large" color="secondary" as="p">
            {collaborators.description}
          </Text>
        </SplitText>
        <SplitArt>
          <TeamList
            fields={team.map((field) => ({
              label: field.label[locale],
              members: field.members.map((m) => ({name: m.name, role: m.role[locale]})),
            }))}
          />
        </SplitArt>
      </Section>

      <Section variant="band-muted" paddingBlock={10} paddingInline={0}>
        <Section variant="split-reverse">
          <SplitText>
            <Heading level={2}>{sentenceCase(collaborators['partners-title'])}</Heading>
            <Text type="large" color="secondary" as="p">
              {collaborators['partners-description']}
            </Text>
          </SplitText>
          <SplitArt>
            <PartnerList
              partners={partners.map((p) => ({...p, name: p.name[locale]}))}
            />
          </SplitArt>
        </Section>
      </Section>

      <Section variant="band-brand" paddingBlock={10} paddingInline={0}>
        <Section variant="split">
          <SplitText centred>
            <Heading level={2}>{sentenceCase(support.title)}</Heading>
            <VStack as="ul" gap={4} style={{listStyle: 'none', margin: 0, padding: 0}}>
              {[support.donate, support.volunteer, support.spread].map((way) => (
                <VStack as="li" key={way.title} gap={1}>
                  <Text type="large">{way.title}</Text>
                  <Text color="secondary">{way.description}</Text>
                </VStack>
              ))}
            </VStack>
            <HStack paddingBlockStart={4}>
              <Button
                variant="on-band"
                size="lg"
                href={`/${locale}${support.ctaHref}`}
                label={sentenceCase(support.ctaText)}
                // The SSR build of the icon: a server page can't hand a
                // component to Astryx's client Icon.
                icon={<ArrowRightIcon aria-hidden size="1.25em" />}
              />
            </HStack>
          </SplitText>
          <SplitArt centred>
            <Illustration
              src="/images/about/stit.webp"
              alt={about.images.shield}
              width={1586}
              height={992}
            />
          </SplitArt>
        </Section>
      </Section>
    </VStack>
  );
}
