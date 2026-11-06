import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import { z } from 'zod';

import { formatDate, formatShortDate } from './date';

const GARDEN_DIR = path.join(process.cwd(), 'src/content/garden');

const frontmatterSchema = z.object({
	title: z.string(),
	description: z.string(),
	created: z.coerce.date(),
	updated: z.coerce.date().optional(),
	tags: z.array(z.string()).default([]),
	type: z.enum(['note', 'idea', 'exploration']),
	draft: z.boolean().default(false),
});

export type NoteType = z.infer<typeof frontmatterSchema>['type'];

export type Note = z.infer<typeof frontmatterSchema> & {
	slug: string;
	content: string;
	readingMinutes: number;
};

/** Всё, что можно безопасно передать в клиентский компонент. */
export type NoteSummary = {
	slug: string;
	title: string;
	description: string;
	tags: string[];
	type: NoteType;
	draft: boolean;
	readingMinutes: number;
	createdISO: string;
	createdLabel: string;
	createdShort: string;
};

export type Heading = {
	id: string;
	text: string;
	level: number;
};

const showDraftsByDefault = process.env.NODE_ENV === 'development';

function readingMinutes(content: string): number {
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}

function parseNoteFile(fileName: string): Note {
	const slug = fileName.replace(/\.mdx?$/, '');
	const raw = fs.readFileSync(path.join(GARDEN_DIR, fileName), 'utf8');
	const { data, content } = matter(raw);
	const parsed = frontmatterSchema.parse(data);

	return {
		...parsed,
		slug,
		content,
		readingMinutes: readingMinutes(content),
	};
}

export function getAllNotes(options: { includeDrafts?: boolean } = {}): Note[] {
	const includeDrafts = options.includeDrafts ?? showDraftsByDefault;

	if (!fs.existsSync(GARDEN_DIR)) return [];

	return fs
		.readdirSync(GARDEN_DIR)
		.filter((file) => /\.mdx?$/.test(file))
		.map(parseNoteFile)
		.filter((note) => includeDrafts || !note.draft)
		.sort((a, b) => b.created.valueOf() - a.created.valueOf());
}

export function getNote(
	slug: string,
	options: { includeDrafts?: boolean } = {},
): Note | null {
	return getAllNotes(options).find((note) => note.slug === slug) ?? null;
}

export function getLatestNotes(limit = 5): Note[] {
	return getAllNotes().slice(0, limit);
}

export function getAdjacentNotes(slug: string): {
	previous: Note | null;
	next: Note | null;
} {
	const notes = getAllNotes();
	const index = notes.findIndex((note) => note.slug === slug);

	return {
		previous: index > 0 ? notes[index - 1] : null,
		next: index >= 0 && index < notes.length - 1 ? notes[index + 1] : null,
	};
}

export function getAllTags(): string[] {
	const tags = new Set<string>();
	for (const note of getAllNotes()) {
		for (const tag of note.tags) tags.add(tag);
	}
	return [...tags].sort((a, b) => a.localeCompare(b, 'ru'));
}

export function toNoteSummary(note: Note): NoteSummary {
	return {
		slug: note.slug,
		title: note.title,
		description: note.description,
		tags: note.tags,
		type: note.type,
		draft: note.draft,
		readingMinutes: note.readingMinutes,
		createdISO: note.created.toISOString(),
		createdLabel: formatDate(note.created),
		createdShort: formatShortDate(note.created),
	};
}

/** Заголовки для оглавления. ID совпадают с rehype-slug. */
export function extractHeadings(content: string): Heading[] {
	const slugger = new GithubSlugger();
	const headings: Heading[] = [];
	let inFence = false;

	for (const line of content.split('\n')) {
		if (line.trim().startsWith('```')) {
			inFence = !inFence;
			continue;
		}
		if (inFence) continue;

		const match = /^(#{2,3})\s+(.+)$/.exec(line);
		if (!match) continue;

		const text = match[2]
			.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
			.replace(/[*_`~]/g, '')
			.trim();

		headings.push({
			level: match[1].length,
			text,
			id: slugger.slug(text),
		});
	}

	return headings;
}
