import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import {
	ArrowRight,
	Banknote,
	Calendar,
	CheckCircle,
	Clock,
	Eye,
	HandCoins,
	Handshake,
	Send,
	ShieldCheck,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FadeInUp } from "@/components/animations/fade-in-up";
import CTA from "@/components/cta";

export const metadata: Metadata = {
	alternates: { canonical: "/vorfinanzierung" },
	description:
		"Schnellere Auszahlung für Ihre Krankenfahrten. Sichern Sie Ihre Liquidität und erhalten Sie Zahlungen schneller als die regulären 6 Wochen mit unserer Vorfinanzierung.",
	openGraph: {
		description:
			"Schnellere Auszahlung für Ihre Krankenfahrten. Sichern Sie Ihre Liquidität und erhalten Sie Zahlungen schneller als die regulären 6 Wochen mit unserer Vorfinanzierung.",
		title: "Vorfinanzierung für Krankenfahrten",
		url: "https://ptas.de/vorfinanzierung",
	},
	title: "Vorfinanzierung für Krankenfahrten",
};

const benefits = [
	{
		description:
			"Erhalten Sie Ihre Zahlungen schneller als die regulären 6 Wochen!",
		icon: Clock,
		title: "Schnelle Auszahlung",
	},
	{
		description:
			"Verschiedene Tarife und Zahlungsziele. Ganz nach Ihren Vorstellungen!",
		icon: HandCoins,
		title: "Flexible Tarife",
	},
	{
		description:
			"Ihre Liquidität und die rechtzeitige Bezahlung der Mitarbeiter ist gesichert.",
		icon: ShieldCheck,
		title: "Liquidität gesichert",
	},
	{
		description:
			"Setzen Sie auf einen Finanzierungspartner mit langjähriger Erfahrung und den nötigen Ressourcen!",
		icon: Handshake,
		title: "Erfahrener Partner",
	},
] as const;

const steps = [
	{
		description:
			"Wenn Sie die Vorfinanzierung für Krankenfahrten wünschen, melden wir Sie dafür an.",
		number: "1",
		title: "Anmeldung",
	},
	{
		description:
			"Wir übertragen zusätzlich Informationen aus den Abrechnungen an SozialFactoring.",
		number: "2",
		title: "Datenübertragung",
	},
	{
		description:
			"Je nach vereinbartem Zahlungsziel erhalten Sie das Geld ausgezahlt.",
		number: "3",
		title: "Auszahlung",
	},
	{
		description: "Der laufende Rechnungsabschluss erfolgt dann nach 60 Tagen.",
		number: "4",
		title: "Rechnungsabschluss",
	},
] as const;

