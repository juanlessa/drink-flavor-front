<template>
	<PageTemplate>
		<div class="main-content-padding">
			<button @click="handleNewIngredient" class="action-button primary-button-color button-create-new">
				new Ingredient
			</button>
			<DisplayItems
				:items="ingredientItems"
				@item-click="handleEditIngredientClick"
				@delete="handleDeleteClick"
			/>
			<DeleteModal
				@delete-click="handleDeleteIngredient"
				@cancel-click="handleCancelModalClick"
				:show-modal="showDeleteModal"
				:modal-text="deleteModalText"
			/>
		</div>
	</PageTemplate>
</template>
<script setup lang="ts">
import { Ingredient } from "@/utils/dtos/Ingredients";
import toastConfig from "@/utils/toastConfig";
const { $axios: axios, $toast, $router } = useNuxtApp();
type Item = { id: string; name: string };

const ingredientItems = ref<Item[]>([]);
const showDeleteModal = ref<boolean>(false);
const deleteModalText = ref<string>("");
const ingredientToDelete = ref<string>("");

definePageMeta({
	middleware: "auth",
});
onMounted(() => {
	handleLoadIngredients();
});

const handleNewIngredient = () => {
	$router.push(`/ingredients/new`);
};
const handleEditIngredientClick = (ingredientId: string): void => {
	$router.push(`/ingredients/${ingredientId}`);
};
const handleDeleteClick = (ingredientId: string): void => {
	ingredientToDelete.value = ingredientId;
	const ingredient = ingredientItems.value.find((ing) => ing.id === ingredientId);
	deleteModalText.value = `Are you sure you want to delete the ingredient "${ingredient?.name}"?`;
	showDeleteModal.value = true;
};

const handleLoadIngredients = async () => {
	try {
		const { data } = await axios.get<Ingredient[]>("/ingredients");
		ingredientItems.value = data.map((ing) => ({ id: ing.id, name: ing.name }));
	} catch (error) {
		console.error(error);
	}
};
const handleCancelModalClick = (): void => {
	showDeleteModal.value = false;
};
const handleDeleteIngredient = async (): Promise<void> => {
	let requestBody = {
		data: {
			id: ingredientToDelete.value,
		},
	};

	try {
		await axios.delete("/ingredients", requestBody);
		$toast.success("SUCCESS", toastConfig);
		handleLoadIngredients();
	} catch (error) {
		$toast.error("ERROR", toastConfig);
		console.error(error);
	}
	showDeleteModal.value = false;
};
</script>
