import { ITheme, THEME_MODES } from "@/types/theme";

export const THEMES_COLORS: ITheme = {
	[THEME_MODES.light]: {
		primaryColor: "#4E86E4",
		primaryBackground: "#FFFFFF",
		secondaryBackground: "#F0F5F5",
		primaryText: "#14213D",
		secondaryText: "#FFFFFF",
		darkText: "#14213D",
		lightText: "#FFFFFF",
		error: "#E60000",
		deleteButton: "#E60000",
		cancelButton: "#E6E6FA",
		boxShadowColor: "rgba(0, 0, 0, 0.25)",
		iconsColor: "#14213D",
	},
	[THEME_MODES.dark]: {
		primaryColor: "#FFD700",
		primaryBackground: "#262528",
		secondaryBackground: "#3F3F41",
		primaryText: "#FFFFFF",
		secondaryText: "#14213D",
		darkText: "#14213D",
		lightText: "#FFFFFF",
		error: "#FF3333",
		deleteButton: "#CC0000",
		cancelButton: "#525161",
		boxShadowColor: "rgba(0,0,0,0.85)",
		iconsColor: "#F4F5F0",
	},
};
