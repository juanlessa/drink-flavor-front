<template>
	<header ref="menuElement" class="bg-light-primary dark:bg-dark-primary h-20 w-screen">
		<div class="max-w-screen-desktop mx-auto flex justify-between items-center h-full">
			<NuxtLink to="/" class="text-light-theme dark:text-dark-theme flex items-center gap-2 text-4xl">
				<img
					class="cursor-pointer h-16"
					:src="$getTheme() === THEME_MODES.light ? '/light-logo.png' : '/dark-logo.png'"
					height="40"
					alt="DrunkFlavor"
				/>
				<span>DrunkFlavor</span>
			</NuxtLink>

			<div class="pr-12 flex items-center gap-8">
				<LanguageSwitcher />
				<ThemeSwitcher />
				<NuxtLink v-for="l in props.links" :key="l.path" class="link-item" :to="l.path">
					{{ $t(l.i18nKey) }}
				</NuxtLink>
				<div v-show="authSate.authenticated" @click="handleLogout()" class="link-item">logout</div>
			</div>
		</div>
	</header>
</template>
<script setup lang="ts">
import { ILink } from "@/types/navbar";
import { THEME_MODES } from "@/types/theme";

const { $signOut, $getAuthState, $getTheme } = useNuxtApp();

const authSate = $getAuthState();
const props = defineProps({
	links: {
		type: Array<ILink>,
		default: [],
	},
});

const handleLogout = () => {
	$signOut(true);
};
</script>
<style scoped>
.link-item {
	@apply text-lg block cursor-pointer;
}
</style>
