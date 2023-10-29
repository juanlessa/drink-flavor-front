import { DrinkState, ICreateDrink, ICreateDrinkResponse, IDrink, IUpdateDrink } from "@/types/drink";
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
		const { data } = await axios.post<ICreateDrinkResponse>(API_ROUTES.createDrink(), requestBody);
		return data.id;
	};

	const updateDrink = async (requestBody: IUpdateDrink) => {
		await axios.patch(API_ROUTES.updateDrink(), requestBody);
	};

	const updateDrinkCover = async (id: string, file: File) => {
		const formData = new FormData();
		formData.append("cover", file, file.name);

		await axios.patch(API_ROUTES.updateDrinkCover(id), formData);
	};

	const updateDrinkThumbnail = async (id: string, file: File) => {
		const formData = new FormData();
		formData.append("thumbnail", file, file.name);

		await axios.patch(API_ROUTES.updateDrinkThumbnail(id), formData);
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
		updateDrinkCover,
		updateDrinkThumbnail,
	};
};
