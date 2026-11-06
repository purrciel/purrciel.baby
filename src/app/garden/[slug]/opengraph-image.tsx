import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { ImageResponse } from 'next/og';

import { getNote } from '@/lib/content';
import { formatDate } from '@/lib/date';

export const runtime = 'nodejs';
export const alt = 'Заметка из сада purrciel.baby';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function NoteOpengraphImage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const note = getNote(slug);

	const [pressStart, pixelify] = await Promise.all([
		readFile(path.join(process.cwd(), 'src/assets/fonts/press-start-2p.ttf')),
		readFile(path.join(process.cwd(), 'src/assets/fonts/pixelify-sans-400.ttf')),
	]);

	const title = note?.title ?? 'Заметка из сада';
	const description = note?.description ?? 'Маленький пиксельный мир purrciel.baby.';
	const date = note ? formatDate(note.created) : 'PURRCIEL.BABY';
	const meta = note
		? `${note.readingMinutes} мин · ${note.tags
				.slice(0, 3)
				.map((tag) => `#${tag}`)
				.join(' ')}`
		: 'сад заметок';
	const titleSize = title.length > 56 ? 32 : title.length > 34 ? 40 : 52;

	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				background: '#000000',
				color: '#ffffff',
				border: '8px solid #ffffff',
				padding: '56px 64px',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					fontFamily: 'Press Start 2P',
					fontSize: 14,
					color: '#8a8a8a',
				}}
			>
				<span>* ЗАМЕТКА</span>
				<span>{date}</span>
			</div>

			<div style={{ display: 'flex', flexDirection: 'column', gap: 40, maxWidth: 1000 }}>
				<div
					style={{
						fontFamily: 'Press Start 2P',
						fontSize: titleSize,
						lineHeight: 1.45,
						maxWidth: 960,
					}}
				>
					{title}
				</div>

				<div
					style={{
						marginTop: 8,
						maxWidth: 920,
						fontFamily: 'Pixelify Sans',
						fontSize: 26,
						lineHeight: 1.55,
						color: '#d2d2d2',
					}}
				>
					{description.slice(0, 180)}
				</div>
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					fontFamily: 'Press Start 2P',
					fontSize: 12,
					color: '#8a8a8a',
				}}
			>
				<span>{meta}</span>
				<span>purrciel.baby</span>
			</div>
		</div>,
		{
			...size,
			fonts: [
				{ name: 'Press Start 2P', data: pressStart, style: 'normal', weight: 400 },
				{ name: 'Pixelify Sans', data: pixelify, style: 'normal', weight: 400 },
			],
		},
	);
}
