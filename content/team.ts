import type {Locale} from '@/lib/i18n';

/**
 * The Zaštiti.me team on the About page, grouped by field: the three the
 * story names (digital forensics, psychology, law), then the developers.
 * Until portraits arrive, the page shows each person's initials.
 */

type Localized = Record<Locale, string>;

export type TeamField = {
  label: Localized;
  members: {name: string; role: Localized}[];
};

const prosecutor = {me: 'Državni tužilac', en: 'State prosecutor'};
const developer = {me: 'Programer', en: 'Developer'};

export const team: TeamField[] = [
  {
    label: {me: 'Digitalna forenzika', en: 'Digital forensics'},
    members: [
      {name: 'Balša Savić', role: {me: 'Digitalni forenzičar', en: 'Digital forensics specialist'}},
    ],
  },
  {
    label: {me: 'Psihologija', en: 'Psychology'},
    members: [{name: 'Lidija Mirković', role: {me: 'Psiholog', en: 'Psychologist'}}],
  },
  {
    label: {me: 'Pravo', en: 'Law'},
    members: [
      {name: 'Miloš Šoškić', role: prosecutor},
      {name: 'Danka Đerić Ivanović', role: prosecutor},
    ],
  },
  {
    label: {me: 'Programiranje', en: 'Development'},
    members: [
      {name: 'Davor Konatar', role: developer},
      {name: 'Stefan Vukmanović', role: developer},
      {name: 'Stefan Vuković', role: developer},
    ],
  },
];
