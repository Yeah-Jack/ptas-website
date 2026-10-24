import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { cn } from "@repo/ui/lib/utils";
import {
	ArrowRight,
	CheckCircle,
	Clock,
	FileText,
	HandCoins,
	Headphones,
	Package,
	PiggyBank,
	Send,
	Shield,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { cssFadeInUp } from "@/components/animations/css-fade-in-up";
import { FadeInUp } from "@/components/animations/fade-in-up";
import CTA from "@/components/cta";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
	description:
		"Wir übernehmen den kompletten Bearbeitungs-Ablauf für Ihre Transportscheine. Von der Erfassung der Krankenfahrten bis hin zur Rechnungsstellung.",
	path: "/leistungen",
	title: "Abrechnung von Krankenfahrten zu geringen Kosten",
});

const processSteps = [
	{
		description: "Sie schicken uns Ihre Verordnungen zu.",
		icon: FileText,
		title: "Belege zusenden",
	},
	{
		description:
			"Nach Prüfung und Erfassung der Belege fakturieren wir die Forderungen an die Kostenträger.",
		icon: Shield,
		title: "Prüfung & Erfassung",
	},
	{
		description:
			"Per Datenträgeraustausch nach § 302 SGB V - schnelle Bearbeitung, weniger Rechnungskürzungen.",
		icon: Zap,
		title: "Datenträgeraustausch",
	},
	{
		description:
			"Auszahlung über unseren Factoring-Partner oder direkt von den Kostenträgern.",
		icon: PiggyBank,
		title: "Auszahlung",
	},
] as const;

const benefits = [
	{
		description:
			"Wir ersparen wertvolle Zeit, da wir die komplette Abwicklung übernehmen.",
		icon: Clock,
		title: "Zeitersparnis",
	},
	{
		description:
			"Hohe Verwaltungs- und Personalkosten können damit gespart werden.",
		icon: HandCoins,
		title: "Kostenersparnis",
	},
	{
		description:
			"Es ist keine Vorbereitung oder Aufbereitung der Unterlagen erforderlich.",
		icon: Package,
		title: "Keine Vorbereitung",
	},
	{
		description:
			"Wir gewährleisten einen unkomplizierten Ablauf und zügige Auszahlung Ihres Guthabens.",
		icon: Zap,
		title: "Zügige Auszahlung",
	},
] as const;

const abrechnungFeatures = [
	"Sie schicken uns Ihre Belege",
	"Wir rechnen für Sie ab",
	"Sie erhalten Ihr Geld wie gewohnt auf Ihr Konto",
] as const;

const vorfinanzierungFeatures = [
	"Sie schicken uns Ihre Belege",
	"Wir rechnen für Sie ab",
	"Sie erhalten Ihr Geld nach vereinbarter Zeit auf Ihr Konto",
	"Individuelle Zahlungsziele",
] as const;

