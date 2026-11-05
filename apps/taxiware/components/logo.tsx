import { cn } from "@repo/ui/lib/utils";
import Image from "next/image";

// Traced from the TaxiWare logo artwork
const sources = {
	color: "/logo.svg",
	white: "/logo-white.svg",
} as const;

/**
 * The TaxiWare wordmark. `white` is for dark backgrounds.
 * The height comes from `--logo-size`, e.g. `className="[--logo-size:2rem]"`.
 */
export function Logo({
	className,
	loading,
	variant = "color",
}: {
	className?: string;
	/** `eager` for the copy above the fold */
	loading?: "eager" | "lazy";
	variant?: keyof typeof sources;
}) {
	return (
		<Image
			alt="TaxiWare"
			className={cn(
				"block h-(--logo-size) w-auto shrink-0 [--logo-size:2rem]",
				className,
			)}
			height={235}
			loading={loading}
			src={sources[variant]}
			unoptimized
			width={1188}
		/>
	);
}
