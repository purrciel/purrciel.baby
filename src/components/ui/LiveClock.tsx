'use client';

import { useEffect, useState } from 'react';

function useNow() {
	const [now, setNow] = useState<Date | null>(null);

	useEffect(() => {
		const tick = () => setNow(new Date());
		// Первый тик — через кадр, чтобы не трогать state синхронно в эффекте.
		const frame = window.requestAnimationFrame(tick);
		const timer = window.setInterval(tick, 15000);

		return () => {
			window.cancelAnimationFrame(frame);
			window.clearInterval(timer);
		};
	}, []);

	return now;
}

export function LiveClock({ variant = 'time' }: { variant?: 'time' | 'long' }) {
	const now = useNow();

	if (!now) {
		return <span className="tabular-nums">{variant === 'time' ? '--:--' : '—'}</span>;
	}

	if (variant === 'long') {
		const date = now.toLocaleDateString('ru-RU', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
		});
		const time = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
		return <span className="tabular-nums">{date} · {time}</span>;
	}

	return (
		<span className="tabular-nums">
			{now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
		</span>
	);
}
