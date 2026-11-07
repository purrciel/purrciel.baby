import { cn } from '@/lib/utils';

const W = '#ffffff';
const G = '#c9c9c9';
const K = '#000000';
const R = '#ff2b2b';

export function PixelCat({
	className,
	asleep = false,
}: {
	className?: string;
	asleep?: boolean;
}) {
	return (
		<svg
			className={cn(className)}
			viewBox="0 0 24 24"
			width="24"
			height="24"
			shapeRendering="crispEdges"
			aria-hidden="true"
			focusable="false"
		>
			{/* уши */}
			<rect x="3" y="4" width="3" height="5" fill={W} />
			<rect x="4" y="2" width="2" height="3" fill={W} />
			<rect x="18" y="4" width="3" height="5" fill={W} />
			<rect x="18" y="2" width="2" height="3" fill={W} />

			{/* голова */}
			<rect x="3" y="7" width="18" height="9" fill={W} />

			{/* глаза */}
			{asleep ? (
				<>
					<rect x="7" y="11" width="3" height="1" fill={K} />
					<rect x="14" y="11" width="3" height="1" fill={K} />
				</>
			) : (
				<>
					<rect x="7" y="10" width="3" height="3" fill={K} />
					<rect x="14" y="10" width="3" height="3" fill={K} />
					<rect x="7" y="10" width="1" height="1" fill={W} />
					<rect x="14" y="10" width="1" height="1" fill={W} />
				</>
			)}

			{/* нос и рот */}
			<rect x="11" y="13" width="2" height="1" fill={R} />
			<rect x="11" y="14" width="2" height="1" fill={K} />
			<rect x="9" y="15" width="6" height="1" fill={K} />

			{/* тело */}
			<rect x="5" y="16" width="14" height="7" fill={W} />

			{/* лапы */}
			<rect x="5" y="22" width="4" height="2" fill={G} />
			<rect x="15" y="22" width="4" height="2" fill={G} />

			{/* хвост */}
			<rect x="19" y="15" width="2" height="7" fill={W} />
			<rect x="21" y="13" width="2" height="6" fill={W} />
		</svg>
	);
}
