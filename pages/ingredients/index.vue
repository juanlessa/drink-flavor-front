<template>
    <div class="page-container">
        <NavBar />
        <main class="main-content">
            <section class="section-container">
                <div class="section-content">
                    <div class="new-ingredient-group">
                        <button @click="handleNewIngredient" class="button-new">new Ingredient</button>
                    </div>
                    <div class="ingredients-group">
                        <div v-for="ing in ingredients" :key="ing.id" class="ingredient-card">
                            <div @click="handleEditIngredient(ing)" class="ingredient-item">
                                <span class="ingredient-name">{{ ing.name }}</span>
                            </div>
                            <div @click="handleDeleteButton(ing)" class="ingredient-delete-box">
                                <img class="ingredient-delete" src="/delete-icon.svg" height="24" alt="delete ingredient" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div class="delete-modal-container">
                <div v-show="isDeleteModalOpen" class="delete-modal-background"></div>
                <div v-show="isDeleteModalOpen" ref="deleteNodal" class="delete-modal-box">
                    <span class="delete-modal-message">Are you sure you want to delete this ingredient?</span>
                    <div class="button-container">
                        <button @click="handleCancelButton" class="button-cancel">cancel</button>
                        <button @click="handleDeleteIngredient" class="button-delete">delete</button>
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { IIngredient } from '@/utils/dtos/IngredientsDTO'

const axios = useNuxtApp().$axios
const deleteNodal = ref<HTMLElement>();
const ingredients = ref<IIngredient[]>([])
const isDeleteModalOpen = ref<boolean>(false)
const ingredientToDelete = ref<string>("")

onMounted(() => {
    handleLoadIngredients()
})

const handleEditIngredient = (ing: IIngredient) => {
    useNuxtApp().$router.push(`/ingredients/${ing.id}`)
}
const handleNewIngredient = () => {
    useNuxtApp().$router.push(`/ingredients/new`)
}
const handleDeleteButton = (ing: IIngredient) => {
    isDeleteModalOpen.value = true
    ingredientToDelete.value = ing.id as string
}
const handleDeleteIngredient = () => {
    let requestBody = {
        data: {
            "id": ingredientToDelete.value
        }
    }
    axios.delete("/ingredients", requestBody).then(() => {
        isDeleteModalOpen.value = false
        handleLoadIngredients()

    })
}
const handleCancelButton = () => {
    isDeleteModalOpen.value = false
    ingredientToDelete.value = ""
}
onClickOutside(deleteNodal, handleCancelButton)

const handleLoadIngredients = () => {
    axios.get("/ingredients")
        .then((response) => {
            ingredients.value = response.data as IIngredient[]

        }).catch((error) => {
            console.log("error ")
        })
}
</script>
<style scoped>
.new-ingredient-group {
    width: 100%;
    margin-top: 1rem;
}

.button-new {
    margin: auto;
    display: block;
    width: 100%;
    padding: auto;
    height: 2.5rem;
    max-width: 20rem;
    background-color: var(--button-submit);
    border: none;
    border-radius: 1rem;
    color: var(--white);
}

.ingredients-group {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.ingredient-card {
    width: 100%;
    height: 3rem;
    background-color: var(--white);
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
    border-radius: 0.5rem;
    padding: auto 1rem;
    display: flex;
    align-items: center;
    padding: 0;
}

.ingredient-item {
    height: 100%;
    flex: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-left: 1rem;
}


.ingredient-delete-box {
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.delete-modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    z-index: 2;
    background-color: black;
    opacity: 0.3;
    padding: auto;
}

.delete-modal-box {
    position: absolute;
    top: 30%;
    left: 8%;
    width: 84%;
    height: 10rem;
    z-index: 2;
    background-color: var(--white);
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
}

.delete-modal-message {
    display: block;
    font-size: 1rem;
    text-align: center;
}

.button-container {

    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.button-cancel {
    width: 8rem;
    padding: auto;
    height: 2.5rem;
    background-color: var(--button-cancel);
    border: none;
    border-radius: 1rem;
}

.button-delete {
    width: 8rem;
    padding: auto;
    height: 2.5rem;

    background-color: var(--button-delete);
    border: none;
    border-radius: 1rem;
    color: var(--white);
}


@media (min-width: 780px) {
    .ingredient-card {
        max-width: 46vw;
    }

    .delete-modal-box {
        left: 23%;
        width: 54%;
    }

}

@media (min-width: 1190px) {
    .ingredient-card {
        max-width: 36.6rem;
    }

    .delete-modal-box {
        left: 35%;
        width: 30%;
        max-width: 35rrem;
    }

}
</style>