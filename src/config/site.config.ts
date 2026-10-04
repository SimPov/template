/**
 * SINGLE SOURCE OF TRUTH
 * ----------------------
 * Rebrand the entire website by editing this file only.
 * No `.astro` file may contain hardcoded business data.
 */

export interface ThemeConfig {
  /** Merkprimary. Wordt doorgegeven als `--color-primary` (Tailwind: `bg-primary`). */
  primaryColor: string;
  primaryHover: string;
  neutralBg: string;
  textColor: string;
}

export interface SiteConfig {
  theme: ThemeConfig;
  site: {
    name: string;
    legalName: string;
    slogan: string;
    description: string;
    /** Canonical basis, zonder trailing slash. bv. 'https://studiobruikbaar.nl' */
    url: string;
  };
  legal: {
    kvk: string;
    btw: string;
    privacyPolicyUrl: string;
    termsUrl: string;
  };
  contact: {
    /** Internationaal formaat, bv. '+31612345678' */
    phone: string;
    email: string;
    bookingUrl: string;
    /** Endpoint waar het contactformulier naartoe post (bv. Formspree). */
    formEndpoint: string;
  };
  location: {
    streetAddress: string;
    postalCode: string;
    addressLocality: string;
    addressCountry: 'NL';
    geo: { latitude: number; longitude: number };
    areaServed: string[];
  };
  openingHours: Array<{ days: string[]; opens: string; closes: string }>;
  socials: {
    linkedin: string;
    googleMaps: string;
    kvkRegistry: string;
    instagram?: string;
  };
  content: {
    navigation: Array<{ label: string; href: string }>;
    ctaButton: { label: string; href: string };
    heroSecondaryCta: { label: string; href: string };
    services: Array<{
      id: string;
      title: string;
      shortDesc: string;
      deliverables: string[];
      priceTier: string;
    }>;
    process: Array<{ step: number; title: string; description: string }>;
    cases: Array<{
      client: string;
      title: string;
      challenge: string;
      result: string;
      metrics: string[];
    }>;
    team: Array<{ name: string; role: string; bio: string; linkedin: string }>;
    testimonials: Array<{ author: string; company: string; quote: string }>;
    faq: Array<{ question: string; answer: string }>;
    stats: Array<{ value: string; label: string }>;
  };
}

