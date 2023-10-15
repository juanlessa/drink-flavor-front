<template>
	<NuxtLayout :bg-color="IBgColor.primary">
		<DrinksDetailsSection :drink="drink" />
	</NuxtLayout>
</template>
<script setup lang="ts">
import { IDrink } from "@/types/drink";
import { IBgColor } from "@/types/layout";

const { getDrink, initEmptyDrink } = useDrink();
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
