import { defineField, defineType } from 'sanity'

const imageWithAlt = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    fields: [defineField({ name: 'alt', title: 'Alt text (for accessibility)', type: 'string' })],
  })

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: '① Hero' },
    { name: 'about', title: '② About' },
    { name: 'work', title: '③ Selected Work' },
    { name: 'piano', title: '④ Piano Studio' },
    { name: 'contact', title: '⑤ Contact CTA' },
  ],
  fields: [
    // ─── HERO ───────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'name', title: 'Name (large heading)', type: 'string' }),
        defineField({
          name: 'subtitleItems',
          title: 'Subtitle items (e.g. ACTOR-MUSICIAN, MUSICAL DIRECTOR…)',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        imageWithAlt('heroImage', 'Hero Image'),
        defineField({ name: 'quoteText', title: 'Quote text', type: 'string' }),
        defineField({ name: 'quoteAuthor', title: 'Quote author', type: 'string' }),
      ],
    }),

    // ─── ABOUT ──────────────────────────────────────────────
    defineField({
      name: 'about',
      title: 'About Section',
      type: 'object',
      group: 'about',
      fields: [
        imageWithAlt('portraitImage', 'Portrait Image'),
        defineField({
          name: 'taglineLines',
          title: 'Tagline lines (e.g. PERFORMER., MUSICIAN., CREATIVE.)',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({ name: 'bio', title: 'Bio text', type: 'text', rows: 3 }),
        defineField({ name: 'aboutLinkLabel', title: 'CTA label', type: 'string' }),
        defineField({ name: 'aboutLinkHref', title: 'CTA link', type: 'string' }),
      ],
    }),

    // ─── SELECTED WORK ──────────────────────────────────────
    defineField({
      name: 'selectedWork',
      title: 'Selected Work Section',
      type: 'object',
      group: 'work',
      fields: [
        defineField({ name: 'sectionTitle', title: 'Section title', type: 'string' }),
        defineField({
          name: 'workItems',
          title: 'Work items',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'workItem' }] }],
        }),
      ],
    }),

    // ─── PIANO STUDIO ───────────────────────────────────────
    defineField({
      name: 'pianoStudio',
      title: 'Piano Studio Section',
      type: 'object',
      group: 'piano',
      fields: [
        imageWithAlt('logoImage', 'Logo / Signature image'),
        defineField({ name: 'title', title: 'Studio title', type: 'string' }),
        defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
        defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA link', type: 'string' }),
      ],
    }),

    // ─── CONTACT CTA ────────────────────────────────────────
    defineField({
      name: 'contactCta',
      title: 'Contact CTA Section',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subtext', title: 'Sub-text', type: 'text', rows: 2 }),
        defineField({ name: 'ctaLabel', title: 'CTA label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA link', type: 'string' }),
        imageWithAlt('backgroundImage', 'Background image'),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
})
