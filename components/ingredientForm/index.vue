<template>
    <div class="form-container">
        <h2 class="form-title">Ingredient</h2>
        <div class="input-container">
            <div class="input-column">
                <div>
                    <label class="input-label" for="name">name</label>
                    <input v-model="props.ingredient.name" class="text-input" type="text" id="name" />
                </div>
                <div>
                    <label class="input-label" for="category">category</label>
                    <input v-model="props.ingredient.category" class="text-input" type="text" id="category" />
                </div>

            </div>
            <div class="input-column">
                <div class="input-md-row">
                    <div class="input-unity-group">
                        <label for="unity">unity</label>
                        <input v-model="props.ingredient.unity" class="text-input input-unity" type="text" id="unity" />
                    </div>
                    <div class="input-alcoholic-group">
                        <label for="ingredientIsAlcoholic">is alcoholic?</label>

                        <label class="toggle-button">
                            <input v-model="props.ingredient.isAlcoholic" id="ingredientIsAlcoholic" type="checkbox">
                            <span class="toggle-slider round"></span>
                        </label>
                    </div>
                </div>
                <div class="input-color-group">
                    <label for="IngredientColor">color:</label>
                    <div class="input-color-picker-group">
                        <input v-model="props.ingredient.colorTheme" class="input-color-picker" type="color"
                            id="ingredientColor" />
                        <input v-model="props.ingredient.colorTheme" class="input-text-color-picker" type="text"
                            id="IngredientColor" />
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
import { IIngredient } from '@/utils/dtos/IngredientsDTO'
const axios = useNuxtApp().$axios

const props = defineProps({
    ingredient: {
        type: Object as PropType<IIngredient>,
        default: {} as IIngredient,
    }
});

onMounted(() => {
    props.ingredient.colorTheme = "aabbcc" //default color
})

const handleCancelButton = () => {
    useNuxtApp().$router.push("/ingredients")
}

const handleSubmitButton = () => {
    let requestBody: IIngredient = {
        "name": props.ingredient.name,
        "unity": props.ingredient.unity,
        "category": props.ingredient.category,
        "isAlcoholic": props.ingredient.isAlcoholic,
        "colorTheme": props.ingredient.colorTheme
    }

    const ingredientAlreadyExists = !!props.ingredient.id
    if (ingredientAlreadyExists) {
        requestBody = {
            id: props.ingredient.id,
            ...requestBody
        }
        axios.patch("/ingredients", requestBody)
            .then((response) => {
                useNuxtApp().$router.push("/ingredients")
            })
        return
    }
    axios.post("/ingredients", requestBody)
        .then((response) => {
            useNuxtApp().$router.push("/ingredients")
        })
    return
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

.input-md-row {
    display: flex;
    flex-direction: column;
}

.input-unity-group {
    margin-left: 0.5rem;
    margin-top: 1.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.input-unity {
    width: 7rem;
    text-align: center;
}

.input-alcoholic-group {
    margin-left: 0.5rem;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem
}

.input-color-group {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    margin-left: 0.5rem;
    margin-top: 0.75rem;
}

/* ----- toggle-button ------ */
.toggle-button {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}

.toggle-button input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.toggle-slider {
    background-color: #2196F3;
}

input:focus+.toggle-slider {
    box-shadow: 0 0 1px #2196F3;
}

input:checked+.toggle-slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

.toggle-slider.round {
    border-radius: 34px;
}

.toggle-slider.round:before {
    border-radius: 50%;
}

/* ----- end toggle-button ------ */

.input-color-picker-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.input-color-picker {
    border: none;
    height: 2rem;
}

.input-text-color-picker {
    font-size: 1rem;
    text-align: center;
    background-color: var(--light-50);
    border: 0.5px solid var(--light-50);
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 6rem;

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

    .input-md-row {
        flex-direction: row;
        gap: 1rem;
        align-items: center;
    }

    .input-color-group {

        margin-top: 1.5rem;
    }

}
</style>