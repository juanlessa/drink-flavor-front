<template>
	<div class="form-container">
		<h2 class="form-title">Ingredient</h2>
		<div class="flex-container">
			<div class="flex-column">
				<div>
					<label class="input-label input-label-margin-bottom" for="name">name</label>
					<input
						v-model="ingredientToCreateName"
						:class="{ 'text-input': true, 'has-error': isNameInvalid }"
						@blur="handleNameValidation(($event.target as HTMLInputElement).value)"
						type="text"
						id="name"
					/>
				</div>
				<div class="input-group-margin-top">
					<label class="input-label input-label-margin-bottom" for="category">category</label>
					<select
						v-model="ingredientToCreateCategoryId"
						:class="{ 'select-input': true, 'has-error': isCategoryIdInvalid }"
						@blur="handleCategoryIdValidation(($event.target as HTMLSelectElement).value)"
						id="category"
					>
						<option value="">Select a category</option>
						<option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
					</select>
				</div>
			</div>
			<div class="flex-column">
				<div class="flex-container">
					<div class="flex-column">
						<label class="input-label input-label-margin-bottom" for="unitySingular">unity singular</label>
						<input
							v-model="ingredientToCreateUnitySingular"
							:class="{ 'text-input': true, 'has-error': isUnitySingularInvalid }"
							@blur="handleUnitySingularValidation(($event.target as HTMLInputElement).value)"
							type="text"
							id="unitySingular"
						/>
					</div>
					<div class="flex-column">
						<label class="input-label input-label-margin-bottom" for="unityPlural">unity plural</label>
						<input
							v-model="ingredientToCreateUnityPlural"
							:class="{ 'text-input': true, 'has-error': isUnityPluralInvalid }"
							@blur="handleUnityPluralValidation(($event.target as HTMLInputElement).value)"
							type="text"
							id="unityPlural"
						/>
					</div>
				</div>
				<div class="input-group-margin-top is-alcoholic-input-group">
					<label class="input-label" for="isAlcoholic">is alcoholic</label>
					<ToggleInput
						:input-value="ingredientToCreateIsAlcoholic"
						input-id="isAlcoholic"
						@input="handleIsAlcoholicInputChange"
					/>
				</div>
			</div>
		</div>
		<div class="form-buttons-container">
			<button @click="handleCancelButton" class="action-button cancel-button form-button-size">cancel</button>
			<button @click="handleSubmitButton" class="action-button primary-button-color form-button-size">
				done
			</button>
		</div>
	</div>
</template>
<script setup lang="ts">
import toastConfig from "@/utils/toastConfig";
import { Ingredient, ICreateIngredient, IUpdateIngredient } from "@/utils/dtos/Ingredients";
import { AxiosError } from "axios";
import { Category } from "~/utils/dtos/Categories";
const { $axios: axios, $router, $toast } = useNuxtApp();
type Item = { id: string; name: string };

const ingredientToCreateName = ref<string>("");
const ingredientToCreateCategoryId = ref<string>("");
const ingredientToCreateUnitySingular = ref<string>("");
const ingredientToCreateUnityPlural = ref<string>("");
const ingredientToCreateIsAlcoholic = ref<boolean>(false);

const categories = ref<Item[]>([]);
// validation
const isNameInvalid = ref<boolean>(false);
const isCategoryIdInvalid = ref<boolean>(false);
const isUnitySingularInvalid = ref<boolean>(false);
const isUnityPluralInvalid = ref<boolean>(false);

const props = defineProps({
	ingredient: {
		type: Object as PropType<Ingredient>,
		default: { name: "", categoryId: "", unitySingular: "", unityPlural: "", isAlcoholic: false } as Ingredient,
	},
});

watch(
	() => props.ingredient,
	(newValue: Ingredient) => {
		ingredientToCreateName.value = newValue.name;
		ingredientToCreateCategoryId.value = newValue.categoryId;
		ingredientToCreateUnitySingular.value = newValue.unitySingular;
		ingredientToCreateUnityPlural.value = newValue.unityPlural;
		ingredientToCreateIsAlcoholic.value = newValue.isAlcoholic;
	}
);
onMounted(() => {
	handleLoadCategories();
});

