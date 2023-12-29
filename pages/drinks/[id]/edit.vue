<template>
	<NuxtLayout bg-primary>
		<DrinksForm :drink="drink" class="main-content-padding" @submit="handleUpdateDrink" />
	</NuxtLayout>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { IBgColor } from "@/types/layout";
import { AxiosError } from "axios";
import { initEmptyDrink } from "@/constants/drink";
import { IDrink, IDrinkForm, IUpdateDrink } from "@/types/drink";

const { $toast, $router } = useNuxtApp();
const { t } = useI18n();
const { updateDrink, updateDrinkCover, updateDrinkThumbnail, getDrink } = useDrink();
const { getDrinkFormState, resetDrinkFormState } = useDrinkForm();

const route = useRoute();

const drink = ref<IDrink>(initEmptyDrink());

const drinkFormState = getDrinkFormState();

definePageMeta({
	middleware: "auth",
});
onMounted(async () => {
	const drinkId = route.params.id as string;

	try {
		drink.value = await getDrink(drinkId);
	} catch (error) {
		$toast.error(t("updateDrinkPage.loadDrink.errorMessage"));
		console.error(error);
		navigateTo("/");
	}

	const drinkForm: IDrinkForm = {
		translations: drink.value.translations,
		ingredients: drink.value.ingredients.map((i) => ({ ingredient_id: i.ingredient._id, quantity: i.quantity })),
	};
	drinkFormState.value.form = drinkForm;
});

const handleUpdateDrink = async () => {
	const drinkToUpdate: IUpdateDrink = {
		id: drink.value._id,
		...drinkFormState.value.form,
	};

	try {
		await updateDrink(drinkToUpdate);
	} catch (error) {
		const axiosError = error as AxiosError;
		console.error(error);
		if (axiosError.response?.status === 400) {
			const errorMessage = (axiosError.response.data as { status: string; message: string }).message;
			$toast.error(errorMessage);
		}
		return;
	}

	if (drinkFormState.value.cover) {
		try {
			await updateDrinkCover(drink.value._id, drinkFormState.value.cover);
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

	if (drinkFormState.value.thumbnail) {
		try {
			await updateDrinkThumbnail(drink.value._id, drinkFormState.value.thumbnail);
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
