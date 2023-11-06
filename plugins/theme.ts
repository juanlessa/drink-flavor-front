import { THEMES_COLORS } from "@/constants/theme";
import { ThemeState, THEME_MODES, IThemeColors } from "@/types/theme";
import { useDark, useToggle } from "@vueuse/core";

export default defineNuxtPlugin(() => {
	const isDark = useDark();
	const toggleTheme = useToggle(isDark);

	const getTheme = () => (isDark.value ? THEME_MODES.dark : THEME_MODES.light);
	const getThemeColors = () => THEMES_COLORS[getTheme()];
	return {
		provide: {
			getTheme,
			toggleTheme,
			getThemeColors,
		},
	};
});
