import type { Metadata } from 'next';

import { NoteExplorer } from '@/components/garden/NoteExplorer';
import { PageHeader } from '@/components/ui/PageHeader';
import { getAllNotes, toNoteSummary } from '@/lib/content';

export const metadata: Metadata = {
	title: 'Сад',
	description:
		'Заметки, идеи, аниме, фильмы и технические находки с purrciel.baby.',
	alternates: { canonical: '/garden' },
};

export default function GardenPage() {
	const notes = getAllNotes().map(toNoteSummary);

	return (
		<div className="shell flex flex-col gap-8 py-10 sm:py-14">
			<PageHeader
				eyebrow="раздел"
				title="Сад"
				description="Заметки, идеи, аниме, фильмы и технические находки. Всё, что ещё растёт — специально держится свободно."
			/>

			<NoteExplorer notes={notes} />
		</div>
	);
}
