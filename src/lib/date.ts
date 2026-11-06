/**
 * Даты в «саду» хранятся как YYYY-MM-DD и трактуются как локальные,
 * чтобы не сдвигаться на день из-за UTC.
 */
function toDate(value: Date | string): Date {
	return value instanceof Date ? value : new Date(`${value}T00:00:00`);
}

const longFormatter = new Intl.DateTimeFormat('ru-RU', {
	day: '2-digit',
	month: 'short',
	year: 'numeric',
});

const shortFormatter = new Intl.DateTimeFormat('ru-RU', {
	day: '2-digit',
	month: 'short',
});

/** например «12 окт. 2026 г.» */
export function formatDate(value: Date | string): string {
	return longFormatter.format(toDate(value));
}

/** например «12 окт.» */
export function formatShortDate(value: Date | string): string {
	return shortFormatter.format(toDate(value));
}

/** например «12 октября 2026» для JSON-LD */
export function formatIsoDate(value: Date | string): string {
	return toDate(value).toISOString();
}
