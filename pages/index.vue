<template>
    <NavBar />
    <main class="main-content">
        <DrinksSection :drinks="drinks" />
    </main>
    <Footer />
</template>

<script setup lang="ts">
import { IDrinkResponse } from '@/utils/dtos/DrinksDTO'

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