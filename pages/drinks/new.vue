<template>
    <div class="page-container">
        <NavBar />
        <main class="main-content">
            <section class="section-container">
                <div class="section-content">
                    <DrinkForm />
                </div>
            </section>
        </main>
    </div>
</template>
<script setup lang="ts">
import { IDrinkResponse } from '@/utils/dtos/DrinksDTO'
const defaultDrink: IDrinkResponse = {
    id: "", name: "", method: "", ingredients: []
}

definePageMeta({
    middleware: 'auth'
})

</script>
<style scoped>
.section-content {
    background-color: var(--white);
    min-height: 92vh;
}
</style>