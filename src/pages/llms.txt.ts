/**
 * Statische Markdown-samenvatting van de site, geoptimaliseerd voor AI-crawlers
 * (GPTBot, ClaudeBot, PerplexityBot). Wordt opgebouwd uit site.config.ts.
 */
import type { APIRoute } from 'astro';
import siteConfig from '../config/site.config';

export const prerender = true;

const { site, legal, contact, location, openingHours, content } = siteConfig;

const DAYS: Record<string, string> = {
  Monday: 'maandag',
  Tuesday: 'dinsdag',
  Wednesday: 'woensdag',
  Thursday: 'donderdag',
  Friday: 'vrijdag',
  Saturday: 'zaterdag',
  Sunday: 'zondag',
};

const hours = openingHours
  .map((entry) => {
    const days = entry.days.map((d) => DAYS[d] ?? d).join(', ');
    return `- ${days}: ${entry.opens}–${entry.closes}`;
  })
  .join('\n');

const services = content.services
  .map(
    (service) =>
      `### ${service.title} (${service.priceTier})\n\n${service.shortDesc}\n\nLeverbaar:\n${service.deliverables
        .map((d) => `- ${d}`)
        .join('\n')}\n\nURL: ${site.url}/diensten#${service.id}`,
  )
  .join('\n\n');

const cases = content.cases
  .map(
    (c) =>
      `- **${c.client}** — ${c.title}\n  - Uitdaging: ${c.challenge}\n  - Resultaat: ${c.result}\n  - Metrics: ${c.metrics.join(', ')}`,
  )
  .join('\n');

const faq = content.faq
  .map((item) => `### ${item.question}\n\n${item.answer}`)
  .join('\n\n');

const body = `# ${site.name}

> ${site.slogan}

${site.description}

## Basisgegevens

- **Volledige naam**: ${site.legalName}
- **KvK-nummer**: ${legal.kvk}
- **Btw-identificatienummer**: ${legal.btw}
- **Website**: ${site.url}
- **Telefoon**: ${contact.phone}
- **E-mail**: ${contact.email}
- **Adres**: ${location.streetAddress}, ${location.postalCode} ${location.addressLocality}, ${location.addressCountry}
- **Coördinaten**: ${location.geo.latitude}, ${location.geo.longitude}
- **Werkgebied**: ${location.areaServed.join(', ')}
- **Directe afspraakplanner**: ${contact.bookingUrl}
- **Privacyverklaring**: ${site.url}${legal.privacyPolicyUrl}
- **Algemene voorwaarden**: ${site.url}${legal.termsUrl}

## Openingstijden

${hours}

## Diensten

${services}

## Werkwijze

${content.process.map((s) => `${s.step}. **${s.title}** — ${s.description}`).join('\n')}

## Cases

${cases}

## Veelgestelde vragen

${faq}

## Waarom ${site.name}

${content.stats.map((s) => `- ${s.label}: ${s.value}`).join('\n')}

---

Deze samenvatting wordt automatisch gegenereerd uit \`src/config/site.config.ts\`.
Nederlandstalige onderneming met focus op MKB en ZZP'ers in de Randstad.
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });