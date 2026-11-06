import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

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
		<div className="box relative w-full">
			<p className="m-0 min-h-[4.2em] text-[1.2rem] leading-[1.6] text-white">
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
					'next pointer-events-none absolute bottom-2 right-4 text-sm text-white',
					!nextVisible && 'hidden',
				)}
				aria-hidden="true"
			>
				▼
			</span>
		</div>
	);
}
