export function PageHeader({
	eyebrow,
	title,
	description,
}: {
	eyebrow?: string;
	title: string;
	description?: string;
}) {
	return (
		<header className="flex flex-col gap-3">
			{eyebrow && <p className="meta m-0">* {eyebrow}</p>}
			<h1 className="m-0 text-base sm:text-xl">{title}</h1>
			{description && <p className="m-0 max-w-prose text-soft">{description}</p>}
		</header>
	);
}
