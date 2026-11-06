import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { ImageResponse } from 'next/og';

import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const alt = `${site.name} — маленький пиксельный мир`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function Cat() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<div style={{ display: 'flex', gap: 92, marginBottom: -6 }}>
				<div style={{ display: 'flex', width: 46, height: 64, background: '#ffffff' }} />
				<div style={{ display: 'flex', width: 46, height: 64, background: '#ffffff' }} />
			</div>

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 18,
					width: 224,
					height: 176,
					background: '#ffffff',
				}}
			>
				<div style={{ display: 'flex', gap: 56 }}>
					<div style={{ display: 'flex', width: 28, height: 28, background: '#000000' }} />
					<div style={{ display: 'flex', width: 28, height: 28, background: '#000000' }} />
				</div>
				<div style={{ display: 'flex', width: 22, height: 12, background: '#ff2b2b' }} />
			</div>

			<div style={{ display: 'flex', width: 224, height: 112, background: '#ffffff', marginTop: 6 }} />

			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					width: 224,
					marginTop: 6,
				}}
			>
				<div style={{ display: 'flex', width: 50, height: 18, background: '#c9c9c9' }} />
				<div style={{ display: 'flex', width: 50, height: 18, background: '#c9c9c9' }} />
			</div>
		</div>
	);
}

export default async function OpengraphImage() {
	const [pressStart, pixelify] = await Promise.all([
		readFile(path.join(process.cwd(), 'src/assets/fonts/press-start-2p.ttf')),
		readFile(path.join(process.cwd(), 'src/assets/fonts/pixelify-sans-400.ttf')),
	]);

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
				padding: '64px 72px',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					fontFamily: 'Press Start 2P',
					fontSize: 18,
					color: '#8a8a8a',
				}}
			>
				<span>PURRCIEL.BABY</span>
				<span>LV 01</span>
			</div>

			<div style={{ display: 'flex', alignItems: 'center', gap: 64 }}>
				<Cat />

				<div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 10,
							fontFamily: 'Press Start 2P',
							fontSize: 54,
							lineHeight: 1.35,
						}}
					>
						<span>МАЛЕНЬКИЙ</span>
						<span>ПИКСЕЛЬНЫЙ</span>
						<span>МИР</span>
					</div>

					<div
						style={{
							display: 'flex',
							fontFamily: 'Pixelify Sans',
							fontSize: 28,
							color: '#d2d2d2',
						}}
					>
						сад заметок · лаборатория · комната
					</div>
				</div>
			</div>

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
				<span>ПОТРОГАЙ КОТА</span>
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
