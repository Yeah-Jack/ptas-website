import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogImage } from "@/lib/metadata";

export const alt = ogImage.alt;
export const size = { height: ogImage.height, width: ogImage.width };
export const contentType = "image/png";

export default async function Image() {
	const logo = await readFile(join(process.cwd(), "public", "icon.svg"));
	const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

	return new ImageResponse(
		<div
			style={{
				alignItems: "center",
				background: "white",
				display: "flex",
				flexDirection: "column",
				height: "100%",
				justifyContent: "center",
				width: "100%",
			}}
		>
			{/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain HTML, next/image is not available here */}
			<img alt="" height={240} src={logoSrc} width={480} />
			<div
				style={{
					color: "#171717",
					display: "flex",
					fontSize: 52,
					fontWeight: 700,
					marginTop: 24,
				}}
			>
				Personentransport-Abrechnungsservice
			</div>
			<div
				style={{
					color: "#525252",
					display: "flex",
					fontSize: 32,
					marginTop: 16,
				}}
			>
				Abrechnung von Krankenfahrten mit allen Kostenträgern
			</div>
			<div
				style={{
					background: "#7d0000",
					bottom: 0,
					display: "flex",
					height: 24,
					left: 0,
					position: "absolute",
					width: "100%",
				}}
			/>
		</div>,
		size,
	);
}
