import type { Metadata } from 'next';

import { BattleScene } from '@/components/home/BattleScene';
import { LatestNotes } from '@/components/home/LatestNotes';
import { NowSection } from '@/components/home/NowSection';
import menu from '@/data/menu.json';

export const metadata: Metadata = {
	alternates: { canonical: '/' },
};

export default function HomePage() {
	return (
		<>
			<BattleScene menu={menu} />

			<div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 pb-16 sm:px-6">
				<LatestNotes />
				<NowSection />
			</div>
		</>
	);
}
