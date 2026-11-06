import Link from 'next/link';

import { MusicPlayer } from '@/components/ui/MusicPlayer';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { site } from '@/lib/site';

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t-4 border-line bg-paper">
			<div className="shell flex flex-col gap-3 py-5 text-[0.68rem] uppercase tracking-[0.14em] text-faint sm:flex-row sm:items-center sm:justify-between">
				<p className="m-0">© {year} PURRCIEL.BABY</p>

				<div className="flex flex-wrap items-center gap-x-5 gap-y-2">
					<span className="m-0 opacity-70">спасено навсегда · next.js &amp; vercel</span>
					<MusicPlayer variant="footer" />
					<SoundToggle />
					<Link href={site.links.rss} className="hover:text-choose">
						rss
					</Link>
					<a
						href={site.links.github}
						target="_blank"
						rel="noreferrer"
						className="hover:text-choose"
					>
						github
					</a>
				</div>
			</div>
		</footer>
	);
}
