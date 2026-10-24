import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import ConversionTracker from "@/components/conversion-tracker";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
	description:
		"Danke für Ihre Anfrage! Wir haben Ihre Nachricht erhalten und melden uns schnellstmöglich bei Ihnen - in der Regel innerhalb eines Werktages.",
	path: "/kontakt/danke",
	robots: { follow: false, index: false },
	title: "Vielen Dank",
});

export default function DankePage() {
	return (
		<>
			<ConversionTracker />

			<div className="flex flex-col items-center justify-center py-24">
				<Card className="mx-auto max-w-lg text-center">
					<CardHeader>
						<CheckCircle className="mx-auto mb-4 size-16 text-green-500" />
						<CardTitle className="text-2xl">
							Vielen Dank für Ihre Anfrage!
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<p className="text-muted-foreground">
							Wir haben Ihre Nachricht erhalten und melden uns schnellstmöglich
							bei Ihnen - in der Regel innerhalb eines Werktages.
						</p>
						<Button asChild>
							<Link href="/">Zurück zur Startseite</Link>
						</Button>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
