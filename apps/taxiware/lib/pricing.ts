// From the flyer "TaxiWare Pakete und Preise" (A5). All prices plus VAT.

export const minimumTermMonths = 6;

export const noticePeriodMonths = 3;

export const contractTerms = `${minimumTermMonths} Monate Mindestlaufzeit, danach monatlich mit ${noticePeriodMonths} Monaten Frist kündbar.`;

export const includedScans = 50;

export const pricePerExtraScan = 0.1;

export const pricePerLetter = 1.3;

export type PackageId = "business" | "professional" | "starter";

export interface Package {
	audience: string;
	id: PackageId;
	/** Billing volume (gross invoice total per month) covered by the fee */
	includedVolume: number;
	monthlyFee: number;
	name: string;
	/** Share of the billing volume above includedVolume */
	overageRate: number;
	popular?: boolean;
	/** Lower rate for large volumes */
	volumeDiscount?: { from: number; rate: number };
}

export const packages: Package[] = [
	{
		audience: "Für den Einstieg",
		id: "starter",
		includedVolume: 2500,
		monthlyFee: 29,
		name: "Starter",
		overageRate: 0.015,
	},
	{
		audience: "Für wachsende Betriebe",
		id: "professional",
		includedVolume: 5500,
		monthlyFee: 44,
		name: "Professional",
		overageRate: 0.011,
		popular: true,
	},
	{
		audience: "Für große Flotten",
		id: "business",
		includedVolume: 8000,
		monthlyFee: 59,
		name: "Business",
		overageRate: 0.008,
		volumeDiscount: { from: 100_000, rate: 0.0045 },
	},
];

export const lowestMonthlyFee = Math.min(
	...packages.map(({ monthlyFee }) => monthlyFee),
);

/** true: included, false: not included, otherwise the given text, after a check mark if check is set */
export type FeatureValue = boolean | { check?: boolean; text: string };

export interface Feature {
	/** The two things the flyer leads with, plus the Kontroll-Bot */
	highlight?: boolean;
	name: string;
	values: Record<PackageId, FeatureValue>;
}

const everyPackage = { business: true, professional: true, starter: true };

export const features: Feature[] = [
	{
		highlight: true,
		name: `Scan-App mit KI-Erfassung (${includedScans} Scans inkl.)`,
		values: everyPackage,
	},
	{
		highlight: true,
		name: "Rückläufer-Bearbeitung im Portal",
		values: { business: true, professional: true, starter: { text: "Basis" } },
	},
	{
		highlight: true,
		name: "Kontroll-Bot: Prüfung vor dem Versand",
		values: {
			business: { check: true, text: "+ Auswertung" },
			professional: true,
			starter: false,
		},
	},
	{ name: "Abrechnung § 302 (DTA), BG und Privat", values: everyPackage },
	{ name: "Zahlungen, offene Posten, Mahnwesen", values: everyPackage },
	{ name: "ImageLink an die Kassen", values: everyPackage },
	{ name: "Postversand, Inkasso, Factoring", values: everyPackage },
	{
		name: "Auswertungen, Schnittstellen, Standorte",
		values: { business: true, professional: false, starter: false },
	},
	{
		name: "Support",
		values: {
			business: { text: "Persönlich" },
			professional: { text: "E-Mail + Telefon" },
			starter: { text: "E-Mail" },
		},
	},
];
