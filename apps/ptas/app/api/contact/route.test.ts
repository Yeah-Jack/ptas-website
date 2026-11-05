import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ContactFormValues } from "@/lib/contact-schema";
import { POST } from "./route";

const { Mailjet, post, request } = vi.hoisted(() => {
	const request = vi.fn();
	const post = vi.fn(() => ({ request }));
	const Mailjet = vi.fn(function MockMailjet() {
		return { post };
	});
	return { Mailjet, post, request };
});

vi.mock("node-mailjet", () => ({ default: Mailjet }));

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

const postContact = (body: unknown) =>
	POST(
		new Request("http://localhost/api/contact", {
			body: typeof body === "string" ? body : JSON.stringify(body),
			headers: { "Content-Type": "application/json" },
			method: "POST",
		}),
	);

interface SentMessage {
	From: { Email: string; Name: string };
	HTMLPart: string;
	ReplyTo: { Email: string; Name: string };
	Subject: string;
	TextPart: string;
	To: { Email: string; Name?: string }[];
}

const sentMessage = (): SentMessage => {
	expect(request).toHaveBeenCalledOnce();
	const [payload] = request.mock.calls[0] as [{ Messages: SentMessage[] }];
	expect(payload.Messages).toHaveLength(1);
	return payload.Messages[0] as SentMessage;
};

