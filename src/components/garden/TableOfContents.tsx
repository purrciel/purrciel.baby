import type { Heading } from '@/lib/content';

export function TableOfContents({ headings }: { headings: Heading[] }) {
	if (headings.length === 0) return null;

	return (
		<nav aria-label="Оглавление">
			<ul className="m-0 flex list-none flex-col gap-2 p-0 text-[0.9rem] leading-snug">
				{headings.map((heading) => (
					<li key={heading.id} className={heading.level === 3 ? 'pl-4' : undefined}>
						<a href={`#${heading.id}`} className="text-soft transition-colors hover:text-choose">
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
