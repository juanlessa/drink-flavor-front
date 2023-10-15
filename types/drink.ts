import { DatabaseCommonInfo } from "@/types/database";
import { IIngredient } from "@/types/ingredient";
import { ITranslations } from "@/types/translations";

export type IDrinkTranslation = {
	name: string;
	method: string;
};

export type IDrinkIngredient = {
	quantity: number;
	ingredient: IIngredient;
};

export type IDrink = DatabaseCommonInfo & {
	translations: ITranslations<IDrinkTranslation>;
	cover: string;
	thumbnail: string;
	ingredients: IDrinkIngredient[];
};

export type DrinkState = {
	drinks: IDrink[];
};
