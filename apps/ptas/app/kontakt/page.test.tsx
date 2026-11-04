// @vitest-environment jsdom
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "sonner";
import { beforeEach, describe, expect, it, vi } from "vitest";
import KontaktPage from "./page";

const { push } = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

// jsdom lacks these observers: motion needs IntersectionObserver for
// whileInView, Radix's Checkbox needs ResizeObserver
class MockObserver {
	disconnect() {}
	observe() {}
	takeRecords() {
		return [];
	}
	unobserve() {}
}

const jsonResponse = (body: unknown, status = 200) =>
	new Response(JSON.stringify(body), {
		headers: { "Content-Type": "application/json" },
		status,
	});

const fetchMock = vi.fn<typeof fetch>();

const renderPage = () => {
	const user = userEvent.setup();
	render(
		<>
			<KontaktPage />
			<Toaster />
		</>,
	);
	return user;
};

const nameInput = () => screen.getByLabelText(/^Name\/Ansprechpartner/);
const emailInput = () => screen.getByLabelText(/^E-Mail-Adresse/);
const submitButton = () => screen.getByRole("button", { name: /senden/i });

const fillRequiredFields = async (user: ReturnType<typeof userEvent.setup>) => {
	await user.type(nameInput(), "Max Mustermann");
	await user.type(emailInput(), "max@example.de");
};

describe("Kontakt page form", () => {
	beforeEach(() => {
		vi.stubGlobal("IntersectionObserver", MockObserver);
		vi.stubGlobal("ResizeObserver", MockObserver);
		vi.stubGlobal("fetch", fetchMock);
		fetchMock.mockReset();
		fetchMock.mockResolvedValue(jsonResponse({ success: true }));
		sessionStorage.clear();
	});

	it("marks name and email as required", () => {
		renderPage();

		expect(nameInput()).toHaveAttribute("aria-required", "true");
		expect(emailInput()).toHaveAttribute("aria-required", "true");
		expect(
			screen.getByRole("link", { name: "Datenschutzhinweise" }),
		).toHaveAttribute("href", "/datenschutz");
	});

	it("validates the email address while typing", async () => {
		const user = renderPage();

		await user.type(emailInput(), "max@");

		expect(screen.getByText("Ungültige E-Mail-Adresse")).toBeInTheDocument();
		expect(emailInput()).toHaveAttribute("aria-invalid", "true");
		expect(emailInput()).toHaveAttribute("aria-describedby", "email-error");

		await user.type(emailInput(), "example.de");

		expect(
			screen.queryByText("Ungültige E-Mail-Adresse"),
		).not.toBeInTheDocument();
		expect(emailInput()).not.toHaveAttribute("aria-invalid");
	});

	it("shows an error when the name is cleared", async () => {
		const user = renderPage();

		await user.type(nameInput(), "Max");
		await user.clear(nameInput());

		expect(screen.getByText("Name ist erforderlich")).toBeInTheDocument();
	});

	it("shows a length error for overly long fields", async () => {
		const user = renderPage();

		await user.type(screen.getByLabelText("PLZ"), "12345678901");

		expect(
			screen.getByText("Bitte maximal 10 Zeichen eingeben"),
		).toBeInTheDocument();
	});

	it("does not send an empty form", async () => {
		const user = renderPage();

		await user.click(submitButton());

		expect(
			await screen.findByText("Name ist erforderlich"),
		).toBeInTheDocument();
		expect(screen.getByText("E-Mail ist erforderlich")).toBeInTheDocument();
		expect(submitButton()).toBeDisabled();
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("sends the form and redirects to the thank-you page", async () => {
		const user = renderPage();

		await fillRequiredFields(user);
		await user.type(screen.getByLabelText("Unternehmen"), "Taxi GmbH");
		await user.click(
			screen.getByRole("checkbox", { name: "Abrechnung mit Vorfinanzierung" }),
		);
		await user.type(screen.getByLabelText("Nachricht"), "Bitte um Rückruf");
		await user.click(submitButton());

		await waitFor(() => expect(push).toHaveBeenCalledWith("/kontakt/danke"));
		expect(fetchMock).toHaveBeenCalledOnce();
		const [url, init] = fetchMock.mock.calls[0] ?? [];
		expect(url).toBe("/api/contact");
		expect(init).toMatchObject({
			headers: { "Content-Type": "application/json" },
			method: "POST",
		});
		expect(JSON.parse(init?.body as string)).toEqual({
			abrechnungInteresse: false,
			abrechnungsvolumen: "",
			adresse: "",
			email: "max@example.de",
			nachricht: "Bitte um Rückruf",
			name: "Max Mustermann",
			ort: "",
			plz: "",
			problem: "",
			telefon: "",
			unternehmen: "Taxi GmbH",
			vorfinanzierungInteresse: true,
			website: "",
		});
		expect(sessionStorage.getItem("ptas:contact-sent")).toBe("1");
		expect(
			await screen.findByText("Nachricht erfolgreich gesendet!"),
		).toBeInTheDocument();
	});

	it("disables the button while sending", async () => {
		let respond: (res: Response) => void = () => {};
		fetchMock.mockReturnValue(
			new Promise((resolve) => {
				respond = resolve;
			}),
		);
		const user = renderPage();

		await fillRequiredFields(user);
		await user.click(submitButton());

		expect(
			await screen.findByRole("button", { name: "Senden..." }),
		).toBeDisabled();
		expect(
			await screen.findByText("Nachricht wird gesendet..."),
		).toBeInTheDocument();

		respond(jsonResponse({ success: true }));

		await waitFor(() => expect(push).toHaveBeenCalledWith("/kontakt/danke"));
	});

	it("shows the server error and stays on the page", async () => {
		fetchMock.mockResolvedValue(
			jsonResponse(
				{ error: "Beim Senden der E-Mail ist ein Fehler aufgetreten." },
				500,
			),
		);
		const user = renderPage();

		await fillRequiredFields(user);
		await user.click(submitButton());

		expect(
			await screen.findByText(
				"Beim Senden der E-Mail ist ein Fehler aufgetreten.",
			),
		).toBeInTheDocument();
		expect(
			await screen.findByRole("button", { name: "Nachricht senden" }),
		).toBeEnabled();
		expect(push).not.toHaveBeenCalled();
		expect(sessionStorage.getItem("ptas:contact-sent")).toBeNull();
	});
});
