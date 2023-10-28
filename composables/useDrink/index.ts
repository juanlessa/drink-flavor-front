import { DrinkState, ICreateDrink, IDrink, IUpdateDrink } from "@/types/drink";
import { API_ROUTES } from "@/constants/routes";

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

	const createDrink = async (requestBody: ICreateDrink) => {
		await axios.post(API_ROUTES.createDrink(), requestBody);
	};

	const updateDrink = async (requestBody: IUpdateDrink) => {
		await axios.patch(API_ROUTES.updateDrink(), requestBody);
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
		const response = await axios.get<IDrink>(API_ROUTES.getDrink(id));
		const drink = response.data;
		return drink;
	};

	return {
		getDrinkState,
		loadDrinks,
		getDrink,
		deleteDrink,
		createDrink,
		updateDrink,
	};
};
