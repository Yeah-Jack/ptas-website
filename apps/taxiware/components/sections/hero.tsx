import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { RouteLine } from "@/components/route-line";
import TripPreview from "@/components/sections/trip-preview";
import { Sign } from "@/components/sign";
import { callbackHref, ctaHref } from "@/lib/links";

export default function Hero() {
	return (
		<section className="mx-auto max-w-300 px-4 pt-4 sm:px-6 sm:pt-8">
			<div className="overflow-hidden rounded-[14px] bg-cobalt">
				<div className="relative grid justify-items-center gap-5 px-5 pt-12 pb-10 text-center text-white [--ring:white] sm:gap-6 sm:px-12 sm:pt-20 sm:pb-18">
					{/* Routes shrink on narrower heroes so they stay clear of the text */}
					<RouteLine className="-bottom-14 -left-10 w-36 lg:-bottom-10 lg:-left-15 lg:w-80 xl:w-105" />
					<RouteLine className="-top-15 -right-12.5 hidden w-48 rotate-180 sm:block lg:w-72 xl:w-90" />

					<p className="relative font-semibold text-on-cobalt-kicker text-xs uppercase leading-[1.4] tracking-[0.09em] sm:text-[0.8125rem]">
						Abrechnung von Krankenfahrten nach § 302 SGB V
					</p>
					<h1 className="relative max-w-[13ch] text-balance font-bold text-[2.125rem] leading-[1.05] tracking-[-0.02em] sm:text-[3.25rem] lg:text-[4.5rem] lg:leading-[1.02] lg:tracking-[-0.03em]">
						Vom Transportschein <span className="text-taxi">aufs Konto.</span>
					</h1>
					<p className="relative max-w-[56ch] text-base text-on-cobalt-sub leading-[1.6] sm:text-[1.125rem]">
						TaxiWare erfasst Ihre Verordnungen, prüft jede Fahrt und übermittelt
						direkt an die Kostenträger. Gebaut für Taxi- und
						Mietwagenunternehmen, Fahrdienste und Krankentransporte.
					</p>
					<div className="relative grid w-full gap-2.5 sm:flex sm:w-auto sm:flex-wrap sm:justify-center sm:gap-3">
						<BrandButton asChild>
							<Link href={ctaHref}>Jetzt ausprobieren</Link>
						</BrandButton>
						<BrandButton asChild variant="onBlue">
							<Link href={callbackHref}>Rückruf anfordern</Link>
						</BrandButton>
					</div>
				</div>

				<TripPreview />
			</div>

			<p className="flex flex-wrap items-center gap-x-2.5 gap-y-2 pt-5 text-muted-foreground">
				<Sign>Aus der Praxis</Sign>
				<span className="text-foreground">
					Die Software, mit der PTAS täglich abrechnet.
				</span>
				{/* Below lg the facts get their own line, without a leading dot */}
				<span aria-hidden="true" className="hidden lg:inline">
					·
				</span>
				<span className="flex gap-2.5 max-lg:basis-full">
					Server in Deutschland
					<span aria-hidden="true">·</span>
					Support aus Kriftel
				</span>
			</p>
		</section>
	);
}
