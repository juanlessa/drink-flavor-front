/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./nuxt.config.{js,ts}",
		"./app.vue",
	],
	theme: {
		extend: {},
		colors: {
			transparent: "transparent",
			theme: "var(--primary-color)",
			primary: "var(--primary-background)",
			secondary: "var(--secondary-background)",
			white: "#FFFFFF",
			gray: {
				10: "#f0f0f0",
				40: "#f4f4f4",
				50: "#f9f9f9",
				100: "#f2f2f2",
				200: "#e5e6e8",
				300: "#c5ccc3",
				400: "#8b919a",
				450: "#6b7280",
				500: "#595959",
				600: "#16210c",
				light: "#e9e9e9",
			},
		},
	},
	plugins: [],
};
