import { z } from "zod";
import { getZodTranslationsSchema } from "@/validations/getZodTranslationsSchema";
import { validateSchema } from "@/validations/validateSchema";
import { IIngredientForm } from "@/types/ingredient";

// fields validation
export const ingredientNameValidation = z.string().trim().min(1, { message: "INGREDIENT_ERRORS.invalid_name_format" });

export const ingredientUnitValidation = z.string().trim().min(1, { message: "INGREDIENT_ERRORS.invalid_unit_format" });

export const ingredientUnityPluralValidation = z
	.string()
	.trim()
	.min(1, { message: "INGREDIENT_ERRORS.invalid_unit_plural_format" });

export const ingredientCategoryIdValidation = z
	.string()
	.length(24, { message: "INGREDIENT_ERRORS.invalid_category_format" });

export const ingredientIsAlcoholicValidation = z.boolean();

// schemas
export const ingredientTranslationSchema = z.object({
	name: ingredientNameValidation,
	unit: ingredientUnitValidation,
	unit_plural: ingredientUnityPluralValidation,
});

export const ingredientFormSchema = z.object({
	translations: getZodTranslationsSchema(ingredientTranslationSchema),
	is_alcoholic: ingredientIsAlcoholicValidation,
	category_id: ingredientCategoryIdValidation,
});

//validators
export const IngredientFormValidator = validateSchema<IIngredientForm>(ingredientFormSchema);
