// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			apiBase: "",
		},
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	imports: {
		dirs: [
			"composables", // top-level modules
			"composables/**", // scan all modules within given directory
		],
	},
	css: ["@/styles/global.css"],
	modules: ["@vueuse/nuxt"],
});
