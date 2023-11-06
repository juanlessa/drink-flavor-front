import type { Config } from "tailwindcss";

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",
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
			light: {
				theme: "#4E86E4",
				primary: "#FFFFFF",
				secondary: "#F0F5F5",
			},
			dark: {
				theme: "#FFD700",
				primary: "#262528",
				secondary: "#3F3F41",
			},

			transparent: "transparent",

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
} satisfies Config;
