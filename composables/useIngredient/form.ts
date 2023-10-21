import { FieldError } from "@/types/forms";
import { useI18n } from "vue-i18n";
import { IngredientFormState } from "@/types/ingredient";
import { ingredientFormValidator } from "@/validations/ingredient";
import { initEmptyIngredientForm } from "@/constants/ingredient";

const initState = (): IngredientFormState => ({
	form: initEmptyIngredientForm(),
	errors: [],
	displayErrors: false,
	defaultCategory: "",
});

export const useIngredientForm = () => {
	const { t } = useI18n();

	const ingredientFormState = useState<IngredientFormState>("ingredientForm", initState);

	const getIngredientFormState = () => ingredientFormState;

	const resetIngredientFormState = () => {
		ingredientFormState.value = initState();
	};

	const checkFieldError = (errors: Array<FieldError>, field: string): string => {
		const error = errors.find((err) => err.field === field);
		return error === undefined ? "" : t(error.message);
	};

	const validateForm = () => {
		if (!ingredientFormState.value.displayErrors) {
			return;
		}
		const data = ingredientFormState.value.form;
		const errors = ingredientFormValidator(data);

		ingredientFormState.value.errors = errors;
	};

	return {
		getIngredientFormState,
		resetIngredientFormState,
		validateForm,
		checkFieldError,
	};
};
