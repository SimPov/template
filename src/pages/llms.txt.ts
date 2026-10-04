/**
 * Statische Markdown-samenvatting van de site, geoptimaliseerd voor AI-crawlers
 * (GPTBot, ClaudeBot, PerplexityBot). Wordt volledig opgebouwd uit site.config.ts
 * en bevat alleen secties waarvoor er ook data bestaat.
 */
import type { APIRoute } from 'astro';
import siteConfig from '../config/site.config';
import { DAY_NAMES_NL } from '../config/site.types';

export const prerender = true;

const { site, business, legal, contact, location, openingHours, content } = siteConfig;

const addressLine = location
  ? [
      location.streetAddress,
      [location.postalCode, location.addressLocality].filter(Boolean).join(' '),
      location.addressCountry,
    ]
      .filter(Boolean)
      .join(', ')
  : '';

const basics: string[] = [
  site.legalName && `- **Volledige naam**: ${site.legalName}`,
  legal?.kvk && `- **KvK-nummer**: ${legal.kvk}`,
  legal?.btw && `- **Btw-identificatienummer**: ${legal.btw}`,
  `- **Website**: ${site.url}`,
  contact.phone && `- **Telefoon**: ${contact.phone}`,
  contact.email && `- **E-mail**: ${contact.email}`,
  addressLine && `- **Adres**: ${addressLine}`,
  location?.geo && `- **Coördinaten**: ${location.geo.latitude}, ${location.geo.longitude}`,
  location?.areaServed?.length && `- **Werkgebied**: ${location.areaServed.join(', ')}`,
  contact.bookingUrl && `- **Directe afspraakplanner**: ${contact.bookingUrl}`,
  legal?.privacyPolicyUrl && `- **Privacyverklaring**: ${site.url}${legal.privacyPolicyUrl}`,
  legal?.termsUrl && `- **Algemene voorwaarden**: ${site.url}${legal.termsUrl}`,
].filter((line): line is string => Boolean(line));

const hours = (openingHours ?? [])
  .map((entry) => {
    const days = entry.days.map((day) => DAY_NAMES_NL[day] ?? day).join(', ');
    return `- ${days}: ${entry.opens}\u2013${entry.closes}`;
  })
  .join('\n');

const featureHref = content.features?.detailPageHref;
const features = (content.features?.items ?? [])
  .map((feature) => {
    const price = feature.meta ? ` (${feature.meta})` : '';
    const details = feature.details?.length
      ? `\n\nDetails:\n${feature.details.map((detail) => `- ${detail}`).join('\n')}`
      : '';
    const url = featureHref ? `\n\nURL: ${site.url}${featureHref}#${feature.id}` : '';
    return `### ${feature.title}${price}\n\n${feature.shortDesc}${details}${url}`;
  })
  .join('\n\n');

const work = (content.work?.items ?? [])
  .map((item) => {
    const lines = [
      `- **${item.client ?? item.title}**${item.client ? ` — ${item.title}` : ''}`,
      ...(item.body ?? []).map((paragraph) => `  - ${paragraph}`),
    ];
    if (item.tags?.length) lines.push(`  - Labels: ${item.tags.join(', ')}`);
    return lines.join('\n');
  })
  .join('\n');

const faq = (content.faq?.items ?? [])
  .map((item) => `### ${item.question}\n\n${item.answer}`)
  .join('\n\n');

// Alleen secties opnemen waar er inhoud voor is.
const sections: string[] = [];
if (basics.length > 0) sections.push(`## Basisgegevens\n\n${basics.join('\n')}`);
if (hours) sections.push(`## Openingstijden\n\n${hours}`);
if (features) sections.push(`## ${content.features?.heading ?? 'Aanbod'}\n\n${features}`);
if (content.process?.items.length) {
  sections.push(
    `## ${content.process.heading}\n\n${content.process.items
      .map((step, index) => `${index + 1}. **${step.title}** \u2014 ${step.description}`)
      .join('\n')}`,
  );
}
if (work) sections.push(`## ${content.work?.heading ?? 'Resultaten'}\n\n${work}`);
if (content.testimonials?.items.length) {
  sections.push(
    `## ${content.testimonials.heading}\n\n${content.testimonials.items
      .map((item) => `- **${item.author}**${item.company ? ` (${item.company})` : ''}: \u201c${item.quote}\u201d`)
      .join('\n')}`,
  );
}
if (faq) sections.push(`## ${content.faq?.heading ?? 'Veelgestelde vragen'}\n\n${faq}`);
if (content.stats?.length) {
  sections.push(
    `## Cijfers\n\n${content.stats.map((stat) => `- ${stat.label}: ${stat.value}`).join('\n')}`,
  );
}

const body = `# ${site.name}

> ${site.slogan}

${site.description}

${sections.join('\n\n')}

---

Deze samenvatting wordt automatisch gegenereerd uit \`src/config/site.config.ts\`.
${business.schemaType ? `Structured data gebruikt het type \`${business.schemaType}\`.` : ''}
`;

export const GET: APIRoute = () =>
  new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });