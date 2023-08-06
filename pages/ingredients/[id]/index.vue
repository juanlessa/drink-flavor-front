<template>
	<PageTemplate bg-color="primary-background">
		<IngredientsForm :ingredient="ingredient" class="main-content-padding" />
	</PageTemplate>
</template>
<script setup lang="ts">
import { Ingredient } from "@/utils/dtos/Ingredients";
const { $axios: axios } = useNuxtApp();
const route = useRoute();

const ingredient = ref<Ingredient>();

definePageMeta({
	middleware: "auth",
});

onMounted(async () => {
	const ingredientId = route.params.id;

	try {
		const { data } = await axios.get<Ingredient>(`/ingredients/${ingredientId}`);
		ingredient.value = data;
	} catch (error) {
		console.error(error);
	}
});
</script>
<style scoped></style>
