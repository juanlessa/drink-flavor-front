<template>
    <section class="section-container">
        <div class="section-content">
            <div class="drink-image"
                :style="{ 'background-image': 'url(' + (drink.cover ? drink.cover : '/sob-bg.png') + ')' }"></div>
            <div class="drink-recept-content">
                <h1 class="drink-name-title">{{ drink.name }}</h1>
                <div class="drink-info-container">
                    <div class="ingredients-content">
                        <h2 class="drink-recipe-title">Ingredients</h2>
                        <ul class="ingredient-items-group">
                            <li class="ingredient-item" v-for="   ing    in    drink.ingredients   "
                                :key="ing.ingredientId">
                                {{ `${ing.quantity} ${ing.unity} of ${ing.name} ` }}
                            </li>
                        </ul>
                    </div>
                    <div class="method-content">
                        <h2 class="drink-recipe-title">Method</h2>
                        <p class="drink-method">{{ drink.method }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { IDrinkResponse } from '@/utils/dtos/DrinksDTO'

onMounted(() => {
})

const props = defineProps({
    drink: {
        type: Object as PropType<IDrinkResponse>,
        default: {}
    }
})

</script>
<style scoped>
.section-content {
    padding: 0;
}

.drink-image {
    height: 30vh;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.drink-recept-content {
    width: 100%;
    background-color: var(--white);
    min-height: 65vh;
}

.drink-name-title {
    width: 95%;
    padding: 1.5rem 0;
    font-style: normal;
    font-size: 3rem;
    text-align: center;
}

.drink-info-container {
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}


.drink-recipe-title {
    margin: 0.5rem auto;
    font-style: normal;
    font-size: 2rem;
    text-align: center;
}

.ingredient-item {
    font-style: normal;
    font-size: 1.25rem;
    line-height: 1.75rem;
}

.drink-method {
    font-style: normal;
    font-size: 1.25rem;
    line-height: 1.75rem;
}


@media (min-width: 1190px) {
    .drink-info-container {
        flex-direction: row;
    }

    .method-content {
        flex: 2;
    }

    .ingredients-content {
        flex: 1;
    }
}
</style>