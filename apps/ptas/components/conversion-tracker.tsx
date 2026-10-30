"use client";

import { useEffect } from "react";

const CONTACT_SENT_KEY = "ptas:contact-sent";

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

export function markContactSent() {
	try {
		sessionStorage.setItem(CONTACT_SENT_KEY, "1");
	} catch {}
}

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
