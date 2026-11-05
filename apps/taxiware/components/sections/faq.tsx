import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { SectionTitle } from "@/components/section-heading";

// Draft answers from the design system, still awaiting approval
const faqs = [
	{
		answer:
			"§ 302 SGB V regelt die Abrechnung sonstiger Leistungserbringer mit den Krankenkassen, darunter Krankenfahrten. TaxiWare übermittelt die Daten im vorgeschriebenen Datenaustausch (DTA).",
		question: "Was regelt § 302 SGB V?",
	},
	{
		answer: "Die Server stehen in Deutschland.",
		question: "Wo stehen die Server?",
	},
	{
		answer: "Ja. Alle Preise zzgl. MwSt., monatlich kündbar.",
		question: "Ist TaxiWare monatlich kündbar?",
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
