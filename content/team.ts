import type {Locale} from '@/lib/i18n';

/**
 * The Zaštiti.me team on the About page, in the client's order. Until
 * portraits arrive, the page shows each person's initials.
 */

type Localized = Record<Locale, string>;

export type TeamMember = {name: string; role: Localized};

export const team: TeamMember[] = [
  {name: 'Balša Savić', role: {me: 'Digitalni forenzičar', en: 'Digital forensics specialist'}},
  {name: 'Miloš Šoškić', role: {me: 'Državni tužilac', en: 'State prosecutor'}},
  {name: 'Danka Đerić Ivanović', role: {me: 'Državni tužilac', en: 'State prosecutor'}},
  {name: 'Lidija Mirković', role: {me: 'Psiholog', en: 'Psychologist'}},
  {name: 'Davor Konatar', role: {me: 'Programer', en: 'Developer'}},
  {name: 'Stefan Vukmanović', role: {me: 'Programer', en: 'Developer'}},
  {name: 'Stefan Vuković', role: {me: 'Programer', en: 'Developer'}},
];
