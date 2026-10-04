/**
 * Content per onderwerp, zodat `site.config.ts` overzichtelijk blijft.
 * Elk bestand exporteert één blok uit `SiteConfig['content']`.
 *
 * Verwijder een blok (of leeg de `items`) en de bijbehorende sectie of
 * pagina-sectie wordt automatisch weggelaten.
 */
import type {
  FeatureItem,
  FaqItem,
  ProcessStep,
  StatItem,
  TeamMember,
  TestimonialItem,
  ValueItem,
  WorkItem,
} from '../site.types';

/** Algemene placeholder-content: dit is bewijsbaar geen echte onderneming. */
export const features: NonNullable<
  import('../site.types').SiteConfig['content']['features']
> = {
  heading: 'Wat wij doen',
  intro: 'Een korte omschrijving van het aanbod, in eigen woorden.',
  detailPageHref: '/diensten',
  items: [
    {
      id: 'advies',
      title: 'Advies en intake',
      shortDesc: 'Vervang dit door een korte beschrijving van dit aanbodonderdeel.',
      details: ['Punt één', 'Punt twee', 'Punt drie'],
      meta: 'vanaf €0',
    },
    {
      id: 'uitvoering',
      title: 'Uitvoering',
      shortDesc: 'Vervang dit door een korte beschrijving van dit aanbodonderdeel.',
      details: ['Punt één', 'Punt twee'],
    },
    {
      id: 'onderhoud',
      title: 'Onderhoud',
      shortDesc: 'Vervang dit door een korte beschrijving van dit aanbodonderdeel.',
      details: ['Punt één', 'Punt twee'],
      meta: 'per maand',
    },
    {
      id: 'extra',
      title: 'Voorbeeld onderdeel',
      shortDesc: 'Vervang dit door een korte beschrijving van dit aanbodonderdeel.',
      details: ['Punt één'],
    },
  ] satisfies FeatureItem[],
};

export const process: NonNullable<
  import('../site.types').SiteConfig['content']['process']
> = {
  heading: 'Onze werkwijze',
  intro: 'Duidelijke stappen en vaste momenten van oplevering.',
  items: [
    { title: 'Stap één', description: 'Beschrijf hier wat er in deze stap gebeurt.' },
    { title: 'Stap twee', description: 'Beschrijf hier wat er in deze stap gebeurt.' },
    { title: 'Stap drie', description: 'Beschrijf hier wat er in deze stap gebeurt.' },
    { title: 'Stap vier', description: 'Beschrijf hier wat er in deze stap gebeurt.' },
  ] satisfies ProcessStep[],
};

export const work: NonNullable<import('../site.types').SiteConfig['content']['work']> = {
  heading: 'Resultaten',
  intro: 'Een selectie van projecten en wat ze hebben opgeleverd.',
  items: [
    {
      id: 'voorbeeld-een',
      client: 'Klant één',
      title: 'Titel van project één',
      summary: 'Een korte omschrijving van de opdracht.',
      body: ['Wat het probleem was.', 'Wat wij hebben gedaan.'],
      tags: ['Resultaat A', 'Resultaat B'],
    },
    {
      id: 'voorbeeld-twee',
      client: 'Klant twee',
      title: 'Titel van project twee',
      summary: 'Een korte omschrijving van de opdracht.',
      body: ['Wat het probleem was.', 'Wat wij hebben gedaan.'],
      tags: ['Resultaat A'],
    },
    {
      id: 'voorbeeld-drie',
      client: 'Klant drie',
      title: 'Titel van project drie',
      summary: 'Een korte omschrijving van de opdracht.',
      body: ['Wat het probleem was.', 'Wat wij hebben gedaan.'],
      tags: ['Resultaat A', 'Resultaat B', 'Resultaat C'],
    },
  ] satisfies WorkItem[],
};

export const testimonials: NonNullable<
  import('../site.types').SiteConfig['content']['testimonials']
> = {
  heading: 'Wat klanten zeggen',
  items: [
    { author: 'Naam één', company: 'Bedrijf één', quote: 'Plaats hier een korte reactie van een klant.' },
    { author: 'Naam twee', company: 'Bedrijf twee', quote: 'Plaats hier een korte reactie van een klant.' },
    { author: 'Naam drie', company: 'Bedrijf drie', quote: 'Plaats hier een korte reactie van een klant.' },
  ] satisfies TestimonialItem[],
};

export const faq: NonNullable<import('../site.types').SiteConfig['content']['faq']> = {
  heading: 'Veelgestelde vragen',
  items: [
    { question: 'Wat is jullie aanbod?', answer: 'Beschrijf hier het aanbod in twee of drie zinnen.' },
    { question: 'Hoe werkt het?', answer: 'Beschrijf hier kort hoe het proces verloopt.' },
    { question: 'Wat kost het?', answer: 'Beschrijf hier kort wat het kost en wat daarvoor nodig is.' },
  ] satisfies FaqItem[],
};

export const stats: StatItem[] = [
  { value: '100+', label: 'Voorbeeldstatistiek' },
  { value: '4 weken', label: 'Voorbeelddoorlooptijd' },
  { value: '9,6/10', label: 'Voorbeeldwaardering' },
];

export const about = {
  mission: {
    heading: 'Onze missie',
    paragraphs: [
      'Vervang deze alinea door jouw verhaal: waarom dit werk bestaat en voor wie.',
      'Vervang deze tweede alinea door wat jullie concreet doen en waarom dat verschil maakt.',
    ],
  },
  values: {
    heading: 'Waar wij voor staan',
    items: [
      { title: 'Waarde één', description: 'Beschrijf hier kort waar deze waarde in de praktijk voor betekent.' },
      { title: 'Waarde twee', description: 'Beschrijf hier kort waar deze waarde in de praktijk voor betekent.' },
      { title: 'Waarde drie', description: 'Beschrijf hier kort waar deze waarde in de praktijk voor betekent.' },
      { title: 'Waarde vier', description: 'Beschrijf hier kort waar deze waarde in de praktijk voor betekent.' },
    ] satisfies ValueItem[],
  },
  team: {
    heading: 'Het team',
    items: [
      {
        name: 'Naam één',
        role: 'Functie',
        bio: 'Korte introductie van dit teamlid.',
        link: 'https://www.linkedin.com/',
        linkLabel: 'LinkedIn-profiel',
      },
      {
        name: 'Naam twee',
        role: 'Functie',
        bio: 'Korte introductie van dit teamlid.',
        link: 'https://www.linkedin.com/',
        linkLabel: 'LinkedIn-profiel',
      },
      {
        name: 'Naam drie',
        role: 'Functie',
        bio: 'Korte introductie van dit teamlid.',
      },
    ] satisfies TeamMember[],
  },
};