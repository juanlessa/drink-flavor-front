<template>
	<NuxtLayout :bg-color="IBgColor.primary">
		<IngredientsForm class="main-content-padding" @submit="handleUpdateIngredient" />
	</NuxtLayout>
</template>
<script setup lang="ts">
import { IBgColor } from "@/types/layout";
import { IIngredient, IIngredientForm, IUpdateIngredient } from "@/types/ingredient";
import { EMPTY_INGREDIENT } from "@/constants/ingredient";
import { AxiosError } from "axios";

const { $toast, $router } = useNuxtApp();
const { getIngredient, updateIngredient } = useIngredient();
const { getIngredientFormState, resetIngredientFormState } = useIngredientForm();

const route = useRoute();

const ingredient = ref<IIngredient>({ ...EMPTY_INGREDIENT });

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
		console.error(error);
		return;
	}

	const ingredientForm: IIngredientForm = {
		translations: ingredient.value.translations,
		is_alcoholic: ingredient.value.is_alcoholic,
		category_id: ingredient.value.category._id,
	};
	ingredientFormState.value.form = ingredientForm;
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
