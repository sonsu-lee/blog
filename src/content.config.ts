import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Posts live in one folder per locale: src/content/posts/{ko,ja,en}/<slug>.md.
 * A post and its translations share a file name, so /ko/posts/foo/ and
 * /ja/posts/foo/ are the same post in two languages. A post may exist in
 * only one language.
 */
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/[^_]*.md' }),
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
