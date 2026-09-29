import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Posts live in src/content/posts/<slug>.{md,mdx} and are served at /posts/<slug>/. */
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/[^_]*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** One line shown under the title in lists. */
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    /** Drafts show up in `pnpm dev` only. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
