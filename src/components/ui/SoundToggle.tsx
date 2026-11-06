'use client';

import { useSound } from '@/components/providers/SoundProvider';
import { cn } from '@/lib/cn';

export function SoundToggle({ className }: { className?: string }) {
	const { enabled, toggle } = useSound();

	return (
		<button
			type="button"
			onClick={toggle}
			aria-pressed={enabled}
			title="Звуковые эффекты"
			className={cn(
				'border-0 bg-transparent p-0 text-left font-[inherit] text-[inherit] uppercase tracking-[inherit] transition-colors hover:text-choose',
				enabled && 'text-choose',
				className,
			)}
		>
			{enabled ? 'звук: вкл' : 'звук: выкл'}
		</button>
	);
}
