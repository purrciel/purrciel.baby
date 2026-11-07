import { LiveClock } from '@/components/ui/LiveClock';

export function Hud() {
	return (
		<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line pb-4">
			<div className="flex flex-wrap items-center gap-x-5 gap-y-2">
				<span className="pixel-label text-ink">PURRCIEL</span>
				<span className="pixel-label text-soul">LV 01</span>
				<span className="flex items-center gap-2">
					<span className="pixel-label">HP</span>
					<span className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10">
						<span className="block h-full w-full rounded-full bg-soul shadow-[0_0_12px_rgba(255,59,59,.65)]" />
					</span>
					<span className="pixel-label">∞</span>
				</span>
			</div>

			<div className="flex items-center gap-3">
				<span className="meta inline-flex items-center gap-2">
					<span className="size-1.5 rounded-full bg-soul shadow-[0_0_8px_rgba(255,59,59,.8)]" />
					онлайн
				</span>
				<span className="h-3 w-px bg-line" aria-hidden="true" />
				<span className="meta text-soft">
					<LiveClock />
				</span>
			</div>
		</div>
	);
}
