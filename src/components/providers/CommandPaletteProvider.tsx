'use client';

import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from 'react';

import { Heart } from '@/components/ui/Heart';
import { useAudio } from '@/components/providers/AudioProvider';
import { useSound } from '@/components/providers/SoundProvider';
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
	{ href: '/', label: 'на главную', hint: 'кот' },
	{ href: '/garden', label: 'сад', hint: 'заметки' },
	{ href: '/lab', label: 'лаборатория', hint: 'проекты' },
	{ href: '/world', label: 'мир', hint: 'комната' },
	{ href: '/#now', label: 'сейчас', hint: 'чем я занят' },
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
	const dialogRef = useRef<HTMLDialogElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
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

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen && !dialog.open) {
			dialog.showModal();
			document.body.style.overflow = 'hidden';
			requestAnimationFrame(() => inputRef.current?.focus());
		} else if (!isOpen && dialog.open) {
			dialog.close();
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

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

			<dialog
				ref={dialogRef}
				className="cmd-dialog"
				aria-label="Командная палитра"
				onClose={() => setIsOpen(false)}
				onClick={(event) => {
					if (event.target === event.currentTarget) setIsOpen(false);
				}}
			>
				{isOpen && (
					<Command label="Команды" loop className="cmd">
						<Command.Input
							ref={inputRef}
							placeholder="куда идём?"
							className="cmd-input"
						/>

						<Command.List className="cmd-list">
							<Command.Empty className="cmd-empty">
								Ничего не найдено. Даже кот.
							</Command.Empty>

							<Command.Group heading="разделы" className="cmd-group">
								{staticPages.map((page) => (
									<Command.Item
										key={page.href}
										value={`${page.label} ${page.hint} ${page.href}`}
										className="cmd-item"
										onSelect={() => go(page.href)}
									>
										<Heart />
										<span>{page.label}</span>
										<small>{page.hint}</small>
									</Command.Item>
								))}
								{secret && (
									<Command.Item
										value="debug секрет комната"
										className="cmd-item"
										onSelect={() => go('/debug')}
									>
										<Heart />
										<span>debug-комната</span>
										<small>секрет</small>
									</Command.Item>
								)}
							</Command.Group>

							{notes.length > 0 && (
								<Command.Group heading="сад" className="cmd-group">
									{notes.map((note) => (
										<Command.Item
											key={note.slug}
											value={`${note.title} ${note.description} ${note.tags.join(' ')}`}
											className="cmd-item"
											onSelect={() => go(`/garden/${note.slug}`)}
										>
											<Heart />
											<span>{note.title}</span>
											<small>заметка</small>
										</Command.Item>
									))}
								</Command.Group>
							)}

							{projects.length > 0 && (
								<Command.Group heading="лаборатория" className="cmd-group">
									{projects.map((project) => (
										<Command.Item
											key={project.title}
											value={`${project.title} ${project.description}`}
											className="cmd-item"
											onSelect={() => {
												const href = project.href ?? project.repo;
												if (href) go(href);
											}}
										>
											<Heart />
											<span>{project.title}</span>
											<small>проект</small>
										</Command.Item>
									))}
								</Command.Group>
							)}

							<Command.Group heading="звук и ссылки" className="cmd-group">
								<Command.Item
									value="музыка включить выключить трек"
									className="cmd-item"
									onSelect={toggleMusic}
								>
									<span aria-hidden="true">♪</span>
									<span>{playing ? 'выключить музыку' : 'включить музыку'}</span>
									<small>{playing ? 'вкл' : 'выкл'}</small>
								</Command.Item>
								<Command.Item
									value="звук эффекты включить выключить"
									className="cmd-item"
									onSelect={toggleSound}
								>
									<span aria-hidden="true">▮</span>
									<span>{soundOn ? 'выключить звуки' : 'включить звуки'}</span>
									<small>{soundOn ? 'вкл' : 'выкл'}</small>
								</Command.Item>
								<Command.Item
									value="скопировать ссылку url"
									className="cmd-item"
									onSelect={() => void copyLink()}
								>
									<span aria-hidden="true">⧉</span>
									<span>скопировать ссылку</span>
								</Command.Item>
							</Command.Group>
						</Command.List>

						<div className="cmd-footer" aria-hidden="true">
							<span>
								<kbd className="cmd-kbd">↑↓</kbd> навигация
							</span>
							<span>
								<kbd className="cmd-kbd">↵</kbd> выбрать
							</span>
							<span>
								<kbd className="cmd-kbd">esc</kbd> закрыть
							</span>
						</div>
					</Command>
				)}
			</dialog>
		</CommandPaletteContext.Provider>
	);
}

export function useCommandPalette(): CommandPaletteContextValue {
	const value = useContext(CommandPaletteContext);
	if (!value) throw new Error('useCommandPalette must be used inside CommandPaletteProvider');
	return value;
}
