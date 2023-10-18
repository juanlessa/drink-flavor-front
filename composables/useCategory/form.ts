import { EMPTY_CATEGORY_FORM } from "@/constants/category";
import { CategoryFormState } from "@/types/category";
import { FieldError } from "@/types/forms";
import { categoryFormValidator } from "@/validations/category";
import { useI18n } from "vue-i18n";

const initState = (): CategoryFormState => ({
	form: { ...EMPTY_CATEGORY_FORM },
	errors: [],
	displayErrors: false,
});

export const useCategoryForm = () => {
	const { t } = useI18n();

	const categoryFormState = useState<CategoryFormState>("categoryForm", initState);

	const getCategoryFormState = () => categoryFormState;

	const resetCategoryFormState = () => {
		categoryFormState.value = initState();
	};

	const checkFieldError = (errors: Array<FieldError>, field: string): string => {
		const error = errors.find((err) => err.field === field);
		return error === undefined ? "" : t(error.message);
	};

	const validateForm = () => {
		if (!categoryFormState.value.displayErrors) {
			return;
		}
		const data = categoryFormState.value.form;
		const errors = categoryFormValidator(data);

		categoryFormState.value.errors = errors;
	};

	return {
		getCategoryFormState,
		resetCategoryFormState,
		validateForm,
		checkFieldError,
	};
};
