<template>
	<PageTemplate>
		<DrinksCatalogSection :drinks="drinks" />
	</PageTemplate>
</template>

<script setup lang="ts">
import { Drink } from "~/utils/dtos/Drinks";

const axios = useNuxtApp().$axios;

const drinks = ref<Drink[]>([]);

definePageMeta({
	middleware: "guest",
});

onMounted(async () => {
	try {
		const response = await axios.get<Drink[]>("/drinks", { headers: { NoAuth: true } });
		drinks.value = response.data;
	} catch (error) {
		console.error("error ");
	}
});
</script>
~/utils/dtos/Drink
