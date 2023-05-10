<template>
    <section class="section-container">
        <div class="section-content">
            <div class="drink-image" style="background-image: url('/sob-bg.png')"></div>
            <h1 class="drink-name-title">{{ drink.name }}</h1>
            <div class="drink-info-container">
                <div class="ingredients-content">
                    <h2 class="drink-recipe-title">Ingredients</h2>
                    <ul class="ingredient-items-group">
                        <li class="ingredient-item" v-for="ing in drink.ingredients" :key="ing.ingredientId">
                            {{ `${ing.quantity} ${ing.unity} of ${ing.name}` }}
                        </li>
                    </ul>
                </div>
                <div class="method-content">
                    <h2 class="drink-recipe-title">Method</h2>
                    <p class="drink-method">{{ drink.method }}</p>
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
.section-container {
    width: 100vw;
}


.section-content {
    width: 100%;
    margin: 0 auto;
}

.drink-image {
    height: 30vh;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.drink-name-title {
    width: 95%;
    margin: 0 auto;
    font-style: normal;
    font-weight: 400;
    font-size: 72px;
    line-height: 87px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.drink-info-container {
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
}


.drink-recipe-title {
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 39px;
    display: flex;
    align-items: center;
    justify-content: center;

}

.ingredient-items-group {
    text-decoration: none;
    margin: unset;
    padding: unset;
}

.ingredient-item {

    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;
    display: flex;
    align-items: center;
}

.drink-method {
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;
    display: flex;
    align-items: center;
}

@media (min-width: 1190px) {
    .section-content {
        width: 1190px;

    }

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