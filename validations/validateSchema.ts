import { z } from "zod";
import { FieldError } from "@/types/forms";

export const validateSchema =
	<T>(schema: z.ZodTypeAny) =>
	(data: T): FieldError[] => {
		let errors: Array<FieldError> = [];

		const result = schema.safeParse(data);

		if (!result.success) {
			const issues = result.error.issues;
			issues.forEach((issue) => {
				errors = [...errors, { field: issue.path.join("."), message: issue.message }];
			});
		}

		return errors;
	};
