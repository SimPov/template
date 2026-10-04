/**
 * CONFIG-TYPES
 * ------------
 * Vormt het contract van de starter. Alles in `site.config.ts` en
 * `src/config/content/*` moet aan deze types voldoen.
 *
 * Ontwerpprincipe: geen veld is verplicht als de site het niet heeft.
 * Een restaurant heeft geen `team`, een SaaS-bedrijf geen `openingHours`
 * en een eenmanszaak geen `legal.kvk`. Ontbrekende data betekent:
 * de bijbehorende sectie of veld wordt niet gerenderd.
 */

/** Sleutels van de secties die op de homepage in een vaste volgorde staan. */
export type SectionKey =
  | 'hero'
  | 'features'
  | 'process'
  | 'work'
  | 'testimonials'
  | 'faq'
  | 'cta';

export interface ThemeConfig {
  /** Merkprimary. Wordt doorgegeven als `--brand-primary` (Tailwind: `bg-primary`). */
  primaryColor: string;
  primaryHover: string;
  neutralBg: string;
  textColor: string;
  /** CSS font-family stack voor `body`. */
  fontFamily?: string;
}

export interface SiteInfo {
  name: string;
  slogan: string;
  description: string;
  /** Canonical basis, zonder trailing slash. bv. 'https://example.nl' */
  url: string;
  /** Taal van de site. Deze starter is Nederlandstalig; het veld is wel configureerbaar. */
  locale?: string;
  /** Juridische naam. Toont in de footer; valt terug op `name`. */
  legalName?: string;
  /** Pad in /public van de OG-afbeelding. */
  ogImage?: string;
  /** Pad in /public van het favicon. */
  favicon?: string;
}

export interface BusinessConfig {
  /** Schema.org-type van de organisatie. */
  schemaType?: string;
  /** ISO-valuta voor prijsinformatie in structured data, bv. 'EUR'. */
  currency?: string;
  /** Vrije tekst voor `priceRange`, bv. '€€'. Alleen tonen indien gevuld. */
  priceRange?: string;
}

export interface LegalConfig {
  kvk?: string;
  btw?: string;
  privacyPolicyUrl?: string;
  termsUrl?: string;
}

export interface ContactConfig {
  /** Internationaal formaat, bv. '+31612345678'. */
  phone?: string;
  email?: string;
  /** Directe boekings- of afspraaklink. */
  bookingUrl?: string;
  /** Endpoint waar het contactformulier naartoe post (bv. Formspree). */
  formEndpoint?: string;
  /** Optionele intro bij het contactformulier. */
  formIntro?: string;
}

export interface LocationConfig {
  streetAddress: string;
  postalCode?: string;
  addressLocality: string;
  /** ISO-landcode. Deze starter is Nederlandgericht, maar niet hardcoded. */
  addressCountry?: string;
  geo?: { latitude: number; longitude: number };
  areaServed?: string[];
}

