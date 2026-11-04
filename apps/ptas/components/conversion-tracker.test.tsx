// @vitest-environment jsdom
import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ConversionTracker, { markContactSent } from "./conversion-tracker";

const FLAG = "ptas:contact-sent";

describe("ConversionTracker", () => {
	beforeEach(() => {
		sessionStorage.clear();
	});

	it("marks a sent contact form in sessionStorage", () => {
		markContactSent();

		expect(sessionStorage.getItem(FLAG)).toBe("1");
	});

	it("reports a conversion once after the contact form was sent", () => {
		const gtag = vi.fn();
		vi.stubGlobal("gtag", gtag);
		markContactSent();

		render(<ConversionTracker />);

		expect(gtag).toHaveBeenCalledOnce();
		expect(gtag).toHaveBeenCalledWith("event", "conversion", {
			send_to: "AW-10795425279/YDWdCOaRpcgcEP-71Jso",
		});
		expect(sessionStorage.getItem(FLAG)).toBeNull();
	});

	it("does not report a conversion on a direct visit", () => {
		const gtag = vi.fn();
		vi.stubGlobal("gtag", gtag);

		render(<ConversionTracker />);

		expect(gtag).not.toHaveBeenCalled();
	});

	it("does not fail when Google Ads is not loaded (no consent)", () => {
		markContactSent();

		expect(() => render(<ConversionTracker />)).not.toThrow();
		expect(sessionStorage.getItem(FLAG)).toBeNull();
	});

	it("does not fail when sessionStorage is blocked", () => {
		const gtag = vi.fn();
		vi.stubGlobal("gtag", gtag);
		const blocked = () => {
			throw new DOMException("Blocked", "SecurityError");
		};
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(blocked);
		vi.spyOn(Storage.prototype, "getItem").mockImplementation(blocked);

		expect(() => markContactSent()).not.toThrow();
		expect(() => render(<ConversionTracker />)).not.toThrow();
		expect(gtag).not.toHaveBeenCalled();
	});
});
