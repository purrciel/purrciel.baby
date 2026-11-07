'use client';

import { PixelCat } from '@/components/ui/PixelCat';
import { cn } from '@/lib/utils';

export function StageCat({
	onPoke,
	poked,
	mercy,
}: {
	onPoke: () => void;
	poked: boolean;
	mercy: boolean;
}) {
	return (
		<div className="relative flex aspect-square w-full max-w-[30rem] items-center justify-center justify-self-center">
			<div
				className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,59,59,.2),transparent_62%)] blur-2xl"
				aria-hidden="true"
			/>
			<div
				className="absolute inset-0 rounded-full border border-line"
				aria-hidden="true"
			/>
			<div
				className="spin-slow absolute inset-[11%] rounded-full border border-dashed border-line"
				aria-hidden="true"
			/>
			<div
				className="absolute inset-[26%] rounded-full border border-soul/20 bg-background/40"
				aria-hidden="true"
			/>
			<div
				className="absolute left-[18%] top-[22%] size-1.5 rounded-full bg-soul shadow-[0_0_12px_rgba(255,59,59,.9)]"
				aria-hidden="true"
			/>
			<div
				className="absolute bottom-[20%] right-[16%] size-1 rounded-full bg-ink/60"
				aria-hidden="true"
			/>

			<button
				type="button"
				onClick={onPoke}
				aria-label="Потрогать кота"
				className="group relative z-10 flex flex-col items-center gap-4 border-0 bg-transparent p-0 leading-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-dashed focus-visible:outline-soul"
			>
				<PixelCat
					className={cn(
						'bob h-auto w-[min(180px,44vw)] transition-transform duration-300 group-hover:-translate-y-1',
						poked && 'cat-poke',
						mercy && 'cat-mercy',
					)}
				/>
				<span className="meta text-[0.6rem] opacity-0 transition-opacity duration-300 group-hover:opacity-70 group-focus-visible:opacity-70">
					потрогать
				</span>
			</button>
		</div>
	);
}
