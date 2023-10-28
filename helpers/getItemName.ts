import { IItem } from "@/types/item";
import { LANGUAGES } from "@/types/translations";

export const getItemName = (items: IItem[], itemId: string, locale: LANGUAGES) => {
	const item = items.find((i) => i._id === itemId);
	return item?.translations[locale].name ?? "";
};
