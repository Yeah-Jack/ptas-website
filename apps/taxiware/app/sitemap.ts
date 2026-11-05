import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
	// Add "/datenschutz" together with its page
	const routes = ["", "/kontakt", "/impressum"];

	return routes.map((route) => ({
		changeFrequency: "monthly",
		lastModified: new Date(),
		priority: route === "" ? 1 : 0.5,
		url: `${siteUrl}${route}`,
	}));
}
