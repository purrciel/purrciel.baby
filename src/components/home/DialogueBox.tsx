import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function DialogueBox({
	text,
	typing,
	srText,
	nextVisible,
	children,
}: {
	text: string;
	typing: boolean;
	srText: string;
	nextVisible: boolean;
	children?: ReactNode;
}) {
	return (
		<div className="panel relative w-full overflow-hidden p-5 sm:p-6">
			<div className="mb-4 flex items-center justify-between gap-4 border-b border-line pb-3">
				<span className="pixel-label text-soul">✦ диалог</span>
				<span className="meta">encounter · 01</span>
			</div>

			<p className="m-0 min-h-[4.5em] text-lg leading-relaxed text-ink sm:text-xl">
				<span className="sr-only" aria-live="polite">
					{srText}
				</span>
				<span aria-hidden="true" className={cn(typing && 'type-cursor')}>
					{text}
				</span>
			</p>

			{children}

			<span
				className={cn(
					'pointer-events-none absolute bottom-3 right-5 font-mono text-xs text-soul',
					!nextVisible && 'hidden',
				)}
				aria-hidden="true"
			>
				▼
			</span>
		</div>
	);
}
