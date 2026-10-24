import { cssFadeInUp } from "@/components/animations/css-fade-in-up";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
	description: "Impressum der Daniel Software GmbH.",
	path: "/impressum",
	title: "Impressum",
});

export default function ImpressumPage() {
	return (
		<>
			<section className="container mx-auto max-w-4xl py-16 text-center md:py-24">
				<div className={cssFadeInUp}>
					<h1 className="mb-6 font-bold text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
						Impressum
					</h1>
				</div>
			</section>

			<section className="py-16 md:py-24">
				<div className="container mx-auto max-w-4xl px-4">
					<FadeInUp delay={0.1}>
						<div className="flex flex-col gap-8 text-foreground/80 md:text-lg">
							<div>
								<h2 className="mb-2 font-semibold text-foreground text-xl">
									Angaben gemäß § 5 DDG
								</h2>
								<p className="leading-relaxed">
									Daniel Software GmbH
									<br />
									Im Brand 1A
									<br />
									65719 Hofheim
								</p>
							</div>

							<div>
								<p className="leading-relaxed">
									Handelsregister: HRB 54962
									<br />
									Registergericht: Amtsgericht Frankfurt/M.
								</p>
							</div>

							<div>
								<h2 className="mb-2 font-semibold text-foreground text-xl">
									Vertreten durch:
								</h2>
								<p className="leading-relaxed">Jens Daniel</p>
							</div>

							<div>
								<h2 className="mb-2 font-semibold text-foreground text-xl">
									Kontakt
								</h2>
								<p className="leading-relaxed">
									Telefon: +49 6192 9999 002
									<br />
									Telefax: +49 6192 9999 005
									<br />
									E-Mail:{" "}
									<a
										className="text-primary hover:underline"
										href="mailto:info@ptas.de"
									>
										info@ptas.de
									</a>
								</p>
							</div>

							<div>
								<h2 className="mb-2 font-semibold text-foreground text-xl">
									Umsatzsteuer-ID
								</h2>
								<p className="leading-relaxed">
									Umsatzsteuer-Identifikationsnummer gemäß § 27 a
									Umsatzsteuergesetz:
									<br />
									DE188151608
								</p>
							</div>

							<div>
								<h2 className="mb-2 font-semibold text-foreground text-xl">
									Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
								</h2>
								<p className="leading-relaxed">
									Wir sind nicht bereit oder verpflichtet, an
									Streitbeilegungsverfahren vor einer
									Verbraucherschlichtungsstelle teilzunehmen.
								</p>
							</div>
						</div>
					</FadeInUp>
				</div>
			</section>
		</>
	);
}
