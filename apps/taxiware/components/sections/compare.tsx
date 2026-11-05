import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { Logo } from "@/components/logo";
import { SectionTitle } from "@/components/section-heading";
import { TextLink } from "@/components/text-link";
import { ctaHref } from "@/lib/links";

// Only facts already on taxiware.de and ptas.de
const fits = {
	ptas: [
		"die Abrechnung komplett abgeben wollen",
		"Ihre Verordnungen lieber an PTAS schicken",
		"Ihr Geld mit Vorfinanzierung schneller auf dem Konto haben möchten",
	],
	taxiware: [
		"selbst mit den Kostenträgern abrechnen wollen",
		"Verordnungen im eigenen Betrieb erfassen",
		"monatlich kündbar bleiben möchten",
	],
};

function FitList({ items }: { items: string[] }) {
	return (
		<div className="grid gap-2">
			<p className="font-semibold text-base">Passt zu Ihnen, wenn Sie …</p>
			<ul className="grid gap-1.5 text-base">
				{items.map((item) => (
					<li className="flex gap-2.5" key={item}>
						<Check
							aria-hidden="true"
							className="mt-1 size-4.5 shrink-0 text-ok"
						/>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}

export default function Compare() {
	return (
		<section
			className="mx-auto grid max-w-300 gap-6 px-4 pt-14 sm:px-6 lg:pt-24"
			id="vergleich"
		>
			<SectionTitle>Selbst abrechnen oder abrechnen lassen?</SectionTitle>

			<div className="grid gap-3.5 md:grid-cols-2">
				<article className="grid content-start gap-3.5 rounded-xl border-2 border-cobalt bg-card p-6 sm:p-7">
					<h3 className="flex">
						<Logo className="[--logo-size:1.625rem]" />
					</h3>
					<p className="text-muted-foreground">
						Sie rechnen selbst ab: Verordnungen erfassen, prüfen und direkt an
						die Kostenträger übermitteln.
					</p>
					<FitList items={fits.taxiware} />
					<div className="pt-1">
						<BrandButton asChild>
							<Link href={ctaHref}>Jetzt ausprobieren</Link>
						</BrandButton>
					</div>
				</article>

				<article className="grid content-start gap-3.5 rounded-xl border bg-card p-6 sm:p-7">
					<h3 className="flex">
						<Image
							alt="PTAS"
							className="block h-8 w-auto shrink-0"
							height={783}
							src="/ptas-logo.svg"
							unoptimized
							width={1606}
						/>
					</h3>
					<p className="text-muted-foreground">
						PTAS rechnet Ihre Krankenfahrten für Sie ab.
					</p>
					<FitList items={fits.ptas} />
					<div className="pt-1">
						<TextLink href="https://ptas.de">Zu ptas.de</TextLink>
					</div>
				</article>
			</div>
		</section>
	);
}
