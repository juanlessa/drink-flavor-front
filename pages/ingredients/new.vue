<template>
	<NuxtLayout bg-primary>
		<IngredientsForm class="main-content-padding" @submit="handleCreateIngredient" />
	</NuxtLayout>
</template>
<script setup lang="ts">
import { IBgColor } from "@/types/layout";
import { AxiosError } from "axios";

const { $toast, $router } = useNuxtApp();
const { createIngredient } = useIngredient();
const { getIngredientFormState, resetIngredientFormState } = useIngredientForm();

const ingredientFormState = getIngredientFormState();

definePageMeta({
	middleware: "auth",
});

const handleCreateIngredient = async () => {
	const ingredientToCreate = ingredientFormState.value.form;
	try {
		await createIngredient(ingredientToCreate);
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
