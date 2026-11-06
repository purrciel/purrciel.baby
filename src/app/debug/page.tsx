import type { Metadata } from 'next';
import Link from 'next/link';

import { PageHeader } from '@/components/ui/PageHeader';
import { PixelCat } from '@/components/ui/PixelCat';
import { getAllNotes } from '@/lib/content';
import { labProjects } from '@/lib/lab';

export const metadata: Metadata = {
	title: 'DEBUG',
	description: 'Секретная комната purrciel.baby.',
	robots: { index: false, follow: false },
};

export default function DebugPage() {
	const notes = getAllNotes({ includeDrafts: true });

	return (
		<div className="shell-narrow flex flex-col gap-8 py-10 sm:py-14">
			<PageHeader
				eyebrow="секрет"
				title="Debug room"
				description="Ты нашёл комнату, которой нет на карте. Здесь только цифры, кот и немного служебной магии."
			/>

			<div className="box flex flex-col gap-5">
				<div className="flex items-center gap-4">
					<PixelCat className="h-14 w-14" asleep />
					<p className="m-0 text-soft">
						Кот спит. Он знал, что ты дойдёшь. Debug-комната открывается
						konami-кодом на главной сцене.
					</p>
				</div>

				<dl className="m-0 grid gap-2">
					<div className="now-row">
						<dt>ЗАМЕТОК</dt>
						<dd>{notes.length}</dd>
					</div>
					<div className="now-row">
						<dt>ПРОЕКТОВ</dt>
						<dd>{labProjects.length}</dd>
					</div>
					<div className="now-row">
						<dt>СТЕК</dt>
						<dd>Next.js 16 · React 19 · Tailwind 4</dd>
					</div>
					<div className="now-row">
						<dt>СЕКРЕТОВ</dt>
						<dd>где-то рядом</dd>
					</div>
				</dl>
			</div>

			<div className="box">
				<p className="meta m-0 mb-3">* что тут есть</p>
				<ul className="m-0 flex list-none flex-col gap-2 p-0 text-soft">
					<li>* непрерывная музыка между страницами</li>
					<li>* command palette по Ctrl/Cmd + K</li>
					<li>* кот, который становится другом</li>
					<li>* и эта комната</li>
				</ul>
			</div>

			<div className="flex flex-wrap gap-3">
				<Link href="/" className="btn">
					на главную
				</Link>
				<Link href="/garden" className="btn btn--ghost">
					в сад
				</Link>
				<Link href="/lab" className="btn btn--ghost">
					в лаб
				</Link>
			</div>
		</div>
	);
}
