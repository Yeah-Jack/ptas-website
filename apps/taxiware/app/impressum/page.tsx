import { company } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
	description: "Impressum der Daniel Software GmbH, Anbieterin von TaxiWare.",
	path: "/impressum",
	title: "Impressum",
});

// Same company details as the ptas.de Impressum
const sections = [
	{
		body: (
			<>
				{company.name}
				<br />
				{company.street}
				<br />
				{company.postalCode} {company.city}
			</>
		),
		title: "Angaben gemäß § 5 DDG",
	},
	{
		body: (
			<>
				Handelsregister: HRB 54962
				<br />
				Registergericht: Amtsgericht Frankfurt/M.
			</>
		),
		title: "Registereintrag",
	},
	{ body: "Jens Daniel", title: "Vertreten durch" },
	{
		body: (
			<>
				Telefon: +49 6192 9999 002
				<br />
				Telefax: +49 6192 9999 005
				<br />
				E-Mail:{" "}
				<a
					className="font-semibold text-cobalt underline underline-offset-3 hover:text-cobalt-700"
					href="mailto:info@ptas.de"
				>
					info@ptas.de
				</a>
			</>
		),
		title: "Kontakt",
	},
	{
		body: (
			<>
				Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
				<br />
				DE188151608
			</>
		),
		title: "Umsatzsteuer-ID",
	},
	{
		body: "Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
		title: "Verbraucher­streit­beilegung/Universal­schlichtungs­stelle",
	},
];

export default function ImpressumPage() {
	return (
		<section className="mx-auto grid max-w-300 gap-10 px-4 pt-14 sm:px-6 lg:pt-24">
			<h1 className="font-bold text-[2.125rem] leading-[1.1] tracking-[-0.02em] sm:text-[3rem]">
				Impressum
			</h1>
			<div className="grid max-w-[65ch] gap-8">
				{sections.map(({ body, title }) => (
					<div className="grid gap-2" key={title}>
						<h2 className="font-semibold text-[1.375rem] leading-[1.3]">
							{title}
						</h2>
						<p className="text-muted-foreground">{body}</p>
					</div>
				))}
			</div>
		</section>
	);
}
