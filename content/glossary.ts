import type {Locale} from '@/lib/i18n';

/**
 * The glossary ("Šta znači"): the client's terms and definitions, verbatim,
 * in the client's order (A to Z).
 *
 * Texts mark a term by hand where it should be explained, in the message
 * itself: `[[digitalnog nasilja|digitalno-nasilje]]` is the words as they
 * stand in the sentence, then the term's slug. `GlossedText` turns the mark
 * into a popover with the definition; a slug that isn't here, or a term with
 * no definition in the page's language, stays plain text. Mark a term once
 * per page, the first time it appears in running text, never in headings,
 * buttons or the report flow.
 *
 * Montenegrin only for now: English definitions wait for the client.
 */

type Localized = Partial<Record<Locale, string>>;

export type GlossaryEntry = {
  slug: string;
  term: Localized;
  definition: Localized;
};

export const glossary: GlossaryEntry[] = [
  {
    slug: 'blokiranje',
    term: {me: 'Blokiranje (block)'},
    definition: {me: 'Mogućnost da spriječiš drugu osobu da te kontaktira ili vidi tvoj profil.'},
  },
  {
    slug: 'digitalna-empatija',
    term: {me: 'Digitalna empatija'},
    definition: {me: 'Sposobnost da razumijemo osjećaje drugih u internet komunikaciji.'},
  },
  {
    slug: 'digitalna-pismenost',
    term: {me: 'Digitalna pismenost'},
    definition: {me: 'Znanje i vještine za sigurno i odgovorno korišćenje interneta.'},
  },
  {
    slug: 'digitalni-trag',
    term: {me: 'Digitalni trag'},
    definition: {me: 'Svi podaci koje ostavljaš na internetu tokom korišćenja uređaja i aplikacija.'},
  },
  {
    slug: 'digitalno-nasilje',
    term: {me: 'Digitalno nasilje (cyberbullying)'},
    definition: {me: 'Svako uznemiravanje, vrijeđanje ili prijetnja koja se dešava putem interneta, društvenih mreža, igrica ili poruka.'},
  },
  {
    slug: 'doxxing',
    term: {me: 'Doxxing (otkrivanje podataka)'},
    definition: {me: 'Objavljivanje nečijih privatnih podataka na internetu bez dozvole.'},
  },
  {
    slug: 'dvofaktorska-autentifikacija',
    term: {me: 'Dvofaktorska autentifikacija (2FA)'},
    definition: {me: 'Dodatni sloj zaštite pri prijavi na nalog (npr. kod putem SMS-a).'},
  },
  {
    slug: 'govor-mrznje',
    term: {me: 'Govor mržnje'},
    definition: {me: 'Sadržaj koji širi mržnju ili diskriminaciju prema osobi ili grupi zbog njihovog identiteta (npr. vjera, nacionalnost, pol).'},
  },
  {
    slug: 'grooming',
    term: {me: 'Grooming'},
    definition: {me: 'Kada odrasla osoba putem interneta gradi povjerenje s djetetom radi zloupotrebe.'},
  },
  {
    slug: 'javna-objava',
    term: {me: 'Javna objava (public post)'},
    definition: {me: 'Sadržaj koji može vidjeti svako na internetu.'},
  },
  {
    slug: 'kradja-identiteta',
    term: {me: 'Krađa identiteta'},
    definition: {me: 'Korišćenje tuđih ličnih podataka ili profila bez dozvole.'},
  },
  {
    slug: 'lazni-profil',
    term: {me: 'Lažni profil (fake account)'},
    definition: {me: 'Profil napravljen pod lažnim imenom ili u tuđe ime radi obmane ili uznemiravanja.'},
  },
  {
    slug: 'malware',
    term: {me: 'Malware (zlonamjerni softver)'},
    definition: {me: 'Programi koji mogu oštetiti uređaj ili ukrasti podatke.'},
  },
  {
    slug: 'moderator',
    term: {me: 'Moderator'},
    definition: {me: 'Osoba koja prati sadržaj i uklanja neprikladne objave u online zajednici.'},
  },
  {
    slug: 'online-zajednica',
    term: {me: 'Online zajednica'},
    definition: {me: 'Grupa ljudi koja komunicira putem neke digitalne platforme.'},
  },
  {
    slug: 'online-reputacija',
    term: {me: 'Online reputacija'},
    definition: {me: 'Slika koju osoba ima na internetu na osnovu svojih objava i aktivnosti.'},
  },
  {
    slug: 'online-uznemiravanje',
    term: {me: 'Online uznemiravanje'},
    definition: {me: 'Ponavljano slanje uvredljivih ili prijetećih poruka s ciljem da se osoba zastraši ili uznemiri.'},
  },
  {
    slug: 'online-ucjena',
    term: {me: 'Online ucjena (sextortion)'},
    definition: {me: 'Prijetnja objavom privatnog sadržaja kako bi se osoba prisilila na nešto.'},
  },
  {
    slug: 'online-prevara',
    term: {me: 'Online prevara (scam)'},
    definition: {me: 'Pokušaj da se neko obmane na internetu radi novčane ili druge koristi.'},
  },
  {
    slug: 'phishing',
    term: {me: 'Phishing'},
    definition: {me: 'Lažne poruke ili stranice koje pokušavaju ukrasti lozinke i druge podatke.'},
  },
  {
    slug: 'prijava-sadrzaja',
    term: {me: 'Prijava sadržaja (report)'},
    definition: {me: 'Opcija kojom se platformi prijavljuje uvredljiv ili opasan sadržaj.'},
  },
  {
    slug: 'pristanak',
    term: {me: 'Pristanak (consent)'},
    definition: {me: 'Jasna dozvola osobe prije dijeljenja njenog sadržaja ili podataka.'},
  },
  {
    slug: 'privatna-poruka',
    term: {me: 'Privatna poruka (DM)'},
    definition: {me: 'Poruka poslana direktno jednoj osobi putem platforme.'},
  },
  {
    slug: 'privatnost-naloga',
    term: {me: 'Privatnost naloga'},
    definition: {me: 'Postavke koje određuju ko može vidjeti vaš profil, objave i lične podatke.'},
  },
  {
    slug: 'screenshot',
    term: {me: 'Screenshot (snimak ekrana)'},
    definition: {me: 'Slika onoga što se vidi na ekranu — često služi kao dokaz.'},
  },
  {
    slug: 'sexting-zloupotreba',
    term: {me: 'Sexting zloupotreba'},
    definition: {me: 'Dijeljenje tuđih intimnih fotografija ili poruka bez pristanka.'},
  },
  {
    slug: 'sigurno-prijavljivanje',
    term: {me: 'Sigurno prijavljivanje'},
    definition: {me: 'Obraćanje platformi, školi ili institucijama kada se primijeti digitalno nasilje.'},
  },
  {
    slug: 'sigurnosne-postavke',
    term: {me: 'Sigurnosne postavke'},
    definition: {me: 'Opcije koje štite nalog (lozinka, autentifikacija u dva koraka i sl.).'},
  },
  {
    slug: 'trolovanje',
    term: {me: 'Trolovanje (trolling)'},
    definition: {me: 'Namjerno provociranje drugih korisnika uvredljivim ili provokativnim komentarima.'},
  },
  {
    slug: 'viralno-sirenje',
    term: {me: 'Viralno širenje'},
    definition: {me: 'Brzo širenje sadržaja među velikim brojem korisnika.'},
  },
];

/**
 * Whether the glossary is complete in a language: only then does it get its
 * page (/sta-znaci) and footer link. Montenegrin only, until the client
 * sends English definitions.
 */
export function hasGlossary(locale: Locale): boolean {
  return glossary.every((entry) => entry.term[locale] && entry.definition[locale]);
}

export function glossaryEntry(slug: string): GlossaryEntry | undefined {
  return glossary.find((entry) => entry.slug === slug);
}
