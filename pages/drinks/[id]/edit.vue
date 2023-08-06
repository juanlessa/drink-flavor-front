<template>
	<PageTemplate bg-color="primary-background">
		<DrinksForm :drink="drink" class="main-content-padding" />
	</PageTemplate>
</template>
<script setup lang="ts">
import { Drink } from "@/utils/dtos/Drinks";
const { $axios: axios } = useNuxtApp();
const route = useRoute();

const drink = ref<Drink>();

definePageMeta({
	middleware: "auth",
});

onMounted(async () => {
	const drinkId = route.params.id;

	try {
		const { data } = await axios.get<Drink>(`/drinks/${drinkId}`);
		drink.value = data;
	} catch (error) {
		console.error(error);
	}
});
</script>
<style scoped></style>
