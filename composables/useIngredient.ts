import { EMPTY_INGREDIENT } from "@/constants/ingredient";
import { IIngredient, IngredientState } from "@/types/ingredient";

const initState = (): IngredientState => ({
	ingredients: [],
});

export const useIngredient = () => {
	const { $axios: axios } = useNuxtApp();

	const ingredientState = useState<IngredientState>("ingredient", initState);

	const getIngredientState = () => ingredientState;

	const loadIngredients = async () => {
		try {
			const response = await axios.get<IIngredient[]>("/ingredients");
			ingredientState.value.ingredients = response.data;
		} catch (error) {
			console.error("error ");
		}
	};

	const deleteIngredient = async (ingredientToDelete: IIngredient) => {
		let requestBody = {
			data: {
				id: ingredientToDelete._id,
			},
		};

		await axios.delete("/ingredients", requestBody);
	};

	const getIngredient = async (id: string): Promise<IIngredient> => {
		let ingredient = { ...EMPTY_INGREDIENT };
		try {
			const response = await axios.get<IIngredient>(`/ingredients/${id}`);
			ingredient = response.data;
		} catch (error) {
			console.error("error ", error);
		}
		return ingredient;
	};

	const initEmptyIngredient = (): IIngredient => ({ ...EMPTY_INGREDIENT });

	return {
		getIngredientState,
		loadIngredients,
		getIngredient,
		deleteIngredient,
		initEmptyIngredient,
	};
};
