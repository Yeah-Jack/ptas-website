import type { Metadata } from "next";

export const ogImage = {
	alt: "PTAS - Personentransport-Abrechnungsservice",
	height: 630,
	url: "/opengraph-image",
	width: 1200,
};

// Next merges metadata shallowly: a page that sets openGraph replaces the
// layout's openGraph completely (including the file-based image), so every
// page has to repeat these fields.
export const sharedOpenGraph = {
	images: [ogImage],
	locale: "de_DE",
	siteName: "PTAS",
	type: "website",
} satisfies Metadata["openGraph"];

interface PageMetadataOptions {
	description: string;
	path: string;
	robots?: Metadata["robots"];
	title: string;
}

export function pageMetadata({
	description,
	path,
	robots,
	title,
}: PageMetadataOptions): Metadata {
	return {
		alternates: { canonical: path },
		description,
		openGraph: { ...sharedOpenGraph, description, title, url: path },
		...(robots ? { robots } : {}),
		title,
	};
}
