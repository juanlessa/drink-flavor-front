<template>
	<PageTemplate bg-color="primary-background">
		<DrinksDetailsSection :drink="drink" />
	</PageTemplate>
</template>
<script setup lang="ts">
import { Drink } from "@/utils/dtos/Drinks";

const { $axios: axios } = useNuxtApp();
const route = useRoute();

const drink = ref<Drink>();

definePageMeta({
	middleware: "guest",
});

onMounted(async () => {
	const drinkId = route.params.id;
	try {
		const response = await axios.get<Drink>(`/drinks/${drinkId}`, { headers: { NoAuth: true } });
		drink.value = response.data;
	} catch (error) {
		console.error("error ", error);
	}
});
</script>
<style scoped></style>
