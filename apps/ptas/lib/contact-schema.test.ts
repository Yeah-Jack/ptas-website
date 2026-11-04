import { describe, expect, it } from "vitest";
import { type ContactFormValues, contactSchema } from "@/lib/contact-schema";

const validInput = (
	overrides: Partial<ContactFormValues> = {},
): ContactFormValues => ({
	abrechnungInteresse: false,
	abrechnungsvolumen: "",
	adresse: "",
	email: "max@example.de",
	nachricht: "",
	name: "Max Mustermann",
	ort: "",
	plz: "",
	problem: "",
	telefon: "",
	unternehmen: "",
	vorfinanzierungInteresse: false,
	website: "",
	...overrides,
});

const messagesFor = (input: unknown, field: keyof ContactFormValues) => {
	const result = contactSchema.safeParse(input);
	if (result.success) {
		return [];
	}
	return result.error.issues
		.filter((issue) => issue.path[0] === field)
		.map((issue) => issue.message);
};

describe("contactSchema", () => {
	it("accepts the minimal input with only name and email", () => {
		const result = contactSchema.safeParse(validInput());

		expect(result.success).toBe(true);
	});

	it("trims every text field", () => {
		const result = contactSchema.parse(
			validInput({
				adresse: "  Musterstraße 1 ",
				email: " max@example.de ",
				nachricht: "\n Hallo \n",
				ort: " Musterstadt ",
				plz: " 12345 ",
				telefon: " 0123 456 ",
				unternehmen: " Taxi GmbH ",
			}),
		);

		expect(result).toMatchObject({
			adresse: "Musterstraße 1",
			email: "max@example.de",
			nachricht: "Hallo",
			ort: "Musterstadt",
			plz: "12345",
			telefon: "0123 456",
			unternehmen: "Taxi GmbH",
		});
	});

	it("collapses whitespace inside the name", () => {
		const result = contactSchema.parse(
			validInput({ name: "  Max \t  Mustermann \n" }),
		);

		expect(result.name).toBe("Max Mustermann");
	});

	it.each(["", "   "])("requires a name (%j)", (name) => {
		expect(messagesFor(validInput({ name }), "name")).toEqual([
			"Name ist erforderlich",
		]);
	});

	it.each(["", "   "])("requires an email address (%j)", (email) => {
		expect(messagesFor(validInput({ email }), "email")).toEqual([
			"E-Mail ist erforderlich",
		]);
	});

	it.each([
		"max@",
		"max",
		"@example.de",
		"max@example",
		"max mustermann@example.de",
	])("rejects the invalid email address %j", (email) => {
		expect(messagesFor(validInput({ email }), "email")).toEqual([
			"Ungültige E-Mail-Adresse",
		]);
	});

	describe("maximum lengths", () => {
		const emailOfLength = (length: number) => {
			const domain = "@example.de";
			return `${"a".repeat(length - domain.length)}${domain}`;
		};

		it.each([
			["name", 200],
			["unternehmen", 200],
			["adresse", 200],
			["plz", 10],
			["ort", 100],
			["telefon", 50],
			["abrechnungsvolumen", 100],
			["problem", 2000],
			["nachricht", 5000],
		] as const)("limits %s to %i characters", (field, max) => {
			expect(
				contactSchema.safeParse(validInput({ [field]: "a".repeat(max) }))
					.success,
			).toBe(true);
			expect(
				messagesFor(validInput({ [field]: "a".repeat(max + 1) }), field),
			).toEqual([`Bitte maximal ${max} Zeichen eingeben`]);
		});

		it("does not count surrounding whitespace", () => {
			const result = contactSchema.safeParse(
				validInput({ plz: `   ${"1".repeat(10)}   ` }),
			);

			expect(result.success).toBe(true);
		});

		it("limits the email address to 254 characters", () => {
			expect(
				contactSchema.safeParse(validInput({ email: emailOfLength(254) }))
					.success,
			).toBe(true);
			expect(
				messagesFor(validInput({ email: emailOfLength(255) }), "email"),
			).toContain("Bitte maximal 254 Zeichen eingeben");
		});

		it("limits the honeypot to 200 characters", () => {
			expect(
				contactSchema.safeParse(validInput({ website: "a".repeat(200) }))
					.success,
			).toBe(true);
			expect(
				contactSchema.safeParse(validInput({ website: "a".repeat(201) }))
					.success,
			).toBe(false);
		});
	});

	it.each(["abrechnungInteresse", "vorfinanzierungInteresse"] as const)(
		"only accepts a boolean for %s",
		(field) => {
			const result = contactSchema.safeParse({
				...validInput(),
				[field]: "true",
			});

			expect(result.success).toBe(false);
		},
	);

	it("rejects a request without any fields", () => {
		const result = contactSchema.safeParse({});

		expect(result.success).toBe(false);
	});

	it("drops unknown fields", () => {
		const result = contactSchema.parse({ ...validInput(), admin: true });

		expect(result).not.toHaveProperty("admin");
	});
});
