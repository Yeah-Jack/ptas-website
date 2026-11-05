"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ctaHref, sectionLinks } from "@/lib/links";
import { BrandButton } from "./brand-button";

export function MobileNav() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleRef = useRef<HTMLButtonElement>(null);
	const close = () => setIsOpen(false);

	// Escape closes the menu and returns focus to the toggle
	useEffect(() => {
		if (!isOpen) {
			return;
		}
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
				toggleRef.current?.focus();
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [isOpen]);

	return (
		<div className="lg:hidden">
			<button
				aria-controls="mobile-nav"
				aria-expanded={isOpen}
				aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
				className="grid size-11 place-items-center rounded-lg border bg-white"
				onClick={() => setIsOpen(!isOpen)}
				ref={toggleRef}
				type="button"
			>
				{isOpen ? <X className="size-5.5" /> : <Menu className="size-5.5" />}
			</button>

			{/* Positioned against the sticky header */}
			<nav
				aria-label="Hauptnavigation"
				className="absolute inset-x-0 top-full border-b bg-white"
				hidden={!isOpen}
				id="mobile-nav"
			>
				<div className="mx-auto grid max-w-300 gap-1 px-4 pt-2 pb-6 sm:px-6">
					{sectionLinks.map(({ href, label }) => (
						<Link
							className="rounded-lg px-3 py-3 font-semibold text-lg transition-colors hover:bg-cobalt-50"
							href={href}
							key={href}
							onClick={close}
						>
							{label}
						</Link>
					))}
					<BrandButton asChild block className="mt-3">
						<Link href={ctaHref} onClick={close}>
							Jetzt ausprobieren
						</Link>
					</BrandButton>
				</div>
			</nav>
		</div>
	);
}
