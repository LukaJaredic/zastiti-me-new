import type {Locale} from '@/lib/i18n';

/**
 * Partners on the About page, in the client's order, each linking to its
 * own site. Names are proper names; the ministry, the association and the
 * .ME registry also have English names.
 */

type Localized = Record<Locale, string>;

export type Partner = {name: Localized; href: string};

const same = (name: string): Localized => ({me: name, en: name});

export const partners: Partner[] = [
  {
    name: {
      me: 'Ministarstvo prosvjete, nauke i inovacija',
      en: 'Ministry of Education, Science and Innovation',
    },
    href: 'https://www.gov.me/mps',
  },
  {name: same('INHOPE'), href: 'https://www.inhope.org/EN'},
  {name: same('UNICEF'), href: 'https://www.unicef.org/montenegro/'},
  {name: same('UNDP'), href: 'https://www.undp.org/cnr/montenegro'},
  {
    name: {
      me: 'Udruženje psihologa Crne Gore',
      en: 'Association of Psychologists of Montenegro',
    },
    href: 'https://udruzenjepsihologa.me/',
  },
  {name: same('Roditelji.me'), href: 'https://roditelji.me/'},
  {name: {me: '.ME domen', en: '.ME domain'}, href: 'https://domen.me/'},
];
