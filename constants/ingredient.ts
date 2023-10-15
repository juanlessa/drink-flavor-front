import { IIngredient } from "@/types/ingredient";
import { EMPTY_CATEGORY } from "@/constants/category";

export const EMPTY_INGREDIENT: IIngredient = {
	_id: "",
	translations: {
		en: { name: "", unit: "", unit_plural: "" },
		pt: { name: "", unit: "", unit_plural: "" },
	},
	is_alcoholic: false,
	category: { ...EMPTY_CATEGORY },
	created_at: new Date(),
	updated_at: new Date(),
};
