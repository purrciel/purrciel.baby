'use client';

import { PixelCat } from '@/components/ui/PixelCat';
import { cn } from '@/lib/cn';

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
		<button
			type="button"
			onClick={onPoke}
			aria-label="Потрогать кота"
			className="group relative border-0 bg-transparent p-0 leading-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-dashed focus-visible:outline-white"
		>
			<PixelCat
				className={cn(
					'bob h-auto w-[min(200px,46vw)] transition-transform group-hover:-translate-y-1',
					poked && 'cat-poke',
					mercy && 'cat-mercy',
				)}
			/>
			<span className="meta mt-3 block text-center opacity-0 transition-opacity group-hover:opacity-70 group-focus-visible:opacity-70">
				потрогать
			</span>
		</button>
	);
}
