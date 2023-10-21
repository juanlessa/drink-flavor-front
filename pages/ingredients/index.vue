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
import { useI18n } from "vue-i18n";
import { IIngredient } from "@/types/ingredient";
import { ROUTES } from "@/types/appRoutes";
import { IItem } from "@/types/item";

const { $toast, $router } = useNuxtApp();
const { t } = useI18n();
const { loadIngredients, getIngredientState, initEmptyIngredient, deleteIngredient } = useIngredient();

const ingredientState = getIngredientState();

const showDeleteModal = ref<boolean>(false);
const ingredientToDelete = ref<IIngredient>(initEmptyIngredient());

definePageMeta({
	middleware: "auth",
});
onMounted(async () => {
	try {
		await handleLoadIngredients();
	} catch (error) {
		$toast.error(t("ingredientsPage.loadIngredients.errorMessage"));
		console.error(error);
		navigateTo("/");
	}
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
	const ingredientId = ingredientToDelete.value._id;

	try {
		await deleteIngredient(ingredientId);
		$toast.success("SUCCESS");
		handleLoadIngredients();
	} catch (error) {
		$toast.error("ERROR");
		console.error(error);
	}
	showDeleteModal.value = false;
	ingredientToDelete.value = initEmptyIngredient();
};
</script>
