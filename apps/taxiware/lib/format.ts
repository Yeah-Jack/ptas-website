const euro = new Intl.NumberFormat("de-DE", {
	currency: "EUR",
	style: "currency",
});

const wholeEuro = new Intl.NumberFormat("de-DE", {
	currency: "EUR",
	maximumFractionDigits: 0,
	minimumFractionDigits: 0,
	style: "currency",
});

const percent = new Intl.NumberFormat("de-DE", {
	maximumFractionDigits: 2,
	style: "percent",
});

export function formatEuro(amount: number) {
	return euro.format(amount);
}

/** Without cents, for package prices and volumes: "2.500 €" */
export function formatWholeEuro(amount: number) {
	return wholeEuro.format(amount);
}

/** Takes a fraction: 0.015 becomes "1,5 %" */
export function formatPercent(fraction: number) {
	return percent.format(fraction);
}
