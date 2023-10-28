<template>
	<NuxtLayout>
		<div class="main-content-padding">
			<button @click="handleNewDrink" class="action-button primary-button-color button-create-new">
				{{ $t("drinksPage.newDrinkButton.message") }}
			</button>
			<DisplayItems :items="drinkState.drinks" @item-click="handleEditDrinkClick" @delete="handleDeleteClick" />
			<DeleteModal
				@delete-click="handleDeleteDrink"
				@cancel-click="handleCancelModalClick"
				:show-modal="showDeleteModal"
				:delete-item="drinkToDelete"
			/>
		</div>
	</NuxtLayout>
</template>
<script setup lang="ts">
import { IDrink } from "@/types/drink";
import { ROUTES } from "@/types/appRoutes";
import { IItem } from "@/types/item";
import { initEmptyDrink } from "@/constants/drink";

const { $toast, $router } = useNuxtApp();
const { loadDrinks, getDrinkState, deleteDrink } = useDrink();

const drinkState = getDrinkState();

const showDeleteModal = ref<boolean>(false);
const drinkToDelete = ref<IDrink>(initEmptyDrink());

definePageMeta({
	middleware: "auth",
});
onMounted(() => {
	handleLoadDrinks();
});

const handleNewDrink = () => {
	$router.push(`${ROUTES.drinks}/new`);
};

const handleEditDrinkClick = (item: IItem): void => {
	const drink = item as IDrink;
	$router.push(`${ROUTES.drinks}/${drink._id}/edit`);
};
const handleDeleteClick = (item: IItem): void => {
	const drink = item as IDrink;
	drinkToDelete.value = drink;
	showDeleteModal.value = true;
};

const handleLoadDrinks = async () => {
	loadDrinks();
};
const handleCancelModalClick = (): void => {
	showDeleteModal.value = false;
	drinkToDelete.value = initEmptyDrink();
};
const handleDeleteDrink = async (): Promise<void> => {
	try {
		await deleteDrink(drinkToDelete.value);
		$toast.success("SUCCESS");
		handleLoadDrinks();
	} catch (error) {
		$toast.error("ERROR");
		console.error(error);
	}
	showDeleteModal.value = false;
	drinkToDelete.value = initEmptyDrink();
};
</script>
