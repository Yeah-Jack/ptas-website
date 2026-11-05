import { cn } from "@repo/ui/lib/utils";
import { BrandButton } from "@/components/brand-button";
import { Logo } from "@/components/logo";
import { RouteLine } from "@/components/route-line";
import { StatusBadge } from "@/components/status-badge";
import { formatEuro } from "@/lib/format";

// Sample data for the product preview
const trips: {
	amount: number;
	carrier: string;
	date: string;
	issue?: string;
	passenger: string;
	route: string;
}[] = [
	{
		amount: 48.2,
		carrier: "AOK Hessen",
		date: "12.09.",
		passenger: "H. Weber",
		route: "Kriftel → Klinikum Frankfurt-Höchst",
	},
	{
		amount: 62.8,
		carrier: "—",
		date: "12.09.",
		issue: "IK-Nummer fehlt",
		passenger: "M. Schäfer",
		route: "Hofheim → Dialysezentrum Wiesbaden",
	},
	{
		amount: 31.5,
		carrier: "Techniker Krankenkasse",
		date: "13.09.",
		passenger: "R. Klein",
		route: "Eschborn → Praxis Dr. Lang",
	},
	{
		amount: 48.2,
		carrier: "BARMER",
		date: "13.09.",
		issue: "Zuzahlung fehlt",
		passenger: "A. Becker",
		route: "Kriftel → Klinikum Frankfurt-Höchst",
	},
];

const cell = "px-2.5 py-3 sm:px-3.5";
const headCell = "px-2.5 py-2.5 font-semibold sm:px-3.5";

/** Bottom half of the hero's blue panel */
export default function TripPreview() {
	return (
		<figure
			aria-labelledby="trip-preview-title"
			className="px-3 pt-8 sm:px-8 sm:pt-10 lg:px-12 lg:pt-12"
		>
			<div className="relative">
				<RouteLine className="-top-37.5 -right-5 w-75" />

				<div className="relative overflow-hidden rounded-t-xl border border-b-0 bg-card">
					<div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b px-4 py-3.5 sm:px-5">
						<Logo className="[--logo-size:1.125rem]" />
						<p className="font-bold text-base" id="trip-preview-title">
							Fahrten · September 2026
						</p>
						<div className="ml-auto flex flex-wrap items-center gap-2 sm:gap-4">
							<StatusBadge tone="success">✓ 3 bereit</StatusBadge>
							<StatusBadge tone="error">✗ 2 zu klären</StatusBadge>
							{/* Part of the illustration, not an action */}
							<BrandButton
								asChild
								className="pointer-events-none hidden sm:inline-flex"
								variant="secondary"
							>
								<span>Übermitteln</span>
							</BrandButton>
						</div>
					</div>

					{/* Columns drop out on narrow screens instead of scrolling */}
					<table className="w-full text-sm sm:leading-[1.6]">
						<thead>
							<tr className="border-b text-left text-muted-foreground text-xs uppercase leading-[1.6] tracking-[0.09em]">
								<th className={cn(headCell, "hidden pl-5 sm:table-cell")}>
									Datum
								</th>
								<th className={cn(headCell, "max-sm:pl-4")}>Fahrgast</th>
								<th className={cn(headCell, "hidden xl:table-cell")}>
									Strecke
								</th>
								<th className={cn(headCell, "hidden md:table-cell")}>
									Kostenträger
								</th>
								<th className={cn(headCell, "text-right")}>Betrag</th>
								<th className={cn(headCell, "pr-4 sm:pr-5")}>Prüfung</th>
							</tr>
						</thead>
						<tbody className="tabular-nums">
							{trips.map((trip) => (
								<tr
									className={cn(
										"border-b last:border-b-0",
										trip.issue && "bg-err-50/50",
									)}
									key={`${trip.date} ${trip.passenger}`}
								>
									<td className={cn(cell, "hidden pl-5 sm:table-cell")}>
										{trip.date}
									</td>
									<td className={cn(cell, "whitespace-nowrap max-sm:pl-4")}>
										{trip.passenger}
									</td>
									<td className={cn(cell, "hidden xl:table-cell")}>
										{trip.route}
									</td>
									<td className={cn(cell, "hidden md:table-cell")}>
										{trip.carrier}
									</td>
									<td className={cn(cell, "whitespace-nowrap text-right")}>
										{formatEuro(trip.amount)}
									</td>
									<td
										className={cn(
											cell,
											"pr-4 sm:pr-5",
											trip.issue && "font-semibold text-err",
										)}
									>
										{trip.issue ?? (
											<StatusBadge tone="success">✓ Bereit</StatusBadge>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</figure>
	);
}
