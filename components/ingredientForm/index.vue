<template>
	<div class="form-container">
		<h2 class="form-title">Ingredient</h2>
		<div class="input-container">
			<div class="input-column">
				<div>
					<label class="input-label" for="name">name</label>
					<input
						v-model="props.ingredient.name"
						:class="{ 'text-input': true, 'has-error': isNameInvalid }"
						@blur="handleNameValidation(($event.target as HTMLInputElement).value)"
						type="text"
						id="name"
					/>
				</div>
				<div>
					<label class="input-label" for="category">category</label>
					<input
						v-model="props.ingredient.category"
						:class="{ 'text-input': true, 'has-error': isCategoryInvalid }"
						@blur="handleCategoryValidation(($event.target as HTMLInputElement).value)"
						type="text"
						id="category"
					/>
				</div>
			</div>
			<div class="input-column">
				<div class="input-md-row">
					<div class="input-unity-group">
						<label for="unity">unity</label>
						<input
							v-model="props.ingredient.unity"
							:class="{ 'text-input': true, 'input-unity': true, 'has-error': isUnityInvalid }"
							type="text"
							@blur="handleUnityValidation(($event.target as HTMLInputElement).value)"
							id=" unity"
						/>
					</div>
					<div class="input-alcoholic-group">
						<label for="ingredientIsAlcoholic">is alcoholic?</label>

						<label class="toggle-button">
							<input v-model="props.ingredient.isAlcoholic" id="ingredientIsAlcoholic" type="checkbox" />
							<span class="toggle-slider round"></span>
						</label>
					</div>
				</div>
				<div class="input-color-group">
					<label for="IngredientColor">color:</label>
					<div class="input-color-picker-group">
						<input
							v-model="props.ingredient.colorTheme"
							class="input-color-picker"
							type="color"
							id="ingredientColor"
						/>
						<input
							v-model="props.ingredient.colorTheme"
							:class="{ 'input-text-color-picker': true, 'has-error': isColorThemeInvalid }"
							type="text"
							@blur="handleColorThemeValidation(($event.target as HTMLInputElement).value)"
							id="IngredientColor"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="button-container">
			<button @click="handleCancelButton" class="button-cancel">cancel</button>
			<button @click="handleSubmitButton" class="button-submit">done</button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { IIngredient } from "~/utils/dtos/Ingredients";
import toastConfig from "@/utils/toastConfig";
import { AxiosError } from "axios";
const axios = useNuxtApp().$axios;

const isNameInvalid = ref<boolean>(false);
const isCategoryInvalid = ref<boolean>(false);
const isUnityInvalid = ref<boolean>(false);
const isColorThemeInvalid = ref<boolean>(false);

const props = defineProps({
	ingredient: {
		type: Object as PropType<IIngredient>,
		default: {} as IIngredient,
	},
});

onMounted(() => {});

const handleCancelButton = () => {
	useNuxtApp().$router.back();
};

