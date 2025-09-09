import { z } from 'zod'

// Shared section base
export const BackgroundSchema = z.object({
  type: z.enum(['color', 'image', 'video', 'gradient']).default('color'),
  value: z.string().default(''),
  url: z.string().url().optional(),
})

export const SectionSchemaBase = z.object({
  id: z.string(),
  type: z.string(),
  visible: z.boolean().default(true),
  layout: z.object({
    columns: z.number().int().min(1).max(4).default(1),
    grid: z.enum(['full', 'two-col', 'asym-30-70', 'asym-70-30', 'three-col']).default('full'),
    background: BackgroundSchema.default({ type: 'color', value: 'transparent' }),
  }),
  content: z.record(z.any()).default({}),
  styling: z.record(z.any()).default({}),
})
export type SectionBase = z.infer<typeof SectionSchemaBase>

// Specific sections
export const HeroContentSchema = z.object({
  headline: z.string().default('Experience Luxury'),
  subheadline: z.string().default('Curated journeys for discerning travelers'),
  cta: z.object({ text: z.string().default('Explore'), link: z.string().default('#') }).default({ text: 'Explore', link: '#' }),
  media: z.object({ url: z.string().default(''), alt: z.string().default('') }).default({ url: '', alt: '' }),
})

export const TextContentSchema = z.object({
  title: z.string().default('Section Title'),
  body: z.string().default('Describe your offering...'),
})

export const GalleryContentSchema = z.object({
  title: z.string().default('Gallery'),
  images: z.array(z.object({ url: z.string(), alt: z.string().default('') })).default([]),
})

export const VideoContentSchema = z.object({
  title: z.string().default('Video Title'),
  video_url: z.string().default(''),
  poster_image: z.string().default(''),
})

export const FeaturesContentSchema = z.object({
  title: z.string().default('Why Choose Us'),
  items: z.array(z.object({
    icon: z.string().default(''),
    heading: z.string().default('Premium Service'),
    description: z.string().default('We deliver exceptional experiences.'),
  })).default([]),
})

export const CTAContentSchema = z.object({
  headline: z.string().default('Ready to begin your journey?'),
  subheadline: z.string().default('Let our concierge design it for you.'),
  cta: z.object({ text: z.string().default('Contact Us'), link: z.string().default('#') }).default({ text: 'Contact Us', link: '#' })
})

export const ContactContentSchema = z.object({
  title: z.string().default('Contact Us'),
  description: z.string().default('We will respond within 24 hours.'),
  form: z.object({
    nameLabel: z.string().default('Name'),
    emailLabel: z.string().default('Email'),
    phoneLabel: z.string().default('Phone'),
    messageLabel: z.string().default('Message'),
    submitText: z.string().default('Send Inquiry')
  }).default({
    nameLabel: 'Name', emailLabel: 'Email', phoneLabel: 'Phone', messageLabel: 'Message', submitText: 'Send Inquiry'
  })
})

// Registry item shape
export type RegistryItem<T extends z.ZodTypeAny> = {
  type: string
  schema: z.ZodTypeAny
  contentSchema: T
  defaults: () => SectionBase & { content: z.infer<T> }
  // dynamic import path for renderer is based on type naming in DynamicRenderer
}

export const sectionsRegistry: RegistryItem<any>[] = [
  {
    type: 'hero',
    schema: SectionSchemaBase,
    contentSchema: HeroContentSchema,
    defaults: () => ({
      id: `section-${Date.now()}`,
      type: 'hero',
      visible: true,
      layout: { columns: 1, grid: 'full', background: { type: 'image', value: '', url: '' } },
      content: HeroContentSchema.parse({}),
      styling: {}
    })
  },
  {
    type: 'text',
    schema: SectionSchemaBase,
    contentSchema: TextContentSchema,
    defaults: () => ({
      id: `section-${Date.now()}`,
      type: 'text',
      visible: true,
      layout: { columns: 1, grid: 'full', background: { type: 'color', value: '#000000' } },
      content: TextContentSchema.parse({}),
      styling: {}
    })
  },
  {
    type: 'gallery',
    schema: SectionSchemaBase,
    contentSchema: GalleryContentSchema,
    defaults: () => ({
      id: `section-${Date.now()}`,
      type: 'gallery',
      visible: true,
      layout: { columns: 1, grid: 'full', background: { type: 'color', value: '#000000' } },
      content: GalleryContentSchema.parse({}),
      styling: {}
    })
  },
  {
    type: 'video',
    schema: SectionSchemaBase,
    contentSchema: VideoContentSchema,
    defaults: () => ({
      id: `section-${Date.now()}`,
      type: 'video',
      visible: true,
      layout: { columns: 1, grid: 'full', background: { type: 'color', value: '#000000' } },
      content: VideoContentSchema.parse({}),
      styling: {}
    })
  },
  {
    type: 'features',
    schema: SectionSchemaBase,
    contentSchema: FeaturesContentSchema,
    defaults: () => ({
      id: `section-${Date.now()}`,
      type: 'features',
      visible: true,
      layout: { columns: 1, grid: 'three-col', background: { type: 'color', value: '#000000' } },
      content: FeaturesContentSchema.parse({ items: [
        { icon: '', heading: 'Bespoke Itineraries', description: 'Tailored trips designed around you.' },
        { icon: '', heading: 'Elite Access', description: 'Exclusive venues and experiences.' },
        { icon: '', heading: '24/7 Concierge', description: 'Always-on support during your trip.' },
      ] }),
      styling: {}
    })
  },
  {
    type: 'cta',
    schema: SectionSchemaBase,
    contentSchema: CTAContentSchema,
    defaults: () => ({
      id: `section-${Date.now()}`,
      type: 'cta',
      visible: true,
      layout: { columns: 1, grid: 'full', background: { type: 'gradient', value: 'gold' } },
      content: CTAContentSchema.parse({}),
      styling: {}
    })
  },
  {
    type: 'contact',
    schema: SectionSchemaBase,
    contentSchema: ContactContentSchema,
    defaults: () => ({
      id: `section-${Date.now()}`,
      type: 'contact',
      visible: true,
      layout: { columns: 1, grid: 'two-col', background: { type: 'color', value: '#000000' } },
      content: ContactContentSchema.parse({}),
      styling: {}
    })
  },
]

export function getRegistryItem(type: string) {
  return sectionsRegistry.find(r => r.type === type)
}
