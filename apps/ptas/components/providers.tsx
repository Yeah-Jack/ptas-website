"use client";

import { Toaster } from "@repo/ui/components/sonner";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			disableTransitionOnChange
			enableSystem
		>
			{/* Respect the "reduce motion" OS setting in all motion animations */}
			<MotionConfig reducedMotion="user">{children}</MotionConfig>
			<Toaster richColors />
		</ThemeProvider>
	);
}
