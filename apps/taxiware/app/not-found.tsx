import type { Metadata } from "next";
import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { Eyebrow } from "@/components/section-heading";

export const metadata: Metadata = {
	title: "Seite nicht gefunden",
};

export default function NotFound() {
	return (
		<section className="mx-auto grid max-w-300 justify-items-start gap-5 px-4 pt-14 sm:px-6 lg:pt-24">
			<Eyebrow>Fehler 404</Eyebrow>
			<h1 className="text-balance font-bold text-[2.125rem] leading-[1.1] tracking-[-0.02em] sm:text-[3rem]">
				Hier geht’s nicht weiter.
			</h1>
			<p className="max-w-[52ch] text-muted-foreground">
				Die aufgerufene Seite gibt es nicht oder sie ist umgezogen.
			</p>
			<div className="grid w-full gap-2.5 sm:flex sm:w-auto sm:gap-3">
				<BrandButton asChild>
					<Link href="/">Zur Startseite</Link>
				</BrandButton>
				<BrandButton asChild variant="tertiary">
					<Link href="/kontakt">Kontakt aufnehmen</Link>
				</BrandButton>
			</div>
		</section>
	);
}
