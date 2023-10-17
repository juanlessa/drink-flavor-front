import { EMPTY_CATEGORY } from "@/constants/category";
import { ICategory, CategoryState } from "@/types/category";
import { API_ROUTES } from "@/constants/routes";

const initState = (): CategoryState => ({
	categories: [],
});

export const useCategory = () => {
	const { $axios: axios } = useNuxtApp();

	const categoryState = useState<CategoryState>("category", initState);

	const getCategoryState = () => categoryState;

	const loadCategories = async () => {
		try {
			const response = await axios.get<ICategory[]>(API_ROUTES.listCategories());
			categoryState.value.categories = response.data;
		} catch (error) {
			console.error("error ");
		}
	};

	const deleteCategory = async (categoryToDelete: ICategory) => {
		let requestBody = {
			data: {
				id: categoryToDelete._id,
			},
		};

		await axios.delete(API_ROUTES.deleteCategory(), requestBody);
	};

	const getCategory = async (id: string): Promise<ICategory> => {
		let category = { ...EMPTY_CATEGORY };
		try {
			const response = await axios.get<ICategory>(API_ROUTES.getCategory(id));
			category = response.data;
		} catch (error) {
			console.error("error ", error);
		}
		return category;
	};

	const initEmptyCategory = (): ICategory => ({ ...EMPTY_CATEGORY });

	return {
		getCategoryState,
		loadCategories,
		getCategory,
		deleteCategory,
		initEmptyCategory,
	};
};
