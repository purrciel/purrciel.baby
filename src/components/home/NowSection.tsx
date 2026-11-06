import { LiveClock } from '@/components/ui/LiveClock';
import { SectionLabel } from '@/components/ui/SectionLabel';
import activity from '@/data/activity.json';

export function NowSection() {
	return (
		<section id="now" className="flex scroll-mt-24 flex-col gap-4">
			<SectionLabel label="сейчас" />

			<div className="box">
				<dl className="m-0 grid gap-2">
					<div className="now-row">
						<dt>У МЕНЯ</dt>
						<dd>
							<LiveClock variant="long" />
						</dd>
					</div>

					{activity.rows.map((row) => (
						<div key={row.k} className="now-row">
							<dt>{row.k}</dt>
							<dd>{row.v}</dd>
						</div>
					))}
				</dl>

				<p className="mb-0 mt-4 text-[0.85rem] text-soft">{activity.note}</p>
			</div>
		</section>
	);
}
