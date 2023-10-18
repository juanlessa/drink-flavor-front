<template>
	<div class="form-container">
		<h2 class="form-title">Category</h2>
		<div class="flex-container">
			<div v-for="lang in languages" :key="lang" class="flex-column">
				<h3 class="language-title">{{ $t(`language.${lang}`) }}</h3>
				<label class="input-label input-label-margin-bottom" for="name">
					{{ $t("categoryForm.nameInput.label") }}
				</label>
				<input
					v-model="categoryFormState.form.translations[lang].name"
					:class="{
						'text-input': true,
						'has-error': checkFieldError(categoryFormState.errors, `translations.${lang}.name`),
					}"
					type="text"
					id="name"
					@blur="validateForm"
				/>
				<span class="input-error-message">
					{{ checkFieldError(categoryFormState.errors, `translations.${lang}.name`) }}
				</span>
			</div>
		</div>
		<div class="form-buttons-container">
			<button @click="handleCancelButton" class="action-button cancel-button-color form-button-size">
				{{ $t("categoryForm.cancelButton.message") }}
			</button>
			<button @click="handleSubmitButton" class="action-button primary-button-color form-button-size">
				{{ $t("categoryForm.submitButton.message") }}
			</button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { LANGUAGES } from "@/types/translations";

const { $router } = useNuxtApp();

const { getCategoryFormState, resetCategoryFormState, validateForm, checkFieldError } = useCategoryForm();

const categoryFormState = getCategoryFormState();

const languages = Object.values(LANGUAGES);

const emit = defineEmits<{
	(e: "submit"): void;
}>();

const handleCancelButton = () => {
	resetCategoryFormState();
	return $router.back();
};

const handleSubmitButton = async () => {
	categoryFormState.value.displayErrors = true;
	validateForm();

	if (categoryFormState.value.errors.length !== 0) {
		return;
	}

	emit("submit");
};
</script>
<style scoped>
.language-title {
	font-size: 1.25rem;
	margin: 1rem 0;
	text-align: center;
}
</style>
