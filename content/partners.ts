import type {Locale} from '@/lib/i18n';

/**
 * Partners on the About page, in the client's order: a logo wall, each
 * tile linking to the partner's own site.
 *
 * Logos come from each partner's official site (public/images/partners/),
 * at their own size. A partner without a logo file shows its name instead.
 * Roditelji.me's wordmark is white, made for its blue header: its tile
 * takes that blue (`ground`, from roditelji.me's stylesheet) rather than
 * recolouring the logo.
 */

type Localized = Record<Locale, string>;

export type Partner = {
  name: Localized;
  href: string;
  logo?: {src: string; width: number; height: number};
  ground?: string;
};

const same = (name: string): Localized => ({me: name, en: name});

export const partners: Partner[] = [
  {
    // No logo yet: gov.me's own logo is the Government's, not the ministry's.
    name: {
      me: 'Ministarstvo prosvjete, nauke i inovacija',
      en: 'Ministry of Education, Science and Innovation',
    },
    href: 'https://www.gov.me/mps',
  },
  {
    name: same('INHOPE'),
    href: 'https://www.inhope.org/EN',
    logo: {src: '/images/partners/inhope.png', width: 500, height: 97},
  },
  {
    name: same('UNICEF'),
    href: 'https://www.unicef.org/montenegro/',
    logo: {src: '/images/partners/unicef.webp', width: 1204, height: 150},
  },
  {
    name: same('UNDP'),
    href: 'https://www.undp.org/cnr/montenegro',
    logo: {src: '/images/partners/undp.svg', width: 60, height: 122},
  },
  {
    name: {
      me: 'Udruženje psihologa Crne Gore',
      en: 'Association of Psychologists of Montenegro',
    },
    href: 'https://udruzenjepsihologa.me/',
    logo: {src: '/images/partners/udruzenje-psihologa.png', width: 235, height: 204},
  },
  {
    name: same('Roditelji.me'),
    href: 'https://roditelji.me/',
    logo: {src: '/images/partners/roditelji.svg', width: 241, height: 45},
    ground: '#1c75bc',
  },
  {
    name: {me: '.ME domen', en: '.ME domain'},
    href: 'https://domen.me/',
    logo: {src: '/images/partners/domen.webp', width: 256, height: 256},
  },
];
