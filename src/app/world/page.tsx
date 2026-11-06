import type { Metadata } from 'next';

import { PageHeader } from '@/components/ui/PageHeader';
import { WorldRoom, type RoomHotspot } from '@/components/world/WorldRoom';
import activity from '@/data/activity.json';
import world from '@/data/world.json';
import { getLatestNotes, toNoteSummary } from '@/lib/content';
import { labProjects, statusLabels } from '@/lib/lab';

export const metadata: Metadata = {
	title: 'Мир',
	description: 'Комната, вещи и ссылки: маленький пиксельный мир purrciel.baby.',
	alternates: { canonical: '/world' },
};

export default function WorldPage() {
	const latest = getLatestNotes(3).map(toNoteSummary);

	const hotspots: RoomHotspot[] = [
		{
			id: 'window',
			label: world.hotspots.window.label,
			title: world.hotspots.window.title,
			lines: [
				...activity.rows.map((row) => `${row.k}: ${row.v}`),
				activity.note,
			],
		},
		{
			id: 'desk',
			label: world.hotspots.desk.label,
			title: world.hotspots.desk.title,
			lines:
				labProjects.length > 0
					? labProjects.map(
							(project) => `${project.title} — ${statusLabels[project.status]}`,
						)
					: ['Пока пусто. Эксперименты появятся здесь.'],
			links: [{ label: 'вся лаборатория', href: '/lab' }],
		},
		{
			id: 'shelf',
			label: world.hotspots.shelf.label,
			title: world.hotspots.shelf.title,
			lines:
				latest.length > 0
					? latest.map((note) => `${note.title} · ${note.createdShort}`)
					: ['Пока ничего не посажено.'],
			links: [{ label: 'весь сад', href: '/garden' }],
		},
		{
			id: 'door',
			label: world.hotspots.door.label,
			title: world.hotspots.door.title,
			lines: ['Выход есть всегда. Но сначала посмотри, что на полке.'],
			links: world.links,
		},
	];

	return (
		<div className="shell flex flex-col gap-8 py-10 sm:py-14">
			<PageHeader
				eyebrow="раздел"
				title="Мир"
				description="Комната, вещи и ссылки. Нажми на окно, стол, полку или дверь — они расскажут, что внутри."
			/>

			<WorldRoom intro={world.intro} hotspots={hotspots} />
		</div>
	);
}
