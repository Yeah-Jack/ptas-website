import { z } from "zod";

const optionalText = (max: number) =>
	z.string().trim().max(max, `Bitte maximal ${max} Zeichen eingeben`);

// Shared by the contact form (field validation) and /api/contact (server validation)
export const contactFields = {
	abrechnungInteresse: z.boolean(),
	abrechnungsvolumen: optionalText(100),
	adresse: optionalText(200),
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
		// Line breaks would end up in the e-mail subject
		.transform((value) => value.replace(/\s+/g, " ")),
	ort: optionalText(100),
	plz: optionalText(10),
	problem: optionalText(2000),
	telefon: optionalText(50),
	unternehmen: optionalText(200),
	vorfinanzierungInteresse: z.boolean(),
	// Honeypot: hidden from visitors, so only bots fill it in
	website: z.string().max(200),
};

export const contactSchema = z.object(contactFields);

export type ContactFormValues = z.input<typeof contactSchema>;
