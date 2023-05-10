<template>
    <NavBar />
    <main class="main-content">
        <DrinksSection :drinks="drinks" />
    </main>
    <Footer />
</template>

<script setup lang="ts">

interface IDrinkResponse {
    id?: string,
    name: string,
    method: string,
    ingredients: {
        ingredientId: string,
        quantity: number,
        name: string,
        unity: string,
        category: string,
        isAlcoholic: boolean,
        colorTheme: string,
        created_at: Date

    }[]
}


const axios = useNuxtApp().$axios
const drinks = ref<IDrinkResponse[]>([])
onMounted(() => {
    axios.get("/drinks")
        .then((response) => {
            drinks.value = response.data as IDrinkResponse[]
            console.log("landing page");
            console.log(drinks);


        }).catch((error) => {
            console.log("error ",)
        })
})

</script>