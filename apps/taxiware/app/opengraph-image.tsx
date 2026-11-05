import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogImage } from "@/lib/metadata";

export const alt = ogImage.alt;
export const size = { height: ogImage.height, width: ogImage.width };
export const contentType = "image/png";

export default async function Image() {
	const logo = await readFile(join(process.cwd(), "public", "logo-white.svg"));
	const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

	return new ImageResponse(
		<div
			style={{
				background: "#0a5bd3",
				color: "white",
				display: "flex",
				flexDirection: "column",
				height: "100%",
				justifyContent: "space-between",
				padding: "72px 80px",
				width: "100%",
			}}
		>
			{/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain HTML, next/image is not available here */}
			<img alt="" height={64} src={logoSrc} width={324} />
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						fontSize: 84,
						fontWeight: 700,
						letterSpacing: "-0.03em",
						lineHeight: 1.05,
					}}
				>
					<span>Vom Transportschein&nbsp;</span>
					<span style={{ color: "#ffc21a" }}>aufs Konto.</span>
				</div>
				<div
					style={{
						color: "#e3edff",
						display: "flex",
						fontSize: 34,
						marginTop: 28,
					}}
				>
					Krankenfahrten selbst abrechnen nach § 302 SGB V
				</div>
			</div>
			{/* The dashed yellow route from the hero */}
			<div
				style={{
					borderTop: "10px dashed #ffc21a",
					bottom: 0,
					display: "flex",
					left: 0,
					position: "absolute",
					width: "100%",
				}}
			/>
		</div>,
		size,
	);
}
