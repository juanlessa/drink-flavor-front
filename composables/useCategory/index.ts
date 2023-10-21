import { ICategory, CategoryState, ICreateCategory, IUpdateCategory } from "@/types/category";
import { API_ROUTES } from "@/constants/routes";

const initState = (): CategoryState => ({
	categories: [],
});

export const useCategory = () => {
	const { $axios: axios } = useNuxtApp();

	const categoryState = useState<CategoryState>("category", initState);

	const getCategoryState = () => categoryState;

	const loadCategories = async () => {
		const response = await axios.get<ICategory[]>(API_ROUTES.listCategories());
		categoryState.value.categories = response.data;
	};

	const createCategory = async (requestBody: ICreateCategory) => {
		await axios.post(API_ROUTES.createCategory(), requestBody);
	};

	const updateCategory = async (requestBody: IUpdateCategory) => {
		await axios.patch(API_ROUTES.updateCategory(), requestBody);
	};

	const deleteCategory = async (id: string) => {
		await axios.delete(API_ROUTES.deleteCategory(), { data: { id } });
	};

	const getCategory = async (id: string): Promise<ICategory> => {
		const response = await axios.get<ICategory>(API_ROUTES.getCategory(id));
		const category = response.data;
		return category;
	};

	return {
		getCategoryState,
		loadCategories,
		createCategory,
		updateCategory,
		getCategory,
		deleteCategory,
	};
};
