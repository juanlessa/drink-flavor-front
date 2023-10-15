import { ICategory } from "@/types/category";
import { DatabaseCommonInfo } from "@/types/database";
import { ITranslations } from "@/types/translations";

export type IIngredientTranslation = {
	name: string;
	unit: string;
	unit_plural: string;
};

export type IIngredient = DatabaseCommonInfo & {
	translations: ITranslations<IIngredientTranslation>;
	category: ICategory;
	is_alcoholic: boolean;
};
