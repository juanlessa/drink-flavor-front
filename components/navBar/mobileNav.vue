<template>
	<header ref="menuElement" class="h-20 w-screen bg-light-primary dark:bg-dark-primary relative">
		<div class="w-[95%] mx-auto flex justify-between items-center h-full">
			<NuxtLink to="/" class="flex items-center gap-2 text-4xl text-light-theme dark:text-dark-theme">
				<img
					class="cursor-pointer h-16"
					:src="$getTheme() === THEME_MODES.light ? '/light-logo.png' : '/dark-logo.png'"
					height="40"
					alt="DrunkFlavor"
				/>
				<span>DrunkFlavor</span>
			</NuxtLink>

			<IconsMenu
				v-if="!isMenuOpen"
				:size="26"
				:color="$getThemeColors().iconsColor"
				alt="open menu"
				@click="handleToggleMenu"
			/>
			<IconsMenuClose
				v-else
				:size="26"
				:color="$getThemeColors().iconsColor"
				alt="close menu"
				@click="handleToggleMenu"
			/>
		</div>
		<div
			v-show="isMenuOpen"
			class="absolute top-full left-0 w-screen z-10 bg-light-primary dark:bg-dark-primary shadow-md"
		>
			<div class="flex items-center gap-12 justify-center mb-6">
				<LanguageSwitcher />
				<ThemeSwitcher />
			</div>
			<div class="flex flex-col my-4 mx-12">
				<NuxtLink v-for="l in props.links" :key="l.path" class="link-item" :to="l.path">
					<span>{{ $t(l.i18nKey) }}</span
					><IconsRightArrow :size="16" :color="$getThemeColors().iconsColor" />
				</NuxtLink>
				<div v-show="authSate.authenticated" @click="handleLogout" class="link-item">
					<span>{{ $t("navbar.logout") }}</span
					><IconsRightArrow :size="16" :color="$getThemeColors().iconsColor" />
				</div>
			</div>
		</div>
	</header>
</template>
<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ILink } from "@/types/navbar";
import { THEME_MODES } from "@/types/theme";
const { $getAuthState, $signOut, $getTheme } = useNuxtApp();

const menuElement = ref<HTMLElement>();
const isMenuOpen = ref<boolean>(false);
const authSate = $getAuthState();

const props = defineProps({
	links: {
		type: Array<ILink>,
		default: [],
	},
});

const handleToggleMenu = () => {
	isMenuOpen.value = !isMenuOpen.value;
};

onClickOutside(menuElement, () => (isMenuOpen.value = false));

const handleLogout = () => {
	return $signOut(true);
};
</script>
<style scoped>
.link-item {
	@apply text-lg py-2 px-2 my-1 mx-1 cursor-pointer flex justify-between items-center;
}
</style>
