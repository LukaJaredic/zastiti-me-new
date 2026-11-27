import type {Locale} from '@/lib/i18n';

/**
 * The team on the About page, grouped by the three fields the story names.
 *
 * SEED DATA: invented names until the client sends the real team. Until
 * portraits arrive, the page shows each person's initials.
 */

type Localized = Record<Locale, string>;

export type TeamField = {
  label: Localized;
  members: {name: string; role: Localized}[];
};

export const team: TeamField[] = [
  {
    label: {me: 'Digitalna forenzika', en: 'Digital forensics'},
    members: [
      {
        name: 'Marko Đurović',
        role: {me: 'Osnivač, digitalni forenzičar', en: 'Founder, digital forensics'},
      },
      {
        name: 'Ivana Bulatović',
        role: {me: 'Stručnjakinja za IT sigurnost', en: 'IT security specialist'},
      },
    ],
  },
  {
    label: {me: 'Psihologija', en: 'Psychology'},
    members: [
      {name: 'Ana Vuković', role: {me: 'Dječja psihološkinja', en: 'Child psychologist'}},
      {name: 'Jelena Popović', role: {me: 'Psihoterapeutkinja', en: 'Psychotherapist'}},
    ],
  },
  {
    label: {me: 'Pravo', en: 'Law'},
    members: [
      {name: 'Nikola Radović', role: {me: 'Advokat', en: 'Lawyer'}},
      {name: 'Milica Kovačević', role: {me: 'Pravna savjetnica', en: 'Legal adviser'}},
    ],
  },
];
