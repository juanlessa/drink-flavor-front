<template>
	<div>
		<div
			v-show="drink.cover"
			class="drink-image"
			:style="{ 'background-image': 'url(' + (drink.cover ? drink.cover : '') + ')' }"
		></div>
		<div class="main-content-padding">
			<h1 class="drink-name-title">{{ drink.name }}</h1>
			<div class="drink-info-container">
				<div class="ingredients-content">
					<h2 class="drink-recipe-title">Ingredients</h2>
					<ul class="ingredient-items-group">
						<li class="ingredient-item" v-for="ing in drink.ingredients" :key="ing.ingredientId">
							{{
								`${ing.quantity} ${
									ing.quantity === 1 ? ing.ingredient.unitySingular : ing.ingredient.unityPlural
								} of ${ing.ingredient.name}`
							}}
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
</template>

<script setup lang="ts">
import { Drink } from "~/utils/dtos/Drinks";

const props = defineProps({
	drink: {
		type: Object as PropType<Drink>,
		default: {},
	},
});
</script>
<style scoped>
.drink-image {
	height: 30vh;
	width: 100%;
	background-position: center;
	background-repeat: no-repeat;
}

.drink-name-title {
	width: 100%;
	padding: 1.5rem 0;
	font-size: 2.75rem;
	text-align: center;
}

.drink-info-container {
	width: 100%;
	display: flex;
	flex-direction: column;
}

.drink-recipe-title {
	font-size: 2rem;
	text-align: center;
	margin: 1rem 0;
}

.ingredient-item {
	font-size: 1.25rem;
	line-height: 1.75rem;
}

.drink-method {
	font-size: 1.25rem;
	line-height: 1.75rem;
}

@media (min-width: 1190px) {
	.drink-info-container {
		flex-direction: row;
		gap: 1rem;
	}

	.method-content {
		flex: 2;
	}

	.ingredients-content {
		flex: 1;
	}
}
</style>
~/utils/dtos/Drink
