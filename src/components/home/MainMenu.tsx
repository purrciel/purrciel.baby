'use client';

import Link from 'next/link';

import { Heart } from '@/components/ui/Heart';

export type MenuItem = {
	href: string;
	label: string;
	say: string;
};

export function MainMenu({
	items,
	active,
	onActivate,
	onSay,
	onHash,
}: {
	items: MenuItem[];
	active: number;
	onActivate: (index: number) => void;
	onSay: (line: string) => void;
	onHash: (href: string) => void;
}) {
	return (
		<nav
			className="menu mt-5 gap-x-6 gap-y-2"
			data-menu="h"
			data-ready=""
			aria-label="Разделы"
		>
			{items.map((item, index) => (
				<Link
					key={item.href}
					href={item.href}
					className="choice"
					data-active={active === index ? '' : undefined}
					data-key={index + 1}
					onMouseEnter={() => {
						onActivate(index);
						onSay(item.say);
					}}
					onFocus={() => {
						onActivate(index);
						onSay(item.say);
					}}
					onClick={(event) => {
						if (!item.href.startsWith('#')) return;
						event.preventDefault();
						onHash(item.href);
					}}
				>
					<Heart />
					{item.label}
				</Link>
			))}
		</nav>
	);
}
