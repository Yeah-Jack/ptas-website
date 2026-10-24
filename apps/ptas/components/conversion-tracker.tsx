"use client";

import { useEffect } from "react";

const CONTACT_SENT_KEY = "ptas:contact-sent";

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

/** Remembers a successful contact form submission for the conversion on /kontakt/danke. */
export function markContactSent() {
	try {
		sessionStorage.setItem(CONTACT_SENT_KEY, "1");
	} catch {
		// Storage blocked: only the conversion is lost, the form still works
	}
}

/**
 * Reports the Google Ads conversion once per submitted form. gtag only exists
 * after the visitor consented in CCM19, so declined consent sends nothing.
 */
export default function ConversionTracker() {
	useEffect(() => {
		let submitted = false;
		try {
			submitted = sessionStorage.getItem(CONTACT_SENT_KEY) === "1";
			sessionStorage.removeItem(CONTACT_SENT_KEY);
		} catch {
			// Storage blocked: treat as a direct visit
		}

		if (submitted && typeof window.gtag === "function") {
			window.gtag("event", "conversion", {
				send_to: "AW-10795425279/YDWdCOaRpcgcEP-71Jso",
			});
		}
	}, []);

	return null;
}
