import type {Locale} from '@/lib/i18n';

/**
 * The glossary ("Šta znači"): the client's terms and definitions, verbatim,
 * in the client's order. English translations are ours, made with the
 * client's permission; the page lists terms A to Z in each language.
 *
 * Texts mark a term by hand where it should be explained, in the message
 * itself: `[[digitalnog nasilja|digitalno-nasilje]]` is the words as they
 * stand in the sentence, then the term's slug. `GlossedText` turns the mark
 * into a popover with the definition; a slug that isn't here, or a term with
 * no definition in the page's language, stays plain text. Mark a term once
 * per page, the first time it appears in running text, never in headings,
 * buttons or the report flow.
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
    term: {me: 'Blokiranje (block)', en: 'Blocking'},
    definition: {
      me: 'Mogućnost da spriječiš drugu osobu da te kontaktira ili vidi tvoj profil.',
      en: 'The option to stop another person from contacting you or seeing your profile.',
    },
  },
  {
    slug: 'digitalna-empatija',
    term: {me: 'Digitalna empatija', en: 'Digital empathy'},
    definition: {
      me: 'Sposobnost da razumijemo osjećaje drugih u internet komunikaciji.',
      en: 'The ability to understand how others feel when we communicate online.',
    },
  },
  {
    slug: 'digitalna-pismenost',
    term: {me: 'Digitalna pismenost', en: 'Digital literacy'},
    definition: {
      me: 'Znanje i vještine za sigurno i odgovorno korišćenje interneta.',
      en: 'The knowledge and skills to use the internet safely and responsibly.',
    },
  },
  {
    slug: 'digitalni-trag',
    term: {me: 'Digitalni trag', en: 'Digital footprint'},
    definition: {
      me: 'Svi podaci koje ostavljaš na internetu tokom korišćenja uređaja i aplikacija.',
      en: 'All the data you leave on the internet while using devices and apps.',
    },
  },
  {
    slug: 'digitalno-nasilje',
    term: {me: 'Digitalno nasilje (cyberbullying)', en: 'Cyberbullying (digital violence)'},
    definition: {
      me: 'Svako uznemiravanje, vrijeđanje ili prijetnja koja se dešava putem interneta, društvenih mreža, igrica ili poruka.',
      en: 'Any harassment, insult or threat that happens over the internet, social media, games or messages.',
    },
  },
  {
    slug: 'doxxing',
    term: {me: 'Doxxing (otkrivanje podataka)', en: 'Doxxing'},
    definition: {
      me: 'Objavljivanje nečijih privatnih podataka na internetu bez dozvole.',
      en: "Publishing someone's private information on the internet without their permission.",
    },
  },
  {
    slug: 'dvofaktorska-autentifikacija',
    term: {me: 'Dvofaktorska autentifikacija (2FA)', en: 'Two-factor authentication (2FA)'},
    definition: {
      me: 'Dodatni sloj zaštite pri prijavi na nalog (npr. kod putem SMS-a).',
      en: 'An extra layer of protection when you sign in to an account (e.g. a code sent by SMS).',
    },
  },
  {
    slug: 'govor-mrznje',
    term: {me: 'Govor mržnje', en: 'Hate speech'},
    definition: {
      me: 'Sadržaj koji širi mržnju ili diskriminaciju prema osobi ili grupi zbog njihovog identiteta (npr. vjera, nacionalnost, pol).',
      en: 'Content that spreads hatred or discrimination against a person or group because of who they are (e.g. religion, nationality, gender).',
    },
  },
  {
    slug: 'grooming',
    term: {me: 'Grooming', en: 'Grooming'},
    definition: {
      me: 'Kada odrasla osoba putem interneta gradi povjerenje s djetetom radi zloupotrebe.',
      en: "When an adult builds a child's trust over the internet in order to abuse them.",
    },
  },
  {
    slug: 'javna-objava',
    term: {me: 'Javna objava (public post)', en: 'Public post'},
    definition: {
      me: 'Sadržaj koji može vidjeti svako na internetu.',
      en: 'Content that anyone on the internet can see.',
    },
  },
  {
    slug: 'kradja-identiteta',
    term: {me: 'Krađa identiteta', en: 'Identity theft'},
    definition: {
      me: 'Korišćenje tuđih ličnih podataka ili profila bez dozvole.',
      en: "Using someone else's personal data or profile without permission.",
    },
  },
  {
    slug: 'lazni-profil',
    term: {me: 'Lažni profil (fake account)', en: 'Fake account'},
    definition: {
      me: 'Profil napravljen pod lažnim imenom ili u tuđe ime radi obmane ili uznemiravanja.',
      en: "A profile made under a false name or in someone else's name, to deceive or harass.",
    },
  },
  {
    slug: 'malware',
    term: {me: 'Malware (zlonamjerni softver)', en: 'Malware (malicious software)'},
    definition: {
      me: 'Programi koji mogu oštetiti uređaj ili ukrasti podatke.',
      en: 'Programs that can damage a device or steal data.',
    },
  },
  {
    slug: 'moderator',
    term: {me: 'Moderator', en: 'Moderator'},
    definition: {
      me: 'Osoba koja prati sadržaj i uklanja neprikladne objave u online zajednici.',
      en: 'A person who watches the content in an online community and removes inappropriate posts.',
    },
  },
  {
    slug: 'online-zajednica',
    term: {me: 'Online zajednica', en: 'Online community'},
    definition: {
      me: 'Grupa ljudi koja komunicira putem neke digitalne platforme.',
      en: 'A group of people who communicate through a digital platform.',
    },
  },
  {
    slug: 'online-reputacija',
    term: {me: 'Online reputacija', en: 'Online reputation'},
    definition: {
      me: 'Slika koju osoba ima na internetu na osnovu svojih objava i aktivnosti.',
      en: 'The image a person has on the internet, based on their posts and activity.',
    },
  },
  {
    slug: 'online-uznemiravanje',
    term: {me: 'Online uznemiravanje', en: 'Online harassment'},
    definition: {
      me: 'Ponavljano slanje uvredljivih ili prijetećih poruka s ciljem da se osoba zastraši ili uznemiri.',
      en: 'Repeatedly sending insulting or threatening messages to frighten or upset someone.',
    },
  },
  {
    slug: 'online-ucjena',
    term: {me: 'Online ucjena (sextortion)', en: 'Sextortion (online blackmail)'},
    definition: {
      me: 'Prijetnja objavom privatnog sadržaja kako bi se osoba prisilila na nešto.',
      en: 'Threatening to publish private content to force someone into something.',
    },
  },
  {
    slug: 'online-prevara',
    term: {me: 'Online prevara (scam)', en: 'Online scam'},
    definition: {
      me: 'Pokušaj da se neko obmane na internetu radi novčane ili druge koristi.',
      en: 'An attempt to deceive someone on the internet for money or other gain.',
    },
  },
  {
    slug: 'phishing',
    term: {me: 'Phishing', en: 'Phishing'},
    definition: {
      me: 'Lažne poruke ili stranice koje pokušavaju ukrasti lozinke i druge podatke.',
      en: 'Fake messages or websites that try to steal passwords and other data.',
    },
  },
  {
    slug: 'prijava-sadrzaja',
    term: {me: 'Prijava sadržaja (report)', en: 'Reporting content'},
    definition: {
      me: 'Opcija kojom se platformi prijavljuje uvredljiv ili opasan sadržaj.',
      en: 'The option to report offensive or dangerous content to the platform.',
    },
  },
  {
    slug: 'pristanak',
    term: {me: 'Pristanak (consent)', en: 'Consent'},
    definition: {
      me: 'Jasna dozvola osobe prije dijeljenja njenog sadržaja ili podataka.',
      en: "A person's clear permission before their content or data is shared.",
    },
  },
  {
    slug: 'privatna-poruka',
    term: {me: 'Privatna poruka (DM)', en: 'Direct message (DM)'},
    definition: {
      me: 'Poruka poslana direktno jednoj osobi putem platforme.',
      en: 'A message sent directly to one person through a platform.',
    },
  },
  {
    slug: 'privatnost-naloga',
    term: {me: 'Privatnost naloga', en: 'Account privacy'},
    definition: {
      me: 'Postavke koje određuju ko može vidjeti vaš profil, objave i lične podatke.',
      en: 'Settings that decide who can see your profile, posts and personal information.',
    },
  },
  {
    slug: 'screenshot',
    term: {me: 'Screenshot (snimak ekrana)', en: 'Screenshot'},
    definition: {
      me: 'Slika onoga što se vidi na ekranu — često služi kao dokaz.',
      en: 'A picture of what you see on the screen — often used as evidence.',
    },
  },
  {
    slug: 'sexting-zloupotreba',
    term: {me: 'Sexting zloupotreba', en: 'Sexting abuse'},
    definition: {
      me: 'Dijeljenje tuđih intimnih fotografija ili poruka bez pristanka.',
      en: "Sharing someone else's intimate photos or messages without their consent.",
    },
  },
  {
    slug: 'sigurno-prijavljivanje',
    term: {me: 'Sigurno prijavljivanje', en: 'Safe reporting'},
    definition: {
      me: 'Obraćanje platformi, školi ili institucijama kada se primijeti digitalno nasilje.',
      en: 'Turning to the platform, the school or the authorities when you notice cyberbullying.',
    },
  },
  {
    slug: 'sigurnosne-postavke',
    term: {me: 'Sigurnosne postavke', en: 'Security settings'},
    definition: {
      me: 'Opcije koje štite nalog (lozinka, autentifikacija u dva koraka i sl.).',
      en: 'Options that protect an account (password, two-step verification and so on).',
    },
  },
  {
    slug: 'trolovanje',
    term: {me: 'Trolovanje (trolling)', en: 'Trolling'},
    definition: {
      me: 'Namjerno provociranje drugih korisnika uvredljivim ili provokativnim komentarima.',
      en: 'Deliberately provoking other users with offensive or provocative comments.',
    },
  },
  {
    slug: 'viralno-sirenje',
    term: {me: 'Viralno širenje', en: 'Going viral'},
    definition: {
      me: 'Brzo širenje sadržaja među velikim brojem korisnika.',
      en: 'Content spreading quickly among a large number of users.',
    },
  },
];

/**
 * Whether the glossary is complete in a language: only then does it get its
 * page (/sta-znaci) and footer link.
 */
export function hasGlossary(locale: Locale): boolean {
  return glossary.every((entry) => entry.term[locale] && entry.definition[locale]);
}

export function glossaryEntry(slug: string): GlossaryEntry | undefined {
  return glossary.find((entry) => entry.slug === slug);
}
