import { Check, RefreshCw, ScanText } from "lucide-react";
import { SectionTitle } from "@/components/section-heading";
import { Sign } from "@/components/sign";
import { includedScans } from "@/lib/pricing";

// The two features the price flyer leads with
const highlights = [
	{
		icon: ScanText,
		label: "KI-Erfassung",
		points: [
			`${includedScans} Scans in jedem Paket inklusive`,
			"Ab Professional: Kontroll-Bot prüft jeden Beleg vor dem Versand",
		],
		text: "Fotografieren Sie Verordnung und Fahrbeleg mit der TaxiWare Scan-App. Unsere KI liest die Daten aus und legt die Fahrt für Sie an. Sie prüfen nur noch und geben frei.",
		title: "Scannen statt abtippen",
	},
	{
		icon: RefreshCw,
		label: "Rückläufer-Bearbeitung",
		points: [
			"Jede Absetzung als Vorgang mit klarem Bearbeitungsweg",
			"Hilfe vom Team, das Rückläufer seit Jahren für Kunden klärt",
		],
		text: "Setzt eine Kasse ab, sehen Sie es sofort in TaxiWare: Grund, Beleg und nächster Schritt in einem Vorgang. Korrigieren, neu einreichen, erledigt.",
		title: "Rückläufer im Griff",
	},
];

export default function Features() {
	return (
		<section
			className="mx-auto grid max-w-300 gap-6 px-4 pt-14 sm:px-6 lg:gap-8 lg:pt-24"
			id="funktionen"
		>
			<div className="grid gap-2">
				<SectionTitle>Was TaxiWare besonders macht</SectionTitle>
				<p className="text-muted-foreground">
					Zwei Dinge, die Ihnen jeden Monat Stunden sparen.
				</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				{highlights.map(({ icon: Icon, label, points, text, title }) => (
					<article
						className="grid content-start gap-4 rounded-xl border bg-card p-6 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-5 sm:p-7"
						key={title}
					>
						<span className="grid size-14 place-items-center rounded-[10px_10px_4px_4px] bg-cobalt text-white">
							<Icon aria-hidden="true" className="size-6.5" />
						</span>
						<div className="grid justify-items-start gap-3">
							<Sign>{label}</Sign>
							<h3 className="font-semibold text-[1.375rem] leading-[1.3]">
								{title}
							</h3>
							<p className="text-base text-muted-foreground leading-[1.6]">
								{text}
							</p>
							<ul className="grid gap-1.5 text-base">
								{points.map((point) => (
									<li className="flex gap-2.5 font-semibold" key={point}>
										<Check
											aria-hidden="true"
											className="mt-1 size-4.5 shrink-0 text-ok"
										/>
										{point}
									</li>
								))}
							</ul>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
