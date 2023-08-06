<template>
	<PageTemplate>
		<div class="main-content-padding">
			<button @click="handleNewCategory" class="action-button primary-button-color button-create-new">
				new Category
			</button>
			<DisplayItems :items="categoryItems" @item-click="handleCategoryClick" @delete="handleDeleteClick" />
			<DeleteModal
				@delete-click="handleDeleteCategory"
				@cancel-click="handleCancelModalClick"
				:show-modal="showDeleteModal"
				:modal-text="deleteModalText"
			/>
		</div>
	</PageTemplate>
</template>
<script setup lang="ts">
import toastConfig from "@/utils/toastConfig";
import { Category } from "@/utils/dtos/Categories";
const { $axios: axios, $toast } = useNuxtApp();
type Item = { id: string; name: string };

const categoryItems = ref<Item[]>([]);
const showDeleteModal = ref<boolean>(false);
const deleteModalText = ref<string>("");
const categoryToDelete = ref<string>("");

definePageMeta({
	middleware: "auth",
});

onMounted(() => {
	handleLoadCategories();
});

const handleNewCategory = () => {
	useNuxtApp().$router.push(`/categories/new`);
};
const handleCategoryClick = (categoryId: string): void => {
	useNuxtApp().$router.push(`/categories/${categoryId}`);
};
const handleDeleteClick = (categoryId: string): void => {
	categoryToDelete.value = categoryId;
	const category = categoryItems.value.find((cat) => cat.id === categoryId);
	deleteModalText.value = `Are you sure you want to delete the category "${category?.name}"?`;
	showDeleteModal.value = true;
};

const handleLoadCategories = async () => {
	try {
		const { data } = await axios.get<Category[]>("/categories");
		categoryItems.value = data.map((cat) => ({ id: cat.id, name: cat.name }));
	} catch (error) {
		console.error(error);
	}
};
const handleCancelModalClick = (): void => {
	showDeleteModal.value = false;
};
const handleDeleteCategory = async (): Promise<void> => {
	let requestBody = {
		data: {
			id: categoryToDelete.value,
		},
	};

	try {
		await axios.delete("/categories", requestBody);
		$toast.success("SUCCESS", toastConfig);
		handleLoadCategories();
	} catch (error) {
		$toast.error("ERROR", toastConfig);
		console.error(error);
	}
	showDeleteModal.value = false;
};
</script>
