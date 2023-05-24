<template>
    <div class="form-container">
        <h2 class="form-title">Drink</h2>
        <div class="input-container">
            <div class="input-column">
                <div>
                    <label class="input-label" for="name">name</label>
                    <input v-model="drinkToCreateName" :class="{ 'text-input': true, 'has-error': isNameInvalid }"
                        @blur="handleNameValidation(($event.target as HTMLInputElement).value)" type="text" id="name" />
                </div>
                <div>
                    <label class="input-label" for="method">method</label>
                    <textarea v-model="drinkToCreateMethod"
                        :class="{ 'textarea-input': true, 'has-error': isMethodInvalid }" type="text" id="method" rows="6"
                        @blur="handleMethodValidation(($event.target as HTMLTextAreaElement).value)" />
                </div>
                <div class="drink-drop-zone-container">
                    <div class="drink-drop-zone-item">
                        <label class="input-label" for="cover">cover</label>
                        <DropZoneInput @file="handleCoverFileUpdate" id="cover" />
                    </div>
                    <div class="drink-drop-zone-item">
                        <label class="input-label" for="thumbnail">thumbnail</label>
                        <DropZoneInput @file="handleThumbnailFileUpdate" id="thumbnail" />
                    </div>
                </div>
            </div>
            <div class="input-column">
                <div class="input-ingredient-title-container">
                    <div class="input-ingredient-title-row">
                        <label class="search-ingredient-label" for="searchIngredient">ingredients</label>
                        <a href="/ingredients/new" class="new-ingredient-link">new ingredient</a>
                    </div>
                    <div class="input-ingredient-title-row">
                        <IngredientSearchInput :already-selected="drinkIngredientIdsList" :search-min-length="1"
                            :options="searchedIngredients" @should-search="handleIngredientSearch"
                            @select="handleIngredientSelected" @input="onIngredientSearch" />
                    </div>
                </div>
                <div class="ingredients-list-container">
                    <div class="ingredients-list-row">
                        <div class="ingredient-list-name-column text-center">name</div>
                        <div class="ingredient-list-quantity-column text-center">quantity</div>
                        <div class="ingredient-list-delete-column"></div>
                    </div>


                    <div v-for="ing, index in drinkToCreateIngredients" :key="ing.ingredientId"
                        class="ingredients-list-row">
                        <div class="ingredient-list-name-column">{{ ing.name }}</div>
                        <div class="ingredient-list-quantity-column">
                            <input v-model="ing.quantity"
                                :class="{ 'has-error': handleQuantityHasError(ing.ingredientId), 'ingredient-quantity-text-input': true }"
                                @blur="handleQuantityValidation(($event.target as HTMLInputElement).value, ing.ingredientId)"
                                type="number" />
                            <span class="ingredient-unity-text">{{ ing.unity }}</span>
                        </div>
                        <div @click="handleRemoveDrinkIngredient(ing)"
                            class="ingredient-list-delete-column drink-delete-box">
                            <img class="drink-delete" src="/delete-icon.svg" height="24" alt="delete drink" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="button-container">
            <button @click="handleCancelButton" class="button-cancel">cancel</button>
            <button @click="handleSubmitButton" class="button-submit">done</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { IDrinkResponse, IDrinkIngredient, ICreateDrink } from '@/utils/dtos/DrinksDTO'
import { IIngredient } from '@/utils/dtos/IngredientsDTO'
import toastConfig from '@/utils/toastConfig'
import { AxiosError } from 'axios';
const axios = useNuxtApp().$axios


interface IAutoCompleteOption {
    id: string, name: string
}

const drinkToCreateName = ref<string>("")
const drinkToCreateMethod = ref<string>("")
const drinkToCreateIngredients = ref<IDrinkIngredient[]>([])
const drinkToCreateCover = ref<File>()
const drinkToCreateThumbnail = ref<File>()

const ingredientsFullSearchResult = ref<IIngredient[]>([])
const searchedIngredients = ref<IAutoCompleteOption[]>([])
const drinkIngredientIdsList = ref<string[]>([])

// validation
const isNameInvalid = ref<boolean>(false)
const isMethodInvalid = ref<boolean>(false)
const isQuantityValid = ref<{ id: string, isInvalid: boolean }[]>([])

const props = defineProps({
    drink: {
        type: Object as PropType<IDrinkResponse>,
        default: { name: '', method: '', ingredients: [] } as IDrinkResponse,
    }
});
watch(() => props.drink, (newValue: IDrinkResponse) => {
    drinkToCreateName.value = newValue.name
    drinkToCreateMethod.value = newValue.method
    drinkToCreateIngredients.value = newValue.ingredients
    drinkIngredientIdsList.value = newValue.ingredients.map((ing) => ing.ingredientId)
    isQuantityValid.value = newValue.ingredients.map((ing) => ({ id: ing.ingredientId, isInvalid: false }))
})

onMounted(() => {
})


const handleCancelButton = () => {
    useNuxtApp().$router.back()
}

