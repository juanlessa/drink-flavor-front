import { z } from "zod";
import { LANGUAGES } from "@/types/translations";

export const getZodTranslationsSchema = (schema: z.ZodTypeAny) => {
	return z.object({
		[LANGUAGES.english]: schema,
		[LANGUAGES.portuguese]: schema,
	});
};
