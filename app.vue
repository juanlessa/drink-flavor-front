<template>
	<NuxtPage />
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { LANGUAGES } from "./types/translations";
import { LOCAL_STORAGE_KEYS } from "./types/localStorage";
import { THEME_MODES } from "./types/theme";

const { $setTheme } = useNuxtApp();
const { getLocalStorageItem } = useLocalStorage();

if (process.client) {
	const theme = (getLocalStorageItem(LOCAL_STORAGE_KEYS.theme) as THEME_MODES) ?? THEME_MODES.light;
	$setTheme(theme);

	const { locale } = useI18n();
	locale.value = getLocalStorageItem(LOCAL_STORAGE_KEYS.locale) ?? LANGUAGES.english;
}
</script>
