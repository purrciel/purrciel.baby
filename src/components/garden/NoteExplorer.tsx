'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Heart } from '@/components/ui/Heart';
import { TagList } from '@/components/ui/TagList';
import { typeLabels } from '@/data/garden';
import { cn } from '@/lib/utils';
import type { NoteSummary } from '@/lib/content';

function pluralNotes(count: number): string {
	if (count % 10 === 1 && count % 100 !== 11) return 'заметка';
	if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 'заметки';
	return 'заметок';
}

export function NoteExplorer({ notes }: { notes: NoteSummary[] }) {
	const router = useRouter();
	const [activeTag, setActiveTag] = useState<string | null>(null);

	useEffect(() => {
		const sync = () => {
			const tag = new URLSearchParams(window.location.search).get('tag');
			setActiveTag(tag);
		};

		sync();
		window.addEventListener('popstate', sync);
		return () => window.removeEventListener('popstate', sync);
	}, []);

	const tags = [...new Set(notes.flatMap((note) => note.tags))].sort((a, b) =>
		a.localeCompare(b, 'ru'),
	);

	const filtered = activeTag
		? notes.filter((note) => note.tags.includes(activeTag))
		: notes;

	const selectTag = (tag: string | null) => {
		setActiveTag(tag);
		router.replace(tag ? `/garden?tag=${encodeURIComponent(tag)}` : '/garden', {
			scroll: false,
		});
	};

	return (
		<div className="flex flex-col gap-4">
			{tags.length > 0 && (
				<div className="flex flex-wrap items-center gap-2">
					<button
						type="button"
						onClick={() => selectTag(null)}
						className={cn('tag cursor-pointer', !activeTag && 'tag--active')}
						aria-pressed={!activeTag}
					>
						все
					</button>
					{tags.map((tag) => (
						<button
							key={tag}
							type="button"
							onClick={() => selectTag(activeTag === tag ? null : tag)}
							className={cn('tag cursor-pointer', activeTag === tag && 'tag--active')}
							aria-pressed={activeTag === tag}
						>
							#{tag}
						</button>
					))}
				</div>
			)}

			<p className="meta m-0">
				{filtered.length} {pluralNotes(filtered.length)} · сначала новые
			</p>

			{filtered.length > 0 ? (
				<div className="box">
					<nav className="menu menu--v" aria-label="Заметки">
						{filtered.map((note) => (
							<Link key={note.slug} href={`/garden/${note.slug}`} className="choice items-start">
								<Heart />
								<span className="flex flex-col gap-1.5">
									<span className="flex flex-wrap items-baseline gap-x-3">
										<span>{note.title}</span>
										{note.draft && <span className="meta text-accent">черновик</span>}
									</span>
									<span className="text-[0.98rem] leading-relaxed text-soft">
										{note.description}
									</span>
									<span className="flex flex-wrap items-center gap-x-3 gap-y-1">
										<span className="meta">
											{note.createdShort} · {typeLabels[note.type] ?? note.type} ·{' '}
											{note.readingMinutes} мин
										</span>
										<TagList tags={note.tags} />
									</span>
								</span>
							</Link>
						))}
					</nav>
				</div>
			) : (
				<p className="text-soft">
					{activeTag ? 'В этом теге пока ничего не растёт.' : 'Пока ничего не посажено.'}
				</p>
			)}
		</div>
	);
}
