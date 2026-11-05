import Link from "next/link";
import { ctaHref, sectionLinks } from "@/lib/links";
import { BrandButton } from "./brand-button";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b bg-white">
			<div className="mx-auto flex max-w-300 items-center gap-8 px-4 py-3 sm:px-6 lg:py-3.5">
				<Link className="shrink-0 rounded-sm" href="/">
					<Logo
						className="[--logo-size:1.75rem] lg:[--logo-size:2.125rem]"
						loading="eager"
					/>
				</Link>

				{/* Desktop Navigation */}
				<nav
					aria-label="Hauptnavigation"
					className="hidden flex-1 items-center gap-7 lg:flex"
				>
					{sectionLinks.map(({ href, label }) => (
						<Link
							className="font-semibold text-base transition-colors hover:text-cobalt"
							href={href}
							key={href}
						>
							{label}
						</Link>
					))}
				</nav>

				<div className="ml-auto flex items-center gap-3 lg:gap-8">
					<BrandButton asChild className="hidden sm:inline-flex">
						<Link href={ctaHref}>Jetzt ausprobieren</Link>
					</BrandButton>
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
