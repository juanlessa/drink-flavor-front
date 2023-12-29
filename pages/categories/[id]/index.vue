<template>
	<NuxtLayout bg-primary>
		<CategoriesForm class="main-content-padding" @submit="handleUpdateCategory" />
	</NuxtLayout>
</template>
<script setup lang="ts">
import { IBgColor } from "@/types/layout";
import { ICategory, ICategoryForm, IUpdateCategory } from "@/types/category";
import { AxiosError } from "axios";
import { initEmptyCategory } from "@/constants/category";

const { $toast, $router } = useNuxtApp();
const { getCategory, updateCategory } = useCategory();
const { getCategoryFormState, resetCategoryFormState } = useCategoryForm();

const route = useRoute();

const category = ref<ICategory>(initEmptyCategory());

const categoryFormState = getCategoryFormState();
categoryFormState.value.displayErrors = true;

definePageMeta({
	middleware: "auth",
});

onMounted(async () => {
	const categoryId = route.params.id as string;

	try {
		category.value = await getCategory(categoryId);
	} catch (error) {
		console.error(error);
		return;
	}

	const categoryForm: ICategoryForm = { translations: category.value.translations };
	categoryFormState.value.form = categoryForm;
});

const handleUpdateCategory = async () => {
	const categoryToUpdate: IUpdateCategory = {
		id: category.value._id,
		...categoryFormState.value.form,
	};

	try {
		await updateCategory(categoryToUpdate);
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
	setTimeout(() => {
		$router.back();
		resetCategoryFormState();
	}, 750);
	return;
};
</script>
