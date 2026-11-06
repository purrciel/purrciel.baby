'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	return (
		<>
			<div key={`wipe-${pathname}`} className="route-wipe" aria-hidden="true" />
			<div key={`page-${pathname}`} className="page-enter flex-1">
				{children}
			</div>
		</>
	);
}
