'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CommandPaletteTrigger } from '@/components/providers/CommandPaletteTrigger';
import { Heart } from '@/components/ui/Heart';
import { cn } from '@/lib/cn';

const nav = [
	{ href: '/garden', label: 'сад' },
	{ href: '/lab', label: 'лаб' },
	{ href: '/world', label: 'мир' },
];

export function Header() {
	const pathname = usePathname();

	const isCurrent = (href: string) =>
		href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

	return (
		<header className="sticky top-0 z-40 border-b-4 border-line bg-paper">
			<div className="shell flex flex-wrap items-center justify-between gap-x-5 gap-y-2 py-3">
				<Link
					href="/"
					className="flex items-center gap-2 font-serif text-[0.8rem] text-ink sm:text-sm"
				>
					<Heart />
					<span>PURRCIEL</span>
				</Link>

				<div className="flex items-center gap-3 sm:gap-6">
					<nav className="flex items-center gap-4 sm:gap-6" aria-label="Основная">
						{nav.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									'text-[0.72rem] uppercase tracking-[0.14em] transition-colors hover:text-choose',
									isCurrent(item.href) ? 'text-choose underline underline-offset-4' : 'text-soft',
								)}
								aria-current={isCurrent(item.href) ? 'page' : undefined}
							>
								{item.label}
							</Link>
						))}
					</nav>

					<CommandPaletteTrigger />
				</div>
			</div>
		</header>
	);
}
