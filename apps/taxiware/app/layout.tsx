import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { cn } from "@repo/ui/lib/utils";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { company, contact } from "@/lib/contact";
import { sharedOpenGraph, siteUrl } from "@/lib/metadata";

const inter = Inter({
	// Optical sizes keep large headlines tight, as in the design
	axes: ["opsz"],
	display: "swap",
	subsets: ["latin"],
	variable: "--font-inter",
});

const description =
	"TaxiWare erfasst Ihre Verordnungen, prüft jede Fahrt und übermittelt direkt an die Kostenträger. Gebaut für Taxi- und Mietwagenunternehmen, Fahrdienste und Krankentransporte.";
const title = "TaxiWare – Krankenfahrten selbst abrechnen nach § 302 SGB V";

export const metadata: Metadata = {
	description,
	metadataBase: new URL(siteUrl),
	openGraph: { ...sharedOpenGraph, description, title, url: "/" },
	title: {
		default: title,
		template: "%s | TaxiWare",
	},
};

const organization = {
	"@context": "https://schema.org",
	"@type": "Organization",
	address: {
		"@type": "PostalAddress",
		addressCountry: "DE",
		addressLocality: company.city,
		postalCode: company.postalCode,
		streetAddress: company.street,
	},
	brand: { "@type": "Brand", logo: `${siteUrl}/logo.svg`, name: "TaxiWare" },
	email: contact.email,
	legalName: company.name,
	logo: `${siteUrl}/logo.svg`,
	name: "TaxiWare",
	telephone: contact.phone.international,
	url: siteUrl,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			className={cn(
				"h-full scroll-pt-20 antialiased motion-safe:scroll-smooth",
				inter.variable,
			)}
			data-scroll-behavior="smooth"
			lang="de"
		>
			<body className="flex min-h-full flex-col text-[1.125rem] leading-[1.6]">
				<JsonLd data={organization} />
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
