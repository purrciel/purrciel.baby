'use client';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	type ReactNode,
} from 'react';

import { useStoredFlag } from '@/lib/useStoredFlag';

type SoundState = {
	enabled: boolean;
	toggle: () => void;
	blip: (frequency?: number) => void;
};

const SoundContext = createContext<SoundState | null>(null);
const SOUND_KEY = 'purrciel:sound';

export function SoundProvider({ children }: { children: ReactNode }) {
	const [enabled, setEnabled] = useStoredFlag(SOUND_KEY);
	const enabledRef = useRef(enabled);
	const contextRef = useRef<AudioContext | null>(null);

	// Держим актуальное значение для стабильного blip: иначе его смена
	// пересоздаёт колбэки и может оборвать печатающийся текст.
	useEffect(() => {
		enabledRef.current = enabled;
	}, [enabled]);

	const toggle = useCallback(() => {
		setEnabled(!enabled);
	}, [enabled, setEnabled]);

	const blip = useCallback((frequency = 520) => {
		if (!enabledRef.current || typeof window === 'undefined') return;

		const AudioCtor = window.AudioContext;
		if (!AudioCtor) return;

		contextRef.current ??= new AudioCtor();
		const context = contextRef.current;
		if (context.state === 'suspended') void context.resume();

		const oscillator = context.createOscillator();
		const gain = context.createGain();

		oscillator.type = 'square';
		oscillator.frequency.value = frequency;
		gain.gain.value = 0.015;

		oscillator.connect(gain).connect(context.destination);
		oscillator.start();
		oscillator.stop(context.currentTime + 0.035);
	}, []);

	return (
		<SoundContext.Provider value={{ enabled, toggle, blip }}>{children}</SoundContext.Provider>
	);
}

export function useSound(): SoundState {
	const value = useContext(SoundContext);
	if (!value) throw new Error('useSound must be used inside SoundProvider');
	return value;
}
