import {Fragment} from 'react';
import type {Locale} from '@/lib/i18n';
import {getDictionary} from '@/app/[locale]/dictionaries';
import {glossaryEntry, hasGlossary} from '@/content/glossary';
import {GlossaryTerm} from './GlossaryTerm';
import {glossaryPath} from './siteNav';

/** `[[words as they stand|slug]]`: see content/glossary.ts. */
const MARK = /\[\[([^\]|]+)\|([a-z0-9-]+)\]\]/g;

/**
 * Running text with its hand-marked glossary terms turned into popovers.
 * A mark whose slug has no entry, or no definition in this language, is
 * left as its plain words, so a text never shows the brackets. Where the
 * glossary has its page, the popover links to the term there.
 */
export async function GlossedText({text, locale}: {text: string; locale: Locale}) {
  const {glossary: messages} = await getDictionary();
  const page = hasGlossary(locale) ? `/${locale}${glossaryPath}` : null;
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(MARK)) {
    const [mark, words, slug] = match;
    parts.push(text.slice(last, match.index));
    last = match.index + mark.length;

    const entry = glossaryEntry(slug);
    const term = entry?.term[locale];
    const definition = entry?.definition[locale];
    parts.push(
      term && definition ? (
        <GlossaryTerm
          key={match.index}
          term={term}
          definition={definition}
          more={page ? {href: `${page}#${slug}`, label: messages.allTerms} : undefined}
        >
          {words}
        </GlossaryTerm>
      ) : (
        words
      ),
    );
  }
  parts.push(text.slice(last));

  return <Fragment>{parts}</Fragment>;
}
