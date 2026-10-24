import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardHeader } from "@repo/ui/components/card";
import { SearchX } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Seite nicht gefunden",
};

export default function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center px-4 py-24">
			<Card className="mx-auto max-w-lg text-center">
				<CardHeader>
					<SearchX className="mx-auto mb-4 size-16 text-primary" />
					<h1 className="font-semibold text-2xl">Seite nicht gefunden</h1>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-muted-foreground">
						Die aufgerufene Seite existiert leider nicht oder wurde verschoben.
					</p>
					<div className="flex flex-col justify-center gap-3 sm:flex-row">
						<Button asChild>
							<Link href="/">Zur Startseite</Link>
						</Button>
						<Button asChild variant="outline">
							<Link href="/kontakt">Kontakt aufnehmen</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
