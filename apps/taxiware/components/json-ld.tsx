/** Structured data for search engines, escaped as recommended in the Next.js JSON-LD guide */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
	return (
		<script
			// biome-ignore lint/security/noDangerouslySetInnerHtml: Serialized JSON with "<" escaped, so it can't close the script tag
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data).replace(/</g, "\\u003c"),
			}}
			type="application/ld+json"
		/>
	);
}
