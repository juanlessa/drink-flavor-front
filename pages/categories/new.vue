<template>
	<NuxtLayout :bg-color="IBgColor.primary">
		<CategoriesForm class="main-content-padding" @submit="handleCreateCategory" />
	</NuxtLayout>
</template>
<script setup lang="ts">
import { IBgColor } from "@/types/layout";
import { AxiosError } from "axios";

const { $toast, $router } = useNuxtApp();
const { createCategory } = useCategory();
const { getCategoryFormState, resetCategoryFormState } = useCategoryForm();

const categoryFormState = getCategoryFormState();

definePageMeta({
	middleware: "auth",
});

const handleCreateCategory = async () => {
	const categoryToCreate = categoryFormState.value.form;
	try {
		await createCategory(categoryToCreate);
	} catch (error) {
		const axiosError = error as AxiosError;
		console.error(error);
		if (axiosError.response?.status === 400) {
			const errorMessage = (axiosError.response.data as { status: string; message: string }).message;
			$toast.error(errorMessage);
		}
		return;
	}

	$toast.success("SUCCESS");
	resetCategoryFormState();
	setTimeout(() => {
		$router.back();
		resetCategoryFormState();
	}, 750);
	return;
};
</script>
