# White-label Astro starter — Nederlandse webdesignwebsite

Schaalbare Astro + Tailwind starter voor een Nederlandse zakelijke website.
**Alle bedrijfsdata staat in één bestand.**

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

`src/config/site.config.ts` bevat **alles**: thema, site-info, KvK/btw, contact,
adres + geo, openingstijden, socials, navigatie, diensten, werkwijze, cases, team,
testimonials, FAQ en statistieken. Rebrande de hele site door dat één bestand aan te
passen — geen enkel `.astro`-bestand bevat hardcoded bedrijfsdata.

### Themawissel

`theme.primaryColor` (standaard `#7C0902`) wordt door `BaseLayout.astro` als
`--brand-primary` op `:root` gezet. `src/styles/global.css` koppelt die variabelen
aan het Tailwind-thema, zodat `bg-primary`, `text-primary` en `border-primary`
automatisch meeveranderen.

## Projectstructuur

```
src/
  config/site.config.ts      ← alle data (SiteConfig interface + default export)
  layouts/BaseLayout.astro   ← html, thema-CSS-variabelen, Header, Footer, SeoHead
  styles/global.css          ← Tailwind v4 @theme -> CSS-variabelen + reveal-animaties
  scripts/reveal.ts          ← IntersectionObserver voor scroll-reveals
  components/
    layout/  Header.astro, Footer.astro
    seo/     Schema.astro, SeoHead.astro
    sections/ Hero, ServicesSection, ProcessSection, FaqSection,
              CasesSection, TestimonialsSection, CtaBanner
  pages/
    index.astro, over-ons.astro, diensten.astro, cases.astro, contact.astro
    llms.txt.ts              ← Markdown-samenvatting voor AI-crawlers
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

- `ProfessionalService` (subtype van `LocalBusiness`) met persistente `@id`
  `{url}/#organization`, plus gekoppelde `WebSite` en `WebPage` nodes
- `PostalAddress`, `GeoCoordinates`, `areaServed`, `vatID` en KvK als `identifier`
- `openingHoursSpecification` uit `openingHours`
- `sameAs` uit `socials`
- `hasOfferCatalog` / `makesOffer`, dynamisch uit `content.services`
- `BreadcrumbList` zodra een pagina `breadcrumbs` doorgeeft

`SeoHead.astro` bouwt de titel volgens `[Pagina] | Name – Slogan`, de canonical URL
uit `Astro.site` + pathname, OpenGraph, Twitter Card en robots-tags.

`FaqSection.astro` voegt een eigen `FAQPage` JSON-LD toe aan dezelfde config-data.

## GEO (Generative Engine Optimization)

- `GET /llms.txt` — Markdown-samenvatting (propositie, diensten, openingstijden,
  contact, cases, FAQ) gegenereerd uit `site.config.ts`
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

## Let op bij overname

1. `site.url` in de config → match je echte domein (ook de `site` in `astro.config.mjs`).
2. Vervang KvK, btw, telefoon, e-mail, adres, geo en socials door echte gegevens —
   Google controleert de zichtbare NAP-gegevens tegen het structured data.
3. `contact.formEndpoint` wijst nu naar een Formspree-demo; vervang door je eigen endpoint.
4. `legal.privacyPolicyUrl` / `termsUrl` verwijzen naar pagina's die je nog moet
   aanmaken (of pas ze aan naar bestaande pagina's).