const handleSubmitButton = async () => {
	//validation
	const nameIsInvalid = handleNameValidation(props.ingredient.name);
	if (nameIsInvalid) {
		useNuxtApp().$toast.error("Name invalid.", toastConfig);
	}
	const categoryIsInvalid = handleCategoryValidation(props.ingredient.category);
	if (categoryIsInvalid) {
		useNuxtApp().$toast.error("Category invalid.", toastConfig);
	}
	const unityIsInvalid = handleUnityValidation(props.ingredient.unity);
	if (unityIsInvalid) {
		useNuxtApp().$toast.error("Unity invalid.", toastConfig);
	}
	const colorIsInvalid = handleColorThemeValidation(props.ingredient.colorTheme);
	if (colorIsInvalid) {
		useNuxtApp().$toast.error("Color invalid.", toastConfig);
	}

	if (nameIsInvalid || categoryIsInvalid || unityIsInvalid || colorIsInvalid) {
		return;
	}

	let requestBody: IIngredient = {
		name: props.ingredient.name,
		unity: props.ingredient.unity,
		category: props.ingredient.category,
		isAlcoholic: props.ingredient.isAlcoholic,
		colorTheme: props.ingredient.colorTheme,
	};

	const ingredientAlreadyExists = !!props.ingredient.id;
	if (ingredientAlreadyExists) {
		requestBody = {
			id: props.ingredient.id,
			...requestBody,
		};
		try {
			const response = await axios.patch("/ingredients", requestBody);
			useNuxtApp().$toast.success("SUCCESS", toastConfig);
			setTimeout(() => useNuxtApp().$router.back(), 750);
		} catch (error) {
			const axiosError = error as AxiosError;
			if (axiosError.response?.status === 400) {
				const errorMessage = (axiosError.response.data as { status: string; message: string }).message;
				useNuxtApp().$toast.error(errorMessage, toastConfig);
			}
		}
		return;
	}
	try {
		const response = await axios.post("/ingredients", requestBody);
		useNuxtApp().$toast.success("SUCCESS", toastConfig);
		setTimeout(() => useNuxtApp().$router.back(), 750);
	} catch (error) {
		const axiosError = error as AxiosError;
		if (axiosError.response?.status === 400) {
			const errorMessage = (axiosError.response.data as { status: string; message: string }).message;
			useNuxtApp().$toast.error(errorMessage, toastConfig);
		}
	}
	return;
};

const handleNameValidation = (value: string) => {
	const isInvalid = value.trim().length <= 1;
	isNameInvalid.value = isInvalid;
	return isInvalid;
};
const handleCategoryValidation = (value: string) => {
	const isInvalid = value.trim().length <= 1;
	isCategoryInvalid.value = isInvalid;
	return isInvalid;
};
const handleUnityValidation = (value: string) => {
	const isInvalid = value.trim().length < 1;
	isUnityInvalid.value = isInvalid;
	return isInvalid;
};
const handleColorThemeValidation = (value: string) => {
	const isInvalid = !/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value); // color regex validation
	isColorThemeInvalid.value = isInvalid;
	return isInvalid;
};
</script>
<style scoped>
.input-md-row {
	display: flex;
	flex-direction: column;
}

.input-unity-group {
	margin-left: 0.5rem;
	margin-top: 1.5rem;
	display: flex;
	gap: 0.5rem;
	align-items: center;
}

.input-unity {
	width: 7rem;
	text-align: center;
}

.input-alcoholic-group {
	margin-left: 0.5rem;
	margin-top: 1.5rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.input-color-group {
	display: flex;
	gap: 0.5rem;
	align-items: center;
	margin-left: 0.5rem;
	margin-top: 0.75rem;
}

/* ----- toggle-button ------ */
.toggle-button {
	position: relative;
	display: inline-block;
	width: 60px;
	height: 34px;
}

.toggle-button input {
	opacity: 0;
	width: 0;
	height: 0;
}

.toggle-slider {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

.toggle-slider:before {
	position: absolute;
	content: "";
	height: 26px;
	width: 26px;
	left: 4px;
	bottom: 4px;
	background-color: white;
	-webkit-transition: 0.4s;
	transition: 0.4s;
}

input:checked + .toggle-slider {
	background-color: #2196f3;
}

input:focus + .toggle-slider {
	box-shadow: 0 0 1px #2196f3;
}

input:checked + .toggle-slider:before {
	-webkit-transform: translateX(26px);
	-ms-transform: translateX(26px);
	transform: translateX(26px);
}

.toggle-slider.round {
	border-radius: 34px;
}

.toggle-slider.round:before {
	border-radius: 50%;
}

/* ----- end toggle-button ------ */

.input-color-picker-group {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.input-color-picker {
	border: none;
	height: 2rem;
}

.input-text-color-picker {
	font-size: 1rem;
	text-align: center;
	background-color: var(--secondary-background);
	border: 0.5px solid var(--secondary-background);
	border-radius: 0.5rem;
	padding: 0.5rem;
	width: 6rem;
}

@media (min-width: 780px) {
	.input-md-row {
		flex-direction: row;
		gap: 1rem;
		align-items: center;
	}

	.input-color-group {
		margin-top: 1.5rem;
	}
}
</style>
