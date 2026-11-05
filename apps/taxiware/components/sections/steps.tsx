import { cn } from "@repo/ui/lib/utils";
import { FileText, SearchCheck, Send, Wallet } from "lucide-react";
import { Note } from "@/components/note";
import { Eyebrow, SectionTitle } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";

// Small product snippets; photos from daily operations can replace them later
const steps = [
	{
		icon: FileText,
		media: (
			<Note>
				<strong className="block">Fahrt 12.09. · H. Weber</strong>
				Kriftel → Klinikum Frankfurt-Höchst
			</Note>
		),
		text: "Sie erfassen den Transportschein mit allen Angaben der Verordnung.",
		tile: "bg-cobalt text-white",
		title: "Verordnung erfassen",
	},
	{
		icon: SearchCheck,
		media: (
			<Note tone="err">
				<strong className="block">IK-Nummer fehlt</strong>
				Fahrt 12.09. · bitte ergänzen
			</Note>
		),
		text: "TaxiWare prüft jede Fahrt auf fehlende Angaben, bevor etwas rausgeht.",
		tile: "bg-cobalt text-white",
		title: "Prüfen",
	},
	{
		icon: Send,
		media: (
			<div className="flex flex-wrap gap-2">
				<StatusBadge>DTA</StatusBadge>
				<StatusBadge tone="success">✓ Server in Deutschland</StatusBadge>
			</div>
		),
		text: "Fertige Fahrten gehen direkt an die Kostenträger, im Datenaustausch nach § 302 SGB V.",
		tile: "bg-cobalt text-white",
		title: "Übermitteln",
	},
	{
		icon: Wallet,
		media: (
			<div className="flex flex-wrap gap-2">
				<StatusBadge tone="success">Bezahlt</StatusBadge>
				<StatusBadge>Offen</StatusBadge>
				<StatusBadge tone="error">Abgesetzt</StatusBadge>
			</div>
		),
		text: "Die Kasse zahlt, und Sie sehen für jede Fahrt, ob das Geld da ist.",
		tile: "bg-taxi text-ink",
		title: "Geld auf dem Konto",
	},
];

export default function Steps() {
	return (
		<section className="mt-14 bg-cobalt-50 lg:mt-24" id="ablauf">
			<div className="mx-auto grid max-w-300 gap-10 px-4 py-12 sm:px-6 lg:gap-12 lg:py-20">
				<div className="grid gap-2">
					<Eyebrow>So funktioniert TaxiWare</Eyebrow>
					<SectionTitle>Vier Stationen bis zum Zahlungseingang</SectionTitle>
				</div>

				{/* The dashed route runs through the centers of the station tiles */}
				<ol className="relative grid gap-6 before:absolute before:inset-y-10 before:left-6.25 before:border-taxi before:border-l-[5px] before:border-dashed lg:before:left-9.25 lg:before:border-l-6">
					{steps.map(({ icon: Icon, media, text, tile, title }, index) => (
						<li
							className="relative grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-4 lg:grid-cols-[5rem_minmax(0,1fr)] lg:gap-8"
							key={title}
						>
							<span
								className={cn(
									"grid size-14 place-items-center rounded-[10px_10px_4px_4px] lg:size-20",
									tile,
								)}
							>
								<Icon className="size-6 lg:size-8.5" />
							</span>
							<div className="grid items-center gap-4 rounded-xl border bg-card p-5 sm:p-7 md:grid-cols-[6rem_minmax(0,1fr)] md:gap-7 lg:grid-cols-[7.5rem_minmax(0,1fr)_17.5rem]">
								<span className="font-bold text-[2rem] text-cobalt leading-none tracking-[-0.02em] lg:text-[2.75rem]">
									{String(index + 1).padStart(2, "0")}
								</span>
								<div className="grid gap-1.5">
									<h3 className="font-semibold text-[1.375rem]">{title}</h3>
									<p className="text-base text-muted-foreground leading-[1.6]">
										{text}
									</p>
								</div>
								<div className="md:col-start-2 lg:col-start-auto">{media}</div>
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
