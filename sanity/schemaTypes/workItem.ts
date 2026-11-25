import { defineField, defineType } from 'sanity'

export const workItemType = defineType({
  name: 'workItem',
  title: 'Work Item',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'role', title: 'Role / Label', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'linkHref', title: 'Link URL', type: 'url' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'role', media: 'image' },
  },
})
