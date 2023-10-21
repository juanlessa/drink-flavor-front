import { DatabaseCommonInfo } from "@/types/database";
import { IIngredient } from "@/types/ingredient";
import { ITranslations } from "@/types/translations";
import { FieldError } from "@/types/forms";

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

export type IDrinkIngredientRequest = {
	quantity: number;
	ingredient_id: string;
};

export type IDrinkForm = {
	translations: ITranslations<IDrinkTranslation>;
	ingredients: IDrinkIngredientRequest[];
};

export type DrinkFormState = {
	form: IDrinkForm;
	errors: FieldError[];
	displayErrors: boolean;
	defaultIngredients: IDrinkIngredientRequest[];
};
