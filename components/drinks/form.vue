<template>
	<div class="form-container">
		<h2 class="form-title">Drink</h2>
		<div class="flex-container">
			<div class="flex-column">
				<div>
					<label class="input-label input-label-margin-bottom" for="name">name</label>
					<input
						v-model="drinkToCreateName"
						:class="{ 'text-input': true, 'has-error': isNameInvalid }"
						@blur="handleNameValidation(($event.target as HTMLInputElement).value)"
						type="text"
						id="name"
					/>
				</div>
				<div class="input-group-margin-top">
					<label class="input-label input-label-margin-bottom" for="method">method</label>
					<textarea
						v-model="drinkToCreateMethod"
						:class="{ 'textarea-input': true, 'has-error': isMethodInvalid }"
						type="text"
						id="method"
						rows="6"
						@blur="handleMethodValidation(($event.target as HTMLTextAreaElement).value)"
					/>
				</div>

				<div class="flex-container input-group-margin-top">
					<div class="drink-drop-zone-item">
						<label class="input-label input-label-margin-bottom" for="cover">cover</label>
						<DropZoneInput @file="handleCoverFileUpdate" id="cover" />
					</div>
					<div class="drink-drop-zone-item">
						<label class="input-label input-label-margin-bottom" for="thumbnail">thumbnail</label>
						<DropZoneInput @file="handleThumbnailFileUpdate" id="thumbnail" />
					</div>
				</div>
			</div>
			<div class="flex-column">
				<div class="input-search-ingredient-group">
					<div class="input-search-ingredient-row">
						<label class="search-ingredient-label" for="searchIngredient">ingredients</label>
						<NuxtLink href="/ingredients/new" class="new-ingredient-link">new ingredient</NuxtLink>
					</div>
					<div class="input-search-ingredient-row">
						<IngredientSearchInput
							:already-selected="drinkIngredientIdsList"
							:search-min-length="1"
							:options="searchedIngredients"
							@should-search="handleIngredientSearch"
							@select="handleIngredientSelected"
						/>
					</div>
				</div>
				<div class="ingredients-list-container">
					<div class="ingredients-list-row input-group-margin-top">
						<div class="ingredient-list-name-column text-center">name</div>
						<div class="ingredient-list-quantity-column text-center">quantity</div>
						<div class="ingredient-list-delete-column"></div>
					</div>

					<div
						v-for="(ing, index) in drinkToCreateIngredients"
						:key="ing.ingredientId"
						class="ingredients-list-row"
					>
						<div class="ingredient-list-name-column">{{ ing.ingredient.name }}</div>
						<div class="ingredient-list-quantity-column">
							<input
								v-model="ing.quantity"
								:class="{
									'has-error': handleQuantityHasError(ing.ingredientId),
									'ingredient-quantity-text-input': true,
								}"
								@blur="
									handleQuantityValidation(
										($event.target as HTMLInputElement).value,
										ing.ingredientId
									)
								"
								type="number"
							/>
							<span class="ingredient-unit-text">{{ ing.ingredient.unityPlural }}</span>
						</div>
						<div
							@click="handleRemoveDrinkIngredient(ing)"
							class="ingredient-list-delete-column drink-delete-box"
						>
							<img class="drink-delete" src="/delete-icon.svg" height="24" alt="delete drink" />
						</div>
					</div>
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
import { Ingredient } from "@/utils/dtos/Ingredients";
import { Drink, DrinkIngredient, ICreateDrink, IUpdateDrink } from "@/utils/dtos/Drinks";
import { AxiosError } from "axios";
const { $axios: axios, $router, $toast } = useNuxtApp();

interface IAutoCompleteOption {
	id: string;
	name: string;
}

const drinkToCreateName = ref<string>("");
const drinkToCreateMethod = ref<string>("");
const drinkToCreateIngredients = ref<DrinkIngredient[]>([]);
const drinkToCreateCover = ref<File>();
const drinkToCreateThumbnail = ref<File>();

const ingredientsFullSearchResult = ref<Ingredient[]>([]);
const searchedIngredients = ref<IAutoCompleteOption[]>([]);
const drinkIngredientIdsList = ref<string[]>([]);

