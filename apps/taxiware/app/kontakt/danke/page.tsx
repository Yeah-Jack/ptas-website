import Link from "next/link";
import { BrandButton } from "@/components/brand-button";
import { Eyebrow } from "@/components/section-heading";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
	description:
		"Danke für Ihre Anfrage! Wir melden uns in der Regel innerhalb eines Werktages.",
	path: "/kontakt/danke",
	robots: { follow: false, index: false },
	title: "Vielen Dank",
});

export default function DankePage() {
	return (
		<section className="mx-auto grid max-w-300 justify-items-start gap-5 px-4 pt-14 sm:px-6 lg:pt-24">
			<Eyebrow>Anfrage gesendet</Eyebrow>
			<h1 className="text-balance font-bold text-[2.125rem] leading-[1.1] tracking-[-0.02em] sm:text-[3rem]">
				Vielen Dank für Ihre Anfrage!
			</h1>
			<p className="max-w-[52ch] text-muted-foreground">
				Wir haben Ihre Nachricht erhalten und melden uns in der Regel innerhalb
				eines Werktages bei Ihnen.
			</p>
			<BrandButton asChild>
				<Link href="/">Zurück zur Startseite</Link>
			</BrandButton>
		</section>
	);
}
