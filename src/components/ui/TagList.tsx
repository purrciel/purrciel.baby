import Link from 'next/link';

import { cn } from '@/lib/cn';

export function TagList({
	tags,
	link = false,
	active,
	onSelect,
}: {
	tags: string[];
	link?: boolean;
	active?: string | null;
	onSelect?: (tag: string) => void;
}) {
	if (tags.length === 0) return null;

	return (
		<ul className="flex flex-wrap items-center gap-2">
			{tags.map((tag) => (
				<li key={tag}>
					{link ? (
						<Link href={`/garden?tag=${encodeURIComponent(tag)}`} className="tag hover:border-choose hover:text-choose">
							#{tag}
						</Link>
					) : onSelect ? (
						<button
							type="button"
							onClick={() => onSelect(tag)}
							className={cn('tag cursor-pointer', active === tag && 'tag--active')}
							aria-pressed={active === tag}
						>
							#{tag}
						</button>
					) : (
						<span className="tag">#{tag}</span>
					)}
				</li>
			))}
		</ul>
	);
}
