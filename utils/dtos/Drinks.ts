import { Ingredient } from "./Ingredients";

type Drink = {
	id: string;
	name: string;
	method: string;
	cover: string;
	thumbnail: string;
	ingredients: DrinkIngredient[];
	created_at: Date;
};

type DrinkIngredient = {
	ingredient: Ingredient;
	ingredientId: string;
	quantity: number;
};
interface ICreateDrink {
	name: string;
	method: string;
	ingredients: {
		ingredientId: string;
		quantity: number;
	}[];
}
interface IUpdateDrink {
	id: string;
	name: string;
	method: string;
	cover?: string;
	thumbnail?: string;
	ingredients: {
		ingredientId: string;
		quantity: number;
	}[];
}
export { Drink, DrinkIngredient, ICreateDrink, IUpdateDrink };
