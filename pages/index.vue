<template>
    <div class="page-container">
        <NavBar />
        <main class="main-content">
            <DrinksSection :drinks="drinks" />
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { IDrinkResponse } from '~/utils/dtos/Drinks'

const axios = useNuxtApp().$axios

const drinks = ref<IDrinkResponse[]>([])

definePageMeta({
    middleware: 'guest'
})

onMounted(async () => {
    try {
        const response = await axios.get<IDrinkResponse[]>("/drinks", { headers: { NoAuth: true } })
        drinks.value = response.data

    } catch (error) {
        console.error("error ",)
    }
})

</script>