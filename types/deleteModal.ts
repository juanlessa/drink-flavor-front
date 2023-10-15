import { ITranslationAnyWithNameKey, ITranslations } from "@/types/translations";

export type IItem = {
	[key: string]: any;
	_id: string;
	translations: ITranslations<ITranslationAnyWithNameKey>;
};
