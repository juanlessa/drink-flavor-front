import { EMPTY_CATEGORY_FORM } from "@/constants/category";
import { CategoryFormState } from "@/types/category";

const initState = (): CategoryFormState => ({
	form: { ...EMPTY_CATEGORY_FORM },
});

export const useCategoryForm = () => {
	const categoryFormState = useState<CategoryFormState>("categoryForm", initState);

	const getCategoryFormState = () => categoryFormState;

	return {
		getCategoryFormState,
	};
};
