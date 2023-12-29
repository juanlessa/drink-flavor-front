<template>
	<NuxtLayout bg-primary>
		<DrinksForm class="main-content-padding" @submit="handleCreateDrink" />
	</NuxtLayout>
</template>
<script setup lang="ts">
import { IBgColor } from "@/types/layout";
import { AxiosError } from "axios";

const { $toast, $router } = useNuxtApp();
const { createDrink, updateDrinkCover, updateDrinkThumbnail } = useDrink();

const { getDrinkFormState, resetDrinkFormState } = useDrinkForm();

const drinkFormState = getDrinkFormState();

definePageMeta({
	middleware: "auth",
});

const handleCreateDrink = async () => {
	const drinkToCreate = drinkFormState.value.form;
	let createdDrinkId = "";
	try {
		createdDrinkId = await createDrink(drinkToCreate);
	} catch (error) {
		const axiosError = error as AxiosError;
		console.error(error);
		if (axiosError.response?.status === 400) {
			const errorMessage = (axiosError.response.data as { status: string; message: string }).message;
			$toast.error(errorMessage);
		}
		return;
	}

	if (drinkFormState.value.cover && createdDrinkId) {
		try {
			await updateDrinkCover(createdDrinkId, drinkFormState.value.cover);
		} catch (error) {
			const axiosError = error as AxiosError;
			console.error(error);
			if (axiosError.response?.status === 400) {
				const errorMessage = (axiosError.response.data as { status: string; message: string }).message;
				$toast.error(errorMessage);
			}
			return;
		}
	}

	if (drinkFormState.value.thumbnail && createdDrinkId) {
		try {
			await updateDrinkThumbnail(createdDrinkId, drinkFormState.value.thumbnail);
		} catch (error) {
			const axiosError = error as AxiosError;
			console.error(error);
			if (axiosError.response?.status === 400) {
				const errorMessage = (axiosError.response.data as { status: string; message: string }).message;
				$toast.error(errorMessage);
			}
			return;
		}
	}

	$toast.success("SUCCESS");
	setTimeout(() => {
		$router.back();
		resetDrinkFormState();
	}, 750);
	return;
};
</script>