const handleSubmitButton = async () => {
    // validation
    const nameIsValid = !handleNameValidation(drinkToCreateName.value)
    if (!nameIsValid) {
        useNuxtApp().$toast.error("Name invalid.", toastConfig);
    }

    const methodIsValid = !handleMethodValidation(drinkToCreateMethod.value)
    if (!methodIsValid) {
        useNuxtApp().$toast.error("Method invalid.", toastConfig);
    }

    if (drinkToCreateIngredients.value.length === 0) {
        useNuxtApp().$toast.error("Add ingredients to your drink", toastConfig);
        return
    }
    const quantityIsValid = drinkToCreateIngredients.value.map((ing) => {
        return !handleQuantityValidation(ing.quantity.toString(), ing.ingredientId)
    })
    if (!quantityIsValid.every((isValid) => isValid)) {
        useNuxtApp().$toast.error("The ingredient quantities must be greater than 0", toastConfig);
        return
    }
    if (!nameIsValid || !methodIsValid) {
        return
    }


    // create request
    let requestBody: ICreateDrink = {
        "name": drinkToCreateName.value,
        "method": drinkToCreateMethod.value,
        "ingredients": drinkToCreateIngredients.value.map((ing) => ({ ingredientId: ing.ingredientId, quantity: ing.quantity }))
    }


    const ingredientAlreadyExists = !!props.drink.id
    if (ingredientAlreadyExists) {
        requestBody = {
            ...requestBody,
            id: props.drink.id as string

        }

        try {
            await axios.patch("/drinks", requestBody)
            if (drinkToCreateCover.value) {
                let coverData = new FormData();
                coverData.append('cover', drinkToCreateCover.value, drinkToCreateCover.value.name);
                await axios.patch(`drinks/${requestBody.id}/cover`, coverData)
            }
            if (drinkToCreateThumbnail.value) {
                let thumbnailData = new FormData();
                thumbnailData.append('thumbnail', drinkToCreateThumbnail.value, drinkToCreateThumbnail.value.name);
                await axios.patch(`drinks/${requestBody.id}/thumbnail`, thumbnailData)
            }
            useNuxtApp().$toast.success("SUCCESS", toastConfig);
            setTimeout(() => (useNuxtApp().$router.back()), 750);

        } catch (error) {
            const axiosError = error as AxiosError
            console.error(error)
            if (axiosError.response?.status === 400) {
                const errorMessage = (axiosError.response.data as { status: string, message: string }).message
                useNuxtApp().$toast.error(errorMessage, toastConfig);
            }
        }

        return
    }

    try {
        const response = await axios.post("/drinks", requestBody)
        const { id: drinkId } = response.data as { id: string }
        if (drinkToCreateCover.value) {
            let coverData = new FormData();
            coverData.append('cover', drinkToCreateCover.value, drinkToCreateCover.value.name);
            await axios.patch(`drinks/${drinkId}/cover`, coverData)
        }
        if (drinkToCreateThumbnail.value) {
            let thumbnailData = new FormData();
            thumbnailData.append('thumbnail', drinkToCreateThumbnail.value, drinkToCreateThumbnail.value.name);
            await axios.patch(`drinks/${drinkId}/thumbnail`, thumbnailData)
        }
        useNuxtApp().$toast.success("SUCCESS", toastConfig);
        setTimeout(() => (useNuxtApp().$router.back()), 750);

    } catch (error) {
        const axiosError = error as AxiosError
        console.error(error)
        if (axiosError.response?.status === 400) {
            const errorMessage = (axiosError.response.data as { status: string, message: string }).message
            useNuxtApp().$toast.error(errorMessage, toastConfig);
        }
    }
    return;

}
const onIngredientSearch = (value: string) => {

}
const handleIngredientSearch = (value: string) => {

    axios.get('/ingredients').then((response) => {
        const ingredients = response.data as IIngredient[]
        ingredientsFullSearchResult.value = ingredients
        searchedIngredients.value = ingredients.map((ing) => {
            return {
                id: ing.id as string,
                name: ing.name
            }
        })

    })

}
const handleIngredientSelected = (opt: IAutoCompleteOption) => {
    isQuantityValid.value = [...isQuantityValid.value, { id: opt.id, isInvalid: false }]

    drinkIngredientIdsList.value = [...drinkIngredientIdsList.value, opt.id]

    const ingredient = ingredientsFullSearchResult.value.find((ing) => ing.id === opt.id)

    if (!ingredient) {
        return;
    }
    const ingredientFormat = {
        ingredientId: ingredient.id as string,
        name: ingredient.name as string,
        quantity: 0,
        colorTheme: ingredient.colorTheme as string,
        category: ingredient.category as string,
        unity: ingredient.unity as string,
        isAlcoholic: ingredient?.isAlcoholic as boolean,
        created_at: ingredient?.created_at as Date
    }
    drinkToCreateIngredients.value = [...drinkToCreateIngredients.value, ingredientFormat]

}

