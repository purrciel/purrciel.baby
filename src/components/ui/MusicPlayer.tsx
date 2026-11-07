'use client';

import { Music2 } from 'lucide-react';

import { useAudio } from '@/components/providers/AudioProvider';
import { cn } from '@/lib/utils';

function Equalizer() {
	return (
		<span className="music-eq" aria-hidden="true">
			<i />
			<i />
			<i />
			<i />
		</span>
	);
}

export function MusicPlayer({
	variant = 'hero',
	className,
}: {
	variant?: 'hero' | 'footer';
	className?: string;
}) {
	const { playing, error, toggle } = useAudio();
	const label = error ? 'нет трека' : playing ? 'музыка: вкл' : 'музыка: выкл';
	const title = error
		? 'Положи трек в public/audio/theme.mp3'
		: 'Фоновая музыка (не прерывается при переходах)';

	if (variant === 'footer') {
		return (
			<button
				type="button"
				onClick={toggle}
				disabled={error}
				aria-pressed={playing}
				title={title}
				className={cn(
					'meta inline-flex items-center gap-2 border-0 bg-transparent p-0 text-left transition-colors hover:text-ink disabled:opacity-60',
					playing && 'text-soul',
					className,
				)}
			>
				<Music2 className="size-3.5" />
				{error ? '♪ нет трека' : playing ? '♪ музыка: вкл' : '♪ музыка: выкл'}
			</button>
		);
	}

	return (
		<button
			type="button"
			onClick={toggle}
			disabled={error}
			aria-pressed={playing}
			title={title}
			className={cn(
				'inline-flex items-center gap-3 rounded-full border px-4 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors',
				playing
					? 'border-soul/45 bg-soul-soft text-ink'
					: 'border-line bg-white/[0.02] text-soft hover:border-line-strong hover:text-ink',
				error && 'cursor-default opacity-60',
				className,
			)}
		>
			<span
				className={cn(
					'flex size-7 items-center justify-center rounded-full border',
					playing ? 'border-soul/50 text-soul' : 'border-line text-faint',
				)}
			>
				{playing ? (
					<Equalizer />
				) : (
					<span aria-hidden="true" className="text-sm leading-none">
						♪
					</span>
				)}
			</span>
			<span>{label}</span>
		</button>
	);
}
