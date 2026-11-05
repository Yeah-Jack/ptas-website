import type { NextConfig } from "next";

// HSTS is not set here because Azure Static Web Apps already sends it.
// Same baseline as ptas.de: only frame-ancestors is enforced for now.
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
	// The www redirect is in proxy.ts, see there for why
	typedRoutes: true,
};

export default nextConfig;
