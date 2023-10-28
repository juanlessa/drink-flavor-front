import { FieldError } from "@/types/forms";
import { useI18n } from "vue-i18n";
import { DrinkFormState, IDrinkIngredientRequest } from "@/types/drink";
import { initEmptyDrinkForm } from "@/constants/drink";
import { drinkFormValidator } from "@/validations/drink";
import { IIngredient } from "@/types/ingredient";
import { IItem } from "@/types/item";

const initState = (): DrinkFormState => ({
	form: initEmptyDrinkForm(),
	errors: [],
	cover: {} as File,
	thumbnail: {} as File,
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

	const availableIngredients = (ingredients: IIngredient[]): IItem[] => {
		const selectedIngredientsIds = drinkFormState.value.form.ingredients.map((i) => i.ingredient_id);
		return ingredients.filter((ing) => !selectedIngredientsIds.includes(ing._id));
	};

	const addIngredient = (id: string) => {
		const newIngredient: IDrinkIngredientRequest = { quantity: 0, ingredient_id: id };
		const selectedIngredients = drinkFormState.value.form.ingredients;
		drinkFormState.value.form.ingredients = [...selectedIngredients, newIngredient];
	};

	const removeIngredient = (id: string) => {
		const selectedIngredients = drinkFormState.value.form.ingredients;
		drinkFormState.value.form.ingredients = selectedIngredients.filter((i) => i.ingredient_id !== id);
	};

	return {
		getDrinkFormState,
		resetDrinkFormState,
		availableIngredients,
		removeIngredient,
		addIngredient,
		validateForm,
		checkFieldError,
	};
};
