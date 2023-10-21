<template>
	<div class="drinks-content">
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
<style scoped>
.drinks-content {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	padding: 1.5rem;
}
@media (min-width: 1190px) {
	.drinks-content {
		padding: 1.5rem 0;
	}
}
</style>
