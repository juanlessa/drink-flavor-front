import { ICategory, ICategoryForm } from "@/types/category";

export const EMPTY_CATEGORY: ICategory = {
	_id: "",
	translations: {
		en: { name: "" },
		pt: { name: "" },
	},
	created_at: new Date(),
	updated_at: new Date(),
};

export const EMPTY_CATEGORY_FORM: ICategoryForm = {
	translations: {
		en: { name: "" },
		pt: { name: "" },
	},
};
