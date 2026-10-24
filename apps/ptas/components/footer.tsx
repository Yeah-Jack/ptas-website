import { Ambulance, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const navigationLinks = [
	{ label: "Startseite", to: "/" },
	{ label: "Leistungen", to: "/leistungen" },
	{ label: "Abrechnung", to: "/abrechnung" },
	{ label: "Vorfinanzierung", to: "/vorfinanzierung" },
	{ label: "Kontakt", to: "/kontakt" },
] as const;

const legalLinks = [
	{ label: "Impressum", to: "/impressum" },
	{ label: "Datenschutz", to: "/datenschutz" },
] as const;

export default function Footer() {
	return (
		<footer className="border-t bg-muted/30">
			<div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Brand */}
					<div className="flex flex-col gap-4">
						<Link
							className="flex items-center gap-2 font-bold text-lg text-primary"
							href="/"
						>
							<Ambulance className="size-5" />
							PTAS
						</Link>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Personentransport-Abrechnungsservice - Ihr Partner für die
							zuverlässige Abrechnung von Krankenfahrt-Belegen mit allen
							Kostenträgern.
						</p>
					</div>

					{/* Navigation */}
					<div className="flex flex-col gap-4">
						<h3 className="font-semibold text-sm uppercase tracking-wider">
							Navigation
						</h3>
						<nav className="flex flex-col gap-2">
							{navigationLinks.map(({ to, label }) => (
								<Link
									className="text-muted-foreground text-sm transition-colors hover:text-foreground"
									href={to}
									key={to}
								>
									{label}
								</Link>
							))}
						</nav>
					</div>

					{/* Legal */}
					<div className="flex flex-col gap-4">
						<h3 className="font-semibold text-sm uppercase tracking-wider">
							Rechtliches
						</h3>
						<nav className="flex flex-col gap-2">
							{legalLinks.map(({ to, label }) => (
								<Link
									className="text-muted-foreground text-sm transition-colors hover:text-foreground"
									href={to}
									key={to}
									prefetch={false}
								>
									{label}
								</Link>
							))}
							{/* CCM19 reopens its consent dialog for links to this hash */}
							<a
								className="text-muted-foreground text-sm transition-colors hover:text-foreground"
								href="#CCM.openWidget"
							>
								Cookie-Einstellungen
							</a>
						</nav>
					</div>

					{/* Contact */}
					<div className="flex flex-col gap-4">
						<h3 className="font-semibold text-sm uppercase tracking-wider">
							Kontakt
						</h3>
						<div className="flex flex-col gap-3 text-muted-foreground text-sm">
							<a
								className="flex items-center gap-2 transition-colors hover:text-foreground"
								href="https://www.google.com/maps/place/Am+Holzweg+26,+65830+Kriftel,+Deutschland"
								rel="noopener noreferrer"
								target="_blank"
							>
								<MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
								<span>
									<span className="block text-foreground">Büro</span>
									Am Holzweg 26
									<br />
									65830 Kriftel
								</span>
							</a>
							<a
								className="flex items-center gap-2 transition-colors hover:text-foreground"
								href="tel:+4961929391752"
							>
								<Phone className="size-4 shrink-0 text-primary" />
								06192 9391 752
							</a>
							<a
								className="flex items-center gap-2 transition-colors hover:text-foreground"
								href="mailto:info@ptas.de"
							>
								<Mail className="size-4 shrink-0 text-primary" />
								info@ptas.de
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t bg-background/50">
				<div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-4 text-center text-muted-foreground text-xs sm:flex-row sm:text-left">
					<p>
						© 1997 - {new Date().getFullYear()}{" "}
						Personentransport-Abrechnungsservice. Alle Rechte vorbehalten.
					</p>
					<a
						href="https://github.com/Yeah-Jack"
						title="Mit Herz von Frederik Bauer in Deutschland entwickelt"
					>
						Mit <span className="text-primary">♥</span> entwickelt in
						Deutschland
					</a>
				</div>
			</div>
		</footer>
	);
}
