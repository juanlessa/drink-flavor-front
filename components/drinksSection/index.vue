<template>
    <section class="section-container">
        <div class="section-content">
            <DrinkCard v-for="d in props.drinks" :key="d.id" :drink-name="d.name" :drink-id="d.id"
                :drink-ingredients="d.ingredients.slice(0, 4)" />

        </div>

    </section>
</template>

<script setup lang="ts">
import { IDrinkResponse } from '@/utils/dtos/DrinksDTO'

onMounted(() => {

})

const props = defineProps({
    drinks: {
        type: Array<IDrinkResponse>,
        default: [],
    },
})

</script>
<style scoped>
.section-container {
    width: 100vw;
}

.section-content {
    padding: 1.025rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

@media (min-width: 1190px) {
    .section-content {
        width: 1190px;
        margin: 0 auto;
        flex-direction: row;

    }

}
</style>