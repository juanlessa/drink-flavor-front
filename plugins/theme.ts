type IThemeColors = {
	primaryColor: string;
	primaryBackground: string;
	secondaryBackground: string;
	primaryText: string;
	secondaryText: string;
	error: string;
	deleteButton: string;
	cancelButton: string;
};
type IThemeOptions = "light" | "dark";

const themes = {
	light: {
		primaryColor: "#4E86E4",
		primaryBackground: "#FFFFFF",
		secondaryBackground: "#F0F5F5",
		primaryText: "#14213D",
		secondaryText: "#FFFFFF",
		error: "#E60000",
		deleteButton: "#E60000",
		cancelButton: "#E6E6FA",
	},
	dark: {
		primaryColor: "#FFD700",
		primaryBackground: "#000000",
		secondaryBackground: "#222222",
		primaryText: "#FFFFFF",
		secondaryText: "#000000",
		error: "#E60000",
		deleteButton: "#E60000",
		cancelButton: "#313737",
	},
};

export default defineNuxtPlugin(() => {
	const initTheme = (): string => {
		const theme = "light";
		return theme;
	};

	const themeState = useState<string>("theme", initTheme);

	const getTheme = () => themeState.value;

	const setTheme = (data = getTheme()) => {
		const selectedTheme = data as IThemeOptions;

		const colors: IThemeColors = themes[selectedTheme];

		document.documentElement.style.setProperty("--primary-color", colors.primaryColor);
		document.documentElement.style.setProperty("--primary-background", colors.primaryBackground);
		document.documentElement.style.setProperty("--secondary-background", colors.secondaryBackground);
		document.documentElement.style.setProperty("--primary-text", colors.primaryText);
		document.documentElement.style.setProperty("--secondary-text", colors.secondaryText);
		document.documentElement.style.setProperty("--error", colors.error);
		document.documentElement.style.setProperty("--delete-button", colors.deleteButton);
		document.documentElement.style.setProperty("--cancel-button", colors.cancelButton);
	};

	const toggleTheme = () => {
		themeState.value = themeState.value === "light" ? "dark" : "light";

		setTheme(themeState.value);
	};

	return {
		provide: {
			getTheme,
			toggleTheme,
			setTheme,
		},
	};
});
