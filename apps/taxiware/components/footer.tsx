import Link from "next/link";
import { ctaHref, pendingLinks } from "@/lib/links";
import { BrandButton } from "./brand-button";
import { Logo } from "./logo";
import { SectionTitle } from "./section-heading";

const legalLinks = [
	{ href: pendingLinks.impressum, label: "Impressum" },
	{ href: pendingLinks.datenschutz, label: "Datenschutz" },
	{ href: ctaHref, label: "Kontakt" },
] as const;

export default function Footer() {
	return (
		<footer
			className="mt-14 bg-ink text-white [--ring:white] lg:mt-24"
			id="kontakt"
		>
			<div className="mx-auto grid max-w-300 gap-12 px-4 pt-12 pb-7 sm:px-6 lg:pt-18 lg:pb-8">
				{/* Closing call to action */}
				<div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
					<div className="grid gap-2.5">
						<SectionTitle>Vom Transportschein aufs Konto.</SectionTitle>
						<p className="text-on-ink-muted">
							Testen Sie TaxiWare mit Ihren eigenen Fahrten.
						</p>
					</div>
					<div className="grid gap-3 sm:flex">
						<BrandButton asChild variant="onBlue">
							<Link href={ctaHref}>Rückruf anfordern</Link>
						</BrandButton>
						<BrandButton asChild>
							<Link href={ctaHref}>Jetzt ausprobieren</Link>
						</BrandButton>
					</div>
				</div>

				<div className="flex flex-col gap-4 border-ink-line border-t pt-6 text-on-ink-muted sm:flex-row sm:items-center sm:justify-between">
					<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
						<Logo className="[--logo-size:1.5rem]" variant="white" />
						<span>Ein Produkt der Daniel Software GmbH</span>
					</div>
					<nav aria-label="Rechtliches" className="flex gap-5">
						{legalLinks.map(({ href, label }) => (
							<a
								className="transition-colors hover:text-white"
								href={href}
								key={label}
							>
								{label}
							</a>
						))}
					</nav>
				</div>
			</div>
		</footer>
	);
}