export default function LeistungenPage() {
	return (
		<div className="flex flex-col">
			{/* Hero Section */}
			<section className="border-b bg-linear-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<div className={cn("mx-auto max-w-3xl text-center", cssFadeInUp)}>
						<div className="mb-4 flex items-center justify-center gap-2 text-primary">
							<Package className="size-6" />
							<span className="font-semibold text-sm uppercase tracking-wider">
								Unsere Leistungen
							</span>
						</div>
						<h1 className="mb-6 font-bold text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
							Abrechnung von Krankenfahrten zu{" "}
							<span className="text-primary">geringen Kosten</span>
						</h1>
						<p className="text-lg text-muted-foreground">
							Wir übernehmen den kompletten Bearbeitungs-Ablauf für Ihre
							Transportscheine. Von der Erfassung der Krankenfahrten bis hin zur
							Rechnungsstellung.
						</p>
					</div>
				</div>
			</section>

			{/* Process Section */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<FadeInUp className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-2xl md:text-3xl">
							Unser Ablauf
						</h2>
						<p className="mx-auto max-w-2xl text-muted-foreground">
							Sie schicken uns Ihre Verordnungen zu. Nach Prüfung und Erfassung
							der Belege fakturieren wir die Forderungen an die Kostenträger per
							Datenträgeraustausch nach § 302 SGB V.
						</p>
					</FadeInUp>

					<div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
						{processSteps.map((step, index) => (
							<div className="relative" key={step.title}>
								{index < processSteps.length - 1 && (
									<div className="absolute top-10 right-0 hidden h-0.5 w-[calc(100%-3rem)] translate-x-1/2 bg-linear-to-r from-primary/30 to-background xl:block" />
								)}
								<FadeInUp delay={0.1 * index}>
									<Card className="relative h-full border-transparent bg-background/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-background hover:shadow-md">
										<CardHeader className="flex flex-col items-center text-center">
											<div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 shadow-inner">
												<step.icon className="size-8 text-primary" />
											</div>
											<CardTitle className="text-lg">{step.title}</CardTitle>
											<CardDescription>{step.description}</CardDescription>
										</CardHeader>
									</Card>
								</FadeInUp>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Details Section */}
			<section className="border-y bg-muted/30 py-12 md:py-16 lg:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
						<FadeInUp>
							<h2 className="mb-6 font-bold text-2xl md:text-3xl">
								Was wir für Sie übernehmen
							</h2>
							<div className="space-y-4 text-muted-foreground">
								<p>
									Dadurch gewährleisten wir eine schnelle Bearbeitung und
									vermeiden Rechnungskürzungen. Die Belege Ihrer Krankenfahrten
									werden vor der Erfassung von uns digital archiviert.
								</p>
								<p>
									Je nach Vereinbarung erhalten Sie eine Auszahlung auf Ihre
									Forderungen von unserem Factoring-Partner oder Ihr Geld
									weiterhin direkt von den Kostenträgern.
								</p>
								<p>
									Wir führen die aufwändige Rückläuferbearbeitung und das
									Mahnwesen für Sie durch.{" "}
									<span className="font-medium text-primary">
										Ohne versteckte Kosten
									</span>{" "}
									- es wird nur die vereinbarte Gebühr fällig.
								</p>
								<p>
									Für die Buchhaltung bzw. Steuerberater bereiten wir die
									Unterlagen entsprechend auf. Unsere Gebühren sind
									selbstverständlich als Betriebsausgaben absetzbar.
								</p>
							</div>
						</FadeInUp>
						<FadeInUp delay={0.2}>
							<Card className="border-primary/20 bg-linear-to-br from-primary/10 to-transparent shadow-sm">
								<CardHeader>
									<CardTitle className="flex items-center gap-2">
										<CheckCircle className="size-5 text-primary" />
										Inklusive Leistungen
									</CardTitle>
								</CardHeader>
								<CardContent>
									<ul className="space-y-3">
										<li className="flex items-start gap-3">
											<CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
											<span className="text-sm">
												Komplette Erfassung Ihrer Krankenfahrten
											</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
											<span className="text-sm">
												Digitale Archivierung der Belege
											</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
											<span className="text-sm">
												Fakturierung per Datenträgeraustausch § 302 SGB V
											</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
											<span className="text-sm">Rückläuferbearbeitung</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
											<span className="text-sm">Mahnwesen</span>
										</li>
										<li className="flex items-start gap-3">
											<CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
											<span className="text-sm">
												Aufbereitung für Buchhaltung/Steuerberater
											</span>
										</li>
									</ul>
								</CardContent>
							</Card>
						</FadeInUp>
					</div>
				</div>
			</section>

			{/* Benefits Section */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<FadeInUp className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-2xl md:text-3xl">
							Ihre Vorteile
						</h2>
					</FadeInUp>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{benefits.map((benefit, idx) => (
							<FadeInUp delay={0.1 * idx} key={benefit.title}>
								<Card className="h-full border-transparent bg-background/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-background hover:shadow-md">
									<CardHeader className="flex flex-col items-center text-center">
										<div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 shadow-inner">
											<benefit.icon className="size-8 text-primary" />
										</div>
										<CardTitle className="text-lg">{benefit.title}</CardTitle>
										<CardDescription>{benefit.description}</CardDescription>
									</CardHeader>
								</Card>
							</FadeInUp>
						))}
					</div>
				</div>
			</section>

			{/* Contact CTA */}
			<section className="border-y bg-muted/30 py-8 md:py-12">
				<FadeInUp className="container mx-auto max-w-4xl px-4 text-center">
					<div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-3">
						<Headphones className="size-8 text-primary" />
						<p className="text-base md:text-lg">
							Haben Sie Fragen?{" "}
							<span className="font-medium">Melden Sie sich bei uns!</span>
						</p>
						<Button asChild className="gap-2 sm:ml-4">
							<Link href="/kontakt">
								<Send className="size-4" />
								Kontakt
							</Link>
						</Button>
					</div>
				</FadeInUp>
			</section>

			{/* Packages Section */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<FadeInUp className="mb-12 text-center">
						<h2 className="mb-4 font-bold text-2xl md:text-3xl">
							Unsere Leistungs-Pakete
						</h2>
						<p className="mx-auto max-w-2xl text-muted-foreground">
							Wählen Sie Ihr passendes Angebot. Eines unserer Leistungs-Pakete
							ist sicher das Richtige für Ihren Betrieb!
						</p>
					</FadeInUp>

					<div className="mx-auto grid max-w-4xl gap-6 md:gap-8 lg:grid-cols-2">
						{/* Abrechnung Package */}
						<FadeInUp className="flex flex-col">
							<Card className="flex h-full flex-col">
								<CardHeader>
									<CardTitle className="text-2xl">Abrechnung</CardTitle>
									<CardDescription className="text-base">
										Sie erhalten schnell ein Angebot von uns!
									</CardDescription>
								</CardHeader>
								<CardContent className="flex-1">
									<ul className="space-y-3">
										{abrechnungFeatures.map((feature) => (
											<li className="flex items-start gap-3" key={feature}>
												<CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</CardContent>
								<CardFooter>
									<Button asChild className="w-full gap-2" variant="outline">
										<Link href="/abrechnung">
											Mehr erfahren
											<ArrowRight className="size-4" />
										</Link>
									</Button>
								</CardFooter>
							</Card>
						</FadeInUp>

						{/* Abrechnung mit Vorfinanzierung Package */}
						<FadeInUp className="flex flex-col" delay={0.2}>
							<Card className="relative flex h-full flex-col overflow-hidden border-primary/30 bg-primary/5">
								<div className="absolute top-0 right-0 rounded-bl-lg bg-primary px-3 py-1 font-medium text-primary-foreground text-xs">
									Top-Kombination!
								</div>
								<CardHeader className="pt-6">
									<CardTitle className="text-2xl">
										Abrechnung mit Vorfinanzierung
									</CardTitle>
								</CardHeader>
								<CardContent className="flex-1">
									<ul className="space-y-3">
										{vorfinanzierungFeatures.map((feature) => (
											<li className="flex items-start gap-3" key={feature}>
												<CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</CardContent>
								<CardFooter>
									<Button asChild className="w-full gap-2">
										<Link href="/vorfinanzierung">
											Mehr erfahren
											<ArrowRight className="size-4" />
										</Link>
									</Button>
								</CardFooter>
							</Card>
						</FadeInUp>
					</div>

					{/* Legal Notice */}
					<FadeInUp
						className="mx-auto mt-12 max-w-3xl rounded-lg border bg-muted/30 p-6 text-center text-muted-foreground text-sm"
						delay={0.3}
					>
						<p>
							Unsere Angebote richten sich nur an Unternehmer (§14 BGB), also an
							natürliche oder juristische Personen oder rechtsfähige
							Personengesellschaften, die bei Abschluss eines Rechtsgeschäfts in
							Ausübung ihrer gewerblichen oder selbständigen beruflichen
							Tätigkeit handeln. Wir schließen keine Verträge mit Verbrauchern
							(§13 BGB).
						</p>
					</FadeInUp>
				</div>
			</section>

			<CTA />
		</div>
	);
}
