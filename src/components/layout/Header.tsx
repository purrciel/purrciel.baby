'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import { CommandPaletteTrigger } from '@/components/providers/CommandPaletteTrigger';
import { Heart } from '@/components/ui/Heart';
import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const nav = [
	{ href: '/garden', label: 'сад', index: '01' },
	{ href: '/lab', label: 'лаб', index: '02' },
	{ href: '/world', label: 'мир', index: '03' },
];

export function Header() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	const isCurrent = (href: string) =>
		href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

	return (
		<header className="sticky top-0 z-40 border-b border-line bg-background/70 backdrop-blur-xl">
			<div className="shell flex h-16 items-center justify-between gap-6">
				<Link
					href="/"
					className="group flex items-center gap-2.5 text-sm font-medium tracking-tight text-ink"
					aria-label="purrciel.baby — на главную"
				>
					<Heart className="size-3.5 transition-transform duration-300 group-hover:scale-125" />
					<span>
						purrciel<span className="text-faint">.baby</span>
					</span>
				</Link>

				<div className="flex items-center gap-2 sm:gap-4">
					<nav className="hidden items-center gap-1 md:flex" aria-label="Основная">
						{nav.map((item) => {
							const current = isCurrent(item.href);

							return (
								<Link
									key={item.href}
									href={item.href}
									className={cn(
										'group relative flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors',
										current ? 'text-ink' : 'text-soft hover:text-ink',
									)}
									aria-current={current ? 'page' : undefined}
								>
									<span
										className={cn(
											'font-mono text-[0.6rem] tracking-[0.1em] transition-colors',
											current ? 'text-soul' : 'text-faint group-hover:text-soft',
										)}
									>
										{item.index}
									</span>
									{item.label}
									{current && (
										<span className="absolute inset-x-3 -bottom-px h-px bg-soul" />
									)}
								</Link>
							);
						})}
					</nav>

					<span className="hidden h-5 w-px bg-line sm:block" aria-hidden="true" />

					<CommandPaletteTrigger />

					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger
							render={
								<Button
									variant="ghost"
									size="icon-sm"
									className="md:hidden"
									aria-label="Открыть меню"
								/>
							}
						>
							<Menu className="size-4" />
						</SheetTrigger>

						<SheetContent
							side="right"
							className="border-line bg-background/95 backdrop-blur-xl"
						>
							<SheetHeader>
								<SheetTitle className="flex items-center gap-2 text-base font-medium">
									<Heart className="size-3" />
									purrciel.baby
								</SheetTitle>
								<SheetDescription className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-faint">
									маленький мир
								</SheetDescription>
							</SheetHeader>

							<nav className="flex flex-col px-4" aria-label="Мобильная навигация">
								{nav.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										onClick={() => setOpen(false)}
										className={cn(
											'flex items-center gap-3 border-b border-line py-4 text-lg tracking-tight transition-colors',
											isCurrent(item.href) ? 'text-soul' : 'text-soft hover:text-ink',
										)}
										aria-current={isCurrent(item.href) ? 'page' : undefined}
									>
										<span className="font-mono text-[0.62rem] tracking-[0.1em] text-faint">
											{item.index}
										</span>
										{item.label}
									</Link>
								))}
							</nav>

							<div className="mt-auto p-4">
								<p className="font-mono text-[0.62rem] uppercase leading-relaxed tracking-[0.14em] text-faint">
									Ctrl / Cmd + K — поиск по сайту
								</p>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
