import { z } from "zod";
import { CATEGORY_ERRORS } from "@/errors/category.errors";

// fields validation
export const categoryNameValidation = z
	.string({ required_error: CATEGORY_ERRORS.required_name })
	.trim()
	.toLowerCase()
	.min(1, { message: CATEGORY_ERRORS.invalid_name_format });

// schemas
export const categoryTranslationSchema = z.object({
	name: categoryNameValidation,
});
