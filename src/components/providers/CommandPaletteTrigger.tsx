'use client';

import { useCommandPalette } from '@/components/providers/CommandPaletteProvider';

export function CommandPaletteTrigger() {
	const { open } = useCommandPalette();

	return (
		<button
			type="button"
			onClick={open}
			className="inline-flex items-center gap-2 border-2 border-line px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.12em] text-soft transition-colors hover:border-choose hover:text-choose"
			aria-label="Открыть поиск и команды"
			title="Поиск и команды (Ctrl/Cmd+K)"
		>
			<span aria-hidden="true">⌕</span>
			<span className="hidden sm:inline">поиск</span>
			<kbd className="cmd-kbd hidden md:inline">⌘K</kbd>
		</button>
	);
}
