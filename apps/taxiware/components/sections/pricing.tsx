import { cn } from "@repo/ui/lib/utils";
import { Check, Minus } from "lucide-react";
import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { Eyebrow, SectionTitle } from "@/components/section-heading";
import { Sign } from "@/components/sign";
import { formatEuro, formatPercent, formatWholeEuro } from "@/lib/format";
import { ctaHref } from "@/lib/links";
import {
	contractTerms,
	type Feature,
	type FeatureValue,
	features,
	includedScans,
	lowestMonthlyFee,
	minimumTermMonths,
	packages,
	pricePerExtraScan,
	pricePerLetter,
} from "@/lib/pricing";

const extraCosts = [
	{
		price: formatEuro(pricePerExtraScan),
		text: `je Scan ab dem ${includedScans + 1}. im Monat`,
	},
	{ price: formatEuro(pricePerLetter), text: "je Brief im Postversand" },
	{
		price: "Nach Partner",
		text: "Inkasso- und Factoring-Gebühren des Dienstleisters",
	},
];

const Included = () => (
	<>
		<Check aria-hidden="true" className="size-5 shrink-0 text-ok" />
		<span className="sr-only">Inklusive</span>
	</>
);

/** A cell of the comparison table */
function TableValue({ value }: { value: FeatureValue }) {
	if (value === false) {
		return (
			<>
				<Minus aria-hidden="true" className="size-4 text-muted-foreground" />
				<span className="sr-only">Nicht enthalten</span>
			</>
		);
	}
	if (value === true) {
		return <Included />;
	}
	return (
		<>
			{value.check ? <Included /> : null}
			<span className={cn(value.check && "font-semibold text-cobalt-700")}>
				{value.text}
			</span>
		</>
	);
}

/** Below md the table gives way to a list in each package card */
function FeatureItem({
	feature: { name },
	value,
}: {
	feature: Feature;
	value: FeatureValue;
}) {
	if (value === false) {
		return (
			<li className="flex gap-2.5 text-muted-foreground">
				<Minus aria-hidden="true" className="mt-1 size-4.5 shrink-0" />
				<span>
					{name}
					<span className="sr-only"> (nicht enthalten)</span>
				</span>
			</li>
		);
	}

	let label = name;
	if (typeof value === "object") {
		label = value.check ? `${name} ${value.text}` : `${name}: ${value.text}`;
	}

	return (
		<li className="flex gap-2.5">
			<Check aria-hidden="true" className="mt-1 size-4.5 shrink-0 text-ok" />
			{label}
		</li>
	);
}

