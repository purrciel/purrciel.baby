import Link from 'next/link';

import { Heart } from '@/components/ui/Heart';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { getLatestNotes } from '@/lib/content';
import { formatShortDate } from '@/lib/date';

export function LatestNotes() {
	const latest = getLatestNotes(5);

	return (
		<section className="flex flex-col gap-4">
			<SectionLabel label="свежее из сада" />

			{latest.length > 0 ? (
				<div className="box">
					<nav className="menu menu--v" aria-label="Свежие заметки">
						{latest.map((note) => (
							<Link
								key={note.slug}
								href={`/garden/${note.slug}`}
								className="choice justify-between gap-4"
							>
								<Heart />
								<span>{note.title}</span>
								<span className="meta shrink-0">{formatShortDate(note.created)}</span>
							</Link>
						))}
					</nav>
				</div>
			) : (
				<p className="text-soft">Пока ничего не посажено.</p>
			)}
		</section>
	);
}
