import type { LabProject } from '@/lib/lab';
import { statusLabels } from '@/lib/lab';
import { cn } from '@/lib/cn';

const statusStyles: Record<LabProject['status'], string> = {
	active: 'border-choose text-choose',
	done: 'border-line text-white',
	paused: 'border-faint text-faint',
};

export function ProjectCard({ project }: { project: LabProject }) {
	return (
		<article className="group relative flex h-full flex-col gap-4 border-4 border-line bg-paper p-5 transition-colors hover:border-choose">
			<div className="flex items-start justify-between gap-4">
				<h2 className="m-0 text-[1.1rem] leading-snug">{project.title}</h2>
				<span
					className={cn(
						'meta shrink-0 border-2 px-2 py-0.5',
						statusStyles[project.status],
					)}
				>
					{statusLabels[project.status]}
				</span>
			</div>

			<p className="m-0 flex-1 text-[1rem] leading-relaxed text-soft">
				{project.description}
			</p>

			{project.stack.length > 0 && (
				<ul className="m-0 flex list-none flex-wrap gap-2 p-0">
					{project.stack.map((item) => (
						<li key={item} className="tag">
							{item}
						</li>
					))}
				</ul>
			)}

			<div className="flex flex-wrap items-center gap-3">
				{project.href && (
					<a
						href={project.href}
						target="_blank"
						rel="noreferrer"
						className="btn btn--ghost"
					>
						открыть ↗
					</a>
				)}
				{project.repo && (
					<a
						href={project.repo}
						target="_blank"
						rel="noreferrer"
						className="btn btn--ghost"
					>
						код ↗
					</a>
				)}
				{project.year && <span className="meta ml-auto">{project.year}</span>}
			</div>
		</article>
	);
}
