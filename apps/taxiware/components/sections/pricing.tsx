import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { SectionTitle } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import { ctaHref } from "@/lib/links";

// Package names and prices are still open; until then visitors ask for an offer
export default function Pricing() {
	return (
		<section
			className="mx-auto grid max-w-300 gap-6 px-4 pt-14 sm:px-6 lg:pt-24"
			id="preise"
		>
			<SectionTitle>Preise</SectionTitle>

			<div className="grid items-center gap-6 rounded-xl border bg-card p-6 sm:p-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-10">
				<div className="grid justify-items-start gap-3">
					<h3 className="font-semibold text-[1.375rem]">Preis auf Anfrage</h3>
					<p className="max-w-[52ch] text-muted-foreground">
						Wir nennen Ihnen gern den Preis für Ihren Betrieb.
					</p>
					<div className="flex flex-wrap gap-2">
						<StatusBadge tone="success">✓ Monatlich kündbar</StatusBadge>
						<StatusBadge>Alle Preise zzgl. MwSt.</StatusBadge>
					</div>
				</div>
				<BrandButton asChild>
					<Link href={ctaHref}>Angebot anfordern</Link>
				</BrandButton>
			</div>
		</section>
	);
}
