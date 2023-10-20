import { EMPTY_INGREDIENT } from "@/constants/ingredient";
import { ICreateIngredient, IIngredient, IUpdateIngredient, IngredientState } from "@/types/ingredient";
import { API_ROUTES } from "@/constants/routes";

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

	const createIngredient = async (requestBody: ICreateIngredient) => {
		await axios.post(API_ROUTES.createIngredient(), requestBody);
	};

	const updateIngredient = async (requestBody: IUpdateIngredient) => {
		await axios.patch(API_ROUTES.updateIngredient(), requestBody);
	};

	const deleteIngredient = async (id: string) => {
		await axios.delete(API_ROUTES.deleteIngredient(), { data: { id } });
	};

	const getIngredient = async (id: string): Promise<IIngredient> => {
		const response = await axios.get<IIngredient>(API_ROUTES.getIngredient(id));
		const ingredient = response.data;
		return ingredient;
	};

	const initEmptyIngredient = (): IIngredient => ({ ...EMPTY_INGREDIENT });

	return {
		getIngredientState,
		loadIngredients,
		createIngredient,
		updateIngredient,
		getIngredient,
		deleteIngredient,
		initEmptyIngredient,
	};
};