describe("POST /api/contact", () => {
	beforeEach(() => {
		vi.stubEnv("MAILJET_APIKEY_PUBLIC", "public-key");
		vi.stubEnv("MAILJET_APIKEY_PRIVATE", "private-key");
		// Keep a developer's own setting out of the tests
		vi.stubEnv("CONTACT_EMAIL_TO", undefined);
		request.mockResolvedValue({
			body: {
				Messages: [
					{ Status: "success", To: [{ Email: "andre.bartels@ptas.de" }] },
				],
			},
		});
	});

	describe("rejected requests", () => {
		it("answers 400 for a body that is not JSON", async () => {
			const res = await postContact("{kein json");

			expect(res.status).toBe(400);
			expect(await res.json()).toEqual({ error: "Ungültige Anfrage." });
			expect(Mailjet).not.toHaveBeenCalled();
		});

		it.each([
			["without email", { ...validInput(), email: undefined }],
			["with an invalid email", validInput({ email: "max@" })],
			["without name", validInput({ name: "  " })],
			["with a text that is too long", validInput({ plz: "1".repeat(11) })],
			["that is empty", {}],
		])("answers 400 for a form %s", async (_, body) => {
			const res = await postContact(body);

			expect(res.status).toBe(400);
			expect(await res.json()).toEqual({
				error: "Bitte überprüfen Sie Ihre Eingaben.",
			});
			expect(Mailjet).not.toHaveBeenCalled();
		});
	});

	it("pretends success but sends nothing when the honeypot is filled", async () => {
		const res = await postContact(
			validInput({ website: "https://spam.example" }),
		);

		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ success: true });
		expect(Mailjet).not.toHaveBeenCalled();
		expect(request).not.toHaveBeenCalled();
	});

	it.each(["MAILJET_APIKEY_PUBLIC", "MAILJET_APIKEY_PRIVATE"])(
		"answers 500 when %s is missing",
		async (name) => {
			const consoleError = vi
				.spyOn(console, "error")
				.mockImplementation(() => {});
			vi.stubEnv(name, undefined);

			const res = await postContact(validInput());

			expect(res.status).toBe(500);
			expect(await res.json()).toEqual({
				error: "Server-Konfigurationsfehler: E-Mail-Dienst nicht bereit.",
			});
			expect(consoleError).toHaveBeenCalledWith("Mailjet env vars missing.");
			expect(Mailjet).not.toHaveBeenCalled();
		},
	);

	describe("successful request", () => {
		it("answers only with success, without Mailjet's response", async () => {
			const res = await postContact(validInput());

			expect(res.status).toBe(200);
			expect(await res.json()).toEqual({ success: true });
		});

		it("sends the email with the Mailjet credentials", async () => {
			await postContact(validInput());

			expect(Mailjet).toHaveBeenCalledWith({
				apiKey: "public-key",
				apiSecret: "private-key",
			});
			expect(post).toHaveBeenCalledWith("send", { version: "v3.1" });
		});

		it("addresses the email to PTAS with the visitor as reply-to", async () => {
			await postContact(
				validInput({ email: " max@example.de ", name: " Max   Mustermann " }),
			);

			const message = sentMessage();
			expect(message.From).toEqual({
				Email: "info@ptas.de",
				Name: "PTAS Website",
			});
			expect(message.To).toEqual([
				{ Email: "info@ptas.de", Name: "PTAS Info" },
				{ Email: "andre.bartels@ptas.de", Name: "Andre Bartels" },
			]);
			expect(message.ReplyTo).toEqual({
				Email: "max@example.de",
				Name: "Max Mustermann",
			});
			expect(message.Subject).toBe("Neue Kontaktanfrage von Max Mustermann");
		});

		it("lists every form field in the text part", async () => {
			await postContact(
				validInput({
					abrechnungInteresse: true,
					abrechnungsvolumen: "50.000 €",
					adresse: "Musterstraße 1",
					nachricht: "Bitte um Rückruf",
					ort: "Musterstadt",
					plz: "12345",
					problem: "Zu viel Papierkram",
					telefon: "0123 456789",
					unternehmen: "Taxi Mustermann GmbH",
				}),
			);

			expect(sentMessage().TextPart).toBe(
				[
					"Neue Kontaktanfrage über die Webseite",
					"",
					"Name/Ansprechpartner: Max Mustermann",
					"Unternehmen: Taxi Mustermann GmbH",
					"Adresse: Musterstraße 1, 12345 Musterstadt",
					"E-Mail: max@example.de",
					"Telefon: 0123 456789",
					"Interesse an Abrechnung: Ja",
					"Interesse an Vorfinanzierung: Nein",
					"Abrechnungsvolumen: 50.000 €",
					"Aktuelles Problem: Zu viel Papierkram",
					"Zusätzliche Nachricht: Bitte um Rückruf",
				].join("\n"),
			);
		});

		it("shows a dash for empty optional fields", async () => {
			await postContact(validInput({ vorfinanzierungInteresse: true }));

			const { TextPart } = sentMessage();
			expect(TextPart).toContain("Unternehmen: -");
			expect(TextPart).toContain("Adresse: -");
			expect(TextPart).toContain("Telefon: -");
			expect(TextPart).toContain("Interesse an Abrechnung: Nein");
			expect(TextPart).toContain("Interesse an Vorfinanzierung: Ja");
			expect(TextPart).toContain("Abrechnungsvolumen: -");
			expect(TextPart).toContain("Aktuelles Problem: -");
			expect(TextPart).toContain("Zusätzliche Nachricht: -");
		});

		it.each([
			[
				{ adresse: "Musterstraße 1", ort: "Musterstadt", plz: "12345" },
				"Musterstraße 1, 12345 Musterstadt",
			],
			[{ ort: "Musterstadt", plz: "12345" }, "12345 Musterstadt"],
			[{ ort: "Musterstadt" }, "Musterstadt"],
			[{ plz: "12345" }, "12345"],
			[{ adresse: "Musterstraße 1" }, "Musterstraße 1"],
			[{}, "-"],
		])("formats the address %j as %j", async (address, expected) => {
			await postContact(validInput(address));

			expect(sentMessage().TextPart).toContain(`Adresse: ${expected}\n`);
		});

		it("escapes HTML in the HTML part", async () => {
			const payload = `<script>alert("x")</script> & 'y'`;
			await postContact(
				validInput({ nachricht: payload, unternehmen: payload }),
			);

			const { HTMLPart, TextPart } = sentMessage();
			const escaped =
				"&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;y&#39;";
			expect(HTMLPart).toContain(`<strong>Unternehmen:</strong> ${escaped}`);
			expect(HTMLPart).toContain(
				`<strong>Zusätzliche Nachricht:</strong> ${escaped}`,
			);
			expect(HTMLPart).not.toContain("<script>");
			expect(TextPart).toContain(`Unternehmen: ${payload}`);
		});

		it("keeps line breaks of multi-line fields", async () => {
			await postContact(
				validInput({ nachricht: "Zeile 1\nZeile 2", problem: "A\nB" }),
			);

			const { HTMLPart, TextPart } = sentMessage();
			expect(HTMLPart).toContain(
				"<strong>Zusätzliche Nachricht:</strong> Zeile 1<br>Zeile 2",
			);
			expect(HTMLPart).toContain("<strong>Aktuelles Problem:</strong> A<br>B");
			expect(TextPart).toContain("Zusätzliche Nachricht: Zeile 1\nZeile 2");
		});
	});

	describe("CONTACT_EMAIL_TO", () => {
		it("replaces the PTAS inboxes as recipients", async () => {
			vi.stubEnv("CONTACT_EMAIL_TO", "dev@example.de, second@example.de ");

			const res = await postContact(validInput());

			expect(res.status).toBe(200);
			const message = sentMessage();
			expect(message.To).toEqual([
				{ Email: "dev@example.de" },
				{ Email: "second@example.de" },
			]);
			expect(message.From.Email).toBe("info@ptas.de");
			expect(message.ReplyTo.Email).toBe("max@example.de");
		});

		it("falls back to the PTAS inboxes when it is blank", async () => {
			vi.stubEnv("CONTACT_EMAIL_TO", " , ");

			await postContact(validInput());

			expect(sentMessage().To.map((to) => to.Email)).toEqual([
				"info@ptas.de",
				"andre.bartels@ptas.de",
			]);
		});

		it("is required in development so test requests never reach PTAS", async () => {
			const consoleError = vi
				.spyOn(console, "error")
				.mockImplementation(() => {});
			vi.stubEnv("NODE_ENV", "development");

			const res = await postContact(validInput());

			expect(res.status).toBe(500);
			expect(await res.json()).toEqual({
				error: "Server-Konfigurationsfehler: E-Mail-Dienst nicht bereit.",
			});
			expect(consoleError).toHaveBeenCalledWith(
				expect.stringContaining("CONTACT_EMAIL_TO missing"),
			);
			expect(Mailjet).not.toHaveBeenCalled();
		});

		it("sends to the override in development", async () => {
			vi.stubEnv("NODE_ENV", "development");
			vi.stubEnv("CONTACT_EMAIL_TO", "dev@example.de");

			const res = await postContact(validInput());

			expect(res.status).toBe(200);
			expect(sentMessage().To).toEqual([{ Email: "dev@example.de" }]);
		});
	});

	it("answers 500 and logs when Mailjet fails", async () => {
		const consoleError = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});
		request.mockRejectedValue({ message: "Unauthorized", statusCode: 401 });

		const res = await postContact(validInput());

		expect(res.status).toBe(500);
		expect(await res.json()).toEqual({
			error: "Beim Senden der E-Mail ist ein Fehler aufgetreten.",
		});
		expect(consoleError).toHaveBeenCalledWith(
			"Mailjet API Error:",
			401,
			"Unauthorized",
		);
	});
});
