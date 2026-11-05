import { Clock, Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Eyebrow } from "@/components/section-heading";
import { contact } from "@/lib/contact";
import { isAnliegen } from "@/lib/contact-schema";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
	description:
		"TaxiWare mit Ihren eigenen Fahrten testen oder einen Rückruf anfordern.",
	path: "/kontakt",
	title: "Kontakt",
});

const channels = [
	{
		href: contact.phone.href,
		icon: Phone,
		label: "Telefon",
		value: contact.phone.display,
	},
	{
		href: `mailto:${contact.email}`,
		icon: Mail,
		label: "E-Mail",
		value: contact.email,
	},
	{ icon: Clock, label: "Bürozeiten", value: contact.hours },
];

export default async function KontaktPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { anliegen } = await searchParams;
	const selected = isAnliegen(anliegen) ? anliegen : "test";

	return (
		<section className="mx-auto grid max-w-300 gap-10 px-4 pt-14 sm:px-6 lg:pt-24">
			<div className="grid gap-4">
				<Eyebrow>Kontakt</Eyebrow>
				<h1 className="max-w-[20ch] text-balance font-bold text-[2.125rem] leading-[1.1] tracking-[-0.02em] sm:text-[3rem]">
					TaxiWare testen oder Rückruf anfordern
				</h1>
				<p className="max-w-[56ch] text-muted-foreground">
					Testen Sie TaxiWare mit Ihren eigenen Fahrten. Schreiben Sie uns kurz,
					wir melden uns bei Ihnen.
				</p>
			</div>

			<div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-10">
				<div className="rounded-xl border bg-card p-5 sm:p-8">
					{/* Keyed so a switch between ?anliegen links resets the form */}
					<ContactForm anliegen={selected} key={selected} />
				</div>

				<aside
					aria-label="Direkter Kontakt"
					className="grid gap-5 rounded-xl bg-cobalt-50 p-5 sm:p-7"
				>
					<p className="font-semibold">Lieber direkt?</p>
					<ul className="grid gap-4">
						{channels.map(({ href, icon: Icon, label, value }) => (
							<li className="flex items-start gap-3" key={label}>
								<Icon
									aria-hidden="true"
									className="mt-1 size-5 shrink-0 text-cobalt"
								/>
								<div className="grid">
									<span className="text-muted-foreground text-sm">{label}</span>
									{href ? (
										<a
											className="font-semibold text-cobalt underline-offset-3 hover:underline"
											href={href}
										>
											{value}
										</a>
									) : (
										<span className="font-semibold">{value}</span>
									)}
								</div>
							</li>
						))}
					</ul>
				</aside>
			</div>
		</section>
	);
}
