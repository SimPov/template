# White-label Astro starter — Nederlandse webdesignwebsite

Schaalbare, zero-JavaScript Astro + Tailwind starter voor een Nederlandse zakelijke
website. **Alle bedrijfsdata staat in één bestand.**

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
  styles/global.css          ← Tailwind v4 @theme -> CSS-variabelen
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
- 0 kB client-side JavaScript (enige script: het mobiele hamburgermenu, inline)
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