import { cn } from '@/lib/cn';

export function Heart({ className }: { className?: string }) {
	return (
		<svg
			className={cn('heart', className)}
			viewBox="0 0 9 8"
			width="9"
			height="8"
			fill="currentColor"
			shapeRendering="crispEdges"
			aria-hidden="true"
			focusable="false"
		>
			<rect x="1" y="0" width="2" height="1" />
			<rect x="6" y="0" width="2" height="1" />
			<rect x="0" y="1" width="9" height="3" />
			<rect x="1" y="4" width="7" height="1" />
			<rect x="2" y="5" width="5" height="1" />
			<rect x="3" y="6" width="3" height="1" />
			<rect x="4" y="7" width="1" height="1" />
		</svg>
	);
}
