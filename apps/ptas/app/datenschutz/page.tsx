import fs from "node:fs/promises";
import path from "node:path";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
	description:
		"Datenschutzhinweise der PTAS Personentransport-Abrechnungsservice",
	path: "/datenschutz",
	title: "Datenschutz",
});

export default async function DatenschutzPage() {
	const html = await fs.readFile(
		path.join(process.cwd(), "content", "legal", "datenschutz.html"),
		"utf-8",
	);

	return (
		<section className="py-8 md:py-16">
			<div className="container mx-auto px-4">
				<FadeInUp>
					{/** biome-ignore lint/security/noDangerouslySetInnerHtml: False positive */}
					<div dangerouslySetInnerHTML={{ __html: html }} />
				</FadeInUp>
			</div>
		</section>
	);
}
