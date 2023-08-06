<template>
	<div class="form-container">
		<h2 class="form-title">Category</h2>
		<div class="flex-container">
			<div class="flex-column">
				<label class="input-label input-label-margin-bottom" for="name">name</label>
				<input
					v-model="categoryToCreateName"
					:class="{ 'text-input': true, 'has-error': isNameInvalid }"
					@blur="handleNameValidation(($event.target as HTMLInputElement).value)"
					type="text"
					id="name"
				/>
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
import { Category, ICreateCategory, IUpdateCategory } from "@/utils/dtos/Categories";
import { AxiosError } from "axios";
const { $axios: axios, $router, $toast } = useNuxtApp();

const categoryToCreateName = ref<string>("");
// validation
const isNameInvalid = ref<boolean>(false);

const props = defineProps({
	category: {
		type: Object as PropType<Category>,
		default: { name: "" } as Category,
	},
});
watch(
	() => props.category,
	(newValue: Category) => {
		categoryToCreateName.value = newValue.name;
	}
);

const handleNameValidation = (value: string) => {
	const isInvalid = value.trim().length <= 1 ? true : false;
	isNameInvalid.value = isInvalid;
	return isInvalid;
};
const handleValidateCategory = () => {
	const nameIsValid = !handleNameValidation(categoryToCreateName.value);
	if (!nameIsValid) {
		$toast.error("Name invalid.", toastConfig);
		return false;
	}
	return true;
};

const handleCancelButton = () => {
	$router.back();
};

const handleSubmitButton = async () => {
	const isCategoryValid = handleValidateCategory();
	if (!isCategoryValid) {
		return;
	}

	// create request
	let requestBody: ICreateCategory | IUpdateCategory = {
		name: categoryToCreateName.value,
	};

	const categoryAlreadyExists = !!props.category.id;
	if (categoryAlreadyExists) {
		requestBody = {
			...requestBody,
			id: props.category.id as string,
		};

		try {
			await axios.patch("/categories", requestBody);
		} catch (error) {
			const axiosError = error as AxiosError;
			console.error(error);
			if (axiosError.response?.status === 400) {
				const errorMessage = (axiosError.response.data as { status: string; message: string }).message;
				$toast.error(errorMessage, toastConfig);
			}
		}
	} else {
		try {
			await axios.post("/categories", requestBody);
		} catch (error) {
			const axiosError = error as AxiosError;
			console.error(error);
			if (axiosError.response?.status === 400) {
				const errorMessage = (axiosError.response.data as { status: string; message: string }).message;
				useNuxtApp().$toast.error(errorMessage, toastConfig);
			}
		}
	}
	useNuxtApp().$toast.success("SUCCESS", toastConfig);
	setTimeout(() => $router.back(), 750);
	return;
};
</script>
