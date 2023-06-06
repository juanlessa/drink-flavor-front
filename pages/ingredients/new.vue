<template>
    <div class="page-container">
        <NavBar />
        <main class="main-content">
            <section class="section-container">
                <div class="section-content">
                    <IngredientForm :ingredient="defaultIngredient" />
                </div>
            </section>
        </main>
    </div>
</template>
<script setup lang="ts">
import { IIngredient } from '~/utils/dtos/Ingredients'
const defaultIngredient: IIngredient = {
    id: "", name: "", category: "", unity: "", colorTheme: "#dc0cbb", isAlcoholic: false
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