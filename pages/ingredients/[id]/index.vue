<template>
	<NuxtLayout :bg-color="IBgColor.primary">
		<IngredientsForm class="main-content-padding" @submit="handleUpdateIngredient" />
	</NuxtLayout>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { IBgColor } from "@/types/layout";
import { IIngredient, IIngredientForm, IUpdateIngredient } from "@/types/ingredient";
import { AxiosError } from "axios";
import { initEmptyIngredient } from "@/constants/ingredient";

const { $toast, $router } = useNuxtApp();
const { t } = useI18n();
const { getIngredient, updateIngredient } = useIngredient();
const { getIngredientFormState, resetIngredientFormState } = useIngredientForm();

const route = useRoute();

const ingredient = ref<IIngredient>(initEmptyIngredient());

const ingredientFormState = getIngredientFormState();
ingredientFormState.value.displayErrors = true;

definePageMeta({
	middleware: "auth",
});

onMounted(async () => {
	const ingredientId = route.params.id as string;

	try {
		ingredient.value = await getIngredient(ingredientId);
	} catch (error) {
		$toast.error(t("updateIngredientPage.loadIngredient.errorMessage"));
		console.error(error);
		navigateTo("/");
	}

	const ingredientForm: IIngredientForm = {
		translations: ingredient.value.translations,
		is_alcoholic: ingredient.value.is_alcoholic,
		category_id: ingredient.value.category._id,
	};
	ingredientFormState.value.form = ingredientForm;
	ingredientFormState.value.defaultCategory = ingredient.value.category._id;
});

const handleUpdateIngredient = async () => {
	const ingredientToUpdate: IUpdateIngredient = {
		id: ingredient.value._id,
		...ingredientFormState.value.form,
	};

	try {
		await updateIngredient(ingredientToUpdate);
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
		resetIngredientFormState();
	}, 750);
	return;
};
</script>