const siteConfig: SiteConfig = {
  theme: {
    primaryColor: '#7C0902',
    primaryHover: '#5F0701',
    neutralBg: '#FDFBF7',
    textColor: '#1C1917',
  },

  site: {
    name: 'Studio Bruikbaar',
    legalName: 'Studio Bruikbaar B.V.',
    slogan: 'Websites die verkopen voor ondernemers',
    description:
      'Studio Bruikbaar bouwt snelle, converterende websites voor zzp\u2019ers en kleine bedrijven in de Randstad. Van strategie tot livegang in drie weken.',
    url: 'https://studiobruikbaar.nl',
  },

  legal: {
    kvk: '87654321',
    btw: 'NL863456789B01',
    privacyPolicyUrl: '/privacy',
    termsUrl: '/voorwaarden',
  },

  contact: {
    phone: '+31612345678',
    email: 'hallo@studiobruikbaar.nl',
    bookingUrl: 'https://cal.com/studio-bruikbaar/introductie',
    formEndpoint: 'https://formspree.io/f/xjvqzkwd',
  },

  location: {
    streetAddress: 'Keizersgracht 241',
    postalCode: '1016 EA',
    addressLocality: 'Amsterdam',
    addressCountry: 'NL',
    geo: { latitude: 52.3765, longitude: 4.8832 },
    areaServed: ['Nederland', 'Randstad', 'Amsterdam', 'Utrecht', 'Den Haag'],
  },

  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '17:30' },
    { days: ['Friday'], opens: '09:00', closes: '15:00' },
  ],

  socials: {
    linkedin: 'https://www.linkedin.com/company/studio-bruikbaar',
    googleMaps: 'https://www.google.com/maps/place/Keizersgracht+241+Amsterdam',
    kvkRegistry: 'https://www.kvk.nl/orderstraat-product-kiezen/?kvk=87654321',
    instagram: 'https://www.instagram.com/studiobruikbaar',
  },

  content: {
    navigation: [
      { label: 'Diensten', href: '/diensten' },
      { label: 'Cases', href: '/cases' },
      { label: 'Over ons', href: '/over-ons' },
      { label: 'Contact', href: '/contact' },
    ],
    ctaButton: { label: 'Plan een kennismaking', href: '/contact' },
    heroSecondaryCta: { label: 'Bekijk onze cases', href: '/cases' },

    services: [
      {
        id: 'websites',
        title: 'Moderne bedrijfswebsite',
        shortDesc: 'Een snelle, responsieve website die bezoekers overtuigt om contact op te nemen.',
        deliverables: [
          'Uitwerkelijk in Figma',
          'Responsief design (mobiel, tablet, desktop)',
          'Astro + Tailwind, razendsnel geladen',
          'Basis SEO en toegankelijkheidscheck',
          'Eenvoudig beheer via één configuratiebestand',
        ],
        priceTier: 'vanaf €1.950',
      },
      {
        id: 'webshops',
        title: 'Webshop & online verkopen',
        shortDesc: 'Een verkoopklaar platform met betaling, voorraad en koppelingen naar je boekhouding.',
        deliverables: [
          'Kassysteem met iDEAL en creditcard',
          'Productbeheer en voorraadsync',
          'Automatische orderbevestigingen',
          'Koppeling met boekhoudsoftware',
          'Training in beheer',
        ],
        priceTier: 'vanaf €3.900',
      },
      {
        id: 'seo',
        title: 'Lokale SEO & vindbaarheid',
        shortDesc: 'Beter gevonden worden in Google, ook wanneer er lokaal naar je dienst gezocht wordt.',
        deliverables: [
          'Lokale SEO-optimalisatie',
          'Google Business Profile beheer',
          'Structurele data voor Google',
          'Maandelijkse rapportage',
        ],
        priceTier: 'vanaf €450 per maand',
      },
      {
        id: 'onderhoud',
        title: 'Onderhoud & optimalisatie',
        shortDesc: 'Wij houden je website snel, veilig en foutloos, zodat je er niet aan hoeft te denken.',
        deliverables: [
          'Maandelijkse updates en back-ups',
          'Toegankelijkheids- en snelheidsmonitoring',
          'Directe lijn met je vaste contactpersoon',
          'Kosteloos content aanpassen',
        ],
        priceTier: 'vanaf €149 per maand',
      },
    ],

    process: [
      { step: 1, title: 'Kick-off & strategie', description: 'We bespreken je doelgroep, concurrenten en gewenste acties. Binnen een week heb je een duidelijke koers.' },
      { step: 2, title: 'Ontwerp & bouw', description: 'Je krijgt eerst een klikbaar ontwerp. Na akkoord bouwen we de website in snelle, moderne techniek.' },
      { step: 3, title: 'Testen & optimaliseren', description: 'We testen op snelheid, mobiel en toegankelijkheid en verbeteren waar dat de conversie oplevert.' },
      { step: 4, title: 'Lanceren & beheren', description: 'We gaan live, dragen alles over en blijven bereikbaar voor vragen, aanpassingen en groei.' },
    ],

    cases: [
      {
        client: 'Bakkerij De Korenbloem',
        title: 'Van buurtbakkerij naar landelijke webshop',
        challenge: 'Een fysieke bakkerij wilde online bestellingen aannemen zonder een zwaar platform.',
        result: 'Een snelle bestelwebsite met iDEAL en ophalen of bezorgen als optie.',
        metrics: ['+38% online omzet', '1,1s laadtijd', '4,9\u2605 beoordeling'],
      },
      {
        client: 'Bureau Zandvliet',
        title: 'Vakkundig online zichtbaar in de Randstad',
        challenge: 'Een architectenbureau zonder website, volledig afhankelijk van mond-op-mond verwijzingen.',
        result: 'Een portfolio-site met lokale SEO die structurele data aan Google voedt.',
        metrics: ['#1 in lokale zoekresultaten', '3x aanvragen per maand'],
      },
      {
        client: 'Fysiotherapiepraktijk Van Dam',
        title: 'Online afspraken inplannen',
        challenge: 'De praktijk werd telefonisch overspoeld en was slecht bereikbaar.',
        result: 'Een snelle site met directe online agenda en duidelijke behandelingen.',
        metrics: ['-65% telefoontjes', '2,4s \u2192 0,8s laadtijd'],
      },
    ],

    team: [
      { name: 'Sanne de Vries', role: 'Oprichter & webdesigner', bio: 'Sanne combineert typografie met conversie: mooi én effectief. Al tien jaar websites voor ondernemers.', linkedin: 'https://www.linkedin.com/in/sanne-de-vries' },
      { name: 'Bram Hoekstra', role: 'Frontend developer', bio: 'Bram bouwt razendsnelle websites met Astro en Tailwind, altijd met toegankelijkheid als uitgangspunt.', linkedin: 'https://www.linkedin.com/in/bram-hoekstra' },
      { name: 'Fleur Jansen', role: 'SEO & content', bio: 'Fleur zorgt dat een website niet alleen mooi is, maar ook gevonden wordt. Specialisme: lokale SEO.', linkedin: 'https://www.linkedin.com/in/fleur-jansen' },
    ],

    testimonials: [
      { author: 'Yara el Amrani', company: 'Bakkerij De Korenbloem', quote: 'Onze online bestellingen lopen nu gewoon door. Binnen een week na livegang wisten we al dat het de moeite waard was.' },
      { author: 'Joost van Dam', company: 'Fysiotherapiepraktijk Van Dam', quote: 'Duidelijk, snel en geen gedoe. Ze nemen gewoon de telefoon over als ik iets wil aanpassen.' },
      { author: 'Marijke Zandvliet', company: 'Bureau Zandvliet', quote: 'We krijgen nu aanvragen van opdrachtgevers die ons nog nooit hebben gezien. Dat was precies het doel.' },
    ],

    faq: [
      { question: 'Hoe lang duurt het bouwen van een website?', answer: 'De meeste websites gaan binnen drie tot vier weken live. We plannen vooraf duidelijke momenten van oplevering, zodat je weet waar je aan toe bent.' },
      { question: 'Wat kost een website bij jullie?', answer: 'Een moderne bedrijfswebsite start vanaf €1.950. De uiteindelijke prijs hangt af van het aantal pagina\u2019s en functies, zoals een webshop of online agenda.' },
      { question: 'Kan ik de website zelf aanpassen?', answer: 'Ja. Je krijgt een overzichtelijke training en toegang tot een centrale configuratie. Teksten, kleuren en pagina\u2019s zijn daar eenvoudig aan te passen.' },
      { question: 'Wat gebeurt er na de livegang?', answer: 'Je bent niet aan ons vastgebonden. We blijven bereikbaar voor onderhoud, maar je kunt de website ook zelf door een andere partij laten beheren.' },
      { question: 'In welk gebied zijn jullie actief?', answer: 'Wij werken voor ondernemers in heel Nederland, met de nadruk op de Randstad. Op afstand werken we net zo goed als bij jou op locatie.' },
    ],

    stats: [
      { value: '120+', label: 'Websites geleverd' },
      { value: '3 weken', label: 'Gemiddelde doorlooptijd' },
      { value: '1,0s', label: 'Gemiddelde laadtijd' },
      { value: '9,6/10', label: 'Klantwaardering' },
    ],
  },
};

export default siteConfig;