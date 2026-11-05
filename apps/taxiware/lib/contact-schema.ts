import { z } from "zod";

const optionalText = (max: number) =>
	z.string().trim().max(max, `Bitte maximal ${max} Zeichen eingeben`);

/** In display order; "test" is the default */
export const anliegenValues = ["test", "rueckruf"] as const;

export type Anliegen = (typeof anliegenValues)[number];

export const anliegenLabels: Record<Anliegen, string> = {
	rueckruf: "Bitte rufen Sie mich zurück",
	test: "Ich möchte TaxiWare testen",
};

export const isAnliegen = (value: unknown): value is Anliegen =>
	anliegenValues.includes(value as Anliegen);

export const telefonRequiredMessage =
	"Für einen Rückruf brauchen wir Ihre Telefonnummer";

export const needsTelefon = (anliegen: Anliegen, telefon: string) =>
	anliegen === "rueckruf" && telefon.trim() === "";

export const contactFields = {
	anliegen: z.enum(anliegenValues),
	email: z
		.string()
		.trim()
		.min(1, "E-Mail ist erforderlich")
		.max(254, "Bitte maximal 254 Zeichen eingeben")
		.pipe(z.email("Ungültige E-Mail-Adresse")),
	nachricht: optionalText(5000),
	name: z
		.string()
		.trim()
		.min(1, "Name ist erforderlich")
		.max(200, "Bitte maximal 200 Zeichen eingeben")
		.transform((value) => value.replace(/\s+/g, " ")),
	telefon: optionalText(50),
	unternehmen: optionalText(200),
	// Honeypot: hidden from visitors, so only bots fill it in
	website: z.string().max(200),
};

export const contactSchema = z
	.object(contactFields)
	.refine((data) => !needsTelefon(data.anliegen, data.telefon), {
		message: telefonRequiredMessage,
		path: ["telefon"],
	});

export type ContactFormValues = z.input<typeof contactSchema>;
