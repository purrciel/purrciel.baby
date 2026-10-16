export interface Experiment {
	title: string;
	state: 'done' | 'wip';
}

/** Эксперименты лаборатории. Используются и на /lab, и в панели «ЛАБ». */
export const experiments: Experiment[] = [
	{ title: 'Рейтрейсер за выходные', state: 'done' },
	{ title: 'Крошечный синтезатор в браузере', state: 'wip' },
	{ title: 'Блум-фильтр в терминале', state: 'done' },
	{ title: 'Пиксельная сортировка фотоархива', state: 'wip' },
];