export interface FeatureItem {
  /** Anker-id voor deep-links, bv. `#openingstijden`. */
  id: string;
  title: string;
  shortDesc: string;
  /** Bullets: diensten, functies, leverbaar, menu, etc. */
  details?: string[];
  /** Vrij tekst, bv. 'vanaf €1.950' of '12 uur per week'. */
  meta?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface WorkItem {
  id?: string;
  /** Klant, projectnaam of organisatie. */
  client?: string;
  title: string;
  /** Korte intro onder de titel. */
  summary?: string;
  /** Alinea's: aanpak, uitdaging, resultaat — vrij in te delen. */
  body?: string[];
  /** Labels onderaan, bv. metrics of tags. */
  tags?: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  /** Profiel- of social-link. Verbergt de link als leeg. */
  link?: string;
  /** Linklabel, bv. 'LinkedIn-profiel'. */
  linkLabel?: string;
}

export interface TestimonialItem {
  author: string;
  /** Bedrijf, rol of context. */
  company?: string;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

/** Extra marketingpagina's, gegenereerd door `src/pages/[slug].astro`. */
export interface ExtraPage {
  slug: string;
  title: string;
  /** Zichtbare intro onder de H1. */
  intro?: string;
  /** Meta-description; valt terug op `site.description`. */
  description?: string;
  /** Alinea's als platte string of als `{ heading, text }`-blokken. */
  body: string[] | Array<{ heading?: string; text: string }>;
}

/** Teksten per pagina, zodat pagina's geen eigen, hardcoded proza hebben. */
export interface PageMeta {
  title: string;
  intro?: string;
  description?: string;
}

export interface HomeSectionText {
  /** Badge boven de H1. Verbergt zichzelf als leeg. */
  badge?: string;
}

export interface ContactPageContent {
  title: string;
  intro?: string;
  formHeading?: string;
  columnsHeading?: string;
}
export interface SiteConfig {
  theme: ThemeConfig;
  site: SiteInfo;
  business: BusinessConfig;
  legal?: LegalConfig;
  contact: ContactConfig;
  location?: LocationConfig;
  openingHours?: Array<{ days: string[]; opens: string; closes: string }>;
  socials: Record<string, string>;
  content: {
    navigation: Array<{ label: string; href: string }>;
    /** Hoofd-CTA in header en banners. */
    ctaButton: { label: string; href: string };
    /** Tweede CTA in de hero. Optioneel. */
    heroSecondaryCta?: { label: string; href: string };
    /** Teksten van de hero-sectie. */
    hero: HomeSectionText;
    /** Optionele teksten van de afsluitende CTA-banner. */
    ctaHeading?: string;
    ctaIntro?: string;
    /** Volgorde van de homepage-secties. */
    sections: SectionKey[];
    /** Teksten van de vaste pagina's, keyed op slug. */
    pages: Record<string, PageMeta>;
    /** Sectieteksten; elk blok is optioneel. */
    features?: {
      heading: string;
      intro?: string;
      /** Toont de "Meer over …"-link naar deze pagina. */
      detailPageHref?: string;
      items: FeatureItem[];
    };
    process?: { heading: string; intro?: string; items: ProcessStep[] };
    work?: { heading: string; intro?: string; items: WorkItem[] };
    testimonials?: { heading: string; items: TestimonialItem[] };
    faq?: { heading: string; items: FaqItem[] };
    stats?: StatItem[];
    /** Teksten voor de over-ons-pagina. */
    about?: {
      mission?: { heading: string; paragraphs: string[] };
      values?: { heading: string; items: ValueItem[] };
      team?: { heading: string; items: TeamMember[] };
    };
    /** Teksten van de contactpagina. */
    contactPage?: ContactPageContent;
    /** Extra pagina's via `/[slug]`. */
    extraPages?: ExtraPage[];
  };
}

/** Nederlandse dagnamen, voor `llms.txt` en de contactpagina. */
export const DAY_NAMES_NL: Record<string, string> = {
  Monday: 'maandag',
  Tuesday: 'dinsdag',
  Wednesday: 'woensdag',
  Thursday: 'donderdag',
  Friday: 'vrijdag',
  Saturday: 'zaterdag',
  Sunday: 'zondag',
};

export const DAY_NAMES_NL_CAPITALIZED: Record<string, string> = {
  Monday: 'Maandag',
  Tuesday: 'Dinsdag',
  Wednesday: 'Woensdag',
  Thursday: 'Donderdag',
  Friday: 'Vrijdag',
  Saturday: 'Zaterdag',
  Sunday: 'Zondag',
};

/** Geeft de eerste niet-lege waarde terug, of `undefined`. */
export function firstDefined<T>(...values: Array<T | undefined | null | ''>): T | undefined {
  for (const value of values) {
    if (value !== undefined && value !== null && value !== '') return value as T;
  }
  return undefined;
}