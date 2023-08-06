import { Category } from "./Categories";

type Ingredient = {
	id: string;
	name: string;
	unitySingular: string;
	unityPlural: string;
	categoryId: string;
	category: Category;
	isAlcoholic: boolean;
	created_at: Date;
};
type ICreateIngredient = {
	name: string;
	unitySingular: string;
	unityPlural: string;
	categoryId: string;
	isAlcoholic: boolean;
};

type IUpdateIngredient = {
	id: string;
	name: string;
	unitySingular: string;
	unityPlural: string;
	categoryId: string;
	isAlcoholic: boolean;
};

export { Ingredient, ICreateIngredient, IUpdateIngredient };
