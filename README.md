# White-label Astro starter — algemene website

Schaalbare Astro + Tailwind starter voor **elke** zakelijke website: een dienstenbedrijf,
een restaurant, een SaaS-product of een portfolio. **Alle bedrijfsdata staat in de config** —
geen enkel `.astro`-bestand bevat hardcoded proza.

> De starter is **Nederlandstalig** en gericht op de Nederlandse markt (KvK, btw, openingstijden).
> Wil je een meertalige site, voeg dan per taal een `locale` toe — zie [Taal](#taal).

## Stack

| Package | Versie |
| --- | --- |
| [Astro](https://astro.build) | 7.3 |
| [Tailwind CSS](https://tailwindcss.com) | 4.3 |
| [@astrojs/sitemap](https://docs.astro.build/en/recipes/sitemap/) | 3.7 |
| [@astrojs/check](https://docs.astro.build/en/reference/cli-reference/#astro-check) | 0.9 |
| TypeScript | 6.0 |

Astro 7 vereist **Node.js >= 22.12**.

## Quickstart

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview
npm run check    # TypeScript + Astro diagnostics
```

## Single Source of Truth

| Bestand | Bevat |
| --- | --- |
| `src/config/site.types.ts` | **Het contract**: alle interfaces, `SectionKey`, dagnamen |
| `src/config/site.config.ts` | Thema, site-info, bedrijfstype, legal, contact, locatie, openingstijden, socials, paginateksten en de volgorde van de homepage |
| `src/config/content/index.ts` | De tekstblokken: features, process, work, testimonials, faq, stats, about |

Rebrande de site door die bestanden aan te passen — er is geen `.astro`-bestand dat je
hoeft openen voor tekst.

### Het kernprincipe: alles is optioneel

De types zijn zo ontworpen dat **geen enkel veld verplicht is als de site het niet heeft**:

| Ontbreekt | Gevolg |
| --- | --- |
| `location` | Geen adres, geen geo, geen `PostalAddress` in de JSON-LD |
| `openingHours` | Geen openingstijden op de contactpagina of in de structured data |
| `legal.kvk` / `legal.btw` | Geen registratieparagraaf, geen `vatID` |
| `contact.phone` | Header en CTA-banner vallen terug op e-mail |
| `contact.formEndpoint` | Het contactformulier wordt helemaal niet gerenderd |
| `content.team` | De team-sectie op `/over-ons` verdwijnt |
| `site.ogImage` | Geen `og:image`-tags; `twitter:card` wordt `summary` |

Om dit te testen: leeg een blok in `content/index.ts` of haal een sleutel uit
`content.sections` — de site blijft bouwen en de sectie is weg.

### De homepage is een lijst

`content.sections` bepaalt welke secties in welke volgorde verschijnen:

```ts
sections: ['hero', 'features', 'process', 'work', 'testimonials', 'faq', 'cta']
```

`src/pages/index.astro` kijkt elke sleutel op in een registry van componenten. Voeg een
nieuwe sectie toe door een component te maken en één regel toe te voegen.

### Generieke namen, vaste routes

De secties heten neutraal — `FeaturesSection` en `WorkSection` werken voor diensten,
functies, producten, een menu of een portfolio. De **routes blijven** `/diensten`,
`/cases`, `/over-ons` en `/contact`, omdat die in `content.navigation` staan en dus
configureerbaar zijn: verander de `href` en de hele site volgt mee.

Wil je een restaurant? Zet `content.features.items` op je gerechten en
`features.detailPageHref` op `/menu` — verder hoeft niets.

### Extra pagina's

`content.extraPages` levert automatisch statische routes op via `src/pages/[slug].astro`:

```ts
{ slug: 'privacy', title: 'Privacyverklaring', body: ['…', { heading: 'Cookies', text: '…' }] }
```

### Themawissel

`theme.primaryColor` (standaard `#7C0902`) wordt door `BaseLayout.astro` als
`--brand-primary` op `:root` gezet. `src/styles/global.css` koppelt die variabelen
aan het Tailwind-thema, zodat `bg-primary`, `text-primary` en `border-primary`
automatisch meeveranderen. `theme.fontFamily` doet hetzelfde voor `body`.

### Componenten en props

Componenten die props gebruiken casten `Astro.props` expliciet:

```astro
interface Props {
  title: string;
  breadcrumbs?: Crumb[];
}

const { title, breadcrumbs } = Astro.props as Props;
```

Zonder die cast vertrouwt de typing op de Astro-language-server. Bij een koude of
gecachete server wordt `Astro.props` `any`, waardoor alle destructured parameters
`implicitly any` worden. De cast maakt de types onafhankelijk van de editor.

## Projectstructuur

```
src/
  config/
    site.types.ts           ← alle interfaces + helpers (het contract)
    site.config.ts          ← de gegevens
    content/index.ts        ← de tekstblokken
  layouts/BaseLayout.astro   ← html, thema-CSS-variabelen, Header, Footer, SeoHead
  styles/global.css          ← Tailwind v4 @theme -> CSS-variabelen + reveal-animaties
  scripts/reveal.ts          ← IntersectionObserver voor scroll-reveals
  components/
    layout/  Header.astro, Footer.astro
    seo/     Schema.astro, SeoHead.astro
    sections/ Hero, FeaturesSection, ProcessSection, WorkSection,
              TestimonialsSection, FaqSection, CtaBanner
  pages/
    index.astro, over-ons.astro, diensten.astro, cases.astro, contact.astro
    [slug].astro            ← alle pagina's uit content.extraPages
    llms.txt.ts             ← Markdown-samenvatting voor AI-crawlers
public/
  robots.txt, favicon.svg, og-image.svg
```

## Animaties

Scroll-reveals draaien volledig op **één CSS-systeem plus één klein script**, zonder
animatiebibliotheek.

### Gebruik

Markeer elk element met `data-reveal` en geef optioneel een eigen vertraging:

```html
<h2 data-reveal>Onze diensten</h2>
<h3 data-reveal style="--reveal-delay: 200ms">…</h3>
```

De meeste secties doen dit met een `.map((item, index) => …)`, zodat de vertraging
uit de index komt in plaats van hardcoded te zijn.

### Hoe het werkt

1. `BaseLayout.astro` zet vóór de eerste paint een `.js`-klasse op `<html>`.
2. `src/scripts/reveal.ts` gebruikt **één gedeelde `IntersectionObserver`** om elk
   `[data-reveal]` te observeren en zet `data-reveal="in"` zodra het in beeld komt.
3. `global.css` verbergt `[data-reveal]` alleen als `.js` aanwezig is en speelt de
   `reveal-up` keyframe met `animation-delay: var(--reveal-delay, 0ms)`.

Elk element animeert **eenmalig** en wordt daarna niet meer geobserveerd.

### Bewustzijn & toegankelijkheid

- **Reduced motion** — `@media (prefers-reduced-motion: reduce)` schakelt de animatie
  uit; het script zet alle elementen dan direct op `in`.
- **Zonder JavaScript** — de verborgen startstaat is gekoppeld aan `.js`, dus de
  inhoud is nooit onzichtbaar voor bezoekers zonder JS.
- **Geen layout-shift** — alleen `opacity` en `transform` worden geanimeerd.

### Motion-tokens

Definieer in `src/styles/global.css` binnen `@theme`:

| Token | Standaard | Betekenis |
| --- | --- | --- |
| `--duration-reveal` | `600ms` | duur van één reveal |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | het "gevoel" |
| `--reveal-distance` | `16px` | hoe ver elementen opschuiven |

Pas deze drie waarden aan om de animatiesnelheid sitebreed te wijzigen.

## SEO / structured data

`Schema.astro` genereert een `@graph` met:

- Een **configureerbaar** type uit `business.schemaType` (standaard `Organization`,
  bv. `LocalBusiness`, `ProfessionalService`, `Restaurant`, `NGO`) met persistente
  `@id` `{url}/#organization`, plus gekoppelde `WebSite` en `WebPage` nodes
- `inLanguage` uit `site.locale`, enkel en met een fallback op `nl-NL`
- **Conditionele velden** — `PostalAddress`, `GeoCoordinates`, `areaServed`,
  `openingHoursSpecification`, `vatID`, KvK als `identifier`, `sameAs` en `priceRange`
  worden alleen uitgestuurd als de bijbehorende data in de config staat
- `hasOfferCatalog` / `makesOffer`, dynamisch uit `content.features.items`;
  `priceCurrency` komt uit `business.currency` en `PriceSpecification` verschijnt
  alleen wanneer een item een `meta` (prijs) heeft
- `BreadcrumbList` zodra een pagina `breadcrumbs` doorgeeft

`SeoHead.astro` bouwt de titel volgens `[Pagina] | Name – Slogan`, de canonical URL
uit `import.meta.env.SITE` + pathname, OpenGraph (met `og:locale` uit `site.locale`),
Twitter Card en robots-tags.

Let op: `Astro.site` en `Astro.generator` zijn gedepreciateerd in Astro 7 en worden een
harde fout in Astro 8. Deze starter gebruikt daarom `import.meta.env.SITE` en zendt geen
`<meta name="generator">` mee. Die tag is een relicum uit de html-validators van de
jaren 2000 en wordt door geen zoekmachine gebruikt.

`FaqSection.astro` voegt een eigen `FAQPage` JSON-LD toe aan dezelfde config-data,
maar alleen als er ook FAQ-items zijn.

## Taal

De starter is Nederlandstalig. `site.locale` (standaard `'nl-NL'`) stuurt:

- het `lang`-attribuut op `<html>`
- `inLanguage` in de JSON-LD
- `og:locale` in de OpenGraph-tags

De dagnamen staan als `DAY_NAMES_NL` en `DAY_NAMES_NL_CAPITALIZED` in
`src/config/site.types.ts` en worden gedeeld door de contactpagina en `llms.txt`.
Voor een meertalige site verhuis je die tabellen naar een taalbestand en
parameteriseer je `content.pages` per taal.

## GEO (Generative Engine Optimization)

- `GET /llms.txt` — Markdown-samenvatting (propositie, basisgegevens, openingstijden,
  aanbod, werkwijze, projecten, testimonials, FAQ, cijfers) gegenereerd uit de config.
  Secties zonder data worden weggelaten, dus ook hier geldt: leeg is weg.
- `public/robots.txt` — expliciete `Allow` voor `GPTBot`, `OAI-SearchBot`,
  `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot` e.a.

## Guardrails

- Uitsluitend `.astro` + Tailwind; geen React/Vue/Svelte, geen UI-library
- Minimale client-side JavaScript: het mobiele hamburgermenu (inline) en
  `src/scripts/reveal.ts` voor scroll-reveals — verder geen framework-runtime
- Elke animatie respecteert `prefers-reduced-motion`; zonder JavaScript blijft alle
  inhoud zichtbaar
- Strikt één `<h1>` per pagina, semantische `h2`/`h3`
- Betekenisvolle anchor-teksten en `aria-label`s op knoppen
- Sitemap via `@astrojs/sitemap` (`sitemap-index.xml`)
- Geen enkel `.astro`-bestand bevat bedrijfsproza; tekst hoort in de config

## Let op bij overname

De meegeleverde waarden zijn **placeholders** (`example.nl`, `00000000`,
`formspree.io/f/REPLACE_ME`) en mogen niet live:

1. `site.url` → je echte domein. `astro.config.mjs` leest dit bestand, dus één wijziging volstaat.
2. `site.name`, `slogan`, `description`, `legalName` → je eigen gegevens. De `description`
   verschijnt op elke pagina en in de structured data.
3. `legal.kvk` / `legal.btw` → echte nummers, of verwijder het hele `legal`-blok als je die niet hebt.
4. `contact.formEndpoint` → je eigen endpoint, of verwijder de sleutel om het formulier te verwijderen.
5. `location` / `openingHours` → echte gegevens, of verwijder de sleutels. Google toets zichtbare NAP-gegevens aan het structured data, dus verwijder ze aan beide kanten.
6. `business.schemaType` → kies het type dat bij je bedrijf past; controleer de output in Google's Rich Results Test.
7. `content.extraPages` → vervang de placeholder-teksten van `privacy` en `voorwaarden` door je eigen juridische teksten.
8. `public/favicon.svg` en `public/og-image.svg` → vervang door je eigen merk; de OG-tekst staat hardcoded in de SVG.
9. `theme.fontFamily` → de starter noemt `Inter` maar laadt geen webfont. Wil je die echt, voeg dan een `@font-face` of `<link>` toe in `BaseLayout.astro`.
10. `content.navigation` → de `href`s bepalen de routes; houd ze synchroon met de bestaande pagina-bestanden.

### Checks na het overnemen

```bash
npm run check   # types
npm run build   # alle routes
```

En grep de output op restanten van de placeholders:

```bash
Select-String -Path dist\*.html, dist\**\*.html -Pattern 'example.nl','REPLACE_ME','00000000'
```