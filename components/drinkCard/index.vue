<template>
    <div class="card-container">

        <img class="card-image" src="sex-on-beach.png" />
        <div class="card-content">
            <div class="card-title">
                <div>{{ props.drinkName }}</div>
            </div>
            <div class="card-ingredients">
                <div v-for="i in props.drinkIngredients" :key="i.name" class="ingredient">
                    <div class="ingredient-circle" :style="{ 'background-color': i.colorTheme ? i.colorTheme : '#aabbcc' }">
                    </div>
                    <div class="ingredient-name">
                        {{ i.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

export interface Ingredient {
    name: string,
    quantity: Number,
    unity: string,
    category: string,
    isAlcoholic: boolean,
    colorTheme?: string
}
const props = defineProps({
    drinkName: {
        type: String,
        default: "",
    },
    drinkIngredients: {
        type: Array<Ingredient>,
        default: [],
    },
});
</script>
<style scoped>
.card-container {
    background-color: var(--white);
    height: 120px;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

    padding: 8px;

    display: flex;
    gap: 12px;

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
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;

}

.card-ingredients {
    margin-top: 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 3px 7px;
}

.ingredient {
    display: flex;
    align-items: center;
    gap: 4px;
}

.ingredient-circle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
}

.ingredient-name {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
}

@media (min-width: 768px) {
    .card-container {
        width: 44vw;
    }

}

@media (min-width: 1190px) {
    .card-container {
        width: 356px;
    }

}
</style>