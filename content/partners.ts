import type {Locale} from '@/lib/i18n';

/**
 * Partners on the About page: companies and organisations that help.
 *
 * SEED DATA: invented examples until the client sends the real partners.
 */

type Localized = Record<Locale, string>;

export type Partner = {
  name: string;
  /** What kind of help: shown small, above the name. */
  kind: Localized;
  help: Localized;
};

export const partners: Partner[] = [
  {
    name: 'Lovćen Tech',
    kind: {me: 'Tehnička podrška', en: 'Technical support'},
    help: {
      me: 'Održava našu platformu i pomaže u digitalnoj forenzici.',
      en: 'Runs our platform and helps with digital forensics.',
    },
  },
  {
    name: 'Fondacija Zeta',
    kind: {me: 'Donator', en: 'Donor'},
    help: {
      me: 'Finansira besplatnu pomoć žrtvama digitalnog nasilja.',
      en: 'Funds free help for victims of digital violence.',
    },
  },
  {
    name: 'Škola koda',
    kind: {me: 'Edukacija', en: 'Education'},
    help: {
      me: 'Vodi radionice o sigurnosti na internetu u školama.',
      en: 'Runs online safety workshops in schools.',
    },
  },
  {
    name: 'Ars Media',
    kind: {me: 'Medijski partner', en: 'Media partner'},
    help: {
      me: 'Širi naše vodiče i kampanje kroz svoje kanale.',
      en: 'Shares our guides and campaigns through its channels.',
    },
  },
];
