import { type NextRequest, NextResponse } from "next/server";

/**
 * Redirects www.taxiware.de to the apex domain.
 *
 * This lives here instead of in next.config redirects(): a catch-all
 * redirect there is registered as the typed route "/[[...path]]", which
 * makes every href valid and silently turns off typedRoutes checks.
 */
export function proxy(request: NextRequest) {
	const { pathname, search } = request.nextUrl;
	return NextResponse.redirect(
		new URL(`${pathname}${search}`, "https://taxiware.de"),
		308,
	);
}

export const config = {
	matcher: [
		{
			has: [{ key: "host", type: "header", value: "www\\.taxiware\\.de" }],
			// Azure checks /.swa/health.html after each deploy
			source: "/((?!\\.swa/).*)",
		},
	],
};
