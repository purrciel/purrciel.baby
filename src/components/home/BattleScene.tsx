'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useSound } from '@/components/providers/SoundProvider';
import { MusicPlayer } from '@/components/ui/MusicPlayer';
import { SoundToggle } from '@/components/ui/SoundToggle';
import dialogues from '@/data/dialogues.json';
import { useStoredFlag } from '@/lib/useStoredFlag';

import { DialogueBox } from './DialogueBox';
import { Hud } from './Hud';
import { MainMenu, type MenuItem } from './MainMenu';
import { StageCat } from './StageCat';

const KONAMI = [
	'ArrowUp',
	'ArrowUp',
	'ArrowDown',
	'ArrowDown',
	'ArrowLeft',
	'ArrowRight',
	'ArrowLeft',
	'ArrowRight',
	'b',
	'a',
];

function greeting(): string {
	const hour = new Date().getHours();
	if (hour < 5) return dialogues.greetings.night;
	if (hour < 12) return dialogues.greetings.morning;
	if (hour < 18) return dialogues.greetings.day;
	return dialogues.greetings.evening;
}

export function BattleScene({ menu }: { menu: MenuItem[] }) {
	const router = useRouter();
	const { blip } = useSound();

	const [text, setText] = useState(dialogues.fallback);
	const [srText, setSrText] = useState(dialogues.fallback);
	const [typing, setTyping] = useState(false);
	const [nextVisible, setNextVisible] = useState(true);
	const [active, setActive] = useState(0);
	const [enemy, setEnemy] = useState(dialogues.enemy);
	const [poked, setPoked] = useState(false);
	const [pokeCount, setPokeCount] = useState(0);
	const [mercy, setMercy] = useState(false);
	const [secret, setSecret] = useStoredFlag('purrciel:secret');

	const runRef = useRef(0);
	const timerRef = useRef<number | null>(null);
	const reduceRef = useRef(false);
	const konamiRef = useRef(0);

	const say = useCallback(
		(message: string, announce = false) => {
			if (timerRef.current !== null) {
				window.clearTimeout(timerRef.current);
				timerRef.current = null;
			}

			const run = ++runRef.current;
			setTyping(false);
			setNextVisible(false);
			if (announce) setSrText(message);

			if (reduceRef.current) {
				setText(message);
				setNextVisible(true);
				return;
			}

			setText('');
			setTyping(true);

			let index = 0;
			const step = () => {
				if (run !== runRef.current) return;

				if (index >= message.length) {
					setTyping(false);
					setNextVisible(true);
					return;
				}

				const char = message[index++];
				setText((previous) => previous + char);
				if (char !== ' ') blip(520 + Math.random() * 90);

				timerRef.current = window.setTimeout(step, '.,—!?'.includes(char) ? 170 : 24);
			};

			step();
		},
		[blip],
	);

	useEffect(() => {
		reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Приветствие зависит от времени суток, поэтому стартует на клиенте
		// после гидратации, а не во время рендера.
		const timer = window.setTimeout(() => say(greeting(), true), 0);

		return () => {
			window.clearTimeout(timer);
			if (timerRef.current !== null) window.clearTimeout(timerRef.current);
		};
	}, [say]);

	const go = useCallback(
		(href: string) => {
			if (href.startsWith('#')) {
				const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
				document.querySelector(href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
				return;
			}
			router.push(href);
		},
		[router],
	);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.ctrlKey || event.metaKey || event.altKey) return;

			const target = event.target as HTMLElement | null;
			if (target && /INPUT|TEXTAREA|SELECT/.test(target.tagName)) return;

			const itemIndex = Number(event.key) - 1;
			if (Number.isInteger(itemIndex) && itemIndex >= 0 && itemIndex < menu.length) {
				event.preventDefault();
				go(menu[itemIndex].href);
				return;
			}

			konamiRef.current =
				event.key === KONAMI[konamiRef.current]
					? konamiRef.current + 1
					: event.key === KONAMI[0]
						? 1
						: 0;

			if (konamiRef.current === KONAMI.length) {
				konamiRef.current = 0;
				setMercy(true);
				setEnemy(dialogues.secretEnemy);
				setSecret(true);
				say(dialogues.secret, true);
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [go, menu, say, setSecret]);

	const poke = useCallback(() => {
		setPoked(false);
		requestAnimationFrame(() => setPoked(true));
		window.setTimeout(() => setPoked(false), 320);

		const line = dialogues.pokes[Math.min(pokeCount, dialogues.pokes.length - 1)];
		say(line, true);

		const next = pokeCount + 1;
		setPokeCount(next);

		if (next >= dialogues.pokes.length) {
			setMercy(true);
			setEnemy(dialogues.mercy);
		}
	}, [pokeCount, say]);

	return (
		<section
			className="relative mx-auto flex min-h-[82svh] w-full max-w-5xl flex-col gap-5 px-4 pb-10 pt-5 sm:px-6"
			aria-label="Главная сцена"
		>
			<div className="crt-vignette" />
			<Hud />

			<div className="flex flex-1 flex-col items-center justify-center gap-4">
				<div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
					<StageCat onPoke={poke} poked={poked} mercy={mercy} />
					<MusicPlayer />
				</div>

				<p className="m-0 font-serif text-[0.7rem] tracking-[0.06em] text-white">{enemy}</p>
			</div>

			<DialogueBox
				text={text}
				typing={typing}
				srText={srText}
				nextVisible={nextVisible}
			>
				<MainMenu
					items={menu}
					active={active}
					onActivate={setActive}
					onSay={(line) => say(line)}
					onHash={go}
				/>
			</DialogueBox>

			<div className="flex items-center justify-between gap-4 font-serif text-[0.55rem] tracking-[0.06em] text-white/60">
				<span>[1–{menu.length}] — быстрый переход</span>
				<div className="flex items-center gap-4">
					{secret && (
						<Link href="/debug" className="text-choose hover:underline">
							debug
						</Link>
					)}
					<SoundToggle />
				</div>
			</div>
		</section>
	);
}
