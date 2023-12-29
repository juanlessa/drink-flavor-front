<template>
	<div class="flex flex-wrap items-center justify-center gap-4 p-6 desktop:px-0">
		<DrinksCard v-for="d in props.drinks" :key="d._id" :drink="d" />
	</div>
</template>

<script setup lang="ts">
import { IDrink } from "@/types/drink";

const props = defineProps({
	drinks: {
		type: Array<IDrink>,
		default: [],
	},
});
</script>
