<template>
    <NavBar />
    <main class="main-content">
        <DrinkDetailSection :drink="drink" />
    </main>
    <Footer />
</template>

<script setup lang="ts">
import { IDrinkResponse } from '@/utils/dtos/DrinksDTO'

const axios = useNuxtApp().$axios
const route = useRoute()

const drink = ref<IDrinkResponse>()

onMounted(() => {
    const drinkId = route.params.id
    console.log("drink_id", drinkId);
    axios.get(`/drinks/${drinkId}`)
        .then((response) => {
            drink.value = response.data as IDrinkResponse

        }).catch((error) => {
            console.log("error ", error)
        })
})


</script>