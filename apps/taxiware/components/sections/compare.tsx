import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { Logo } from "@/components/logo";
import { SectionTitle } from "@/components/section-heading";
import { TextLink } from "@/components/text-link";

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
					<div>
						<BrandButton asChild>
							<Link href="/#preise">Preise ansehen</Link>
						</BrandButton>
					</div>
				</article>

				<article className="grid content-start gap-3.5 rounded-xl border bg-card p-6 sm:p-7">
					<h3 className="font-semibold text-[1.375rem] leading-8">PTAS</h3>
					<p className="text-muted-foreground">
						PTAS rechnet Ihre Krankenfahrten für Sie ab.
					</p>
					<div>
						<TextLink href="https://ptas.de">Zu ptas.de</TextLink>
					</div>
				</article>
			</div>
		</section>
	);
}
