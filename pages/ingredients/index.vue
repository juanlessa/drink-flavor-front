<template>
	<NuxtLayout>
		<div class="main-content-padding">
			<button @click="handleNewIngredient" class="action-button primary-button-color button-create-new">
				{{ $t("ingredientsPage.newIngredientButton.message") }}
			</button>
			<DisplayItems
				:items="ingredientState.ingredients"
				@item-click="handleEditIngredientClick"
				@delete="handleDeleteClick"
			/>
			<DeleteModal
				@delete-click="handleDeleteIngredient"
				@cancel-click="handleCancelModalClick"
				:show-modal="showDeleteModal"
				:delete-item="ingredientToDelete"
			/>
		</div>
	</NuxtLayout>
</template>
<script setup lang="ts">
import { IIngredient } from "@/types/ingredient";
import { ROUTES } from "@/types/appRoutes";
import { IItem } from "@/types/deleteModal";
import toastConfig from "@/utils/toastConfig";

const { $toast, $router } = useNuxtApp();
const { loadIngredients, getIngredientState, initEmptyIngredient, deleteIngredient } = useIngredient();

const ingredientState = getIngredientState();

const showDeleteModal = ref<boolean>(false);
const ingredientToDelete = ref<IIngredient>(initEmptyIngredient());

definePageMeta({
	middleware: "auth",
});
onMounted(() => {
	handleLoadIngredients();
});

const handleNewIngredient = () => {
	$router.push(`${ROUTES.ingredients}/new`);
};
const handleEditIngredientClick = (item: IItem): void => {
	$router.push(`${ROUTES.ingredients}/${item._id}`);
};
const handleDeleteClick = (item: IItem): void => {
	const ingredient = item as IIngredient;
	ingredientToDelete.value = ingredient;
	showDeleteModal.value = true;
};

const handleLoadIngredients = async () => {
	loadIngredients();
};
const handleCancelModalClick = (): void => {
	showDeleteModal.value = false;
	ingredientToDelete.value = initEmptyIngredient();
};
const handleDeleteIngredient = async (): Promise<void> => {
	try {
		await deleteIngredient(ingredientToDelete.value);
		$toast.success("SUCCESS", toastConfig);
		handleLoadIngredients();
	} catch (error) {
		$toast.error("ERROR", toastConfig);
		console.error(error);
	}
	showDeleteModal.value = false;
	ingredientToDelete.value = initEmptyIngredient();
};
</script>
