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
import { IDrinkResponse } from '~/utils/dtos/Drinks'
const axios = useNuxtApp().$axios
const route = useRoute()

const drink = ref<IDrinkResponse>()

definePageMeta({
    middleware: 'auth'
})

onMounted(async () => {
    const drinkId = route.params.id

    try {
        const response = await axios.get(`/drinks/${drinkId}`)

        drink.value = response.data as IDrinkResponse

    } catch (error) {
        console.error(error)
    }
})

</script>
<style scoped>
.section-content {
    background-color: var(--white);
    min-height: 92vh;
}
</style>