// validation
const isNameInvalid = ref<boolean>(false);
const isMethodInvalid = ref<boolean>(false);
const isQuantityValid = ref<{ id: string; isInvalid: boolean }[]>([]);

const props = defineProps({
	drink: {
		type: Object as PropType<Drink>,
		default: { name: "", method: "", ingredients: [] as DrinkIngredient[] } as Drink,
	},
});

watch(
	() => props.drink,
	(newValue: Drink) => {
		drinkToCreateName.value = newValue.name;
		drinkToCreateMethod.value = newValue.method;
		drinkToCreateIngredients.value = newValue.ingredients;
		drinkIngredientIdsList.value = newValue.ingredients.map((ing) => ing.ingredientId);
		isQuantityValid.value = newValue.ingredients.map((ing) => ({ id: ing.ingredientId, isInvalid: false }));
	}
);

// drink ingredients
const handleIngredientSearch = async (value: string) => {
	try {
		const { data: ingredients } = await axios.get<Ingredient[]>("/ingredients");
		ingredientsFullSearchResult.value = ingredients;
		searchedIngredients.value = ingredients.map((ing) => ({ id: ing.id, name: ing.name }));
	} catch (error) {
		console.error(error);
	}
};
const handleIngredientSelected = (opt: IAutoCompleteOption) => {
	isQuantityValid.value = [...isQuantityValid.value, { id: opt.id, isInvalid: false }];
	drinkIngredientIdsList.value = [...drinkIngredientIdsList.value, opt.id];

	const ingredient = ingredientsFullSearchResult.value.find((ing) => ing.id === opt.id);
	if (!ingredient) {
		return;
	}
	const drinkIngredient: DrinkIngredient = {
		ingredientId: ingredient.id,
		quantity: 0,
		ingredient,
	};
	drinkToCreateIngredients.value = [...drinkToCreateIngredients.value, drinkIngredient];
};

const handleRemoveDrinkIngredient = (ingredient: DrinkIngredient) => {
	drinkIngredientIdsList.value = drinkIngredientIdsList.value.filter((ingId) => {
		if (ingId !== ingredient.ingredient.id) {
			return ingId;
		}
	});

	isQuantityValid.value = isQuantityValid.value.filter((q) => {
		if (q.id !== ingredient.ingredientId) {
			return q;
		}
	});

	const ingredientsWithoutRemoved = drinkToCreateIngredients.value.filter(
		(ing) => ing.ingredientId !== ingredient.ingredientId
	);
	drinkToCreateIngredients.value = ingredientsWithoutRemoved;
};

// validations
const handleNameValidation = (value: string) => {
	const isInvalid = value.trim().length <= 1 ? true : false;
	isNameInvalid.value = isInvalid;

	return isInvalid;
};
const handleMethodValidation = (value: string) => {
	const isInvalid = value.trim().length <= 1 ? true : false;
	isMethodInvalid.value = isInvalid;
	return isInvalid;
};

const handleQuantityValidation = (value: string, ingredientId: string) => {
	const isInvalid = Number(value) <= 0 ? true : false;

	isQuantityValid.value = isQuantityValid.value.map((q) => {
		if (q.id === ingredientId) {
			return { id: q.id, isInvalid: isInvalid };
		}
		return q;
	});
	return isInvalid;
};
const handleQuantityHasError = (id: string): boolean => {
	const quantity = isQuantityValid.value.find((q) => q.id === id);
	if (quantity) {
		return quantity.isInvalid;
	}
	return false;
};

const handleValidateDrink = () => {
	const nameIsValid = !handleNameValidation(drinkToCreateName.value);
	if (!nameIsValid) {
		$toast.error("Name invalid.");
	}
	const methodIsValid = !handleMethodValidation(drinkToCreateMethod.value);
	if (!methodIsValid) {
		$toast.error("method invalid.");
	}

	if (drinkToCreateIngredients.value.length === 0) {
		useNuxtApp().$toast.error("Add ingredients to your drink");
	}
	const quantitiesValidation = drinkToCreateIngredients.value.map((ing) => {
		return !handleQuantityValidation(ing.quantity.toString(), ing.ingredientId);
	});
	const quantitiesAreValid = quantitiesValidation.every((isValid) => isValid);
	if (!quantitiesAreValid) {
		useNuxtApp().$toast.error("The ingredient quantities must be greater than 0");
	}
	if (!nameIsValid || !methodIsValid || !quantitiesAreValid || drinkToCreateIngredients.value.length === 0) {
		return false;
	}
	return true;
};

