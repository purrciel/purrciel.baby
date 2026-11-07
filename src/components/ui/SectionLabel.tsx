export function SectionLabel({ label }: { label: string }) {
	return (
		<div className="flex items-center gap-4">
			<span className="pixel-label text-soul" aria-hidden="true">
				✦
			</span>
			<h2 className="m-0 font-mono text-[0.7rem] font-normal uppercase tracking-[0.18em] text-soft">
				{label}
			</h2>
			<span className="h-px flex-1 bg-line" aria-hidden="true" />
		</div>
	);
}