export default function Pricing() {
	return (
		<section
			className="mx-auto grid max-w-300 gap-6 px-4 pt-14 sm:px-6 lg:gap-8 lg:pt-24"
			id="preise"
		>
			<div className="grid gap-4">
				<Eyebrow>Pakete & Preise</Eyebrow>
				<SectionTitle>Fair abrechnen. Flexibel bleiben.</SectionTitle>
				<div className="grid max-w-[60ch] gap-1.5">
					<p>
						Drei Pakete, ein Ziel: Ihre Krankenfahrten schnell und sicher aufs
						Konto. Ab {formatWholeEuro(lowestMonthlyFee)} im Monat, mit nur{" "}
						{minimumTermMonths} Monaten Mindestlaufzeit.
					</p>
					<p className="text-muted-foreground">
						Monatliche Grundgebühr mit Inklusivvolumen. Alle Preise zzgl. MwSt.
					</p>
				</div>
			</div>

			<ul className="grid gap-6 md:grid-cols-3 md:gap-4">
				{packages.map((pkg) => (
					<li
						className={cn(
							"relative flex flex-col gap-5 rounded-xl border bg-card p-6 sm:p-7",
							pkg.popular && "border-2 border-cobalt",
						)}
						key={pkg.id}
					>
						{pkg.popular ? (
							<Sign className="absolute -top-3.5 left-1/2 -translate-x-1/2">
								Beliebt
							</Sign>
						) : null}

						<div className="grid gap-0.5">
							<h3 className="font-bold text-[1.625rem] text-cobalt-700 leading-[1.2]">
								{pkg.name}
							</h3>
							<p className="text-base text-muted-foreground">{pkg.audience}</p>
						</div>

						<p className="flex items-baseline gap-1.5">
							<span className="font-bold text-[2.75rem] leading-none tracking-[-0.03em]">
								{formatWholeEuro(pkg.monthlyFee)}
							</span>
							<span
								aria-hidden="true"
								className="font-semibold text-base text-muted-foreground"
							>
								/ Monat
							</span>
							<span className="sr-only">pro Monat</span>
						</p>

						<dl className="grid gap-3 border-t pt-4 text-base">
							<div className="grid gap-0.5">
								<dt className="text-muted-foreground">
									Abrechnungsvolumen inklusive
								</dt>
								<dd className="font-bold text-lg">
									{formatWholeEuro(pkg.includedVolume)}
								</dd>
							</div>
							<div className="grid gap-0.5">
								<dt className="text-muted-foreground">Darüber</dt>
								<dd>
									<span className="font-bold text-lg">
										{formatPercent(pkg.overageRate)}
									</span>
									{pkg.volumeDiscount ? (
										<span className="text-muted-foreground">
											{" · "}ab {formatWholeEuro(pkg.volumeDiscount.from)}:{" "}
											{formatPercent(pkg.volumeDiscount.rate)}
										</span>
									) : null}
								</dd>
							</div>
						</dl>

						<ul className="grid gap-2 border-t pt-4 text-base md:hidden">
							{features.map((feature) => (
								<FeatureItem
									feature={feature}
									key={feature.name}
									value={feature.values[pkg.id]}
								/>
							))}
						</ul>

						<BrandButton
							asChild
							block
							className="mt-auto"
							variant={pkg.popular ? "primary" : "tertiary"}
						>
							<Link href={ctaHref}>Jetzt ausprobieren</Link>
						</BrandButton>
					</li>
				))}
			</ul>

			<div className="hidden overflow-hidden rounded-xl border bg-card md:block">
				<table className="w-full text-base">
					<caption className="sr-only">
						Leistungen der Pakete im Vergleich
					</caption>
					<thead>
						<tr className="border-b bg-cobalt-50 text-cobalt-700">
							<th className="px-5 py-3.5 text-left font-bold" scope="col">
								Leistung
							</th>
							{packages.map(({ id, name }) => (
								<th
									className="w-[20%] px-2 py-3.5 text-center font-bold lg:px-4"
									key={id}
									scope="col"
								>
									{name}
								</th>
							))}
						</tr>
					</thead>
					<tbody className="divide-y">
						{features.map(({ highlight, name, values }) => (
							<tr className={cn(highlight && "bg-taxi-50")} key={name}>
								<th
									className={cn(
										"px-5 py-3 text-left",
										highlight ? "font-semibold" : "font-normal",
									)}
									scope="row"
								>
									{name}
								</th>
								{packages.map(({ id }) => (
									<td className="px-2 py-3 lg:px-4" key={id}>
										<span className="flex items-center justify-center gap-1 whitespace-nowrap">
											<TableValue value={values[id]} />
										</span>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<ul aria-label="Weitere Kosten" className="grid gap-4 sm:grid-cols-3">
				{extraCosts.map(({ price, text }) => (
					<li
						className="grid content-start gap-1 rounded-xl border-2 border-dashed p-5"
						key={text}
					>
						<span className="font-bold text-[1.375rem] text-cobalt-700 leading-[1.3]">
							{price}
						</span>
						<span className="text-base text-muted-foreground">{text}</span>
					</li>
				))}
			</ul>

			<p className="max-w-[80ch] text-muted-foreground text-sm">
				{contractTerms} Abrechnungsvolumen = Brutto-Rechnungssumme pro Monat.
				Unbegrenzt viele Benutzer in jedem Paket.
			</p>
		</section>
	);
}
