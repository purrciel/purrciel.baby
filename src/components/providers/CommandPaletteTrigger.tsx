'use client';

import { Search } from 'lucide-react';

import { useCommandPalette } from '@/components/providers/CommandPaletteProvider';
import { Button } from '@/components/ui/button';

export function CommandPaletteTrigger() {
	const { open } = useCommandPalette();

	return (
		<Button
			type="button"
			variant="outline"
			size="sm"
			onClick={open}
			className="rounded-full border-line bg-transparent px-3 text-soft hover:border-line-strong hover:bg-white/[0.04] hover:text-ink"
			aria-label="Открыть поиск и команды"
			title="Поиск и команды (Ctrl/Cmd+K)"
		>
			<Search className="size-3.5" />
			<span className="hidden sm:inline">поиск</span>
			<kbd className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[0.58rem] leading-none text-faint md:inline">
				⌘K
			</kbd>
		</Button>
	);
}