const handleThumbnailFileUpdate = (file: File) => {
	drinkToCreateThumbnail.value = file;
};
const handleCoverFileUpdate = (file: File) => {
	drinkToCreateCover.value = file;
};

// action buttons
const handleCancelButton = () => {
	$router.back();
};

const handleSubmitButton = async () => {
	const isDrinkValid = handleValidateDrink();
	if (!isDrinkValid) {
		return;
	}

	// create request
	let requestBody: ICreateDrink | IUpdateDrink = {
		name: drinkToCreateName.value,
		method: drinkToCreateMethod.value,
		ingredients: drinkToCreateIngredients.value.map((ing) => ({
			ingredientId: ing.ingredient.id,
			quantity: ing.quantity,
		})),
	};

	let drinkId: string;
	const drinkAlreadyExists = !!props.drink.id;
	if (drinkAlreadyExists) {
		drinkId = props.drink.id;
		requestBody = {
			...requestBody,
			id: props.drink.id as string,
		};

		try {
			await axios.patch("/drinks", requestBody);
		} catch (error) {
			const axiosError = error as AxiosError;
			console.error(error);
			if (axiosError.response?.status === 400) {
				const errorMessage = (axiosError.response.data as { status: string; message: string }).message;
				$toast.error(errorMessage);
			}
			return;
		}
	} else {
		try {
			const response = await axios.post("/drinks", requestBody);
			const { id } = response.data as { id: string };
			drinkId = id;
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
	// update drink cover
	if (drinkToCreateCover.value) {
		let coverData = new FormData();
		coverData.append("cover", drinkToCreateCover.value, drinkToCreateCover.value.name);
		try {
			await axios.patch(`drinks/${drinkId}/cover`, coverData);
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
	// update drink thumbnail
	if (drinkToCreateThumbnail.value) {
		let thumbnailData = new FormData();
		thumbnailData.append("thumbnail", drinkToCreateThumbnail.value, drinkToCreateThumbnail.value.name);
		try {
			await axios.patch(`drinks/${drinkId}/thumbnail`, thumbnailData);
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

	useNuxtApp().$toast.success("SUCCESS");
	setTimeout(() => $router.back(), 750);
	return;
};
</script>
<style scoped>
.input-search-ingredient-group {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.input-search-ingredient-row {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
}

.search-ingredient-label {
	font-size: 1.25rem;
}

.new-ingredient-link {
	position: absolute;
	bottom: 0.1rem;
	right: 2%;
	font-size: 0.8rem;
}
.ingredients-list-container {
	display: flex;
	gap: 0.75rem;
	flex-direction: column;
	min-height: 9rem;
}

.ingredients-list-row {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}

.ingredient-list-name-column {
	flex: 4;
}

.ingredient-list-quantity-column {
	flex: 3;
}

.ingredient-list-delete-column {
	flex: 1;
}

.text-center {
	text-align: center;
}

.ingredient-quantity-text-input {
	font-size: 1rem;
	background-color: var(--secondary-background);
	border: 0.5px solid var(--secondary-background);
	border-radius: 0.75rem;
	padding: 0.5rem;
	width: 60%;
}

.ingredient-unit-text {
	margin-left: 0.3rem;
}

.drink-delete-box {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}

@media (min-width: 780px) {
	.drink-drop-zone-item {
		flex: 1;
	}
	.new-ingredient-link {
		right: 5%;
	}

	.ingredients-list-container {
		height: 20.75rem;
		overflow-y: scroll;
	}
}

@media (min-width: 1190px) {
	.new-ingredient-link {
		right: 20%;
	}
}
</style>
