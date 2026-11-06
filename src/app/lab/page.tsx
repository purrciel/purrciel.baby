import type { Metadata } from 'next';

import { ProjectCard } from '@/components/lab/ProjectCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { labProjects } from '@/lib/lab';

export const metadata: Metadata = {
	title: 'Лаб',
	description: 'Эксперименты и маленькие программы с purrciel.baby.',
	alternates: { canonical: '/lab' },
};

export default function LabPage() {
	return (
		<div className="shell flex flex-col gap-8 py-10 sm:py-14">
			<PageHeader
				eyebrow="раздел"
				title="Лаб"
				description="Эксперименты и мелкие программы. Почти все начинаются как любопытство в воскресенье, а заканчиваются где-то не там."
			/>

			{labProjects.length > 0 ? (
				<div className="grid gap-5 sm:grid-cols-2">
					{labProjects.map((project) => (
						<ProjectCard key={project.title} project={project} />
					))}
				</div>
			) : (
				<p className="text-soft">Пока пусто. Эксперименты появятся здесь.</p>
			)}

			<p className="meta m-0">Раздел только начинается.</p>
		</div>
	);
}
