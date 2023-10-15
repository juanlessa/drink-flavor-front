import { ICategory } from "~/types/category";

export const EMPTY_CATEGORY: ICategory = {
	_id: "",
	translations: {
		en: { name: "" },
		pt: { name: "" },
	},
	created_at: new Date(),
	updated_at: new Date(),
};
