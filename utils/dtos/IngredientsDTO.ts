

interface IIngredient {
    id?: string,
    name: string,
    unity: string,
    category: string,
    isAlcoholic: boolean,
    colorTheme: string,
    created_at?: Date
}

export {IIngredient }