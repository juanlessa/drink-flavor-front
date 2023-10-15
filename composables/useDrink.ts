import { DrinkState, IDrink, IDrinkIngredient } from "@/types/drink";

const emptyDrink: IDrink = {
	_id: "",
	translations: {
		en: { name: "", method: "" },
		pt: { name: "", method: "" },
	},
	cover: "",
	thumbnail: "",
	ingredients: [] as IDrinkIngredient[],
	created_at: new Date(),
	updated_at: new Date(),
};

const initState = (): DrinkState => ({
	drinks: [],
});

export const useDrink = () => {
	const { $axios: axios } = useNuxtApp();

	const drinkState = useState<DrinkState>("drink", initState);

	const getDrinkState = () => drinkState;

	const loadDrinks = async () => {
		try {
			const response = await axios.get<IDrink[]>("/drinks", { headers: { NoAuth: true } });
			drinkState.value.drinks = response.data;
		} catch (error) {
			console.error("error ");
		}
	};

	const deleteDrink = async (drinkToDelete: IDrink) => {
		let requestBody = {
			data: {
				id: drinkToDelete._id,
			},
		};

		await axios.delete("/drinks", requestBody);
	};

	const getDrink = async (id: string): Promise<IDrink> => {
		let drink = { ...emptyDrink };
		try {
			const response = await axios.get<IDrink>(`/drinks/${id}`, { headers: { NoAuth: true } });
			drink = response.data;
		} catch (error) {
			console.error("error ", error);
		}
		return drink;
	};

	const initEmptyDrink = (): IDrink => ({ ...emptyDrink });

	return {
		getDrinkState,
		loadDrinks,
		getDrink,
		deleteDrink,
		initEmptyDrink,
	};
};
