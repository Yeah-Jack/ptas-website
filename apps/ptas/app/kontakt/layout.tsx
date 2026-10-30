import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
	...pageMetadata({
		description:
			"Kontaktieren Sie PTAS für die Abrechnung Ihrer Krankenfahrten.",
		path: "/kontakt",
		title: "Kontakt",
	}),
	title: { default: "Kontakt", template: "%s | PTAS" },
};

export default function KontaktLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
