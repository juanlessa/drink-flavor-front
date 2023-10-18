import { z } from "zod";
import { getZodTranslationsSchema } from "@/validations/getZodTranslationsSchema";
import { validateSchema } from "@/validations/validateSchema";
import { ICreateCategory } from "@/types/category";

// fields validation
export const categoryNameValidation = z
	.string()
	.trim()
	.min(1, { message: "categoryForm.nameInput.errorInvalidFormat" });

// schemas
export const categoryTranslationSchema = z.object({
	name: categoryNameValidation,
});

export const categoryFormSchema = z.object({
	translations: getZodTranslationsSchema(categoryTranslationSchema),
});

//validators
export const categoryFormValidator = validateSchema<ICreateCategory>(categoryFormSchema);