export default function VorfinanzierungPage() {
	return (
		<div className="flex flex-col">
			{/* Hero Section */}
			<section className="border-b bg-linear-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<FadeInUp className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center md:gap-6">
						<div className="flex items-center gap-2 text-primary">
							<Banknote className="size-6" />
							<span className="font-medium text-sm uppercase tracking-wider">
								Vorfinanzierung
							</span>
						</div>
						<h1 className="font-bold text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
							Vorfinanzierung für{" "}
							<span className="text-primary">Krankenfahrten</span>
						</h1>
						<p className="text-lg text-muted-foreground">
							In der Regel dauert es ca. 6 Wochen, bis die Kostenträger Ihre
							Krankenfahrten bezahlen. Haben Sie Ihr Geld schneller auf dem
							Konto - gegen einen geringen Aufpreis.
						</p>
						<p className="font-medium text-foreground">
							Unsere Vorfinanzierung für Krankenfahrten ist einfacher als
							gedacht!
						</p>
						<div className="flex w-full flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
							<Button asChild className="w-full gap-2 sm:w-auto" size="lg">
								<Link href="/kontakt">
									<Send className="size-4" />
									Jetzt anfragen
								</Link>
							</Button>
							<Button
								asChild
								className="w-full gap-2 sm:w-auto"
								size="lg"
								variant="outline"
							>
								<Link href="/abrechnung">
									Zur Abrechnung
									<ArrowRight className="size-4" />
								</Link>
							</Button>
						</div>
					</FadeInUp>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<FadeInUp className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-2xl md:text-3xl">
							Schneller Zahlungseingang - Ihre Vorteile
						</h2>
						<p className="mx-auto max-w-2xl text-muted-foreground">
							Wir arbeiten mit der SozialFactoring GmbH zusammen.
						</p>
					</FadeInUp>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{benefits.map((benefit, idx) => (
							<FadeInUp delay={0.1 * idx} key={benefit.title}>
								<Card className="h-full">
									<CardHeader className="text-center">
										<benefit.icon className="mx-auto mb-2 size-10 text-primary" />
										<CardTitle>{benefit.title}</CardTitle>
										<CardDescription>{benefit.description}</CardDescription>
									</CardHeader>
								</Card>
							</FadeInUp>
						))}
					</div>
				</div>
			</section>

			{/* How it works Section */}
			<section className="border-y bg-muted/30 py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<FadeInUp className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-2xl md:text-3xl">
							Ganz einfach!
						</h2>
						<p className="mx-auto max-w-2xl text-muted-foreground">
							So funktioniert die Vorfinanzierung für Krankenfahrten
						</p>
					</FadeInUp>

					<div className="grid items-stretch gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
						{steps.map((step, index) => (
							<div className="relative h-full" key={step.title}>
								<div className="absolute top-8 right-0 hidden h-0.5 w-full translate-x-1/2 bg-border lg:block" />
								<FadeInUp className="h-full" delay={0.1 * index}>
									<Card className="relative h-full">
										<CardHeader>
											<div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary font-bold text-lg text-primary-foreground">
												{step.number}
											</div>
											<CardTitle>{step.title}</CardTitle>
											<CardDescription>{step.description}</CardDescription>
										</CardHeader>
									</Card>
								</FadeInUp>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Portal Section */}
			<section className="py-12 md:py-16 lg:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
						<FadeInUp>
							<div className="mb-4 flex items-center gap-2 text-primary">
								<Eye className="size-5" />
								<span className="font-medium text-sm uppercase tracking-wider">
									Übersicht behalten
								</span>
							</div>
							<h2 className="mb-6 font-bold text-2xl md:text-3xl">Portal</h2>
							<div className="space-y-4 text-muted-foreground">
								<p>
									Über unser Web-Portal und das der SozialFactoring behalten Sie
									den Überblick über den Status Ihrer vorfinanzierten
									Außenstände.
								</p>
								<p>
									Die Information umfasst eine Übersicht der erfolgten und zu
									erwartenden Auszahlungen an Sie, sowie die zu erwartenden
									Geldeingänge von den Kassen.
								</p>
							</div>
						</FadeInUp>
						<Card className="bg-primary/5">
							<CardContent className="py-6">
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
										<span>Status Ihrer vorfinanzierten Außenstände</span>
									</li>
									<li className="flex items-start gap-3">
										<CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
										<span>Übersicht erfolgter Auszahlungen</span>
									</li>
									<li className="flex items-start gap-3">
										<CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
										<span>Zu erwartende Auszahlungen</span>
									</li>
									<li className="flex items-start gap-3">
										<CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
										<span>Erwartete Geldeingänge von den Kassen</span>
									</li>
								</ul>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>

			{/* Flexibility Section */}
			<section className="border-t bg-muted/30 py-16 md:py-24">
				<div className="container mx-auto max-w-4xl px-4 text-center">
					<div className="mb-6 flex justify-center">
						<Calendar className="size-12 text-primary" />
					</div>
					<h2 className="mb-4 font-bold text-2xl md:text-3xl">
						Flexibel bleiben
					</h2>
					<p className="mb-8 text-lg text-muted-foreground">
						Sie können sich von der Vorfinanzierung für Krankenfahrten mit einer
						Frist von 3 Monaten auch wieder abmelden, wenn Sie das wünschen.
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Button asChild className="gap-2" variant="outline">
							<Link href="/leistungen">
								Leistungs-Pakete ansehen
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				</div>
			</section>

			<CTA />
		</div>
	);
}
