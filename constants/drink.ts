import { IDrink, IDrinkIngredient } from "@/types/drink";

export const initEmptyDrink = (): IDrink => ({
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
});
