"use client";

import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Textarea } from "@repo/ui/components/textarea";
import { cn } from "@repo/ui/lib/utils";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
	type Anliegen,
	anliegenLabels,
	anliegenValues,
	type ContactFormValues,
	contactFields,
	needsTelefon,
	telefonRequiredMessage,
} from "@/lib/contact-schema";
import { datenschutzHref } from "@/lib/links";
import { BrandButton } from "./brand-button";

const inputClass =
	"h-12 rounded-lg bg-white px-3.5 text-base shadow-none md:text-base";
const labelClass = "font-semibold text-base";

function FieldError({ field }: { field: AnyFieldApi }) {
	if (field.state.meta.isValid) {
		return null;
	}
	return (
		<p className="text-err text-sm" id={`${field.name}-error`}>
			{field.state.meta.errors
				.map((error) => (typeof error === "string" ? error : error?.message))
				.join(", ")}
		</p>
	);
}

const errorProps = (field: AnyFieldApi) =>
	field.state.meta.isValid
		? {}
		: { "aria-describedby": `${field.name}-error`, "aria-invalid": true };

const Required = () => (
	<span aria-hidden="true" className="text-err">
		*
	</span>
);

export function ContactForm({ anliegen }: { anliegen: Anliegen }) {
	const router = useRouter();
	const [submitError, setSubmitError] = useState<string | null>(null);

	const defaultValues: ContactFormValues = {
		anliegen,
		email: "",
		nachricht: "",
		name: "",
		telefon: "",
		unternehmen: "",
		website: "",
	};

	const form = useForm({
		defaultValues,
		onSubmit: async ({ value }) => {
			setSubmitError(null);
			try {
				const res = await fetch("/api/contact", {
					body: JSON.stringify(value),
					headers: { "Content-Type": "application/json" },
					method: "POST",
				});
				if (!res.ok) {
					const data = await res.json().catch(() => ({}));
					throw new Error(data.error || "Fehler beim Senden");
				}
				router.push("/kontakt/danke");
			} catch (error) {
				setSubmitError(
					error instanceof Error && error.message
						? error.message
						: "Es ist ein Fehler aufgetreten.",
				);
			}
		},
	});

	return (
		<form
			className="grid gap-6"
			noValidate
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.Field name="anliegen">
				{(field) => (
					<fieldset className="grid gap-2.5">
						<legend className={cn(labelClass, "mb-2.5")}>Ihr Anliegen</legend>
						<div className="grid gap-2.5 sm:grid-cols-2">
							{anliegenValues.map((value) => (
								<label
									className="flex cursor-pointer items-center gap-3 rounded-lg border-2 bg-white px-4 py-3.5 font-semibold text-base leading-[1.3] transition-colors has-checked:border-cobalt has-checked:bg-cobalt-50"
									key={value}
								>
									<input
										checked={field.state.value === value}
										className="size-4.5 shrink-0 accent-cobalt"
										name={field.name}
										onChange={() => {
											field.handleChange(value);
											// Drop a stale "phone required" error when switching away
											if (!form.getFieldMeta("telefon")?.isValid) {
												form.validateField("telefon", "change");
											}
										}}
										type="radio"
										value={value}
									/>
									{anliegenLabels[value]}
								</label>
							))}
						</div>
					</fieldset>
				)}
			</form.Field>

			<div className="grid gap-5 md:grid-cols-2">
				<form.Field name="name" validators={{ onChange: contactFields.name }}>
					{(field) => (
						<div className="grid gap-2">
							<Label className={labelClass} htmlFor={field.name}>
								Name <Required />
							</Label>
							<Input
								{...errorProps(field)}
								aria-required="true"
								autoComplete="name"
								className={inputClass}
								id={field.name}
								name={field.name}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
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
						<div className="grid gap-2">
							<Label className={labelClass} htmlFor={field.name}>
								Unternehmen
							</Label>
							<Input
								{...errorProps(field)}
								autoComplete="organization"
								className={inputClass}
								id={field.name}
								name={field.name}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								value={field.state.value}
							/>
							<FieldError field={field} />
						</div>
					)}
				</form.Field>

				<form.Field name="email" validators={{ onChange: contactFields.email }}>
					{(field) => (
						<div className="grid gap-2">
							<Label className={labelClass} htmlFor={field.name}>
								E-Mail <Required />
							</Label>
							<Input
								{...errorProps(field)}
								aria-required="true"
								autoComplete="email"
								className={inputClass}
								id={field.name}
								name={field.name}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								type="email"
								value={field.state.value}
							/>
							<FieldError field={field} />
						</div>
					)}
				</form.Field>

				<form.Field
					name="telefon"
					validators={{
						onChange: ({ fieldApi, value }) => {
							const result = contactFields.telefon.safeParse(value);
							if (!result.success) {
								return result.error.issues[0]?.message;
							}
							return needsTelefon(
								fieldApi.form.getFieldValue("anliegen"),
								value,
							)
								? telefonRequiredMessage
								: undefined;
						},
					}}
				>
					{(field) => (
						<form.Subscribe selector={(state) => state.values.anliegen}>
							{(selected) => (
								<div className="grid gap-2">
									<Label className={labelClass} htmlFor={field.name}>
										Telefon {selected === "rueckruf" ? <Required /> : null}
									</Label>
									<Input
										{...errorProps(field)}
										aria-required={selected === "rueckruf"}
										autoComplete="tel"
										className={inputClass}
										id={field.name}
										name={field.name}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										type="tel"
										value={field.state.value}
									/>
									<FieldError field={field} />
								</div>
							)}
						</form.Subscribe>
					)}
				</form.Field>
			</div>

			<form.Field
				name="nachricht"
				validators={{ onChange: contactFields.nachricht }}
			>
				{(field) => (
					<div className="grid gap-2">
						<Label className={labelClass} htmlFor={field.name}>
							Nachricht
						</Label>
						<Textarea
							{...errorProps(field)}
							className={cn(inputClass, "h-auto min-h-32 py-3")}
							id={field.name}
							name={field.name}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder="Zum Beispiel: wie viele Fahrten Sie im Monat abrechnen"
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

			<div className="grid gap-1.5 text-muted-foreground text-sm">
				<p>
					<span className="text-err">*</span> Pflichtangaben
				</p>
				<p>
					Wenn Sie diese Nachricht abschicken, speichern wir zusätzliche
					personenbezogene Daten von Ihnen. Lesen Sie dazu unsere{" "}
					<a
						className="font-semibold text-cobalt underline underline-offset-3 hover:text-cobalt-700"
						href={datenschutzHref}
					>
						Datenschutzhinweise
					</a>
					.
				</p>
			</div>

			{submitError ? (
				<p
					className="rounded-[10px] bg-err-50 px-4 py-3.5 text-err"
					role="alert"
				>
					{submitError} Sie erreichen uns auch telefonisch oder per E-Mail.
				</p>
			) : null}

			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
			>
				{([canSubmit, isSubmitting]) => (
					<div>
						<BrandButton
							className="w-full sm:w-auto"
							disabled={!canSubmit || isSubmitting}
							type="submit"
						>
							{isSubmitting ? "Wird gesendet …" : "Anfrage senden"}
						</BrandButton>
					</div>
				)}
			</form.Subscribe>
		</form>
	);
}
