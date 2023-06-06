<template>
    <div class="page-container">
        <NavBar />
        <main class="main-content">
            <DrinkDetailSection :drink="drink" />
        </main>
    </div>
</template>
<script setup lang="ts">
import { IDrinkResponse } from '~/utils/dtos/Drinks'

const axios = useNuxtApp().$axios
const route = useRoute()

const drink = ref<IDrinkResponse>()

definePageMeta({
    middleware: 'guest'
})

onMounted(async () => {
    const drinkId = route.params.id
    try {
        const response = await axios.get<IDrinkResponse>(
            `/drinks/${drinkId}`,
            { headers: { NoAuth: true } }
        )
        drink.value = response.data

    } catch (error) {
        console.error("error ", error)
    }
})
</script>
<style scoped></style>