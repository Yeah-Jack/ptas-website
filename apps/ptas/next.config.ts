import type { NextConfig } from "next";

// HSTS is not set here because Azure Static Web Apps already sends it.
// A full Content-Security-Policy needs an allowlist for CCM19 and the scripts
// it loads after consent, so only frame-ancestors is enforced for now.
const securityHeaders = [
	{ key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=()",
	},
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
	async headers() {
		return [{ headers: securityHeaders, source: "/:path*" }];
	},
	// Azure Static Web Apps deploys the self-contained server from .next/standalone
	output: "standalone",
	poweredByHeader: false,
	reactCompiler: true,
	async redirects() {
		return [
			{
				destination: "https://ptas.de/:path*",
				has: [{ type: "host", value: "www.ptas.de" }],
				permanent: true,
				source: "/:path*",
			},
			{
				destination: "/abrechnung",
				permanent: true,
				source: "/abrechnungssoftware",
			},
			{
				destination: "/vorfinanzierung",
				permanent: true,
				source: "/abrechnung/vorfinanzierung",
			},
		];
	},
	typedRoutes: true,
};

export default nextConfig;
