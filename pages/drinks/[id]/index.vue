<template>
	<NuxtLayout bg-primary>
		<DrinksDetailsSection :drink="drink" />
	</NuxtLayout>
</template>
<script setup lang="ts">
import { IDrink } from "@/types/drink";
import { initEmptyDrink } from "@/constants/drink";

const { getDrink } = useDrink();
const route = useRoute();

const drink = ref<IDrink>(initEmptyDrink());

definePageMeta({
	middleware: "guest",
});

onMounted(async () => {
	const drinkId = route.params.id as string;
	drink.value = await getDrink(drinkId);
});
</script>
