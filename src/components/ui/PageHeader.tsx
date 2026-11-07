export function PageHeader({
	eyebrow,
	title,
	description,
}: {
	eyebrow?: string;
	title: string;
	description?: string;
}) {
	return (
		<header className="flex flex-col gap-5 border-b border-line pb-8">
			{eyebrow && (
				<p className="eyebrow m-0">
					{eyebrow}
				</p>
			)}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<h1 className="m-0 max-w-3xl text-4xl leading-[0.95] tracking-[-0.045em] sm:text-5xl">
					{title}
				</h1>
				<span className="pixel-label mb-1 hidden shrink-0 sm:block" aria-hidden="true">
					✦ purrciel.baby
				</span>
			</div>
			{description && (
				<p className="m-0 max-w-2xl text-balance text-base leading-relaxed text-soft">
					{description}
				</p>
			)}
		</header>
	);
}
