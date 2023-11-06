// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			apiBase: "",
		},
	},
	imports: {
		dirs: [
			"composables", // top-level modules
			"composables/**", // scan all modules within given directory
		],
	},
	css: ["@/styles/global.css"],
	modules: ["@vueuse/nuxt", "@nuxtjs/tailwindcss"],

	tailwindcss: {
		cssPath: "~/styles/tailwind.css",
		configPath: "tailwind.config.ts",
		exposeConfig: false,
		config: {},
		injectPosition: 0,
		viewer: true,
	},
});
