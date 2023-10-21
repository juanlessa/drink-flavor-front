<template>
	<header ref="menuElement" class="header-container">
		<div class="header-content">
			<NuxtLink to="/" class="logo-container">
				<img
					class="img-logo"
					:src="themeState.themeMode === THEME_MODES.light ? '/light-logo.png' : '/dark-logo.png'"
					height="40"
					alt="DrunkFlavor"
				/>
				<span>DrunkFlavor</span>
			</NuxtLink>

			<IconsMenu
				v-if="!isMenuOpen"
				:size="26"
				:color="themeState.colors.iconsColor"
				alt="open menu"
				@click="handleToggleMenu"
			/>
			<IconsMenuClose
				v-else
				:size="26"
				:color="themeState.colors.iconsColor"
				alt="close menu"
				@click="handleToggleMenu"
			/>
		</div>
		<div v-show="isMenuOpen" class="menu-modal">
			<div class="switchers-container">
				<LanguageSwitcher />
				<ThemeSwitcher />
			</div>
			<div class="link-group">
				<NuxtLink v-for="l in props.links" :key="l.path" class="link-item" :to="l.path">
					<span>{{ $t(l.i18nKey) }}</span
					><IconsRightArrow :size="16" :color="themeState.colors.iconsColor" />
				</NuxtLink>
				<div v-show="authSate.authenticated" @click="handleLogout" class="link-item">
					<span>{{ $t("navbar.logout") }}</span
					><IconsRightArrow :size="16" :color="themeState.colors.iconsColor" />
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
const themeState = $getTheme();

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
.logo-container {
	display: flex;
	align-items: center;
	gap: 0.5rem;

	font-size: 2rem;
	color: var(--primary-color);
}

.header-container {
	height: 5rem;
	width: 100vw;
	background-color: var(--primary-background);
	position: relative;
}
.switchers-container {
	display: flex;
	align-items: center;
	gap: 3rem;
	justify-content: center;
	margin-bottom: 1.5rem;
}
.header-content {
	width: 95%;
	margin: auto auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;
}
.right-icons {
	display: flex;
	gap: 1.5rem;
	align-items: center;
}
.menu-modal {
	position: absolute;
	top: 100%;
	left: 0;
	width: 100vw;
	z-index: 1;
	background-color: var(--primary-background);
	box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
}

.img-logo {
	cursor: pointer;
	height: 4rem;
}

.link-item {
	font-size: 1.2rem;
	padding: 0.5rem 0;
	margin: 0.25rem 0;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.link-group {
	display: flex;
	flex-direction: column;
	margin: 1rem 3rem;
}
</style>
