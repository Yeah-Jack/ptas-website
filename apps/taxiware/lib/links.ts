export const sectionLinks = [
	{ href: "/#ablauf", label: "So geht’s" },
	{ href: "/#preise", label: "Preise" },
	{ href: "/#vergleich", label: "TaxiWare oder PTAS" },
	{ href: "/#faq", label: "FAQ" },
] as const;

/** "Jetzt ausprobieren" */
export const ctaHref = "/kontakt";

/** "Rückruf anfordern": the form opens with a callback preselected */
export const callbackHref = "/kontakt?anliegen=rueckruf";

/**
 * The privacy page ships once its text is generated in dsgvoschutzteam.
 * Until then this is a plain href, since typed routes only accept pages
 * that exist; switch its links to next/link when the page is added.
 */
export const datenschutzHref = "/datenschutz";

/** Login doesn't exist yet; its link stays hidden until there is an app URL */
export const loginHref = "/login";
