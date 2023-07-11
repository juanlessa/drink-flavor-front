<template>
	<div @click="goToDrinkDetailPage" class="card-container">
		<img class="card-image" :src="drinkThumbnail" />
		<div class="card-content">
			<h2 class="card-title">
				<div>{{ props.drinkName }}</div>
			</h2>
			<div class="card-ingredients">
				<div v-for="i in props.drinkIngredients" :key="i.name" class="ingredient">
					<div
						class="ingredient-circle"
						:style="{ 'background-color': i.colorTheme ? i.colorTheme : '#aabbcc' }"
					></div>
					<div class="ingredient-name">
						{{ i.category }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { IDrinkIngredient } from "~/utils/dtos/Drinks";

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
	drinkThumbnail: {
		type: String,
		default: "/default-drink-thumb.png",
	},
});

const goToDrinkDetailPage = () => {
	useNuxtApp().$router.push(`/drinks/${props.drinkId}`);
};
</script>
<style scoped>
.card-container {
	background-color: var(--primary-background);
	height: 8.5rem;
	width: 100%;
	box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
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
		width: 23.25rem;
	}
}
</style>
