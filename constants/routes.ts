export const API_ROUTES = {
	createCategory: () => `/categories`,
	deleteCategory: () => `/categories`,
	getCategory: (id: string) => `/categories/${id}`,
	listCategories: () => `/categories`,
	updateCategory: () => `/categories`,

	createIngredient: () => `/ingredients`,
	deleteIngredient: () => `/ingredients`,
	getIngredient: (id: string) => `/ingredients/${id}`,
	listIngredients: () => `/ingredients`,
	updateIngredient: () => `/ingredients`,

	createDrink: () => `/drinks`,
	deleteDrink: () => `/drinks`,
	getDrink: (id: string) => `/drinks/${id}`,
	listDrinks: () => `/drinks`,
	updateDrink: () => `/drinks`,
	updateDrinkCover: (id: string) => `/drinks/${id}/cover`,
	updateDrinkThumbnail: (id: string) => `/drinks/${id}/thumbnail`,
};
