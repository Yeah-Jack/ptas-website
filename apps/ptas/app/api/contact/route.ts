import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

const escapeHtml = (value: string) =>
	value.replace(/[&<>"']/g, (char) => {
		switch (char) {
			case "&":
				return "&amp;";
			case "<":
				return "&lt;";
			case ">":
				return "&gt;";
			case '"':
				return "&quot;";
			case "'":
				return "&#39;";
			default:
				return char;
		}
	});

const orDash = (value: string) => value || "-";
const yesNo = (value: boolean) => (value ? "Ja" : "Nein");

export async function POST(req: Request) {
	let body: unknown;
	try {
		body = await req.json();
	} catch {
		return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
	}

	const parsed = contactSchema.safeParse(body);
	if (!parsed.success) {
		return NextResponse.json(
			{ error: "Bitte überprüfen Sie Ihre Eingaben." },
			{ status: 400 },
		);
	}

	const { website, ...data } = parsed.data;

	// Honeypot filled: answer like a success so the bot moves on, but send nothing
	if (website) {
		return NextResponse.json({ success: true });
	}

	const publicKey = process.env.MAILJET_APIKEY_PUBLIC;
	const privateKey = process.env.MAILJET_APIKEY_PRIVATE;

	if (!publicKey || !privateKey) {
		console.error("Mailjet env vars missing.");
		return NextResponse.json(
			{ error: "Server-Konfigurationsfehler: E-Mail-Dienst nicht bereit." },
			{ status: 500 },
		);
	}

	const rows: [label: string, value: string][] = [
		["Name/Ansprechpartner", data.name],
		["Unternehmen", orDash(data.unternehmen)],
		[
			"Adresse",
			orDash(
				[data.adresse, `${data.plz} ${data.ort}`.trim()]
					.filter(Boolean)
					.join(", "),
			),
		],
		["E-Mail", data.email],
		["Telefon", orDash(data.telefon)],
		["Interesse an Abrechnung", yesNo(data.abrechnungInteresse)],
		["Interesse an Vorfinanzierung", yesNo(data.vorfinanzierungInteresse)],
		["Abrechnungsvolumen", orDash(data.abrechnungsvolumen)],
		["Aktuelles Problem", orDash(data.problem)],
		["Zusätzliche Nachricht", orDash(data.nachricht)],
	];

	const htmlContent = `
      <h3>Neue Kontaktanfrage über die Webseite</h3>
      ${rows
				.map(
					([label, value]) =>
						`<p><strong>${label}:</strong> ${escapeHtml(value).replace(/\n/g, "<br>")}</p>`,
				)
				.join("\n")}
    `;
	const textContent = `Neue Kontaktanfrage über die Webseite\n\n${rows
		.map(([label, value]) => `${label}: ${value}`)
		.join("\n")}`;

	try {
		const Mailjet = (await import("node-mailjet")).default;
		const mailjet = new Mailjet({ apiKey: publicKey, apiSecret: privateKey });

		await mailjet.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: { Email: "info@ptas.de", Name: "PTAS Website" },
					HTMLPart: htmlContent,
					ReplyTo: { Email: data.email, Name: data.name },
					Subject: `Neue Kontaktanfrage von ${data.name}`,
					TextPart: textContent,
					To: [
						{ Email: "info@ptas.de", Name: "PTAS Info" },
						{ Email: "andre.bartels@ptas.de", Name: "Andre Bartels" },
					],
				},
			],
		});

		// Mailjet's response lists the recipients, so it must not reach the browser
		return NextResponse.json({ success: true });
	} catch (error) {
		const err = error as { statusCode?: number; message?: string };
		console.error("Mailjet API Error:", err.statusCode, err.message);
		return NextResponse.json(
			{ error: "Beim Senden der E-Mail ist ein Fehler aufgetreten." },
			{ status: 500 },
		);
	}
}