const handleRemoveDrinkIngredient = (ingredient: IDrinkIngredient) => {

    drinkIngredientIdsList.value = drinkIngredientIdsList.value.filter((ingId) => {
        if (ingId !== ingredient.ingredientId) {
            return ingId
        }
    })

    isQuantityValid.value = isQuantityValid.value.filter((q) => {
        if (q.id !== ingredient.ingredientId) {
            return q
        }
    })

    const ingredientsWithoutRemoved = drinkToCreateIngredients.value.filter((ing) => ing.ingredientId !== ingredient.ingredientId)
    drinkToCreateIngredients.value = ingredientsWithoutRemoved
}

const handleQuantityValidation = (value: string, ingredientId: string) => {
    const isInvalid = (Number(value) <= 0) ? true : false

    isQuantityValid.value = isQuantityValid.value.map((q) => {
        if (q.id === ingredientId) {
            return { id: q.id, isInvalid: isInvalid }
        }
        return q
    })
    return isInvalid;
}

const handleQuantityHasError = (id: string): boolean => {
    const quantity = isQuantityValid.value.find((q) => q.id === id)
    if (quantity) {
        return quantity.isInvalid
    }
    return false;
}
const handleNameValidation = (value: string) => {
    const isInvalid = value.trim().length <= 1 ? true : false
    isNameInvalid.value = isInvalid

    return isInvalid
}
const handleMethodValidation = (value: string) => {
    const isInvalid = value.trim().length <= 1 ? true : false
    isMethodInvalid.value = isInvalid
    return isInvalid
}
const handleThumbnailFileUpdate = (file: File) => {
    drinkToCreateThumbnail.value = file;
}

const handleCoverFileUpdate = (file: File) => {
    drinkToCreateCover.value = file;
}
</script>
<style scoped>
.form-container {
    background-color: var(--white);
}

.form-title {
    padding-top: 1rem;
    display: block;
    font-size: 2rem;
    width: 100%;
    text-align: center;
    margin-bottom: 1rem;
}

.input-container {
    display: flex;
    flex-direction: column;
}

.input-column {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}


.input-label {
    display: block;
    margin-bottom: 0.5rem;
    margin-left: 0.5rem;
    font-size: 1rem;

}

.text-input {
    font-size: 1rem;
    background-color: var(--light-50);
    border: 0.5px solid var(--light-50);
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 100%;

}

.has-error {
    border: 0.1rem solid var(--error-color) !important;
}

.textarea-input {
    font-size: 1rem;
    background-color: var(--light-50);
    border: 0.5px solid var(--light-50);
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 100%;

}

.drink-drop-zone-container {
    display: flex;
    flex-direction: column;

    justify-content: center;
    gap: 1.5rem;
}

.ingredients-list-container {
    display: flex;
    gap: 0.75rem;
    flex-direction: column;
    min-height: 9rem;
}

.ingredients-list-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.ingredient-list-name-column {
    flex: 4;
}

.ingredient-list-quantity-column {
    flex: 3;
}

.ingredient-list-delete-column {
    flex: 1;
}

.text-center {
    text-align: center;
}

.ingredient-quantity-text-input {
    font-size: 1rem;
    background-color: var(--light-50);
    border: 0.5px solid var(--light-50);
    border-radius: 0.75rem;
    padding: 0.5rem;
    width: 60%;
}

.ingredient-unity-text {
    margin-left: 0.3rem;
}

.drink-delete-box {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.button-container {
    margin-top: 2.5rem;
    margin-left: auto;
    display: flex;
    flex-direction: column-reverse;
    gap: 0.5rem;
    align-items: center;

}

.button-cancel {
    width: 100%;
    padding: auto;
    height: 2.5rem;
    max-width: 25rem;
    background-color: var(--button-cancel);
    border: none;
    border-radius: 1rem;
}

.button-submit {
    width: 100%;
    padding: auto;
    height: 2.5rem;
    max-width: 25rem;
    background-color: var(--button-submit);
    border: none;
    border-radius: 1rem;
    color: var(--white);
}

.input-ingredient-title-container {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.input-ingredient-title-row {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.search-ingredient-label {
    font-size: 1.25rem;
}

.new-ingredient-link {
    position: absolute;
    bottom: 0.1rem;
    right: 2%;
    font-size: 0.8rem;
}

.search-input {
    font-size: 1rem;
    background-color: var(--light-50);
    border: 0.5px solid var(--light-50);
    border-radius: 1.5rem;
    padding: 0.5rem 1.25rem;
    width: 60%;

}


@media (min-width: 780px) {
    .input-container {
        flex-direction: row;
        gap: 1.5rem;
    }

    .input-column {
        flex: 1;
    }

    .button-container {
        flex-direction: row;
        gap: 1.5rem;
        justify-content: center;
    }

    .button-cancel {
        max-width: 15rem;
    }

    .button-submit {
        max-width: 15rem;
    }

    .input-ingredient-title-container {
        margin-top: 0;
    }



    .new-ingredient-link {
        right: 5%;
    }

    .drink-drop-zone-container {
        flex-direction: row;
        justify-content: unset;
        gap: 1.5rem;
    }

    .drink-drop-zone-item {
        flex: 1;
    }

    .ingredients-list-container {
        height: 20.75rem;
        overflow-y: scroll;
    }
}

@media (min-width: 1190px) {
    .new-ingredient-link {
        right: 20%;
    }
}
</style>