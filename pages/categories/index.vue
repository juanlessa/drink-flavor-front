<template>
	<NuxtLayout>
		<div class="main-content-padding">
			<button @click="handleNewCategory" class="action-button primary-button-color button-create-new">
				{{ $t("categoriesPage.newCategoryButton.message") }}
			</button>
			<DisplayItems
				:items="categoryState.categories"
				@item-click="handleEditCategoryClick"
				@delete="handleDeleteClick"
			/>
			<DeleteModal
				@delete-click="handleDeleteCategory"
				@cancel-click="handleCancelModalClick"
				:show-modal="showDeleteModal"
				:delete-item="categoryToDelete"
			/>
		</div>
	</NuxtLayout>
</template>
<script setup lang="ts">
import { ICategory } from "@/types/category";
import { ROUTES } from "@/types/appRoutes";
import { IItem } from "@/types/deleteModal";
import toastConfig from "@/utils/toastConfig";

const { $toast, $router } = useNuxtApp();
const { loadCategories, getCategoryState, initEmptyCategory, deleteCategory } = useCategory();

const categoryState = getCategoryState();

const showDeleteModal = ref<boolean>(false);
const categoryToDelete = ref<ICategory>(initEmptyCategory());

definePageMeta({
	middleware: "auth",
});

onMounted(() => {
	handleLoadCategories();
});

const handleNewCategory = () => {
	$router.push(`${ROUTES.categories}/new`);
};
const handleEditCategoryClick = (item: IItem): void => {
	$router.push(`${ROUTES.categories}/${item._id}`);
};
const handleDeleteClick = (item: IItem): void => {
	const category = item as ICategory;
	categoryToDelete.value = category;
	showDeleteModal.value = true;
};

const handleLoadCategories = async () => {
	loadCategories();
};
const handleCancelModalClick = (): void => {
	showDeleteModal.value = false;
	categoryToDelete.value = initEmptyCategory();
};
const handleDeleteCategory = async (): Promise<void> => {
	try {
		await deleteCategory(categoryToDelete.value);
		$toast.success("SUCCESS", toastConfig);
		handleLoadCategories();
	} catch (error) {
		$toast.error("ERROR", toastConfig);
		console.error(error);
	}
	showDeleteModal.value = false;
	categoryToDelete.value = initEmptyCategory();
};
</script>
