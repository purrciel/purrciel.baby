'use client';

import { Volume2, VolumeX } from 'lucide-react';

import { useSound } from '@/components/providers/SoundProvider';
import { cn } from '@/lib/utils';

export function SoundToggle({ className }: { className?: string }) {
	const { enabled, toggle } = useSound();
	const Icon = enabled ? Volume2 : VolumeX;

	return (
		<button
			type="button"
			onClick={toggle}
			aria-pressed={enabled}
			title="Звуковые эффекты"
			className={cn(
				'meta inline-flex items-center gap-2 border-0 bg-transparent p-0 text-left transition-colors hover:text-ink',
				enabled && 'text-soul',
				className,
			)}
		>
			<Icon className="size-3.5" />
			{enabled ? 'звук: вкл' : 'звук: выкл'}
		</button>
	);
}
