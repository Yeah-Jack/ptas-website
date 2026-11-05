import type { Metadata } from "next";
import Checks from "@/components/sections/checks";
import Compare from "@/components/sections/compare";
import Faq from "@/components/sections/faq";
import Hero from "@/components/sections/hero";
import Payments from "@/components/sections/payments";
import Pricing from "@/components/sections/pricing";
import Steps from "@/components/sections/steps";

// Set here, not in the layout, so other pages don't inherit "/" as canonical
export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
	return (
		<>
			<Hero />
			<Checks />
			<Payments />
			<Pricing />
			<Steps />
			<Compare />
			<Faq />
		</>
	);
}
