import { z } from "zod";
import { getZodTranslationsSchema } from "@/validations/getZodTranslationsSchema";
import { validateSchema } from "@/validations/validateSchema";
import { IDrinkForm } from "@/types/drink";

// fields validation
export const drinkNameValidation = z.string().trim().min(1, { message: "drinkForm.nameInput.errorInvalidFormat" });

export const drinkMethodValidation = z.string().trim().min(1, { message: "drinkForm.methodInput.errorInvalidFormat" });

export const drinkIngredientsValidation = z
	.array(
		z.object({
			ingredient_id: z.string().min(1),
			quantity: z.number().gt(0),
		})
	)
	.min(1, { message: "drinkForm.ingredients.errorInvalidFormat" });

// schemas
export const drinkTranslationSchema = z.object({
	name: drinkNameValidation,
	method: drinkMethodValidation,
});

export const drinkFormSchema = z.object({
	translations: getZodTranslationsSchema(drinkTranslationSchema),
	ingredients: drinkIngredientsValidation,
});

//validators
export const drinkFormValidator = validateSchema<IDrinkForm>(drinkFormSchema);
