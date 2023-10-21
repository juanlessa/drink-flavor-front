<template>
	<div class="form-container">
		<h2 class="form-title">{{ $t("ingredientForm.title.message") }}</h2>
		<div class="flex-container">
			<div v-for="lang in languages" :key="lang" class="flex-column content-mt">
				<h3 class="language-title">{{ $t(`language.${lang}`) }}</h3>

				<div>
					<label class="input-label input-label-margin-bottom" for="name">{{
						$t("ingredientForm.nameInput.label")
					}}</label>
					<input
						v-model="ingredientFormState.form.translations[lang].name"
						:class="{
							'text-input': true,
							'has-error': checkFieldError(ingredientFormState.errors, `translations.${lang}.name`),
						}"
						type="text"
						id="name"
						@blur="validateForm"
					/>
				</div>
				<div>
					<label class="input-label input-label-margin-bottom" for="unit">
						{{ $t("ingredientForm.unitInput.label") }}</label
					>
					<input
						v-model="ingredientFormState.form.translations[lang].unit"
						:class="{
							'text-input': true,
							'has-error': checkFieldError(ingredientFormState.errors, `translations.${lang}.unit`),
						}"
						type="text"
						id="unit"
						@blur="validateForm"
					/>
				</div>
				<div>
					<label class="input-label input-label-margin-bottom" for="unitPlural">
						{{ $t("ingredientForm.unitPluralInput.label") }}
					</label>
					<input
						v-model="ingredientFormState.form.translations[lang].unit_plural"
						:class="{
							'text-input': true,
							'has-error': checkFieldError(
								ingredientFormState.errors,
								`translations.${lang}.unit_plural`
							),
						}"
						type="text"
						id="unitPlural"
						@blur="validateForm"
					/>
				</div>
			</div>
		</div>
		<h3 class="language-title content-mt">{{ $t("ingredientForm.generalSection.label") }}</h3>
		<div class="flex-container">
			<div class="flex-column">
				<div>
					<label class="input-label input-label-margin-bottom" for="category">
						{{ $t("ingredientForm.categoryInput.label") }}
					</label>
					<SearchSelect
						v-if="categoryState.categories.length !== 0"
						:class="{
							'has-error': checkFieldError(ingredientFormState.errors, `category_id`),
						}"
						id="category"
						:items="categoryState.categories"
						v-model:search="categorySearchTerm"
						:default="ingredientFormState.form.category_id"
						@update:value="handleUpdateSelectedCategory"
						@blur="validateForm"
					/>
				</div>
			</div>
			<div class="flex-column">
				<div class="input-group-margin-top is-alcoholic-input-group">
					<label class="input-label" for="is_alcoholic">
						{{ $t("ingredientForm.isAlcoholicInput.label") }}
					</label>
					<ToggleInput
						:value="ingredientFormState.form.is_alcoholic"
						@update:value="handleUpdateIsAlcoholic"
						id="is_alcoholic"
					/>
				</div>
			</div>
		</div>

		<div class="form-buttons-container">
			<button @click="handleCancelButton" class="action-button cancel-button-color form-button-size">
				{{ $t("ingredientForm.cancelButton.message") }}
			</button>
			<button @click="handleSubmitButton" class="action-button primary-button-color form-button-size">
				{{ $t("ingredientForm.submitButton.message") }}
			</button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { LANGUAGES } from "@/types/translations";

const { $router, $toast } = useNuxtApp();
const { t } = useI18n();
const { getIngredientFormState, resetIngredientFormState, validateForm, checkFieldError } = useIngredientForm();
const { getCategoryState, loadCategories } = useCategory();

const ingredientFormState = getIngredientFormState();
const categoryState = getCategoryState();

const categorySearchTerm = ref<string>("");

const languages = Object.values(LANGUAGES);

onMounted(async () => {
	try {
		await loadCategories();
	} catch (error) {
		$toast.error(t("categoriesPage.loadCategories.errorMessage"));
		console.error(error);
		navigateTo("/");
	}
});

const emit = defineEmits<{
	(e: "submit"): void;
}>();

const handleCancelButton = () => {
	resetIngredientFormState();
	return $router.back();
};

const handleSubmitButton = async () => {
	ingredientFormState.value.displayErrors = true;
	validateForm();

	console.log("submit method", ingredientFormState.value.form);

	if (ingredientFormState.value.errors.length !== 0) {
		return;
	}

	emit("submit");
};

const handleUpdateIsAlcoholic = (value: boolean) => {
	ingredientFormState.value.form.is_alcoholic = value;
};

const handleUpdateSelectedCategory = (id: string) => {
	ingredientFormState.value.form.category_id = id;
};
</script>
<style scoped>
.is-alcoholic-input-group {
	display: flex;
	height: 100%;
	gap: 0.5rem;
	align-items: center;
}
</style>
