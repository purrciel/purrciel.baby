import { getAllNotes } from '@/lib/content';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

function escapeXml(value: string): string {
	return value.replace(/[<>&'"]/g, (character) => {
		switch (character) {
			case '<':
				return '&lt;';
			case '>':
				return '&gt;';
			case '&':
				return '&amp;';
			case "'":
				return '&apos;';
			default:
				return '&quot;';
		}
	});
}

export function GET() {
	const notes = getAllNotes();
	const lastBuildDate = new Date().toUTCString();

	const items = notes
		.map((note) => {
			const url = `${site.url}/garden/${note.slug}`;
			return `		<item>
			<title>${escapeXml(note.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<description>${escapeXml(note.description)}</description>
			<pubDate>${note.created.toUTCString()}</pubDate>
			<author>${escapeXml(site.author.name)}</author>
		</item>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(site.name)}</title>
		<link>${site.url}</link>
		<description>${escapeXml(site.description)}</description>
		<language>ru</language>
		<lastBuildDate>${lastBuildDate}</lastBuildDate>
		<atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml" />
${items}
	</channel>
</rss>
`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=3600',
		},
	});
}
