'use client';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from 'react';

type AudioState = {
	playing: boolean;
	error: boolean;
	play: () => void;
	pause: () => void;
	toggle: () => void;
};

const AudioPlayerContext = createContext<AudioState | null>(null);

const STORAGE_KEY = 'purrciel:music';
const VOLUME = 0.35;

export function AudioProvider({ src, children }: { src: string; children: ReactNode }) {
	const audioRef = useRef<HTMLAudioElement>(null);
	const fadeRef = useRef<number | null>(null);
	const [playing, setPlaying] = useState(false);
	const [error, setError] = useState(false);

	const fadeTo = useCallback((target: number, duration = 500, done?: () => void) => {
		const audio = audioRef.current;
		if (!audio) return;

		if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current);
		const start = audio.volume;
		const startedAt = performance.now();

		const step = (now: number) => {
			const progress = Math.min(1, (now - startedAt) / duration);
			audio.volume = start + (target - start) * progress;

			if (progress < 1) {
				fadeRef.current = requestAnimationFrame(step);
			} else {
				fadeRef.current = null;
				done?.();
			}
		};

		fadeRef.current = requestAnimationFrame(step);
	}, []);

	const play = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.volume = 0;
		const attempt = audio.play();

		if (attempt) {
			attempt
				.then(() => {
					setPlaying(true);
					fadeTo(VOLUME);
					localStorage.setItem(STORAGE_KEY, 'on');
				})
				.catch(() => {
					setPlaying(false);
				});
		}
	}, [fadeTo]);

	const pause = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;

		setPlaying(false);
		localStorage.setItem(STORAGE_KEY, 'off');
		fadeTo(0, 300, () => audio.pause());
	}, [fadeTo]);

	const toggle = useCallback(() => {
		const audio = audioRef.current;
		if (!audio) return;
		if (audio.paused) play();
		else pause();
	}, [pause, play]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.volume = 0;

		const onPlay = () => setPlaying(true);
		const onPause = () => setPlaying(false);
		const onError = () => {
			setError(true);
			setPlaying(false);
		};

		audio.addEventListener('play', onPlay);
		audio.addEventListener('pause', onPause);
		audio.addEventListener('error', onError);

		const intent = localStorage.getItem(STORAGE_KEY) === 'on';

		let removeGesture: (() => void) | undefined;
		if (intent) {
			const resume = () => {
				removeGesture?.();
				play();
			};
			document.addEventListener('pointerdown', resume, { once: true });
			document.addEventListener('keydown', resume, { once: true });
			removeGesture = () => {
				document.removeEventListener('pointerdown', resume);
				document.removeEventListener('keydown', resume);
			};

			// Иногда браузер разрешает продолжить сразу — пробуем.
			play();
		}

		return () => {
			audio.removeEventListener('play', onPlay);
			audio.removeEventListener('pause', onPause);
			audio.removeEventListener('error', onError);
			removeGesture?.();
			if (fadeRef.current !== null) cancelAnimationFrame(fadeRef.current);
		};
	}, [play]);

	return (
		<AudioPlayerContext.Provider value={{ playing, error, play, pause, toggle }}>
			<audio ref={audioRef} src={src} loop preload="none" />
			{children}
		</AudioPlayerContext.Provider>
	);
}

export function useAudio(): AudioState {
	const value = useContext(AudioPlayerContext);
	if (!value) throw new Error('useAudio must be used inside AudioProvider');
	return value;
}
