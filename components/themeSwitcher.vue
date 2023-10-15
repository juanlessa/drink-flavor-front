<template>
	<div @click="handleToggleTheme" ref="btnToggleTheme" class="btn">
		<div class="btn__indicator">
			<div class="btn__icon-container">
				<i ref="btnIcon" class="btn__icon fa-solid"></i>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { THEME_MODES } from "@/types/theme";
import { LOCAL_STORAGE_KEYS } from "~/types/localStorage";

const { $toggleTheme, $getTheme } = useNuxtApp();
const { setLocalStorageItem } = useLocalStorage();

const themeState = $getTheme();

const btnToggleTheme = ref<HTMLElement>();
const btnIcon = ref<HTMLElement>();

onMounted(() => {
	btnIcon.value?.classList.add("animated");

	if (themeState.value.themeMode === THEME_MODES.dark) {
		btnToggleTheme.value?.classList.toggle("darkmode");
		btnIcon.value?.classList.remove("fa-sun");
		btnIcon.value?.classList.add("fa-moon");
	} else {
		btnIcon.value?.classList.remove("fa-moon");
		btnIcon.value?.classList.add("fa-sun");
	}

	setTimeout(() => {
		btnIcon.value?.classList.remove("animated");
	}, 500);
});

const handleToggleTheme = () => {
	btnToggleTheme.value?.classList.toggle("darkmode");
	btnIcon.value?.classList.add("animated");

	//save true or false
	$toggleTheme();

	if (themeState.value.themeMode === THEME_MODES.dark) {
		btnIcon.value?.classList.remove("fa-sun");
		btnIcon.value?.classList.add("fa-moon");
	} else {
		btnIcon.value?.classList.remove("fa-moon");
		btnIcon.value?.classList.add("fa-sun");
	}

	setTimeout(() => {
		btnIcon.value?.classList.remove("animated");
	}, 500);
};

watch(
	() => themeState.value.themeMode,
	(newThemeMode: THEME_MODES) => setLocalStorageItem(LOCAL_STORAGE_KEYS.theme, newThemeMode)
);
</script>
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css");

.btn {
	background-color: var(--secondary-background);
	width: 4rem;
	height: 2em;
	border-radius: 1rem;
	padding: 0 0.25rem;

	position: relative;

	display: flex;
	align-items: center;

	cursor: pointer;
}

.btn__indicator {
	background-color: white;
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;

	position: absolute;

	box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);

	transition: transform 0.3s ease;
}

.btn__icon-container {
	width: 100%;
	height: 100%;

	display: flex;
	justify-content: center;
	align-items: center;
}

.btn__icon {
	color: var(--primary-color);
	font-size: 1rem;
}

/* -------------- ANIMATION ------------ */
.btn__icon.animated {
	animation: spin 0.5s;
}

@keyframes spin {
	to {
		transform: rotate(360deg);
	}
}

/* -------------- DARKMODE -------------- */

.darkmode .btn__indicator {
	transform: translateX(2rem);
	background-color: var(--primary-background);
	box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
}

.darkmode .btn__icon {
	color: var(--primary-color);
}
</style>
