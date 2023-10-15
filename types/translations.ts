export enum LANGUAGES {
	english = "en",
	portuguese = "pt",
}

export type ITranslations<T> = {
	[value in LANGUAGES]: T;
};

export type ITranslationAnyWithNameKey = {
	[key: string]: any;
	name: string;
};
