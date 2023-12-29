<template>
	<div
		@click="handleToggleTheme"
		ref="btnToggleTheme"
		class="bg-light-secondary dark:bg-dark-secondary w-16 h-8 rounded-full px-1 relative flex items-center cursor-pointer"
	>
		<div class="btn__indicator">
			<div class="btn__icon-container">
				<i ref="btnIcon" class="btn__icon fa-solid"></i>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { THEME_MODES } from "@/types/theme";

const { $toggleTheme, $getTheme } = useNuxtApp();

const btnToggleTheme = ref<HTMLElement>();
const btnIcon = ref<HTMLElement>();

onMounted(() => {
	btnIcon.value?.classList.add("animated");

	if ($getTheme() === THEME_MODES.dark) {
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
	btnIcon.value?.classList.add("animated");

	//save true or false
	$toggleTheme();

	if ($getTheme() === THEME_MODES.dark) {
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
</script>
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css");

.btn__indicator {
	@apply bg-light-primary w-6 h-6 rounded-full absolute;
	box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
	transition: transform 0.3s ease;
}

.btn__icon-container {
	@apply w-full h-full flex justify-center items-center;
}

.btn__icon {
	@apply text-light-theme text-base;
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

.dark .btn__indicator {
	@apply bg-dark-primary;
	transform: translateX(2rem);
	box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
}

.dark .btn__icon {
	@apply text-dark-theme;
}
</style>
