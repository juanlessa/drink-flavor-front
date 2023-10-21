import { FieldError } from "@/types/forms";
import { useI18n } from "vue-i18n";
import { DrinkFormState } from "@/types/drink";
import { initEmptyDrinkForm } from "@/constants/drink";
import { drinkFormValidator } from "@/validations/drink";

const initState = (): DrinkFormState => ({
	form: initEmptyDrinkForm(),
	errors: [],
	displayErrors: false,
	defaultIngredients: [],
});

export const useDrinkForm = () => {
	const { t } = useI18n();

	const drinkFormState = useState<DrinkFormState>("drinkForm", initState);

	const getDrinkFormState = () => drinkFormState;

	const resetDrinkFormState = () => {
		drinkFormState.value = initState();
	};

	const checkFieldError = (errors: Array<FieldError>, field: string): string => {
		const error = errors.find((err) => err.field === field);
		return error === undefined ? "" : t(error.message);
	};

	const validateForm = () => {
		if (!drinkFormState.value.displayErrors) {
			return;
		}
		const data = drinkFormState.value.form;
		const errors = drinkFormValidator(data);

		drinkFormState.value.errors = errors;
	};

	return {
		getDrinkFormState,
		resetDrinkFormState,
		validateForm,
		checkFieldError,
	};
};
