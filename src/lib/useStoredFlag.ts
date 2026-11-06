'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Флаги в localStorage как внешнее хранилище: сервер всегда видит `false`,
 * клиент — актуальное значение. Это избавляет от setState в эффектах
 * и корректно переживает гидратацию.
 */
const FLAG_EVENT = 'purrciel:flag';

function subscribe(onChange: () => void) {
	window.addEventListener('storage', onChange);
	window.addEventListener(FLAG_EVENT, onChange);

	return () => {
		window.removeEventListener('storage', onChange);
		window.removeEventListener(FLAG_EVENT, onChange);
	};
}

function getServerSnapshot() {
	return false;
}

export function useStoredFlag(key: string): [boolean, (value: boolean) => void] {
	const getSnapshot = useCallback(() => localStorage.getItem(key) === '1', [key]);
	const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	const set = useCallback(
		(next: boolean) => {
			localStorage.setItem(key, next ? '1' : '0');
			window.dispatchEvent(new Event(FLAG_EVENT));
		},
		[key],
	);

	return [value, set];
}
