export function SectionLabel({ label }: { label: string }) {
	return (
		<h2 className="flex items-center gap-3 text-[0.72rem] font-normal uppercase tracking-[0.16em] text-soft">
			<span>* {label}</span>
			<span className="h-[3px] flex-1 bg-line" aria-hidden="true" />
		</h2>
	);
}
