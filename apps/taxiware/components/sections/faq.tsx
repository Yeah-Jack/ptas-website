import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { SectionTitle } from "@/components/section-heading";
import { formatWholeEuro } from "@/lib/format";
import {
	includedScans,
	minimumTermMonths,
	noticePeriodMonths,
	packages,
} from "@/lib/pricing";

const packagePrices = packages.map(
	({ monthlyFee, name }) => `${name} für ${formatWholeEuro(monthlyFee)}`,
);

// Draft answers, still awaiting approval. Only facts already on
// taxiware.de and ptas.de or in the TaxiWare price flyer; the first
// entry opens by default.
const faqs = [
	{
		answer:
			"Für Taxi- und Mietwagenunternehmen, Fahrdienste und Krankentransporte, die ihre Krankenfahrten selbst mit den Krankenkassen abrechnen wollen.",
		question: "Für wen ist TaxiWare gedacht?",
	},
	{
		answer:
			"§ 302 SGB V regelt die Abrechnung sonstiger Leistungserbringer mit den Krankenkassen, darunter Krankenfahrten. TaxiWare übermittelt die Daten im vorgeschriebenen Datenaustausch (DTA).",
		question: "Was regelt § 302 SGB V?",
	},
	{
		answer:
			"Ja, mit Ihren eigenen Fahrten. Schreiben Sie uns über das Kontaktformular oder rufen Sie uns an.",
		question: "Kann ich TaxiWare testen?",
	},
	{
		answer: `Es gibt drei Pakete: ${packagePrices.slice(0, -1).join(", ")} und ${packagePrices.at(-1)} im Monat, alle Preise zzgl. MwSt. In der Grundgebühr ist ein monatliches Abrechnungsvolumen enthalten, für das Volumen darüber zahlen Sie einen Anteil der Brutto-Rechnungssumme. ${includedScans} Scans sind in jedem Paket inklusive, Benutzer unbegrenzt.`,
		question: "Was kostet TaxiWare?",
	},
	{
		answer: `Die Mindestlaufzeit beträgt ${minimumTermMonths} Monate. Danach können Sie monatlich mit ${noticePeriodMonths} Monaten Frist kündigen.`,
		question: "Wie lange läuft der Vertrag?",
	},
	{
		answer: "Die Server stehen in Deutschland.",
		question: "Wo stehen die Server?",
	},
	{
		answer:
			"Mit TaxiWare rechnen Sie selbst ab, das Geld kommt direkt von den Kostenträgern. Wenn Sie es schneller brauchen: PTAS rechnet für Sie ab, und mit der Vorfinanzierung haben Sie Ihr Geld gegen einen geringen Aufpreis schneller auf dem Konto.",
		question: "Kann ich mir das Geld vorab auszahlen lassen?",
	},
] as const;

const faqPage = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqs.map(({ answer, question }) => ({
		"@type": "Question",
		acceptedAnswer: { "@type": "Answer", text: answer },
		name: question,
	})),
};

export default function Faq() {
	return (
		<section
			className="mx-auto grid max-w-300 gap-6 px-4 pt-14 sm:px-6 lg:pt-24"
			id="faq"
		>
			<JsonLd data={faqPage} />
			<SectionTitle>Häufige Fragen</SectionTitle>

			{/* Details elements sharing a name open one at a time */}
			<div className="divide-y rounded-xl border bg-card">
				{faqs.map(({ answer, question }, index) => (
					<details
						className="group"
						key={question}
						name="faq"
						open={index === 0}
					>
						<summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5.5 py-4.5 font-semibold text-lg leading-[1.3] [&::-webkit-details-marker]:hidden">
							{question}
							<ChevronDown className="size-5.5 shrink-0 text-cobalt transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none" />
						</summary>
						<p className="max-w-[70ch] px-5.5 pb-5 text-base text-muted-foreground leading-[1.6]">
							{answer}
						</p>
					</details>
				))}
			</div>
		</section>
	);
}
