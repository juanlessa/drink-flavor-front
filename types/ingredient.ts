import { ICategory } from "@/types/category";
import { DatabaseCommonInfo } from "@/types/database";
import { ITranslations } from "@/types/translations";
import { FieldError } from "@/types/forms";

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

export type ICreateIngredient = {
	translations: ITranslations<IIngredientTranslation>;
	category_id: string;
	is_alcoholic: boolean;
};

export type IUpdateIngredient = {
	id: string;
	translations: ITranslations<IIngredientTranslation>;
	category_id: string;
	is_alcoholic: boolean;
};

export type IngredientState = {
	ingredients: IIngredient[];
};

export type IIngredientForm = {
	translations: ITranslations<IIngredientTranslation>;
	category_id: string;
	is_alcoholic: boolean;
};

export type IngredientFormState = {
	form: IIngredientForm;
	errors: FieldError[];
	displayErrors: boolean;
	defaultCategory: string;
};
