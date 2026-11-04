import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		// Resolves the `@/*` alias from tsconfig.json
		tsconfigPaths: true,
	},
	test: {
		clearMocks: true,
		// Route and schema tests run in Node like production. Component tests
		// opt into a DOM with a `// @vitest-environment jsdom` comment.
		environment: "node",
		restoreMocks: true,
		setupFiles: ["./vitest.setup.ts"],
		unstubEnvs: true,
		unstubGlobals: true,
	},
});
