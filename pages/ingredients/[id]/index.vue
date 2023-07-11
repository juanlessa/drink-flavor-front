<template>
	<div class="page-container">
		<NavBar />
		<main class="main-content">
			<section class="section-container">
				<div class="section-content">
					<IngredientForm :ingredient="ingredient" />
				</div>
			</section>
		</main>
	</div>
</template>
<script setup lang="ts">
import { IIngredient } from "~/utils/dtos/Ingredients";
const axios = useNuxtApp().$axios;
const route = useRoute();

const ingredient = ref<IIngredient>();

definePageMeta({
	middleware: "auth",
});

onMounted(async () => {
	const ingredientId = route.params.id;

	try {
		const response = await axios.get(`/ingredients/${ingredientId}`);

		ingredient.value = response.data as IIngredient;
	} catch (error) {
		console.error(error);
	}
});
</script>
<style scoped>
.section-content {
	background-color: var(--primary-background);
	min-height: 92vh;
}
</style>
