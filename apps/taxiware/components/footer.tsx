import Link from "next/link";
import { contact } from "@/lib/contact";
import { callbackHref, ctaHref, datenschutzHref } from "@/lib/links";
import { BrandButton } from "./brand-button";
import { Logo } from "./logo";
import { SectionTitle } from "./section-heading";

const legalLinkClass = "transition-colors hover:text-white";

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
						<p className="flex flex-wrap gap-x-2.5 gap-y-1 text-on-ink-muted">
							<a
								className="font-semibold text-white underline-offset-3 hover:underline"
								href={contact.phone.href}
							>
								{contact.phone.display}
							</a>
							<span aria-hidden="true">·</span>
							<a
								className="font-semibold text-white underline-offset-3 hover:underline"
								href={`mailto:${contact.email}`}
							>
								{contact.email}
							</a>
							<span aria-hidden="true">·</span>
							<span>{contact.hours}</span>
						</p>
					</div>
					<div className="grid gap-3 sm:flex">
						<BrandButton asChild variant="onBlue">
							<Link href={callbackHref}>Rückruf anfordern</Link>
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
						<Link className={legalLinkClass} href="/impressum">
							Impressum
						</Link>
						<a className={legalLinkClass} href={datenschutzHref}>
							Datenschutz
						</a>
						<Link className={legalLinkClass} href="/kontakt">
							Kontakt
						</Link>
					</nav>
				</div>
			</div>
		</footer>
	);
}
