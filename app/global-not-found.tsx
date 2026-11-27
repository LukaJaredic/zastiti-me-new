import type {Metadata} from 'next';
import {Onest} from 'next/font/google';
import './globals.css';
import '@astryxdesign/core/reset.css';
import '@astryxdesign/core/astryx.css';
import {Layout, LayoutContent, VStack, HStack} from '@astryxdesign/core/Layout';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import me from '@/content/messages/me.json';
import en from '@/content/messages/en.json';
import {Providers} from './providers';

// This page bypasses app/[locale]/layout.tsx, so it loads its own fonts, CSS
// and providers. It can't know the locale, so it shows both languages.
const onest = Onest({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-onest',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${me['not-found'].title} · ${en['not-found'].title}`,
};

export default function GlobalNotFound() {
  return (
    <html lang="sr-Latn-ME" className={onest.variable}>
      <body>
        <Providers>
          <Layout
            content={
              <LayoutContent padding={8}>
                <VStack gap={8}>
                  <VStack gap={3}>
                    <Heading level={1}>{me['not-found'].title}</Heading>
                    <Text type="body" color="secondary">
                      {me['not-found'].description}
                    </Text>
                  </VStack>
                  <VStack gap={3}>
                    <Heading level={2}>
                      <span lang="en">{en['not-found'].title}</span>
                    </Heading>
                    <Text type="body" color="secondary">
                      <span lang="en">{en['not-found'].description}</span>
                    </Text>
                  </VStack>
                  <HStack gap={3}>
                    <Button label={me['not-found'].backToHome} variant="primary" href="/me" />
                    <Button label={en['not-found'].backToHome} variant="secondary" href="/en" />
                  </HStack>
                </VStack>
              </LayoutContent>
            }
          />
        </Providers>
      </body>
    </html>
  );
}
