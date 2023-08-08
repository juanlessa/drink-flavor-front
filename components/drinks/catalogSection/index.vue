<template>
	<div class="drinks-content">
		<DrinksCard
			v-for="d in props.drinks"
			:key="d.id"
			:drink-name="d.name"
			:drink-id="d.id"
			:drink-ingredients="d.ingredients"
			:drink-thumbnail="d.thumbnail ? d.thumbnail : '/default-drink-thumb.png'"
		/>
	</div>
</template>

<script setup lang="ts">
import { Drink } from "~/utils/dtos/Drinks";

onMounted(() => {});

const props = defineProps({
	drinks: {
		type: Array<Drink>,
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
</style>
~/utils/dtos/Drink
