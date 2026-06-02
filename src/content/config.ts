import { defineCollection, z } from 'astro:content';

const linkSchema = z.object({
  label: z.string(),
  href: z.string()
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.number(),
    status: z.enum(['published', 'under-review', 'in-preparation']),
    statusLabel: z.string().optional(),
    venueDisplay: z.string().optional(),
    order: z.number().default(999),
    role: z.string(),
    summary: z.string(),
    selected: z.boolean().default(false),
    links: z.array(linkSchema).default([])
  })
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    period: z.string(),
    organization: z.string(),
    role: z.string(),
    visibility: z.enum(['public', 'private']).default('private'),
    featured: z.boolean().default(false),
    order: z.number().default(999),
    summary: z.string(),
    problem: z.string(),
    contributions: z.array(z.string()).default([]),
    results: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    links: z.array(linkSchema).default([])
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    draft: z.boolean().default(false)
  })
});

export const collections = {
  blog,
  projects,
  publications
};
