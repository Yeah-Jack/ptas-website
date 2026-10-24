import { Button } from "@repo/ui/components/button";
import { Send } from "lucide-react";
import Link from "next/link";

export default function CTA() {
	return (
		<section className="border-t bg-primary/75 py-16 text-primary-foreground md:py-24">
			<div className="container mx-auto max-w-4xl px-4 text-center">
				<h2 className="mb-4 font-bold text-2xl md:text-3xl">
					Bereit für eine unkomplizierte Abrechnung?
				</h2>
				<p className="mb-8 text-lg text-primary-foreground/80">
					Wir bieten verschiedene Leistungs-Pakete für die Abrechnung von
					Krankentransporten - ohne versteckte Kosten!
				</p>
				<Link href="/kontakt">
					<Button
						className="gap-2 bg-background text-foreground hover:bg-background/90"
						size="lg"
						variant="secondary"
					>
						<Send className="size-4" />
						Erste Abrechnung erstellen
					</Button>
				</Link>
			</div>
		</section>
	);
}
