<template>
    <div class="page-container">
        <NavBar />
        <main class="main-content">
            <section class="section-container">
                <div class="section-content">
                    <IngredientForm :ingredient="ingredient" />
                </div>
            </section>
        </main>
    </div>
</template>
<script setup lang="ts">
import { IIngredient } from '~/utils/dtos/Ingredients'
const axios = useNuxtApp().$axios
const route = useRoute()

const ingredient = ref<IIngredient>()

definePageMeta({
    middleware: 'auth'
})

onMounted(() => {
    const ingredientId = route.params.id

    axios.get(`/ingredients/${ingredientId}`)
        .then((response) => {
            ingredient.value = response.data as IIngredient
            console.log(response.data)

        }).catch((error) => {
            console.log("error ", error)
        })
})

</script>
<style scoped>
.section-content {
    background-color: var(--white);
    min-height: 92vh;
}
</style>