const handleLoadCategories = async () => {
	try {
		const { data } = await axios.get<Category[]>("/categories");
		categories.value = data.map((cat): Item => ({ id: cat.id, name: cat.name }));
	} catch (error) {
		console.error(error);
	}
};

const handleIsAlcoholicInputChange = (value: boolean) => {
	ingredientToCreateIsAlcoholic.value = value;
};

const handleNameValidation = (value: string) => {
	const isInvalid = value.trim().length <= 1 ? true : false;
	isNameInvalid.value = isInvalid;
	return isInvalid;
};
const handleCategoryIdValidation = (value: string) => {
	const isInvalid = value === "";
	isCategoryIdInvalid.value = isInvalid;
	return isInvalid;
};
const handleUnitySingularValidation = (value: string) => {
	const isInvalid = value.trim().length < 1;
	isUnitySingularInvalid.value = isInvalid;
	return isInvalid;
};
const handleUnityPluralValidation = (value: string) => {
	const isInvalid = value.trim().length < 1;
	isUnityPluralInvalid.value = isInvalid;
	return isInvalid;
};
const handleValidateIngredient = () => {
	const nameIsValid = !handleNameValidation(ingredientToCreateName.value);
	if (!nameIsValid) {
		$toast.error("Name invalid.", toastConfig);
	}
	const categoryIdIsValid = !handleCategoryIdValidation(ingredientToCreateCategoryId.value);
	if (!categoryIdIsValid) {
		$toast.error("Category invalid.", toastConfig);
	}
	const unitySingularIsValid = !handleUnitySingularValidation(ingredientToCreateUnitySingular.value);
	if (!unitySingularIsValid) {
		$toast.error("Unity singular invalid.", toastConfig);
	}
	const unityPluralIsValid = !handleUnityPluralValidation(ingredientToCreateUnityPlural.value);
	if (!unityPluralIsValid) {
		$toast.error("Unity plural invalid.", toastConfig);
	}

	if (!nameIsValid || !categoryIdIsValid || !unitySingularIsValid || !unityPluralIsValid) {
		return false;
	}
	return true;
};

const handleCancelButton = () => {
	$router.back();
};

const handleSubmitButton = async () => {
	const isIngredientValid = handleValidateIngredient();
	if (!isIngredientValid) {
		return;
	}

	// create request
	let requestBody: ICreateIngredient | IUpdateIngredient = {
		name: ingredientToCreateName.value,
		categoryId: ingredientToCreateCategoryId.value,
		unitySingular: ingredientToCreateUnitySingular.value,
		unityPlural: ingredientToCreateUnityPlural.value,
		isAlcoholic: ingredientToCreateIsAlcoholic.value,
	};

	const ingredientAlreadyExists = !!props.ingredient.id;
	if (ingredientAlreadyExists) {
		requestBody = {
			...requestBody,
			id: props.ingredient.id as string,
		};

		try {
			await axios.patch("/ingredients", requestBody);
		} catch (error) {
			const axiosError = error as AxiosError;
			console.error(error);
			if (axiosError.response?.status === 400) {
				const errorMessage = (axiosError.response.data as { status: string; message: string }).message;
				$toast.error(errorMessage, toastConfig);
			}
			return;
		}
	} else {
		try {
			await axios.post("/ingredients", requestBody);
		} catch (error) {
			const axiosError = error as AxiosError;
			console.error(error);
			if (axiosError.response?.status === 400) {
				const errorMessage = (axiosError.response.data as { status: string; message: string }).message;
				useNuxtApp().$toast.error(errorMessage, toastConfig);
			}
			return;
		}
	}
	useNuxtApp().$toast.success("SUCCESS", toastConfig);
	setTimeout(() => $router.back(), 750);
	return;
};
</script>
<style scoped>
.is-alcoholic-input-group {
	display: flex;
	gap: 0.5rem;
	align-items: center;
}
</style>
