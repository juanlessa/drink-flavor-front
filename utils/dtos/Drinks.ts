
interface IDrinkResponse {
    id?: string,
    name: string,
    method: string,
    ingredients: IDrinkIngredient[],
    cover?: string,
    thumbnail?: string
}

interface ICreateDrink {
    id?: string,
    name: string,
    method: string,
    ingredients: {
        ingredientId: string,
        quantity: number
    }[]
}

interface IDrinkIngredient {
    ingredientId: string,
    quantity: number,
    name: string,
    unity: string,
    category: string,
    isAlcoholic: boolean,
    colorTheme: string,
    created_at: Date
}

export { IDrinkResponse, IDrinkIngredient, ICreateDrink }