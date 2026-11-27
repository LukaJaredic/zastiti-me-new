import {Layout, LayoutContent, VStack} from '@astryxdesign/core/Layout';
import {Heading} from '@astryxdesign/core/Text';
import {PathCards} from '@/components/PathCards';
import {getDictionary, getLocale} from './dictionaries';

export default async function Home() {
  const locale = await getLocale();
  const {home} = await getDictionary();

  return (
    <Layout
      content={
        <LayoutContent padding={8}>
          <VStack gap={10}>
            <Heading level={1} type="display-2">
              Zaštiti.me
            </Heading>
            <PathCards
              paths={[
                {
                  audience: 'sos',
                  title: home.sosTitle,
                  description: home.sosDescription,
                  action: home.sosAction,
                  href: `/${locale}/sos`,
                },
                {
                  audience: 'parents',
                  title: home.parentsTitle,
                  description: home.parentsDescription,
                  action: home.parentsAction,
                  href: `/${locale}/roditelji`,
                },
                {
                  audience: 'kids',
                  title: home.kidsTitle,
                  description: home.kidsDescription,
                  action: home.kidsAction,
                  href: `/${locale}/djeca`,
                },
              ]}
            />
          </VStack>
        </LayoutContent>
      }
    />
  );
}
