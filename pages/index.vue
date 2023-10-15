<template>
	<NuxtLayout>
		<DrinksCatalogSection :drinks="drinkState.drinks" />
	</NuxtLayout>
</template>

<script setup lang="ts">
const { loadDrinks, getDrinkState } = useDrink();

const drinkState = getDrinkState();

definePageMeta({
	middleware: "guest",
});

onMounted(async () => {
	loadDrinks();
});
</script>
~/utils/dtos/Drink
