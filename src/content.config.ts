import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * The garden: long-ish notes, ideas and threads worth exploring.
 *
 * Keep this model small. Later collections (anime, films, devlog) can reuse
 * the same shape — a glob loader plus a typed schema.
 */
const garden = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/garden' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		created: z.coerce.date(),
		updated: z.coerce.date().optional(),
		tags: z.array(z.string()).default([]),
		type: z.enum(['note', 'idea', 'exploration']),
		draft: z.boolean().default(false),
	}),
});

export const collections = { garden };
