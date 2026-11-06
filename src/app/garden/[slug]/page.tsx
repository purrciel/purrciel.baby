import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { MdxContent } from '@/components/garden/MdxContent';
import { TableOfContents } from '@/components/garden/TableOfContents';
import { JsonLd } from '@/components/seo/JsonLd';
import { TagList } from '@/components/ui/TagList';
import { typeLabels } from '@/data/garden';
import {
	extractHeadings,
	getAdjacentNotes,
	getAllNotes,
	getNote,
} from '@/lib/content';
import { formatDate } from '@/lib/date';
import { site } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
	return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const note = getNote(slug);
	if (!note) return {};

	const url = `/garden/${note.slug}`;

	return {
		title: note.title,
		description: note.description,
		alternates: { canonical: url },
		openGraph: {
			type: 'article',
			title: note.title,
			description: note.description,
			url,
			publishedTime: note.created.toISOString(),
			modifiedTime: (note.updated ?? note.created).toISOString(),
			tags: note.tags,
			images: [`${url}/opengraph-image`],
		},
		twitter: {
			card: 'summary_large_image',
			title: note.title,
			description: note.description,
			images: [`${url}/opengraph-image`],
		},
		robots: { index: !note.draft, follow: !note.draft },
	};
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const note = getNote(slug);
	if (!note) notFound();

	const headings = extractHeadings(note.content);
	const { previous, next } = getAdjacentNotes(note.slug);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: note.title,
		description: note.description,
		datePublished: note.created.toISOString(),
		dateModified: (note.updated ?? note.created).toISOString(),
		author: {
			'@type': 'Person',
			name: site.author.name,
			url: site.author.url,
		},
		publisher: {
			'@type': 'Person',
			name: site.author.name,
			url: site.author.url,
		},
		mainEntityOfPage: `${site.url}/garden/${note.slug}`,
		image: `${site.url}/garden/${note.slug}/opengraph-image`,
		keywords: note.tags.join(', '),
		inLanguage: 'ru',
	};

	return (
		<div className="shell flex flex-col gap-8 py-10 sm:py-14">
			<JsonLd data={jsonLd} />

			<Link href="/garden" className="meta hover:text-choose">
				← назад в сад
			</Link>

			<header className="flex flex-col gap-4">
				<p className="meta m-0">* {typeLabels[note.type] ?? note.type}</p>
				<h1 className="m-0 text-xl sm:text-2xl">{note.title}</h1>
				<p className="m-0 max-w-prose text-soft">{note.description}</p>

				<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
					<time dateTime={note.created.toISOString()} className="meta">
						{formatDate(note.created)}
					</time>
					<span className="meta">{note.readingMinutes} мин чтения</span>
					{note.draft && <span className="meta text-accent">черновик</span>}
				</div>

				<TagList tags={note.tags} link />
			</header>

			<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_12rem]">
				<div className="box prose max-w-none">
					<MdxContent source={note.content} />
				</div>

				{headings.length > 0 && (
					<aside className="hidden lg:block">
						<div className="sticky top-24 flex flex-col gap-3">
							<p className="meta m-0">* оглавление</p>
							<TableOfContents headings={headings} />
						</div>
					</aside>
				)}
			</div>

			<footer className="flex flex-col gap-3">
				{note.updated && <p className="meta m-0">обновлено {formatDate(note.updated)}</p>}

				<div className="flex flex-col gap-3 border-t-4 border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
					{previous ? (
						<Link href={`/garden/${previous.slug}`} className="btn btn--ghost max-w-full">
							← {previous.title}
						</Link>
					) : (
						<span />
					)}

					{next ? (
						<Link
							href={`/garden/${next.slug}`}
							className="btn btn--ghost max-w-full sm:text-right"
						>
							{next.title} →
						</Link>
					) : (
						<span />
					)}
				</div>

				<Link href="/garden" className="meta mt-2 hover:text-choose">
					← назад в сад
				</Link>
			</footer>
		</div>
	);
}
