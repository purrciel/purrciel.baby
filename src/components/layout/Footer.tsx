import Link from 'next/link';
import { Github, Rss } from 'lucide-react';

import { MusicPlayer } from '@/components/ui/MusicPlayer';
import { SoundToggle } from '@/components/ui/SoundToggle';
import { site } from '@/lib/site';

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="relative z-10 mt-auto border-t border-line">
			<div className="shell grid gap-8 py-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
				<div className="flex flex-col gap-3">
					<Link
						href="/"
						className="w-fit text-sm font-medium tracking-tight text-ink transition-colors hover:text-soul"
					>
						purrciel<span className="text-faint">.baby</span>
					</Link>
					<p className="meta m-0 max-w-xs leading-relaxed">
						маленький мир, который никуда не спешит
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-x-6 gap-y-3">
					<Link
						href="/garden"
						className="text-sm text-soft transition-colors hover:text-ink"
					>
						сад
					</Link>
					<Link
						href="/lab"
						className="text-sm text-soft transition-colors hover:text-ink"
					>
						лаб
					</Link>
					<Link
						href="/world"
						className="text-sm text-soft transition-colors hover:text-ink"
					>
						мир
					</Link>
					<a
						href={site.links.github}
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-1.5 text-sm text-soft transition-colors hover:text-ink"
					>
						<Github className="size-3.5" />
						github
					</a>
					<Link
						href={site.links.rss}
						className="inline-flex items-center gap-1.5 text-sm text-soft transition-colors hover:text-ink"
					>
						<Rss className="size-3.5" />
						rss
					</Link>
				</div>
			</div>

			<div className="border-t border-line">
				<div className="shell flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
					<p className="meta m-0">
						© {year} purrciel.baby · спасено навсегда
					</p>

					<div className="flex flex-wrap items-center gap-x-5 gap-y-2">
						<MusicPlayer variant="footer" />
						<SoundToggle />
					</div>
				</div>
			</div>
		</footer>
	);
}
