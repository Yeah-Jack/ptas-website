import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogImage } from "@/lib/metadata";

export const alt = ogImage.alt;
export const size = { height: ogImage.height, width: ogImage.width };
export const contentType = "image/png";

// Inter as on the site (the built-in font has only one weight), Latin subset
// from @fontsource/inter 5.1.0, SIL Open Font License (assets/fonts/OFL.txt)
const font = (file: string) =>
	readFile(join(process.cwd(), "assets", "fonts", file));

export default async function Image() {
	const [logo, interRegular, interBold] = await Promise.all([
		readFile(join(process.cwd(), "public", "logo-white.svg")),
		font("inter-latin-400-normal.woff"),
		font("inter-latin-700-normal.woff"),
	]);
	const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

	return new ImageResponse(
		<div
			style={{
				background: "#0a5bd3",
				color: "white",
				display: "flex",
				flexDirection: "column",
				fontFamily: "Inter",
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
		{
			...size,
			fonts: [
				{ data: interRegular, name: "Inter", style: "normal", weight: 400 },
				{ data: interBold, name: "Inter", style: "normal", weight: 700 },
			],
		},
	);
}
