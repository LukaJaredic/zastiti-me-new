import {VisuallyHidden} from '@astryxdesign/core/VisuallyHidden';
import {HomeDoors} from '@/components/HomeDoors';
import {getDictionary, getLocale} from './dictionaries';

export default async function Home() {
  const locale = await getLocale();
  const {home, components} = await getDictionary();

  return (
    <>
      {/* One h1 per page; the doors carry the visible headings. */}
      <VisuallyHidden as="h1">{components.header.siteName}</VisuallyHidden>
      <HomeDoors
        doors={[
          {
            audience: 'kids',
            title: home.kidsTitle,
            description: home.kidsDescription,
            action: home.kidsAction,
            href: `/${locale}/djeca`,
            image: '/images/home/djeca.webp',
          },
          {
            audience: 'parents',
            title: home.parentsTitle,
            description: home.parentsDescription,
            action: home.parentsAction,
            href: `/${locale}/roditelji`,
            image: '/images/home/roditelji.webp',
          },
        ]}
      />
    </>
  );
}
