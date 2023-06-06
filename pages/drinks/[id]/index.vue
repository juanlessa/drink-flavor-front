<template>
    <div class="page-container">
        <NavBar />
        <main class="main-content">
            <DrinkDetailSection :drink="drink" />
        </main>
    </div>
</template>
<script setup lang="ts">
import { IDrinkResponse } from '@/utils/dtos/DrinksDTO'

const axios = useNuxtApp().$axios
const route = useRoute()

const drink = ref<IDrinkResponse>()

definePageMeta({
    middleware: 'guest'
})

onMounted(() => {
    const drinkId = route.params.id
    axios.get(`/drinks/${drinkId}`)
        .then((response) => {
            drink.value = response.data as IDrinkResponse

        }).catch((error) => {
            console.error("error ", error)
        })
})
</script>
<style scoped></style>