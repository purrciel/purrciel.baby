import type { MetadataRoute } from 'next';

import { getAllNotes } from '@/lib/content';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const notes = getAllNotes();
	const now = new Date();

	const routes: MetadataRoute.Sitemap = [
		{
			url: site.url,
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${site.url}/garden`,
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${site.url}/lab`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
		{
			url: `${site.url}/world`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.7,
		},
	];

	const posts: MetadataRoute.Sitemap = notes.map((note) => ({
		url: `${site.url}/garden/${note.slug}`,
		lastModified: note.updated ?? note.created,
		changeFrequency: 'monthly',
		priority: 0.6,
	}));

	return [...routes, ...posts];
}
