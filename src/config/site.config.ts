/**
 * SINGLE SOURCE OF TRUTH — alleen de gegevens
 * ------------------------------------------
 * Types staan in `site.types.ts`; de tekstblokken staan in `content/`.
 * Rebrande de site door deze bestanden aan te passen — geen `.astro`-bestand
 * bevat hardcoded bedrijfsdata.
 *
 * De onderstaande waarden zijn bewust herkenbaar als PLACEHOLDERS, zodat ze
 * niet per ongeluk live gaan.
 */
import type { SiteConfig } from './site.types';
import { features, process, work, testimonials, faq, stats, about } from './content';

const siteConfig: SiteConfig = {
  theme: {
    primaryColor: '#7C0902',
    primaryHover: '#5F0701',
    neutralBg: '#FDFBF7',
    textColor: '#1C1917',
    fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  },

  site: {
    name: 'Voorbeeld Bedrijf',
    slogan: 'Een heldere propositie in één zin',
    description:
      'Vervang deze beschrijving door wat jou bedrijf doet, voor wie en waarom. Deze tekst verschijnt onder de H1, in de OpenGraph-tags en in de structured data.',
    url: 'https://example.nl',
    locale: 'nl-NL',
    ogImage: '/og-image.svg',
    favicon: '/favicon.svg',
  },

  business: {
    schemaType: 'Organization',
    currency: 'EUR',
  },

  legal: {
    kvk: '00000000',
    btw: 'NL000000000B01',
    privacyPolicyUrl: '/privacy',
    termsUrl: '/voorwaarden',
  },

  contact: {
    phone: '+31000000000',
    email: 'info@example.nl',
    bookingUrl: 'https://example.com/boeken',
    formEndpoint: 'https://formspree.io/f/REPLACE_ME',
    formIntro: 'Vul het formulier in, dan nemen wij contact op.',
  },

  location: {
    streetAddress: 'Voorbeeldstraat 1',
    postalCode: '1000 AA',
    addressLocality: 'Amsterdam',
    addressCountry: 'NL',
    geo: { latitude: 52.3765, longitude: 4.8832 },
    areaServed: ['Nederland'],
  },

  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '17:30' },
    { days: ['Friday'], opens: '09:00', closes: '15:00' },
  ],

  socials: {
    linkedin: 'https://www.linkedin.com/company/example',
    googleMaps: 'https://www.google.com/maps',
    instagram: 'https://www.instagram.com/example',
  },

  content: {
    navigation: [
      { label: 'Diensten', href: '/diensten' },
      { label: 'Cases', href: '/cases' },
      { label: 'Over ons', href: '/over-ons' },
      { label: 'Contact', href: '/contact' },
    ],
    ctaButton: { label: 'Neem contact op', href: '/contact' },
    heroSecondaryCta: { label: 'Bekijk onze cases', href: '/cases' },

    hero: {
      badge: 'Welkom bij ons',
    },

    sections: ['hero', 'features', 'process', 'work', 'testimonials', 'faq', 'cta'],

    pages: {
      diensten: {
        title: 'Diensten',
        intro: 'Wat wij kunnen doen. Elk onderdeel heeft een heldere omschrijving.',
        description: 'Het aanbod van Voorbeeld Bedrijf.',
      },
      cases: {
        title: 'Cases',
        intro: 'Een selectie van projecten en de resultaten die ze opleverden.',
        description: 'Cases van Voorbeeld Bedrijf.',
      },
      'over-ons': {
        title: 'Over ons',
        intro: 'Maak kennis met het team en de manier van werken.',
        description: 'Over Voorbeeld Bedrijf.',
      },
      contact: {
        title: 'Contact',
        intro: 'Je vraag staat klaar, of je nu belt, mailt of het formulier gebruikt.',
        description: 'Contactgegevens van Voorbeeld Bedrijf.',
      },
    },

    features,
    process,
    work,
    testimonials,
    faq,
    stats,
    about,

    contactPage: {
      title: 'Contact',
      intro: 'Je vraag staat klaar, of je nu belt, mailt of het formulier gebruikt.',
      columnsHeading: 'Bedrijfsgegevens',
      formHeading: 'Stuur een bericht',
    },

    extraPages: [
      {
        slug: 'privacy',
        title: 'Privacyverklaring',
        intro: 'Hoe wij met jouw gegevens omgaan.',
        body: [
          {
            heading: 'Welke gegevens wij verwerken',
            text: 'Vervang deze alinea door de werkelijke verwerking van persoonsgegevens.',
          },
          {
            heading: 'Waarom wij die gegevens verwerken',
            text: 'Vervang deze alinea door de grondslag en het doel van de verwerking.',
          },
        ],
      },
      {
        slug: 'voorwaarden',
        title: 'Algemene voorwaarden',
        intro: 'De afspraken die gelden bij gebruik van deze website.',
        body: ['Vervang deze alinea door de werkelijke voorwaarden.'],
      },
    ],
  },
};

export default siteConfig;