import { LiveClock } from '@/components/ui/LiveClock';

export function Hud() {
	return (
		<div
			className="flex flex-wrap items-center gap-x-6 gap-y-1 font-serif text-[0.62rem] tracking-[0.08em] text-white/85"
			aria-hidden="true"
		>
			<span>PURRCIEL</span>
			<span>LV 01</span>
			<span className="inline-flex items-center gap-2">
				HP
				<i className="inline-block h-2.5 w-16 bg-white/15">
					<b className="block h-full w-full bg-white" />
				</i>
				∞
			</span>
			<span className="ml-auto">
				<LiveClock />
			</span>
		</div>
	);
}
