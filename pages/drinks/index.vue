<template>
	<PageTemplate>
		<div class="main-content-padding">
			<button @click="handleNewDrink" class="action-button primary-button-color button-create-new">
				new Drink
			</button>
			<DisplayItems :items="drinkItems" @item-click="handleEditDrinkClick" @delete="handleDeleteClick" />
			<DeleteModal
				@delete-click="handleDeleteDrink"
				@cancel-click="handleCancelModalClick"
				:show-modal="showDeleteModal"
				:modal-text="deleteModalText"
			/>
		</div>
	</PageTemplate>
</template>
<script setup lang="ts">
import { Drink } from "@/utils/dtos/Drinks";
import toastConfig from "@/utils/toastConfig";
const { $axios: axios, $toast, $router } = useNuxtApp();
type Item = { id: string; name: string };

const drinkItems = ref<Item[]>([]);
const showDeleteModal = ref<boolean>(false);
const deleteModalText = ref<string>("");
const drinkToDelete = ref<string>("");

definePageMeta({
	middleware: "auth",
});
onMounted(() => {
	handleLoadDrinks();
});

const handleNewDrink = () => {
	$router.push(`/drinks/new`);
};
const handleEditDrinkClick = (drinkId: string): void => {
	$router.push(`/drinks/${drinkId}/edit`);
};
const handleDeleteClick = (drinkId: string): void => {
	drinkToDelete.value = drinkId;
	const drink = drinkItems.value.find((d) => d.id === drinkId);
	deleteModalText.value = `Are you sure you want to delete the drink "${drink?.name}"?`;
	showDeleteModal.value = true;
};

const handleLoadDrinks = async () => {
	try {
		const { data } = await axios.get<Drink[]>("/drinks");
		drinkItems.value = data.map((d) => ({ id: d.id, name: d.name }));
	} catch (error) {
		console.error(error);
	}
};
const handleCancelModalClick = (): void => {
	showDeleteModal.value = false;
};
const handleDeleteDrink = async (): Promise<void> => {
	let requestBody = {
		data: {
			id: drinkToDelete.value,
		},
	};

	try {
		await axios.delete("/drinks", requestBody);
		$toast.success("SUCCESS", toastConfig);
		handleLoadDrinks();
	} catch (error) {
		$toast.error("ERROR", toastConfig);
		console.error(error);
	}
	showDeleteModal.value = false;
};
</script>
