'use client';

import {
	Bug,
	Copy,
	FileText,
	FlaskConical,
	Home,
	Link2,
	Music2,
	Sprout,
	Volume2,
	Waypoints,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from 'react';

import { useAudio } from '@/components/providers/AudioProvider';
import { useSound } from '@/components/providers/SoundProvider';
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/command';
import { useStoredFlag } from '@/lib/useStoredFlag';

export type PaletteNote = {
	slug: string;
	title: string;
	description: string;
	tags: string[];
};

export type PaletteProject = {
	title: string;
	description: string;
	href?: string;
	repo?: string;
};

type CommandPaletteContextValue = {
	open: () => void;
};

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

const staticPages = [
	{ href: '/', label: 'на главную', hint: 'кот', icon: Home },
	{ href: '/garden', label: 'сад', hint: 'заметки', icon: Sprout },
	{ href: '/lab', label: 'лаборатория', hint: 'проекты', icon: FlaskConical },
	{ href: '/world', label: 'мир', hint: 'комната', icon: Waypoints },
	{ href: '/#now', label: 'сейчас', hint: 'чем я занят', icon: Link2 },
];

export function CommandPaletteProvider({
	notes,
	projects,
	children,
}: {
	notes: PaletteNote[];
	projects: PaletteProject[];
	children: ReactNode;
}) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [secret] = useStoredFlag('purrciel:secret');
	const { playing, toggle: toggleMusic } = useAudio();
	const { enabled: soundOn, toggle: toggleSound } = useSound();

	const open = useCallback(() => setIsOpen(true), []);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
				event.preventDefault();
				setIsOpen((value) => !value);
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, []);

	const go = useCallback(
		(href: string) => {
			setIsOpen(false);

			if (href.startsWith('http')) {
				window.open(href, '_blank', 'noopener,noreferrer');
				return;
			}

			const [pathname, hash] = href.split('#');

			if (hash) {
				if (pathname && pathname !== window.location.pathname) {
					router.push(href);
					return;
				}
				const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
				document.getElementById(hash)?.scrollIntoView({
					behavior: reduce ? 'auto' : 'smooth',
				});
				return;
			}

			router.push(href);
		},
		[router],
	);

	const copyLink = useCallback(async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
		} catch {
			// clipboard может быть недоступен — просто закрываем палитру
		}
		setIsOpen(false);
	}, []);

	return (
		<CommandPaletteContext.Provider value={{ open }}>
			{children}

			<CommandDialog
				open={isOpen}
				onOpenChange={setIsOpen}
				title="Командная палитра"
				description="Поиск по разделам, заметкам и проектам"
				className="max-w-2xl border border-line bg-popover/95 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:max-w-2xl"
			>
				<Command
					label="Команды"
					loop
					className="rounded-[calc(var(--radius)-2px)] bg-transparent p-0"
				>
					<CommandInput placeholder="куда идём?" />

					<CommandList className="max-h-[min(58svh,26rem)] px-1 pb-1">
						<CommandEmpty className="py-10 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">
							Ничего не найдено. Даже кот.
						</CommandEmpty>

						<CommandGroup heading="разделы">
							{staticPages.map((page) => {
								const Icon = page.icon;

								return (
									<CommandItem
										key={page.href}
										value={`${page.label} ${page.hint} ${page.href}`}
										onSelect={() => go(page.href)}
										className="gap-3 rounded-lg px-3 py-2.5"
									>
										<Icon className="text-faint" />
										<span>{page.label}</span>
										<CommandShortcut>{page.hint}</CommandShortcut>
									</CommandItem>
								);
							})}
							{secret && (
								<CommandItem
									value="debug секрет комната"
									onSelect={() => go('/debug')}
									className="gap-3 rounded-lg px-3 py-2.5"
								>
									<Bug className="text-soul" />
									<span>debug-комната</span>
									<CommandShortcut>секрет</CommandShortcut>
								</CommandItem>
							)}
						</CommandGroup>

						{notes.length > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup heading="сад">
									{notes.map((note) => (
										<CommandItem
											key={note.slug}
											value={`${note.title} ${note.description} ${note.tags.join(' ')}`}
											onSelect={() => go(`/garden/${note.slug}`)}
											className="gap-3 rounded-lg px-3 py-2.5"
										>
											<FileText className="text-faint" />
											<span className="truncate">{note.title}</span>
											<CommandShortcut>заметка</CommandShortcut>
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}

						{projects.length > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup heading="лаборатория">
									{projects.map((project) => (
										<CommandItem
											key={project.title}
											value={`${project.title} ${project.description}`}
											onSelect={() => {
												const href = project.href ?? project.repo;
												if (href) go(href);
											}}
											className="gap-3 rounded-lg px-3 py-2.5"
										>
											<FlaskConical className="text-faint" />
											<span className="truncate">{project.title}</span>
											<CommandShortcut>проект</CommandShortcut>
										</CommandItem>
									))}
								</CommandGroup>
							</>
						)}

						<CommandSeparator />
						<CommandGroup heading="звук и ссылки">
							<CommandItem
								value="музыка включить выключить трек"
								onSelect={toggleMusic}
								className="gap-3 rounded-lg px-3 py-2.5"
							>
								<Music2 className="text-faint" />
								<span>{playing ? 'выключить музыку' : 'включить музыку'}</span>
								<CommandShortcut>{playing ? 'вкл' : 'выкл'}</CommandShortcut>
							</CommandItem>
							<CommandItem
								value="звук эффекты включить выключить"
								onSelect={toggleSound}
								className="gap-3 rounded-lg px-3 py-2.5"
							>
								<Volume2 className="text-faint" />
								<span>{soundOn ? 'выключить звуки' : 'включить звуки'}</span>
								<CommandShortcut>{soundOn ? 'вкл' : 'выкл'}</CommandShortcut>
							</CommandItem>
							<CommandItem
								value="скопировать ссылку url"
								onSelect={() => void copyLink()}
								className="gap-3 rounded-lg px-3 py-2.5"
							>
								<Copy className="text-faint" />
								<span>скопировать ссылку</span>
							</CommandItem>
						</CommandGroup>
					</CommandList>

					<div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-4 py-3 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-faint">
						<span className="flex items-center gap-1.5">
							<kbd className="rounded border border-line px-1.5 py-0.5">↑↓</kbd>
							навигация
						</span>
						<span className="flex items-center gap-1.5">
							<kbd className="rounded border border-line px-1.5 py-0.5">↵</kbd>
							выбрать
						</span>
						<span className="flex items-center gap-1.5">
							<kbd className="rounded border border-line px-1.5 py-0.5">esc</kbd>
							закрыть
						</span>
					</div>
				</Command>
			</CommandDialog>
		</CommandPaletteContext.Provider>
	);
}

export function useCommandPalette(): CommandPaletteContextValue {
	const value = useContext(CommandPaletteContext);
	if (!value) throw new Error('useCommandPalette must be used inside CommandPaletteProvider');
	return value;
}
