/**
 * Общее форматирование дат для сада и главной.
 * Строки трактуются как локальные даты YYYY-MM-DD, чтобы не сдвигаться на день.
 */
function toDate(value: Date | string): Date {
	return value instanceof Date ? value : new Date(`${value}T00:00:00`);
}

/** например "12 окт. 2026 г." */
export function formatDate(value: Date | string): string {
	return toDate(value).toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
	});
}

/** например "12 окт." */
export function formatShortDate(value: Date | string): string {
	return toDate(value).toLocaleDateString('ru-RU', {
		day: '2-digit',
		month: 'short',
	});
}
