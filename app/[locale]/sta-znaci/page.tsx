import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {Section} from '@astryxdesign/core/Section';
import {VStack} from '@astryxdesign/core/VStack';
import {GlossaryBrowser} from '@/components/GlossaryBrowser';
import {glossary, hasGlossary} from '@/content/glossary';
import {pageMetadata} from '@/lib/metadata';
import {getDictionary, getLocale} from '../dictionaries';

export async function generateMetadata(): Promise<Metadata> {
  const {metadata, components} = await getDictionary();
  return pageMetadata({
    locale: await getLocale(),
    path: '/sta-znaci',
    title: metadata['glossary-title'],
    description: metadata['glossary-description'],
    siteName: components.header.siteName,
  });
}

/**
 * Šta znači: the glossary (content/glossary.ts), searchable, every term with
 * its own anchor for the popovers to link to. Only in languages the glossary
 * is complete in; elsewhere a 404, and no footer link.
 */
export default async function GlossaryPage() {
  const locale = await getLocale();
  if (!hasGlossary(locale)) notFound();
  const {glossary: messages} = await getDictionary();

  return (
    <VStack as="article">
      <Section variant="split">
        <GlossaryBrowser
          items={glossary.map((entry) => ({
            slug: entry.slug,
            term: entry.term[locale]!,
            definition: entry.definition[locale]!,
          }))}
          messages={{
            title: messages.title,
            searchLabel: messages.searchLabel,
            found: messages.found,
            empty: messages.empty,
          }}
        />
      </Section>
    </VStack>
  );
}
