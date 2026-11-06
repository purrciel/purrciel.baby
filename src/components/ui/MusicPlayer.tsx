'use client';

import { useAudio } from '@/components/providers/AudioProvider';
import { cn } from '@/lib/cn';

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
					'border-0 bg-transparent p-0 text-left font-[inherit] text-[inherit] uppercase tracking-[inherit] transition-colors hover:text-choose disabled:opacity-60',
					playing && 'text-choose',
					className,
				)}
			>
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
				'inline-flex items-center gap-3 rounded-lg border-4 px-4 py-3 font-serif text-[0.8rem] leading-none transition-colors',
				playing
					? 'border-choose text-choose'
					: 'border-white text-white hover:border-choose hover:text-choose',
				error && 'cursor-default opacity-60',
				className,
			)}
		>
			{playing ? (
				<Equalizer />
			) : (
				<span aria-hidden="true" className="text-lg leading-none">
					♪
				</span>
			)}
			<span>{label}</span>
		</button>
	);
}
