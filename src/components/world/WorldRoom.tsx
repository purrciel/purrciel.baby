'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useSound } from '@/components/providers/SoundProvider';
import { Heart } from '@/components/ui/Heart';
import { PixelCat } from '@/components/ui/PixelCat';
import { cn } from '@/lib/cn';

export type RoomLink = {
	label: string;
	href: string;
	note?: string;
};

export type RoomHotspot = {
	id: 'window' | 'desk' | 'shelf' | 'door';
	label: string;
	title: string;
	lines: string[];
	links?: RoomLink[];
};

export function WorldRoom({
	intro,
	hotspots,
}: {
	intro: string;
	hotspots: RoomHotspot[];
}) {
	const [activeId, setActiveId] = useState<RoomHotspot['id'] | null>(null);
	const { blip } = useSound();

	const active = hotspots.find((hotspot) => hotspot.id === activeId) ?? null;

	const select = (id: RoomHotspot['id']) => {
		setActiveId(id);
		blip(620 + Math.random() * 120);
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="room__stage" role="group" aria-label="Пиксельная комната">
				<div className="room__floor" aria-hidden="true" />

				<button
					type="button"
					className="room__hotspot room__window"
					data-active={activeId === 'window'}
					onClick={() => select('window')}
					aria-label={`Окно — ${hotspots.find((hotspot) => hotspot.id === 'window')?.title ?? 'сейчас'}`}
				>
					<span className="room__window-frame" aria-hidden="true">
						<span className="room__moon" />
						<span className="room__star" />
					</span>
					<span className="room__label">окно</span>
					<Heart className="room__soul" />
				</button>

				<button
					type="button"
					className="room__hotspot room__desk"
					data-active={activeId === 'desk'}
					onClick={() => select('desk')}
					aria-label={`Стол — ${hotspots.find((hotspot) => hotspot.id === 'desk')?.title ?? 'лаборатория'}`}
				>
					<span className="room__desk-top" aria-hidden="true" />
					<span className="room__monitor" aria-hidden="true" />
					<span className="room__label">стол</span>
					<Heart className="room__soul" />
				</button>

				<button
					type="button"
					className="room__hotspot room__shelf"
					data-active={activeId === 'shelf'}
					onClick={() => select('shelf')}
					aria-label={`Полка — ${hotspots.find((hotspot) => hotspot.id === 'shelf')?.title ?? 'сад'}`}
				>
					<span className="room__shelf-board" aria-hidden="true">
						<span className="room__book" />
						<span className="room__book" />
						<span className="room__book" />
						<span className="room__book" />
						<span className="room__book" />
					</span>
					<span className="room__label">полка</span>
					<Heart className="room__soul" />
				</button>

				<button
					type="button"
					className="room__hotspot room__door"
					data-active={activeId === 'door'}
					onClick={() => select('door')}
					aria-label={`Дверь — ${hotspots.find((hotspot) => hotspot.id === 'door')?.title ?? 'ссылки'}`}
				>
					<span className="room__door-frame" aria-hidden="true" />
					<span className="room__label">дверь</span>
					<Heart className="room__soul" />
				</button>

				<PixelCat className="room__cat" />
			</div>

			<div className="flex flex-wrap gap-2" aria-label="Предметы в комнате">
				{hotspots.map((hotspot) => (
					<button
						key={hotspot.id}
						type="button"
						onClick={() => select(hotspot.id)}
						className={cn('tag cursor-pointer', activeId === hotspot.id && 'tag--active')}
						aria-pressed={activeId === hotspot.id}
					>
						{hotspot.label}
					</button>
				))}
			</div>

			<div className="box min-h-[11rem]">
				<p className="meta m-0 mb-3">* {active ? active.title : 'комната'}</p>

				{active ? (
					<>
						<ul className="m-0 flex list-none flex-col gap-1.5 p-0 text-white">
							{active.lines.map((line, index) => (
								<li key={`${active.id}-${index}`} className="flex gap-2">
									<span className="text-accent" aria-hidden="true">
										*
									</span>
									<span>{line}</span>
								</li>
							))}
						</ul>

						{active.links && active.links.length > 0 && (
							<ul className="m-0 mt-5 flex list-none flex-col gap-2 p-0">
								{active.links.map((link) => (
									<li key={link.href} className="flex flex-wrap items-baseline gap-x-2">
										{link.href.startsWith('http') ? (
											<a
												href={link.href}
												target="_blank"
												rel="noreferrer"
												className="link"
											>
												{link.label} ↗
											</a>
										) : (
											<Link href={link.href} className="link">
												{link.label}
											</Link>
										)}
										{link.note && <span className="meta">— {link.note}</span>}
									</li>
								))}
							</ul>
						)}
					</>
				) : (
					<p className="m-0 text-soft">{intro}</p>
				)}

				<p className="meta m-0 mt-5">выбери предмет · или нажми на него в комнате</p>
			</div>
		</div>
	);
}
