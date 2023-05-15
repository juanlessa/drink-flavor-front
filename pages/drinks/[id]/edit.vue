<template>
    <div class="page-container">
        <NavBar />
        <main class="main-content">
            <section class="section-container">
                <div class="section-content">
                    <DrinkForm :drink="drink" />
                </div>
            </section>
        </main>
    </div>
</template>
<script setup lang="ts">
import { IDrinkResponse } from '@/utils/dtos/DrinksDTO'
const axios = useNuxtApp().$axios
const route = useRoute()

const drink = ref<IDrinkResponse>()

onMounted(() => {
    const drinkId = route.params.id

    axios.get(`/drinks/${drinkId}`)
        .then((response) => {
            drink.value = response.data as IDrinkResponse
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