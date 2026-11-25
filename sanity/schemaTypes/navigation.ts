import { defineField, defineType } from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Nav Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'href', title: 'Link', type: 'string' }),
          ],
          preview: { select: { title: 'label', subtitle: 'href' } },
        },
      ],
    }),
  ],
})
