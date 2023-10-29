export enum THEME_MODES {
	"light" = "light",
	"dark" = "dark",
}

export type IThemeColors = {
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
	iconsColor: string;
	selectFileButton: string;
};

export type ITheme = {
	[value in THEME_MODES]: IThemeColors;
};

export type ThemeState = {
	themeMode: THEME_MODES;
	colors: IThemeColors;
};
