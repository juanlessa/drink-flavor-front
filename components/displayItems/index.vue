<template>
	<div class="cards-group">
		<div v-for="i in props.items" :key="i.id" class="card-item">
			<div @click="handleItemClick(i)" class="item-name">
				{{ i.name }}
			</div>
			<div @click="handleDeleteButton(i)" class="delete-button">
				<img src="/delete-icon.svg" height="24" alt="delete" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
type Item = { id: string; name: string };

const props = defineProps({
	items: {
		type: Array<{ id: string; name: string }>,
		default: [],
	},
});

const emit = defineEmits<{
	(e: "itemClick", value: string): void;
	(e: "delete", value: string): void;
}>();

const handleItemClick = (item: Item): void => {
	emit("itemClick", item.id);
};
const handleDeleteButton = (item: Item): void => {
	emit("delete", item.id);
};
</script>
<style scoped>
.cards-group {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
	gap: 1rem;
}
.card-item {
	width: 100%;
	max-width: 40rem;
	height: 3rem;
	background-color: var(--primary-background);
	box-shadow: 0 0.25rem 0.25rem var(--box-shadow-color);
	border-radius: 1rem;
	display: flex;
	align-items: center;
}
.item-name {
	height: 100%;
	flex: 1;
	cursor: pointer;
	display: flex;
	align-items: center;
	padding-left: 1rem;
}
.delete-button {
	width: 3rem;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
</style>
