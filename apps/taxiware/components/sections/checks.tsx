import { Note } from "@/components/note";
import { Eyebrow, SectionTitle } from "@/components/section-heading";
import { TextLink } from "@/components/text-link";

export default function Checks() {
	return (
		<section className="mx-auto grid max-w-300 items-center gap-10 px-4 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pt-24">
			<div className="grid justify-items-start gap-4">
				<Eyebrow>Prüfung vor dem Versand</Eyebrow>
				<SectionTitle>
					Fehler finden Sie, bevor die Kasse sie findet
				</SectionTitle>
				<p className="max-w-[52ch] text-muted-foreground">
					Fehlende IK-Nummern und Zuzahlungen fallen auf, bevor die Kasse
					absetzt. Sie korrigieren die Fahrt und übermitteln erst, wenn alles
					stimmt.
				</p>
				<TextLink href="/#ablauf">So läuft die Abrechnung</TextLink>
			</div>

			<div className="grid gap-3">
				<Note tone="err">
					<strong className="block">Fahrt 12.09. · M. Schäfer</strong>
					IK-Nummer des Kostenträgers fehlt. Bitte ergänzen, bevor Sie
					übermitteln.
				</Note>
				<Note tone="err">
					<strong className="block">Fahrt 13.09. · A. Becker</strong>
					Zuzahlung nicht erfasst.
				</Note>
				<Note tone="ok">
					<strong className="block">3 Fahrten bereit</strong>
					Alle Angaben vollständig. Sie können übermitteln.
				</Note>
			</div>
		</section>
	);
}
