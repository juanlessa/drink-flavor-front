<template>
	<div @click="goToDrinkDetailPage" class="card-container">
		<img class="card-image" :src="drink.thumbnail || '/default-drink-thumb.png'" />
		<div class="card-content">
			<h2 class="card-title">
				<div>{{ props.drink.translations[$i18n.locale as LANGUAGES].name }}</div>
			</h2>
			<div class="card-ingredients">
				<div v-for="cat in categories" :key="cat._id" class="ingredient">
					{{ cat.translations[$i18n.locale as LANGUAGES].name }}
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { IDrink } from "@/types/drink";
import { ICategory } from "@/types/category";
import { LANGUAGES } from "@/types/translations";
import { ROUTES } from "@/types/appRoutes";

const { $router } = useNuxtApp();

const props = defineProps({
	drink: {
		type: Object as PropType<IDrink>,
		default: {},
	},
});

const categories = ref<ICategory[]>([...new Set(props.drink.ingredients.map((ing) => ing.ingredient.category))]);

const goToDrinkDetailPage = () => {
	$router.push(`${ROUTES.drinks}/${props.drink._id}`);
};
</script>
<style scoped>
.card-container {
	background-color: var(--primary-background);
	height: 8.5rem;
	width: 100%;
	box-shadow: 0 0.25rem 0.25rem var(--box-shadow-color);
	border-radius: 0.5rem;
	padding: 0.5rem;
	display: flex;
	gap: 0.75rem;
	cursor: pointer;
}

.card-image {
	border-radius: 0.25rem;
	height: 7.5rem;
	width: 7rem;
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
	gap: 0.3rem 0.75rem;
}

.ingredient {
	font-size: 1rem;
}

@media (min-width: 768px) {
	.card-container {
		max-width: 44vw;
	}
}

@media (min-width: 1190px) {
	.card-container {
		max-width: 23.25rem;
	}
}
</style>
