<template>
    <div @click="goToDrinkDetailPage" class="card-container">

        <img class="card-image" src="/sex-on-beach.png" />
        <div class="card-content">
            <h2 class="card-title">
                <div>{{ props.drinkName }}</div>
            </h2>
            <div class="card-ingredients">
                <div v-for="i in props.drinkIngredients" :key="i.name" class="ingredient">
                    <div class="ingredient-circle" :style="{ 'background-color': i.colorTheme ? i.colorTheme : '#aabbcc' }">
                    </div>
                    <div class="ingredient-name">
                        {{ i.category }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { IDrinkIngredient } from '@/utils/dtos/DrinksDTO'
const props = defineProps({
    drinkName: {
        type: String,
        default: "",
    },
    drinkId: {
        type: String,
        default: "",
    },
    drinkIngredients: {
        type: Array<IDrinkIngredient>,
        default: [],
    },
});



const goToDrinkDetailPage = () => {

    useNuxtApp().$router.push(`/drink/${props.drinkId}`)
}
</script>
<style scoped>
.card-container {
    background-color: var(--white);
    height: 136px;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

    padding: 0.5rem;

    display: flex;
    gap: 0.75rem;

    cursor: pointer;
}

.card-image {
    border-radius: 4px;
}

.card-content {
    width: 100%;
}

.card-title {
    width: 100%;
    text-align: center;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    font-style: normal;
    font-size: 1.6rem;


}

.card-ingredients {
    margin-top: 0.75rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem 0.5rem;
}

.ingredient {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.ingredient-circle {
    width: 1rem;
    height: 0.9rem;
    border-radius: 50%;
}

.ingredient-name {
    font-style: normal;
    font-size: 1rem;
}

@media (min-width: 768px) {
    .card-container {
        width: 44vw;
    }

}

@media (min-width: 1190px) {
    .card-container {
        width: 372px;
    }

}
</style>