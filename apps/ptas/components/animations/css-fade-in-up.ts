// CSS counterpart of <FadeInUp> for above-the-fold content. It starts with the
// first paint instead of after hydration, so the hero heading (usually the LCP
// element) shows up right away. Skipped when visitors prefer reduced motion.
export const cssFadeInUp =
	"motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-5 motion-safe:duration-500 motion-safe:ease-out";
