import { ITheme, ThemeState, THEME_MODES, IThemeColors } from "~/types/theme";

const themes: ITheme = {
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
		primaryBackground: "#000000",
		secondaryBackground: "#3E3636",
		primaryText: "#FFFFFF",
		secondaryText: "#14213D",
		darkText: "#14213D",
		lightText: "#FFFFFF",
		error: "#E60000",
		deleteButton: "#E60000",
		cancelButton: "#313737",
		boxShadowColor: "hsla(0, 0%, 0%, 0.09)",
		iconsColor: "#FFFFFF",
	},
};

export default defineNuxtPlugin(() => {
	const initThemeState = (): ThemeState => {
		return {
			themeMode: THEME_MODES.light,
			colors: themes[THEME_MODES.light],
		};
	};

	const themeState = useState<ThemeState>("theme", initThemeState);

	const getTheme = () => themeState;

	const setTheme = (desiredThemeMode = getTheme().value.themeMode) => {
		const colors: IThemeColors = themes[desiredThemeMode];
		themeState.value.colors = colors;
		themeState.value.themeMode = desiredThemeMode;

		document.documentElement.style.setProperty("--primary-color", colors.primaryColor);
		document.documentElement.style.setProperty("--primary-background", colors.primaryBackground);
		document.documentElement.style.setProperty("--secondary-background", colors.secondaryBackground);
		document.documentElement.style.setProperty("--primary-text", colors.primaryText);
		document.documentElement.style.setProperty("--secondary-text", colors.secondaryText);
		document.documentElement.style.setProperty("--dark-text", colors.darkText);
		document.documentElement.style.setProperty("--light-text", colors.lightText);
		document.documentElement.style.setProperty("--error", colors.error);
		document.documentElement.style.setProperty("--delete-button", colors.deleteButton);
		document.documentElement.style.setProperty("--cancel-button", colors.cancelButton);
		document.documentElement.style.setProperty("--box-shadow-color", colors.boxShadowColor);
		document.documentElement.style.setProperty("--icons-color", colors.iconsColor);
	};

	const toggleTheme = () => {
		themeState.value.themeMode =
			themeState.value.themeMode === THEME_MODES.light ? THEME_MODES.dark : THEME_MODES.light;

		setTheme(themeState.value.themeMode);
	};

	return {
		provide: {
			getTheme,
			toggleTheme,
			setTheme,
		},
	};
});
