import labData from '@/data/lab.json';

export type LabStatus = 'active' | 'done' | 'paused';

export type LabProject = {
	title: string;
	description: string;
	status: LabStatus;
	stack: string[];
	year?: number;
	href?: string;
	repo?: string;
};

export const statusLabels: Record<LabStatus, string> = {
	active: 'в работе',
	done: 'готово',
	paused: 'пауза',
};

export const labProjects = labData as LabProject[];
