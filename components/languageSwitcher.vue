<template>
	<div class="language-switcher">
		<select v-model="$i18n.locale" class="language-select-input" id="language">
			<option v-for="lang in languages" :key="lang" :value="lang">
				{{ lang.toLocaleUpperCase() }}
			</option>
		</select>
	</div>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { LANGUAGES } from "@/types/translations";
import { LOCAL_STORAGE_KEYS } from "@/types/localStorage";

const { locale } = useI18n();
const { setLocalStorageItem } = useLocalStorage();

const languages = Object.values(LANGUAGES);

watch(locale, (newLocale) => {
	setLocalStorageItem(LOCAL_STORAGE_KEYS.locale, newLocale);
});
</script>
<style scoped>
.language-switcher {
	margin-left: 0.75rem;
	display: flex;
}
.language-select-input {
	font-size: 1rem;
	background-color: var(--primary-background);
	border: none;
	border-radius: 0.5rem;
	padding: 0.5rem;
	width: 100%;
	outline: none;
}
</style>
