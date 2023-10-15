import { THEMES_COLORS } from "@/constants/theme";
import { ThemeState, THEME_MODES, IThemeColors } from "@/types/theme";

export default defineNuxtPlugin(() => {
	const initThemeState = (): ThemeState => {
		return {
			themeMode: THEME_MODES.light,
			colors: THEMES_COLORS[THEME_MODES.light],
		};
	};

	const themeState = useState<ThemeState>("theme", initThemeState);

	const getTheme = () => themeState;

	const setTheme = (desiredThemeMode = getTheme().value.themeMode) => {
		const colors: IThemeColors = THEMES_COLORS[desiredThemeMode];
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
