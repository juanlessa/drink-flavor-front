type IThemeColors = {
	primaryColor: string;
	primaryBackground: string;
	secondaryBackground: string;
	primaryText: string;
	secondaryText: string;
	darkText: string;
	lightText: string;
	error: string;
	deleteButton: string;
	cancelButton: string;
	boxShadowColor: string;
};
type IThemeOptions = "light" | "dark";

const themes = {
	light: {
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
	},
	dark: {
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
		document.documentElement.style.setProperty("--dark-text", colors.darkText);
		document.documentElement.style.setProperty("--light-text", colors.lightText);
		document.documentElement.style.setProperty("--error", colors.error);
		document.documentElement.style.setProperty("--delete-button", colors.deleteButton);
		document.documentElement.style.setProperty("--cancel-button", colors.cancelButton);
		document.documentElement.style.setProperty("--box-shadow-color", colors.boxShadowColor);
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
