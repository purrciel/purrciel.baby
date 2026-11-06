import type { Metadata } from 'next';
import Link from 'next/link';

import { Heart } from '@/components/ui/Heart';
import { PixelCat } from '@/components/ui/PixelCat';

export const metadata: Metadata = {
	title: '404',
	description: 'Страницы, которую вы искали, не существует.',
	robots: { index: false, follow: false },
};

export default function NotFound() {
	return (
		<div className="shell-narrow flex flex-col gap-8 py-16">
			<div className="flex items-end gap-4">
				<PixelCat className="h-14 w-14" asleep />
				<p className="meta m-0">* ошибка 404</p>
			</div>

			<h1 className="m-0 text-xl sm:text-2xl">Здесь ничего не растёт</h1>

			<div className="box">
				<p className="m-0 text-soft">
					Страницы, которую вы искали, нет — её могли переименовать, или её вообще не
					было.
				</p>

				<nav className="menu menu--v mt-6" aria-label="Куда дальше">
					<Link href="/garden" className="choice">
						<Heart />
						сад
					</Link>
					<Link href="/lab" className="choice">
						<Heart />
						лаборатория
					</Link>
					<Link href="/" className="choice">
						<Heart />
						на главную
					</Link>
				</nav>
			</div>

			<Link href="/" className="meta hover:text-choose">
				← вернуться к коту
			</Link>
		</div>
	);
}
