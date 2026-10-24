"use client";

import { Button } from "@repo/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Textarea } from "@repo/ui/components/textarea";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { Clock, Mail, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FadeInUp } from "@/components/animations/fade-in-up";
import { markContactSent } from "@/components/conversion-tracker";
import { type ContactFormValues, contactFields } from "@/lib/contact-schema";

function FieldError({ field }: { field: AnyFieldApi }) {
	if (field.state.meta.isValid) {
		return null;
	}
	return (
		<p className="text-[0.8rem] text-destructive" id={`${field.name}-error`}>
			{field.state.meta.errors.map((error) => error?.message).join(", ")}
		</p>
	);
}

const errorProps = (field: AnyFieldApi) =>
	field.state.meta.isValid
		? {}
		: { "aria-describedby": `${field.name}-error`, "aria-invalid": true };

export default function KontaktPage() {
	const router = useRouter();

	const defaultValues: ContactFormValues = {
		abrechnungInteresse: false,
		abrechnungsvolumen: "",
		adresse: "",
		email: "",
		nachricht: "",
		name: "",
		ort: "",
		plz: "",
		problem: "",
		telefon: "",
		unternehmen: "",
		vorfinanzierungInteresse: false,
		website: "",
	};

	const form = useForm({
		defaultValues,
		onSubmit: async ({ value }) => {
			const promise = fetch("/api/contact", {
				body: JSON.stringify(value),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			}).then(async (res) => {
				if (!res.ok) {
					const error = await res.json();
					throw new Error(error.error || "Fehler beim Senden");
				}
				return res.json();
			});

			toast.promise(promise, {
				error: (err) => err.message || "Es ist ein Fehler aufgetreten.",
				loading: "Nachricht wird gesendet...",
				success: "Nachricht erfolgreich gesendet!",
			});

			try {
				await promise;
				markContactSent();
				router.push("/kontakt/danke");
			} catch (_) {}
		},
	});

	return (
		<div className="flex flex-col">
			<section className="border-b bg-linear-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<FadeInUp className="mx-auto max-w-3xl text-center">
						<div className="mb-4 flex items-center justify-center gap-2 text-primary">
							<Mail className="size-6" />
							<span className="font-medium text-sm uppercase tracking-wider">
								Kontakt
							</span>
						</div>
						<h1 className="mb-6 font-bold text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl">
							Wir sind <span className="text-primary">erreichbar</span>
						</h1>
						<p className="text-lg text-muted-foreground">
							Bei Fragen zu unserem Produkt-Angebot wenden Sie sich gerne an
							uns. Über folgende Kanäle erreichen Sie uns:
						</p>
					</FadeInUp>
				</div>
			</section>

			{/* Contact Info Section */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="mb-12 grid gap-6 md:grid-cols-3">
						<FadeInUp>
							<Card>
								<CardHeader className="text-center">
									<Mail className="mx-auto mb-2 size-10 text-primary" />
									<CardTitle>E-Mail</CardTitle>
									<CardDescription>
										<a
											className="text-foreground hover:text-primary"
											href="mailto:info@ptas.de"
										>
											info@ptas.de
										</a>
									</CardDescription>
								</CardHeader>
							</Card>
						</FadeInUp>
						<FadeInUp delay={0.1}>
							<Card>
								<CardHeader className="text-center">
									<Phone className="mx-auto mb-2 size-10 text-primary" />
									<CardTitle>Telefon</CardTitle>
									<CardDescription>
										<a
											className="text-foreground hover:text-primary"
											href="tel:+4961929391752"
										>
											06192 9391 752
										</a>
									</CardDescription>
								</CardHeader>
							</Card>
						</FadeInUp>
						<FadeInUp delay={0.2}>
							<Card>
								<CardHeader className="text-center">
									<Clock className="mx-auto mb-2 size-10 text-primary" />
									<CardTitle>Bürozeiten</CardTitle>
									<CardDescription>Mo-Fr 09-16 Uhr</CardDescription>
								</CardHeader>
							</Card>
						</FadeInUp>
					</div>

					{/* Contact Form */}
					<FadeInUp delay={0.3}>
						<Card className="mx-auto max-w-3xl">
							<CardHeader>
								<CardTitle className="text-xl">Kontaktformular</CardTitle>
								<CardDescription>
									Füllen Sie das Formular aus und wir melden uns bei Ihnen.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form
									className="space-y-6"
									onSubmit={(e) => {
										e.preventDefault();
										e.stopPropagation();
										form.handleSubmit();
									}}
								>
									<div className="grid gap-4 md:grid-cols-2">
										<form.Field
											name="name"
											validators={{ onChange: contactFields.name }}
										>
											{(field) => (
												<div className="space-y-2">
													<Label htmlFor={field.name}>
														Name/Ansprechpartner{" "}
														<span className="text-destructive">*</span>
													</Label>
													<Input
														{...errorProps(field)}
														aria-required="true"
														autoComplete="name"
														id={field.name}
														name={field.name}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder="Name oder Ansprechpartner..."
														value={field.state.value}
													/>
													<FieldError field={field} />
												</div>
											)}
										</form.Field>

										<form.Field
											name="unternehmen"
											validators={{ onChange: contactFields.unternehmen }}
										>
											{(field) => (
												<div className="space-y-2">
													<Label htmlFor={field.name}>Unternehmen</Label>
													<Input
														{...errorProps(field)}
														autoComplete="organization"
														id={field.name}
														name={field.name}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder="Unternehmen..."
														value={field.state.value}
													/>
													<FieldError field={field} />
												</div>
											)}
										</form.Field>
									</div>

									<form.Field
										name="adresse"
										validators={{ onChange: contactFields.adresse }}
									>
										{(field) => (
											<div className="space-y-2">
												<Label htmlFor={field.name}>Adresse</Label>
												<Input
													{...errorProps(field)}
													autoComplete="street-address"
													id={field.name}
													name={field.name}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="Adresse..."
													value={field.state.value}
												/>
												<FieldError field={field} />
											</div>
										)}
									</form.Field>

									<div className="grid gap-4 md:grid-cols-2">
										<form.Field
											name="plz"
											validators={{ onChange: contactFields.plz }}
										>
											{(field) => (
												<div className="space-y-2">
													<Label htmlFor={field.name}>PLZ</Label>
													<Input
														{...errorProps(field)}
														autoComplete="postal-code"
														id={field.name}
														name={field.name}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder="PLZ..."
														value={field.state.value}
													/>
													<FieldError field={field} />
												</div>
											)}
										</form.Field>

										<form.Field
											name="ort"
											validators={{ onChange: contactFields.ort }}
										>
											{(field) => (
												<div className="space-y-2">
													<Label htmlFor={field.name}>Ort</Label>
													<Input
														{...errorProps(field)}
														autoComplete="address-level2"
														id={field.name}
														name={field.name}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder="Ort..."
														value={field.state.value}
													/>
													<FieldError field={field} />
												</div>
											)}
										</form.Field>
									</div>

									<div className="grid gap-4 md:grid-cols-2">
										<form.Field
											name="email"
											validators={{ onChange: contactFields.email }}
										>
											{(field) => (
												<div className="space-y-2">
													<Label htmlFor={field.name}>
														E-Mail-Adresse{" "}
														<span className="text-destructive">*</span>
													</Label>
													<Input
														{...errorProps(field)}
														aria-required="true"
														autoComplete="email"
														id={field.name}
														name={field.name}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder="E-Mail-Adresse..."
														type="email"
														value={field.state.value}
													/>
													<FieldError field={field} />
												</div>
											)}
										</form.Field>

										<form.Field
											name="telefon"
											validators={{ onChange: contactFields.telefon }}
										>
											{(field) => (
												<div className="space-y-2">
													<Label htmlFor={field.name}>Telefon</Label>
													<Input
														{...errorProps(field)}
														autoComplete="tel"
														id={field.name}
														name={field.name}
														onBlur={field.handleBlur}
														onChange={(e) => field.handleChange(e.target.value)}
														placeholder="Telefon..."
														type="tel"
														value={field.state.value}
													/>
													<FieldError field={field} />
												</div>
											)}
										</form.Field>
									</div>

									<div className="space-y-3">
										<Label>Anfrage/Interesse für:</Label>
										<div className="flex flex-wrap gap-6">
											<form.Field name="abrechnungInteresse">
												{(field) => (
													<div className="flex items-center gap-2">
														<Checkbox
															checked={field.state.value}
															id={field.name}
															onCheckedChange={(checked) =>
																field.handleChange(checked === true)
															}
														/>
														<Label
															className="cursor-pointer font-normal"
															htmlFor={field.name}
														>
															Abrechnung
														</Label>
													</div>
												)}
											</form.Field>
											<form.Field name="vorfinanzierungInteresse">
												{(field) => (
													<div className="flex items-center gap-2">
														<Checkbox
															checked={field.state.value}
															id={field.name}
															onCheckedChange={(checked) =>
																field.handleChange(checked === true)
															}
														/>
														<Label
															className="cursor-pointer font-normal"
															htmlFor={field.name}
														>
															Abrechnung mit Vorfinanzierung
														</Label>
													</div>
												)}
											</form.Field>
										</div>
									</div>

									<form.Field
										name="abrechnungsvolumen"
										validators={{ onChange: contactFields.abrechnungsvolumen }}
									>
										{(field) => (
											<div className="space-y-2">
												<Label htmlFor={field.name}>
													Abrechnungsvolumen pro Monat
												</Label>
												<Input
													{...errorProps(field)}
													id={field.name}
													name={field.name}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="z.B. 50.000 €"
													value={field.state.value}
												/>
												<FieldError field={field} />
											</div>
										)}
									</form.Field>

									<form.Field
										name="problem"
										validators={{ onChange: contactFields.problem }}
									>
										{(field) => (
											<div className="space-y-2">
												<Label htmlFor={field.name}>
													Was ist Ihr größtes Problem?
												</Label>
												<Textarea
													{...errorProps(field)}
													id={field.name}
													name={field.name}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="Beschreiben Sie Ihre größte Herausforderung..."
													rows={3}
													value={field.state.value}
												/>
												<FieldError field={field} />
											</div>
										)}
									</form.Field>

									<form.Field
										name="nachricht"
										validators={{ onChange: contactFields.nachricht }}
									>
										{(field) => (
											<div className="space-y-2">
												<Label htmlFor={field.name}>Nachricht</Label>
												<Textarea
													{...errorProps(field)}
													id={field.name}
													name={field.name}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													placeholder="Schreiben Sie uns eine Nachricht..."
													rows={5}
													value={field.state.value}
												/>
												<FieldError field={field} />
											</div>
										)}
									</form.Field>

									{/* Honeypot: hidden from visitors and screen readers, bots fill it in */}
									<div
										aria-hidden="true"
										className="absolute -left-[9999px] size-px overflow-hidden"
									>
										<form.Field name="website">
											{(field) => (
												<>
													<Label htmlFor={field.name}>Website</Label>
													<Input
														autoComplete="off"
														id={field.name}
														name={field.name}
														onChange={(e) => field.handleChange(e.target.value)}
														tabIndex={-1}
														value={field.state.value}
													/>
												</>
											)}
										</form.Field>
									</div>

									<div className="space-y-2 text-muted-foreground text-xs">
										<p>
											<span className="text-destructive">*</span> Erforderliche
											Angaben
										</p>
										<p>
											Wenn Sie diese Nachricht abschicken, speichern wir
											zusätzliche personenbezogene Daten von Ihnen. Lesen Sie
											dazu unsere{" "}
											<Link
												className="text-primary underline-offset-4 hover:underline"
												href="/datenschutz"
											>
												Datenschutzhinweise
											</Link>
											.
										</p>
									</div>

									<form.Subscribe
										selector={(state) => [state.canSubmit, state.isSubmitting]}
									>
										{([canSubmit, isSubmitting]) => (
											<Button
												className="w-full gap-2"
												disabled={!canSubmit || isSubmitting}
												size="lg"
												type="submit"
											>
												<Send className="size-4" />
												{isSubmitting ? "Senden..." : "Nachricht senden"}
											</Button>
										)}
									</form.Subscribe>
								</form>
							</CardContent>
						</Card>
					</FadeInUp>
				</div>
			</section>
		</div>
	);
}
