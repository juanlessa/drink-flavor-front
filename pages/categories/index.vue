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
				:show-modal="showDeleteModal"
				:delete-item="categoryToDelete"
				@delete-click="handleDeleteCategory"
				@cancel-click="handleCancelModalClick"
			/>
		</div>
	</NuxtLayout>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ICategory } from "@/types/category";
import { ROUTES } from "@/types/appRoutes";
import { IItem } from "@/types/item";
import { initEmptyCategory } from "@/constants/category";

const { $toast, $router } = useNuxtApp();
const { t } = useI18n();
const { loadCategories, getCategoryState, deleteCategory } = useCategory();

const categoryState = getCategoryState();

const showDeleteModal = ref<boolean>(false);
const categoryToDelete = ref<ICategory>(initEmptyCategory());

definePageMeta({
	middleware: "auth",
});

onMounted(async () => {
	try {
		await handleLoadCategories();
	} catch (error) {
		$toast.error(t("categoriesPage.loadCategories.errorMessage"));
		console.error(error);
		navigateTo("/");
	}
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
	const categoryId = categoryToDelete.value._id;
	try {
		await deleteCategory(categoryId);
		$toast.success("SUCCESS");
		handleLoadCategories();
	} catch (error) {
		$toast.error("ERROR");
		console.error(error);
	}
	showDeleteModal.value = false;
	categoryToDelete.value = initEmptyCategory();
};
</script>
